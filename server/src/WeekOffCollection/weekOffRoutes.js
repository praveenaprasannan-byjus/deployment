const express = require('express');
const router = express.Router();
const WeekOff = require('../../models/WeekOff');

module.exports = function () {
    router.get('/viewweekoff', async (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit); 
    const weekOffData = await WeekOff.find().skip(skip).limit(limit).sort({date:-1});
    return res.send(weekOffData);
    });

    router.delete('/deleteweekoff', async(req,res) => {
        const {emailId} = req.body;
        await WeekOff.deleteOne({emailId});
        const weekOffData = await WeekOff.find();
        res.send({message:"Deleted Successfully",weekOffData});

    });

    router.get('/getInfo/:emailId/:date', async (req,res) => {
        const { emailId, date } = req.params; 
        const data = await WeekOff.findOne({emailId : emailId, date : date});
        res.send(data.history);
    });

     router.put('/updateweekoff', async(req,res) => {
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit); 
        const {clickedEmail,clickedDate,newdate} = req.body; 
        const data = await WeekOff.findOne({emailId : clickedEmail, date : newdate});
        if(data){
            res.send({message:`WeekOff already exist`});
        }
        else{
        await WeekOff.updateOne(
            { emailId: clickedEmail,date: clickedDate},
            {
                $set: { emailId: clickedEmail, date: newdate},
                $addToSet:{history: [
                    { from: clickedDate, to: newdate}
                    ]}
                }
              );
              const weekOffData = await WeekOff.find().skip(skip).limit(limit).sort({date:-1});
              res.send({message:`Updated successfully`,weekOffData});
            }
        });
    return router;
 };