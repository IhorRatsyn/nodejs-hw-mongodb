const Contact = require('../db/models/Contact');

// Функція для отримання всіх контактів
async function getAllContacts() {
  try {
    const contacts = await Contact.find();
    return {
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    };
  } catch (error) {
    throw new Error('Failed to retrieve contacts');
  }
}

// Функція для отримання контакту за ID
async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return {
      status: 'success',
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    };
  } catch (error) {
    throw new Error('Failed to retrieve contact');
  }
}

module.exports = {
  getAllContacts,
  getContactById,
};
