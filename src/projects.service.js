const db = require('./db');

const create = (user) => db.create(user);
const getAll = () => db.getAll();

module.exports = {
  create,
  getAll
}