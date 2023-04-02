const express = require('express');

const ctrl = require('../../controllers');

const { validateBody, isValidId, authenticate } = require('../../middleware');

const { schemas } = require('../../models/recipe');

const router = express.Router();

router.use(authenticate);

router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.get('/category/:alias', ctrl.getByCategory);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.patch(
  '/:id/favorites',
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  ctrl.updateFavorites
);

router.delete('/:id', isValidId, ctrl.deleteById);

module.exports = router;
