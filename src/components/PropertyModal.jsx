import React from 'react';
import { X, MapPin, Star, Copy, Facebook, Instagram, Twitter } from 'lucide-react';

// Custom CheckCircle icon for amenities
const CheckCircle = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 1 1 1-5.6-8.2"></path>
        <path d="M12 2V3"></path>
        <path d="M20 7v3"></path>
        <path d="M12 21v-1"></path>
        <path d="M7 10h10"></path>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


const PropertyModal = ({ listing, onClose }) => {
    if (!listing) return null;

    // Mock data for details
    const amenities = ['WiFi', 'Air Conditioning', 'Pool', 'Free Parking', 'Kitchen', 'Hot Shower'];
    const reviews = [
        { name: 'Maria L.', text: 'Pure relaxation! The hosts were wonderful and the view was incredible. True "BiyaHele."', rating: 5 },
        { name: 'Javier S.', text: 'The best rest I’ve had in months. Highly recommended for a quiet getaway.', rating: 5 },
    ];

    const handleShare = (platform) => {
        console.log(`Sharing ${listing.title} on ${platform}`);
        // Display message using the custom message box integrated in App.jsx
        document.getElementById('message-box-content').innerText = `Preparing to share link to ${platform}. (Action logged in console)`;
        document.getElementById('message-box').classList.remove('hidden');
        setTimeout(() => document.getElementById('message-box').classList.add('hidden'), 3000);
    };

    const handleCopy = () => {
        const link = `https://biyahele.com/listing/${listing.id}`;
        // Using document.execCommand('copy') for better iframe compatibility
        // Create a temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = link;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Display message using the custom message box integrated in App.jsx
        document.getElementById('message-box-content').innerText = `Link copied to clipboard: ${link}`;
        document.getElementById('message-box').classList.remove('hidden');
        setTimeout(() => document.getElementById('message-box').classList.add('hidden'), 3000);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4" onClick={onClose}>
            <div
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <div className="sticky top-0 right-0 p-4 z-10 flex justify-end">
                    <button onClick={onClose} className="p-2 bg-white rounded-full shadow-lg text-sky-800 hover:bg-gray-100 transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Photos & Details */}
                <div className="p-4 md:p-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-sky-900">{listing.title}</h2>
                    <p className="text-lg text-gray-500 flex items-center mt-2"><MapPin size={18} className="mr-2" />{listing.location}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <img
                            src={listing.imageUrl}
                            alt={listing.title}
                            className="w-full h-80 object-cover rounded-lg shadow-lg"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/2196F3/FFFFFF?text=BiyaHele+View" }}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <img className="w-full h-40 object-cover rounded-lg" src="https://placehold.co/300x200/5E8CBF/FFFFFF?text=Interior+View" alt="Interior" />
                            <img className="w-full h-40 object-cover rounded-lg" src="https://placehold.co/300x200/81B8F3/FFFFFF?text=Amenity+Shot" alt="Amenity" />
                            <img className="w-full h-40 object-cover rounded-lg" src="https://placehold.co/300x200/C5E1A5/333333?text=Garden+View" alt="Garden" />
                            <img className="w-full h-40 object-cover rounded-lg" src="https://placehold.co/300x200/FFCC80/333333?text=Review+Spot" alt="Review Spot" />
                        </div>
                    </div>

                    {/* Amenities and Booking */}
                    <div className="mt-8 border-t pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-semibold text-sky-800 mb-4">Amenities for Your Comfort</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center text-gray-700">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                                        {amenity}
                                    </div>
                                ))}
                            </div>

                            {/* Reviews */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold text-sky-800 mb-4">Guest Reviews ({reviews.length})</h3>
                                {reviews.map((review, index) => (
                                    <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
                                        <div className="flex items-center mb-1">
                                            <Star className="w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400" />
                                            <span className="font-bold text-sky-800">{review.rating}.0</span>
                                        </div>
                                        <p className="text-gray-700 italic">"{review.text}"</p>
                                        <p className="text-sm text-gray-500 mt-2">— {review.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Booking Card & Share */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4 bg-white p-6 rounded-xl shadow-2xl border border-sky-100">
                                <div className="flex justify-between items-baseline mb-4">
                                    <span className="text-2xl font-bold text-sky-900">₱{listing.price}</span>
                                    <span className="text-sm text-gray-500">per night</span>
                                </div>

                                {/* Mock Calendar Availability and Guest Count - fulfills Filter Search (Dates, Who) requirement */}
                                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                    <input type="text" placeholder="Check-in Date" className="p-3 border rounded-lg focus:ring-sky-500 focus:border-sky-500" />
                                    <input type="text" placeholder="Check-out Date" className="p-3 border rounded-lg focus:ring-sky-500 focus:border-sky-500" />
                                    <select className="col-span-2 p-3 border rounded-lg focus:ring-sky-500 focus:border-sky-500">
                                        <option>Guests: 1</option>
                                        <option>Guests: 2</option>
                                        <option>Guests: 3+</option>
                                    </select>
                                </div>

                                <button className="w-full py-4 mb-4 rounded-xl text-white font-bold text-lg bg-sky-600 hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200">
                                    Book Your BiyaHele
                                </button>

                                {/* Share Button section - fulfills Share Button requirement */}
                                <div className="border-t pt-4">
                                    <h4 className="font-semibold text-sky-800 mb-2">Share This Rest</h4>
                                    <div className="flex space-x-3 justify-center">
                                        <button onClick={handleCopy} className="p-3 border rounded-full text-sky-600 hover:bg-sky-50 transition" aria-label="Copy Link">
                                            <Copy size={20} />
                                        </button>
                                        <button onClick={() => handleShare('Facebook')} className="p-3 border rounded-full text-sky-600 hover:bg-sky-50 transition" aria-label="Share on Facebook">
                                            <Facebook size={20} />
                                        </button>
                                        <button onClick={() => handleShare('Instagram')} className="p-3 border rounded-full text-sky-600 hover:bg-sky-50 transition" aria-label="Share on Instagram">
                                            <Instagram size={20} />
                                        </button>
                                        <button onClick={() => handleShare('Twitter')} className="p-3 border rounded-full text-sky-600 hover:bg-sky-50 transition" aria-label="Share on X/Twitter">
                                            <Twitter size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyModal;
