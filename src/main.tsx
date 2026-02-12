import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { App } from './App'
import { LoginPage } from './pages/Login/Login'
import { DashboardPage } from './pages/Dashboard/Dashboard'
import { AppointmentPage } from './pages/Appointment/Appointment'

import { ProtectedRoute } from './routes/ProtectRoute'
import { AuthProvider } from './auth/auth.provider'

import './index.css'
import { RoleRoutes } from './routes/RoleRoute'
import { ReportsPage } from './pages/Reports/Reports'

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
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to="login" replace />} />
              <Route path="login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="appointment" element={<AppointmentPage />} />

                <Route element={<RoleRoutes allowedRoles={["admin"]} />} >
                  <Route path='reports' element={<ReportsPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  )
})