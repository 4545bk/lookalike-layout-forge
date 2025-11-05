import { Search, Bell, ChevronDown } from "lucide-react";
import telebirrLogo from "@/assets/telebirr-logo.png";

interface AppHeaderProps {
  userName?: string;
  greeting?: string;
}

export const AppHeader = ({ userName = "YAEL", greeting = "Selam, NA" }: AppHeaderProps) => {
  return (
    <header className="relative bg-primary overflow-hidden">
      {/* Wavy pattern background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="currentColor"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Top bar with logos */}
      <div className="relative flex items-center justify-between px-4 py-2 bg-card">
        <div className="flex items-center gap-2">
          <div className="text-xs text-foreground">◄ Search .llll 3G</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-foreground">10:31 PM</span>
          <span className="text-xs text-foreground">@ 49% 🔋</span>
        </div>
      </div>

      {/* Logo bar */}
      <div className="relative flex items-center justify-center px-4 py-3 bg-card border-b">
        <img src={telebirrLogo} alt="Ethio Telecom & Telebirr" className="h-10 object-contain" />
      </div>

      {/* User info bar */}
      <div className="relative flex items-center justify-between px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-medium">{userName}</div>
            <div className="text-sm opacity-90">{greeting}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
          <button className="p-2">
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tagline */}
      <div className="relative bg-primary/90 px-4 py-1 text-center">
        <p className="text-xs text-primary-foreground/80">One app for all needs</p>
      </div>
    </header>
  );
};
