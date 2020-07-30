import { google, sheets_v4 } from 'googleapis';

const spreadsheetId = '1cs3Wyh8Gda0H18_-x5RYp7AJ3FwB-I1ewAQTBWEk1YY';

class GoogleSpreadsheet {
  // path to the google service account file
  keyFile: string;
  auth: any;
  sheets: sheets_v4.Sheets;
  constructor(keyFile: string) {
    // TODO(pablo): check for the file
    this.keyFile = keyFile;
  }

  async authenticate() {
    // TODO(pablo): handle failure
    this.auth = await google.auth.getClient({
      keyFile: this.keyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    this.sheets = google.sheets('v4');
  }

  async appendRows(spreadsheetId: string, range: string, rows: any) {
    // const response = await this.sheets.spreadsheets.values.append();
  }
}

async function main() {
  // TODO
  const auth = await google.auth.getClient({
    keyFile: './scripts/alert_emails/google-service-account.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets('v4');

  const res = await sheets.spreadsheets.values.get({
    auth,
    range: 'A1:D1',
    spreadsheetId,
  });
  console.log(res.data.values);
}

if (require.main === module) {
  main();
}
