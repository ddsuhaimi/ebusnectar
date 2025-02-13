
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Booking } from "@/types";

interface BookingDetailsDialogProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingDetailsDialog = ({ booking, open, onOpenChange }: BookingDetailsDialogProps) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Passenger Name</label>
              <p className="font-medium">{booking.passengerName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Route</label>
              <p className="font-medium">{booking.route}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Date</label>
              <p className="font-medium">{booking.date}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Seat Number</label>
              <p className="font-medium">{booking.seatNumber}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <p className={cn(
                "inline-flex px-2 py-1 rounded-full text-sm font-medium",
                {
                  "bg-green-100 text-green-800": booking.status === "completed",
                  "bg-yellow-100 text-yellow-800": booking.status === "pending",
                  "bg-red-100 text-red-800": booking.status === "cancelled"
                }
              )}>
                {booking.status}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Amount</label>
              <p className="font-medium">Rp {booking.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
