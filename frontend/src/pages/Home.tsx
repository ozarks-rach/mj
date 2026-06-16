const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Find Your Dream Property</h1>
          <p className="text-xl text-gray-700 mb-8">
            Buy, sell, or rent properties with confidence on MJ Marketplace
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/properties" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
              Browse Properties
            </a>
            <a href="/register?type=seller" className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition">
              List Property
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MJ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-4">🏠 Easy Listing</h3>
              <p className="text-gray-600">Upload photos, set your price, and connect with buyers instantly</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-4">💬 Direct Messaging</h3>
              <p className="text-gray-600">Communicate directly with buyers and sellers in real-time</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-4">📊 Smart Offers</h3>
              <p className="text-gray-600">Manage and negotiate offers with an intuitive dashboard</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
