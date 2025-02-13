
import { Calendar } from "lucide-react";
import type { ScheduledTrip } from "@/types";
import { TripCard } from "./TripCard";

interface ScheduledTripsProps {
  todayTrips: ScheduledTrip[];
  tomorrowTrips: ScheduledTrip[];
  onTripClick: (trip: ScheduledTrip) => void;
  onExport: (trip: ScheduledTrip) => void;
}

export const ScheduledTrips = ({ 
  todayTrips, 
  tomorrowTrips, 
  onTripClick, 
  onExport 
}: ScheduledTripsProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Scheduled Trips</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Today's Trips
          </h3>
          <div className="space-y-4">
            {todayTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onTripClick={onTripClick}
                onExport={onExport}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Tomorrow's Trips
          </h3>
          <div className="space-y-4">
            {tomorrowTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onTripClick={onTripClick}
                onExport={onExport}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
