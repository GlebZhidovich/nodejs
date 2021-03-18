const { nanoid } = require('nanoid');
const { isProject } = require('./validator');
const projectService = require('./projects.service');
const { fromMapToArray, responseWithData } = require('./helpers');
const { errorHandleWrap, sendBadRequest, sendNotFound } = require('./error');

const router = {
  postMethod: errorHandleWrap(({ res, body }) => {
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
    responseWithData({ res, data: projects, code: 200 })
  }),
  getMethodId: errorHandleWrap(async ({ res, id }) => {
    const project = projectService.getById(id);
    if (project) {
      responseWithData({res, data: project, code: 200});
      return;
    }
    sendNotFound(res);
  }),
  putMethodId: errorHandleWrap(async ({ res, id, body }) => {
    if (isProject(body) && projectService.update(id, body)) {
      res.end('update');
      return;
    }
    sendNotFound(res);
  }),
  deleteMethodId: errorHandleWrap(async ({ res, id, body }) => {

  })
}

module.exports = router;