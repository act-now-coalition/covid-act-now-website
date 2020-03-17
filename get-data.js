const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  let place = 'alaska';
  authorize(JSON.parse(content), auth => downloadModel(auth, place, 0 /*baseline*/));
  authorize(JSON.parse(content), auth =>
    downloadModel(auth, place, 1 /**/)
  );
  authorize(JSON.parse(content), auth =>
    downloadModel(auth, place, 2 /*wuhan*/)
  );
  authorize(JSON.parse(content), auth =>
    downloadModel(auth, place, 3 /*wuhan*/)
  );
  authorize(JSON.parse(content), auth =>
    downloadModel(auth, place, 4 /*wuhan*/)
  );
  authorize(JSON.parse(content), auth =>
    downloadModel(auth, place, 5 /*wuhan*/)
  );
  authorize(JSON.parse(content), auth =>
    downloadModel(auth, place, 6 /*wuhan*/)
  );
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1YEj4Vr6lG1jQ1R3LG6frijJYNynKcgTjzo2n0FsBwZA/edit#gid=1237444475
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
let models = [
  "MAIN MODEL - Current Trends",
  "Model w/ FlatteningTheCurve",
  "Model w/ Full Containment",
  "Model w/ FlatteningTheCurve (2 wk delay)",
  "Model w/ FlatteningTheCurve (1 mo delay)",
  "Model w/ Full Containment (1 wk dly)",
  "Model w/ Full Containment (2 wk dly)"
];
function downloadModel(auth, location, model) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: "1YEj4Vr6lG1jQ1R3LG6frijJYNynKcgTjzo2n0FsBwZA",
      range: `${models[model]}!C18:U92`
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
      fs.writeFile(`public/${location}.${model}.json`, JSON.stringify(rows), err => {
        if (err) return console.error(err);
      });
    }
  );
}
