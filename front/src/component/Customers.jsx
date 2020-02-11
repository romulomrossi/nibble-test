import React, { Component } from 'react'
import ApiService from "../service/ApiService";
import MaterialTable from 'material-table';
import ListAddresses from './Addresses';

class Customers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            columns: [
                { title: 'Nome', field: 'name' },
                { title: 'Cpf', field: 'document' },
                { title: 'Email', field: 'email' },
                { title: 'Telefone', field: 'phone' }
            ],
            message: null
        }
        
        this.removeCustomer = this.removeCustomer.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.reloadCustomers = this.reloadCustomers.bind(this);
    }

    componentDidMount() {
        this.reloadCustomers();
    }

    reloadCustomers() {
        ApiService.fetchCustomers()
            .then((res) => {
                this.setState({customers: res.data})
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    addCustomer(newCustomer) { 
        return new Promise((resolve, reject) => {
            ApiService.addCustomer(newCustomer)
                .then((res) => {
                    this.setState(prevState => ({
                        customers: [...prevState.customers, res.data]
                    }))
                    resolve();
                })
                .catch((err) => {
                    this.setState({message: err.message});
                    reject();
                })
        })
    }

    removeCustomer(customerId) {
        return new Promise((resolve, reject) => {
            ApiService.deleteCustomer(customerId)
            .then(() => {
                this.setState({customers: this.state.customers.filter(customer => customer._id !== customerId)});
                resolve();
            })
            .catch((err) => {
                this.setState({message: err.message});
            })
        })
    }

    editCustomer(newData) {
        return new Promise((resolve, reject) => {
            ApiService.editCustomer(newData._id, newData)
                .then(() => {
                    var oldCustomers = this.state.customers.filter(customer => customer._id !== newData._id);
                    this.setState({ customers: [...oldCustomers, newData] })
                    resolve();
                })
                .catch((err) => {
                    this.setState({message: err.message});
                    reject();
                })
        })
    }

    render() {
        return (
            <div>                  
                <MaterialTable
                    title="Meus clientes"
                    columns={this.state.columns}
                    data={this.state.customers}
                    localization = {{
                        toolbar: {
                            searchPlaceholder: 'Buscar'
                        },
                        body: {
                            emptyDataSourceMessage: 'Nenhum cliente cadastrado',
                            addTooltip: 'Novo cliente',
                            editRow: {
                                deleteText: 'Tem certeza que deseja excluir este cliente?'
                            }
                        },
                        header: {
                            actions: 'Ações'
                        }
                    }}
                    detailPanel={[
                        {
                            tooltip: 'Ver endereços',
                            render: rowData => { return <ListAddresses customer={rowData} /> }
                        }
                    ]}
                    editable={{
                        onRowAdd: newData =>
                            this.addCustomer(newData),
                        onRowUpdate: (newData, oldData) =>
                            this.editCustomer(newData),
                        onRowDelete: oldData => 
                            this.removeCustomer(oldData._id)
                    }}
                />
            </div>
        );
    }

}


export default Customers;