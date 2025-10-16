import React, { useState } from 'react';
import { Shield, BarChart, Users, DollarSign, FileText, CheckCircle, Clock, XCircle, Settings, Home, Star } from 'lucide-react';

const adminMenuItems = [
    { title: 'Service Fee & Revenue Reports', icon: BarChart, color: 'bg-green-500', metrics: ['Total Revenue', 'BiyaHele Fee Share'] },
    { title: 'User Management (Host/Guest Reviews)', icon: Users, color: 'bg-indigo-500', metrics: ['Total Users', 'New Registrations'] },
    { title: 'Listings & Content Management', icon: Home, color: 'bg-yellow-600', metrics: ['Active Listings', 'Listings Needing Review'] },
    { title: 'Policy & Compliance (Cancellation rules, regulations, reports)', icon: FileText, color: 'bg-purple-500', metrics: ['Active Policies', 'Compliance Score'] },
    { title: 'Payment Methods (Confirm, Review, Payment)', icon: DollarSign, color: 'bg-sky-500', metrics: ['Pending Payouts', 'Total Transactions'] },
    { title: 'Dashboard Analytics (Best/Worst Reviews, lowest ratings, list of bookings, etc.)', icon: Star, color: 'bg-red-500', metrics: ['Average Host Rating', 'Total Bookings'] },
];

const AdminDashboard = ({ userId }) => {
    const [mockMetrics, setMockMetrics] = useState({
        'Total Revenue': '₱ 9,200,000',
        'BiyaHele Fee Share': '₱ 920,000',
        'Total Users': 1560,
        'New Registrations': 35,
        'Active Listings': 450,
        'Listings Needing Review': 12,
        'Average Host Rating': '4.8/5.0',
        'Total Bookings': 1250,
        'Pending Payouts': 55,
        'Active Policies': 14,
        'Compliance Score': '98%',
        'Total Host Reviews': 1200
    });

    // Mock function to simulate a dashboard action
    const handleAction = (title) => {
        // Display message using the custom message box integrated in App.jsx
        const message = `Accessing Admin Module: ${title}...`;
        document.getElementById('message-box-content').innerText = message;
        document.getElementById('message-box').classList.remove('hidden');
        setTimeout(() => document.getElementById('message-box').classList.add('hidden'), 3000);
    };

    const displayUserId = userId ? userId.substring(0, 8) : "Unknown";

    return (
        <div className="p-4 md:p-12 bg-gray-100 min-h-screen">
            <div className="max-w-8xl mx-auto">
                <header className="mb-12 border-b-4 border-yellow-500 pb-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-sky-900 flex items-center">
                        <Shield className="w-10 h-10 mr-4 text-yellow-600" />
                        Administrator Control Panel
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Welcome, Admin {displayUserId}... System integrity and regulatory compliance are your priorities.
                    </p>
                </header>

                {/* Main Admin Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {adminMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl"
                                onClick={() => handleAction(item.title)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className={`w-12 h-12 ${item.color} text-white rounded-xl flex items-center justify-center shadow-lg`}>
                                        <Icon size={24} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500 hover:text-sky-600">
                                        View Details &gt;
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-sky-900 mt-4 mb-3">{item.title}</h3>
                                
                                <div className="space-y-2 mt-4">
                                    {item.metrics.map((metric, mIndex) => (
                                        <div key={mIndex} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 font-medium">{metric}:</span>
                                            <span className="font-bold text-sky-800">{mockMetrics[metric]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Compliance and Report Generation Section */}
                <div className="mt-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                    <h2 className="text-2xl font-bold text-sky-800 mb-4 flex items-center">
                        <FileText className="w-6 h-6 mr-2 text-purple-600" />
                        Generation of Reports & System Health
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                            <p className="font-semibold text-sky-800">System Status</p>
                            <div className="flex items-center text-green-600 mt-1">
                                <CheckCircle className="w-5 h-5 mr-1" />
                                <span className="font-bold">Operational (99.9% Uptime)</span>
                            </div>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors" onClick={() => handleAction('Generating Quarterly Report')}>
                            <p className="font-semibold text-yellow-800">Quarterly Financial Report</p>
                            <p className="text-sm text-gray-600">Generate Q4/2025 PDF.</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200 cursor-pointer hover:bg-red-100 transition-colors" onClick={() => handleAction('Reviewing Flagged Content')}>
                            <p className="font-semibold text-red-800">Flagged Content</p>
                            <p className="text-sm text-gray-600">12 pending moderation actions.</p>
                        </div>
                    </div>
                </div>


                <footer className="mt-10 pt-6 border-t-2 border-sky-200 text-sm text-gray-500 text-center">
                    <p className="italic">Admin requirements addressed: Dashboards, Service fee from the hosts, Analytics (reviews, ratings, bookings), Generation of Reports, Payment methods (Confirm, Review, payment), Policy & Compliance.</p>
                </footer>

            </div>
        </div>
    );
};

export default AdminDashboard;
