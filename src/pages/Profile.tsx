
import { UserProfile } from "@/types";
import { useState } from "react";
import { UserCircle, Phone, Mail, Building2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    name: "John Doe",
    email: "john.doe@ebusid.com",
    role: "Company Admin",
    company: "TransJakarta Express",
    phoneNumber: "+62 812-3456-7890",
  });
  const [editForm, setEditForm] = useState(profile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold text-gray-900">Profil</h1>
        <p className="mt-2 text-sm text-gray-600">
          Kelola informasi dan preferensi akun Anda
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
                  <p className="text-sm font-medium text-gray-500">Nomor Telepon</p>
                  <p className="text-sm text-gray-900">{profile.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Building2 className="h-5 w-5 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Perusahaan</p>
                  <p className="text-sm text-gray-900">{profile.company}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
              >
                Ubah Profil
              </button>
            </div>
          </div>
        </div>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ubah Profil</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                <input
                  type="tel"
                  value={editForm.phoneNumber}
                  onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Perusahaan</label>
                <input
                  type="text"
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent-hover"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
