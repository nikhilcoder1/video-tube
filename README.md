
# 🎥 VideoTube Backend — Full YouTube-Style Video Platform API

## 🚀 Overview
VideoTube is a complete, production-grade **YouTube-like backend** built using **Node.js**, **Express.js**, and **MongoDB**.

It includes:
- Video uploads
- Likes & comments
- Playlists
- Subscriptions
- Tweets
- Dashboard analytics
- Authentication with JWT
- File uploads with Multer
- Clean folder architecture

---

## 🏗️ Key Features

### 🔐 Authentication System
- Register / Login / Logout
- Access + Refresh token flow
- Update profile, avatar, cover image

### 🎬 Video Management
- Upload videos
- Update video details
- Fetch single/all videos
- Delete video
- Search videos
- Increment views

### 💬 Comments
- Add comment
- Edit comment
- Delete comment
- Fetch comments for a video

### 👍 Likes
- Toggle like for video
- Toggle like for comment
- Toggle like for tweet

### 📝 Tweets
- Create tweet
- Edit tweet
- Delete tweet

### 🎵 Playlists
- Create playlist
- Add video
- Remove video
- Delete playlist

### 👥 Subscriptions
- Subscribe / Unsubscribe to channels
- Subscriber stats
- Channel list

### 📊 Dashboard Analytics
- Total views
- Most liked videos
- Channel-level stats

### 🏥 Health Check
- `/healthcheck` endpoint

---

## 🧩 Tech Stack

| Layer | Technology |
|------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (Access & Refresh Tokens) |
| Uploads | Multer |
| Validators | Custom validation middleware |
| Utilities | Custom Error, Response, Async Wrapper |
| Formatting | Prettier |

---

## 📁 Folder Structure

```
src/
│
├── controllers/       
├── middlewares/       
├── models/            
├── routes/            
├── utils/             
├── db/                
├── constants.js       
├── app.js             
└── index.js           
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/video-tube-backend.git
cd video-tube-backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure `.env`
```
PORT=8000
MONGODB_URI=your_mongo_connection
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
```

### 4️⃣ Run server
```bash
npm run dev
```

---

## 🧪 API Overview

### Auth
| Method | Endpoint |
|--------|----------|
| POST | /auth/register |
| POST | /auth/login |
| POST | /auth/logout |
| GET  | /auth/me |

### Videos
| Method | Endpoint |
|--------|----------|
| POST | /videos |
| GET  | /videos |
| GET  | /videos/:id |
| PATCH | /videos/:id |
| DELETE | /videos/:id |

### Likes
- /likes/video/:id  
- /likes/comment/:id  
- /likes/tweet/:id  

### Comments
- /comments/:videoId  
- /comments/edit/:id  
- /comments/delete/:id  

### Tweets
- /tweets  
- /tweets/:id  

### Playlists
- /playlists  
- /playlists/:id/add/:videoId  
- /playlists/:id/remove/:videoId  

### Subscriptions
- /subscriptions/:channelId  

### Dashboard
- /dashboard/stats  
- /dashboard/videos  

---

## 👨‍💻 Author
**Nikhil Pandey**  
Full Stack Developer (MERN + Node.js)  
GitHub: https://github.com/nikhilcoder1  

---

## 📜 License
MIT License
