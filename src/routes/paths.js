const path = (root, subpath) => `${root}${subpath}`;

const ROOT_AUTH = '/auth';
const ROOT_HOME = '/inicio';
const ROOT_PROFILE = '/perfil';
const ROOT_INVENTORY = '/inventario';
const ROOT_PERSONS = '/personas';
const ROOT_SALES = '/ventas';

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: path(ROOT_AUTH, '/login'),
  forgotPassword: path(ROOT_AUTH, '/forgot-password'),
  changePassword: path(ROOT_AUTH, '/reset-password/:token')
};

export const PATH_HOME = {
  root: ROOT_HOME
};

export const PATH_PROFILE = {
  root: ROOT_PROFILE
};

export const PATH_SALES = {
  root: ROOT_SALES
};

export const PATH_INVENTORY = {
  root: ROOT_INVENTORY,
  products: path(ROOT_INVENTORY, '/produtos'),
  editProductRoot: path(ROOT_INVENTORY, '/produtos/editar'),
  editProduct: path(ROOT_INVENTORY, '/produtos/editar/:id'),
  categories: path(ROOT_INVENTORY, '/categorias'),
  editCategoryRoot: path(ROOT_INVENTORY, '/categorias/editar'),
  editCategory: path(ROOT_INVENTORY, '/categorias/editar/:id'),
  stock: path(ROOT_INVENTORY, '/stock')
};

export const PATH_PERSONS = {
  root: ROOT_PERSONS,
  customers: path(ROOT_PERSONS, '/clientes'),
  editCustomerRoot: path(ROOT_PERSONS, '/clientes/editar'),
  editCustomer: path(ROOT_PERSONS, '/clientes/editar/:id'),
  createCustomerRoot: path(ROOT_PERSONS, '/clientes/crear'),
  createCustomer: path(ROOT_PERSONS, '/clientes/crear/:id'),
  providers: path(ROOT_PERSONS, '/poveedores'),
  editProviderRoot: path(ROOT_PERSONS, '/poveedores/editar'),
  editProvider: path(ROOT_PERSONS, '/poveedores/editar/:id'),
  createProviderRoot: path(ROOT_PERSONS, '/poveedores/crear'),
  createProvider: path(ROOT_PERSONS, '/poveedores/crear/:id'),
  empolyees: path(ROOT_PERSONS, '/empleados'),
  editEmployeeRoot: path(ROOT_PERSONS, '/empleados/editar'),
  editEmployee: path(ROOT_PERSONS, '/empleados/editar/:id'),
  createEmployeeRoot: path(ROOT_PERSONS, '/empleados/crear'),
  createEmployee: path(ROOT_PERSONS, '/empleados/crear/:id')
};
