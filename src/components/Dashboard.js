import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link, Redirect } from "react-router-dom";
import {
    Grid,
    GridColumn as Column,
    GridToolbar
} from "@progress/kendo-react-grid";

import { MyCommandCell } from "./MyCommandCell.js";
import { insertItem, getItems, updateItem, deleteItem } from "./service.js";
import '@progress/kendo-theme-default/dist/all.css';
import './Login.css';
import { TestData } from './TestData.jsx';
import { addRecord, getRecord } from "./PasswordDataCall.js";

import ReactDataGrid from 'react-data-grid';


const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'count', name: 'Count' } ];

    const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];


export default class Dashboard extends React.Component {
    editField = "inEdit";
    state = {
        data: [],
        username: "",
        columns: [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' },
            { key: 'count', name: 'Count' }
        ],
        rows: [
            { id: 0, title: 'row1', count: 20 },
            { id: 1, title: 'row1', count: 40 },
            { id: 2, title: 'row1', count: 60 }
        ]
    };

    // componentDidMount() {
    //     this.setState({
    //         data: getItems()
    //     });
    // }

    getData = () => {
        const json = { userName: this.state.userName }
        getRecord(json)
            .then(res => {
                if (res.status == 200) {
                    console.log("Getting response from API--", res.data)
                    this.setState({ data: res.data })
                }
                else {
                    console.log("Error")
                }
            })
    }

    componentDidMount() {
        console.log(this.state.username)
        this.setState({
            username: sessionStorage.getItem("username"),
        })
        this.getData();
    }


    CommandCell = props => (
        <MyCommandCell
            {...props}
            edit={this.enterEdit}
            remove={this.remove}
            add={this.add}
            discard={this.discard}
            update={this.update}
            cancel={this.cancel}
            editField={this.editField}
        />
    );

    // modify the data in the store, db etc
    remove = dataItem => {
        const data = deleteItem(dataItem);
        this.setState({ data });
    };

    add = dataItem => {
        dataItem.inEdit = true;

        //const data = insertItem(dataItem);
        // this.setState({
        //     data: data
        // });



        const data = [...this.state.data];

        // dataItem.inEdit = undefined;
        dataItem.id = this.generateId(data);

        data.unshift(dataItem);
        this.setState({
            data: [...this.state.data]
        });
        dataItem.createdBy = sessionStorage.getItem("username")

        console.log(dataItem)
        addRecord(dataItem).then(res => {
            if (res.status === 200) {
                alert(res.data)
            }
            else {
                alert("Error Occurred.")
            }
        })
            .catch(err => {
                alert(err);
                this.setState({
                    redirect: true
                })
            })
    };

    update = dataItem => {
        dataItem.inEdit = false;
        const data = updateItem(dataItem);
        this.setState({ data });
    };

    // Local state operations
    discard = dataItem => {
        const data = [...this.state.data];
        data.splice(0, 1)
        this.setState({ data });
    };

    cancel = dataItem => {
        const originalItem = getItems().find(
            p => p.siteId === dataItem.siteId
        );
        const data = this.state.data.map(item =>
            item.siteId === originalItem.siteId ? originalItem : item
        );

        this.setState({ data });
    };

    enterEdit = dataItem => {
        this.setState({
            data: this.state.data.map(item =>
                item.siteId === dataItem.siteId ? { ...item, inEdit: true } : item
            )
        });
    };

    itemChange = event => {
        const data = this.state.data.map(item =>
            item.siteId === event.dataItem.siteId
                ? { ...item, [event.field]: event.value }
                : item
        );

        this.setState({ data });
    };

    addNew = () => {
        const newDataItem = { inEdit: true };
        const dataItem = { inEdit: true };

        dataItem.inEdit = true;

        //const data = insertItem(dataItem);
        // this.setState({
        //     data: data
        // });



        const data = [...this.state.data];

        // dataItem.inEdit = undefined;
        dataItem.id = this.generateId(data);

        data.unshift(dataItem);
        this.setState({
            data: [...this.state.data]
        });
        dataItem.createdBy = sessionStorage.getItem("username")

        console.log(dataItem)
        addRecord(dataItem).then(res => {
            if (res.status === 200) {
                alert(res.data)
                this.setState({
                    data: [newDataItem, ...this.state.data]
                });
            }
            else {
                alert("Error Occurred.")
            }
        })
            .catch(err => {
                alert(err);
                this.setState({
                    redirect: true
                })
            })


    };

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
        console.log('')
    };
    

    render() {

        
        const { data } = this.state.data;

        return (
            <div className="Login">
               
                <div>
                <h3>Welcome, {this.state.username}</h3>
                <button
                    role="button"
                    className="button"

                >
                    <Link to="/" onClick={() => { sessionStorage.clear() }} >
                        <span> Logout</span>
                    </Link>
                </button>

                <ReactDataGrid
                            columns={this.state.columns}
                            rowGetter={i => this.state.rows[i]}
                            rowsCount={3}
                            minHeight={150}
                        />
                <Grid
                    style={{ height: "620px", padding: "120px" }}
                    data={this.state.data}
                    onItemChange={this.itemChange}
                    editField={this.editField}
                >
                    <GridToolbar>
                        <button
                            title="Add new"
                            className="k-button k-primary"
                            onClick={this.addNew}
                        >
                            Add new
          </button>
                    </GridToolbar>
                    <Column field="pwdId" title="Password Id" width="90px" editable={false} />
                    <Column field="siteName" title="Site Name" width="200px" />
                    <Column
                        field="siteUserName"
                        title="Site UserName"
                        width="150px"
                    />
                    <Column
                        field="sitePwd"
                        title="Site Password"
                        width="150px"
                    />

                    <Column cell={this.CommandCell} width="180px" />
                </Grid>

                </div>

                
            </div>
        );
    }


    generateId = data => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;
    removeItem(data, item) {
        let index = data.findIndex(p => p === item || item.id && p.id === item.id);
        if (index >= 0) {
            data.splice(index, 1);
        }
    }
}
