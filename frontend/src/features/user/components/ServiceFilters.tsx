import { Search, MapPin } from "lucide-react";
import { CATEGORIES } from "../data/mockData";

interface ServiceFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterCategory: string;
    setFilterCategory: (category: string) => void;
    filterLocation: string;
    setFilterLocation: (location: string) => void;
    filterPriceRange: [number, number];
    setFilterPriceRange: (range: [number, number]) => void;
}

const ServiceFilters = ({
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filterLocation,
    setFilterLocation,
    filterPriceRange,
    setFilterPriceRange
}: ServiceFiltersProps) => {
    return (
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4 relative">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="md:col-span-3 relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Location..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-white focus:ring-2 focus:ring-indigo-500"
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                    />
                </div>
                <div className="md:col-span-3 flex items-center gap-2">
                    <label className="text-sm text-slate-400 whitespace-nowrap">Max Price:</label>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={filterPriceRange[1]}
                        onChange={(e) => setFilterPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <span className="text-sm font-medium text-white min-w-[3rem]">${filterPriceRange[1]}</span>
                </div>
            </div>
        </div>
    );
};

export default ServiceFilters;
