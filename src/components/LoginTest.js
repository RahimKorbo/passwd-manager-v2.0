import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { loginURL } from "./Constants";
import { Spinner } from "react-bootstrap";
import loading from '../assets/loading.gif';
import '../components/LoginTest.css';

export default class LoginTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            // username: "",
            // password: "",
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

        this.setState({ isLoading: true });
        //alert("Spinner chalu--"+this.state.isLoading+" ,"+this.setState({ isLoading: true }));
        console.log(authJson)
        Axios.request({
            method: "POST",
            data: authJson,
            url: loginURL
        })
            .then((response) => {
                alert("User Authentication Successful.")
                // localStorage.setItem("username",this.state.fields.username)
                // localStorage.setItem("token",response.data.jwttoken);
                // localStorage.setItem("logintime",response.data.loginTime);
                sessionStorage.setItem("username", this.state.fields.username)
                sessionStorage.setItem("token", response.data.jwttoken);
                sessionStorage.setItem("logintime", response.data.loginTime);
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
        if (navigate) {
            return <Redirect to="/dashboard" push={true} />;
        }

        return (



            <>

                <div className="background-wrap">
                    <div className="background"></div>
                </div>
                <div className="">

                {/* <form id="accesspanel" action="login" method="post">
                    <h1 id="litheader">AECEND</h1>
                    <div className="inset">
                        <p>
                            <input type="text" name="username" id="email" placeholder="Email address" />
                        </p>
                        <p>
                            <input type="password" name="password" id="password" placeholder="Access code" />
                        </p>
                        <div style="text-align: center;">
                            <div class="checkboxouter">
                                <input type="checkbox" name="rememberme" id="remember" value="Remember" />
                                <label class="checkbox"></label>
                            </div>
                            <label for="remember">Remember me for 14 days</label>
                        </div>
                        <input className="loginLoginValue" type="hidden" name="service" value="login" />
                    </div>
                    <p className="p-container">
                        <input type="submit" name="Login" id="go" value="Authorize" />
                    </p>
                </form> */}

                    <h1 id="litheader">Password Manager</h1>

                    <div className="inset">
                        <p><input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="username"
                            onKeyUp={this.handleChange}
                            required
                            maxLength="8"
                        /></p>
                        <p> <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="password"
                            onKeyUp={this.handleChange}
                            required
                            maxLength="10"
                            minLength="5"
                        /></p>
                        <p className="remember_me">
                            <Link to="/register" className="button secondary">New User? Register Here</Link>
                        </p>
                        <p className="submit"> <button
                            role="button"
                            className="button"
                            //onClick={this.authenticate}
                            onClick={this.submitLoginForm}
                        >
                            Login
                        </button></p>


                        {this.state.isLoading && <img src={loading} />}

                    </div>



                </div>

                {/* <div className="background-wrap">
                    <div className="background"></div>
                </div>

                <form id="accesspanel" action="login" method="post">
                    <h1 id="litheader">AECEND</h1>
                    <div className="inset">
                        <p>
                            <input type="text" name="username" id="email" placeholder="Email address" />
                        </p>
                        <p>
                            <input type="password" name="password" id="password" placeholder="Access code" />
                        </p>
                        <div style="text-align: center;">
                            <div class="checkboxouter">
                                <input type="checkbox" name="rememberme" id="remember" value="Remember" />
                                <label class="checkbox"></label>
                            </div>
                            <label for="remember">Remember me for 14 days</label>
                        </div>
                        <input className="loginLoginValue" type="hidden" name="service" value="login" />
                    </div>
                    <p className="p-container">
                        <input type="submit" name="Login" id="go" value="Authorize" />
                    </p>
                </form> */}




            </>
        );
    }
}
