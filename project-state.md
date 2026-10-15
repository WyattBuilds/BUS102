# Project state
Last updated: 2026-10-15

## Works
- The Next.js site is live on Vercel and deploys from the main branch.
- Every pull request gets a Vercel preview link.
- A Supabase project exists for BUS102.
- On the live site, a person can create an account with an email and password, and the page then shows "Signed in as" with their email.
- A person can sign out, then log back in with the same email and password.
- If a person logs in with the wrong password, an error message appears and they stay logged out.
- A signed-in person can add a task with a class name, such as BUS102, and see it in their list with that class label. Typing in the class box suggests classes they have already used.
- A person can tick a task to mark it done, and it stays done after they reload the page.
- A person stays signed in when they reload the page, and their tasks are still there after they sign out and log back in.
- Each account sees only its own tasks.
- A summary shows how many unfinished tasks each class has, and labels the class with the most (or classes, if tied) "Behind." A class with no unfinished tasks is never Behind.
- The summary updates straight away when a task is ticked or unticked, and each account sees only its own counts.
- A person can give a task a due date, or leave it blank. The date shows next to the task and stays after a reload.
- An unfinished task whose due date has passed shows in red with the word Overdue. Tasks due today or later, tasks with no due date, and finished tasks are not marked Overdue.
- The site uses a dark theme in the style of the Obsidian notes app: dark charcoal background, light grey text, purple buttons and links. The home page shows only the app; the old bio is gone.

## Broken or flaky
- Nothing known broken.
- Tasks saved before slice 5 have no class. They still show in the list, without a class label, and are left out of the summary.

## Environment notes
- Repo: WyattBuilds/BUS102, default branch main.
- Vercel project: bus102.
- Live site: https://bus102.vercel.app. The Vercel project was connected to this GitHub repo on 2026-10-15; before that, merges did not reach the live site.
- Supabase project URL: https://genzjutbvaiskwfmrbka.supabase.co
- Keys and passwords live only in Vercel > bus102 > Settings > Environment Variables.

## Next session
- All six slices are built, and the site matches What Done means in roadmap.md. The Oct 18 class deliverable is the live link: https://bus102.vercel.app. Anything further comes from the Backlog.
