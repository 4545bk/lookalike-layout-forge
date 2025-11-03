import { CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TransactionSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get transaction data from navigation state or use defaults
  const transactionData = location.state || {
    transactionNumber: "CI35L2LCOZ",
    transactionTime: "2025/09/03 14:43:40",
    transactionType: "Transfer To Bank",
    transactionTo: "BETELHEM GIZAW AYANO",
    accountNumber: "1000404416198",
    bankName: "Commercial Bank of Ethiopia",
    amount: "503.00",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 rounded-full bg-success flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-success-foreground" />
          </div>
        </div>

        {/* Success Text */}
        <h1 className="text-2xl font-medium text-success mb-8">Successful</h1>

        {/* Amount */}
        <div className="text-5xl font-bold text-foreground mb-12">
          -{transactionData.amount} <span className="text-3xl text-muted-foreground">(ETB)</span>
        </div>

        {/* Transaction Details */}
        <div className="w-full space-y-4 border-t border-border pt-6">
          <div className="flex justify-between items-start py-3">
            <span className="text-muted-foreground">Transaction Number</span>
            <span className="font-medium text-right">{transactionData.transactionNumber}</span>
          </div>

          <div className="flex justify-between items-start py-3">
            <span className="text-muted-foreground">Transaction Time:</span>
            <span className="font-medium text-right">{transactionData.transactionTime}</span>
          </div>

          <div className="flex justify-between items-start py-3">
            <span className="text-muted-foreground">Transaction Type:</span>
            <span className="font-medium text-right">{transactionData.transactionType}</span>
          </div>

          <div className="flex justify-between items-start py-3">
            <span className="text-muted-foreground">Transaction To:</span>
            <span className="font-medium text-right">{transactionData.transactionTo}</span>
          </div>

          <div className="flex justify-between items-start py-3">
            <span className="text-muted-foreground">Bank Account Number:</span>
            <span className="font-medium text-right">{transactionData.accountNumber}</span>
          </div>

          <div className="flex justify-between items-start py-3">
            <span className="text-muted-foreground">Bank Name:</span>
            <span className="font-medium text-right">{transactionData.bankName}</span>
          </div>
        </div>

        {/* Ad Banner placeholder */}
        <div className="w-full mt-6 h-24 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Telebirr Ad Banner</span>
        </div>

        {/* Carousel Dots */}
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-border"></div>
          <div className="w-2 h-2 rounded-full bg-success"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
        </div>
      </div>

      {/* Finished Button */}
      <Button
        onClick={() => navigate("/")}
        className="w-full max-w-md bg-success hover:bg-success/90 text-success-foreground text-lg py-6 rounded-2xl mt-8"
      >
        Finished
      </Button>
    </div>
  );
};

export default TransactionSuccess;
