// redux toolkit
import { createSlice } from '@reduxjs/toolkit';
// jwt decode
import jwtDecode from 'jwt-decode';
// axios
import axios from '../../../utils/axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    remember: true,
    isLoading: false,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
  },
  reducers: {
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSession: (state, action) => {
      if (action.payload) {
        const { accessToken, refreshToken } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
      } else {
        state.accessToken = null;
        state.refreshToken = null;
        delete axios.defaults.headers.common['Authorization'];
      }
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutSucces: (state) => {
      state.isAuthenticated = false;
    }
  }
});

export const {
  setSession,
  setRemember,
  loginSuccess,
  logoutSucces,
  setIsLoading
} = authSlice.actions;

export default authSlice.reducer;

// -----------------------------------------------------------

export const login = (data) => (dispatch) => {
  dispatch(setIsLoading(true));

  return new Promise((resolve, reject) => {
    axios
      .post('/auth/login', data)
      .then((response) => {
        const { accessToken, refreshToken } = response.data.data;
        dispatch(loginSuccess(jwtDecode(accessToken).user));
        dispatch(setSession({ accessToken, refreshToken }));
        dispatch(setIsLoading(false));
        resolve(response);
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
        reject(error);
      });
  });
};

// -----------------------------------------------------------

export const logout = () => (dispatch, getState) => {
  const {
    auth: { refreshToken }
  } = getState();
  dispatch(logoutSucces());
  dispatch(setSession(null));
  return new Promise((resolve, reject) => {
    axios
      .post('/auth/logout', { refreshToken })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

// -----------------------------------------------------------

export const fetchRefreshToken = () => (dispatch, getState) => {
  const {
    auth: {
      refreshToken,
      user: { email, documentNumber }
    }
  } = getState();

  dispatch(setIsLoading(true));

  if (refreshToken) {
    axios
      .post('/auth/token', {
        email,
        refreshToken,
        documentNumber
      })
      .then((response) => {
        dispatch(
          setSession({
            refreshToken,
            accessToken: response.data.data.accessToken
          })
        );
        dispatch(setIsLoading(false));
      })
      .catch(() => {
        dispatch(logout());
        dispatch(setIsLoading(false));
      });
  } else {
    dispatch(logout());
  }
};

// ----------------------------------------------------

export const forgotPassword = (data) => (dispatch) => {
  const { email } = data;

  dispatch(setIsLoading(true));

  return new Promise((resolve, reject) => {
    axios
      .post('/auth/forgot-password', {
        email
      })
      .then((response) => {
        dispatch(setIsLoading(false));
        resolve(response);
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
        reject(error);
      });
  });
};

// ----------------------------------------------------

export const resetPassword = (data) => (dispatch) => {
  const { newPassword, passwordConfirm, passwordResetToken } = data;

  dispatch(setIsLoading(true));

  return new Promise((resolve, reject) => {
    axios
      .post('/auth/reset-password', {
        newPassword,
        passwordConfirm,
        passwordResetToken
      })
      .then((response) => {
        dispatch(setIsLoading(false));
        resolve(response);
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
        reject(error);
      });
  });
};

// ------------------------------------------------------

export const updatePassword = (data) => (dispatch) => {
  const { currentPassword, newPassword, passwordConfirm } = data;
  dispatch(setIsLoading(true));

  return new Promise((resolve, reject) => {
    axios
      .post('/auth/update-password', {
        currentPassword,
        newPassword,
        passwordConfirm
      })
      .then((response) => {
        dispatch(setIsLoading(false));
        resolve(response);
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
        reject(error);
      });
  });
};
