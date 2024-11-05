import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <button>Logout</button>
    </nav>
  );
};

export default Navbar;
