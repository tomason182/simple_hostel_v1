import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/queryClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

        <App />

      </AuthProvider>

    </QueryClientProvider>

  </StrictMode>
)
