import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    ShoppingBag,
    LayoutDashboard,
    Users,
    Trophy,
    CreditCard,
    User,
    LogOut,
    Upload,
    X,
    ChevronDown,
    ChevronRight
} from 'lucide-react';


const SellerSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isSellerRoute = location.pathname.startsWith('/agent/sellers') || location.pathname.startsWith('/agent/seller-requests');
    const [sellerExpanded, setSellerExpanded] = useState(isSellerRoute);

    useEffect(() => {
        if (isSellerRoute) setSellerExpanded(true);
    }, [isSellerRoute]);

    const handleLogout = () => {
        navigate('/');
    };

    const handleNavClick = () => {
        if (onClose) onClose();
    };

    const menuItems = [
        { name: 'Sales', path: '/agent/sales', icon: ShoppingBag },
        { name: 'Dashboard', path: '/agent/dashboard', icon: LayoutDashboard },
        { name: 'Leaderboard', path: '/agent/leaderboard', icon: Trophy },
        { name: 'Payouts', path: '/agent/payouts', icon: CreditCard },
        { name: 'Upload Receipt', path: '/agent/upload-receipts', icon: Upload },
        { name: 'Account', path: '/agent/account', icon: User }
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
                <div className="px-8 flex items-center justify-between">
                    <img
                        src="/evoplay.svg"
                        alt="EvoPlay Logo"
                        className="h-28 w-auto"
                    />
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
                        {menuItems.slice(0, 2).map((item) => (
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

                        {/* Seller section with Seller Requests */}
                        <li>
                            <button
                                type="button"
                                onClick={() => setSellerExpanded(!sellerExpanded)}
                                className={`w-full flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                                    isSellerRoute ? 'bg-[#EEF5FF] text-[#4285F4]' : 'text-[#64748B] hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-1 rounded-md ${isSellerRoute ? 'text-[#4285F4]' : 'text-[#64748B] group-hover:text-slate-900'}`}>
                                        <Users size={20} strokeWidth={isSellerRoute ? 2.5 : 2} />
                                    </div>
                                    <span className={`font-medium text-[15px] ${isSellerRoute ? 'text-[#4285F4]' : 'text-[#64748B] group-hover:text-slate-900'}`}>
                                        Seller
                                    </span>
                                </div>
                                {sellerExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </button>
                            {sellerExpanded && (
                                <ul className="mt-1 ml-4 pl-8 border-l border-slate-200 space-y-0.5">
                                    <li>
                                        <NavLink
                                            to="/agent/sellers"
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 py-2.5 pr-4 rounded-lg transition-all text-[15px] ${
                                                    isActive
                                                        ? 'font-medium text-[#4285F4]'
                                                        : 'text-[#64748B] hover:text-slate-900'
                                                }`
                                            }
                                        >
                                            Team
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/agent/seller-requests"
                                            onClick={handleNavClick}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 py-2.5 pr-4 rounded-lg transition-all text-[15px] ${
                                                    isActive
                                                        ? 'font-medium text-[#4285F4]'
                                                        : 'text-[#64748B] hover:text-slate-900'
                                                }`
                                            }
                                        >
                                            Requests
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {menuItems.slice(2).map((item) => (
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
