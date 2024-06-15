const Contact = require('../db/models/Contact');

// Функція для отримання всіх контактів
async function getAllContacts() {
  try {
    const contacts = await Contact.find();
    return {
      status: 200, // Змінено на статус код 200 (успішно)
      message: 'Successfully found contacts!',
      data: contacts,
    };
  } catch (error) {
    throw {
      status: 500, // Змінено на статус код 500 (помилка сервера)
      message: 'Failed to retrieve contacts',
    };
  }
}

// Функція для отримання контакту за ID
async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw {
        status: 404, // Змінено на статус код 404 (не знайдено)
        message: 'Contact not found',
      };
    }
    return {
      status: 200, // Змінено на статус код 200 (успішно)
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    };
  } catch (error) {
    throw {
      status: 500, // Змінено на статус код 500 (помилка сервера)
      message: 'Failed to retrieve contact',
    };
  }
}

module.exports = {
  getAllContacts,
  getContactById,
};
