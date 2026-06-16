import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'
import SearchResults from './pages/SearchResults'
import SellerDashboard from './pages/SellerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Messages from './pages/Messages'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<SearchResults />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route 
              path="/seller-dashboard" 
              element={
                <PrivateRoute>
                  <SellerDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/buyer-dashboard" 
              element={
                <PrivateRoute>
                  <BuyerDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/messages" 
              element={
                <PrivateRoute>
                  <Messages />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
