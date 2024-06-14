const express = require('express');
const router = express.Router();
const { getAllContacts, getContactById } = require('../services/contacts');

// Роут для отримання всіх контактів
router.get('/', async (req, res) => {
  try {
    const result = await getAllContacts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      data: null,
    });
  }
});

// Роут для отримання контакту за ID
router.get('/:contactId', async (req, res) => {
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
});

module.exports = router;
