# Consolium Announcer

Two role views for checking the supplied Consolium result sheets and sending ordered competition batches to an Announcer device.

## Run

```powershell
cd app
npm install
npm run dev
```

For production, run `npm run build` and `npm run start` from `app/` on one persistent Node.js host. The shared batch file is written to `app/runtime-data/announcer-state.json`; keep that directory on persistent storage. The API uses an HTTP-only, 24-hour role cookie. PIN `0000` is intentionally a simple shared gate, not strong authentication.

The imported result data and source PDFs are in the repository. This public repository exposes those records and the PIN by design.
