import  React from "react";
import {Button} from "reactstrap";

// importing forms for checkin and checkout
import CustomerCheckInForm from "./CustomerCheckInForm";
import CustomerCheckOutForm from "./CustomerCheckOutForm";

class CustomerOptions extends React.Component {
    state = {
        showCustomerCheckInForm: false,
        showCustomerCheckOutForm: false,
        checkInDisplay: false,
        checkOutDisplay: false
    };

    //sets state of "showCustomerCheckInForm" to true
    handleCheckIn = () => {
        this.setState({showCustomerCheckInForm: true,
            checkOutDisplay: true});
    };

    //sets state of "showCustomerCheckOutForm" to true
    handleCheckOut = () => {
        this.setState({showCustomerCheckOutForm: true,
            checkInDisplay: true})
    };



    render() {
        return (
            <div className="customerOptions">
                <div className={this.state.checkInDisplay ? 'checkin displaynone' : 'checkin'}>
                    {
                        //if the state is true, redirects to the checkin component else shows a button to set it true
                        this.state.showCustomerCheckInForm ?
                            <CustomerCheckInForm /> :
                            <Button onClick={this.handleCheckIn}>CheckIn</Button>
                    }
                </div>
                <div className={this.state.checkOutDisplay ? 'checkout displaynone' : 'checkout'}>
                    {
                        //if the state is true, redirects to the checkin component else shows a button to set it true
                        this.state.showCustomerCheckOutForm ?
                            <CustomerCheckOutForm /> :
                            <Button onClick={this.handleCheckOut}>CheckOut</Button>
                    }
                </div>
            </div>
        )
    }
}

export default CustomerOptions;
