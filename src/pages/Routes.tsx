
import { useState } from "react";
import { Plus, Search, MapPin } from "lucide-react";

interface Route {
  id: string;
  from: string;
  to: string;
  duration: string;
  price: number;
  departureTime: string;
  status: "active" | "inactive";
}

const Routes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddRoute, setShowAddRoute] = useState(false);

  // Mock routes data
  const routesData: Route[] = [
    {
      id: "1",
      from: "Jakarta",
      to: "Bandung",
      duration: "3h",
      price: 150000,
      departureTime: "08:00",
      status: "active",
    },
    {
      id: "2",
      from: "Surabaya",
      to: "Malang",
      duration: "2h",
      price: 100000,
      departureTime: "10:00",
      status: "active",
    },
  ];

  const filteredRoutes = routesData.filter(
    (route) =>
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fade-up">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Routes</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage bus routes and schedules
            </p>
          </div>
          <button
            onClick={() => setShowAddRoute(true)}
            className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Route
          </button>
        </div>

        <div className="mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search routes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <MapPin className="w-8 h-8 text-accent" />
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      route.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {route.status}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {route.from}
                    </h3>
                    <span className="text-gray-500">→</span>
                    <h3 className="text-lg font-medium text-gray-900">
                      {route.to}
                    </h3>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-gray-900">{route.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Departure:</span>
                      <span className="text-gray-900">{route.departureTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Price:</span>
                      <span className="text-gray-900">
                        Rp {route.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes;
