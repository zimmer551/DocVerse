import{ createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state, actions) => {
            state.loading = true;
        },
        hideLoading: (state, actions) => {
            state.loading = false;  
        }
    }
})

export const {showLoading, hideLoading} = alertSlice.actions;