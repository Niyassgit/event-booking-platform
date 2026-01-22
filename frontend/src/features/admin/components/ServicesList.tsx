import { Plus, Pencil, Trash2, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type { Service } from "../../../types";

interface ServicesListProps {
    services: Service[];
    onEdit: (service: Service) => void;
    onDelete: (id: string) => void;
    onAddNew: () => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ServicesList = ({
    services,
    onEdit,
    onDelete,
    onAddNew,
    currentPage,
    setCurrentPage,
}: ServicesListProps) => {
    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Plus size={18} className="text-indigo-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Services</h2>
                </div>

                <div className="flex gap-3">
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
                            {services?.map((service) => (
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
                                            {service.availableFrom && (
                                                <span>
                                                    <span className="text-slate-500">From:</span>{" "}
                                                    <span className="text-slate-300">
                                                        {new Date(service.availableFrom).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </span>
                                                </span>
                                            )}
                                            {service.availableTo && (
                                                <span>
                                                    <span className="text-slate-500">To:</span>{" "}
                                                    <span className="text-slate-300">
                                                        {new Date(service.availableTo).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </span>
                                                </span>
                                            )}
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
