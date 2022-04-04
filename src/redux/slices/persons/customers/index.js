import { createSlice } from '@reduxjs/toolkit';
// common slice
// import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customerList: [
      {
        id: 1,
        firstName: 'Cliente 1',
        lastName: 'Cliente 1',
        documentNumber: '123456789',
        email: 'email@email.com',
        phone: '1234567890',
        address: 'Calle 1',
        city: 'Ciudad 1',
        state: 'Estado 1',
        country: 'Pais 1',
        zipCode: '12345',
        status: 'Activo'
      },
      {
        id: 2,
        firstName: 'Cliente 2',
        lastName: 'Cliente 2',
        documentNumber: '123456789',
        email: 'email@email.com',
        phone: '1234567890',
        address: 'Calle 2',
        city: 'Ciudad 2',
        state: 'Estado 2',
        country: 'Pais 2',
        zipCode: '12345',
        status: 'Activo'
      }
    ],
    errors: []
  },
  reducers: {
    setCustomerList(state, action) {
      state.customerList = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    }
  }
});

export const { setCustomerList, setErrors } = customerSlice.actions;

export default customerSlice.reducer;

// ----------------------------------------------------------------------

export const fetchCustomers = () => (dispatch) => {
  dispatch(setCustomerList([]));
};

export const createCustomer = (customer) => (dispatch, getState) => {
  // dispatch(setLoading(true));
  dispatch(
    setCustomerList([...getState().persons.customers.customerList, customer])
  );
};

export const updateCustomer = (customer) => (dispatch, getState) => {
  const customerList = getState().persons.customers.customerList.map((item) => {
    if (item.id === customer.id) {
      return customer;
    }
    return item;
  });
  dispatch(setCustomerList(customerList));
};
