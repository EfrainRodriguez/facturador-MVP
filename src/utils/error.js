export const getErrorMessage = (field, errors) => {
  const error =
    errors && Array.isArray(errors)
      ? errors.find((item) => item.field === field)
      : null;
  return error ? error.message : null;
};

export const clearError = (field, errors) =>
  errors && Array.isArray(errors)
    ? errors.filter((item) => item.field !== field)
    : null;
