# 🛡️ FileGuard Frontend (React + Vite)

FileGuard Frontend is the web interface for **FileGuard**, a secure and intelligent file management system that allows users to upload, categorize, and analyze files with real-time analytics and storage insights.  
Built with **React + Vite** for speed, maintainability, and developer experience.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** via **Supabase**
- 📁 **File Management** — upload, view, delete, and organize files
- 📊 **Analytics Dashboard** — track file types, usage statistics, and upload history
- 💸 **Payment Integration** with **PayPal**
- ⚡ **Fast Development** — powered by **Vite** and **React**
- 🎨 **Modern UI** using **Tailwind CSS**

---

## 🧩 Tech Stack

| Category                      | Tool                              |
| ----------------------------- | --------------------------------- |
| **Frontend Framework**        | React + Vite                      |
| **UI Framework**              | Tailwind CSS, DaisyUI             |
| **Routing**                   | React Router DOM                  |
| **API Communication**         | Axios                             |
| **Backend API**               | Django REST API (`VITE_API_LINK`) |
| **Authentication & Database** | Supabase                          |
| **Payment Gateway**           | PayPal REST API                   |

---

## ⚙️ Environment Variables Setup

Before running the app, create a `.env` file in the **root** directory of your project and add the following environment variables:

```env
# API
VITE_API_LINK=http://127.0.0.1:8000/api

# SUPABASE
VITE_SUPABASE_PROJECT_URL=https://irnkkwywoqxvchtmooto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlybmtrd3l3b3F4dmNodG1vb3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTg4ODIsImV4cCI6MjA3NDM3NDg4Mn0.srbROiMWJQe1IYDdRIaEOY3vdo_qaWdUAqHDHfE9wNc
VITE_SUPABASE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlybmtrd3l3b3F4dmNodG1vb3RvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODc5ODg4MiwiZXhwIjoyMDc0Mzc0ODgyfQ.rxGn9BSAIAycXG4IF20wzUuSJNbQEq_sDOZzedZascU

# PAYPAL
VITE_PAYPAL_CLIENT_ID=AU1UXOnUYxbOmEsrADt5gjt4SdR2w9tUrzM6uE01Sev6s-0F41St5bSE5DcVpRY7iR4LqTuUXGc1YxEp
```

🧰 Installation Guide
1️⃣ Clone the Repository
git clone https://github.com/your-username/fileguard-frontend.git
cd fileguard-frontend

2️⃣ Install Dependencies
npm install

3️⃣ Create and Configure .env

Copy the variables above into your .env file and ensure the backend API URL matches your Django server.

4️⃣ Run the Development Server
npm run dev

5️⃣ Open in Browser
http://localhost:5173
