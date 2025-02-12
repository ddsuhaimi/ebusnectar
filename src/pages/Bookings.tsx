
import { useState } from "react";
import { Search, Filter, Download, Calendar } from "lucide-react";
import type { Booking, ScheduledTrip } from "@/types";

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock bookings and scheduled trips data
  const bookingsData: Booking[] = [
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
  ];

  const scheduledTrips: ScheduledTrip[] = [
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
    // Add more scheduled trips
  ];

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const todayTrips = scheduledTrips.filter(trip => trip.date === today);
  const tomorrowTrips = scheduledTrips.filter(trip => trip.date === tomorrow);

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

        {/* Scheduled Trips Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Scheduled Trips</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Today's Trips */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Today's Trips
              </h3>
              <div className="space-y-4">
                {todayTrips.map((trip) => (
                  <div key={trip.id} className="border-b pb-4">
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

            {/* Tomorrow's Trips */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Tomorrow's Trips
              </h3>
              <div className="space-y-4">
                {tomorrowTrips.map((trip) => (
                  <div key={trip.id} className="border-b pb-4">
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

        {/* Bookings Table */}
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
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
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
      </div>
    </div>
  );
};

export default Bookings;
