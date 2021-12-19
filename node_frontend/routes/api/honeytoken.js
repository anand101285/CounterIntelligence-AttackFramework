const express = require('express');
const ip = require('ip');
const mongoose = require('mongoose');
const router = express.Router();
const spawn = require('child_process').spawn;
const attacker = require('../../models/Attacker')
const url_db = "mongodb+srv://cicaf2021:Counterintelligenceattack2021@cluster0.vscuv.mongodb.net/CounterAttackdb?retryWrites=true&w=majority"
mongoose.connect(url_db,(err)=>{
  if(err) console.log(err)
})

// router.get('/worddoc/',(req,res)=>{
//   res.download("./test_1_webbug.doc")
// })

router.get('/:type', (req,res)=>{


  if(req.params.type=="worddoc")
  {
    const current_ip=ip.address();
    try{
      var dataToSend;

      //(fixed ) python file was not inserted as string
      const python = spawn('python', [__dirname+'\\..\\..\\..\\python_backend\\webdoc_using_link.py','--url',current_ip+':5000','--sessionid','1','--docname','test_1_webbug']);

      //on execution
      python.stdout.on('data', (data) =>{
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();

      });


      //on error the message is displayed , python script was not findinf the proper directory
      python.stderr.on('data',(data)=>{
        console.log("error here")
        console.log(data.toString())
      })


      //on close of script
      python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      res.download("./test_1_webbug.doc")
      })


    }catch(err){
      console.log(err.message);
      require.status(500).send('Server Error');
    }
  }
  else if(req.params.type=='excel_vba')
  {
    try{
      const excel_vba = spawn('python',[__dirname+'\\..\\..\\..\\python_backend\\xslm_macrogen.py','--file','my_macro'] );

      //on execution
      excel_vba.stdout.on('data', (data) =>{
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();

      });


      //on error the message is displayed , python script was not findinf the proper directory
      excel_vba.stderr.on('data',(data)=>{
        console.log(data.toString())
      })


      //on close of script
      excel_vba.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
        res.download(__dirname+'\\..\\..\\..\\python_backend\\mal_docs\\my_macro.xlsm')
      })

    }
    catch(err)
    {
      console.log(err.message);
      require.status(500).send('Server Error');

    }
  }

}
);



//this route will recieve the request from document open and print its ip (TODO modify it)
router.get('/',(req,res)=>{


  
    let attacker_ip = res.socket.remoteAddress;

  
    //filtering only the ip address
    attacker_ip =attacker_ip.replace('::ffff:',"");
    console.log(attacker_ip);

    
    // let today =  new Date()
  
    // //getting the current date
    // let currdate = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear();
  
    // //saving in the database
    // const attacker_detail = new attacker({ip:attacker_ip, date:currdate})
    // attacker_detail.save().then(()=>{console.log("attacker details added")})
  
    res.end()
  
  

})

module.exports = router;