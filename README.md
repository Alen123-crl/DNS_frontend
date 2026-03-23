# Menu Management — Frontend

React frontend for the DeepNetSoft menu management app, built with Vite.

## Tech Stack

- React 18
- Vite
- Axios
- CSS Modules

## Getting Started

### Prerequisites

- Node.js v18+
- Backend server running (see `../backend/README.md`)

### Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example env file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app runs on `http://localhost:5173` by default.

## Environment Variables

| Variable        | Description                  | Default                        |
|-----------------|------------------------------|--------------------------------|
| `VITE_API_URL`  | Backend API base URL         | `http://localhost:5000/api`    |

> All frontend env variables must be prefixed with `VITE_` to be exposed by Vite.

## Project Structure

```
src/
├── api/
│   └── menuApi.js          # Axios API calls
├── components/
│   ├── Navbar.jsx           # Top navigation with "+ Add Menu" button
│   ├── Hero.jsx             # Banner section with MENU title
│   ├── MenuTabs.jsx         # Food / Drinks / Brunch tab switcher
│   ├── MenuSection.jsx      # Individual menu category section
│   ├── OpeningHours.jsx     # Opening hours block
│   ├── Footer.jsx           # Footer with contact info
│   └── CreateModal.jsx      # Modal to create menus and menu items
├── pages/
│   └── MenuPage.jsx         # Main page composing all components
└── main.jsx                 # App entry point
```

## Features

- Displays all menus as tabs (Food, Drinks, Brunch, etc.)
- Clicking a tab shows its items or sub-menu sections
- Supports unlimited nested menus (sub-menus rendered as sections)
- "+ Add Menu" button in navbar opens a modal to:
  - Create a new menu (with optional parent for nesting)
  - Create a new menu item (name, description, price, assigned menu)
- Field-level validation with error messages
- Fully responsive — mobile friendly
- Matches the Figma design (dark theme, Oswald font, gold accents)

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Update `VITE_API_URL` in `.env` to point to your production backend before building.
