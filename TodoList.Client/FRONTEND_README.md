# TodoList Frontend

A premium-looking, fully-functional React frontend for the TodoList API built with React 19, TypeScript, and Vite.

## Features

✨ **Premium UI Design**
- Modern gradient header with progress tracking
- Smooth animations and transitions
- Dark mode support
- Responsive design (mobile, tablet, desktop)
- Beautiful task cards with status indicators
- Floating action buttons and modals

🎯 **Task Management**
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status (All, Pending, Completed)
- Real-time status updates
- Deadline tracking with visual indicators
- Task descriptions and detailed views

🎨 **User Experience**
- Intuitive form validation
- Empty state with helpful guidance
- Loading states with spinner animations
- Error handling and user feedback
- Quick task status toggles
- Organized task sections

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd TodoList.Client
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

The optimized production files will be generated in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Button.tsx        # Customizable button component
│   ├── Modal.tsx         # Reusable modal dialog
│   ├── TaskCard.tsx      # Individual task display
│   ├── TaskForm.tsx      # Task creation/edit form
│   ├── Header.tsx        # App header with stats
│   ├── EmptyState.tsx    # Empty state display
│   └── index.ts          # Component exports
├── services/
│   └── api.ts            # API client for backend communication
├── styles/               # Component-scoped CSS
│   ├── Button.css
│   ├── Modal.css
│   ├── TaskCard.css
│   ├── TaskForm.css
│   ├── Header.css
│   ├── EmptyState.css
│   └── App.css
├── types.ts              # TypeScript interfaces
├── App.tsx               # Main application component
├── main.tsx              # React root setup
└── index.css             # Global styles and variables
```

## Technology Stack

- **React 19.2** - UI library
- **TypeScript 6.0** - Type safety
- **Vite 8.0** - Build tool and dev server
- **CSS 3** - Styling with CSS variables and flexbox/grid

## API Integration

The frontend connects to the ASP.NET backend at `http://localhost:5025`.

### Available Endpoints

- `GET /tasks` - Get all tasks
- `GET /tasks/{id}` - Get task by ID  
- `POST /tasks` - Create a new task
- `PUT /tasks/{id}` - Update a task
- `DELETE /tasks/{id}` - Delete a task
- `GET /statuses` - Get all status options

## Color Scheme

### Light Mode
- Primary: Purple (`#aa3bff`)
- Background: White (`#fff`)
- Text: Dark gray (`#6b6375`)
- Accent: Light purple (`rgba(170, 59, 255, 0.1)`)

### Dark Mode
- Primary: Light purple (`#c084fc`)
- Background: Dark blue (`#0f172a`)
- Text: Gray (`#d1d5db`)
- Accent: Light purple (`rgba(192, 132, 252, 0.15)`)

## Features in Detail

### Task Cards
- Task title, description, and due date
- Status badge (Todo, In Progress, Completed)
- Visual date indicators (overdue, today)
- Quick edit and delete actions
- Checkbox to mark complete

### Task Forms
- Title field (required)
- Description field (optional)
- Due date picker (required)
- Status dropdown (required)
- Completion toggle checkbox
- Real-time form validation

### Header
- Progress bar showing completion percentage
- Task counter
- Create new task button

### Filtering
- All tasks
- Pending tasks only
- Completed tasks only

## Responsive Breakpoints

- Mobile: < 768px - Single column, touch-friendly buttons
- Tablet: 768px - 1024px - Optimized spacing
- Desktop: > 1024px - Full layout

## Development Notes

### Styling
All components use CSS custom properties (CSS variables) for theming. Components are scoped to prevent style conflicts.

### Type Safety
Full TypeScript support for type-safe API calls and component props.

### State Management
Uses React hooks (useState, useEffect) for local state management. No additional state library required for this application size.

### Error Handling
- Network errors display user-friendly messages
- Form validation provides inline feedback
- Loading states prevent action duplication

## Building for Production

The production build includes:
- Minified JavaScript (using Terser)
- CSS optimization
- Tree-shaking of unused code
- Optimized asset caching

Build output:
- `dist/index.html` - Single entry point
- `dist/assets/` - Hashed JS and CSS files
- Total bundle size: ~214KB (gzipped: ~55KB)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### Development Server Not Starting
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Fails
```bash
# Clean build
rm -rf dist node_modules/.vite
npm run build
```

### API Connection Issues
- Ensure backend is running on `http://localhost:5025`
- Check CORS headers in backend configuration
- Verify network connectivity

## Future Enhancements

- Task search and sorting
- Drag-and-drop task reordering
- Task priority levels
- Recurring tasks
- Task attachments
- User authentication and team collaboration
- Keyboard shortcuts
- PWA support for offline access

## License

Built for TodoList.Api project
