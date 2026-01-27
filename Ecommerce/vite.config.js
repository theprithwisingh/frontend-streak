import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
// If using a framework plugin (e.g., React, Vue), import it here as well
// import react from '@vitejs/plugin-react'; 

export default defineConfig({
  plugins: [
    // react(), // Add your framework plugin here if necessary
    tailwindcss(),
  ],
});
