
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';

//import { sampleProducts } from './sample-products.jsx';
import { MyCommandCell } from './MyCommandCell.jsx';
import React, { Component } from 'react'

import { addRecord, getRecord } from "./PasswordDataCall.js";
import { Redirect } from 'react-router-dom';

import { orderBy } from '@progress/kendo-data-query';

export default class Testgrid extends React.Component {
    editField = "inEdit";
    CommandCell;



    constructor(props) {
        super(props);

        this.CommandCell = MyCommandCell({
            edit: this.enterEdit,
            remove: this.remove,
            add: this.add,
            discard: this.discard,
            update: this.update,
            cancel: this.cancel,
            editField: this.editField
        });
        this.state = {
            // data: [...sampleProducts],
            // fakedata:[...sampleProducts],
            data: [],
            userName: props.location.state.id,
            redirect: false,
            skip: 0,
            take: 5,
            sort: [
                { field: 'id', dir: 'asc' }
            ],
            showSelectColumn: false,

            isRequiredProperty: false,

        }
    }

    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }

    getData = () => {
        const json = { userName: this.state.userName }
        console.log("username in session::", json);

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
       
        this.getData();
    }

    enterEdit = (dataItem) => {
        this.setState({
            data: this.state.data.map(item =>
                item.id === dataItem.id ?
                    { ...item, inEdit: true } : item
            )
        });
    }



    discard = (dataItem) => {
        this.setState({ isRequiredProperty: false })
        const data = [...this.state.data];
        this.removeItem(data, dataItem);

        this.setState({ data });
    }
    cancel = (dataItem) => {
        this.setState({ isRequiredProperty: false })
        const data = [...this.state.data];
        const updatedItem = { ...dataItem, inEdit: undefined };

        this.updateItem(data, updatedItem);
        //this.updateItem(sampleProducts, updatedItem);

        this.setState({ data });
    }

    updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.id && p.id === item.id));
        if (index >= 0) {
            data[index] = { ...item };
        }
    }

    itemChange = (event) => {
        const data = this.state.data.map(item =>
            item.id === event.dataItem.id ?
                { ...item, [event.field]: event.value } : item
        );

        this.setState({ data });
    }

    addNew = () => {
        //const newDataItem = { inEdit: true, Discontinued: false };

        const newDataItem = { inEdit: true, tenantId: this.state.tenantId };

        this.setState({
            data: [newDataItem, ...this.state.data]
        });
    }

    cancelCurrentChanges = () => {
        const data = [...this.state.data];

        this.setState({ data });
    }

    //API Related functions
    remove = (dataItem) => {

        console.log("alert value----", window.confirm("Do You Want to Delete this Property?"))
        if (window.confirm("Do You Want to Delete this Property?")) {
            const data = [...this.state.data];
            this.removeItem(data, dataItem);
            //this.removeItem(sampleProducts, dataItem);

            this.setState({ data });

            //API for Remove the row
        //     removeConfig(dataItem).then(res => {
        //         if (res.status === 200) {
        //             alert(res.data)
        //         }
        //         else {
        //             alert("Error Occurred.")
        //         }
        //     })
        //         .catch(err => {
        //             alert(err);
        //             this.setState({
        //                 redirect: true
        //             })
        //         })
         }


    }

    add = (dataItem) => {
        console.log(dataItem.isActive, dataItem.property, dataItem.value)

        if (!dataItem.property) {
            //this is if means than if isActive is "empty" it will come in if or go to else
            this.setState({ isRequiredProperty: true })
        } else if (!dataItem.isActive) {
            this.setState({ isRequiredProperty: true })

        } else if (!dataItem.value) {
            this.setState({ isRequiredProperty: true })
        } else {
            //here it will come as soon as u fill the property 
            this.setState({ isRequiredProperty: false })
            const data = [...this.state.data];

           // dataItem.inEdit = undefined;
            dataItem.id = this.generateId(data);

            data.unshift(dataItem);
            this.setState({
                data: [...this.state.data]
            });
            dataItem.createdBy = sessionStorage.getItem("username")

            console.log(dataItem)
            // addConfig(dataItem).then(res => {
            //     if (res.status === 200) {
            //         alert(res.data)
            //     }
            //     else {
            //         alert("Error Occurred.")
            //     }
            // })
            //     .catch(err => {
            //         alert(err);
            //         this.setState({
            //             redirect: true
            //         })
            //     })

        }


    }

    update = (dataItem) => {
        console.log(dataItem.isActive, dataItem.property, dataItem.value)

        if (!dataItem.property) {
            //this is if means than if isActive is "empty" it will come in if or go to else
            this.setState({ isRequiredProperty: true })
        } else if (!dataItem.isActive) {
            this.setState({ isRequiredProperty: true })

        } else if (!dataItem.value) {
            this.setState({ isRequiredProperty: true })
        }
        else {
            this.setState({ isRequiredProperty: false })
            const data = [...this.state.data];
            const updatedItem = { ...dataItem, inEdit: undefined };

            this.updateItem(data, updatedItem);
            //this.updateItem(sampleProducts, updatedItem);

            this.setState({ data });
            // console.log(dataItem)
            dataItem.updatedBy = sessionStorage.getItem("username")

            console.log("Data for update Button::", dataItem)
            // updateConfig(dataItem).then(res => {
            //     if (res.status === 200) {
            //         alert(res.data)
            //     }
            //     else {
            //         alert("Error Occurred.")
            //     }
            // })
            //     .catch(err => {
            //         alert(err);
            //         this.setState({
            //             redirect: true
            //         })
            //     })
        }



    }



    render() {
      
        const { data } = this.state;
        const hasEditedItem = data.some(p => p.inEdit);

        if (data.length !== 0) {
            return (
                <>
                    {this.state.redirect && <Redirect to="/configbanks" />}
                  
                    <main className="main-container">
                        <div className="in-main">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 px-0">
                                        {/*============================== Right Main Column Starts ==================================*/}
                                        {/* ***************************************************************************************** */}
                                        <div className="right-main-column">
                                            <div className="right-col-container">
                                                {/*================================ Body code starts Here ===================================*/}
                                                <div className="main-content">
                                                    <div className="in-mcontainer">
                                                        {/*=============================== breadcrumb starts ===============================*/}
                                                        <div className="breadcrumb">
                                                            <ul className="lst-breadcrumb">
                                                                <li>
                                                                    <a href="#">Masters</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Config Master List</a>
                                                                </li>
                                                            </ul>
                                                            {/*.lst-breadcrumb*/}
                                                        </div>
                                                        {/* .breadcrumb */}
                                                        {/*=============================== breadcrumb ends ===============================*/}
                                                    </div>
                                                    {/* .in-mcontainer */}
                                                </div>
                                                <div className="grid-container">
                                                    <div className="grid-header">
                                                        <h2><b>{this.state.bankname} Bank Configuration List</b></h2>
                                                    </div>
                                                    <Grid
                                                        style={{ height: '520px' }}
                                                        data={orderBy(data.slice(this.state.skip, this.state.take + this.state.skip), this.state.sort)}
                                                        onItemChange={this.itemChange}
                                                        sortable
                                                        sort={this.state.sort}
                                                        onSortChange={(e) => {
                                                            this.setState({
                                                                sort: e.sort
                                                            });
                                                        }}
                                                        editField={this.editField}
                                                        //resizable
                                                        reorderable
                                                        skip={this.state.skip}
                                                        take={this.state.take}
                                                        total={data.length}
                                                        pageable={true}
                                                        onPageChange={this.pageChange}

                                                    >

                                                        <GridToolbar>
                                                            {this.state.isRequiredProperty ?

                                                                <div style={{
                                                                    color: "red", textAlign: "left",
                                                                    display: "block",
                                                                    fontSize: "0.8rem"
                                                                }}>*Kindly fill the empty property fields</div> : null
                                                            }
                                                            <button
                                                                title="Add new"
                                                                className="button"
                                                                onClick={this.addNew}
                                                                style={{ float: "right" }}
                                                            >
                                                                <img src="../images/icon/plus.png" />
                                                                    &nbsp;&nbsp;
                                                            Add New
                                                        </button>
                                                            {/* {hasEditedItem && (
                                                                    <button
                                                                        title="Cancel current changes"
                                                                        className="button secondary sm"
                                                                        onClick={this.cancelCurrentChanges}
                                                                        style={{float:"right"}}
                                                                    >
                                                                        Cancel current changes
                                                                    </button>
                                                                )} */}
                                                        </GridToolbar>
                                                        {this.state.showSelectColumn && <Column field="id" title="Configuration ID" width="180px" editable={false} />}
                                                        {this.state.showSelectColumn && <Column field="tenantId" title="Tenant Id" width="180px" editable={false} />}

                                                        <Column field="property" title="Property" />
                                                        <Column field="value" title="Value" />
                                                        <Column field="updatedBy" title="updated By" editable={false} />
                                                        <Column field="updatedTime" title="updated Time" editable={false} />
                                                        {/* <Column field="tenantId" title="Tenant ID" width="120px" editable={false} /> */}
                                                        <Column field="isActive" title="Status" width="120px" />

                                                        {/* <Column field="createdBy" title="Created By" />
    
                                                    <Column field="createdTime" title="Created Time" />
                                                    <Column field="updatedBy" title="updated By" />
                                                    <Column field="updatedTime" title="updated Time" /> */}



                                                        <Column cell={this.CommandCell} title="Action" width="340px" />
                                                    </Grid>


                                                </div>
                                                {/* .main-content */}
                                                {/*================================ Body code starts Ends ===================================*/}
                                                {/* ***************************************************************************************** */}
                                            </div>
                                            {/* .right-col-container */}
                                        </div>
                                        {/*  .right-main-column */}
                                        {/*============================== Right Main Column Ends ==========================================*/}
                                        {/* *********************************************************************************************** */}
                                    </div>
                                    {/*  col-12 */}
                                </div>
                                {/* row */}
                            </div>
                            {/* .container-fluid  */}
                        </div>

                        {/* .in-main */}
                    </main>
                </>
            );
        }
        else {
            return (
                <div>
                   
                    <div className="center">
                        <div className="loading_box">
                        </div>
                    </div>
                </div>
            )
        }


    }

    generateId = data => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

    removeItem(data, item) {
        let index = data.findIndex(p => p === item || item.id && p.id === item.id);
        if (index >= 0) {
            data.splice(index, 1);
        }
    }
}

