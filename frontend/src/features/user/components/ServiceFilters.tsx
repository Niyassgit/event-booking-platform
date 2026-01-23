import { Search, MapPin, Filter, RotateCcw } from "lucide-react";
import { CATEGORIES } from "../types";
import { useState, useEffect } from "react";

interface ServiceFiltersProps {
    initialFilters: {
        searchTerm: string;
        filterCategory: string;
        filterLocation: string;
        filterPriceRange: [number, number];
    };
    onApply: (filters: {
        searchTerm: string;
        filterCategory: string;
        filterLocation: string;
        filterPriceRange: [number, number];
    }) => void;
    maxPriceLimit: number;
}

const ServiceFilters = ({
    initialFilters,
    onApply,
    maxPriceLimit
}: ServiceFiltersProps) => {
    const [localSearch, setLocalSearch] = useState(initialFilters.searchTerm);
    const [localCategory, setLocalCategory] = useState(initialFilters.filterCategory);
    const [localLocation, setLocalLocation] = useState(initialFilters.filterLocation);
    const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(initialFilters.filterPriceRange);

    // Sync local state if initialFilters changes (e.g. on Reset from parent or initial load)
    useEffect(() => {
        setLocalSearch(initialFilters.searchTerm);
        setLocalCategory(initialFilters.filterCategory);
        setLocalLocation(initialFilters.filterLocation);
        setLocalPriceRange(initialFilters.filterPriceRange);
    }, [initialFilters]);

    const handleApply = () => {
        onApply({
            searchTerm: localSearch,
            filterCategory: localCategory,
            filterLocation: localLocation,
            filterPriceRange: localPriceRange
        });
    };

    const handleReset = () => {
        const defaultFilters: [number, number] = [0, maxPriceLimit];
        setLocalSearch("");
        setLocalCategory("All");
        setLocalLocation("");
        setLocalPriceRange(defaultFilters);
        onApply({
            searchTerm: "",
            filterCategory: "All",
            filterLocation: "",
            filterPriceRange: defaultFilters
        });
    };

    return (
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4 relative">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <select
                        value={localCategory}
                        onChange={(e) => setLocalCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 font-medium appearance-none cursor-pointer"
                    >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="md:col-span-3 relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Location..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-white focus:ring-2 focus:ring-indigo-500 font-medium"
                        value={localLocation}
                        onChange={(e) => setLocalLocation(e.target.value)}
                    />
                </div>
                <div className="md:col-span-3 flex items-center gap-2 px-2">
                    <label className="text-sm font-semibold text-slate-400 whitespace-nowrap">Max Price:</label>
                    <input
                        type="range"
                        min="0"
                        max={maxPriceLimit}
                        step="100"
                        value={localPriceRange[1]}
                        onChange={(e) => setLocalPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <span className="text-sm font-bold text-white min-w-[4rem] text-right">₹{localPriceRange[1]}</span>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-700"
                >
                    <RotateCcw size={16} />
                    Reset
                </button>
                <button
                    onClick={handleApply}
                    className="flex items-center gap-2 px-8 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                >
                    <Filter size={16} />
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default ServiceFilters;
