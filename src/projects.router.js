const { nanoid } = require('nanoid');
const { isProject } = require('./validator');
const projectService = require('./projects.service');
const { fromMapToArray } = require('./helpers');
const { errorHandleWrap, sendBadRequest } = require('./error');

const router = {
  postMethod: errorHandleWrap(({ req, res, body }) => {
    if (isProject(body)) {
      const id = nanoid();
      const project = { ...body, id }
      const { id: projectId } = projectService.create(project);
      res.statusCode = 201;
      res.end(projectId);
    } else {
      sendBadRequest(res);
    }
  }),
  getMethod: errorHandleWrap(async ({ res }) => {
    const projectsMap = projectService.getAll();
    const projects = fromMapToArray(projectsMap);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(projects));
  })
}

module.exports = router;