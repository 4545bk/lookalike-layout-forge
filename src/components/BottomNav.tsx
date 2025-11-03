import { Home, CreditCard, Grid3x3, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", icon: Home, route: "/" },
    { id: "payment", label: "Payment", icon: CreditCard, route: "#" },
    { id: "apps", label: "Apps", icon: Grid3x3, route: "#" },
    { id: "engage", label: "Engage", icon: MessageCircle, route: "#" },
    { id: "account", label: "Account", icon: User, route: "#" },
  ];

  const isActive = (route: string) => {
    return location.pathname === route;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground border-t border-primary-foreground/10 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.route);
          return (
            <button
              key={item.id}
              onClick={() => item.route !== "#" && navigate(item.route)}
              className={`flex flex-col items-center justify-center min-w-[60px] py-1 px-2 ${
                active ? "opacity-100" : "opacity-70"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
