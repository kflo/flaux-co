# Flaux-Co React

This is a React TypeScript port of the Angular Flaux-Co project, created with Vite.

## Overview

This React application replicates the functionality and design of the original Angular Flaux-Co project, featuring:

- **React Router** for navigation
- **TypeScript** for type safety
- **SCSS** for styling with the same design system
- **Vite** for fast development and building
- **Component-based architecture** matching the Angular structure

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── navbar/         # Navigation bar component
│   └── dropdown-menu/  # Dropdown menu component
├── pages/              # Page components for each route
│   ├── home/           # Home page with sections
│   ├── solutions/      # Solutions page
│   ├── demo/           # Demo page
│   ├── pricing/        # Pricing page
│   ├── blog/           # Blog page
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── login/          # Login page
│   ├── signup/         # Signup page
│   ├── reset-password/ # Reset password page
│   ├── checkout/       # Checkout page
│   └── dashboard/      # Dashboard page
├── services/           # Service utilities (UX service)
├── shared/             # Shared components and utilities
└── assets/             # Static assets (images, icons, etc.)
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run preview`
Preview the production build locally.

### `npm run lint`
Runs ESLint to check for code quality issues.

## Features Implemented

✅ **Core App Structure**
- React Router setup with all routes
- Component-based architecture
- TypeScript configuration with path aliases

✅ **Navigation Components**  
- Navbar with logo and navigation links
- Dropdown menu with all secondary pages
- Active route highlighting
- Mobile-responsive design

✅ **Page Components**
- Home page with hero and feature sections
- All navigation pages (Solutions, Demo, Pricing, etc.)
- Consistent styling and layout

✅ **Styling System**
- SCSS with variables matching Angular version
- Responsive design patterns
- Font imports and styling parity

✅ **Assets**
- Logo and image assets copied from Angular version
- Public asset serving configured

## Development

The React project runs independently and can be developed alongside the Angular version. The development server runs on port 5173 to avoid conflicts with the Angular dev server.

## Future Enhancements

The following features from the Angular version can be added:
- Firebase/DataConnect integration
- HLS video player components  
- Lottie animation components
- Form validation and user authentication
- Advanced component interactions

## Running from Root Directory

From the main project root, you can use these commands:
- `npm run react:dev` - Start React development server
- `npm run react:build` - Build React project
- `npm run react:preview` - Preview React build
- `npm run react:lint` - Lint React project
