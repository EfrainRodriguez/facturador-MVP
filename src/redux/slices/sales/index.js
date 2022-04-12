import { createSlice } from '@reduxjs/toolkit';
// common slice
// import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const saleSlice = createSlice({
  name: 'sales',
  initialState: {
    saleList: [
      {
        id: 1,
        customer: 'Juan Perez',
        createdAt: '2020-01-01',
        total: 50000,
        paymentStatus: 'PAID',
        paymentMethod: 'Efectivo'
      },
      {
        id: 1,
        customer: 'Pepito Perez',
        createdAt: '2020-01-01',
        total: 20000,
        paymentStatus: 'PENDING',
        paymentMethod: 'Efectivo'
      },
      {
        id: 1,
        customer: 'Sultanito Perez',
        createdAt: '2020-01-01',
        total: 7000,
        paymentStatus: 'PAID',
        paymentMethod: 'Efectivo'
      }
    ],
    errors: []
  },
  reducers: {
    setSaleList(state, action) {
      state.saleList = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    }
  }
});

export const { setSaleList, setErrors } = saleSlice.actions;

export default saleSlice.reducer;

// ----------------------------------------------------------------------

export const fetchSales = () => (dispatch) => {
  dispatch(setSaleList([]));
};

export const createSale = (sale) => (dispatch, getState) => {
  // dispatch(setLoading(true));
  dispatch(setSaleList([...getState().sales.saleList, sale]));
};

export const updateSale = (sale) => (dispatch, getState) => {
  const saleList = getState().sales.saleList.map((item) => {
    if (item.id === sale.id) {
      return sale;
    }
    return item;
  });
  dispatch(setSaleList(saleList));
};
