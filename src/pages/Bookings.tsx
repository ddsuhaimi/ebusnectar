import { useState } from "react";
import { Search, Filter, Download, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Booking, ScheduledTrip } from "@/types";

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState<ScheduledTrip | null>(null);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showStatusChange, setShowStatusChange] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [newStatus, setNewStatus] = useState<"completed" | "pending" | "cancelled">("pending");

  const [bookingsData, setBookingsData] = useState<Booking[]>([
    {
      id: "1",
      passengerName: "Sarah Johnson",
      route: "Jakarta - Bandung",
      date: "2024-02-20",
      status: "completed",
      amount: 150000,
      seatNumber: "12A",
    },
    {
      id: "2",
      passengerName: "Michael Chen",
      route: "Surabaya - Malang",
      date: "2024-02-21",
      status: "pending",
      amount: 100000,
      seatNumber: "15B",
    },
  ]);

  const [scheduledTrips, setScheduledTrips] = useState<ScheduledTrip[]>([
    {
      id: "1",
      route: {
        id: "1",
        from: "Jakarta",
        to: "Bandung",
        duration: "3h",
        price: 150000,
        departureTime: "08:00",
        status: "active",
      },
      bus: {
        id: "1",
        busNumber: "BUS-001",
        model: "Mercedes-Benz OH 1526",
        capacity: 45,
        status: "active",
        lastService: "2024-02-15",
      },
      date: new Date().toISOString().split("T")[0],
      availableSeats: 30,
    },
    {
      id: "2",
      route: {
        id: "2",
        from: "Jakarta",
        to: "Bandung",
        duration: "3h",
        price: 150000,
        departureTime: "10:00",
        status: "active",
      },
      bus: {
        id: "2",
        busNumber: "BUS-002",
        model: "Volvo B11R",
        capacity: 50,
        status: "active",
        lastService: "2024-02-15",
      },
      date: new Date().toISOString().split("T")[0],
      availableSeats: 25,
    },
    {
      id: "3",
      route: {
        id: "3",
        from: "Jakarta",
        to: "Bandung",
        duration: "3h",
        price: 150000,
        departureTime: "14:00",
        status: "active",
      },
      bus: {
        id: "3",
        busNumber: "BUS-003",
        model: "Scania K410iB",
        capacity: 48,
        status: "active",
        lastService: "2024-02-15",
      },
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      availableSeats: 48,
    },
  ]);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const todayTrips = scheduledTrips.filter(trip => trip.date === today);
  const tomorrowTrips = scheduledTrips.filter(trip => trip.date === tomorrow);

  const getTripBookings = (tripId: string) => {
    return [
      { id: "1", passengerName: "Sarah Johnson", seatNumber: "12A" },
      { id: "2", passengerName: "Michael Chen", seatNumber: "15B" },
      { id: "3", passengerName: "Emma Wilson", seatNumber: "03A" },
      { id: "4", passengerName: "James Brown", seatNumber: "08C" },
    ].sort((a, b) => a.seatNumber.localeCompare(b.seatNumber));
  };

  const handleTripClick = (trip: ScheduledTrip) => {
    setSelectedTrip(trip);
    setShowTripDetails(true);
  };

  const handleStatusChange = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setShowStatusChange(true);
  };

  const updateBookingStatus = () => {
    if (!selectedBooking) return;
    
    console.log(`Updating booking ${selectedBooking.id} status to ${newStatus}`);
    
    setShowStatusChange(false);
  };

  const filteredBookings = bookingsData.filter(
    (booking) =>
      (statusFilter === "all" || booking.status === statusFilter) &&
      (booking.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.route.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fade-up">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and track all passenger bookings
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Scheduled Trips</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Today's Trips
              </h3>
              <div className="space-y-4">
                {todayTrips.map((trip) => (
                  <div 
                    key={trip.id} 
                    className="border-b pb-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    onClick={() => handleTripClick(trip)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{trip.route.from} → {trip.route.to}</p>
                        <p className="text-sm text-gray-500">
                          Bus: {trip.bus.busNumber} | Time: {trip.route.departureTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          {trip.availableSeats} seats available
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Tomorrow's Trips
              </h3>
              <div className="space-y-4">
                {tomorrowTrips.map((trip) => (
                  <div 
                    key={trip.id} 
                    className="border-b pb-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    onClick={() => handleTripClick(trip)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{trip.route.from} → {trip.route.to}</p>
                        <p className="text-sm text-gray-500">
                          Bus: {trip.bus.busNumber} | Time: {trip.route.departureTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          {trip.availableSeats} seats available
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Dialog open={showTripDetails} onOpenChange={setShowTripDetails}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Trip Details</DialogTitle>
            </DialogHeader>
            {selectedTrip && (
              <div className="mt-4">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="font-medium">{selectedTrip.route.from} → {selectedTrip.route.to}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{selectedTrip.route.departureTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bus</p>
                      <p className="font-medium">{selectedTrip.bus.busNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Available Seats</p>
                      <p className="font-medium">{selectedTrip.availableSeats}</p>
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
                      {getTripBookings(selectedTrip.id).map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">
                            {booking.seatNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {booking.passengerName}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="mt-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Passenger
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seat
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.passengerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">
                      {booking.seatNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStatusChange(booking)}
                        className={cn(
                          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                          {
                            "bg-green-100 text-green-800": booking.status === "completed",
                            "bg-yellow-100 text-yellow-800": booking.status === "pending",
                            "bg-red-100 text-red-800": booking.status === "cancelled"
                          }
                        )}
                      >
                        {booking.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rp {booking.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={showStatusChange} onOpenChange={setShowStatusChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Booking Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as "completed" | "pending" | "cancelled")}
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowStatusChange(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={updateBookingStatus}
                  className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-md"
                >
                  Update Status
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Bookings;
