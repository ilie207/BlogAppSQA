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
- **Blog post management** - 
## Testing 

## Challenging and Solutions

## Evidence 

- SQA app feature implementation video: 
