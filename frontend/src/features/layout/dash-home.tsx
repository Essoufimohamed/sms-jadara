import { Outlet } from "react-router";
import { AppSidebar } from "../../components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import adminImg from "../../assets/admin.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashHome() {
    type User = {
        _id?: string;
        username: string;
        email: string;
        is_actif?: boolean;
        role: Role;
    };
    type Role = {
        role_name: string;
    };

    const [user, setuser] = useState<User | null>(null);
    // const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${userId}/role`, {})
            .then((res) => setuser(res.data))
            .catch((error) => error);
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-sm mb-5">
                    <div className="flex justify-between items-center gap-2 px-4 w-full ">
                        <SidebarTrigger className="-ml-1" />
                        <div className="flex  items-center gap-2">
                            <img
                                alt="admin"
                                src={adminImg}
                                className="inline-block size-8 rounded-full ring-2 ring-white cursor-pointer"
                            />
                            <div className="flex flex-col">
                                <span className="text-neutral-800">
                                    {user && user.username}
                                </span>
                                <span className="text-neutral-500 text-xs">
                                    {user && user.role?.role_name}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* <TableUsers /> */}

                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
