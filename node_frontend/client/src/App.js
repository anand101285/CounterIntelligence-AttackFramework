import React, { Fragment, useState } from 'react';
import axios from 'axios'
import './App.css';
import FileDownload from 'js-file-download';


const App = () =>{
//   const [formData, setFormData] = useState({
//     name:'',
//     email:''
//   })

//   const {name,email} = formData

//   const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})

  const onSubmit = e => {
   //  const newUser = {
   //    name,
   //    email
   //  }

    try{
      // const config = {
      //   headers:{
      //     'Content-Type':'application/json'
      //   } 
      // } 
      // const body = JSON.stringify(newUser)

      axios({
         url: 'http://localhost:5000/api/honeytoken/worddoc',
         method: 'GET',
         responseType: 'blob', // important
      }).then((response) => {
        console.log(response);
         FileDownload(response.data,"worddocument.doc")
      });

    }catch(err){
      console.error(err.response.data);
    }

  }
  
  const  onSubmit_excel= (e)=>{
    try{

      axios({
         url: 'http://localhost:5000/api/honeytoken/excel_vba',
         method: 'GET',
         responseType: 'blob', // important
      }).then((response) => {
        console.log(response);
         FileDownload(response.data,"exceldoc.xlsm")
      });

    }catch(err){
      console.error(err.response.data);
    }
  }
 return(
    <Fragment>
       <nav className="navbar nav-container navbar-expand-lg bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Honey Tokens</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span><i className="fas fa-plus"></i></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider"></hr></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form className="d-flex">
          <button className="btn btn-outline-success" type="submit">Login</button>
        </form>
      </div>
    </div>
  </nav>


      <div className="generate-token">
        <div className="row">
          <div className="col-md-1"></div>
            <div className="generate-token-form col-md-10">
            

              <form className="px-4 py-3">
                <div className="mb-3">
                  <label for="Name" className="form-label">Full Name</label>
                  <input  className="form-control" type="text" name="name" placeholder="Anand Kumar"></input>
                </div>
                <div className="mb-3">
                  <label for="Email" className="form-label">Email address</label>
                  <input className="form-control" type="email" name="email"  placeholder="email@example.com"></input>
                </div>
                <div className="mb-3"></div>
              </form>


              <div className="d-grid">
                <button className="btn btn-outline-primary dropdown-toggle mt-3" type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                Select your token
                </button>
                  <div className=" drop row dropdown-menu" aria-labelledby="dropdownMenu">
                    <button className=" btn token-selection btn-outline-success my-1" onClick={(e)=>onSubmit(e)}><i className="fas fa-file-word"></i> Microsoft Word Document</button>
                    <button className="btn  token-selection btn-outline-success my-1" onClick={(e)=>onSubmit_excel(e)}><i className="fas fa-file-excel"></i> Microsoft Excel Document</button>
              </div>

      
            </div>
            
          </div>   
          <div className="col-md-1"> <button className="btn  btn-danger"><a className="butoon" href="http://localhost:5000/viewaccess" target="_blank"> View Attacker details</a></button></div>
        </div>
       </div>

      {/* local host is given in action parameter as port were used different
     <form className="box" action="http://localhost:5000/api/honeytoken" method="POST">
       <h2>Generate Honey tokens</h2>
       <input type="text" name="name" value ={name} onChange = {e => onChange(e)} placeholder="Enter your name "></input>
       <input type="email" name="email" value ={email} onChange = {e => onChange(e)} placeholder="Enter your email"></input>
       <h2>You can download honey tokens below</h2>
       <input type="submit" name="" value="Download"></input>
      </form> */}
    </Fragment>
)
}

export default App;
