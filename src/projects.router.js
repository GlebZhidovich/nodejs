const { nanoid } = require('nanoid');
const { isProject } = require('./validator');
const { getBody } = require('./helpers');
const projectService = require('./projects.service');

const router = {
    async postMethod(req, res) {
        console.log('post');
        const body = await getBody(req);
        // console.log(isProject(body))
        // if (isProject(body)) {
        //     // projectService.create()
        // }
            const id = nanoid();
            res.statusCode = 201;
            res.end(id);

    },
    async getMethod() {

    }
}

module.exports = router;