import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import Tooltip from '@material-ui/core/Tooltip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddressesIcon from '@material-ui/icons/ImportContacts'
import Typography from '@material-ui/core/Typography';

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data})
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    deleteUser(userId) {
        ApiService.deleteUser(userId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user._id !== userId)});
           })
    }

    editUser(id) {
        window.localStorage.setItem("customerId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("customerId");
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Meus clientes</Typography>

                <Tooltip title="Cadastrar cliente">
                    <Fab color="secondary" aria-label="add">
                        <AddIcon onClick={() => this.addUser()}>
                            Cadastrar
                        </AddIcon>
                    </Fab>
                </Tooltip>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Nome</TableCell>
                            <TableCell align="right">Cpf</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Telefone</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.document}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right" onClick={() => this.editUser(row._id)}>
                                    <Tooltip title="Alterar">
                                        <EditIcon />
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="right" onClick={() => this.editUser(row._id)}>
                                    <Tooltip title="Endereços">
                                        <AddressesIcon />
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="right" onClick={() => this.deleteUser(row._id)}>
                                    <Tooltip title="Excluir">
                                        <DeleteIcon />
                                    </Tooltip>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListUserComponent;