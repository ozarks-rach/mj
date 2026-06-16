import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Message {
  id: string
  content: string
  senderId: string
  recipientId: string
  createdAt: string
}

interface MessageState {
  messages: Message[]
  loading: boolean
  error: string | null
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setMessages, addMessage, setLoading, setError } = messageSlice.actions
export default messageSlice.reducer
