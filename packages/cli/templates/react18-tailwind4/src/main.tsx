import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  {ThemeProvider} from '@/context/themeContext'
import { Toaster } from '@/components/UI/Feedback'

import './index.css'
import App from './App.tsx'
// import "./styles/themes/slate.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider initialTheme="dark">
      <App />
      <Toaster position="top-right" />
    </ThemeProvider>
  </StrictMode>,
)
