import { Search, Filter, Plus, Pencil, Trash2, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type { Service } from "../../../types";

interface ServicesListProps {
    services: Service[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    onEdit: (service: Service) => void;
    onDelete: (id: string) => void;
    onAddNew: () => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ServicesList = ({
    services,
    searchTerm,
    setSearchTerm,
    onEdit,
    onDelete,
    onAddNew,
    currentPage,
    setCurrentPage,
}: ServicesListProps) => {
    const filteredServices = services.filter((s) =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-200 placeholder-slate-500"
                    />
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm transition-colors">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button
                        onClick={onAddNew}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        <Plus size={18} />
                        Add Service
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-950/50 text-slate-200 uppercase tracking-wider font-semibold text-xs border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Price/Day</th>
                                <th className="px-6 py-4">Availability</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredServices.map((service) => (
                                <tr key={service.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{service.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                                            {service.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <MapPin size={14} className="text-slate-500" />
                                        {service.location}
                                    </td>
                                    <td className="px-6 py-4 text-emerald-400 font-medium whitespace-nowrap">
                                        ₹ {service.pricePerDay.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-xs">
                                        <div className="flex flex-col gap-1">
                                            <span>
                                                <span className="text-slate-500">From:</span> {service.availableFrom}
                                            </span>
                                            <span>
                                                <span className="text-slate-500">To:</span> {service.availableTo}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(service)}
                                                className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(service.id)}
                                                className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Mock) */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/30">
                    <span className="text-sm text-slate-500">
                        Page {currentPage} of 10
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1 rounded-md text-slate-400 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="p-1 rounded-md text-slate-400 hover:bg-slate-800 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesList;
