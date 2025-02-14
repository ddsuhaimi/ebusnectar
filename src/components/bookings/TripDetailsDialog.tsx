
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Download, Bus } from "lucide-react";
import type { ScheduledTrip } from "@/types";

interface TripDetailsDialogProps {
  trip: ScheduledTrip | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  passengers: Array<{ id: string; passengerName: string; phoneNumber: string; seatNumber: string; }>;
}

export const TripDetailsDialog = ({ trip, open, onOpenChange, passengers }: TripDetailsDialogProps) => {
  if (!trip) return null;

  const handleExportPassengers = () => {
    const data = {
      tripDetails: {
        route: `${trip.route.from} - ${trip.route.to}`,
        date: trip.date,
        departureTime: trip.route.departureTime,
        bus: trip.bus.busNumber,
      },
      passengers: passengers,
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `penumpang-${trip.id}-${trip.date}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const availabilityPercentage = (trip.bus.capacity - trip.availableSeats) / trip.bus.capacity * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detail Perjalanan</DialogTitle>
          <DialogDescription>
            Informasi perjalanan dan daftar penumpang
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Rute</p>
                <p className="font-medium">{trip.route.from} → {trip.route.to}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Waktu</p>
                <p className="font-medium">{trip.route.departureTime}</p>
              </div>
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Bus</p>
                  <p className="font-medium">{trip.bus.busNumber}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kapasitas Kursi</p>
                <div className="mt-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          availabilityPercentage > 80 ? "bg-red-500" :
                          availabilityPercentage > 50 ? "bg-yellow-500" :
                          "bg-green-500"
                        )}
                        style={{ width: `${availabilityPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {trip.availableSeats} tersedia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Daftar Penumpang</h4>
            <button
              onClick={handleExportPassengers}
              className="flex items-center gap-2 px-3 py-1 text-sm text-accent hover:text-accent-hover"
            >
              <Download className="w-4 h-4" />
              Ekspor
            </button>
          </div>
          
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Kursi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nama Penumpang
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    No. Telepon
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {passenger.phoneNumber}
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
