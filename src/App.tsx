import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NoteEditor from "./pages/NoteEditor";
import Navbar from "./components/Navbar";
import AuthGuard from "./components/AuthGuard";
import { useThemeStore } from "./store/useThemeStore";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <div className="bg-background">
      <Navbar />
      <Outlet />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <AuthGuard>
      <Login />
    </AuthGuard>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <AuthGuard>
      <Register />
    </AuthGuard>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => <Profile />,
});

const noteEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notes/$noteId",
  component: () => <NoteEditor />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  profileRoute,
  noteEditorRoute,
  registerRoute,
]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

const App = () => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme === "dark" ? "dark" : "light"}>
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
