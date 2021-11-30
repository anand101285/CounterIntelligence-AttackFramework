const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;



router.post('/', async (req,res)=>{
  
   try{
     var dataToSend;

     //(fixed ) python file was not inserted as string
     const python = spawn('python', [__dirname+'\\..\\..\\..\\python_backend\\webdoc_using_link.py','--url','172.26.64.1:5000','--sessionid','1','--docname','test_1_webbug']);

     //on execution
     python.stdout.on('data', (data) =>{

  
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();

     });


     //on error the message is displayed , python script was not findinf the proper directory
     python.stderr.on('data',(data)=>{
       console.log(data.toString())
     })


     //on close of script
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



//this route will recieve the request from document open and print its ip (TODO modify it)
router.get('/',(req,res)=>{

  console.log(res.socket.remoteAddress)
  res.end()
})

module.exports = router;