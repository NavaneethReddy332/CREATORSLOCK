import { google } from "googleapis";
import { Readable } from "stream";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

function getAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentials) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set");
  }
  
  const parsedCredentials = JSON.parse(credentials);
  
  const auth = new google.auth.GoogleAuth({
    credentials: parsedCredentials,
    scopes: SCOPES,
  });
  
  return auth;
}

export async function uploadFileToDrive(
  file: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  
  const fileMetadata = {
    name: fileName,
  };
  
  const media = {
    mimeType,
    body: Readable.from(file),
  };
  
  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id",
  });
  
  const fileId = response.data.id;
  if (!fileId) {
    throw new Error("Failed to upload file to Google Drive");
  }
  
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
  
  return fileId;
}

export async function getFileDownloadUrl(fileId: string): Promise<string> {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export async function deleteFileFromDrive(fileId: string): Promise<void> {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  
  await drive.files.delete({ fileId });
}

export async function getFileStream(fileId: string): Promise<{ stream: Readable; mimeType: string; fileName: string }> {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  
  const fileMetadata = await drive.files.get({
    fileId,
    fields: "name, mimeType",
  });
  
  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  
  return {
    stream: response.data as unknown as Readable,
    mimeType: fileMetadata.data.mimeType || "application/octet-stream",
    fileName: fileMetadata.data.name || "download",
  };
}
