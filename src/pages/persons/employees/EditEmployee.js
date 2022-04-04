import React, { useState, useEffect } from 'react';
// router
import { useNavigate, useParams } from 'react-router-dom';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '../../../redux/slices/persons/employees';
// components
import { Page, PersonForm } from '../../../components';
// paths
import { PATH_PERSONS } from '../../../routes/paths';

const EditEmployee = () => {
  const [data, setData] = useState({
    documentType: 'CC'
  });

  const { errors, employeeList } = useSelector(
    (state) => state.persons.employees
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(updateEmployee(data));
    navigate(PATH_PERSONS.empolyees);
    enqueueSnackbar('Datos del empleado actualizados!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const employee = employeeList.find((item) => item.id == id);
    setData(employee);
  }, [employeeList, id]);

  return (
    <Page
      hasBackButton
      title="Editar empleado"
      backwardPath={PATH_PERSONS.empolyees}
    >
      <PersonForm
        data={data}
        errors={errors}
        submitButtonText="Guardar cambios"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Page>
  );
};

export default EditEmployee;
