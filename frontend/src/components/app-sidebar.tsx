import * as React from "react";
import {
    // AudioWaveform,
    // Blocks,
    // Calendar,
    // Command,
    Home,
    Users,
    // MessageCircleQuestion,
    // Search,
    // Settings2,

    // Trash2,
    BookOpenText,
    Boxes,
    // Trash2,
} from "lucide-react";

import { NavMain } from "../components/nav-main";
// import { NavSecondary } from "../components/nav-secondary";
import logo from "/src/assets/fondation-logo.png";
import {
    Sidebar,
    // SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "../components/ui/sidebar";
import { Link } from "react-router";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Home",
            url: "/dash-home/",
            icon: Home,
            // isActive: true,
        },
        // {
        //     title: "Search",
        //     url: "#",
        //     icon: Search,
        // },
        {
            title: "Users",
            url: "/dash-home/users",
            icon: Users,
        },

        {
            title: "Courses",
            url: "/dash-home/courses",
            icon: BookOpenText,
            badge: "10",
        },
        {
            title: "Groups",
            url: "/dash-home/groups",
            icon: Boxes,
            badge: "10",
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <div>
                    <Link to={"/"} className="flex items-center gap-4 mb-3">
                        <img src={logo} alt="" className="w-9" />
                        <span>
                            <strong className="text-[#3054A0]">
                                Jadara Management
                            </strong>
                        </span>
                    </Link>
                </div>

                <NavMain items={data.navMain} />
            </SidebarHeader>
            {/* <SidebarContent>
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent> */}
            <SidebarRail />
        </Sidebar>
    );
}
