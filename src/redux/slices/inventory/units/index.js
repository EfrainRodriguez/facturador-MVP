import { createSlice } from '@reduxjs/toolkit';
// axios client
import { axiosClient } from '../../../../utils/axios';
// common slice
import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const unitSlice = createSlice({
  name: 'units',
  initialState: {
    unitList: {
      units: [],
      total: 0,
      pageNumber: 1,
      pageSize: 10
    },
    errors: []
  },
  reducers: {
    setUnitList(state, action) {
      state.unitList = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    }
  }
});

export const { setUnitList, setErrors } = unitSlice.actions;

export default unitSlice.reducer;

// ----------------------------------------------------------------------

export const fetchUnits = () => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .get('/units')
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

export const fetchUnit = (unitId) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .get(`/units/${unitId}`)
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

export const createUnits = (unitData) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .post('/units', unitData)
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

export const updateUnit = (unitId, unitData) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .put(`/units/${unitId}`, unitData)
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

export const deleteUnit = (unitId) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    axiosClient
      .delete(`/units/${unitId}`)
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

export const deleteManyUnits = (units) => async (dispatch) => {
  dispatch(setLoading(true));
  return Promise.all(units.map((unit) => dispatch(deleteUnit(unit._id))))
    .then((response) => response)
    .catch((error) => error)
    .finally(() => {
      dispatch(setLoading(false));
    });
};
