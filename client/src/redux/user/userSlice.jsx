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
        },
        signOutStart: (state,action) => {
            state.loading = true;
        },
        signOutSuccess: (state,action) => {
            state.userdata = null;
            state.loading = false;
        },
        signOutFailure: (state,action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const {signInStart, signInSuccess, singInFailed, signOutStart, signOutSuccess, signOutFailure} = userSlice.actions;
export default userSlice.reducer