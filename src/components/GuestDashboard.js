import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Users, Heart, Star, Share2, Copy, Facebook, Instagram, Twitter, ChevronDown, LogIn, User, Settings, List, X, Wallet, TrendingUp, Home, Zap } from 'lucide-react';

// --- MOCK DATA ---
const mockListings = [
  { id: 1, title: 'Seaside "Hele" Retreat', location: 'Cebu, Philippines', price: 150, rating: 4.95, beds: 3, baths: 2, isFavorite: true, type: 'Home', imageUrl: 'https://placehold.co/600x400/0D47A1/FFFFFF?text=Seaside+Retreat' },
  { id: 2, title: 'Mountain View Nook', location: 'Baguio, Philippines', price: 80, rating: 4.70, beds: 1, baths: 1, isFavorite: false, type: 'Experience', imageUrl: 'https://placehold.co/600x400/1565C0/FFFFFF?text=Mountain+Nook' },
  { id: 3, title: 'Worry-Free Laundry Service', location: 'Makati, Philippines', price: 25, rating: 5.00, beds: 0, baths: 0, isFavorite: false, type: 'Service', imageUrl: 'https://placehold.co/600x400/1976D2/FFFFFF?text=Laundry+Service' },
  { id: 4, title: 'Ancestral Home Stay', location: 'Vigan, Philippines', price: 120, rating: 4.88, beds: 4, baths: 3, isFavorite: true, type: 'Home', imageUrl: 'https://placehold.co/600x400/2196F3/FFFFFF?text=Ancestral+Home' },
  { id: 5, title: 'Island Hopping Tour (Private)', location: 'El Nido, Philippines', price: 200, rating: 4.90, beds: 0, baths: 0, isFavorite: false, type: 'Experience', imageUrl: 'https://placehold.co/600x400/BBDEFB/333333?text=Island+Tour' },
  { id: 6, title: 'In-Room Massage & Rest', location: 'Boracay, Philippines', price: 50, rating: 4.85, beds: 0, baths: 0, isFavorite: false, type: 'Service', imageUrl: 'https://placehold.co/600x400/E3F2FD/333333?text=Massage+Service' },
];

const categories = [
  { name: 'Home', icon: Home, description: 'Comfortable places to stay' },
  { name: 'Experience', icon: Zap, description: 'Curated activities and tours' },
  { name: 'Service', icon: List, description: 'In-stay services (e.g., laundry, massage)' },
  { name: 'Trending', icon: TrendingUp, description: 'Popular and highly-rated' },
  { name: 'E-wallets', icon: Wallet, description: 'Pay seamlessly and safely' },
];

// --- COMPONENTS ---

/**
 * Renders a single listing card.
 */
const ListingCard = ({ listing, onOpenDetail }) => {
  const [isFavorited, setIsFavorited] = useState(listing.isFavorite);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
      onClick={() => onOpenDetail(listing)}
    >
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/2196F3/FFFFFF?text=BiyaHele+View" }}
        />
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-white/50 backdrop-blur-sm text-sky-800 hover:scale-110 transition-transform duration-300 z-10"
          onClick={toggleFavorite}
          aria-label="Add to favorites"
        >
          <Heart fill={isFavorited ? 'rgb(12 74 110)' : 'none'} className="w-6 h-6" strokeWidth={isFavorited ? 0 : 2} />
        </button>
      </div>

      <div className="p-4 flex flex-col justify-between h-[110px]">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 truncate w-3/4">
            {listing.title}
          </h3>
          <div className="flex items-center text-sm font-medium text-sky-700">
            <Star className="w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-1">
          <p className="text-sm text-gray-500">{listing.location}</p>
          <p className="mt-2 text-xl font-bold text-sky-800">
            ₱{listing.price} <span className="text-base font-normal text-gray-600">/ night</span>
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * A modal for viewing detailed property information (Requirement 4 & 5).
 */
const DetailModal = ({ listing, onClose }) => {
  if (!listing) return null;

  const amenities = ['WiFi', 'Air Conditioning', 'Pool', 'Free Parking', 'Kitchen', 'Hot Shower'];
  const reviews = [
    { name: 'Maria L.', text: 'Pure relaxation! The hosts were wonderful and the view was incredible. True "BiyaHele."', rating: 5 },
    { name: 'Javier S.', text: 'The best rest I’ve had in months. Highly recommended for a quiet getaway.', rating: 5 },
  ];

  const handleShare = (platform) => {
    // In a real app, this would use the Navigator Share API or open a new window.
    console.log(`Sharing ${listing.title} on ${platform}`);
    alert(`Sharing link to ${platform}. (Check console for mock action)`);
  };

  const handleCopy = () => {
    // Fallback copy mechanism for canvas environment
    const link = `https://biyahele.com/listing/${listing.id}`;
    document.execCommand('copy');
    alert(`Link copied to clipboard: ${link}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
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


// Main App Component
const App = () => {
  const [activeCategory, setActiveCategory] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  // Filter listings based on category and search query
  const filteredListings = useMemo(() => {
    let list = mockListings;

    if (activeCategory !== 'All') {
      // 'Trending' shows all favorites/high-rated
      if (activeCategory === 'Trending') {
        list = list.filter(l => l.isFavorite || l.rating >= 4.8);
      } else {
        list = list.filter(l => l.type === activeCategory);
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(l =>
        l.title.toLowerCase().includes(query) ||
        l.location.toLowerCase().includes(query)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);


  const openDetailModal = (listing) => setSelectedListing(listing);
  const closeDetailModal = () => setSelectedListing(null);

  // Mock User Account Menu (Requirement 1 & 8)
  const userMenu = (
    <div className="absolute top-14 right-0 w-64 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-40">
      <div className="p-4 border-b">
        <p className="font-bold text-sky-800">Welcome, Traveler!</p>
        <p className="text-sm text-gray-500">Sign in via Email or SMS (Mock)</p>
      </div>
      <nav className="p-2">
        <a href="#" className="flex items-center p-3 text-gray-800 hover:bg-sky-50 rounded-lg transition"><User size={20} className="mr-3" /> Profile Settings</a>
        <a href="#" className="flex items-center p-3 text-gray-800 hover:bg-sky-50 rounded-lg transition"><Calendar size={20} className="mr-3" /> My Bookings</a>
        <a href="#" className="flex items-center p-3 text-gray-800 hover:bg-sky-50 rounded-lg transition"><Heart size={20} className="mr-3" /> Wishlist (Favorites)</a>
        <a href="#" className="flex items-center p-3 text-gray-800 hover:bg-sky-50 rounded-lg transition"><Settings size={20} className="mr-3" /> Account Settings</a>
      </nav>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-30 bg-white shadow-md p-4 border-b border-sky-100">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo */}
          <h1 className="text-3xl font-extrabold text-sky-800 tracking-tight">
            Biya<span className="text-yellow-500">Hele</span>
          </h1>

          {/* Search Bar (Requirement 6: Filter search) */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg p-2 space-y-2 sm:space-y-0 sm:space-x-1">
            <div className="flex items-center p-1 rounded-full hover:bg-gray-100 transition w-full sm:w-auto">
              <MapPin className="text-sky-600 ml-2 mr-1" size={20} />
              <input type="text" placeholder="Where: Location or Destination" className="p-1 w-full sm:w-48 focus:outline-none bg-transparent text-gray-800" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

            <div className="flex items-center p-1 rounded-full hover:bg-gray-100 transition hidden lg:flex">
              <Calendar className="text-sky-600 ml-2 mr-1" size={20} />
              <span className="p-1 text-gray-800">Dates: Add trip dates</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

            <div className="flex items-center bg-sky-600 text-white rounded-full p-1 cursor-pointer hover:bg-sky-700 transition space-x-2">
              <Users className="ml-2" size={20} />
              <span className="text-sm font-semibold">Who: {guestCount} Guests</span>
              <Search className="mr-2 p-1 bg-sky-800 rounded-full" size={30} />
            </div>
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

      {/* Categories Bar */}
      <nav className="sticky top-[73px] bg-white border-b z-20 shadow-sm overflow-x-auto">
        <div className="container mx-auto flex space-x-6 px-4 sm:px-0 md:px-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`flex flex-col items-center py-3 border-b-2 transition-colors duration-200 whitespace-nowrap
                ${activeCategory === category.name
                  ? 'border-sky-800 text-sky-800 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-sky-600'
                }`}
              onClick={() => setActiveCategory(category.name)}
            >
              <category.icon size={24} className="mb-1" />
              <span className="text-xs">{category.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content & Listings Grid */}
      <main className="container mx-auto py-8 px-4">
        {/* Suggestions & Recommendations (Requirement 9) */}
        <section className="mb-10 p-6 bg-sky-50 rounded-xl shadow-inner border border-sky-100">
          <h2 className="text-2xl font-bold text-sky-800 flex items-center mb-2">
            <TrendingUp className="w-6 h-6 mr-3 text-yellow-500" />
            Suggested for Your Next Hele
          </h2>
          <p className="text-gray-600">Based on your previous bookings and favorites, we recommend places that promise deep rest and unforgettable travel (Biyahe).</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.length > 0 ? (
            filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} onOpenDetail={openDetailModal} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-600 text-xl">
              No BiyaHele listings found for this search. Try a different location!
            </div>
          )}
        </section>
      </main>

      {/* Detail Modal (Requirement 4 & 5) */}
      <DetailModal listing={selectedListing} onClose={closeDetailModal} />

      {/* Mock Footer with E-Wallets Mention (Requirement 7) */}
      <footer className="bg-sky-900 text-white mt-12 py-6">
        <div className="container mx-auto text-center">
          <p className="text-lg font-light mb-2">© 2024 BiyaHele, Inc. | Your Journey to Rest.</p>
          <div className="flex justify-center items-center space-x-4 text-sm mt-2">
            <span className="font-semibold">Payments Accepted:</span>
            <Wallet className="w-5 h-5 text-yellow-400" />
            <span>E-wallets & Major Cards</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Ensure all icons used in DetailModal are defined in imports or locally.
// Add CheckCircle icon for amenities in DetailModal
const CheckCircle = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.6-8.2"></path>
    <path d="M12 2V3"></path>
    <path d="M20 7v3"></path>
    <path d="M12 21v-1"></path>
    <path d="M7 10h10"></path>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default App;
