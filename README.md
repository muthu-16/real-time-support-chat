# 💬 Real-Time Support Chat

## 📋 Internship Details

| Field | Details |
|--------|---------|
| **Intern ID** | CITS4794 |
| **Name** | Muthu B |
| **Domain** | Full Stack Web Development |
| **Duration** | 4 Weeks |
| **Project Name** | Real-Time Support Chat |
# 💬 Real-Time Support Chat

## 📌 Project Overview

The **Real-Time Support Chat** is a full-stack web application that enables instant communication between customers and support agents. Built using the MERN Stack and Socket.IO, the application provides a seamless real-time messaging experience with secure authentication, conversation management, and responsive user interfaces.

This project demonstrates modern full-stack development practices, including REST APIs, WebSocket communication, JWT authentication, MongoDB integration, and deployment-ready architecture.

---

## 🎯 Project Objectives

* Build a secure real-time messaging platform.
* Implement instant communication using Socket.IO.
* Store conversations and messages in MongoDB.
* Provide user authentication and authorization.
* Create a responsive and modern user interface.
* Demonstrate production-ready MERN stack development.

---

# 🚀 Features

## 👤 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Logout

---

## 💬 Real-Time Chat

* Instant One-to-One Messaging
* Live Message Delivery
* Online / Offline Status
* Typing Indicator
* Message Read Status
* Message Time Stamps
* Auto Scroll

---

## 📂 Conversation Management

* Create Conversations
* View Chat History
* Delete Conversations
* Search Conversations
* Unread Message Count

---

## 👤 User Profile

* View Profile
* Update Profile
* Upload Profile Picture
* Last Seen Status

---

## ⚙️ Admin Dashboard

* View All Users
* Monitor Active Conversations
* Manage Messages
* Dashboard Statistics

---

## 🔔 Notifications

* New Message Alerts
* Unread Message Badge
* Browser Notifications (Optional)

---

## 📱 Responsive Design

* Desktop Support
* Tablet Support
* Mobile Support
* Dark Mode

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Socket.IO Client
* React Hot Toast

## Backend

* Node.js
* Express.js
* Socket.IO
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# 📂 Project Structure

```text
Real-Time-Support-Chat/

client/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx

server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── socket/
├── utils/
├── server.js
└── package.json
```

---

# 📦 Database Collections

### User

* Name
* Email
* Password
* Avatar
* Online Status
* Last Seen
* Created At

### Conversation

* Members
* Last Message
* Updated At

### Message

* Conversation ID
* Sender
* Receiver
* Message
* Image
* File
* Seen Status
* Created At

---

# 🔌 REST API Endpoints

## Authentication

* POST /api/auth/register
* POST /api/auth/login
* GET /api/auth/profile
* PUT /api/auth/profile

## Users

* GET /api/users
* GET /api/users/:id

## Conversations

* POST /api/conversations
* GET /api/conversations
* DELETE /api/conversations/:id

## Messages

* POST /api/messages
* GET /api/messages/:conversationId
* DELETE /api/messages/:id

---

# ⚡ Socket.IO Events

* connection
* disconnect
* join_room
* send_message
* receive_message
* typing
* stop_typing
* user_online
* user_offline
* message_seen

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing
* Input Validation
* Protected API Routes
* Environment Variables
* CORS Protection
* Rate Limiting
* Helmet Security
* XSS Protection

---

# 📸 Screenshots

### Login Page

*Add project screenshot here.*

---

### Chat Dashboard

*Add project screenshot here.*

---

### User Profile

*Add project screenshot here.*

---

### Admin Dashboard

*Add project screenshot here.*

---

### Mobile View

*Add project screenshot here.*

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Real-Time-Support-Chat.git
```

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
npm install
npm run dev
```

---

# 🌍 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

# 📈 Future Improvements

* Group Chat
* Voice Calling
* Video Calling
* Message Reactions
* File Sharing
* Push Notifications
* Chat Export
* AI Chat Assistant

---

# 🎓 Learning Outcomes

This project demonstrates practical knowledge of:

* MERN Stack Development
* REST API Design
* Socket.IO Real-Time Communication
* MongoDB Database Design
* Authentication & Authorization
* Responsive UI Development
* Full Stack Deployment
* Version Control with Git & GitHub

---

# 👨‍💻 Author

**Muthu B**

**Domain:** Full Stack Web Development

---

# ⭐ If you found this project useful, consider giving it a star on GitHub!
