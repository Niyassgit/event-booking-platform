import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { BookingResponseDto } from "../types";

interface BookingCardProps {
  booking: BookingResponseDto;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const statusColorsAndBg = {
    completed: "text-emerald-400 bg-emerald-400/10",
    confirmed: "text-blue-400 bg-blue-400/10",
    pending: "text-orange-400 bg-orange-400/10",
    cancelled: "text-red-400 bg-red-400/10",
  };

  // Format the booking date for display
  const formatBookingDate = (dateString: string) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4 hover:bg-slate-800 transition-colors"
    >
      <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={booking.service?.image}
          alt={booking.service?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-semibold truncate">
          {booking.service?.title}
        </h4>
        <div className="flex items-center text-slate-400 text-sm mt-1">
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          {formatBookingDate(booking.date)}
        </div>
      </div>
      <div className="text-right">
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize mb-1 ${statusColorsAndBg[booking.status as keyof typeof statusColorsAndBg] || "text-slate-400 bg-slate-400/10"}`}
        >
          {booking.status}
        </span>
        <div className="text-slate-300 font-medium text-sm">
          ₹{booking.service?.price}
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
