import React, { useState } from 'react';
import { List, LogIn, User, Settings, Calendar, Heart } from 'lucide-react';

const navItems = [
    { name: 'Guest', view: 'Guest' },
    { name: 'Host', view: 'Host' },
    { name: 'Admin', view: 'Admin' },
];

const Header = ({ userId, setCurrentView, currentView }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Mock User Account Menu
    const userMenu = (
        <div className="absolute top-14 right-0 w-64 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-40">
            <div className="p-4 border-b">
                <p className="font-bold text-sky-800">Welcome, Traveler!</p>
                <p className="text-sm text-gray-500">User ID: <span className="break-all font-mono text-xs">{userId || 'Loading...'}</span></p>
            </div>
            <nav className="p-2">
                <button onClick={() => { setCurrentView('Settings'); setIsMenuOpen(false); }} className="flex w-full items-center p-3 text-gray-800 hover:bg-sky-50 rounded-lg transition"><User size={20} className="mr-3" /> Profile Settings</button>
                <button onClick={() => { setCurrentView('Settings'); setIsMenuOpen(false); }} className="flex w-full items-center p-3 text-gray-800 hover:bg-sky-50 rounded-lg transition"><Calendar size={20} className="mr-3" /> My Bookings</button>
                <button onClick={() => { setCurrentView('Settings'); setIsMenuOpen(false); }} className="flex w-full items-center p-3 text-gray-800 hover:bg-sky-50 rounded-lg transition"><Heart size={20} className="mr-3" /> Wishlist (Favorites)</button>
                <button onClick={() => { setCurrentView('Settings'); setIsMenuOpen(false); }} className="flex w-full items-center p-3 text-gray-800 hover:bg-sky-50 rounded-lg transition"><Settings size={20} className="mr-3" /> Account Settings</button>
            </nav>
        </div>
    );

    return (
        <header className="p-4 bg-white shadow-md mb-8 sticky top-0 z-30">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Logo and Nav Links */}
                <div className="flex items-center space-x-6">
                    <h1 className="text-3xl font-extrabold text-sky-800 tracking-tight cursor-pointer" onClick={() => setCurrentView('Guest')}>
                        Biya<span className="text-yellow-500">Hele</span>
                    </h1>
                    <nav className="hidden sm:flex space-x-4">
                        {navItems.map(item => (
                            <button
                                key={item.name}
                                onClick={() => setCurrentView(item.view)}
                                className={`text-lg font-semibold transition-colors ${
                                    currentView === item.view 
                                    ? 'text-sky-700 border-b-2 border-sky-700' 
                                    : 'text-gray-600 hover:text-sky-800'
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
                
                {/* User Menu */}
                <div className="relative">
                    <button
                        className="flex items-center p-2 border rounded-full shadow-md bg-white hover:shadow-lg transition-shadow"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="user-menu"
                    >
                        <List size={20} className="text-gray-600 mr-2" />
                        <LogIn size={24} className="bg-sky-600 text-white rounded-full p-0.5" />
                    </button>
                    {isMenuOpen && userMenu}
                </div>
            </div>
        </header>
    );
};

export default Header;
