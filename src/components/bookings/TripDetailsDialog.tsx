
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { ScheduledTrip } from "@/types";

interface TripDetailsDialogProps {
  trip: ScheduledTrip | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  passengers: Array<{ id: string; passengerName: string; seatNumber: string; }>;
}

export const TripDetailsDialog = ({ trip, open, onOpenChange, passengers }: TripDetailsDialogProps) => {
  if (!trip) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Trip Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Route</p>
                <p className="font-medium">{trip.route.from} → {trip.route.to}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{trip.route.departureTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bus</p>
                <p className="font-medium">{trip.bus.busNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Seats</p>
                <p className="font-medium">{trip.availableSeats}</p>
              </div>
            </div>
          </div>

          <h4 className="font-medium mb-2">Passenger List</h4>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Seat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Passenger
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {passengers.map((passenger) => (
                  <tr key={passenger.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">
                      {passenger.seatNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {passenger.passengerName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
