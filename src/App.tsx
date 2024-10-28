import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './provider/auth-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
