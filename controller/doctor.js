const mongoose = require("mongoose");

const model = require("../lib/model/doctor");
const Doctor = model.Doctor;

exports.createDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json({result : doctor, success:true});
    } catch (err) {
        console.error('Error creating doctor:', err);
        res.status(500).json({ error: 'Internal server error', success:false });
    }
    //  const doctor = new Doctor(req.body);
    //   await doctor.save();
    // doctor.save((err,doc)=>{
    //     console.log(err,doc);
    //     res.status(201).json(doc);
    // })

}

exports.getCurrentDocDetails = async(req, res) => {
    const formData = req.body;

    const doctorId = '123456'; // Replace with the actual doctor ID from your database or generated ID

    // Respond with the doctor ID
    res.status(200).json({ doctorId, formData });
    // res.redirect(`http://localhost:3000/doctorDetails?id=${formData._id}`);

}

exports.sendinfoOfDoc = async(req, res) =>{
    try{
        const doctor = new Doctor(req.body.id);
        res.status(201).json({result:doctor, success:true});
    }
    catch{
         console.error('Error creating doctor:', err);
         res.status(500).json({ error: 'Internal server error', success:false });
    }
}




exports.getAllDoctor = async (req, res) => {

    try {
        const doctors = await Doctor.find();
       console.log("hellow")
        res.json({ result: doctors, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving doctor', success: false });
    }

}

exports.getDocByLocation = async (req, res) => {
    try {
        const location = req.params.location;
       // console.log("hello " ,location);
        const doctors = await Doctor.find({ location: { $regex: new RegExp(location, 'i') } });
        res.json({ result: doctors, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving doctor', success: false });
    }

}


exports.getLimitDoctor = async (req, res) => {
    try {
        let start = parseInt(req.params.num);
        const sizes = parseInt(req.params.size);
        const calculated = start * sizes;
        let val = calculated;
        let ans = 0;
        while (val) {
            val = Math.floor(val / 10);
            ans++;
        }
        if (!ans) ans = 1;

        let doctors;
        if (ans == 1) {
            doctors = await Doctor.find({ employee_id: { $gt: `IN_DOC00${calculated}` } }).limit(sizes);
        } else if (ans == 2) {
            doctors = await Doctor.find({ employee_id: { $gt: `IN_DOC0${calculated}` } }).limit(sizes);
        } else {
            doctors = await Doctor.find({ employee_id: { $gt: `IN_DOC${calculated}` } }).limit(sizes);
        }

        res.json({result:doctors, success:true});
    } catch (error) {
        console.error('Error in fetching doctors:', error);
        res.status(500).json({ error: 'Error in fetching doctors' , success:false});
    }
}



exports.getDoctor = async (req, res) => {
    try{
        const id = req.params.id;

        // const doctor = await Doctor.findOne({_id:id});
        const doctor = await Doctor.findById(id);
         res.json({result : doctor , success:true});
    }
    catch (error) {
        res.status(500).json({ message: 'Internal error ', success: false });
    }
 

}


exports.replaceDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await Doctor.findOneAndReplace({ _id: id }, req.body, { new: true });
        res.status(201).json({result:doc, success:false});
    }
    catch (err) {
        res.status(400).json({err, success:false});
    }
}

exports.updateDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await Doctor.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(201).json({result: doc, success:false});
    }
    catch (err) {
        res.status(400).json({err, success:false});
    }
}

exports.deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await Doctor.findOneAndDelete({ _id: id });
        res.status(201).json({result:doc, success:false});
    }
    catch (err) {
        res.status(400).json({err, success:false});
    }
}
























// exports.getLimitDoctor = async (req, res) => {
//     //console.log(req.params, req.params.num, req.params.size);
//     let start = req.params.num;
//     const sizes = req.params.size;
//     const calculated = start * sizes;
//     let val = calculated;
//     let ans = 0;
//     while (val) {
//         // ans = val % 10;
//         val = Math.floor(val / 10);
//         ans++;
//     }
//     if (!ans) ans = 1;
//     //    console.log(calculated, ans);
//     if (ans == 1) {
//         const doctors = await Doctor.find({ employee_id: { $gt: `IN_DOC00${calculated}` } }).limit(sizes);
//         res.json(doctors);
//     }
//     else if (ans == 2) {
//         const doctors = await Doctor.find({ employee_id: { $gt: `IN_DOC0${calculated}` } }).limit(sizes);
//         res.json(doctors);
//     }
//     else {
//         const doctors = await Doctor.find({ employee_id: { $gt: `IN_DOC${calculated}` } }).limit(sizes);
//         res.json(doctors);
//     }

//     // const doctors = await Doctor.find({employee_id : {$gt :`IN_DOC0${calculated}` }    }).select({employee_id:1}).limit(8);
//     // res.json(doctors);

//     /*
//      now few problem h like db me employee_id h woh  24 26  nhi h toh ek doh data repeat ho sakta h 
//     */
// }