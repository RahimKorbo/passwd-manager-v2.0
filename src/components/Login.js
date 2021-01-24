import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { loginURL } from "./Constants";
import { Spinner } from "react-bootstrap";
import loading from '../assets/loading.gif';
//import './Login.css'
import './LoginPageTest.css';
import PageTitle from "./PageTitle";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      // username: "",
      // password: "",
      fields: {},
      isLoading: false,
      errors: {},
      isTitleShow:true
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
    if (this.validateForm()) {
      let fields = this.state.fields;

      if (!fields["username"] && !fields["password"]) {
        fields["username"] = "";
        fields["password"] = "";
      }

      this.setState({ fields: fields });
      //alert("Form submitted");
      this.authenticate();
    }

  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //alert("UserName:::"+fields.username);
    //alert("Password:::"+fields.password);


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


    this.setState({
      errors: errors
    });
    return formIsValid;


  }

  authenticate = () => {

    const authJson = {
      username: this.state.fields.username,
      password: this.state.fields.password,
    };

    this.setState({ isLoading: true,isTitleShow: false });

    //alert("Spinner chalu--"+this.state.isLoading+" ,"+this.setState({ isLoading: true }));
    console.log(authJson.username)
    Axios.request({
      method: "POST",
      data: authJson,
      url: loginURL
    })
      .then((response) => {
        alert("User Authentication Successful.")
        localStorage.setItem("username", authJson.username)
        // localStorage.setItem("token",response.data.jwttoken);
        // localStorage.setItem("logintime",response.data.loginTime);
        sessionStorage.setItem("username", this.state.fields.username)
        sessionStorage.setItem("authUser", authJson.username);
        sessionStorage.setItem("logintime", response.data.loginTime);
        this.setState({ navigate: true, isLoading: false, isTitleShow: true });
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occurred. ", err);
      });

  };

  render() {
    const { navigate } = this.state;

    // here is the important part
    if (navigate) {
      // return <Redirect to="/dashboard" push={true} />;

      return <Redirect to={{ pathname: '/dashboard', state: { id: this.state.fields.username } }} push={true} />
    }

    return (


      <>
       {this.state.isTitleShow && <PageTitle/> }
        
        <div className="center">

          <h1>Login</h1>
          {/* <h1>Log in</h1>  */}
          <form>
            <div className="txt_field">


              <input
                id="username"
                name="username"
                type="text"

                onKeyUp={this.handleChange}
                required="required"
                maxLength="8"
              />
              <span></span>
              <label> Your email or username </label>
              {/* <label> Your email or username </label> */}
            </div>
            <div className="txt_field">

              <input
                id="password"
                name="password"
                type="password"

                onKeyUp={this.handleChange}
                required="required"
                maxLength="10"
                minLength="5"
              />
              <label> Your password </label>
            </div>
            <div className="sigup_link">
              <Link to="/register" className="to_register">New User? Register Here</Link>
            </div>

            <button
              id="button"
              className="button"
              //onClick={this.authenticate}
              onClick={this.submitLoginForm}
            >
              Login
                        </button>




          </form>
          {this.state.isLoading && <img src={loading} />}
        </div>

       
      </>


    );
  }
}
