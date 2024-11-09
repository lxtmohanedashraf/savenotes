import React, { useState, useEffect } from "react";
import { Input, Button, Card } from "../components/ui";
import { updateUserProfile } from "../services/authService";
import { auth, firestore } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        let userDoc;
        try {
          const userDocRef = doc(firestore, "users", currentUser.uid);
          userDoc = await getDoc(userDocRef);
        } catch (error) {
          console.error("Error fetching document:", error);
        }

        if (userDoc?.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setAge(userData.age || "");
        }
      } else {
        console.log("No authenticated user found.");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    try {
      if (user) {
        await updateUserProfile(
          `${firstName} ${lastName}`,
          firstName,
          lastName,
          age
        );
        setStatus("Profile updated successfully!");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setStatus(`Error: ${errorMessage}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-6">
      <Card className="w-full max-w-lg p-8 shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Your Profile
        </h1>
        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full"
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full"
            />
          </div>
          <Input
            type="text"
            placeholder="Email"
            value={user.email || ""}
            disabled
            className="w-full cursor-not-allowed"
          />
          <Input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full"
          />
          {status && <p className="text-center text-green-500">{status}</p>}
          <Button type="submit" className="w-full mt-4">
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
