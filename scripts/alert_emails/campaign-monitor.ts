import axios, { AxiosInstance, AxiosResponse } from 'axios';
import delay from 'delay';

export interface EmailSendData {
  Subject: string;
  From: string;
  ReplyTo: string | null;
  To: string[] | null;
  CC: string[] | null;
  BCC: string[] | null;
  Html: string;
  Text: string;
  Attachments: { [key: string]: string }[] | null;
  TrackOpens: boolean;
  TrackClicks: boolean;
  InlineCSS: boolean;
  Group: string | null;
  AddRecipientsToList: string | null;
  ConsentToTrack: string;
}

export interface CampaignMonitorError {
  Code: number;
  Message: string;
}

export interface CampaignMonitorMessageSent {
  Status: string;
  Recipient: string;
  MessageID: string;
}

class CampaignMonitorException {
  Code: number;
  Message: string;
  constructor(code: number, message: string) {
    this.Code = code;
    this.Message = message;
  }
}

function isStatusOK(status: number) {
  return 200 <= status && status < 300;
}

function isRateLimitExceeded(status: number) {
  return status === 429;
}

export function isInvalidEmailError(error: CampaignMonitorException) {
  return (
    error.Code === 1 &&
    error.Message === 'A valid recipient address is required'
  );
}

class CampaignMonitor {
  private api: AxiosInstance;

  constructor(apiKey?: string) {
    if (!apiKey) {
      throw new Error('Invalid API key');
    }
    this.api = axios.create({
      baseURL: 'https://api.createsend.com/api/v3.2/',
      auth: {
        username: apiKey,
        password: '',
      },
      // We don't want the request promise to reject when we hit the rate limit
      // so we can read the headers and wait for the next rate limit reset.
      validateStatus: function (status) {
        return isStatusOK(status) || isRateLimitExceeded(status);
      },
    });
  }

  async sendClassicEmail(
    sendData: EmailSendData,
  ): Promise<CampaignMonitorMessageSent[]> {
    let response: AxiosResponse<CampaignMonitorMessageSent[]>;
    try {
      response = await this.api.post<CampaignMonitorMessageSent[]>(
        'transactional/classicEmail/send',
        sendData,
      );
    } catch (err) {
      const { Code, Message } = err.response.data;
      throw new CampaignMonitorException(Code, Message);
    }

    const { status, headers } = response;
    const rateLimitResetSec = parseInt(headers['x-ratelimit-reset'], 10) + 15;
    const rateLimitRemaining = parseInt(headers['x-ratelimit-remaining'], 10);

    if (isStatusOK(status) && rateLimitRemaining < 50) {
      await delay(rateLimitResetSec * 1000);
    }

    if (isRateLimitExceeded(status)) {
      await delay(rateLimitResetSec * 1000);
      return this.sendClassicEmail(sendData);
    }

    return response.data;
  }
}

export default CampaignMonitor;
