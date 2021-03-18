const isStringValues = (project) => {
  return Object.values(project).every(val => typeof val === 'string');
}

const isOnlyCurrentValues = (project) => {
  const values = ['name', 'description', 'startDate', 'endDate'];
  const keys = Object.keys(project);
  return keys.length === values.length && keys.every(key => values.includes(key));
}

const isProject = (project) => {
  return isStringValues(project) && isOnlyCurrentValues(project);
}

module.exports = {
  isProject
}