# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
 ## Libraries Used

### Core Libraries
- **React** – UI library for building components  
- **React DOM** – Required for React rendering  
- **React Router DOM** – Routing between pages  
- **React Player** – For embedding videos  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **Vite** – Fast build tool and dev server  

### Additional Libraries
- **lucide-react** – Icon library for React  
- **recharts** – Charting library for React (for dashboards or analytics)  
- **Other libraries** – Add any other packages you actively use (e.g., axios, react-hook-form)  

---

## Installation
npm create vite@latest my-app

1. Clone the repository:  
```bash
git clone <your-repo-url>
cd <your-project-folder>

  # Install project dependencies
- **npm install react react-dom 
  react-router-dom 
  react-player  
  lucide-react 
  recharts

  # Tailwind setup
  if tailwind css does not work then
 uninstall new node.js version
 install node.js 20 which is suitable
 install-npm install -D tailwindcss@3.3.2
  # Install a compatible Tailwind version if needed
 npm install -D tailwindcss@3.3.2 autoprefixer
 npx tailwindcss init -p


  # tailwind config content-
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // if using Vite
    "./src/**/*.{js,ts,jsx,tsx}"  // React components or JS/TS files
  ],
  theme: {
    extend: {},              // customize your theme here
  },
  plugins: [],               // add plugins if needed
}

# Include Tailwind in index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;