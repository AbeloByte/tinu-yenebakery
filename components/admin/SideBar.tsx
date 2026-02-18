"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Overview", href: "/admin", icon: "overview" },
    { label: "Products", href: "/admin/products", icon: "products" },
];

type SideBarProps = {
    isVisible: boolean;
    onClose: () => void;
    onToggle: () => void;
};

const SideBar = ({ isVisible, onClose, onToggle }: SideBarProps) => {
    const pathname = usePathname();

    const handleNavItemClick = () => {
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    const renderIcon = (icon: "overview" | "products") => {
        if (icon === "overview") {
            return (
                <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M3 11.5 12 4l9 7.5" />
                    <path d="M5 10.5V20h14v-9.5" />
                </svg>
            );
        }

        return (
            <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M4 7h16" />
                <path d="M6 7v12h12V7" />
                <path d="M10 11h4" />
            </svg>
        );
    };

    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === href;
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <>
            {!isVisible ? (
                <button
                    type="button"
                    onClick={onToggle}
                    className="fixed left-4 top-4 z-30 rounded-md border bg-white p-2 md:hidden"
                    aria-label="Show sidebar"
                >
                    <span className="text-lg leading-none">☰</span>
                </button>
            ) : null}

            {isVisible ? (
                <button
                    type="button"
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                    onClick={onClose}
                    aria-label="Close navigation backdrop"
                />
            ) : null}

            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 border-r  p-4 transition-transform md:static md:h-screen md:translate-x-0 ${
                    isVisible
                        ? "translate-x-0 md:w-64"
                        : "-translate-x-full md:translate-x-0 md:w-20"
                }`}
            >
                <div
                    className={`mb-4 flex items-center border-b pb-3 ${
                        isVisible ? "justify-between" : "justify-center"
                    }`}
                >
                    {isVisible ? (
                        <h1 className="text-base font-semibold">
                            Admin Dashboard
                        </h1>
                    ) : null}
                    <button
                        type="button"
                        onClick={onToggle}
                        className="rounded-md border px-2 py-1 text-sm"
                        aria-label={
                            isVisible ? "Collapse sidebar" : "Expand sidebar"
                        }
                    >
                        <span className="text-base leading-none">
                            {isVisible ? "◀" : "▶"}
                        </span>
                    </button>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleNavItemClick}
                            className={`flex items-center rounded-md px-3 py-2 text-sm ${
                                isActive(item.href)
                                    ? "bg-black text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                            aria-label={item.label}
                            title={!isVisible ? item.label : undefined}
                        >
                            <span className={isVisible ? "mr-2" : "mx-auto"}>
                                {renderIcon(item.icon)}
                            </span>
                            {isVisible ? <span>{item.label}</span> : null}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default SideBar;
