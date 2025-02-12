
import { Activity, Users, Bus, CreditCard } from "lucide-react";

const Index = () => {
  const stats = [
    {
      title: "Total Bookings",
      value: "1,234",
      change: "+12.3%",
      icon: Activity,
    },
    {
      title: "Active Users",
      value: "567",
      change: "+5.6%",
      icon: Users,
    },
    {
      title: "Fleet Size",
      value: "89",
      change: "+2.3%",
      icon: Bus,
    },
    {
      title: "Revenue",
      value: "$12.4k",
      change: "+8.9%",
      icon: CreditCard,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back! Here's what's happening with your bus company.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {item.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {item.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Bookings
            </h2>
            <div className="border-t border-gray-200">
              <div className="py-4 text-sm text-gray-500 text-center">
                No recent bookings to display
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
