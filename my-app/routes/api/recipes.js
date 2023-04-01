const express = require('express');

const ctrl = require('../../controllers');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.get('/category/:alias', ctrl.getByCategory);

router.post('/', ctrl.add);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
