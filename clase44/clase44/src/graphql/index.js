const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const ProductosController = require("../servicio/Contenedor/index");
const productos = new ProductosController();

const getAll = async () => {
  return productos.getAll();
};

const getProductoById = async ({ id }) => {
  return productos.getById(id);
};

const createProducto = async ({ datos: { nombre, foto, precio } }) => {
  return productos.save(nombre, precio, foto);
};

const updateProducto = async ({ id, datos: { nombre, foto, precio } }) => {
  return productos.update(id, nombre, precio, foto);
};

const deleteProducto = async ({ id }) => {
  return productos.deleteById(id);
};

const schema = buildSchema(`
    type Producto {
        id: ID!
        nombre: String,
        descripcion: String,
        foto: String,
        precio: Float,
        stock: Int
    }
  input ProductoInput {
      nombre: String,
      descripcion: String,
      foto: String,
      precio: Float,
  }
  type Query {
    getProductoById(id: ID!): Producto,
    getAll: [Producto],
  }
  type Mutation {
      createProducto(datos: ProductoInput): Producto,
      updateProducto(id: ID!, datos: ProductoInput): Producto,
      deleteProducto(id: ID!): Boolean
    }`);
const graphqlhttp = graphqlHTTP({
  schema,
  rootValue: {
    getProductoById,
    getAll,
    createProducto,
    updateProducto,
    deleteProducto,
  },
  graphiql: true,
});

module.exports = graphqlhttp;
