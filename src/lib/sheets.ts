/**
 * @fileoverview Service for interacting with Google Sheets.
 */
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Next.js handles loading environment variables automatically, so dotenv is not needed.

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_CREDS = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;

if (!SHEET_ID) {
  console.warn('[Sheets] GOOGLE_SHEET_ID environment variable not set. Chat logs will not be saved to Google Sheets.');
}
if (!SERVICE_ACCOUNT_CREDS) {
  console.warn('[Sheets] GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable not set. Chat logs will not be saved to Google Sheets.');
}

// Function to get an authenticated Google Sheets client
async function getSheetsClient() {
  if (!SERVICE_ACCOUNT_CREDS) {
    throw new Error('Google service account credentials are not configured.');
  }

  const credentials = JSON.parse(SERVICE_ACCOUNT_CREDS);

  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

/**
 * Appends a row to the specified Google Sheet.
 * @param {Array<string | Date | null | undefined>} rowData - The data to append.
 * @param {string} [sheetName='Sheet1'] - The name of the sheet to append to.
 */
export async function appendToSheet(rowData: (string | Date | null | undefined)[], sheetName = 'Sheet1') {
  if (!SHEET_ID || !SERVICE_ACCOUNT_CREDS) {
    // Silently fail if not configured to avoid breaking chat functionality
    return;
  }
  
  try {
    const sheets = await getSheetsClient();
    const range = `${sheetName}!A1`;

    // Ensure all data is in a string format for the sheet, handling dates and null/undefined values
    const formattedRowData = rowData.map(cell => {
      if (cell instanceof Date) {
        return cell.toISOString();
      }
      return cell ?? ''; // Convert null/undefined to empty string
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [formattedRowData],
      },
    });
    console.log('[Sheets] Successfully appended a row to the sheet.');
  } catch (error) {
    console.error('[Sheets] Error appending data to Google Sheet:', error);
    // You might want to handle this error more gracefully
  }
}
