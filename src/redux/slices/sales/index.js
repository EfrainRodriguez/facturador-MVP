import { createSlice } from '@reduxjs/toolkit';
// axios client
import { axiosClient } from '../../../utils/axios';
// common slice
import { setLoading } from '../common';

// ----------------------------------------------------------------------

export const saleSlice = createSlice({
  name: 'sales',
  initialState: {
    saleList: {
      sales: [],
      total: 0,
      pageNumber: 1,
      pageSize: 10
    },
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

export const fetchSales =
  (query = '') =>
  (dispatch) => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      axiosClient
        .get(`/sales?${query}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    });
  };

export const fetchSale = (saleId) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .get(`/sales/${saleId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  });
};

export const createSale = (saleData) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .post('/sales', saleData)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  });
};

export const updateSale = (saleId, saleData) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .put(`/sales/${saleId}`, saleData)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  });
};

export const deleteSale = (saleId) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .delete(`/sales/${saleId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  });
};

export const deleteManySales = (sales) => async (dispatch) => {
  dispatch(setLoading(true));
  return Promise.all(sales.map((sale) => dispatch(deleteSale(sale._id))))
    .then((response) => response)
    .catch((error) => error)
    .finally(() => {
      dispatch(setLoading(false));
    });
};
