const {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} = require('../services/contacts');

// Контролер для отримання всіх контактів з пагінацією, сортуванням та фільтрацією
const getAllContactsController = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = req.query;
  try {
    const filter = { type, isFavourite };
    const result = await getAllContacts(
      parseInt(page),
      parseInt(perPage),
      sortBy,
      sortOrder,
      filter
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      data: null,
    });
  }
};

// Інші контролери залишаються без змін
const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: `Contact with ID ${contactId} not found!`,
      data: null,
    });
  }
};

const createContactController = async (req, res) => {
  try {
    const result = await createContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      data: null,
    });
  }
};

const updateContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const result = await updateContactById(contactId, req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Contact not found') {
      res.status(404).json({
        status: 'error',
        message: error.message,
        data: { message: 'Contact not found' },
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: error.message,
        data: null,
      });
    }
  }
};

const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  try {
    await deleteContactById(contactId);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Contact not found') {
      res.status(404).json({
        status: 'error',
        message: error.message,
        data: { message: 'Contact not found' },
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: error.message,
        data: null,
      });
    }
  }
};

module.exports = {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  deleteContactByIdController,
};
