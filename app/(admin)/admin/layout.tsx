"use client";

import { useState } from "react";

import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/SideBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible((previous) => !previous);
    };

    const closeSidebar = () => {
        setIsSidebarVisible(false);
    };

    return (
        <div className="min-h-screen bg-amber-50 text-black  md:flex">
            <SideBar
                isVisible={isSidebarVisible}
                onClose={closeSidebar}
                onToggle={toggleSidebar}
            />
            <main className="flex-1 px-4 py-6 md:px-8">
                <Header />
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
