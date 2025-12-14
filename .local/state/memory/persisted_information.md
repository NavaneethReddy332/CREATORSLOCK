# Persisted Information for Next Context

## Current Task
Adding Google Drive file upload integration for creators who want to upload files instead of providing URLs.

## Google Drive Integration Progress
- [x] GOOGLE_SERVICE_ACCOUNT_JSON secret added
- [x] googleapis and multer packages installed
- [x] Schema updated - added `linkFiles` table in `shared/schema.ts`
- [x] Database schema pushed with `npm run db:push`
- [x] Created `server/drive.ts` - Google Drive service for upload/download
- [x] Updated `server/storage.ts` - Added file CRUD methods
- [x] Updated `server/routes.ts` - Added file upload/download API endpoints
- [x] Updated `server/index.ts` - Added trust proxy for Render deployment
- [IN PROGRESS] Updating `client/src/pages/DashboardPage.tsx` - Adding file upload UI

## DashboardPage.tsx Current State
Already added:
- State: uploadedFiles, isUploading, createdLinkId, fileInputRef
- Functions: handleFileSelect, removeFile, formatFileSize
- Updated createLinkMutation to upload files after creating link
- Updated handleGenerate to accept files OR URL

STILL NEED TO ADD in DashboardPage.tsx:
1. Hidden file input element
2. File upload button/UI section after Content URL input
3. Display list of uploaded files with remove buttons
4. Update generate button disabled state to check for files too

## Still Need To Create
1. Finish DashboardPage.tsx file upload UI (add JSX after Content URL input section)
2. Create `client/src/pages/DownloadPage.tsx` - Download page for after unlock completion
3. Update `client/src/pages/UnlockPage.tsx` - Redirect to download page when link has files (targetUrl === "__FILES__")
4. Register DownloadPage route in App.tsx
5. Restart workflow and test
6. Call architect for review

## API Endpoints Added
- POST /api/files/upload/:linkId - Upload file to Google Drive
- GET /api/files/:linkId - Get files for a link  
- DELETE /api/files/:fileId - Delete a file
- GET /api/files/download/:fileId - Get download URL

## Key Files to Reference
- `shared/schema.ts` - Has linkFiles table
- `server/drive.ts` - Google Drive service
- `server/routes.ts` - File upload/download endpoints
- `client/src/pages/DashboardPage.tsx` - Partially updated, needs UI
- `client/src/pages/UnlockPage.tsx` - Needs update to redirect to download page
- `client/src/App.tsx` - Need to add DownloadPage route

## Database
- Uses Turso (libsql) - TURSO_DATABASE_URL and TURSO_AUTH_TOKEN
- linkFiles table: id, linkId, fileName, fileSize, mimeType, driveFileId, createdAt

## User Request Summary
User wants: Creators can upload files with "+" button when creating lock page. After tasks complete on unlock page, redirect to download page to get files.