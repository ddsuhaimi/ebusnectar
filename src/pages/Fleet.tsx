
import { Fleet } from "@/types";
import { Plus, Search, Bus } from "lucide-react";
import { useState } from "react";

const Fleet = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock fleet data
  const fleetData: Fleet[] = [
    {
      id: "1",
      busNumber: "BUS-001",
      model: "Mercedes-Benz OH 1526",
      capacity: 45,
      status: "active",
      lastService: "2024-02-15",
    },
    {
      id: "2",
      busNumber: "BUS-002",
      model: "Volvo B11R",
      capacity: 50,
      status: "maintenance",
      lastService: "2024-01-20",
    },
    {
      id: "3",
      busNumber: "BUS-003",
      model: "Scania K410iB",
      capacity: 48,
      status: "active",
      lastService: "2024-02-01",
    },
  ];

  const filteredFleet = fleetData.filter((bus) =>
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fade-up">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Fleet Management</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your bus fleet and track maintenance schedules
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Add New Bus
          </button>
        </div>

        <div className="mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search buses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFleet.map((bus) => (
              <div
                key={bus.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <Bus className="w-8 h-8 text-accent" />
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      bus.status === "active"
                        ? "bg-green-100 text-green-800"
                        : bus.status === "maintenance"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {bus.status}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{bus.busNumber}</h3>
                <p className="text-sm text-gray-500">{bus.model}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="text-gray-900">{bus.capacity} seats</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Service:</span>
                    <span className="text-gray-900">{bus.lastService}</span>
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

export default Fleet;
