import React from "react";
import {login} from '../api/fetch';
import {Container, Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';

export default class UserLogin extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userLoggedIn: false,
            email: '',
            password: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    onSubmitForm(e) {
        e.preventDefault();
        login(this.state.email, this.state.password)
        .then(result => {
            console.log(result);
        })
    }

    render() {
        return(
            <Container className="register">
                <h2>Login</h2>
                <Form onSubmit={this.onSubmitForm}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChangeEmail}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChangePassword}/>
                    </FormGroup>

                    <Button color="primary">Login</Button>
                </Form>
                {this.state.registerSuccess ? <Alert color="success">Login Success</Alert> : <div></div>}
            </Container>
        )
    }
}