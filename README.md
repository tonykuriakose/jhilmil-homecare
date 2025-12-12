# Jhilmil HomeCare Dashboard


🔗 **Live Demo:** [https://jhilmil-homecare-orpin.vercel.app/]

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
- **State Management**: React Context API
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
├── components/       # Modal, PatientCard, Forms
├── context/          # State Management
├── data/             # Mock data
├── pages/            # Dashboard, PatientDetails
└── App.jsx           # Main App Entry
```
