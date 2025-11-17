import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  sidebarOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', state.theme)
      const root = document.documentElement
      if (state.theme === 'dark') root.classList.add('dark')
      else root.classList.remove('dark')
    },
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen },
    closeSidebar: (state) => { state.sidebarOpen = false },
  },
})

export const { setTheme, toggleSidebar, closeSidebar } = uiSlice.actions
export default uiSlice.reducer