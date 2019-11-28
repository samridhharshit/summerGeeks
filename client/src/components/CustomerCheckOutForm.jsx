import  React from "react";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
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

    checkForPresence = async (event) => {
        event.preventDefault();
        const phoneno = {
            phoneno : this.state.phoneno
        };

        let details = {};

        details = await this.waitForChanges(phoneno);
        console.log(details[0]);
        if(details[0]) {
            this.setState({
                name: details[0].customername,
                email: details[0].email
            })
        } else console.log('already checked out!')
    };

     waitForChanges = (phoneno) => {
         return new Promise(function(resolve, reject) {

             axios
                 .post('/customer/checkoutform',phoneno)
                 .then((res) => {
                     // console.log(res.data);
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
                <Form onSubmit={this.checkForPresence}>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="phonenumber" sm={2}>Phone Number</Label>
                        </Col>
                        <Col sm={8}>
                            <Input type="tel" name="phonenumber" id="phonenumber" value={this.state.phoneno} onChange={this.changePhoneNo} />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            {/*just flip from true to  false*/}
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="name" sm={2}>Name</Label>
                        </Col>
                        <Col sm={8}>
                            <Input type="text" ref="name" name="name" id="name" value={this.state.name} disabled required />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Label for="email" sm={2}>Email</Label>
                        </Col>
                        <Col sm={8}>
                            <Input type="email" ref="email" name="email" id="exampleEmail" value={this.state.email} disabled required />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup row className="checkoutTime">
                        <Col sm={3}>
                            <Label for="checkouttime" sm={2}>CheckOut Time</Label>
                        </Col>
                        <Col sm={8}>
                            <Input type="datetime-local" ref="checkouttime" name="checkouttime" id="checkouttime" value={this.state.checkouttime} onChange={this.changeCheckOutTime} required />
                        </Col>
                        <Col></Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            {/*just flip from true to  false*/}
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default CustomerCheckOutForm;