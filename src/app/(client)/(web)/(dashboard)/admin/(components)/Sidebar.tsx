"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Grid, Boxes, Building2, Settings, Menu, X } from "lucide-react";
import { toast } from "sonner";

type SubItem = {
  link: string;
  title: string;
};

type NavItem = {
  link: string;
  title: string;
  icon: ReactNode;
  subItems?: SubItem[];
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  // const router = useRouter();

  const navItems: NavItem[] = [
    {
      link: "/admin",
      title: "Dashboard",
      icon: <Grid size={18} className="shrink-0" />,
    },
    {
      link: "/admin/products",
      title: "Products",
      icon: <Boxes size={18} className="shrink-0" />,
    },
    {
      link: "/admin/projects",
      title: "Projects",
      icon: <Building2 size={18} className="shrink-0" />,
    },
    {
      link: "/admin/settings",
      title: "Settings",
      icon: <Settings size={18} className="shrink-0" />,
    },
  ];

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        toast.error("Logout failed");
        return;
      }

      toast.success("Logged out successfully");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
        setIsMobile(true);
      } else if (window.innerWidth <= 900) {
        setIsCollapsed(true);
        setIsMobile(false);
      } else {
        setIsCollapsed(false);
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) setIsCollapsed(true);
  };

  return (
    <section>
      {/* 1. MOBILE FLOATING BUTTON - ALWAYS RENDERED, Tailwind media classes control visibility */}
      <button
        className={`fixed top-3.5 left-4 z-9999 bg-white text-[#e31b23] border border-gray-100 rounded-lg p-2 cursor-pointer shadow-md items-center justify-center hidden max-[768px]:flex ${
          !isCollapsed ? "max-[768px]:hidden!" : ""
        }`}
        onClick={() => setIsCollapsed(false)}
      >
        <Menu size={24} />
      </button>

      {/* 2. MOBILE OVERLAY (Dark background that closes sidebar when clicked) */}
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-9995 animate-[fadeIn_0.2s_ease-out_forwards]"
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}

      {/* 3. THE SIDEBAR */}
      <aside
        className={`overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden fixed top-0 bottom-0 left-0 bg-white border-r border-gray-100 p-4.5 flex flex-col shrink-0 transition-all duration-300 ease-in-out overflow-x-hidden whitespace-nowrap z-9998 md:sticky md:h-screen ${
          isCollapsed
            ? "w-20 px-3 max-[768px]:-translate-x-full max-[768px]:w-64"
            : "w-64"
        }`}
      >
        <div className="flex flex-col flex-1">
          {/* Logo Section */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-300 ${
              isCollapsed
                ? "flex-col gap-4.5 items-center max-[768px]:flex-row max-[768px]:gap-3"
                : ""
            }`}
          >
            <div className="relative w-10.5 h-10.5 rounded-[10px] bg-white border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
              <Image
                fill
                src="/images/logo.jpeg"
                alt="The Cabins Logo"
                className="w-full h-full object-center object-cover"
              />
            </div>

            <div
              className={`logo-text ${isCollapsed ? "hidden max-[768px]:block" : "block"}`}
            >
              <h2 className="text-brand-dark text-xl font-bold m-0 leading-tight">
                The Cabins
              </h2>
              <span className="text-gray-500 text-[11px] tracking-wider uppercase font-semibold">
                Admin Panel
              </span>
            </div>

            {/* Close button on mobile, expand/collapse on desktop */}
            <button
              className={`menu-toggle text-gray-700 border-none rounded-[10px] bg-gray-100 cursor-pointer flex items-center justify-center shrink-0 transition-all hover:bg-gray-200 ${
                isCollapsed
                  ? "m-0 w-8 h-8 max-[768px]:ml-auto max-[768px]:w-8.5 max-[768px]:h-8.5"
                  : "ml-auto w-8.5 h-8.5"
              }`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isMobile ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item, itemIndex) => {
              const isActive =
                item.link === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.link);

              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div key={itemIndex} className="flex flex-col gap-1">
                  <Link
                    href={item.link}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl no-underline transition-all text-sm border-l-4 ${
                      isActive && !hasSubItems
                        ? "bg-red-50 text-[#e31b23] border-[#e31b23] rounded-l-none rounded-r-xl font-semibold"
                        : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-[#e31b23]"
                    } ${isCollapsed ? "justify-center py-3.5 px-0" : ""}`}
                  >
                    <span>{item.icon}</span>
                    <span
                      className={`${
                        isCollapsed
                          ? "hidden max-[768px]:inline justify-center py-3.5 px-0"
                          : "inline"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>

                  {/* Sub-items rendering */}
                  {hasSubItems && !isCollapsed && (
                    <div className="flex flex-col gap-1 pl-9 mt-1 border-l border-gray-100 ml-6">
                      {item.subItems!.map((subItem, subIndex) => {
                        const isSubActive =
                          pathname === subItem.link ||
                          pathname.startsWith(subItem.link + "/");
                        return (
                          <Link
                            key={subIndex}
                            href={subItem.link}
                            onClick={handleLinkClick}
                            className={`py-1.5 px-2 text-xs no-underline transition-all rounded-lg flex items-center gap-2 ${
                              isSubActive
                                ? "text-[#e31b23] bg-red-50/50 font-semibold"
                                : "text-gray-500 hover:text-[#e31b23] hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-[10px] text-gray-300">
                              ├─
                            </span>
                            <span>{subItem.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* User Profile Section at Bottom */}
        <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-4">
          <Link
            href="/profile"
            className={`flex items-center gap-3 bg-gray-50 hover:bg-gray-100/80 p-3 rounded-[10px] no-underline cursor-pointer border border-gray-100/50 transition-all ${
              isCollapsed
                ? "p-0 py-3 justify-center max-[768px]:p-3 max-[768px]:justify-start"
                : ""
            }`}
            onClick={handleLinkClick}
          >
            <div className="relative w-7 h-7 grid place-items-center bg-[#e31b23] rounded-full shrink-0">
              <span className="text-white text-xs font-bold">U</span>
            </div>

            <div
              className={`profile-info ${isCollapsed ? "hidden max-[768px]:block" : "block"}`}
            >
              <h4 className="text-xs font-semibold text-gray-800 m-0">
                User Name
              </h4>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-transparent border border-red-100 text-[#e31b23] py-2 rounded-lg cursor-pointer text-xs font-semibold hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
    </section>
  );
}
