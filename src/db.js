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

const update = (id, user) => {
  const hasProject = projects.has(id);
  if (hasProject) {
    projects.delete(id);
    projects.set(id, user);
  }
  return hasProject;
}

const remove = (id) => {
  const hasProject = projects.has(id);
  if (hasProject) {
    projects.delete(id);
  }
  return hasProject;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
}
