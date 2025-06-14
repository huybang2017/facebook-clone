# 📱 SocialConnect – A Social Media Platform with Toxic Content Moderation

## 📝 Overview

**SocialConnect** is a modern social media platform inspired by Facebook. It is built using **React** for the frontend and **Spring Boot** for the backend. The system integrates a **Python-based machine learning model** to detect and filter out toxic comments and posts in real-time, promoting a safe and respectful online environment.

---

## 💻 Tech Stack

### Frontend:
- React
- Tailwind CSS
- Axios
- React Router
- Redux Toolkit

### Backend:
- Spring Boot
- Spring Security
- JPA/Hibernate
- MySQL or PostgreSQL

### AI Service:
- Python (Flask or FastAPI)
- Pretrained ML model (e.g., BERT, Detoxify)
- Toxic comment dataset (Jigsaw Toxic Comment Classification)

### Deployment:
- Docker
- Nginx
- CI/CD (GitHub Actions or Jenkins)

---

## ⚙️ Key Features

### ✅ Social Features
- User registration & login (JWT authentication)
- Friend request and follow system
- Post status updates with media (images/videos)
- Like, comment, and react to posts
- Real-time notifications

### 🔐 Security & Moderation
- Role-based access (admin, moderator, user)
- Auto-moderation using AI for toxic content
- Flagged posts/comments for manual review

### 🤖 AI Integration
- Flask/FastAPI REST endpoint (e.g., `/check-toxic`)
- Input: text; Output: toxicity label(s)
