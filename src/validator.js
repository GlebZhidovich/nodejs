const isProject = (project) => {
  return Object.values(project).every(val => typeof val === 'string');
}

module.exports = {
  isProject
}