import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { App } from './App'

import { DashboardPage } from './features/dashboard/pages/Dashboard'
import { AppointmentPage } from './features/appointments/pages/Appointment'

import { ProtectedRoute } from './router/ProtectRoute'


import './styles/index.css'
import { RoleRoutes } from './router/RoleRoute'
import { ReportsPage } from './features/reports/pages/Reports'
import  { AuthProvider } from './features/auth/context/auth.provider'
import { LoginPage } from './features/auth/pages/Login'
import { ClientPage } from './features/clients/pages/ClientsPage'

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
              <Route path="/login" element={<LoginPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/appointment" element={<AppointmentPage />} />
                <Route path="/clients" element={<ClientPage/>} />

                <Route element={<RoleRoutes allowedRoles={["admin"]} />} >
                  <Route path='/reports' element={<ReportsPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  )
})