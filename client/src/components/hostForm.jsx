import  React from "react";
import axios from 'axios';

import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class HostForm extends React.Component {
    state = {
        name : "",
        email : "",
        phoneno : ""
    };

    handleFormSubmit = (event) => {
        event.preventDefault();

        const {name, email, phoneno} = this.state;

        const details = {
            name,
            email,
            phoneno
        };

        axios
            .post('/host/formSubmit', details)
            .then((res) => console.log(res))
            .catch(err => {
                console.error(err);
            });
    };

    changeName = (event) => {
        this.setState({name: event.target.value},() => {console.log(this.state.name)});
    };

    changeEmail = (event) => {
        this.setState({email: event.target.value}, () => {console.log(this.state.email)});
    };

    changePhoneNo = (event) => {
        this.setState({phoneno: event.target.value}, () => {console.log(this.state.phoneno)});
    };

    render() {
        return (
            <div className="hostForm">
                <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="name" sm={2}>Name</Label>
                        </Col>
                        <Col sm={8}>
                            <Input type="text" ref="name" name="name" id="name" value={this.state.name} onChange={this.changeName} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="email" sm={2}>Email</Label>
                        </Col>
                        <Col sm={8}>
                            <Input type="email" ref="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.changeEmail} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="phonenumber" sm={2}>Phone Number</Label>
                        </Col>
                        <Col sm={8}>
                            <Input type="tel" ref="phoneno" name="phonenumber" id="phonenumber" value={this.state.phoneno} onChange={this.changePhoneNo} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button type="submit">Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default HostForm;