import { Eye } from "lucide-react";

export const BalanceCard = () => {
  return (
    <div className="relative bg-primary text-primary-foreground px-4 py-6">
      {/* Wavy background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M0,50 Q25,30 50,50 T100,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave)" />
        </svg>
      </div>

      <div className="relative">
        {/* Main Balance */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg opacity-90">Balance (ETB)</span>
            <button className="p-1">
              <Eye className="w-5 h-5" />
            </button>
          </div>
          <div className="text-4xl font-bold tracking-wider">******</div>
        </div>

        {/* Secondary Balances */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-sm opacity-90">Endekise (ETB)</span>
              <button className="p-1">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xl font-bold tracking-wider">******</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-sm opacity-90">Reward (ETB)</span>
              <button className="p-1">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xl font-bold tracking-wider">******</div>
          </div>
        </div>
      </div>
    </div>
  );
};
