import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});

const { name, email, password, cpassword } = credentials;
const history = useHistory()

const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Signup api");
const response = await fetch(
    "http://localhost:5000/api/auth/createuser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await response.json();
    if(json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        props.showAlert("Signup Successfully", "success");
        history.push("/")
    } else{
      props.showAlert("Invalid Details", "danger");
    }
}

    const onChange = (e) => {
        console.log('Inside the on change');
        setCredentials({...credentials, [e.target.name]: e.target.value});

    }
    return (
        <div className="container mt-2">
          <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
    <label for="name" className="form-label">Name</label>
    <input onChange={onChange} type="name" className="form-control" id="name" name="name" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input onChange={onChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input onChange={onChange} type="password" className="form-control" id="password" name="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label for="cpassword" className="form-label">Confirm Password</label>
    <input onChange={onChange} type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Signup
