const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');



router.post('/',
async (req,res)=>{

   try{
     var dataToSend;
     const python = spawn('python', [hello.py]);
     python.stdout.on('data', function (data) {
     console.log('Pipe data from python script ...');
     dataToSend = data.toString();
     });
     python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
      res.send(dataToSend)
     })
   }catch(err){
     console.log(err.message);
     require.status(500).send('Server Error');
   }
  }
);

module.exports = router;