import { createSlice } from '@reduxjs/toolkit';
// common slice
// import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const unitSlice = createSlice({
  name: 'units',
  initialState: {
    unitList: [
      {
        id: 0,
        name: 'unidad',
        description: 'Unidad 1'
      },
      {
        id: 1,
        name: 'Kg',
        description: 'Unidad 1'
      },
      {
        id: 2,
        name: 'metro',
        description: 'Unidad 2'
      }
    ],
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
  dispatch(setUnitList([]));
};

export const createUnits = (unit) => (dispatch, getState) => {
  // dispatch(setLoading(true));
  dispatch(setUnitList([...getState().inventory.units.unitList, unit]));
};

export const updateUnit = (unit) => (dispatch, getState) => {
  const unitList = getState().inventory.units.unitList.map((item) => {
    if (item.id === unit.id) {
      return unit;
    }
    return item;
  });
  dispatch(setUnitList(unitList));
};
