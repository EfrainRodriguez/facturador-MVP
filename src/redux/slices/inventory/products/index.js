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
        purchasePrice: '$100',
        salePrice: '$200',
        category: 'Categoria 1'
      },
      {
        id: 2,
        name: 'Producto 2',
        purchasePrice: '$300',
        salePrice: '$400',
        category: 'Categoria 2'
      },
      {
        id: 3,
        name: 'Producto 3',
        purchasePrice: '$500',
        salePrice: '$600',
        category: 'Categoria 3'
      }
    ]
  },
  reducers: {
    setProductList(state, action) {
      state.productList = action.payload;
    }
  }
});

export const { setProductList } = productSlice.actions;

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

export const updateProduct = (product) => (dispatch) => {
  const productList = productSlice.state.productList.map((item) => {
    if (item.id === product.id) {
      return product;
    }
    return item;
  });
  dispatch(setProductList(productList));
};
