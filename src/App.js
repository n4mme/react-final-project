import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ListingGrid from './components/ListingGrid';
import PropertyModal from './components/PropertyModal';
import HostDashboard from './components/HostDashboard';
import GuestDashboard from './components/GuestDashboard';
import AdminDashboard from './components/AdminDashboard';
import AccountSettings from './components/AccountSettings';
import Footer from './components/Footer';
import sampleListings from './data/sampleListings';
import { auth } from "./firebase";
console.log("Firebase Auth connected:", auth);



function App() {
  const [page, setPage] = useState('login');
  const [listings, setListings] = useState(sampleListings);
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);

  function handleSearch(filters) {
    const q = filters.where.trim().toLowerCase();
    setListings(
      sampleListings.filter(
        (l) =>
          (q === '' ||
            l.location.toLowerCase().includes(q) ||
            l.title.toLowerCase().includes(q)) &&
          (filters.category === 'Any' || l.category === filters.category)
      )
    );
    setPage('home');
  }

  function handleSaveListing(item) {
    setListings((prev) => [item, ...prev]);
    setPage('host');
  }

  function toggleFav(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div>
      {/* Hide Header for login and register pages */}
      {page !== 'login' && page !== 'register' && (
        <Header onNavigate={setPage} current={page} />
      )}

      <main className="container">
        {page === 'login' ? (
          <Login onNavigate={setPage} />
        ) : page === 'register' ? (
          <Register onNavigate={setPage} />
        ) : (
          <>

            <SearchBar onSearch={handleSearch} />

            {page === 'home' && (
              <div>
                <div className="page-title">
                  <div>Featured Listings</div>
                  <div style={{ color: '#6b7280' }}>
                    High-contrast, accessible design
                  </div>
                </div>
                <ListingGrid
                  items={listings}
                  onView={setSelected}
                  favorites={favorites}
                  onToggleFav={toggleFav}
                />
              </div>
            )}

            {page === 'guest' && (
              <div>
                <GuestDashboard items={listings} />
                <ListingGrid
                  items={listings}
                  onView={setSelected}
                  favorites={favorites}
                  onToggleFav={toggleFav}
                />
              </div>
            )}

            {page === 'host' && (
              <HostDashboard listings={listings} onSave={handleSaveListing} />
            )}
            {page === 'admin' && <AdminDashboard listings={listings} />}
            {page === 'account' && <AccountSettings favorites={favorites} />}

            {/* Hide Footer for login and register */}
            {page !== 'login' && page !== 'register' && <Footer />}
          </>
        )}

        <PropertyModal item={selected} onClose={() => setSelected(null)} />
      </main>
    </div>
  );
}

export default App;
