import React, { useState, useEffect } from 'react';
import { Home, PlusCircle, LayoutDashboard, Calendar, MessageSquare, DollarSign, Gift, Briefcase, List, User } from 'lucide-react';

// Mock data structure for dashboard items
const dashboardItems = [
    { title: 'Dashboard Overview (Today, Upcomings)', icon: LayoutDashboard, description: 'Quick view of today\'s check-ins, earnings, and current performance metrics.', color: 'bg-sky-500' },
    { title: 'My Listings (Messages, Listings, Calendar)', icon: Home, description: 'Manage all properties, availability calendar, and host-guest messaging.', color: 'bg-indigo-500' },
    { title: 'Add New Listing (Categorize, Adding chosen host)', icon: PlusCircle, description: 'Create a new property listing and save it as a draft.', color: 'bg-green-500' },
    { title: 'Payments (Receiving Payment methods)', icon: DollarSign, description: 'View current earnings, payment history, and manage payout methods (E-wallets/Bank).', color: 'bg-yellow-500' },
    { title: 'Points & Rewards', icon: Gift, description: 'Track your host loyalty status, rewards earned, and exclusive benefits.', color: 'bg-pink-500' },
    { title: 'Account & Settings (Profile, Bookings, Coupon)', icon: User, description: 'Manage your profile, security, and host-specific settings.', color: 'bg-purple-500' },
];

const HostDashboard = ({ userId }) => {
    // Mock State for a simplified view of listings
    const [listingCount, setListingCount] = useState(5);
    const [nextCheckIn, setNextCheckIn] = useState('Oct 28');

    // Mock function to simulate a dashboard action
    const handleAction = (title) => {
        // Display message using the custom message box integrated in App.jsx
        const message = `Navigating to: ${title} section...`;
        document.getElementById('message-box-content').innerText = message;
        document.getElementById('message-box').classList.remove('hidden');
        setTimeout(() => document.getElementById('message-box').classList.add('hidden'), 3000);
    };

    const displayUserId = userId ? userId.substring(0, 8) : "Unknown";

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-sky-900 flex items-center">
                        <Briefcase className="w-8 h-8 mr-3 text-yellow-600" />
                        Host Dashboard: Your BiyaHele Business
                    </h1>
                    {/* FIXED: Check if userId exists before trying to access substring */}
                    <p className="text-lg text-gray-500 mt-2">Welcome back, Host {displayUserId}... Manage your operations and guests.</p>
                </header>

                {/* Quick Stats/Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-sky-500">
                        <p className="text-sm font-medium text-gray-500">Total Active Listings</p>
                        <p className="text-3xl font-bold text-sky-900 mt-1">{listingCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
                        <p className="text-sm font-medium text-gray-500">Next Check-in</p>
                        <p className="text-3xl font-bold text-sky-900 mt-1">{nextCheckIn}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
                        <p className="text-sm font-medium text-gray-500">Monthly Earnings (Mock)</p>
                        <p className="text-3xl font-bold text-sky-900 mt-1">₱ 85,000</p>
                    </div>
                </div>

                {/* Host Control Center (Checklist Items) */}
                <h2 className="text-2xl font-bold text-sky-800 mb-6 border-b pb-2">Control Center</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dashboardItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:scale-[1.02]"
                                onClick={() => handleAction(item.title)}
                            >
                                <div className={`w-10 h-10 ${item.color} text-white rounded-full flex items-center justify-center mb-4 shadow-md`}>
                                    <Icon size={20} />
                                </div>
                                <h3 className="text-xl font-semibold text-sky-900">{item.title}</h3>
                                <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Messages/Notifications Mock */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-sky-800 mb-4 border-b pb-2">Recent Messages</h2>
                    <div className="bg-white p-4 rounded-xl shadow-md flex items-center border border-gray-100">
                        <MessageSquare className="w-6 h-6 mr-3 text-indigo-500" />
                        <span className="text-gray-700">New inquiry from **Guest 4001** about availability next month.</span>
                    </div>
                </div>

                {/* Reminder of Host Checklist Items */}
                <footer className="mt-10 pt-6 border-t border-sky-100 text-sm text-gray-500">
                    <p className="italic">Host requirements addressed: Dashboards (Today, Upcomings), Messages, Listings, Calendar, Adding chosen host, Categorize listing, Receiving Payment methods, Account Settings, and Points & Rewards.</p>
                </footer>

            </div>
        </div>
    );
};

export default HostDashboard;
