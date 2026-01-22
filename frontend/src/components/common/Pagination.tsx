import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/30">
            <span className="text-sm text-slate-500">
                Page <span className="text-slate-300 font-medium">{currentPage}</span> of{" "}
                <span className="text-slate-300 font-medium">{totalPages}</span>
            </span>
            <div className="flex gap-2">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-transparent hover:border-slate-700"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => {
                        const pageNumber = i + 1;
                        // Simple logic to show only few pages if there are many
                        if (
                            totalPages > 7 &&
                            pageNumber !== 1 &&
                            pageNumber !== totalPages &&
                            Math.abs(pageNumber - currentPage) > 1
                        ) {
                            if (pageNumber === 2 || pageNumber === totalPages - 1) {
                                return <span key={pageNumber} className="text-slate-600 px-1">...</span>;
                            }
                            return null;
                        }

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => onPageChange(pageNumber)}
                                className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-all border ${currentPage === pageNumber
                                        ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                                        : "text-slate-400 border-transparent hover:border-slate-700 hover:bg-slate-800"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-transparent hover:border-slate-700"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
