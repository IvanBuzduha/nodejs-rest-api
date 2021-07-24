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
