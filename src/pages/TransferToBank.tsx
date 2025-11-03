import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransferToBank = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipientName: "BETELHEM GIZAW AYANO",
    accountNumber: "1000404416198",
    bankName: "Commercial Bank of Ethiopia",
    amount: "503.00",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate transaction details
    const transactionData = {
      transactionNumber: "CI35L2LCOZ",
      transactionTime: "2025/09/03 14:43:40",
      transactionType: "Transfer To Bank",
      transactionTo: formData.recipientName,
      accountNumber: formData.accountNumber,
      bankName: formData.bankName,
      amount: formData.amount,
    };

    // Navigate to success page with data
    navigate("/transaction-success", { state: transactionData });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/")} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <Landmark className="w-8 h-8" />
          <h1 className="text-xl font-semibold">Transfer to Bank</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6 pb-24">
        {/* Bank Name */}
        <div className="space-y-2">
          <Label htmlFor="bankName" className="text-base font-medium">
            Bank Name
          </Label>
          <Select
            value={formData.bankName}
            onValueChange={(value) => setFormData({ ...formData, bankName: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Commercial Bank of Ethiopia">
                Commercial Bank of Ethiopia
              </SelectItem>
              <SelectItem value="Awash Bank">Awash Bank</SelectItem>
              <SelectItem value="Dashen Bank">Dashen Bank</SelectItem>
              <SelectItem value="Bank of Abyssinia">Bank of Abyssinia</SelectItem>
              <SelectItem value="Wegagen Bank">Wegagen Bank</SelectItem>
              <SelectItem value="United Bank">United Bank</SelectItem>
              <SelectItem value="Nib International Bank">Nib International Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <Label htmlFor="accountNumber" className="text-base font-medium">
            Bank Account Number
          </Label>
          <Input
            id="accountNumber"
            type="text"
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            className="h-12 text-base"
            placeholder="Enter account number"
            required
          />
        </div>

        {/* Recipient Name */}
        <div className="space-y-2">
          <Label htmlFor="recipientName" className="text-base font-medium">
            Recipient Name
          </Label>
          <Input
            id="recipientName"
            type="text"
            value={formData.recipientName}
            onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
            className="h-12 text-base"
            placeholder="Enter recipient name"
            required
          />
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-base font-medium">
            Amount (ETB)
          </Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="h-12 text-base"
            placeholder="0.00"
            required
          />
        </div>

        {/* Balance Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Available Balance</span>
            <span className="text-lg font-semibold">******</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Transaction Fee</span>
            <span className="text-base font-medium">0.00 ETB</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
        >
          Transfer
        </Button>

        {/* Info Text */}
        <p className="text-sm text-muted-foreground text-center">
          Please verify all details before confirming the transfer. Transaction cannot be reversed once completed.
        </p>
      </form>
    </div>
  );
};

export default TransferToBank;
