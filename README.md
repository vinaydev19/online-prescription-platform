# 🏥 Online Prescription Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application that enables **Doctors and Patients** to interact through:
✔ Online Consultation Forms
✔ Digital Prescription Generation (Auto-PDF)
✔ Secure Authentication (JWT + Cookies)
✔ Patient Medical History Storage
✔ Doctor–Patient Dashboard

This project contains both **frontend** and **backend** with fully implemented APIs, authentication, role-based access, and Cloudinary storage.

---

## 🚀 Features

### 👨‍⚕️ Doctor Features

* Signup/Login with profile photo upload
* View patient consultation submissions
* Create digital prescriptions
* Auto-generate PDF using **PDFKit**
* Upload PDFs to **Cloudinary**
* Update/Delete prescriptions

### 👤 Patient Features

* Signup/Login with photo & medical history
* Browse doctors
* Submit consultation form
* View their prescriptions
* Download prescription PDFs

### 🔐 Security

* JWT Authentication (Access + Refresh Tokens)
* HttpOnly cookies
* Role-based authorization (doctor/patient)
* Password hashing using bcrypt

### ☁ Utilities

* PDF generation using PDFKit
* Cloudinary file uploads
* Multer for file uploads
* Clean API response / error handling

---

## 📦 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* PDFKit
* Cloudinary
* Multer
* JWT Authentication
* Cookie-based sessions

### Frontend

* React + Vite
* Redux Toolkit
* RTK Query
* React Router DOM
* Tailwind CSS
* Hot Toast Notifications

---

## 📂 Project Structure

```
vinaydev19-online-prescription-platform/
│── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── store/
    │   ├── routers/
    │   ├── utils/
    │   └── App.jsx
```

---

# 🛠 Backend Setup

### 1️⃣ Install dependencies

```bash
cd backend
npm install
```

### 2️⃣ Create `env` file

```
PORT=5000
MONGODB_URI=your_mongodb_url
MONGODB_DB_NAME=prescriptionDB

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

CORS_ORIGIN=http://localhost:5173
```

### 3️⃣ Start server

```bash
npm run dev
```

---

# 🌐 API Overview

### 🔹 Authentication Routes

| Method | Endpoint                 | Role   | Description            |
| ------ | ------------------------ | ------ | ---------------------- |
| POST   | `/api/v1/doctors/signup` | Public | Doctor registration    |
| POST   | `/api/v1/doctors/login`  | Public | Doctor login           |
| POST   | `/api/v1/doctors/logout` | Doctor | Logout                 |
| GET    | `/api/v1/doctors/me`     | Doctor | Current doctor details |

| Method | Endpoint                  | Role    | Description             |
| ------ | ------------------------- | ------- | ----------------------- |
| POST   | `/api/v1/patients/signup` | Public  | Patient registration    |
| POST   | `/api/v1/patients/login`  | Public  | Patient login           |
| POST   | `/api/v1/patients/logout` | Patient | Logout                  |
| GET    | `/api/v1/patients/me`     | Patient | Current patient details |

---

## 🧾 Consultation Form API

| Method | Endpoint                                                   | Role    |
| ------ | ---------------------------------------------------------- | ------- |
| POST   | `/api/v1/doctor-consultations/:doctorId/consultation-form` | Patient |
| GET    | `/api/v1/doctor-consultations/consultation-forms`          | Doctor  |

---

## 💊 Prescription API

| Method | Endpoint                                                              | Role    |
| ------ | --------------------------------------------------------------------- | ------- |
| POST   | `/api/v1/patient-prescriptions/create/:patientId/:consultationFormId` | Doctor  |
| GET    | `/api/v1/patient-prescriptions/doctor/all`                            | Doctor  |
| PUT    | `/api/v1/patient-prescriptions/doctor/update/:id`                     | Doctor  |
| DELETE | `/api/v1/patient-prescriptions/doctor/delete/:id`                     | Doctor  |
| GET    | `/api/v1/patient-prescriptions/patient/all`                           | Patient |

---

# 🎨 Frontend Setup

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Start the frontend

```bash
npm run dev
```

---

# 🔄 State Management (Redux Toolkit)

The project uses:

* Redux Toolkit slices for doctors and patients
* RTK Query for all API calls
* Persist storage for user sessions

Example slice:

```js
doctor: { doctor: null, profile: null }
patient: { patient: null, profile: null }
```

---

# 📘 How to Use the App

### 👤 Patient Workflow

1. Register → Login
2. Browse doctors
3. Select doctor → Fill consultation form
4. Submit
5. View prescriptions in dashboard

### 👨‍⚕ Doctor Workflow

1. Register → Login
2. See all submitted consultation forms
3. Create prescription (Auto PDF generated)
4. Patient can download generated PDF

---

# 📄 PDF Generation

PDFs are generated via **PDFKit** and include:

* Doctor details
* Patient details
* Care instructions
* Medicines
* Timestamp

PDF is stored temporarily → uploaded to Cloudinary → local file deleted.

---

# 🧪 Possible Improvements

* Add Admin panel
* Add video consultation
* Add doctor schedules & appointments
* Enable prescription verification QR
* Add payment gateway (Razorpay)

---

# 🤝 Contributing

Pull requests are welcome.
Please open an issue if you want to request a feature or report a bug.

---

# ⭐ Show Support

If you like this project, give it a **star ⭐ on GitHub**!
