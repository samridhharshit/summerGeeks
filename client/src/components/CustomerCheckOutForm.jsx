import  React from "react";

// basic structure import
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

// for redirecting get and post requests to the server
import axios from "axios";

class CustomerCheckOutForm extends React.Component {

    state = {
        name: '',
        email: '',
        phoneno: '',
        checkouttime: ''
    };

    handleFormSubmit = (event) => {
        event.preventDefault();

        const {name, checkouttime} = this.state;

        const details = {
            name,
            checkouttime
        };

        axios
            .post('/customer/submitcheckoutform', details)
            .then((res) => console.log(res))
            .catch(err => {
                console.error(err);
            });
    };

    changePhoneNo = (event) => {
        this.setState({phoneno: event.target.value}, () => {console.log(this.state.phoneno)});
    };

    changeCheckOutTime = (event) => {
        this.setState({checkouttime: event.target.value}, () => {console.log(this.state.checkouttime)});
    };

    //this function waits for the verification of phone number entered at the UI and responds to the feed accordingly
    checkForPresence = async (event) => {
        event.preventDefault();
        
        const phoneno = {
            phoneno : this.state.phoneno
        };

        // empty object
        let customer = {};

        // promise is called in order to get verification results from the server and then responds to it accordingly
        customer = await this.waitForChanges(phoneno);

        //if customer exists
        if(customer[0]) {
            
            //updates state of the "name" and "email" with the information received from the server
            this.setState({
                name: customer[0].customername,
                email: customer[0].email
            })
        }
        //if customer does not exist
        else
            console.log('Customer hasn\'t checked in yet!')
    };

    //this function calls a promise that retrieves the datas from the server side
     waitForChanges = (phoneno) => {
         return new Promise(function(resolve, reject) {

             //making a post request in order to verify phone number from the database
             axios
                 .post('/customer/checkoutform',phoneno)
                 .then((res) => {
                     resolve(res.data);
                 })
                 .catch(err => {
                     console.error(err);
                 });
         });
     };

    render() {
        return (
            <div className="customerOptions">
                <!-- checks for the presence of user by comparing the phone number entered by the user with the database                            serverside -->
                <Form onSubmit={this.checkForPresence}>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="phonenumber" sm={2}>Phone Number</Label>
                        </Col>
                        <Col sm={8}>
                            {/* updates the phone number on every change in the field at UI */}
                            <Input type="tel" name="phonenumber" id="phonenumber" value={this.state.phoneno} onChange=                                      {this.changePhoneNo} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            {/*submits the form and passing the phone number to the server to database verfication*/}
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
                {/* submits the checkout time entered by the customer by redirecting to the server side with the checkout                       information filled */}
                <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="name" sm={2}>Name</Label>
                        </Col>
                        <Col sm={8}>
                            {/* shows the name of the customer for UI verification also not changable */}
                            <Input type="text" ref="name" name="name" id="name" value={this.state.name} disabled required />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="email" sm={2}>Email</Label>
                        </Col>
                        <Col sm={8}>
                            {/* shows the email of the customer for UI verification also not changable */}
                            <Input type="email" ref="email" name="email" id="exampleEmail" value={this.state.email} disabled                                required />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row className="checkoutTime">
                        <Col sm={3}>
                            <Label for="checkouttime" sm={2}>CheckOut Time</Label>
                        </Col>
                        <Col sm={8}>
                            {/* takes the check out time from the customer and passes it to the server */}
                            <Input type="datetime-local" ref="checkouttime" name="checkouttime" id="checkouttime" value=                                    {this.state.checkouttime} onChange={this.changeCheckOutTime} required />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            {/* calls the handleSubmit function */}
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default CustomerCheckOutForm;
