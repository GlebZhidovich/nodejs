const projects = new Map();

const create = (user) => {
  projects.set(user.id, user);
  return user;
}

const getAll = () => {
  return projects;
}

module.exports = {
  create,
  getAll
}
