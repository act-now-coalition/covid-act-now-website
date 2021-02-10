import AWS from 'aws-sdk';
import delay from 'delay';
import Bottleneck from 'bottleneck';

export interface EmailSendData {
  Subject: string;
  From: string;
  ReplyTo?: string;
  To?: string[];
  CC?: string[];
  BCC?: string[];
  Html: string;
  Text?: string;
  Group?: string;
}

export function isInvalidEmailError(error: any) {
  // Technically we don't know what parameter was wrong, but it's probably the email.
  return error?.code === 'InvalidParameterValue';
}

class EmailService {
  private ses = new AWS.SES({
    region: 'us-east-1',
  });

  private limiter = new Bottleneck({
    minTime: 83, // Our rate limit is 14/sec so we aim for 12/sec (83ms delay).
  });

  async sendEmail(
    sendData: EmailSendData,
    retriesLeft: number = 4,
  ): Promise<void> {
    const request: AWS.SES.SendEmailRequest = {
      Source: sendData.From,
      ReplyToAddresses: sendData.ReplyTo ? [sendData.ReplyTo] : undefined,
      Destination: {
        ToAddresses: sendData.To,
        CcAddresses: sendData.CC,
        BccAddresses: sendData.BCC,
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: sendData.Subject,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: sendData.Html,
          },
          ...(sendData.Text && {
            Text: { Charset: 'UTF-8', Data: sendData.Text },
          }),
        },
      },

      // This configuration set is configured to send open/click metrics to
      // CloudWatch and bounce/rejections to an S3 bucket (covidactnow-bounce-logs)
      ConfigurationSetName: 'alert-emails',

      // If there's a group, we add it as a message tag which gets added as a
      // dimension to the CloudWatch metrics so we can segment on it.
      ...(sendData.Group && {
        Tags: [
          {
            Name: 'Group',
            Value: sendData.Group,
          },
        ],
      }),
    };

    try {
      await this.limiter.schedule(async () => {
        await this.ses.sendEmail(request).promise();
      });
    } catch (e) {
      console.error('Failed to send email.\nRequest:', request, '\nError:', e);
      let error = e as AWS.AWSError;
      // Generally we shouldn't hit the throttling delay, since we are using
      // this.limiter to schedule requests, but just in case.
      if (error.code === 'Throttling' && retriesLeft > 0) {
        console.log('Waiting 60s and then retrying...');
        await delay(60000);
        await this.sendEmail(sendData, retriesLeft - 1);
      } else {
        throw e;
      }
    }
  }
}

export default EmailService;
