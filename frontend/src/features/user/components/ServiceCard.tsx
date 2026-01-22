import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import type { Service } from "../types";

interface ServiceCardProps {
    service: Service;
    onBook: (service: Service) => void;
}

const ServiceCard = ({ service, onBook }: ServiceCardProps) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col group"
    >
        <div className="relative h-48 overflow-hidden">
            <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {service.rating}
            </div>
            <div className="absolute top-3 left-3 bg-indigo-500/80 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-medium text-white">
                {service.category}
            </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white leading-tight">{service.name}</h3>
            </div>
            <div className="flex items-center text-slate-400 text-sm mb-3">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                {service.location}
            </div>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{service.description}</p>

            <div className="mt-auto pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm">
                <div>
                    <span className="text-emerald-400 font-bold text-lg">₹{service.price}</span>
                    <span className="text-slate-500 text-xs ml-1">/ event</span>
                </div>
                <button
                    onClick={() => onBook(service)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-xs"
                >
                    View Details
                </button>
            </div>
        </div>
    </motion.div>
);

export default ServiceCard;
