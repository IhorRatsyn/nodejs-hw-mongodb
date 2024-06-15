const Contact = require('../db/models/Contact');

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
      status: 'success',
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
    throw new Error('Failed to retrieve contacts');
  }
}

// Інші функції залишаються без змін
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
