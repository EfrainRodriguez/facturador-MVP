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
  root: ROOT_SALES,
  createSale: path(ROOT_SALES, '/crear'),
  editSale: path(ROOT_SALES, '/editar/:id'),
  editSaleRoot: path(ROOT_SALES, '/editar')
};

export const PATH_INVENTORY = {
  root: ROOT_INVENTORY,
  products: path(ROOT_INVENTORY, '/productos'),
  editProductRoot: path(ROOT_INVENTORY, '/productos/editar'),
  editProduct: path(ROOT_INVENTORY, '/productos/editar/:id'),
  createProduct: path(ROOT_INVENTORY, '/productos/crear'),
  categories: path(ROOT_INVENTORY, '/categorias'),
  editCategoryRoot: path(ROOT_INVENTORY, '/categorias/editar'),
  editCategory: path(ROOT_INVENTORY, '/categorias/editar/:id'),
  createCategory: path(ROOT_INVENTORY, '/categorias/crear'),
  units: path(ROOT_INVENTORY, '/unidades'),
  editUnitRoot: path(ROOT_INVENTORY, '/unidades/editar'),
  editUnit: path(ROOT_INVENTORY, '/unidades/editar/:id'),
  createUnit: path(ROOT_INVENTORY, '/unidades/crear')
};

export const PATH_PERSONS = {
  root: ROOT_PERSONS,
  customers: path(ROOT_PERSONS, '/clientes'),
  editCustomerRoot: path(ROOT_PERSONS, '/clientes/editar'),
  editCustomer: path(ROOT_PERSONS, '/clientes/editar/:id'),
  createCustomer: path(ROOT_PERSONS, '/clientes/crear'),
  providers: path(ROOT_PERSONS, '/poveedores'),
  editProviderRoot: path(ROOT_PERSONS, '/poveedores/editar'),
  editProvider: path(ROOT_PERSONS, '/poveedores/editar/:id'),
  createProvider: path(ROOT_PERSONS, '/poveedores/crear'),
  empolyees: path(ROOT_PERSONS, '/empleados'),
  editEmployeeRoot: path(ROOT_PERSONS, '/empleados/editar'),
  editEmployee: path(ROOT_PERSONS, '/empleados/editar/:id'),
  createEmployee: path(ROOT_PERSONS, '/empleados/crear')
};
