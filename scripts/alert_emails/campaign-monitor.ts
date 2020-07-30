import axios, { AxiosInstance } from 'axios';
import delay from 'delay';
import { toISO8601 } from './utils';

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

export interface CampaignMonitorMessageSent {
  Status: string;
  Recipient: string;
  MessageID: string;
}

export interface CampaignMonitorStats {
  Sent: number;
  Bounces: number;
  Opened: number;
  Clicked: number;
}

function isStatusOK(status: number) {
  return 200 <= status && status < 300;
}

function isRateLimitExceeded(status: number) {
  return status === 429;
}

export function isInvalidEmailError(error: any) {
  return error?.response?.data?.Code === 1;
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
    const response = await this.api.post<CampaignMonitorMessageSent[]>(
      'transactional/classicEmail/send',
      sendData,
    );

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

  async fetchTransactionalStats(
    group: string,
    from: Date,
    to: Date,
  ): Promise<CampaignMonitorStats> {
    const params = {
      group,
      from: toISO8601(from),
      to: toISO8601(to),
      timezone: 'UTC',
    };
    const res = await this.api.get('transactional/statistics', { params });
    return res.data;
  }
}

export default CampaignMonitor;
