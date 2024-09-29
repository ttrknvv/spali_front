import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import AuthService from '../api/AuthService'
import { api } from 'api/apiSpali'
import { IUser } from 'models/IUser'

type Error = {
  errorMessage: string
}

interface AuthError {
  message: string | unknown
  code: number | unknown
}

const clear = () => {
  localStorage.removeItem('token')
}

export const register = createAsyncThunk<
  { data: any },
  { fullName: string; email: string; password: string },
  { rejectValue: any }
>('authentication/register', async ({ fullName, email, password }, { rejectWithValue }) => {
  try {
    await AuthService.register(email, password, fullName)
    return
  } catch (err) {
    const error: AxiosError<Error> = err as any
    if (!error.response) {
      throw err
    }
    const errorMessage = error.response.statusText
    const errorCode = error.response.status
    return rejectWithValue({ message: errorMessage, code: errorCode })
  }
})

export const login = createAsyncThunk<
  { data: any; permissions: any },
  { email: string; password: string },
  { rejectValue: any }
>('authentication/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(email, password)
    const { data: permissions } = await api.getPermissions(response.data.accessToken)
    return {
      data: response.data,
      permissions,
    }
  } catch (err) {
    const error: AxiosError<Error> = err as any
    if (!error.response) {
      throw err
    }
    const errorMessage = error.response.statusText
    const errorCode = error.response.status
    return rejectWithValue({ message: errorMessage, code: errorCode })
  }
})

export const logout = createAsyncThunk<{ data: any }, undefined, { rejectValue: any }>(
  'authentication/logout',
  async (data, { rejectWithValue }) => {
    try {
      await AuthService.logout()
      return
    } catch (err) {
      const error: AxiosError<Error> = err as any
      if (!error.response) {
        throw err
      }
      const errorMessage = error.response.statusText
      const errorCode = error.response.status
      return rejectWithValue({ message: errorMessage, code: errorCode })
    }
  },
)

export const checkAuth = createAsyncThunk<{ data: any; permissions: any }, undefined, { rejectValue: any }>(
  'authentication/checkAuth',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.checkAuth()
      const { data: permissions } = await api.getPermissions(response.data.accessToken)
      return {
        data: response.data,
        permissions,
      }
    } catch (err) {
      const error: AxiosError<Error> = err as any
      if (!error.response) {
        throw err
      }
      const errorMessage = error.response.statusText
      const errorCode = error.response.status
      return rejectWithValue({ message: errorMessage, code: errorCode })
    }
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {} as IUser,
    isAuth: !!localStorage.getItem('token'),
    isRegister: false,
    isLoading: false,
    authError: {} as AuthError,
    permissions: {} as Record<string, Record<string, boolean>>,
  },
  reducers: {
    handleLogout: (state) => {
      state.user = {} as IUser
      state.isAuth = false
      state.isRegister = false
      state.permissions = {}
      clear()
    },
    handleLogin: (state, action) => {
      localStorage.setItem('token', action.payload.data.accessToken)
      state.isAuth = true
      state.user = action.payload.data.currentUser
    },
    resetAuthError: (state) => {
      state.authError = {} as AuthError
    },
    updateUser: (state, action) => {
      state.user = action.payload.data
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state) => {
      state.isRegister = true
      state.isLoading = false
    }),
      builder.addCase(register.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(register.rejected, (state, action) => {
        state.authError = { message: action.payload.message, code: action.payload.code }
        state.isLoading = false
      }),
      builder.addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.data.accessToken)
        state.isAuth = true
        state.user = action.payload.data.currentUser
        state.permissions = action.payload.permissions
        state.isLoading = false
      }),
      builder.addCase(login.pending, (state) => {
        state.isLoading = true
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.authError = { message: action.payload.message, code: action.payload.code }
        state.isLoading = false
      })
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.data.accessToken)
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload.data.currentUser
      state.permissions = action.payload.permissions
    })
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false
      state.isAuth = false
      state.user = {} as IUser
      clear()
    }),
      builder.addCase(logout.pending, (state) => {
        state.isLoading = true
      })
    builder.addCase(logout.fulfilled, (state) => {
      state.user = {} as IUser
      state.isLoading = false
      state.isAuth = false
      clear()
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.authError = { message: action.payload.message, code: action.payload.code }
      state.isLoading = false
    })
  },
  selectors: {
    getPermissions: (state) => state.permissions,
    getUser: (state) => state.user,
  },
})

export const { handleLogout, resetAuthError, handleLogin, updateUser, setPermissions } = authSlice.actions

export const { getUser, getPermissions } = authSlice.selectors

export default authSlice.reducer
