import path from 'path';
import { google, sheets_v4 } from 'googleapis';

const spreadsheetId = '1cs3Wyh8Gda0H18_-x5RYp7AJ3FwB-I1ewAQTBWEk1YY';

class GoogleSpreadsheet {
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
    // TODO(pablo): Authenticate if needed
    const res = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    console.log(res.data.values);
  }
}

async function main() {
  const keyFilePath = path.join(
    __dirname,
    '../alert_emails/google-service-account.json',
  );
  const gs = new GoogleSpreadsheet(keyFilePath);
  await gs.authenticate();
  await gs.appendRows(spreadsheetId, 'A1:D4', [[1, 2, 3]]);
}

if (require.main === module) {
  main();
}
