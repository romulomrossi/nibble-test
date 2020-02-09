import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class EditUserComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            email: '',
            phone: '',
            document: '',
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        ApiService.fetchUserById(window.localStorage.getItem("customerId"))
            .then((res) => {
                let customer = res.data;
                this.setState({
                    id: customer._id,
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    document: customer.document
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let customer = 
        {
            name: this.state.name,
            document: this.state.document,
            email: this.state.email,
            phone: this.state.phone
        };

        ApiService.editUser(this.state.id, customer)
            .then(res => {
                this.setState({message : 'User updated successfully.'});
                this.props.history.push('/users');
            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Alterar Cliente</Typography>
                <form>

                        <TextField placeholder="Nome" fullWidth margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>

                        <TextField placeholder="CPF" fullWidth margin="normal" name="document" value={this.state.document} onChange={this.onChange}/>
                        
                        <TextField placeholder="Email" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>

                        <TextField placeholder="Telefone" fullWidth margin="normal" name="phone" value={this.state.phone} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>

                </form>
            </div>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default EditUserComponent;