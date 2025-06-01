import { Menu } from "lucide-react";
import logosmta from "/public/souss_massa_tech_logo.png";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet";
import { Link } from "react-router-dom";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        // title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar1 = ({
    logo = {
        url: "/",
        src: logosmta,
        alt: "touss massa tech academy",
    },
    menu = [
        { title: "Home", url: "/" },
        {
            title: "About",
            url: "#",
        },
        {
            title: "Contact",
            url: "#",
        },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Sign up", url: "/register" },
    },
}: Navbar1Props) => {
    return (
        <section className="py-4 bg-[#fffad5] shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
            {/* #ebf2ff */}
            <div className="container mx-auto">
                {/* Desktop Menu */}
                <nav className="hidden justify-between lg:flex">
                    {/* <div className="flex items-center gap-6"> */}
                    {/* Logo */}
                    <Link to={logo.url} className="flex items-center gap-2">
                        <img
                            src={logo.src}
                            className="max-h-10"
                            alt={logo.alt}
                        />
                    </Link>
                    <div className="flex items-center ">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {menu.map((item) => renderMenuItem(item))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    {/* </div> */}
                    <div className="flex gap-2">
                        <Button
                            asChild
                            // variant="outline"
                            className="bg-transparent text-[#3054a0]  border-2 border-[#00318b] hover:bg-[#00318b] hover:text-[#fff]"
                            // size="sm"
                        >
                            <Link to={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button
                            asChild
                            // size="sm"
                            className="bg-[#3054a0]  hover:bg-[#00318b]"
                        >
                            <Link to={auth.signup.url}>
                                {auth.signup.title}
                            </Link>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <img
                                src={logo.src}
                                className="max-h-8"
                                alt={logo.alt}
                            />
                        </a>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <a
                                            href={logo.url}
                                            className="flex items-center gap-2"
                                        >
                                            <img
                                                src={logo.src}
                                                className="max-h-8"
                                                alt={logo.alt}
                                            />
                                        </a>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {menu.map((item) =>
                                            renderMobileMenuItem(item)
                                        )}
                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        <Button asChild variant="outline">
                                            <Link to={auth.login.url}>
                                                {auth.login.title}
                                            </Link>
                                        </Button>
                                        <Button asChild>
                                            <Link to={auth.signup.url}>
                                                {auth.signup.title}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink
                            asChild
                            key={subItem.title}
                            className="w-80"
                        >
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }
    // #00318b  #e7ca00
    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md border-b-3 border-[#00318b] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#00318b] hover:text-[#fff]"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem
                key={item.title}
                value={item.title}
                className="border-b-0"
            >
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <a key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </a>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <a
            className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
            href={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-sm leading-snug text-muted-foreground">
                        {item.description}
                    </p>
                )}
            </div>
        </a>
    );
};

export { Navbar1 };
