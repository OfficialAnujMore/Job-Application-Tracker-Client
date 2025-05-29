# Application Tracker - Client

A modern React application for tracking job applications with a beautiful UI and robust features.

## Features

- User authentication (login/register)
- Dashboard with application statistics
- CRUD operations for job applications
- Filtering and searching applications
- Responsive design
- Theme customization
- Form validation
- Error handling
- Session management

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- React Router
- Formik & Yup
- Axios
- date-fns

## Project Structure

```
src/
├── assets/         # Static assets (images, icons)
├── components/     # Reusable components
│   ├── common/    # Common UI components
│   └── ...        # Feature-specific components
├── context/       # React context providers
├── pages/         # Page components
├── services/      # API services
├── theme/         # Theme configuration
├── types/         # TypeScript type definitions
└── utils/         # Utility functions and hooks
    ├── constants.ts   # Application constants
    ├── helpers.ts    # Helper functions
    ├── hooks.ts      # Custom React hooks
    ├── styles.ts     # Common styles
    ├── text.ts       # Text styles
    └── validation.ts # Form validation schemas
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the values in `.env` with your configuration.

3. Start the development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5001/api)

## Available Scripts

- `npm start`: Start development server
- `npm test`: Run tests
- `npm run build`: Build for production
- `npm run eject`: Eject from Create React App
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Use consistent naming conventions

## Best Practices

1. Component Organization:
   - Keep components small and focused
   - Use common components for consistency
   - Implement proper prop types
   - Handle loading and error states

2. State Management:
   - Use React Context for global state
   - Implement proper form validation
   - Handle API errors gracefully
   - Manage loading states

3. Styling:
   - Use MUI's styling system
   - Maintain consistent spacing
   - Follow responsive design principles
   - Use theme variables

4. Performance:
   - Implement proper memoization
   - Use lazy loading for routes
   - Optimize images and assets
   - Minimize bundle size

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

MIT
