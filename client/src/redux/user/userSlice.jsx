import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: null,
    error: null,
    userdata: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state, action) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.userdata = action.payload
        },
        singInFailed: (state,action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {signInStart, signInSuccess, singInFailed} = userSlice.actions;
export default userSlice.reducer