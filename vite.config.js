<<<<<<< HEAD
import react from '@vitejs/plugin-react'
=======
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],
=======
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
})
