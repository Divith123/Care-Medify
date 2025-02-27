# Care Medify - Appointment Booking System

Care Medify is a modern web application designed to streamline the appointment booking process for patients and healthcare providers. It leverages React, Shadcn/ui components, and Tailwind CSS to deliver a seamless and user-friendly experience. The system supports features like doctor search, appointment scheduling, report analysis, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Core Features
1. **Doctor Search**:
   - Browse doctors by specialty.
   - View detailed profiles for each doctor.
2. **Appointment Booking**:
   - Select date, time slot, and consultation type.
   - Provide symptoms or reasons for the visit.
   - Receive immediate feedback upon successful booking.
3. **Report Analysis**:
   - Upload medical reports for analysis.
4. **Authentication**:
   - User registration and login functionality.
5. **Chatbot Integration**:
   - Access a chatbot for quick assistance.

### Additional Features
- **Responsive Design**: Optimized for mobile and desktop devices.
- **Accessibility**: ARIA roles and live regions for screen readers.
- **UI Components**: Reusable components powered by Shadcn/ui.

---

## Technologies Used

- **Frontend Framework**: Next.js (React-based framework)
- **UI Library**: Shadcn/ui (Customizable and reusable components)
- **Styling**: Tailwind CSS (Utility-first CSS framework)
- **State Management**: React Hooks (e.g., `useState`, `useEffect`)
- **API Handling**: Groq (for querying data) and custom utilities in `/lib`
- **Notifications**: Sonner (Toast notifications)
- **Image Handling**: Placeholder images in `/public`
- **Configuration**: Tailwind CSS, PostCSS, and Next.js configuration files.

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Divith123/Care-Medify.git
   cd care-medify
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

4. Open the application in your browser:

   ```
   http://localhost:3000
   ```

---

## Usage

### Key Pages and Functionality

1. **Home Page**:
   - Displays a hero section, specialties, and featured doctors.
   - Includes a navigation bar and chatbot button.

2. **Doctor Search**:
   - Navigate to `/specialties/[specialty]` to view doctors by specialty.
   - Example: `/specialties/cardiology`.

3. **Appointment Booking**:
   - Visit `/doctors/[id]/book` to book an appointment with a specific doctor.
   - Follow the steps to select date, time, and consultation type.

4. **Login/Register**:
   - Use `/login` to log in and `/register` to create a new account.

5. **Report Analysis**:
   - Upload medical reports at `/report-analyze`.

6. **API Endpoints**:
   - The `/api/upload` endpoint handles file uploads.

---

## Folder Structure

```plaintext
care-medify/
├── app/                     # Next.js pages and routing
│   ├── api/                 # API routes (e.g., file upload)
│   ├── doctors/             # Doctor-related pages
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── report-analyze/      # Report analysis page
│   ├── specialties/         # Specialty-based doctor listings
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/              # Reusable UI components
│   ├── chatbot-button.tsx   # Chatbot integration
│   ├── navbar.tsx           # Navigation bar
│   ├── ui/                  # Shadcn/ui components
│   └── theme-provider.tsx   # Theme provider for dark/light mode
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and services
├── public/                  # Static assets (images, logos, etc.)
├── styles/                  # Global CSS styles
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your descriptive commit message"
   ```

4. Push your changes:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request on GitHub.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, feel free to reach out:

- Email: your-email@example.com
- GitHub: [@your-username](https://github.com/your-username)
