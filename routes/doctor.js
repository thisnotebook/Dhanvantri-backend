const express = require('express');
const DoctorController = require('../controller/doctor')
const router = express.Router();
router
.post('/', DoctorController.createDoctor)
.get('/', DoctorController.getAllDoctor)
.get('/:id', DoctorController.getDoctor)
.get('/:num/:size', DoctorController.getLimitDoctor)
.get('/get/location/:location', DoctorController.getDocByLocation)
.put('/:id',DoctorController.replaceDoctor)
.patch('/:id',DoctorController.updateDoctor)
.delete('/:id', DoctorController.deleteDoctor)



// .post('/',DoctorController.getCurrentDocDetails)

exports.router = router;