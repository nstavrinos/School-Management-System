# School Management System

The School Management System is a web application that aims to streamline administrative tasks in educational institutions. 
It consists of two main components: the client-side and the server-side. It is created with the MERN STACK archisteture for learning purposes.

### Client

The client-side of the application is responsible for providing a user-friendly interface for managing the programs, teachers, students and courses of the  institution. 
It allows users to perform various tasks such as viewing, adding, editing and deleting records. The queries and mutations are happening and controlled with 
TanStack React Query and the UI is created with Mantime which provides fully featured React components.

### Server

The server-side of the application is a RESTful API that handles the logic and data management. It is responsible for processing requests from the client, 
performing necessary operations on the database, and returning the requested data. It ensures data integrity, security, and efficient communication between the client and the server.

https://github.com/nstavrinos/School-Management-System/assets/57294159/be4ac7c8-2cc1-45cc-a8ce-1338dc47b4a5


## Table of Contents

- [Installation](#installation)
- [Built with](#built-with)
- [Continued development](#continued-development)
- [Conclusion](#conclusion)

## Installation

Instructions on how to install and set up your project for running locally.

- Clone the project

```bash
git clone https://github.com/nstavrinos/School-Management-System.git
```

- Go to the project directory:

```bash
cd server
```

- Install dependencies

```bash
npm install
```
- Create a .env file and add 
```bash
PORT = 5000  # or whatever port you want the server to run
MONGO_URL = mongodb://127.0.0.1:27017/school # or your MongoDB link
```

- Start the `server`

```bash
npm run dev
```

- Go to the project directory and open another terminal:

```bash
cd client
```

- Install dependencies

```bash
npm install
```
- Start the `client`

```bash
npm run dev
```

Head over to your browser and open the URL <http://localhost:5173> to access the application.

## Built with

- React.js
- React-router-dom
- TanStack React Query
- Axios
- Mantime
- Toastify
- Node.js
- Express.js
- MongoDB
- Mongoose

## Continued development

Goind forward, I would like to add the functionality to have authentication, authorization 
and be able to upload an csv file, which will automatically create the full structure of the given program.


## Conclusion

The School Management System is a powerful tool that simplifies administrative tasks in educational institutions. By leveraging the MERN STACK architecture, it provides a user-friendly interface for managing programs, teachers, students, and courses. The RESTful API on the server-side ensures efficient communication and data integrity. With easy installation and setup instructions, this system is ready to revolutionize school management. 


