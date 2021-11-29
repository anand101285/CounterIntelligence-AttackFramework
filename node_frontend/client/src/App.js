import React, { Fragment, useState } from 'react';
import honeytoken from './components/layout/honeytoken';
import './App.css';

const App = () =>{
  const [formData, setFormData] = useState({
    name:'',
    email:''
  })

  const {name,email} = formData

  const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    console.log(formData)    
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
