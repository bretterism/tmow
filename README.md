# TMOW
Team Member of the Week

### The Product
This is a web app designed to display who is currently the team member of the week (TMOW). Every week we vote for who is the next TMOW. The site is designed to run on a tv next to each of the team work areas and display who is the current TMOW for every team.

### The Problem
This is a somewhat unique app, because I needed a to create a website without having to bother corporate IT. Asking IT to allow us to run a little hosted website was out of the question.

### The Solution
Since we cannot create new websites on the network, this app is designed to run on a local machine. Every TV has a laptop attached to it in order to display team information (dashboards, metrics, etc). With each tv running the app locally, an Excel spreadsheet is used to sync data across all the TVs in the office.

This Excel sheet is hosted in the cloud, which is automatically synced to each laptop. Once the spreadsheet is updated, the changes go out to each laptop and the web page is updated with the new information.
![alt text](https://github.com/bretterism/tmow/blob/master/img/tmow-diagram.png "TMOW Diagram")

### The Technology
This was a rapid development app that was built in one sitting, about 4 hours. The backend is built using Node.js, which watches for updates on the Excel spreadsheet. Once the spreadsheet is updated, the backend emits an event using web sockets (socket.io) to the frontend. The frontend, built on React, is able to render those changes as soon as they are received.

### The Setup
**Disclaimer:**  Although this app *should* work across most operating systems, it was designed for Windows (that's the OS on each laptop). I haven't tested it on other operating systems so if it doesn't work out of the box, you may have to do some tweaking.

1. Update config/default.json with your own information. The most important part being the filepath to your Excel spreadsheet.
2. `npm install`
3. `npm run start`
