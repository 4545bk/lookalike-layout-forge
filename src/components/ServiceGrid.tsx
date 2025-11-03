import { Wallet, ArrowDownUp, Smartphone, ShoppingBag, Building2, Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Service {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: string;
  route?: string;
}

export const ServiceGrid = () => {
  const navigate = useNavigate();

  const services: Service[] = [
    {
      id: "send",
      name: "Send Money",
      icon: <Wallet className="w-10 h-10 text-primary" />,
    },
    {
      id: "cash",
      name: "Cash In/Out",
      icon: <ArrowDownUp className="w-10 h-10 text-primary" />,
    },
    {
      id: "airtime",
      name: "Airtime/\nBuy Package",
      icon: <Smartphone className="w-10 h-10 text-primary" />,
      badge: "Up to +25%",
    },
    {
      id: "zemen",
      name: "Zemen\nGEBEYA",
      icon: <ShoppingBag className="w-10 h-10 text-foreground" />,
    },
    {
      id: "dashen",
      name: "Financial\nService With\nDashen",
      icon: <Building2 className="w-10 h-10 text-accent" />,
    },
    {
      id: "cbe",
      name: "Financial\nService With\nCBE",
      icon: <Building2 className="w-10 h-10 text-secondary" />,
    },
    {
      id: "siinqee",
      name: "Financial\nService with\nSiinqee",
      icon: <Building2 className="w-10 h-10 text-secondary" />,
    },
    {
      id: "bank",
      name: "Transfer\nto Bank",
      icon: <Landmark className="w-10 h-10 text-primary" />,
      route: "/transaction-success",
    },
  ];

  const handleServiceClick = (service: Service) => {
    if (service.route) {
      navigate(service.route);
    }
  };

  return (
    <div className="bg-card p-4">
      {/* Banner */}
      <div className="bg-secondary text-secondary-foreground py-2 px-4 mb-6 rounded-lg text-center font-bold text-sm animate-pulse">
        ONE APP FOR ALL NEEDS!
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-4 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceClick(service)}
            className="relative flex flex-col items-center justify-center bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors min-h-[120px]"
          >
            {service.badge && (
              <span className="absolute top-1 right-1 bg-secondary text-secondary-foreground text-[10px] px-2 py-0.5 rounded-full font-medium">
                {service.badge}
              </span>
            )}
            <div className="mb-2">{service.icon}</div>
            <span className="text-[11px] text-center leading-tight whitespace-pre-line">
              {service.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
