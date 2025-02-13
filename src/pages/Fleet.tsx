
import type { Fleet as FleetType } from "@/types";
import { Plus, Search, Bus, MapPin } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Fleet = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddBus, setShowAddBus] = useState(false);
  const [showAssignRoute, setShowAssignRoute] = useState(false);
  const [selectedBus, setSelectedBus] = useState<FleetType | null>(null);
  const [newBus, setNewBus] = useState({
    busNumber: "",
    model: "",
    capacity: "",
  });

  // Mock fleet data
  const fleetData: FleetType[] = [
    {
      id: "1",
      busNumber: "BUS-001",
      model: "Mercedes-Benz OH 1526",
      capacity: 45,
      status: "active",
      lastService: "2024-02-15",
      assignedRoutes: ["Jakarta - Bandung"],
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

  const handleAddBus = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding new bus:", newBus);
    setShowAddBus(false);
    setNewBus({ busNumber: "", model: "", capacity: "" });
  };

  const handleAssignRoute = (bus: FleetType) => {
    setSelectedBus(bus);
    setShowAssignRoute(true);
  };

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
          <button
            onClick={() => setShowAddBus(true)}
            className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
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
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Bus className="w-8 h-8 text-accent" />
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">{bus.busNumber}</h3>
                      <p className="text-sm text-gray-500">{bus.model}</p>
                    </div>
                  </div>
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

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Capacity:</span>
                      <span className="text-gray-900">{bus.capacity} seats</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last Service:</span>
                      <span className="text-gray-900">{bus.lastService}</span>
                    </div>
                  </div>

                  {bus.assignedRoutes && bus.assignedRoutes.length > 0 && (
                    <div className="text-sm text-gray-500">
                      <div className="font-medium mb-2">Assigned Routes:</div>
                      {bus.assignedRoutes.map((route, index) => (
                        <div key={index} className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {route}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleAssignRoute(bus)}
                  className="mt-4 w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
                >
                  Assign Route
                </button>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={showAddBus} onOpenChange={setShowAddBus}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bus</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddBus} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bus Number
                </label>
                <input
                  type="text"
                  value={newBus.busNumber}
                  onChange={(e) =>
                    setNewBus({ ...newBus, busNumber: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Model
                </label>
                <input
                  type="text"
                  value={newBus.model}
                  onChange={(e) =>
                    setNewBus({ ...newBus, model: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  value={newBus.capacity}
                  onChange={(e) =>
                    setNewBus({ ...newBus, capacity: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddBus(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-md"
                >
                  Add Bus
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showAssignRoute} onOpenChange={setShowAssignRoute}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Assign Route to {selectedBus?.busNumber}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <select className="block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option value="">Select a route</option>
                <option value="jakarta-bandung">Jakarta - Bandung</option>
                <option value="jakarta-semarang">Jakarta - Semarang</option>
                <option value="surabaya-malang">Surabaya - Malang</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAssignRoute(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-md">
                  Assign Route
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Fleet;
