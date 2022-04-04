import { createSlice } from '@reduxjs/toolkit';
// common slice
// import { setLoading } from '../../common';

// ----------------------------------------------------------------------

export const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employeeList: [
      {
        id: 1,
        name: 'Cliente 1',
        documentNumber: '123456789',
        email: 'email@email.com',
        phone: '1234567890',
        address: 'Calle 1',
        city: 'Ciudad 1',
        state: 'Estado 1',
        country: 'Pais 1',
        zipCode: '12345'
      },
      {
        id: 2,
        name: 'Cliente 2',
        documentNumber: '123456789',
        email: 'email@email.com',
        phone: '1234567890',
        address: 'Calle 2',
        city: 'Ciudad 2',
        state: 'Estado 2',
        country: 'Pais 2',
        zipCode: '12345'
      }
    ],
    errors: []
  },
  reducers: {
    setEmployeeList(state, action) {
      state.employeeList = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    }
  }
});

export const { setEmployeeList, setErrors } = employeeSlice.actions;

export default employeeSlice.reducer;

// ----------------------------------------------------------------------

export const fetchEmployees = () => (dispatch) => {
  dispatch(setEmployeeList([]));
};

export const createEmployee = (employee) => (dispatch, getState) => {
  // dispatch(setLoading(true));
  dispatch(
    setEmployeeList([...getState().persons.employees.employeeList, employee])
  );
};

export const updateEmployee = (employee) => (dispatch, getState) => {
  const employeeList = getState().persons.employees.employeeList.map((item) => {
    if (item.id === employee.id) {
      return employee;
    }
    return item;
  });
  dispatch(setEmployeeList(employeeList));
};
