const Contact = require('../db/models/Contact');
const createError = require('http-errors');

// Функція для отримання всіх контактів
async function getAllContacts() {
  try {
    const contacts = await Contact.find();
    return {
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    };
  } catch (error) {
    throw createError(500, 'Failed to retrieve contacts');
  }
}

// Функція для отримання контакту за ID
async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    return {
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    };
  } catch (error) {
    throw createError(500, 'Failed to retrieve contact');
  }
}

// Функція для оновлення контакту за ID
async function updateContactById(contactId, updatedFields) {
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, updatedFields, {
      new: true,
    });
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    return {
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact,
    };
  } catch (error) {
    throw createError(500, 'Failed to update contact');
  }
}

// Функція для видалення контакту за ID
async function deleteContactById(contactId) {
  try {
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    return {
      status: 200,
      message: 'Successfully deleted a contact!',
    };
  } catch (error) {
    throw createError(500, 'Failed to delete contact');
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
};
