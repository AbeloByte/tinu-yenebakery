import Link from "next/link";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-amber-50 text-black">
            <header className="border-b">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <h1 className="text-lg font-semibold">YB</h1>
                    <nav className="text-sm">
                        <Link href="/">Home</Link>
                    </nav>
                </div>
            </header>
            {children}
        </div>
    );
};

export default CustomerLayout;
