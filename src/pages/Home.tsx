import { AppHeader } from "@/components/AppHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ScanQRButton } from "@/components/ScanQRButton";
import { BottomNav } from "@/components/BottomNav";
import sponsorBanner from "@/assets/sponsor-banner.png";
import cbeLogo from "@/assets/cbe-logo.png";
import siinqeeLogo from "@/assets/siinqee-logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-background pb-32">
      <AppHeader />
      <BalanceCard />
      <ServiceGrid />
      
      {/* Sponsor Banner */}
      <div className="mx-4 my-4">
        <img src={sponsorBanner} alt="Sponsor Banner" className="w-full h-32 object-cover rounded-lg" />
      </div>

      {/* Bank Logos */}
      <div className="mx-4 my-4 flex items-center justify-center gap-6">
        <img src={cbeLogo} alt="Commercial Bank of Ethiopia" className="h-12 object-contain" />
        <img src={siinqeeLogo} alt="Siinqee Bank" className="h-12 object-contain" />
      </div>

      <ScanQRButton />
      <BottomNav />
    </div>
  );
};

export default Home;
