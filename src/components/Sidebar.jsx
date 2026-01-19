
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    LayoutDashboard,
    Users,
    Trophy,
    CreditCard,
    User,
    LogOut
} from 'lucide-react';


const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any auth tokens/session data here if needed
        navigate('/');
    };

    const menuItems = [
        { name: 'Sales', path: '/agent/sales', icon: ShoppingBag },
        { name: 'Dashboard', path: '/agent/dashboard', icon: LayoutDashboard },
        { name: 'Sellers', path: '/agent/sellers', icon: Users },
        { name: 'Leaderboard', path: '/agent/leaderboard', icon: Trophy },
        { name: 'Payouts', path: '/agent/payouts', icon: CreditCard },
        { name: 'Account', path: '/agent/account', icon: User }
    ];

    return (
        <aside className="w-64 bg-white min-h-screen border-r border-slate-100 flex flex-col">
            {/* Logo Section */}
            <div className="px-8 py-10">
                <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-[#111111] tracking-tight">EVO</span>
                    <span className="text-2xl font-bold text-[#FF9F1C] tracking-tight uppercase">Play</span>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                                        isActive
                                            ? 'bg-[#EEF5FF] text-[#4285F4]'
                                            : 'text-[#64748B] hover:bg-slate-50 hover:text-slate-900'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={`p-1 rounded-md transition-colors ${isActive ? 'text-[#4285F4]' : 'text-[#64748B] group-hover:text-slate-900'}`}>
                                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        </div>
                                        <span className={`font-medium text-[15px] ${isActive ? 'text-[#4285F4]' : 'text-[#64748B] group-hover:text-slate-900'}`}>
                      {item.name}
                    </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout / Footer Section */}
            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3.5 text-[#64748B] hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group"
                >
                    <div className="p-1">
                        <LogOut size={20} />
                    </div>
                    <span className="font-medium text-[15px]">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
