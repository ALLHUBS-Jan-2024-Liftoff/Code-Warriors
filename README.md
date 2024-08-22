# Digital Delights- Full Stack E-commerce Application
Digital Delight is a full-stack e-commerce project built using Spring Boot, MySQL, and React.js. It handles various operations on the server side, such as managing the shopping cart and other functionalities. For security, it utilizes JWT authentication and authorization using Spring Security.

#Tech Stack
* Backend Framework: Spring Boot
* Frontend Framework: React.js
* Database: MySQL

#Prerequisites
To run this project locally, you need to have the following software installed:
* JDK 17
* Node.js
* MySQL Server
* Git

#Features
* User authentication and authorization using JWT
* Product browsing and searching
* Shopping cart management
* Order placement and tracking
* Stripe API Payment integration
* GeminiAPI integration for Chat
* Progressive Web App
* Machine Learning using Python

#Getting Started
Clone the repository:

git clone https://github.com/ALLHUBS-Jan-2024-Liftoff/Code-Warriors.git
cd code-warriors

#Set up the database:

Create a MySQL database and configure the connection details in backend/src/main/resources/application.properties file.
Application Properties

To configure the application properties, follow these steps:

Open the backend/src/main/resources/application.properties file.

Configure the MySQL database connection properties by updating the following lines:

* spring.datasource.url=jdbc:mysql://localhost:3306/springbootdb
* spring.datasource.username=your-username
* spring.datasource.password=your-password
Replace your-username and your-password with your MySQL database credentials.

(Optional) If you want to change the server port, update the following line:

server.port=8080
Replace 8080 with the desired port number.

Save the application.properties file.

#Backend Setup:

Open IntelliJ and Navigate to the Backend directory:

Build and run the Spring Boot application:

The backend server should now be running on http://localhost:8080.

#Frontend Setup:

Open Visual Studio Code and Navigate to the Frontend Directory:

npm install
Start the React development server:

npm run dev
The frontend server should now be running on http://localhost:5173.

Open your web browser and visit http://localhost:5173 to access the Digital Delight application.
