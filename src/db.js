const projects = new Map();

const create = (user) => {
  projects.set(user.id, user);
  return 'User create';
}

module.exports = {
  create
}
