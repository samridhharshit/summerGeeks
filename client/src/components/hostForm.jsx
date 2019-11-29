import  React from "react";
// import axios for making the get and post request with react
import axios from 'axios';

// for creating basic structure of the UI
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class HostForm extends React.Component {
    state = {
        name : "",
        email : "",
        phoneno : ""
    };

    //this is called when the form is submitted
    handleFormSubmit = (event) => {
        event.preventDefault();

        const {name, email, phoneno} = this.state;

        const details = {
            name,
            email,
            phoneno
        };

        //using axios to make a post request at the server side and passing the details of the host
        axios
            .post('/host/formSubmit', details)
            .then((res) => console.log(res))
            .catch(err => {
                console.error(err);
            });
    };

    //updates the state "name" every time a new value is entered and calls a callback for check
    changeName = (event) => {
        this.setState({name: event.target.value},() => {console.log(this.state.name)});
    };

    //updates the state "email" every time a new value is entered and calls a callback for check
    changeEmail = (event) => {
        this.setState({email: event.target.value}, () => {console.log(this.state.email)});
    };

    //updates the state "phoneno" every time a new value is entered and calls a callback for check
    changePhoneNo = (event) => {
        this.setState({phoneno: event.target.value}, () => {console.log(this.state.phoneno)});
    };

    render() {
        return (
            //take host's details and transfer them to the server side
            <div className="hostForm">
                <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="name" sm={2}>Name</Label>
                        </Col>
                        <Col sm={8}>
                            {/* "changeName" calls a function that changes the state of "name" every time the value of the feild is updated */}
                            <Input type="text" ref="name" name="name" id="name" value={this.state.name} onChange={this.changeName} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="email" sm={2}>Email</Label>
                        </Col>
                        <Col sm={8}>
                            {/*"changeEmail" call a function that changes the state of "email" every time the value of the feild is updated*/}
                            <Input type="email" ref="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.changeEmail} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="phonenumber" sm={2}>Phone Number</Label>
                        </Col>
                        <Col sm={8}>
                            {/*"changePhoneNo" call a function that changes the state of "phonenumber" every time the value of the feild is updated*/}
                            <Input type="tel" ref="phoneno" name="phonenumber" id="phonenumber" value={this.state.phoneno} onChange={this.changePhoneNo} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            {/*submit button for submitting the form*/}
                            <Button type="submit">Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default HostForm;
