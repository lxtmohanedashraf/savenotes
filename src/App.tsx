import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NoteEditor from './pages/NoteEditor';
import Navbar from './components/Navbar';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar/>
      <Outlet />
    </>
  ),
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Home/>
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <Login/>
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: () => <Register/>
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => <Profile/>
})

const noteEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notes/$noteId',
  component: () => <NoteEditor/>
})

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, profileRoute, noteEditorRoute, registerRoute])

const router = createRouter({ routeTree, defaultPreload: 'intent' })


const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
