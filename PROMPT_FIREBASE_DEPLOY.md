# Prompt for new chat: Firebase deploy

Copy the block below into a new Cursor chat.

---

**Task: Push local code to GitHub, then run a full Firebase deployment and confirm it completes.**

- **GitHub**: Push from `FIELDPORTER.COM` to `main` only. Do NOT pull (local is source of truth). Commit and push any uncommitted changes first.
- **Firebase**: From `FIELDPORTER.COM` run a full deploy: `npx firebase deploy` (hosting + functions + firestore). Project: `fieldporter-website`.
- **Important**: Deploy can take 30+ minutes. Last time the deploy was run with a timeout and the process was killed before it could finish, so no "Deploy complete" or error was ever shown. This time either run the deploy in the foreground and wait (no short timeout), or run it in a normal terminal and tell me to leave that terminal open until the command exits. Do not background it with a timeout that would kill the process.
- **After deploy**: Verify the live site (e.g. https://fieldporter-website.web.app/ returns 200) and report success or the exact error from the terminal.
- **Constraints**: Do not use `&&` in shell commands (PowerShell). Run commands for me; always run a build after code changes.

---
