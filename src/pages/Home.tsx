import { AppHeader } from "@/components/AppHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ScanQRButton } from "@/components/ScanQRButton";
import { BottomNav } from "@/components/BottomNav";

const Home = () => {
  return (
    <div className="min-h-screen bg-background pb-32">
      <AppHeader />
      <BalanceCard />
      <ServiceGrid />
      
      {/* Ad Banner - placeholder */}
      <div className="mx-4 my-4 h-24 bg-muted rounded-lg flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Ad Space</span>
      </div>

      <ScanQRButton />
      <BottomNav />
    </div>
  );
};

export default Home;
