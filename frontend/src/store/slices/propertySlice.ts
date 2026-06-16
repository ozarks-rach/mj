import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Property {
  id: string
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  city: string
  images: string[]
  status: string
}

interface PropertyState {
  properties: Property[]
  selectedProperty: Property | null
  loading: boolean
  error: string | null
}

const initialState: PropertyState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null,
}

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload
    },
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload
    },
    addProperty: (state, action: PayloadAction<Property>) => {
      state.properties.push(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setProperties, setSelectedProperty, addProperty, setLoading, setError } = propertySlice.actions
export default propertySlice.reducer
