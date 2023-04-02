const express = require('express');

const ctrl = require('../../controllers');

const { validateBody } = require('../../middleware');

const schemas = require('../../schemas');

const router = express.Router();

router.get('/', ctrl.getAll);

// router.get('/:id', ctrl.getById);

// router.get('/category/:alias', ctrl.getByCategory);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

// router.delete('/:id', ctrl.deleteById);

module.exports = router;
