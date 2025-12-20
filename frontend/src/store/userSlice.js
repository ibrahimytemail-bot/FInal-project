import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user : null,
    isLoading: true
}
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserDetails : (state,action)=>{
        state.user = action.payload
        state.isLoading = false
      },
      setUserLoading : (state, action) => {
        state.isLoading = action.payload
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setUserDetails, setUserLoading } = userSlice.actions
  
  export default userSlice.reducer