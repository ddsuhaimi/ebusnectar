import { useState } from "react";
import { Search, Download } from "lucide-react";
import type { Booking, ScheduledTrip } from "@/types";
import { ScheduledTrips } from "@/components/bookings/ScheduledTrips";
import { BookingsTable } from "@/components/bookings/BookingsTable";
import { TripDetailsDialog } from "@/components/bookings/TripDetailsDialog";
import { BookingDetailsDialog } from "@/components/bookings/BookingDetailsDialog";
import { StatusChangeDialog } from "@/components/bookings/StatusChangeDialog";

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState<ScheduledTrip | null>(null);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showStatusChange, setShowStatusChange] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [newStatus, setNewStatus] = useState<"completed" | "pending" | "cancelled">("pending");
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  const [bookingsData, setBookingsData] = useState<Booking[]>([
    {
      id: "1",
      passengerName: "Sarah Johnson",
      phoneNumber: "+62812345678",
      route: "Jakarta - Bandung",
      date: "2024-02-20",
      status: "completed",
      amount: 150000,
      seatNumber: "12A",
    },
    {
      id: "2",
      passengerName: "Michael Chen",
      phoneNumber: "+62823456789",
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

  const handleExportTrip = (trip: ScheduledTrip) => {
    const tripData = {
      ...trip,
      passengers: getTripBookings(trip.id)
    };
    
    const dataStr = JSON.stringify(tripData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `trip-${trip.id}-${trip.date}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const updateBookingStatus = () => {
    if (!selectedBooking) return;
    
    console.log(`Updating booking ${selectedBooking.id} status to ${newStatus}`);
    
    setShowStatusChange(false);
  };

  const handleViewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Pemesanan</h1>
            <p className="mt-2 text-sm text-gray-600">
              Kelola dan pantau semua pemesanan penumpang
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Ekspor Data
          </button>
        </div>

        <ScheduledTrips
          todayTrips={todayTrips}
          tomorrowTrips={tomorrowTrips}
          onTripClick={handleTripClick}
          onExport={handleExportTrip}
        />

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari pemesanan..."
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
              <option value="all">Semua Status</option>
              <option value="completed">Selesai</option>
              <option value="pending">Tertunda</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>

          <BookingsTable
            bookings={filteredBookings}
            onStatusChange={handleStatusChange}
            onBookingClick={handleViewBookingDetails}
          />
        </div>

        <TripDetailsDialog
          trip={selectedTrip}
          open={showTripDetails}
          onOpenChange={setShowTripDetails}
          passengers={selectedTrip ? getTripBookings(selectedTrip.id) : []}
        />

        <BookingDetailsDialog
          booking={selectedBooking}
          open={showBookingDetails}
          onOpenChange={setShowBookingDetails}
        />

        <StatusChangeDialog
          booking={selectedBooking}
          open={showStatusChange}
          onOpenChange={setShowStatusChange}
          newStatus={newStatus}
          onStatusChange={setNewStatus}
          onConfirm={updateBookingStatus}
        />
      </div>
    </div>
  );
};

export default Bookings;
