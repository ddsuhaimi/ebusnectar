
import { UserProfile } from "@/types";
import { useState } from "react";
import { UserCircle, Phone, Mail, Building2 } from "lucide-react";

const Profile = () => {
  // Mock user profile data
  const [profile] = useState<UserProfile>({
    id: "1",
    name: "John Doe",
    email: "john.doe@ebusid.com",
    role: "Company Admin",
    company: "TransJakarta Express",
    phoneNumber: "+62 812-3456-7890",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your account information and preferences
        </p>

        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserCircle className="h-20 w-20 text-accent" />
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-sm text-gray-500">{profile.role}</p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="text-sm text-gray-900">{profile.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Building2 className="h-5 w-5 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p className="text-sm text-gray-900">{profile.company}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
