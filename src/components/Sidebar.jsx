import { NavLink } from 'react-router-dom'

function Sidebar() {
  const menuItems = [
    { name: 'Sales', path: '/sales', icon: '💰' },
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Sellers', path: '/sellers', icon: '👥' },
    { name: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
    { name: 'Payouts', path: '/payouts', icon: '💸' },
    { name: 'Account', path: '/account', icon: '⚙️' }
  ]

  return (
    <aside className="w-64 bg-gray-900 min-h-screen text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <img 
          src="/evoplay.png" 
          alt="EvoPlay Logo" 
          className="h-12 w-auto object-contain"
        />
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <span className="text-xl">🚪</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
