const Contact = require('../db/models/Contact');

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
