import axios, { AxiosInstance, AxiosResponse } from 'axios';
import delay from 'delay';

// https://www.campaignmonitor.com/api/getting-started/#rate-limiting
const STATUS_RATE_LIMIT = 429;

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

class CreateSend {
  readonly req: AxiosInstance;

  constructor(apiKey?: string) {
    if (!apiKey) {
      throw new Error('The createsend API key is invalid.');
    }

    this.req = axios.create({
      baseURL: 'https://api.createsend.com/api/v3.2',
      auth: {
        username: apiKey,
        password: '',
      },
    });
  }

  // https://www.campaignmonitor.com/api/transactional/#send-classic-email
  async sendClassicEmail(data: EmailSendData): Promise<AxiosResponse<any>> {
    const res = await this.req.post('transactional/classicEmail/send', data);

    const rateLimitReset = parseInt(res.headers['x-ratelimit-reset']);
    const rateLimitRemaining = parseInt(res.headers['x-ratelimit-remaining']);

    if (res.status === STATUS_RATE_LIMIT || rateLimitRemaining < 10) {
      console.info(
        `Rate limit remaining: ${rateLimitRemaining}. Sleeping ${rateLimitReset} seconds.`,
      );
      await delay(1000 * rateLimitReset);
      return this.sendClassicEmail(data);
    }

    return res;
  }
}

export default CreateSend;
