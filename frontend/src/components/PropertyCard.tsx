import { FaMapMarkerAlt, FaBed, FaBath, FaRuler } from 'react-icons/fa'

interface PropertyCardProps {
  id: string
  title: string
  price: number
  image: string
  bedrooms: number
  bathrooms: number
  area: number
  city: string
  onClick: () => void
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  price,
  image,
  bedrooms,
  bathrooms,
  area,
  city,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition gradient-hover"
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          ${price.toLocaleString()}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaMapMarkerAlt size={14} />
          <span className="text-sm">{city}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaBed /> {bedrooms}
          </div>
          <div className="flex items-center gap-1">
            <FaBath /> {bathrooms}
          </div>
          <div className="flex items-center gap-1">
            <FaRuler /> {area} sqft
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
