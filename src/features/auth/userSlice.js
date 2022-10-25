import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import authService from './authService';
const user = JSON.parse(localStorage.getItem('user'));  
console.log(user)
const initialState = {
    user: user ? user : null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    errorMessage: null,
    // userType: null,
}

// Register User

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user, thunkAPI)
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
   
        return await authService.logout()
   
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action.payload)

                state.isSuccess = true;
                state.isLoading = false;
                state.user = action.payload;
             
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
              })
    }
})

export const {reset} = userSlice.actions;
export default userSlice.reducer 