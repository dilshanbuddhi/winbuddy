import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import SellerSidebar from './SellerSidebar.jsx'
import DateTimeDisplay from '../DateTimeDisplay.jsx'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SellerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 overflow-auto relative">
        {/* Date/Time - Desktop top right */}
    
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-[#111111] tracking-tight">EVO</span>
              <span className="text-xl font-bold text-[#FF9F1C] tracking-tight uppercase">Play</span>
            </div>
          </div>
          <DateTimeDisplay />
        </div>
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
