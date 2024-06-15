const express = require('express');
const router = express.Router();
const {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  deleteContactByIdController, // Додаємо новий контролер
} = require('../controllers/contacts');
const ctrlWrapper = require('./ctrlWrapper');

// Роут для отримання всіх контактів
router.get('/', ctrlWrapper(getAllContactsController));

// Роут для отримання контакту за ID
router.get('/:contactId', ctrlWrapper(getContactByIdController));

// Роут для створення нового контакту
router.post('/', ctrlWrapper(createContactController));

// Роут для оновлення контакту за ID
router.patch('/:contactId', ctrlWrapper(updateContactByIdController));

// Роут для видалення контакту за ID
router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

module.exports = router;
