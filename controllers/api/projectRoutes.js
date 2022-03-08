const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const projects = await Project.findAll();
    const mappedProjects = projects.map((project) =>
      project.get({ plain: true })
    );
    res.render('homepage', {
      projectsArray: mappedProjects,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const projects = await Project.findByPk({
      where: {
        id: req.body.id,
      },
    });
    const mappedProjects = projects.map((project) =>
      project.get({ plain: true })
    );
    res.status(200).json(mappedProjects);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
