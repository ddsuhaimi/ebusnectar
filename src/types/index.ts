export interface Booking {
  id: string;
  passengerName: string;
  phoneNumber: string;
  route: string;
  date: string;
  status: "completed" | "pending" | "cancelled";
  amount: number;
  seatNumber?: string;
}

export interface Fleet {
  id: string;
  busNumber: string;
  model: string;
  capacity: number;
  status: "active" | "maintenance" | "inactive";
  lastService: string;
  assignedRoutes?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  phoneNumber: string;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  duration: string;
  price: number;
  departureTime: string;
  status: "active" | "inactive";
}

export interface ScheduledTrip {
  id: string;
  route: Route;
  bus: Fleet;
  date: string;
  availableSeats: number;
}
