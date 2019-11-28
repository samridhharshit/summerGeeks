import  React from "react";
import axios from 'axios';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class CustomerCheckInForm extends React.Component {

    state = {
        name: '',
        email: '',
        phoneno: '',
        checkintime: '',
        hostId: ''
    };

    handleFormSubmit = (event) => {
        event.preventDefault();

        const {name, email, phoneno, checkintime, hostId} = this.state;

        const details = {
            name,
            email,
            phoneno,
            checkintime,
            hostId
        };

        axios
            .post('/customer/checkinform', details)
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

    changeCheckInTime = (event) => {
        this.setState({checkintime: event.target.value}, () => {console.log(this.state.checkintime)});
    };

    changehost = (event) => {
        this.setState({hostId: event.target.value}, () => {console.log(this.state.hostId)});
    };

    render() {
        return (
            <div className="customerOptions">
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
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="checkintime" sm={2}>Checkin Time</Label>
                        </Col>
                        <Col sm={8}>
                            <Input type="datetime-local" ref="checkintime" name="checkintime" id="checkintime" value={this.state.checkintime} onChange={this.changeCheckInTime} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="hostId" sm={2}>hostId</Label>
                        </Col>
                        <Col sm={8}>
                            <Input type="number" ref="hostId" name="hostId" id="hostId" value={this.state.hostId} onChange={this.changehost} />
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

export default CustomerCheckInForm;