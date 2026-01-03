# 📅 Calendar Appointment Scheduling App

A full-stack **multi-user calendar and appointment scheduling system** that allows users to create accounts using phone numbers, schedule appointments or calls, manage approvals, and join video calls via **Jitsi Meet**.

---

## 🚀 Features

- Phone number–based login (no OTP)
- Multi-user appointment and call scheduling
- Month view and day view calendar (1-hour slots)
- Accept / reject appointment requests
- Automatic conflict detection for overlapping appointments
- In-app notifications for requests and responses
- Video call support using auto-generated **Jitsi Meet** links

---

## 🧠 How It Works

- Users log in using their phone number.
- Appointments or calls can be scheduled with multiple participants.
- Each participant can **accept or reject** the request.
- Once all participants accept a **call**, a Jitsi Meet link is generated.
- Accepted appointments appear in the calendar (month & day views).
- Clicking **Join** opens the Jitsi Meet call in a new tab.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **FullCalendar**

### Backend
- **Node.js**
- **Express**
- **PostgreSQL**
- **JWT Authentication**

### Video Calls
- **Jitsi Meet** (URL-based integration)

---

## 📁 Project Structure

