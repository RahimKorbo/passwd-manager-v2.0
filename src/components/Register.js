import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { register } from "./Constants";
import Spinner from 'react-bootstrap/Spinner';
import loading from'../assets/loading.gif';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      fields: {},
      isLoading: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);

  }

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  submitLoginForm(e) {
    e.preventDefault();
    //alert("Form submitted---->", this.validateForm());
    let fields = this.state.fields;

    // if (this.validateForm()) {

    //   if (!fields["username"] && !fields["password"] && !fields["username"] && !fields["password"]) {
    //     fields["username"] = "";
    //     fields["password"] = "";
    //   }


    // }

    this.setState({ fields: fields });
    //alert("Form submitted");
    this.authenticate();

  }

  validateForm() {

    let formIsValid = true;
    let fields = this.state.fields;
    let errors = {};


    // alert("UserName:::" + fields.userName);
    // alert("Password:::" + fields.userPass);


    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }

    // if (typeof fields["username"] !== "undefined") {
    //   if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //     errors["username"] = "*Please enter alphabet characters only.";
    //   }
    // }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (!fields["userpin"]) {
      formIsValid = false;
      errors["userpin"] = "*Please enter your userpin.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }

  authenticate = () => {
    // firstname
    // Laste
    // email
    // username
    // userpass

    // userpin 4-6

    this.setState({ isLoading: true });
    
    const authJson = {

      firstName: this.state.fields.firstName,
      lastName: this.state.fields.lastName,
      emailId: this.state.fields.emailId,
      userName: this.state.fields.userName,
      userPass: this.state.fields.userPass,
      userPin: this.state.fields.userPin,
    };

    console.log("data gone to api-", authJson);
   
    // alert("Spinner chalu--"+this.state.isLoading);
    Axios.request({
      method: "POST",
      data: authJson,
      url: register
    })
      .then((response) => {

        alert("User Authentication Successful.")
        
        // localStorage.setItem("username",this.state.fields.username)
        // localStorage.setItem("token",response.data.jwttoken);
        // localStorage.setItem("logintime",response.data.loginTime);

        this.setState({ navigate: true, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occurred. ", err);
      });

  };

  render() {
    const { navigate } = this.state;

    // here is the important part

    // firstname
    // Laste
    // email
    // username
    // userpass
    // userpin 4-6

    if (navigate) {
      return <Redirect to="/" push={true} />;
    }

    return (



      <div>
        <div className="login">
          <h1>Password Manager</h1>
          <h1>Register Here</h1>
          <p><input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="firstName"
            onKeyUp={this.handleChange}
            required
            maxLength="8"
          /></p>
          <p><input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="lastName"
            onKeyUp={this.handleChange}
            required
            maxLength="8"
          /></p>
          <p><input
            id="emailId"
            name="emailId"
            type="text"
            placeholder="email"
            onKeyUp={this.handleChange}
            required
            maxLength="8"
          /></p>

          <p><input
            id="userName"
            name="userName"
            type="text"
            placeholder="userName"
            onKeyUp={this.handleChange}
            required
            maxLength="8"
          /></p>
          <p><input
            id="userPass"
            name="userPass"
            type="text"
            placeholder="userPass"
            onKeyUp={this.handleChange}
            required
            maxLength="8"
          /></p>
          <p><input
            id="userPin"
            name="userPin"
            type="text"
            placeholder="userPin"
            onKeyUp={this.handleChange}
            required
            maxLength="8"
          /></p>

          <p className="submit"> <button
            role="button"
            className="button"
            //onClick={this.authenticate}
            onClick={this.submitLoginForm}
          >
            Register
                        </button></p>

                        {this.state.isLoading && <img src={loading} />  }
        </div>


       

      </div>
    );
  }
}
