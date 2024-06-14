const {
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
} = require('../services/contacts');
const createError = require('http-errors');

// Контролер для отримання всіх контактів
const getAllContactsController = async (req, res, next) => {
  try {
    const result = await getAllContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Контролер для отримання контакту за ID
const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Контролер для оновлення контакту за ID
const updateContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedFields = req.body;

  try {
    const updatedContact = await updateContactById(contactId, updatedFields);
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

// Контролер для видалення контакту за ID
const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    await deleteContactById(contactId);
    res.status(204).send(); // Відповідь без тіла при успішному видаленні
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContactsController,
  getContactByIdController,
  updateContactByIdController,
  deleteContactByIdController,
};
