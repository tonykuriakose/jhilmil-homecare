# Jhilmil HomeCare Dashboard

A modern, responsive healthcare dashboard for managing patient care, tracking vitals, and scheduling. Built with **React** and styled with **Tailwind CSS**.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Jhilmil+HomeCare+Dashboard)
*(Note: Replace with actual screenshot)*

## 🚀 Features

### 📊 Interactive Dashboard
- **Summary Statistics**: Real-time view of Total Patients, Active Cases, and Alerts.
- **Advanced Filtering**: Filter patients by status (Active, Pending, Archived).
- **Search**: Instant search by Patient Name or Caregiver.

### 👤 Patient Management
- **Detailed Profiles**: View comprehensive patient info including age, address, and medical notes.
- **Edit Profile**: Update patient details (Name, Note, Caregiver) with changes persisted locally.
- **Medication Tracking**: View and add new medications (Dosage, Frequency, Status).
- **Appointment Scheduling**: Schedule new appointments directly from the profile.

### 🛠 Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API (Local state persistence)
- **Routing**: React Router

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jhilmil-homecare.git
   cd jhilmil-homecare
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Modal, PatientCard, Forms)
├── context/          # State Management (PatientContext)
├── data/             # Mock data for initial state
├── pages/            # Main Page Views (Dashboard, PatientDetails)
└── App.jsx           # Main Application Entry
```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
Built with ❤️ for Jhilmil HomeCare.
