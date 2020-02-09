import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddUserComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            document: '',
            message: null
        }

        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        
        let customer = 
        {   
            name: this.state.name,
            email: this.state.email, 
            phone: this.state.phone, 
            document: this.state.document
        };

        ApiService.addCustomer(customer)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/users');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Adicionar Cliente</Typography>
                <form style={formContainer}>

                    <TextField placeholder="Nome" fullWidth margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>

                    <TextField placeholder="Email" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>

                    <TextField placeholder="Telefone" fullWidth margin="normal" name="phone" value={this.state.phone} onChange={this.onChange}/>

                    <TextField placeholder="Cpf" fullWidth margin="normal" name="document" value={this.state.document} onChange={this.onChange}/>

                    <Button variant="contained" color="primary" onClick={this.saveUser}>Salvar</Button>
                </form>
            </div>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style = {
    display: 'flex',
    justifyContent: 'center'

}

export default AddUserComponent;