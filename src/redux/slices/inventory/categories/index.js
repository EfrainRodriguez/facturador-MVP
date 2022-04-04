import { createSlice } from '@reduxjs/toolkit';
// common slice
// import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categoryList: [
      {
        id: 1,
        name: 'Categoria 1',
        father: 'Sin categoria',
        status: 'Activo'
      },
      {
        id: 2,
        name: 'Categoria 2',
        father: 'Categoria 1',
        status: 'Activo'
      }
    ],
    errors: []
  },
  reducers: {
    setCategoryList(state, action) {
      state.categoryList = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    }
  }
});

export const { setCategoryList, setErrors } = categorySlice.actions;

export default categorySlice.reducer;

// ----------------------------------------------------------------------

export const fetchCategories = () => (dispatch) => {
  dispatch(setCategoryList([]));
};

export const createCategory = (category) => (dispatch, getState) => {
  // dispatch(setLoading(true));
  dispatch(
    setCategoryList([...getState().inventory.categories.categoryList, category])
  );
};

export const updateCategory = (category) => (dispatch, getState) => {
  const categoryList = getState().inventory.categories.categoryList.map(
    (item) => {
      if (item.id === category.id) {
        return category;
      }
      return item;
    }
  );
  dispatch(setCategoryList(categoryList));
};
