# Apartment Management System (AMS) Frontend

Frontend for the Apartment Management System, built with Next.js, React, and Tailwind CSS.

## Features

- User authentication (login/logout)
- Role-based access control
- Dashboard for user information
- Secure API communication with JWT

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Create a `.env.local` file in the root directory with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Authentication

The application uses JWT (JSON Web Token) for authentication. When a user logs in, the token is stored in the browser's localStorage. The token is automatically included in all subsequent API requests.

### Default Admin User

To log in with the default admin user:

- Username: `admin`
- Password: `admin123`

## Project Structure

```
src/
├── app/                # Next.js App Router
│   ├── login/          # Login page
│   ├── dashboard/      # Dashboard pages
│   └── page.tsx        # Home page
├── services/           # API services
│   ├── api.ts          # API base configuration
│   └── auth.service.ts # Authentication service
├── middleware.ts       # Next.js middleware for route protection
```

## Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```
