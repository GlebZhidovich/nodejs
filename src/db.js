const projects = new Map();

const create = (user) => {
  projects.set(user.id, user);
  return user;
}

const getAll = () => {
  return projects;
}

const getById = (id) => {
  return projects.get(id);
}

module.exports = {
  create,
  getAll,
  getById
}
