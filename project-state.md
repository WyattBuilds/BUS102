# Project state
Last updated: 2026-10-15

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
- A person can give a task a due date, or leave it blank. The date shows next to the task and stays after a reload.
- An unfinished task whose due date has passed shows in red with the word Overdue. Tasks due today or later, tasks with no due date, and finished tasks are not marked Overdue.

## Broken or flaky
- Nothing known broken.

## Environment notes
- Repo: WyattBuilds/BUS102, default branch main.
- Vercel project: bus102.
- Live site: https://bus102.vercel.app. The Vercel project was connected to this GitHub repo on 2026-10-15; before that, merges did not reach the live site.
- Supabase project URL: https://genzjutbvaiskwfmrbka.supabase.co
- Keys and passwords live only in Vercel > bus102 > Settings > Environment Variables.

## Next session
- The app changed from a language study list to a per-class study to-do list. Slice 4 (due dates) is built. Start slice 5: classes instead of skills. The Oct 18 class deliverable needs a working Vercel link with login, saved tasks, due dates and visible completion.
