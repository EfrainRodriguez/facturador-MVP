import React, { useState, useEffect } from 'react';
// router
import { useNavigate, useParams } from 'react-router-dom';
// material
import { Card } from '@mui/material';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProvider } from '../../../redux/slices/persons/providers';
// components
import { Page, PersonForm } from '../../../components';
// paths
import { PATH_PERSONS } from '../../../routes/paths';

const EditProvider = () => {
  const [data, setData] = useState({
    documentType: 'CC'
  });

  const { errors, providerList } = useSelector(
    (state) => state.persons.providers
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    dispatch(updateProvider(data));
    navigate(PATH_PERSONS.providers);
    enqueueSnackbar('Datos del proveedor actualizados!', {
      variant: 'success'
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const provider = providerList.find((item) => item.id == id);
    setData(provider);
  }, [providerList, id]);

  return (
    <Page
      hasBackButton
      title="Editar proveedor"
      backwardPath={PATH_PERSONS.providers}
    >
      <Card sx={{ p: 3 }}>
        <PersonForm
          data={data}
          errors={errors}
          submitButtonText="Guardar cambios"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Card>
    </Page>
  );
};

export default EditProvider;
