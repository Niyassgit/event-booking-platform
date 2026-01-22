import { useState, useEffect, useCallback } from "react";
import { getAllUsers } from "../services/api";
import FilterBar from "../../../components/common/FilterBar";
import Pagination from "../../../components/common/Pagination";
import toast from "react-hot-toast";
import { User, Mail, Phone, Calendar, Shield } from "lucide-react";

const UserManagement = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

    const fetchUsers = useCallback(async (filters: Record<string, any> = {}, page: number = 1) => {
        try {
            setLoading(true);
            const response = await getAllUsers({ ...filters, page, limit: 10 });
            if (response.success && response.data) {
                setUsers(response.data);
                if (response.meta) {
                    setTotalPages(response.meta.totalPages);
                    setCurrentPage(response.meta.page);
                }
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers(activeFilters, currentPage);
    }, [fetchUsers, activeFilters, currentPage]);

    const handleFilterChange = (filters: any) => {
        setActiveFilters(filters);
        setCurrentPage(1);
    };

    return (
        <div className="p-8 space-y-6">
            <FilterBar onFilter={handleFilterChange} showCategoryFilter={false} showPriceFilter={false} showDateFilter={false} />

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-slate-400">Loading users...</div>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="bg-slate-950/50 text-slate-200 uppercase tracking-wider font-semibold text-xs border-b border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Contact</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                                        <User size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white">{user.name}</div>
                                                        <div className="text-xs text-slate-500">ID: #{user.id.slice(-6)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Mail size={14} className="text-slate-500" />
                                                        <span>{user.email}</span>
                                                    </div>
                                                    {user.mobile && (
                                                        <div className="flex items-center gap-2">
                                                            <Phone size={14} className="text-slate-500" />
                                                            <span>{user.mobile}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize flex items-center gap-1.5 w-fit ${user.role === "ADMIN"
                                                    ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                                    : "bg-slate-800 text-slate-300 border-slate-700"}`}>
                                                    <Shield size={12} />
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-mono">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-slate-500" />
                                                    <span>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
