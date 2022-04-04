import React, { useState, useEffect } from 'react';
// router
import { useNavigate, useParams } from 'react-router-dom';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomer } from '../../../redux/slices/persons/customers';
// components
import { Page, PersonForm } from '../../../components';
// paths
import { PATH_PERSONS } from '../../../routes/paths';

const EditCustomer = () => {
  const [data, setData] = useState({
    documentType: 'CC'
  });

  const { errors, customerList } = useSelector(
    (state) => state.persons.customers
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(updateCustomer(data));
    navigate(PATH_PERSONS.customers);
    enqueueSnackbar('Datos del cliente actualizados!', { variant: 'success' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const customer = customerList.find((item) => item.id == id);
    setData(customer);
  }, [customerList, id]);

  return (
    <Page
      hasBackButton
      title="Editar cliente"
      backwardPath={PATH_PERSONS.customers}
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

export default EditCustomer;
