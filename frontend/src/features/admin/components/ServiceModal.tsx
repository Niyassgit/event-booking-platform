import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Service } from "../../../types";

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Service>) => void;
    editingService: Service | null;
}

const CATEGORIES = ["venue", "caterer", "dj", "photographer", "decoration"];

const ServiceModal = ({ isOpen, onClose, onSubmit, editingService }: ServiceModalProps) => {
    const [formData, setFormData] = useState<Partial<Service>>({
        title: "",
        category: "venue",
        pricePerDay: 0,
        description: "",
        location: "",
        contactDetails: "",
        availableFrom: "",
        availableTo: "",
    });

    useEffect(() => {
        if (editingService) {
            setFormData(editingService);
        } else {
            setFormData({
                title: "",
                category: "venue",
                pricePerDay: 0,
                description: "",
                location: "",
                contactDetails: "",
                availableFrom: "",
                availableTo: "",
            });
        }
    }, [editingService, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
                    <h2 className="text-xl font-bold text-white">
                        {editingService ? "Edit Service" : "Add New Service"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Title</label>
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="e.g. Grand Wedding Hall"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Price (per day)</label>
                            <input
                                required
                                type="number"
                                min="0"
                                value={formData.pricePerDay}
                                onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Location</label>
                            <input
                                required
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="City, Country"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Contact Details</label>
                            <input
                                required
                                type="text"
                                value={formData.contactDetails}
                                onChange={(e) => setFormData({ ...formData, contactDetails: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Phone, Email, etc."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Available From</label>
                            <input
                                required
                                type="date"
                                value={formData.availableFrom}
                                onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Available To</label>
                            <input
                                required
                                type="date"
                                value={formData.availableTo}
                                onChange={(e) => setFormData({ ...formData, availableTo: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Description</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            placeholder="Describe the service..."
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors font-medium shadow-lg shadow-indigo-500/20"
                        >
                            {editingService ? "Update Service" : "Create Service"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceModal;
