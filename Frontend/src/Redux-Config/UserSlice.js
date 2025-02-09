import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "userSlice",
    initialState: {
        user: {},
        token: null,
        isLoggedIn: false
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true;
            delete state.user.password;
        },
        logOut: (state, action) => {
            state.user = {};
            state.token = null;
            state.isLoggedIn = false;
        }
    }
})

export const { login, logOut } = slice.actions;

export default slice.reducer;