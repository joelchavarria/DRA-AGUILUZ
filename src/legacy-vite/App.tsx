import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SiteLayout } from '@/components/SiteLayout'
import { ContactPage } from '@/pages/ContactPage'
import { DoctorPage } from '@/pages/DoctorPage'
import { ExperiencesPage } from '@/pages/ExperiencesPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ServiceDetailPage } from '@/pages/ServiceDetailPage'
import { ServicesPage } from '@/pages/ServicesPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="servicios" element={<ServicesPage />} />
          <Route path="servicios/:slug" element={<ServiceDetailPage />} />
          <Route path="dra-aguiluz" element={<DoctorPage />} />
          <Route path="experiencias" element={<ExperiencesPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
