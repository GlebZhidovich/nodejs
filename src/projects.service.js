const db = require('./db');

const create = (user) => db.create(user);
const getAll = () => db.getAll();
const getById = (id) => db.getById(id);

module.exports = {
  create,
  getAll,
  getById
}