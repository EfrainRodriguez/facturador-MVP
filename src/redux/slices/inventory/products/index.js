import { createSlice } from '@reduxjs/toolkit';
// axios client
import { axiosClient } from '../../../../utils/axios';
// common slice
import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    productList: {
      products: [],
      total: 0,
      pageNumber: 1,
      pageSize: 10
    },
    errors: []
  },
  reducers: {
    setProductList(state, action) {
      state.productList = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    }
  }
});

export const { setProductList, setErrors } = productSlice.actions;

export default productSlice.reducer;

// ----------------------------------------------------------------------

export const fetchProducts =
  (query = '') =>
  (dispatch) => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      axiosClient
        .get(`/products?${query}`)
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

export const fetchProduct = (id) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .get(`/products/${id}`)
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

export const createProduct = (product) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .post('/products', product)
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

export const updateProduct = (product) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .put(`/products/${product.id}`, product)
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

export const deleteProduct = (productId) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .delete(`/products/${productId}`)
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

export const deleteManyProducts = (products) => async (dispatch) => {
  dispatch(setLoading(true));
  return Promise.all(
    products.map((product) => dispatch(deleteProduct(product._id)))
  )
    .then((response) => response)
    .catch((error) => error)
    .finally(() => {
      dispatch(setLoading(false));
    });
};
