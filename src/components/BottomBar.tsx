import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Grid3X3, 
  User, 
  ShoppingBag, 
  Heart,
  Sparkles,
  Package,
  Store
} from "lucide-react";

const BottomBar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      id: 1,
      name: "Home",
      icon: Home,
      href: "/",
    },
    {
      id: 2,
      name: "Shop",
      icon: Store,
      href: "/facewash",
    },
    {
      id: 3,
      name: "Categories",
      icon: Grid3X3,
      href: "/categories",
    },
    {
      id: 4,
      name: "Orders",
      icon: Package,
      href: "/orders",
      badge: "2",
    },
    {
      id: 5,
      name: "Profile",
      icon: User,
      href: "/profile",
    },
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]" 
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        
        <div className="flex items-center justify-around px-1 py-1.5 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/" && location.pathname.startsWith(item.href));
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-300 group min-w-[60px] ${
                  isActive 
                    ? "text-[var(--primary)]" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {/* Active Pill Indicator */}
                {isActive && (
                  <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-10 h-[3px] bg-[var(--primary)] rounded-full shadow-sm" />
                )}
                
                {/* Icon Wrapper */}
                <div className={`relative p-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-[var(--primary)]/10 scale-110" 
                    : "group-hover:bg-gray-100 group-hover:scale-105"
                }`}>
                  <IconComponent 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className="transition-all duration-300" 
                  />
                  
                  {/* Notification Badge */}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm border-2 border-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                
                {/* Label */}
                <span className={`text-[10px] font-medium mt-0.5 transition-all duration-300 ${
                  isActive ? "font-bold" : ""
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Spacer */}
      <div className="lg:hidden h-[64px]" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }} />
    </>
  );
};

export default BottomBar;