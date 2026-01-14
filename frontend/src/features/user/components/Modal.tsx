import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="fixed inset-0 m-auto z-50 max-w-2xl max-h-[90vh] overflow-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-0 flex flex-col"
                    style={{ width: 'calc(100% - 2rem)' }}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 p-1 bg-black/20 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                    {children}
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

export default Modal;
