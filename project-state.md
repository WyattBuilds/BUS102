# Project state
Last updated: 2026-10-08

## Works
- The Next.js site is live on Vercel and deploys from the main branch.
- Every pull request gets a Vercel preview link.
- A Supabase project exists for BUS102.

## Broken or flaky
- Nothing known broken. No app features are built yet.
- Not yet confirmed: whether the Supabase URL and public key are set in Vercel environment variables. The site does not use Supabase yet.

## Environment notes
- Repo: WyattBuilds/BUS102, default branch main.
- Vercel project: bus102.
- Live site as recorded: https://bus102-l6u8kylm5-wyatt-8742.vercel.app. This may be one deployment's link rather than the production domain; confirm in Vercel > bus102 > Settings > Domains.
- Supabase project URL: https://genzjutbvaiskwfmrbka.supabase.co
- Keys and passwords live only in Vercel > bus102 > Settings > Environment Variables.

## Next session
- Start slice 1: sign up and log in.
- Open question: turn off "Confirm email" in Supabase so fake test emails can sign in? Recommended yes, since the app uses only fake data. Wyatt decides.
- Open question: confirm the production URL above.
