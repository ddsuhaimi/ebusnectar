
import { cn } from "@/lib/utils";
import { Bus } from "lucide-react";
import type { Booking } from "@/types";

interface BookingsTableProps {
  bookings: Booking[];
  onStatusChange: (booking: Booking) => void;
  onBookingClick: (booking: Booking) => void;
}

export const BookingsTable = ({ bookings, onStatusChange, onBookingClick }: BookingsTableProps) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Penumpang
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No. Telepon
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rute
            </th>
            <th className="hidden sm:table-cell px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal
            </th>
            <th className="hidden sm:table-cell px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kursi
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="hidden sm:table-cell px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Harga
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr 
              key={booking.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onBookingClick(booking)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.passengerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {booking.phoneNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {booking.route}
              </td>
              <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {booking.date}
              </td>
              <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">
                {booking.seatNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(booking);
                  }}
                  className={cn(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    {
                      "bg-green-100 text-green-800": booking.status === "completed",
                      "bg-yellow-100 text-yellow-800": booking.status === "pending",
                      "bg-red-100 text-red-800": booking.status === "cancelled"
                    }
                  )}
                >
                  {booking.status === "completed" ? "Selesai" :
                   booking.status === "pending" ? "Tertunda" : "Dibatalkan"}
                </button>
              </td>
              <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Rp {booking.amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
