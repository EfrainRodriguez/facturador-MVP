import { createSlice } from '@reduxjs/toolkit';
// axios client
import { axiosClient } from '../../../../utils/axios';
// common slice
import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categoryList: {
      categories: [],
      total: 0,
      pageNumber: 1,
      pageSize: 10
    },
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

export const fetchCategories =
  (query = '') =>
  (dispatch) => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      axiosClient
        .get(`/categories?${query}`)
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

export const fetchCategory = (categoryId) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .get(`/categories/${categoryId}`)
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

export const createCategory = (categoryData) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .post('/categories', categoryData)
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

export const updateCategory = (categorId, categoryData) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .put(`/categories/${categorId}`, categoryData)
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

export const deleteCategory = (categoryId) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .delete(`/categories/${categoryId}`)
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

export const deleteManyCategories = (categories) => async (dispatch) => {
  dispatch(setLoading(true));
  return Promise.all(
    categories.map((category) => dispatch(deleteCategory(category._id)))
  )
    .then((response) => response)
    .catch((error) => error)
    .finally(() => {
      dispatch(setLoading(false));
    });
};
