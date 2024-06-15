const Contact = require('../db/models/Contact');
const createError = require('http-errors');

// Функція для отримання всіх контактів з пагінацією, сортуванням та фільтрацією
async function getAllContacts(
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter = {}
) {
  try {
    const skip = (page - 1) * perPage;
    const sortCriteria = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    const query = {};

    // Додавання фільтрів до запиту
    if (filter.type) {
      query.contactType = filter.type;
    }
    if (filter.isFavourite !== undefined) {
      query.isFavourite = filter.isFavourite === 'true';
    }

    const totalItems = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .skip(skip)
      .limit(perPage)
      .sort(sortCriteria);

    return {
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        hasPreviousPage: page > 1,
        hasNextPage: page * perPage < totalItems,
      },
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
