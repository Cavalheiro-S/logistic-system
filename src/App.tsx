import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './contexts/auth-context'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
