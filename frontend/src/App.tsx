import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopHeader from './components/layout/TopHeader';
import Toast from './components/Toast';
import Modal from './components/Modal';
import Dashboard from './pages/Dashboard';
import AutomationBoard from './pages/AutomationBoard';
import Tickets from './pages/Tickets';
import TicketDetail from './pages/TicketDetail';
import SimplePage from './pages/SimplePage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopHeader />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/automation" element={<AutomationBoard />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/tickets/:id" element={<TicketDetail />} />
              <Route 
                path="/my-tickets" 
                element={
                  <SimplePage 
                    title="My Tickets" 
                    description="View and manage tickets assigned to you"
                    comingSoon 
                  />
                } 
              />
              <Route 
                path="/team" 
                element={
                  <SimplePage 
                    title="Team Queue" 
                    description="Monitor team workload and ticket distribution"
                    comingSoon 
                  />
                } 
              />
              <Route 
                path="/customers" 
                element={
                  <SimplePage 
                    title="Customers" 
                    description="Manage customer information and support history"
                    comingSoon 
                  />
                } 
              />
              <Route 
                path="/customers/:id" 
                element={
                  <SimplePage 
                    title="Customer Detail" 
                    description="View customer profile and ticket history"
                    comingSoon 
                  />
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <SimplePage 
                    title="Analytics" 
                    description="Analyze support performance and trends"
                    comingSoon 
                  />
                } 
              />
              <Route 
                path="/sla" 
                element={
                  <SimplePage 
                    title="SLA & Performance" 
                    description="Track SLA compliance and performance metrics"
                    comingSoon 
                  />
                } 
              />
              <Route 
                path="/knowledge-base" 
                element={
                  <SimplePage 
                    title="Knowledge Base" 
                    description="Browse support articles and documentation"
                    comingSoon 
                  />
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <SimplePage 
                    title="Settings" 
                    description="Configure application preferences and team settings"
                    comingSoon 
                  />
                } 
              />
            </Routes>
          </main>
        </div>
      </div>
      <Toast />
      <Modal />
    </BrowserRouter>
  );
}

export default App;
