const db = require('./db');

const create = (user) => db.create(user);
const getAll = () => db.getAll();
const getById = (id) => db.getById(id);
const update = (id, user) => db.update(id, user);

module.exports = {
  create,
  getAll,
  getById,
  update
}