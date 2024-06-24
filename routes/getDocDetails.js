const express = require('express');
const router = express.Router();
const model = require('../lib/model/doctor')
const { ObjectId } = require('mongoose').Types;

const Doctor = model.Doctor;
router.post('/', (req, res) => {
    // Extract data from the request body
    const formData = req.body;
    const doctorId = '123456'; // Replace with the actual doctor ID from your database or generated ID

    // Respond with the doctor ID
    res.status(200).json({ doctorId });
   // res.redirect(`http://localhost:3000/doctorDetails?id=${formData._id}`);
});
// exports.updateDoctor = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const doc = await Doctor.findOneAndUpdate({ _id: id }, req.body, { new: true });
//         res.status(201).json({result: doc, success:false});
//     }
//     catch (err) {
//         res.status(400).json({err, success:false});
//     }
// }
router.post('/:id', async (req, res)=>{
    const id = req.params.id;
    const updates = req.body;
    console.log( ObjectId.isValid(id), id , updates);
    // const response = await fetch(`http://localhost:4000/api/${id}`);
    // const doctorData = await response.json();



    try {
      const doc = await Doctor.findByIdAndUpdate(
        id, // Match the document by its ID
         { $push: { appointmentDates: { $each: updates.appointmentDates|| [] } } },
    { new: true }
      );
// console.log(doc, "hey babe");
      if (!doc) {
        return res.status(404).json({ error: 'Doctor not found', success: false });
      }
    // try {
    //   const doc = await Doctor.findByIdAndUpdate(
    //     id, // Match the document by its ID
    //     { $set: updates }, // Use $set operator to update existing fields and add new ones
    //     { new: true } // Return the updated document
    //   );
    //     if (!doc) {
    //       return res.status(404).json({ error: 'Doctor not found', success: false });
    //     }

    //     if (!doc.dates && updates.dates) {
    //       doc.dates = updates.dates;
    //       await doc.save();
    //     }
    
       
        res.status(200).json({ result: doc, success: true });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', success: false });
      }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { appointmentDates } = req.body;

  try {
    const doctor = await Doctor.findByIdAndUpdate(id, { appointmentDates }, { new: true });
    res.json(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;