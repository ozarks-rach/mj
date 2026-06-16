const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 mb-2">Active Listings</div>
            <div className="text-3xl font-bold">5</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 mb-2">Total Views</div>
            <div className="text-3xl font-bold">1,250</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 mb-2">Pending Offers</div>
            <div className="text-3xl font-bold">3</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
          <div className="text-gray-500">Your property listings will appear here</div>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard
