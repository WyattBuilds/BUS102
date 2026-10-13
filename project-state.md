# Project state
Last updated: 2026-10-13

## Works
- The Next.js site is live on Vercel and deploys from the main branch.
- Every pull request gets a Vercel preview link.
- A Supabase project exists for BUS102.
- On the live site, a person can create an account with an email and password, and the page then shows "Signed in as" with their email.
- A person can sign out, then log back in with the same email and password.
- If a person logs in with the wrong password, an error message appears and they stay logged out.
- A signed-in person can add a study task, tag it Reading, Writing, Listening, or Speaking, and see it in their list with that label.
- A person can tick a task to mark it done, and it stays done after they reload the page.
- A person stays signed in when they reload the page, and their tasks are still there after they sign out and log back in.
- Each account sees only its own tasks.
- A skill summary shows how many completed tasks a person has for each skill, and labels the lowest one (or ones, if tied) "Avoiding."
- The summary updates straight away when a task is ticked or unticked, and each account sees only its own counts.

## Broken or flaky
- Nothing known broken.

## Environment notes
- Repo: WyattBuilds/BUS102, default branch main.
- Vercel project: bus102.
- Live site as recorded: https://bus102-l6u8kylm5-wyatt-8742.vercel.app. This may be one deployment's link rather than the production domain; confirm in Vercel > bus102 > Settings > Domains.
- Supabase project URL: https://genzjutbvaiskwfmrbka.supabase.co
- Keys and passwords live only in Vercel > bus102 > Settings > Environment Variables.

## Next session
- All three slices are built. Choose what to build next from the Backlog in roadmap.md.
