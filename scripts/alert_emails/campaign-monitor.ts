import axios, { AxiosInstance, AxiosResponse } from 'axios';
import delay from 'delay';

const STATUS_RATE_LIMIT = 429;

function isStatusOK(status: number) {
  return 200 <= status && status < 300;
}

function isRateLimitExceeded(status: number) {
  return status === STATUS_RATE_LIMIT;
}

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
    data: EmailSendData,
  ): Promise<AxiosResponse<CampaignMonitorMessageSent[]>> {
    const res = await this.api.post('transactional/classicEmail/send', data);
    const { status, headers } = res;

    const rateLimitResetSec = parseInt(headers['x-ratelimit-reset'], 10) + 15;
    const rateLimitRemaining = parseInt(headers['x-ratelimit-remaining'], 10);

    if (isStatusOK(status) && rateLimitRemaining < 50) {
      await delay(rateLimitResetSec * 1000);
    }

    if (isRateLimitExceeded(status)) {
      await delay(rateLimitResetSec * 1000);
      return this.sendClassicEmail(data);
    }

    return res;
  }
}

export default CampaignMonitor;
