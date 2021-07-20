const Contact = require("../model/schemas/contact_schema");

const getContactsList = async (userId) => {
  const contacts = await Contact.find({owner: userId }).populate({
    path: 'owner',
    select:'name email phone -_id'
  });

  return contacts;
};

const getContactById = async (id, userId) => {
  const contact = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select:'name email phone -_id',
  });

  return contact;
};

const removeContact = async (id, userId) => {
  const contact = await Contact.findByIdAndRemove({_id:id, owner: userId });

  return contact;
};

const addContact = async (body) => {
  const contact = await Contact.create(body);

  return contact;
};

const updateContact = async (id, body, userId) => {
  const contact = await Contact.findByIdAndUpdate(
    {_id: id, owner: userId },
    { ...body },
    { new: true }
  );

  return contact;
};

module.exports = {
  getContactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  
};