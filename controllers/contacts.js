const Contacts = require("../service/contacts");
const mongoose = require("mongoose");
const { asyncWrapper } = require("../helpers/async-wrapper");

const getContactsList = asyncWrapper(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.getContactsList(userId);
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

const getContactById = asyncWrapper(async (req, res, next) => {
   if (mongoose.Types.ObjectId.isValid(req.params.id)) {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(req.params.id, userId);

    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
}else {

    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Id doesn't exist",
    });
  }
});

const addContact = asyncWrapper(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact({...req.body, owner: userId});

    return res.status(201).json({
      status: "success",
      code: 201,
      message: 'New contact has been added',
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

const removeContact = asyncWrapper(async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(req.params.id, userId );

    if (contact) {
      return res.json({
        status: "success",
        message: 'Contact has been deleted',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
}else {
    return res.status(404).json({
    status: "error",
    code: 404,
    message: "Id doesn't exist",
    });
  }
});

const updateContact = asyncWrapper(async (req, res, next) => {
  if (req.body && mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const userId = req.user.id;
      const contact = await Contacts.updateContact( req.params.id, req.body, userId);

      if (contact) {
        return res.json({
          status: "success",
          message: 'Data has been updated',
          code: 200,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
      }
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Id doesn't exist",
    });
  }
});


module.exports = {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
 
};