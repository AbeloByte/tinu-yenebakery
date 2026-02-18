import OrderTable from "@/components/admin/OrderTable";
import StatusCard from "@/components/admin/StatusCard";

const Admin = () => {
    const orderStats = [
        { value: 248, label: "Total Orders", tone: "total" as const },
        { value: 31, label: "Pending Payment", tone: "pending" as const },
        {
            value: 142,
            label: "Paid (Deposit Received)",
            tone: "paid" as const,
        },
        { value: 56, label: "Ready for Pickup", tone: "ready" as const },
        // { value: 107, label: "Completed Orders", tone: "completed" as const },
    ];

    const demoOrders = [
        {
            id: "ord-1001",
            customerName: "Marta",
            total: 38,
            status: "PENDING" as const,
        },
        {
            id: "ord-1002",
            customerName: "Dawit",
            total: 24.5,
            status: "READY" as const,
        },
    ];

    return (
        <section className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {orderStats.map((stat) => (
                    <StatusCard
                        key={stat.label}
                        value={stat.value}
                        label={stat.label}
                        tone={stat.tone}
                    />
                ))}
            </div>

            <h2 className="text-xl font-semibold">Recent Orders</h2>
            {/* <OrderTable orders={demoOrders} /> */}
        </section>
    );
};

export default Admin;
