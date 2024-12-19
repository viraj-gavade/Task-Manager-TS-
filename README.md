# Task Manager: A Basic TypeScript CRUD API

This project is a simple CRUD (Create, Read, Update, Delete) API built with TypeScript, Express, and MongoDB. It demonstrates how to set up a basic backend application using TypeScript while adhering to clean code practices.

## 🌐 Live Demo

**[View Live Application](https://taskmanagertypescript-m3q18mq6.b4a.run/api/v1/tasks)**

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these steps to get the project up and running:

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- TypeScript
- A package manager like `npm`

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/viraj-gavade/Project-1.git
cd Project-1
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env` file in the root directory and configure the following:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

4. **Build the project**:
```bash
npm run build
```

5. **Run the application**:
- Development mode (with hot reload):
```bash
npm run dev
```
- Production mode:
```bash
npm start
```

## Features
- **TypeScript**: Strongly typed codebase
- **CRUD Operations**:
  - Create tasks
  - Read tasks
  - Update tasks
  - Delete tasks
- **MongoDB**: Efficient NoSQL database for task storage
- **EJS Integration**: Serve dynamic HTML templates
- **Error Handling**: Graceful error responses

## Project Structure
```
Project-1/
├── src/
│   ├── Controllers/    # Task controllers
│   ├── Models/         # Mongoose models
│   ├── Routes/         # API route definitions
│   ├── config/         # Configuration files
│   ├── app.ts         # Express app setup
│   └── index.ts       # Entry point
├── dist/              # Compiled JavaScript files
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── .env              # Environment variables
```

## Technologies Used
- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Static typing for JavaScript
- **Mongoose**: MongoDB object modeling
- **EJS**: Templating engine for dynamic views

## Usage

After starting the application, you can use tools like Postman or a browser to interact with the API. The following endpoints are available:

- **Create a task**: `POST /tasks/addtask`
- **Get all tasks**: `GET /tasks`
- **Update a task**: `PATCH /task/:TaskId`
- **Delete a task**: `DELETE /task/:TaskId`

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes and commit (`git commit -m 'Add some feature'`)
4. Push the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

## License

This project is licensed under the MIT License.
