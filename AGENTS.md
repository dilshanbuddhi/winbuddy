# AGENTS.md - EvoPlay Sales Frontend

This document provides essential information for AI coding agents working on this React + Vite + Tailwind CSS project.

## Project Overview

EvoPlay Sales is a sales management application with user authentication, email verification, and a comprehensive dashboard for managing sales, sellers, leaderboards, payouts, and account settings.

## Build, Lint, and Test Commands

### Development
```bash
npm run dev        # Start development server (usually http://localhost:5173)
```

### Build
```bash
npm run build      # Production build (output to dist/)
npm run preview    # Preview production build locally
```

### Linting
```bash
npm run lint       # Run ESLint on the codebase
```

### Testing
Currently, no test framework is configured. To run a single test (when tests are added):
- **Jest**: `npm test -- path/to/test.test.js`
- **Vitest**: `npm test -- path/to/test.test.js`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.jsx      # Main layout with sidebar
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── EmailVerificationModal.jsx
├── pages/              # Page components
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page with email verification
│   ├── Sales.jsx       # Main sales submission page
│   ├── Dashboard.jsx   # Analytics dashboard
│   ├── Sellers.jsx     # Seller management
│   ├── Leaderboard.jsx # Sales leaderboard
│   ├── Payouts.jsx     # Payout management
│   └── Account.jsx     # User account settings
├── App.jsx             # Main app with routing
├── main.jsx            # Application entry point
└── index.css           # Global styles with Tailwind directives
```

## Routing Structure

- `/login` - Login page
- `/register` - Registration page
- `/` - Redirects to `/sales`
- `/sales` - Sales submission page (default)
- `/dashboard` - Analytics dashboard
- `/sellers` - Seller management
- `/leaderboard` - Sales rankings
- `/payouts` - Payout management
- `/account` - Account settings

All routes except `/login` and `/register` use the `Layout` component with sidebar navigation.

## Code Style Guidelines

### Imports
- Group imports in this order:
  1. React and React-related packages
  2. Third-party libraries
  3. Local components
  4. Styles
  
```javascript
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import CustomComponent from '../components/CustomComponent'
```

### Component Structure
- Use functional components with hooks
- Use named exports for pages, default exports for components
- Place state declarations at the top of the component
- Group related state together

### Naming Conventions
- **Components**: PascalCase (e.g., `EmailVerificationModal.jsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables/Functions**: camelCase (e.g., `handleSubmit`, `formData`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **CSS Classes**: Use Tailwind utility classes

### Formatting
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JavaScript, double quotes for JSX attributes
- **Semicolons**: Use semicolons
- **Line Length**: Prefer breaking at 100 characters for readability

### TypeScript/Types
- Currently using JavaScript (no TypeScript)
- When adding TypeScript, use `.tsx` for components
- Prefer interfaces over types for object shapes

### State Management
- Use React hooks (`useState`, `useEffect`) for local state
- For forms, use controlled components with state
- Pass callbacks via props for parent-child communication

### Styling (Tailwind CSS)
- Use Tailwind utility classes directly in JSX
- Common patterns in this project:
  - Buttons: `bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition`
  - Inputs: `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`
  - Cards: `bg-white rounded-xl shadow-lg p-8`
- Responsive design: Use `md:`, `lg:` prefixes for breakpoints

### Error Handling
- Validate forms before submission
- Display validation errors inline below inputs
- Use error state to show/hide error messages
- Show user-friendly error messages

### Modals and Popups
- Use fixed positioning with backdrop: `fixed inset-0 bg-black bg-opacity-50`
- Center modals with flexbox: `flex items-center justify-center`
- Provide close functionality via `onClose` callback
- Use z-index to ensure modals appear above content: `z-50`

### Forms
- Use controlled components (value + onChange)
- Validate on submit, clear errors on input change
- Provide visual feedback for errors (red borders, error messages)
- Use semantic HTML (`type="email"`, `type="tel"`, etc.)

### Navigation
- Use `react-router-dom` for routing
- Use `NavLink` for navigation items to get active state
- Use `useNavigate` hook for programmatic navigation
- Use `Link` component for anchor-style navigation

## Best Practices

1. **Component Reusability**: Extract repeated UI patterns into components
2. **Prop Validation**: Consider adding PropTypes or TypeScript for type safety
3. **Accessibility**: Use semantic HTML, proper labels, and ARIA attributes
4. **Performance**: Use React.memo for expensive components, avoid inline function definitions in render
5. **Code Organization**: Keep components small and focused, split large components
6. **State Management**: Lift state up when needed by multiple components
7. **API Integration**: Create a separate `services/` or `api/` directory for API calls
8. **Constants**: Store magic numbers, API endpoints, and config in constants files
9. **Error Boundaries**: Add error boundaries for graceful error handling
10. **Loading States**: Show loading indicators during async operations

## Common Patterns in This Project

### Form Handling
```javascript
const [formData, setFormData] = useState({ field: '' })
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}
```

### Modal Pattern
```javascript
const [showModal, setShowModal] = useState(false)
// Conditional rendering
{showModal && <Modal onClose={() => setShowModal(false)} />}
```

### Navigation
```javascript
const navigate = useNavigate()
navigate('/sales')
```

## Assets

- Logo: `/evoplay.png` (placed in public directory)
- Reference logo in components: `<img src="/evoplay.png" alt="Logo" />`

## Environment Variables

Create a `.env` file for environment-specific configuration:
```
VITE_API_URL=http://localhost:3000/api
```

Access in code: `import.meta.env.VITE_API_URL`

## Notes for AI Agents

- The logo file `evoplay.png` must be in the `public/` directory to be accessible
- When adding new pages, update both `App.jsx` routes and `Sidebar.jsx` navigation
- All authenticated pages should use the Layout component for consistent navigation
- Forms should validate input and show user-friendly error messages
- Use the existing color scheme: blue (#2563eb) for primary actions, purple for registration
- Maintain consistent spacing and shadow patterns as shown in existing components
