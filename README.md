# Certificate Generation & Verification System

This repository contains the backend and frontend services for generating and verifying certificates.

## Project Structure

```
certificates/
├── backend/          # Express + TypeScript API server & PDF generator
│   ├── src/          # Source code
│   └── package.json  # Backend dependencies and scripts
├── frontend/         # Vite + React + TypeScript web app
│   ├── src/          # React components and pages
│   └── package.json  # Frontend dependencies and scripts
└── README.md
```

## Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # configure MONGODB_URI and PORT
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
