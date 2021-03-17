const db = require('./db');

const create = (user) => db.create(user);

module.exports = {
  create,
}