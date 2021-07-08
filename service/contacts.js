const Contact = require("../model/contact_schema");

const getListContacts = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findOne({ _id: id });

  return contact;
};

const removeContact = async (id) => {
  const contact = await Contact.findByIdAndRemove({ _id: id });

  return contact;
};

const addContact = async (body) => {
  const contact = await Contact.create(body);

  return contact;
};

const updateContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );

  return contact;
};
const updateStatusContact = async (id, body) => {
  const contact = await Contacts.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  );

  return contact;
};
module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};