# Next.js Task

This is a real-time chat application built using **Next.js**, **Firebase**, and **WebSockets**. It includes features like authentication, live user updates, and more. This project is designed as part of a learning experience to integrate various technologies and build a real-time communication platform.

## Features

- **Authentication**: User authentication using Firebase Authentication.
- **Real-time Communication**: WebSocket integration for live messaging and updates.
- **Light/Dark Mode**: Toggle between light and dark themes using `next-themes`.
- **User Analytics**: Track the number of active users in real-time.

---

## 📁 Project Structure

```
src/
  app/
    dashboard/
      page.tsx
    login/
      page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    ActiveUsersChart.tsx
    Chat.tsx
    ThemeToggle.tsx
  lib/
    firebase.ts
    websocket.tsx
  providers/
server.ts
```

- **`app/`**: Main application pages (dashboard, login, global layout).
- **`components/`**: Reusable UI components like Chat box, Theme toggler, and Active Users Chart.
- **`lib/`**: Firebase and WebSocket logic files.
- **`server.ts`**: Standalone WebSocket server running on port 3001.

---

## ⚙️ Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/madhav182004/next-js-task.git
   cd next-js-task
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root and paste the following:

   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_NEXT_PUBLIC_FIREBASE_APP_ID
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
   ```

---

## 🚀 Running the Project

There are **two servers** that need to be started separately:

### 1. Start the Next.js Frontend

```bash
npm run dev
```

- Runs the frontend on [http://localhost:3000](http://localhost:3000).

---

### 2. Start the WebSocket Server

```bash
npm run ws
```

- Runs the WebSocket server on [http://localhost:3001](http://localhost:3001).

---

## 📜 Available Scripts

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `npm run dev` | Runs the Next.js development server  |
| `npm run ws`  | Runs the WebSocket server on port 3001 |

---

## 🛠️ Technologies Used

- Next.js (App Router)
- React.js
- TypeScript
- WebSocket
- Firebase
- Tailwind CSS

---

## 🔥 Important Notes

- Both servers must be running simultaneously for the app to function properly.
- Environment variables must be set correctly before running the project.

---

## 🙋‍♂️ Author

**Madhav**

- 🐙 [GitHub](https://github.com/madhav182004)

---

## 📄 License

This project is created for educational purposes.
