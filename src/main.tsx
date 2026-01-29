import { StrictMode } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/Dashboard'
import { ProtectedRoute } from './routes/ProtectRoute'

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'warn',
  })
}

enableMocking().then(async () => {
  const { createRoot } = await import('react-dom/client')
  const { default: App } = await import('./App')

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
    
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route element={<ProtectedRoute />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
})