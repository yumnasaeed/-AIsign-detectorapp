#  AIsign-detectorapp
#  AI Sign Language Detector Web Application

##  Overview
This is a full-stack AI Sign Language Detection web application built using frontend and backend integration. The project simulates AI-based sign language recognition and returns detected gestures with confidence scores through an API.

The system demonstrates how a web app can communicate with a Python backend to process and return AI-like predictions.

---

##  Features
 Simple web-based user interface
 Simulated AI sign language detection
 Confidence score for each prediction
 Frontend–Backend API communication
 CORS-enabled backend support
 Lightweight Python HTTP server (no frameworks)

---

## Technology Used
- HTML, CSS, JavaScript (Frontend)
- Node.js (Frontend environment)
- Python (Backend API)
- JSON handling
- HTTP server (`http.server`)

> Note: This version uses simulated AI logic (random predictions). It can be upgraded to real computer vision using OpenCV.

---

##  AI Concept (Upgrade Path)
In real-world applications, sign language detection uses:
- OpenCV for image processing
- Deep Learning (CNN models)
- Hand tracking & landmark detection
- TensorFlow / PyTorch models

---

## 📁 Project Structure
project-root/
│
├── frontend/
│ ├── node_modules/
│ ├── package.json
│ ├── package-lock.json
│ └── src/
│ ├── index.js
│ └── index.html
│
├── backend/
│ └── server.py
│
└── README.md


---

## ⚙️ How to Run

### 1️⃣ Run Backend
```bash
cd backend
python server.py

Backend will start at:

http://localhost:5002
2️⃣ Run Frontend
cd frontend
npm install
npm start

Frontend will run at:

http://localhost:3000
🔗 API Endpoint
POST /

Returns a random detected sign:

{
  "sign": "Hello",
  "confidence": 92.5,
  "detected": true
}
🔄 Workflow
User opens web application
Frontend sends request to backend
Backend randomly selects a sign (simulated AI)
Response is sent back in JSON format
UI displays detected sign and confidence
📈 Future Improvements
Integrate OpenCV for real-time webcam detection
Replace random logic with trained ML model
Add live camera input feature
Improve UI/UX design
Deploy on cloud (AWS / Vercel / Render)
👨‍💻 Author

Developed by: Your Name
Project: AI Sign Language Detector
Category: Computer Vision + Web Development