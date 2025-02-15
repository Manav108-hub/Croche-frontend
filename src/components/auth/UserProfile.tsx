import { useEffect, useState } from "react";
import { authApi } from "../../utils/api";
import { auth } from "../../utils/auth";
import type { User, UpdateUserDetails } from "../../types/user";

interface ProfileProps {
  userId: string;
}

export default function Profile({ userId }: ProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserDetails>({
    address: "",
    city: "",
    pincode: 0,
    country: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await authApi.getUserById(userId);
        setUser(userData);
        if (userData.userDetails) {
          setFormData(userData.userDetails);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pincode" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.updateUserDetails(formData);
      const updatedUser = await authApi.getUserById(userId);
      setUser(updatedUser);
      auth.updateUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update details");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {!user.userDetails && !isEditing ? (
          <div className="text-center py-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Add Details
            </button>
          </div>
        ) : isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields same as before */}
            {/* ... */}
          </form>
        ) : (
          <div className="space-y-4 border-t pt-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="text-pink-500 hover:text-pink-600"
              >
                Edit Details
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📍</span>
                <span>{user.userDetails?.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl">🏢</span>
                <span>{user.userDetails?.city}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl">🌍</span>
                <span>{user.userDetails?.country}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl">📞</span>
                <span>{user.userDetails?.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl">📮</span>
                <span>{user.userDetails?.pincode}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}