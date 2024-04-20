# ShiftEase
### Introduction
Our project aims to streamline shift scheduling within the service industry by providing an intuitive, digital solution. 
We have developed a schedule management application to centralize shift planning, enhance communication, and reduce administrative overhead.

### Architecture
Our application architecture consists of a React-based frontend and Node.js with Remix as our full-stack framework. 
We use PostgreSQL, hosted on Cloud SQL, which serves as our database, storing crucial information on users, shifts, and availability. Authentication is managed through Auth0 for secure access. 
Additionally, Google's OR API has been integrated to extend the application's functionality.

### Features
For Managers:
- Dedicated dashboard for administrative tasks and schedule oversight.
- List view of registered employees, along with their availabilities and contact information
- Shift duration and shift coverage requirement specifications to avoid under or overstaffing based on employee roles.
- Automatic schedule generation and shift assignment based on employee availability generated using the Google OR API

For Employees:
- Personal dashboard with an overview of upcoming shifts
- Viewing and changing personal availability which managers can use to generate schedules

### Deployment
The application is deployed on Google Cloud App Engine for scalability and reliability. Continuous integration and deployment pipelines are established via GitHub Actions. In the future, we will be automating testing and deployment processes.

### Future Improvements
- Implement shift swap functionality
- Notifications for shift updates
- A full calendar view
