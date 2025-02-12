
export interface Booking {
  id: string;
  passengerName: string;
  route: string;
  date: string;
  status: "completed" | "pending" | "cancelled";
  amount: number;
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
