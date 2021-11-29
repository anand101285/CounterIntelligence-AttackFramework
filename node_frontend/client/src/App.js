import React, { Fragment, useState } from 'react';
import axios from 'axios'
import './App.css';

const App = () =>{
  const [formData, setFormData] = useState({
    name:'',
    email:''
  })

  const {name,email} = formData

  const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})

  const onSubmit = async e => {
    const newUser = {
      name,
      email
    }

    try{
      const config = {
        headers:{
          'Content-Type':'application/json'
        } 
      } 
      const body = JSON.stringify(newUser)
      const res = await axios.post('/api/honeytoken',body,config)
      console.log(res.data);
    }catch(err){
      console.error(err.response.data);
    }
  }

 return(
    <Fragment>
     <form className="box" onSubmit={e => onSubmit(e)}>
       <h2>Generate Honey tokens</h2>
       <input type="text" name="name" value ={name} onChange = {e => onChange(e)} placeholder="Enter your name "></input>
       <input type="email" name="email" value ={email} onChange = {e => onChange(e)} placeholder="Enter your email"></input>
       <h2>You can download honey tokens below</h2>
       <input type="submit" name="" value="Download"></input>
      </form>
    </Fragment>
)
}

export default App;
