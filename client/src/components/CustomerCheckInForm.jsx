import  React from "react";

// for making get post request at the server
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

    //handling form submit and saving the data of customer in the database
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

        //calling a post request and saving the data into the database
        axios
            .post('/customer/checkinform', details)
            .then((res) => console.log(res))
            .catch(err => {
                console.error(err);
            });

    };

    // changes the state "name" and calls a callback
    changeName = (event) => {
        this.setState({name: event.target.value},() => {console.log(this.state.name)});
    };

    // changes the state "email" and calls a callback
    changeEmail = (event) => {
        this.setState({email: event.target.value}, () => {console.log(this.state.email)});
    };

    // changes the state "phoneno" and calls a callback
    changePhoneNo = (event) => {
        this.setState({phoneno: event.target.value}, () => {console.log(this.state.phoneno)});
    };

    // changes the state "checkintime" and calls a callback
    changeCheckInTime = (event) => {
        this.setState({checkintime: event.target.value}, () => {console.log(this.state.checkintime)});
    };

    // changes the state "hostId" and calls a callback
    changehost = (event) => {
        this.setState({hostId: event.target.value}, () => {console.log(this.state.hostId)});
    };

    render() {
        return (
            <div className="customerOptions">
                {/* handling the form submit */}
                <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="name" sm={2}>Name</Label>
                        </Col>
                        <Col sm={8}>
                            {/* changes the state "name" on every change */}
                            <Input type="text" ref="name" name="name" id="name" value={this.state.name} onChange={this.changeName} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="email" sm={2}>Email</Label>
                        </Col>
                        <Col sm={8}>
                            {/* changes the state "email" on every change */}
                            <Input type="email" ref="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.changeEmail} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="phonenumber" sm={2}>Phone Number</Label>
                        </Col>
                        <Col sm={8}>
                            {/* changes the state "phoneno" on every change */}
                            <Input type="tel" ref="phoneno" name="phonenumber" id="phonenumber" value={this.state.phoneno} onChange={this.changePhoneNo} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="checkintime" sm={2}>Checkin Time</Label>
                        </Col>
                        <Col sm={8}>
                            {/* changes the state "checkintime" on every change */}
                            <Input type="datetime-local" ref="checkintime" name="checkintime" id="checkintime" value={this.state.checkintime} onChange={this.changeCheckInTime} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="hostId" sm={2}>hostId</Label>
                        </Col>
                        <Col sm={8}>
                            {/* changes the state "hostId" on every change */}
                            <Input type="number" ref="hostId" name="hostId" id="hostId" value={this.state.hostId} onChange={this.changehost} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            {/* submits the form and call the function handleFormSubmit */}
                            <Button type="submit">Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default CustomerCheckInForm;
