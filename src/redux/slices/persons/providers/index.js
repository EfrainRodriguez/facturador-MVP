import { createSlice } from '@reduxjs/toolkit';
// common slice
// import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const providerSlice = createSlice({
  name: 'providers',
  initialState: {
    providerList: [
      {
        id: 1,
        name: 'Cliente 1',
        documentNumber: '123456789',
        email: 'email@email.com',
        phone: '1234567890',
        address: 'Calle 1',
        city: 'Ciudad 1',
        state: 'Estado 1',
        country: 'Pais 1',
        zipCode: '12345'
      },
      {
        id: 2,
        name: 'Cliente 2',
        documentNumber: '123456789',
        email: 'email@email.com',
        phone: '1234567890',
        address: 'Calle 2',
        city: 'Ciudad 2',
        state: 'Estado 2',
        country: 'Pais 2',
        zipCode: '12345'
      }
    ],
    errors: []
  },
  reducers: {
    setProviderList(state, action) {
      state.providerList = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    }
  }
});

export const { setProviderList, setErrors } = providerSlice.actions;

export default providerSlice.reducer;

// ----------------------------------------------------------------------

export const fetchProviders = () => (dispatch) => {
  dispatch(setProviderList([]));
};

export const createProvider = (provider) => (dispatch, getState) => {
  // dispatch(setLoading(true));
  dispatch(
    setProviderList([...getState().persons.providers.providerList, provider])
  );
};

export const updateProvider = (provider) => (dispatch, getState) => {
  const providerList = getState().persons.providers.providerList.map((item) => {
    if (item.id === provider.id) {
      return provider;
    }
    return item;
  });
  dispatch(setProviderList(providerList));
};
