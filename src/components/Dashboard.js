import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link, Redirect } from "react-router-dom";
import { addRecord, getRecord } from "./PasswordDataCall.js";


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        console.log("props value--", props.location.state);
        this.state = {
            navigate: false,
            // username: "",
            // password: "",
            fields: {},
            isLoading: false,
            errors: {},
            rows: [],
            userName: props.location.state.id,
            authUser: ""
        };

    }


    getData = () => {
        const json = { userName: this.state.userName }
        console.log("username in session::", json);

        getRecord(json)
            .then(res => {
                if (res.status == 200) {
                    console.log("Getting response from API--", res.data)
                    this.setState({ rows: res.data })
                }
                else {
                    console.log("Error")
                }
            })
    }

    componentDidMount() {

        this.setState({
            userName: localStorage.getItem("username"),
            authUser: sessionStorage.getItem("authUser")
        })
        console.log("Session Value-->" + this.state.userName)
        console.log("Session2 Value-->" + this.state.authUser)
        this.getData();
    }

    handleItemChanged(i, event) {
        var items = this.state.rows;

        alert("Edit Button---" + event.target.value);
        items[i] = event.target.value;

        this.setState({
            rows: items
        });
    }
    handleItemDeleted(i) {
        var items = this.state.rows;

        items.splice(i, 1);

        this.setState({
            rows: items
        });
    }

    handleClick() {
        var items = this.state.rows;
        console.log("Data on Add Data BUtton:" + items);


    }
    render() {


        const { rows } = this.state.rows;
        var context = this;
        return (
            <>

                <div className="titleBody">
                    Here You Can &nbsp;
                    <div className="dropping-texts">
                        <div>View All Records</div>
                        <div>Edit Your Records</div>
                        <div>Add Your Records</div>
                        <div>Delete Your Records!</div>
                    </div>
                </div>


                <div className="center1">
                    <h1>View Records</h1>



                    <form>


                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <td>
                                        <button className="Addbutton"> <Link to={{ pathname: "/newRecord", state: { id: this.state.userName } }}>Add Record</Link></button>
                                    </td>
                                    <td>
                                        <button className="logoutButton"> <Link to="/" onClick={() => { sessionStorage.clear() }} >Logout</Link> </button>
                                    </td>


                                </tr>
                                <tr>
                                    <th>Password Id</th>
                                    <th>Site name</th>
                                    <th>Site password</th>
                                    <th>Site Username</th>
                                    <th>Edit Button</th>
                                    <th>Delete Button</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rows.map((listValue, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{listValue.pwdId}</td>
                                            <td>{listValue.siteName}</td>
                                            <td>{listValue.sitePwd}</td>
                                            <td>{listValue.siteUserName}</td>
                                            <td>
                                                <button> <Link to={{ pathname: "/editRecord", state: { item: listValue, id: this.state.userName } }}>Edit Record</Link></button>
                                            </td>
                                            <td>
                                                <button onClick={context.handleItemDeleted.bind(context, index)}> Delete </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </form>

                </div>
            </>
        );
    }



}
