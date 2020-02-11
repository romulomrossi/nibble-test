import React, { Component } from 'react'
import ApiService from "../service/ApiService";
import MaterialTable from 'material-table';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';

class Addresses extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addresses: [],
            columns: [
                { 
                    title: 'Tipo', 
                    field: 'type',
                    lookup: {
                        'comercial': 'Comercial',
                        'residencial': 'Residencial',
                        'rural': 'Rural',
                        'casa_praia': 'Casa de praia'
                    }
                },
                { title: 'Cidade', field: 'city' },
                { title: 'Estado', field: 'state' },
                { title: 'Bairro', field: 'neighborhood' },
                { title: 'Cep', field: 'zipCode' },
                { title: 'Rua', field: 'street' },
                { title: 'Número', field: 'number'},
                { title: 'Complemento', field: 'additionalInfo' },
                { 
                    title: 'É Principal', 
                    field: 'isPrimary', 
                    render: rowData => rowData.isPrimary ? <CheckIcon /> : '',
                    lookup: {
                        true: 'Sim',
                        false: 'Não'
                    }
                }
            ],
            message: null
        }
        
        this.addAddress = this.addAddress.bind(this)
        this.removeAddress = this.removeAddress.bind(this)
        this.loadAddresses = this.loadAddresses.bind(this)
    }

    componentDidMount() {
        this.loadAddresses();
    }

    loadAddresses() {
        ApiService.fetchAddresses(this.props.customer._id)
            .then((res) => {
                this.setState({addresses: res.data})
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    addAddress(newAddress) { 
        return new Promise((resolve, reject) => {
            ApiService.addAddress(this.props.customer._id, newAddress)
                .then((res) => {
                    this.setState(prevState => ({
                        addresses: [...prevState.addresses, res.data]
                    }))
                    resolve();
                })
                .catch((err) => {
                    this.setState({message: err.message});
                    reject();
                })
        })
    }

    removeAddress(addressId) {
        return new Promise((resolve, reject) => {
            ApiService.deleteAddress(this.props.customer._id, addressId)
            .then(() => {
                this.setState({addresses: this.state.addresses.filter(address => address._id !== addressId)});
                resolve();
            })
            .catch((err) => {
                this.setState({message: err.message});
            })
        })
    }

    editAddress(newData) {
        return new Promise((resolve, reject) => {
            ApiService.editAddress(this.props.customer._id, newData._id, newData)
                .then(() => {
                    this.loadAddresses();
                    resolve();
                })
                .catch((err) => {
                    this.setState({message: err.message});
                    reject();
                })
        })
    }

    render() {
        var title = 'Endereços de ' + this.props.customer.name;
        return (
            <div>
                <Box m={1}>
                    <MaterialTable
                        title = { title }
                        options = { {search: false, paging: false } }
                        columns = { this.state.columns }
                        data = { this.state.addresses }
                        localization = {{
                            body: {
                                emptyDataSourceMessage: 'Nenhum endereço cadastrado',
                                addTooltip: 'Novo endereço',
                                editRow: {
                                    deleteText: 'Tem certeza que deseja excluir este endereço?'
                                }
                            },
                            header: {
                                actions: 'Ações'
                            }
                        }}
                        editable={{
                            onRowAdd: newData =>
                                this.addAddress(newData),
                            onRowUpdate: (newData, oldData) =>
                                 this.editAddress(newData),
                            onRowDelete: oldData => 
                                this.removeAddress(oldData._id)
                        }}
                    />
                </Box>
            </div>
        );
    }

}


export default Addresses;