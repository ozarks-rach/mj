import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { propertyAPI, offerAPI } from '../api/axios'
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaStar } from 'react-icons/fa'

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showOfferForm, setShowOfferForm] = useState(false)
  const [offerPrice, setOfferPrice] = useState('')
  const [offerMessage, setOfferMessage] = useState('')

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyAPI.getById(id!)
        setProperty(response.data.data)
        if (response.data.data.images.length > 0) {
          setSelectedImage(0)
        }
      } catch (error) {
        console.error('Error fetching property:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  const handleMakeOffer = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await offerAPI.create({
        propertyId: id,
        offerPrice: Number(offerPrice),
        message: offerMessage
      })
      setShowOfferForm(false)
      setOfferPrice('')
      setOfferMessage('')
      alert('Offer submitted successfully!')
    } catch (error) {
      console.error('Error submitting offer:', error)
      alert('Failed to submit offer')
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!property) return <div className="text-center py-12">Property not found</div>

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {property.images && property.images.length > 0 ? (
            <>
              <div className="relative h-96 bg-gray-300">
                <img
                  src={property.images[selectedImage]}
                  alt={`Property ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {property.images.length > 1 && (
                <div className="grid grid-cols-6 gap-2 p-4">
                  {property.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-24 rounded overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-300'
                      }`}
                    >
                      <img src={image} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-96 bg-gray-300 flex items-center justify-center text-gray-500">
              No images available
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <FaMapMarkerAlt /> {property.address}, {property.city}
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-8">${property.price.toLocaleString()}</div>

              {/* Property Features */}
              <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-200">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaBed size={24} className="text-blue-500" />
                  </div>
                  <div className="font-bold text-lg">{property.bedrooms}</div>
                  <div className="text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaBath size={24} className="text-blue-500" />
                  </div>
                  <div className="font-bold text-lg">{property.bathrooms}</div>
                  <div className="text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaRuler size={24} className="text-blue-500" />
                  </div>
                  <div className="font-bold text-lg">{property.area}</div>
                  <div className="text-gray-600">sqft</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">About this property</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-gray-600">Highly rated seller</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mb-3">
                Contact Seller
              </button>

              <button
                onClick={() => setShowOfferForm(!showOfferForm)}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Make an Offer
              </button>

              {showOfferForm && (
                <form onSubmit={handleMakeOffer} className="mt-6 space-y-4 border-t pt-6">
                  <input
                    type="number"
                    placeholder="Your offer price"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <textarea
                    placeholder="Add a message (optional)"
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Submit Offer
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
