# BlogAppSQA
Simple blog app created with next.js for SQA module assignment

## Team contribution 
- Dilawar Singh Dayal- 50%
- Ilie Coroban- 50%
## Set up instructions 
- git clone repository 
- cd blog_app_spa
- npm install
- npm run dev
  
## Features 
We have developed this app from scratch using create-next-app provided by the nextjs framework. 
Within our SQA app we have developed the following features:
- **User authentication** - We have implemented the authentication feature with the use of [Kinde](https://kinde.com). The implementation required installation of Kinde SDK with the use of npm. After that, we have added the provided environment variables to our local env.local, followed by the addition of KindeAuth in a new route.js file, to establish the connection. With all that complete, we could easily import the already available 'Login' and 'Register' buttons, and everything is handled by them. The authentication method we chose with Kinde was a passwordless register and login. This means that a user could register and login into our app just by entering their email address and the unique code received via email from Kinde.
- **Access control** - We have implemented a fully functional access control feature, which allows the logged in users to edit, delete, and create blog posts. To achive this we have used the Kinde provided data, such as user email, with this we were able to verify the logged in user, and allow them to edit and delete blog posts only if those were created by them.
- **Blog post management** - We have implemented a search component as well as route.js api file, which allows us to query the database with the user search data. We also implemented a sort functionality, this allows users to sort blog posts by latest and by alphabet.
  
## Testing 
- **Unit and integration testing** - To implement the unit and integration tests we had used jest testing tool. We had used this tool as it is compatible and easy to use with javascript framework like next.js. Jest also includes a test runner, mocking capabilities, this eliminates the need for multiple configurations and librarys. Jest is also well-suited for integration testing and provides excellent choice for testing how components and modules worked together. With the use of this tool we were able to thoroughly test the functionality of our app.      
- **Test coverage report** 
## Challenging and Solutions

## Evidence 

- SQA app feature implementation video: 
