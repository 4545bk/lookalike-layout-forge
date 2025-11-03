import { QrCode } from "lucide-react";

export const ScanQRButton = () => {
  return (
    <div className="fixed bottom-24 left-0 right-0 px-4 z-40">
      <button className="w-full bg-accent text-accent-foreground py-4 rounded-2xl shadow-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-3 text-lg font-semibold">
        <QrCode className="w-7 h-7" />
        <span>Scan QR</span>
      </button>
    </div>
  );
};
