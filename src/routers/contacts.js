const express = require('express');
const router = express.Router();
const {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  deleteContactByIdController,
} = require('../controllers/contacts');
const ctrlWrapper = require('../routers/ctrlWrapper');
const validateBody = require('../middlewares/validateBody');
const {
  createContactSchema,
  updateContactSchema,
} = require('../validation/contactValidation');

// Роут для отримання всіх контактів з пагінацією, сортуванням та фільтрацією
router.get('/', ctrlWrapper(getAllContactsController));

// Роут для отримання контакту за ID
router.get('/:contactId', ctrlWrapper(getContactByIdController));

// Роут для створення нового контакту з валідацією
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

// Роут для оновлення контакту за ID з валідацією
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactByIdController)
);

// Роут для видалення контакту за ID
router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

module.exports = router;
