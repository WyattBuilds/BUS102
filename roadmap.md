# Roadmap

## What this is
BUS102 is a study to-do list for college students. You add tasks for each of your classes, give them due dates, and tick them off when they are done. It uses a dark theme in the style of the Obsidian notes app.

## What Done means
A stranger opens the live site, creates an account with an email and password, and adds a few tasks, each with a class name and a due date. Overdue tasks stand out. They tick tasks off when they finish them, and finished tasks are visibly crossed out. When they sign out and come back later, their tasks are still there. A summary shows how many unfinished tasks each class has and labels the class with the most "Behind." Nothing beyond that is part of this project.

## Slices
Slices 2 and 3 were built for the earlier language-study version. Slice 5 replaces the skill tags and skill summary with classes.
1. Sign up and log in | done-criteria: (a) On the live site, click Sign up, enter a new fake email and a password, submit; the page shows "Signed in as" and that email. (b) Click Sign out; the email disappears and a Log in button shows. (c) Log in with the same email and password; the email shows again. (d) Log in with that email and a wrong password; an error message appears and you stay logged out. | status: DONE
2. Tasks with skill tags that persist | done-criteria: (a) Logged in, type a task, pick Listening from the skill menu, click Add; the task appears in the list with a Listening label. (b) Check a task's box, reload the page; it still shows as done. (c) Sign out and log back in; every task added before is still there. (d) Log in as a second account; none of the first account's tasks appear. | status: DONE
3. Skill summary | done-criteria: (a) On a fresh account, complete one Reading task and two Speaking tasks; the summary shows Reading 1, Speaking 2, Writing 0, Listening 0. (b) On that account, Writing and Listening are both labeled "Avoiding." (c) Uncheck one Speaking task; Speaking drops to 1 without reloading. (d) Log in as a second account; its summary shows only its own counts. | status: DONE
4. Due dates | done-criteria: (a) I add a task due yesterday, and it shows in red with the word Overdue next to it. (b) I add a task due next Friday, reload the page, and it still shows that due date. (c) Should not: I add a task due tomorrow and a task with no due date, and neither one is red or marked Overdue. | status: DONE
5. Classes instead of skills | done-criteria: (a) I add a task, type "BUS102" as its class, click Add, and the task shows a BUS102 label instead of a skill. (b) I add two unfinished BUS102 tasks and one unfinished ENG100 task, and the summary shows BUS102 2 and ENG100 1, with "Behind" next to BUS102. (c) I tick one of the BUS102 tasks, and without reloading the summary shows BUS102 1. (d) Should not: I tick every task in a class, and that class is not labeled "Behind". | status: DONE
6. Obsidian theme | done-criteria: (a) I open the site and the background is dark charcoal, the text is light grey, and buttons and links are purple. (b) I open the site and my bio is gone; the page shows only the app. (c) Should not: after the theme change, overdue tasks are no longer red, finished tasks are no longer crossed out, or any text is dark on a dark background. | status: ACTIVE

## Backlog
- Editing tasks
- Deleting tasks
- A "last 7 days" window for the summary
- Streaks and charts
- Password reset
- Google sign-in
- Reminders or notifications
- Sharing lists
- Mobile app
