---
title: "E-Medicals — Healthcare Management System"
description: "A comprehensive MERN-stack healthcare platform integrating hospitals, pharmacies, and laboratories with patient-centric workflows."
technologies: ["React", "Bootstrap", "Node.js", "Express", "MongoDB", "EJS"]
category: "Academic / Major Project"
status: "Completed"
github: "https://github.com/RJRYT/E-medicalsFrontend"
live: ""
image: "/images/projects/e-medicals.png"
featured: true
date: "2024-04-29"
---

# E-Medicals — Healthcare Management System

## Overview

**E-Medicals** is a major college project built with the **MERN stack**, designed to **unify hospital, pharmacy, laboratory, and patient workflows** into a single healthcare management platform.  
The system enhances efficiency, ensures better patient care, and fosters collaboration among healthcare providers.  

It supports patient registration, appointment scheduling, prescriptions, lab results management, and pharmacy orders — all integrated into one solution.

---

## Features

- **Patient-centric workflows**: registration, appointments, prescription sharing, results tracking  
- **Hospital management**: doctor assignment, patient monitoring, report access  
- **Laboratory module**: appointment approvals, test management, results uploading  
- **Pharmacy management**: order confirmation, prescription-based medicine management  
- **Doctor tools**: schedule handling, patient history, prescription creation  
- **Admin control panel**: global view of patients, hospitals, doctors, and tests  
- **Inventory & stock management** for pharmacies  
- **Secure authentication** for all roles  
- **Scalable architecture** designed for healthcare digitization  

---

## Tech Stack

### Frontend
- React 18  
- Bootstrap 5  
- Formik + Yup (forms and validation)  
- Axios (API handling)  
- html2canvas + file-saver (export/download support)  
- React Router DOM for navigation  

### Backend
- Node.js + Express  
- MongoDB with Mongoose  
- Multer for file uploads (e.g., lab results, prescriptions)  
- Body-parser, CORS, sessions  
- Nodemon for development  

---

## Functional Modules

### 🔹 Admin Module
- Login and session management  
- Manage patients, hospitals, doctors, tests  
- Global control of the system  

### 🔹 Patient Module
- Register and login  
- Book/view appointments  
- View test results  
- Share prescriptions with pharmacies  

### 🔹 Lab Module
- Login and dashboard view  
- Add/view tests  
- Approve/reject appointments  
- Upload test results  

### 🔹 Hospital Module
- Register hospitals and doctors  
- Add/view doctors  
- Manage patient profiles and visits  

### 🔹 Pharmacy Module
- Login and manage stock  
- Review and confirm prescription orders  
- View/manage existing orders  

### 🔹 Doctor Module
- Login and manage schedule  
- View appointments and results  
- Add prescriptions and treatment notes  
- Manage doctor profile  

---

## Functional Requirements (Sample Highlights)

- **FN 1: Patient Registration** → Inputs: pname, email, dob → Output: successful account creation  
- **FN 2: Appointment Booking** → Inputs: test, time, date → Output: booking confirmed  
- **FN 3: Lab Add Result** → Inputs: testid, details → Output: result added successfully  
- **FN 4: Pharmacy Order Confirmation** → Inputs: prescription id → Output: order confirmed  
- **FN 5: Doctor Prescription** → Inputs: medicine name, dosage → Output: prescription stored  

*(See detailed FRD for full specification.)*

---

## Project Stats

- **Frontend Dependencies**: 9+  
- **Backend Dependencies**: 7+  
- **Major Modules**: 6 (Admin, Patient, Hospital, Doctor, Lab, Pharmacy)  
- **Status**: Major College Project, Completed April 29, 2024  

---

## Links

- **GitHub Frontend**: [E-medicalsFrontend](https://github.com/RJRYT/E-medicalsFrontend)  
- **Github Backend**: [E-medicalsBackend](https://github.com/RJRYT/E-medicalsBackend)
