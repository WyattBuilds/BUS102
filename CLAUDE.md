# BUS102

## Stack
- Next.js with the App Router, TypeScript, plain CSS (no CSS frameworks)
- Supabase for sign-in and data
- Deployed on Vercel; every branch gets a preview link, merging to main deploys the live site

## Commands
- npm install
- npm run dev
- npm run build
- npm run lint
These assume npm. If package.json shows a different package manager or script names, use those and tell Wyatt so this section gets corrected.

## Never
- Add a dependency without asking first.
- Add a new service or account without asking first.
- Edit .env or any environment variable.
- Change auth configuration without saying what is changing and why.
- Create new top-level folders.
- Put keys, passwords, or connection strings in any file, commit, or message. They live only in Vercel > bus102 > Settings > Environment Variables.
- Use real personal data. Fake names and fake content only.
- Merge a pull request. Wyatt merges.
- Edit roadmap.md, project-state.md, or CLAUDE.md during feature work. Only a dedicated docs session edits them.

## Conventions
- One slice per pull request, opened as a draft.
- Explain every change in plain language in the pull request description, written for someone with no coding background.
- Flag anything Wyatt would need to explain if asked about it at a live session.
- Keep code in TypeScript and styles in plain CSS.

## Current focus
See roadmap.md. Work only on the slice marked ACTIVE.
