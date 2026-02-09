import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
// Fix: Enable React plugin - it was commented out
import react from '@vitejs/plugin-react'; 

export default defineConfig({
  // Fix: Tailwind v4 uses CSS-based configuration (@theme in CSS), not JS config
  // Remove theme config from here - it's now in index.css using @theme directive
  plugins: [
    react(), // Fix: React plugin is required for JSX to work
    tailwindcss(),
  ],
});

