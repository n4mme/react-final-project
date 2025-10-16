import React from 'react';
import { User, CalendarCheck, Heart, Settings } from 'lucide-react';

const AccountSettings = () => {
    return (
        <div className="p-6 md:p-10 bg-gray-50 rounded-xl shadow-2xl max-w-4xl mx-auto my-12">
            <header className="flex items-center space-x-4 mb-8 border-b pb-4">
                <Settings className="w-8 h-8 text-sky-700" />
                <h2 className="text-3xl font-extrabold text-sky-900">Account Settings & Hub</h2>
            </header>
            
            <p className="text-lg text-gray-700 mb-6">
                This is your personal dashboard for managing your BiyaHele experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Profile */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-sky-100 cursor-pointer">
                    <User className="w-6 h-6 text-sky-600 mb-2" />
                    <h3 className="text-xl font-semibold text-sky-800">Profile Information</h3>
                    <p className="text-sm text-gray-500 mt-1">Update your personal details, contact information, and security settings.</p>
                </div>
                
                {/* Bookings */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-sky-100 cursor-pointer">
                    <CalendarCheck className="w-6 h-6 text-sky-600 mb-2" />
                    <h3 className="text-xl font-semibold text-sky-800">My Bookings</h3>
                    <p className="text-sm text-gray-500 mt-1">View and manage your upcoming and past BiyaHele reservations.</p>
                </div>

                {/* Wishlist */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-sky-100 cursor-pointer">
                    <Heart className="w-6 h-6 text-sky-600 mb-2" />
                    <h3 className="text-xl font-semibold text-sky-800">Wishlist (Favorites)</h3>
                    <p className="text-sm text-gray-500 mt-1">See all the places you've saved for future travels and rests.</p>
                </div>
            </div>

            <footer className="mt-8 pt-4 border-t text-sm text-yellow-600">
                <p>Note: This component serves as a navigational hub. Full functionality for profile editing and viewing listings/bookings will be implemented within dedicated sub-pages.</p>
            </footer>
        </div>
    );
};

export default AccountSettings;
