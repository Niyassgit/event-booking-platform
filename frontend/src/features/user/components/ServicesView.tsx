import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import ServiceCard from "./ServiceCard";
import ServiceFilters from "./ServiceFilters";
import type { Service } from "../types";

interface ServicesViewProps {
  filteredServices: Service[];
  onBook: (service: Service) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterLocation: string;
  setFilterLocation: (location: string) => void;
  filterPriceRange: [number, number];
  setFilterPriceRange: (range: [number, number]) => void;
}

const ServicesView = ({
  filteredServices,
  onBook,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterLocation,
  setFilterLocation,
  filterPriceRange,
  setFilterPriceRange,
}: ServicesViewProps) => {
  return (
    <div className="space-y-6">
      <ServiceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
        filterPriceRange={filterPriceRange}
        setFilterPriceRange={setFilterPriceRange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} onBook={onBook} />
          ))}
        </AnimatePresence>
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-slate-800/50 inline-flex p-4 rounded-full mb-4">
            <Search className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-white">No services found</h3>
          <p className="text-slate-400">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServicesView;
