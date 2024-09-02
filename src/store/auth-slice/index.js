import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null

}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // state.user = action.payload
    },

    // login(state) {
    //   state.isAuthenticated = true
    // },
    // logout(state) {
    //   state.isAuthenticated = false
    // }
  }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer