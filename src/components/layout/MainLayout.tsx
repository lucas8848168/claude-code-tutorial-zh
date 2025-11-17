import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function MainLayout() {
  const location = useLocation()
  const showSidebar = location.pathname.startsWith('/chapter')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }
  
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={showSidebar ? toggleSidebar : undefined} />
      
      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={closeSidebar}
          />
        )}
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  )
}
