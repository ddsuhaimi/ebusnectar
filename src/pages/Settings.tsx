
import { Bell, Globe, CreditCard, Shield } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [language, setLanguage] = useState("en");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold text-gray-900">Pengaturan</h1>
        <p className="mt-2 text-sm text-gray-600">
          Kelola preferensi aplikasi dan pengaturan akun Anda
        </p>

        <div className="mt-8 space-y-6">
          {/* Notifications Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-accent" />
              <h2 className="ml-3 text-lg font-medium text-gray-900">Notifikasi</h2>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Notifikasi Email</span>
                <button
                  onClick={() =>
                    setNotifications({ ...notifications, email: !notifications.email })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.email ? "bg-accent" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.email ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Notifikasi SMS</span>
                <button
                  onClick={() =>
                    setNotifications({ ...notifications, sms: !notifications.sms })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.sms ? "bg-accent" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.sms ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <Globe className="h-6 w-6 text-accent" />
              <h2 className="ml-3 text-lg font-medium text-gray-900">Bahasa</h2>
            </div>
            <div className="mt-6">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent rounded-md"
              >
                <option value="en">Bahasa Inggris</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 text-accent" />
              <h2 className="ml-3 text-lg font-medium text-gray-900">Metode Pembayaran</h2>
            </div>
            <div className="mt-6">
              <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
                Tambah Metode Pembayaran
              </button>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-accent" />
              <h2 className="ml-3 text-lg font-medium text-gray-900">Keamanan</h2>
            </div>
            <div className="mt-6 space-y-4">
              <button className="block text-sm text-accent hover:text-accent-hover">
                Ubah Kata Sandi
              </button>
              <button className="block text-sm text-accent hover:text-accent-hover">
                Autentikasi Dua Faktor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
