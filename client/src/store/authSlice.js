import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    error: null
}

export const login = createAsyncThunk("/login", async (userData, { rejectWithValue }) => {
    try {
        console.log(userData);
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log("Data received fromserver=", data)
        if (!response.ok) throw new Error(data.message || "Login Failed")
        localStorage.setItem("token", data.token)
        return data
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const signup = createAsyncThunk("/signup", async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Signup Failed")
        return data
    } catch (error) {
        return rejectWithValue(error.message);
    }
});



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("Login successful, token received:", action.payload.token);
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer