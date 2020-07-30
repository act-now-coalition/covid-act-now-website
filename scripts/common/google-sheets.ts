import path from 'path';
import _ from 'lodash';
import { google, sheets_v4 } from 'googleapis';

const spreadsheetId = '1cs3Wyh8Gda0H18_-x5RYp7AJ3FwB-I1ewAQTBWEk1YY';

class GoogleSheets {
  // path to the google service account file
  keyFile: string;
  sheets: sheets_v4.Sheets;

  constructor(keyFile: string) {
    // TODO(pablo): Check for the file, throw an error if not found?
    this.keyFile = keyFile;
    this.sheets = google.sheets({ version: 'v4' });
  }

  async authenticate() {
    if (this.isAuthenticated()) {
      return;
    }
    const auth = await google.auth.getClient({
      keyFile: this.keyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  private isAuthenticated(): boolean {
    return this.sheets.context._options.auth !== null;
  }

  async appendRows(spreadsheetId: string, range: string, rows: any) {
    const auth = await google.auth.getClient({
      keyFile: this.keyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const request = {
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        majorDimension: 'ROWS',
        values: _.flatten(rows),
      },
      auth,
    };

    await this.sheets.spreadsheets.values.append(request);
  }
}

export default GoogleSheets;

async function main() {
  const keyFilePath = path.join(
    __dirname,
    '../alert_emails/google-service-account.json',
  );
  const gs = new GoogleSheets(keyFilePath);
  await gs.authenticate();
  await gs.appendRows(spreadsheetId, 'A1:D4', [[11, 21, 31]]);
}

if (require.main === module) {
  main();
}
