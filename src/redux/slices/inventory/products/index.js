import { createSlice } from '@reduxjs/toolkit';
// common slice
// import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    productList: [
      {
        id: 1,
        name: 'Producto 1',
        amount: 10,
        unit: 1,
        brand: 'Marca 1',
        description: 'Descripción 1',
        code: 'Referencia 1',
        purchasePrice: 100,
        salePrice: 200,
        category: 1
      },
      {
        id: 2,
        name: 'Producto 2',
        amount: 20,
        unit: 2,
        brand: 'Marca 2',
        description: 'Descripción 2',
        purchasePrice: 300,
        salePrice: 400,
        category: 2
      },
      {
        id: 3,
        name: 'Producto 3',
        amount: 30,
        unit: 3,
        brand: 'Marca 3',
        description: 'Descripción 3',
        purchasePrice: 500,
        salePrice: 600,
        category: 3
      }
    ],
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

export const fetchProducts = () => (dispatch) => {
  dispatch(setProductList([]));
};

export const createProduct = (product) => (dispatch, getState) => {
  // dispatch(setLoading(true));
  dispatch(
    setProductList([...getState().inventory.products.productList, product])
  );
};

export const updateProduct = (product) => (dispatch, getState) => {
  const productList = getState().inventory.products.productList.map((item) => {
    if (item.id === product.id) {
      return product;
    }
    return item;
  });
  dispatch(setProductList(productList));
};
