import { useState } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";

interface FilterBarProps {
    onFilter: (filters: any) => void;
    categories?: string[];
    showCategoryFilter?: boolean;
    showPriceFilter?: boolean;
    showDateFilter?: boolean;
}

const FilterBar = ({
    onFilter,
    categories = [],
    showCategoryFilter = true,
    showPriceFilter = true,
    showDateFilter = true
}: FilterBarProps) => {
    const [filters, setFilters] = useState({
        category: "All",
        minPrice: "",
        maxPrice: "",
        startDate: "",
        endDate: "",
        searchTerm: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        onFilter(filters);
    };

    const handleReset = () => {
        const resetData = {
            category: "All",
            minPrice: "",
            maxPrice: "",
            startDate: "",
            endDate: "",
            searchTerm: ""
        };
        setFilters(resetData);
        onFilter(resetData);
    };

    return (
        <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-2xl mb-8 space-y-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
                <Filter className="text-indigo-400" size={20} />
                <h3 className="text-white font-medium">Filter Services</h3>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${1 + (showCategoryFilter ? 1 : 0) + (showPriceFilter ? 2 : 0) + (showDateFilter ? 2 : 0)
                } gap-4`}>
                {/* Search Term */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Search</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="searchTerm"
                            value={filters.searchTerm}
                            onChange={handleChange}
                            placeholder="Keywords..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                    </div>
                </div>

                {/* Category */}
                {showCategoryFilter && (
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</label>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                        >
                            <option value="All">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Min Price */}
                {showPriceFilter && (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Min Price</label>
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleChange}
                                placeholder="Min..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Max Price */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Max Price</label>
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleChange}
                                placeholder="Max..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </>
                )}

                {/* Start Date */}
                {showDateFilter && (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* End Date */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                >
                    <RotateCcw size={16} />
                    Reset
                </button>
                <button
                    onClick={handleApply}
                    className="flex items-center gap-2 px-6 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-500/20"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
