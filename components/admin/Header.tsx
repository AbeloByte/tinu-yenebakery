"use client";

const getGreeting = (hour: number): string => {
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
};

const Header = () => {
    const hour = new Date().getHours();
    const greeting = getGreeting(hour);

    return (
        <header className="mb-6 border-b pb-4">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                    <p className="text-sm text-gray-500">{greeting},</p>
                    <h2 className="text-lg font-semibold">Welcome back</h2>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                        AY
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold">Admin User</p>
                        <p className="text-xs text-gray-500">Bakery Manager</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
