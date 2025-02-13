
import { Download } from "lucide-react";
import type { ScheduledTrip } from "@/types";

interface TripCardProps {
  trip: ScheduledTrip;
  onTripClick: (trip: ScheduledTrip) => void;
  onExport: (trip: ScheduledTrip) => void;
}

export const TripCard = ({ trip, onTripClick, onExport }: TripCardProps) => {
  return (
    <div 
      className="border-b pb-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors relative"
    >
      <div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        onClick={() => onTripClick(trip)}
      >
        <div>
          <p className="font-medium">{trip.route.from} → {trip.route.to}</p>
          <p className="text-sm text-gray-500">
            Bus: {trip.bus.busNumber} | Time: {trip.route.departureTime}
          </p>
        </div>
        <div className="text-right mt-2 sm:mt-0">
          <p className="text-sm font-medium text-green-600">
            {trip.availableSeats} seats available
          </p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExport(trip);
        }}
        className="absolute top-3 right-3 p-2 text-gray-400 hover:text-accent"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
};
