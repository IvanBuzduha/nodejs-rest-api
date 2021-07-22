const express = require('express');
const router=express.Router();
const validate = require('./validation');
const contactController = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');

router.get('/',guard, contactController.getContactsList);

router.get('/:id', guard, contactController.getContactById);

router.post('/',guard, validate.createContact,contactController.addContact);

router.delete('/:id',guard, contactController.removeContact);

router.patch('/:id',guard, validate.updateContact, contactController.updateContact);

router.patch('/:id/favorite',guard, validate.updateStatusContact, contactController.updateContact);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Contacts = require("../../../service/contacts");
// const validate = require("./validation.js");
// const { asyncWrapper } = require("../../../helpers/async-wrapper");

// router.get("/", asyncWrapper(async (req, res, next) => {
//   try {
//     const contacts = await Contacts.getListContacts();

//     return res.json({
//       status: "success",
//       code: 200,
//       data: {
//         contacts,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// }));

// router.get("/:id",validate.idValidation,  asyncWrapper(async (req, res, next) => {
//   try {
//     const contact = await Contacts.getContactById(req.params.id);

//     if (contact) {
//       return res.json({
//         status: "success",
//         code: 200,        
//         data: {
//           contact,
//         },
//       });
//     } else {
//       return res.status(404).json({
//         status: "error",
//         code: 404,
//         message: "Not Found",
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// }));

// router.post("/", validate.createContact, asyncWrapper(async (req, res, next) => {
//   try {
//     const contact = await Contacts.addContact(req.body);
//     return res.status(201).json({
//       status: "success",
//       code: 201,
//       message: 'New contact has been added',
//       data: {
//         contact,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// }));

// router.delete("/:id", validate.idValidation, asyncWrapper(async (req, res, next) => {
//   try {
//     const contact = await Contacts.removeContact(req.params.id);

//     if (contact) {
//       return res.json({
//         status: "success",
//         code: 200,
//         message: "contact deleted",
//         data: {
//           contact,
//         },
//       });
//     } else {
//       return res.status(404).json({
//         status: "error",
//         code: 404,
//         message: "Not Found",
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// }));

// router.patch("/:id", validate.updateContact, asyncWrapper(async (req, res, next) => {
//   if (req.body) {
//     try {
//       const contact = await Contacts.updateContact(req.params.id, req.body);

//       if (contact) {
//         return res.status(200).json({
//           status: "success",
//           code: 200,
//           message: 'contact updated',
//           data: {
//             contact,
//           },
//         });
//       } else {
//         return res.status(404).json({
//           status: "error",
//           code: 404,
//           message: "Not found",
//         });
//       }
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return res.status(400).json({
//       status: "error",
//       code: 400,
//       message: "missing fields",
//     });
//   }
// }));

// router.patch("/:id/favorite", validate.updateStatusContact, asyncWrapper( async (req, res, next) => {
//   if (req.body) {
//     try {
//       const contact = await Contacts.updateContact(req.params.id, req.body);

//       if (contact) {
//         return res.status(200).json({
//           status: "success",
//           code: 201,
//           message: 'status updated',
//           data: {
//             contact,
//           },
//         });
//       } else {
//         return res.status(404).json({
//           status: "error",
//           code: 404,
//           message: "Not found",
//         });
//       }
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return res.status(400).json({
//       status: "error",
//       code: 400,
//       message: "missing field favorite",a
//     });
//   }
// }));

// router.put("/:id", validate.updateContact, asyncWrapper(async (req, res, next) => {
//   if (req.body) {
//     try {
//       const contact = await Contacts.updateContact(req.params.id, req.body);

//       if (contact) {
//         return res.json({
//           status: "success",
//           code: 200,
//           message: 'contact updated',
//           data: {
//             contact,
//           },
//         });
//       } else {
//         return res.status(404).json({
//           status: "error",
//           code: 404,
//           message: "Not found",
//         });
//       }
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return res.status(400).json({
//       status: "error",
//       code: 400,
//       message: "missing fields",
//     });
//   }
// }));

// module.exports = router;
