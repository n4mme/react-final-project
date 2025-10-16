import React from 'react';
import { MapPin, Home, Zap, List, TrendingUp } from 'lucide-react';

// Icons mapping for categories (matching string names from App.jsx)
const CategoryIcons = {
    Home: Home,
    Experience: Zap,
    Service: List,
    TrendingUp: TrendingUp,
};

const categories = [
    { name: 'Home', icon: 'Home', filter: 'Home' },
    { name: 'Experience', icon: 'Zap', filter: 'Experience' },
    { name: 'Service', icon: 'List', filter: 'Service' },
    { name: 'Trending', icon: 'TrendingUp', filter: 'Trending' },
];


const SearchBar = ({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) => {

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center border border-sky-100">
            {/* Search Input */}
            <div className="flex items-center border-b md:border-b-0 md:border-r border-gray-200 pr-4 pb-2 md:pb-0 w-full md:w-auto flex-grow">
                <MapPin className="text-sky-600 mr-3" size={20} />
                <input 
                    type="text" 
                    placeholder="Where: Search location, title, or landmark..." 
                    className="p-1 w-full focus:outline-none text-gray-800"
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                {categories.map((category) => {
                    const Icon = CategoryIcons[category.icon];
                    return (
                        <button
                            key={category.name}
                            className={`py-2 px-4 text-sm rounded-full transition-colors duration-200 whitespace-nowrap
                                ${activeCategory === category.name
                                ? 'bg-sky-600 text-white font-semibold shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            onClick={() => setActiveCategory(category.name)}
                        >
                            <div className="flex items-center">
                                {Icon && <Icon size={16} className="mr-1" />}
                                {category.name}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchBar;
