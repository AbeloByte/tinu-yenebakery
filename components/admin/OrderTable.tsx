import { formatCurrency } from "@/utils/currency";

type OrderSummary = {
    id: string;
    customerName: string;
    total: number;
    status: "PENDING" | "CONFIRMED" | "READY" | "COMPLETED";
};

type OrderTableProps = {
    orders: OrderSummary[];
};

const statusClasses: Record<OrderSummary["status"], string> = {
    PENDING: "bg-amber-100 text-amber-900",
    CONFIRMED: "bg-blue-100 text-blue-900",
    READY: "bg-sky-100 text-sky-900",
    COMPLETED: "bg-emerald-100 text-emerald-900",
};

const OrderTable = ({ orders }: OrderTableProps) => {
    if (orders.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-6 text-sm text-gray-600 shadow-sm">
                No orders found.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        <th className="px-4 py-3">Order</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white text-sm text-gray-700">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">
                                {order.id}
                            </td>
                            <td className="px-4 py-3">{order.customerName}</td>
                            <td className="px-4 py-3">
                                {formatCurrency(order.total)}
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[order.status]}`}
                                >
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
