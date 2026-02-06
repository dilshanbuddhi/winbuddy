import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    LayoutDashboard,
    Trophy,
    CreditCard,
    User,
    LogOut,
    Upload,
    X
} from 'lucide-react';


const SellerSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleNavClick = () => {
        if (onClose) onClose();
    };

    const menuItems = [
        { name: 'Sales', path: '/seller/sales', icon: ShoppingBag },
        { name: 'Dashboard', path: '/seller/dashboard', icon: LayoutDashboard },
        { name: 'Leaderboard', path: '/seller/leaderboard', icon: Trophy },
        { name: 'Payouts', path: '/seller/payouts', icon: CreditCard },
        { name: 'Upload Receipt', path: '/seller/upload-receipts', icon: Upload },
        { name: 'Account', path: '/seller/account', icon: User }
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-white min-h-screen border-r border-slate-100 flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo Section */}
                <div className="px-8 py-10 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-[#111111] tracking-tight">EVO</span>
                        <span className="text-2xl font-bold text-[#FF9F1C] tracking-tight uppercase">Play</span>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-4">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={handleNavClick}
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
        </>
    );
};

export default SellerSidebar;

