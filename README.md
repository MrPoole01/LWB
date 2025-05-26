# Legacy Wealth Builders - Lead Capture System

A modern web application for capturing leads and distributing a comprehensive guide on precious metals investment.

## Features

- 🎯 Lead capture form with validation
- 📧 Automated email notifications
- 📄 PDF guide distribution
- 🔒 Secure data handling
- 📱 Responsive design
- ✨ Modern UI with animations

## Tech Stack

### Frontend
- React with TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js with Express
- TypeScript
- Nodemailer for email handling
- CORS enabled
- Environment-based configuration

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:
   - Create `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=3001
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-specific-password
     ADMIN_EMAIL=admin@example.com
     FRONTEND_URL=http://localhost:5173
     ```

### Development

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
npm run dev
```

### Testing

To test the API endpoints:
```bash
cd server
npm test
```

## Deployment

The application is configured for deployment on Render.com. The `render.yaml` file contains the necessary configuration.

### Environment Variables for Production
Make sure to set the following environment variables in your production environment:
- `EMAIL_USER`
- `EMAIL_PASS`
- `ADMIN_EMAIL`
- `FRONTEND_URL`
- `NODE_ENV=production`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For any questions or concerns, please contact [your-email@example.com] 