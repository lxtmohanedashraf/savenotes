import {
  Button,
  Avatar,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  AvatarImage,
  AvatarFallback,
} from "./ui";
import { useRouter } from "@tanstack/react-router";
import { auth } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { LogOut, User, Sun, Moon } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setIsAuthenticated(false);
    router.navigate({ to: "/login" });
  };

  return (
    <header className="bg-background text-foreground shadow-sm shadow-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-2xl font-extrabold cursor-pointer text-primary hover:text-secondary transition-colors"
          onClick={() => router.navigate({ to: "/" })}
        >
          Savenotes
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={toggleTheme} className="p-2 rounded-md bg-secondary">
            {theme === "dark" ? (
              <Sun className="text-yellow-500" />
            ) : (
              <Moon className="text-gray-500" />
            )}
          </Button>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    className="cursor-pointer border border-secondary"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-popover text-foreground"
              >
                <DropdownMenuItem
                  onSelect={() => router.navigate({ to: "/profile" })}
                >
                  <User className="mr-2 text-muted-foreground" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut className="mr-2 text-muted-foreground" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.navigate({ to: "/login" })}
                className="border-secondary text-primary hover:bg-secondary hover:text-secondary-foreground"
              >
                Login
              </Button>
              <Button
                onClick={() => router.navigate({ to: "/register" })}
                className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
