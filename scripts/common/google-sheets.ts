import { google, sheets_v4 } from 'googleapis';

class GoogleSheets {
  // path to the google service account file
  keyFile: string;
  sheets: sheets_v4.Sheets;

  constructor(keyFile: string) {
    // TODO(pablo): Check for the file, throw an error if not found?
    this.keyFile = keyFile;
    this.sheets = google.sheets({ version: 'v4' });
  }

  async getAuth() {
    return google.auth.getClient({
      keyFile: this.keyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  async clearRows(spreadsheetId: string, range: string) {
    const auth = await this.getAuth();
    await this.sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
      auth,
    });
  }

  async appendRows<T>(spreadsheetId: string, range: string, values: T[][]) {
    const auth = await this.getAuth();
    const appendRequest = {
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        majorDimension: 'ROWS',
        range,
        values,
      },
      auth,
    };
    await this.sheets.spreadsheets.values.append(appendRequest);
  }

  async clearAndAppend<T>(spreadsheetId: string, range: string, values: T[][]) {
    await this.clearRows(spreadsheetId, range);
    await this.appendRows(spreadsheetId, range, values);
  }
}

export default GoogleSheets;

export type Cell = string | number;
