import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { RootState } from '../store/store'
import { FaHome, FaSearch, FaEnvelope, FaUser, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold gradient-primary bg-clip-text text-transparent">
          <FaHome /> MJ
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/properties" className="flex items-center gap-1 hover:text-blue-600 transition">
            <FaSearch /> Browse
          </Link>

          {token && (
            <>
              <Link to="/messages" className="flex items-center gap-1 hover:text-blue-600 transition">
                <FaEnvelope /> Messages
              </Link>
              <Link to={user?.userType === 'seller' ? '/seller-dashboard' : '/buyer-dashboard'} className="flex items-center gap-1 hover:text-blue-600 transition">
                <FaUser /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <Link to="/login" className="text-blue-600 hover:text-blue-800 transition">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
