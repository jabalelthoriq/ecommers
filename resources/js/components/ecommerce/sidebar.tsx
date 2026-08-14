import { Map, BarChart3, Layers, Settings, LogOut } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
const menus = [
    {
        icon: <Map size={22} />,
        text: "Dashboard",
        href: "/seller/dashboard",
    },
    {
        icon: <BarChart3 size={22} />,
        text: "Product",
        href: "/seller/products",
    },
    {
        icon: <Layers size={22} />,
        text: "History",
        href: "/seller/orders",
    },
    {
        icon: <Settings size={22} />,
        text: "Pengaturan",
        href: "/seller/settings",
    },
];

export default function Sidebar() {
    const { url } = usePage();
    
    return (
        <aside
            className="
                group fixed left-5 top-5 z-[9999]
                h-[93vh] w-[84px] hover:w-[285px]
                overflow-hidden rounded-[32px]
                border border-slate-200
                bg-white/90 text-slate-900
                shadow-[0_10px_50px_rgba(139,92,246,0.16)]
                backdrop-blur-2xl
                transition-all duration-500 ease-in-out
            "
        >
            <div className="flex h-full flex-col px-3 py-5">

                {/* Logo */}
                <div className="mb-5 flex items-center">
                    <div
                        className="
                            flex h-[68px] min-w-[68px]
                            items-center justify-center
                            overflow-hidden
                            rounded-2xl
                            bg-white
                            p-1
                        "
                    >
                        <img
                            src="/assets/logo.png"
                            alt="INSPECV Logo"
                            className="
                                max-h-full
                                max-w-full
                                object-contain
                                scale-[1.08]
                            "
                        />
                    </div>

                    <div
                        className="
                            ml-4
                            opacity-0
                            transition-all duration-300
                            group-hover:opacity-100
                        "
                    >
                        <h1
                            className="
                                leading-none
                                text-[30px]
                                font-black
                                tracking-[-2px]
                                text-violet-600
                            "
                        >
                            NOVATREND
                        </h1>

                        <p
                            className="
                                mt-1
                                max-w-[175px]
                                text-[9px]
                                font-bold
                                leading-tight
                                tracking-[-0.2px]
                                text-slate-900
                            "
                        >
                            Indonesian No 1 Ecommerce Website
                        </p>
                    </div>
                </div>

                {/* Menu */}
                <nav className="flex flex-1 flex-col gap-4">
                    {menus.map((item) => {
                        const isActive = url ? url.startsWith(item.href) : false;
                        return (
                            <Link
                                key={item.text}
                                href={item.href}
                                className={`
                                    flex h-14 w-full items-center rounded-2xl
                                    transition-all duration-300
                                    ${
                                        isActive
                                            ? "bg-violet-600 text-white shadow-lg"
                                            : "text-slate-500 hover:bg-violet-100 hover:text-violet-700"
                                    }
                                `}
                            >
                                <div className="flex h-14 min-w-14 items-center justify-center">
                                    {item.icon}
                                </div>

                                <span
                                    className="
                                        ml-3 whitespace-nowrap text-sm font-semibold
                                        opacity-0 transition-all duration-300
                                        group-hover:opacity-100
                                    "
                                >
                                    {item.text}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="
                        flex h-14 w-full items-center rounded-2xl
                        text-red-500
                        transition-all duration-300
                        hover:bg-red-100
                    "
                >
                    <div className="flex h-14 min-w-14 items-center justify-center">
                        <LogOut size={22} />
                    </div>

                    <span
                        className="
                            ml-3 whitespace-nowrap text-sm font-semibold
                            opacity-0 transition-all duration-300
                            group-hover:opacity-100
                        "
                    >
                        Logout
                    </span>
                </Link>
            </div>
        </aside>
    );
}