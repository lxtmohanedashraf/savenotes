import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        router.navigate({ to: "/" });
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isAuthenticated === null) {
    return null;
  }

  return <>{!isAuthenticated && children}</>;
};

export default AuthGuard;
