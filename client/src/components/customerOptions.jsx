import  React from "react";
import {Button} from "reactstrap";

import CustomerCheckInForm from "./CustomerCheckInForm";
import CustomerCheckOutForm from "./CustomerCheckOutForm";

class CustomerOptions extends React.Component {
    state = {
        showCustomerCheckInForm: false,
        showCustomerCheckOutForm: false,
        checkInDisplay: false,
        checkOutDisplay: false
    };

    handleCheckIn = () => {
        this.setState({showCustomerCheckInForm: true,
            checkOutDisplay: true});
    };

    handleCheckOut = () => {
        this.setState({showCustomerCheckOutForm: true,
            checkInDisplay: true})
    };



    render() {
        return (
            <div className="customerOptions">
                <div className={this.state.checkInDisplay ? 'checkin displaynone' : 'checkin'}>
                    {
                        this.state.showCustomerCheckInForm ?
                            <CustomerCheckInForm /> :
                            <Button onClick={this.handleCheckIn}>CheckIn</Button>
                    }
                </div>
                <div className={this.state.checkOutDisplay ? 'checkout displaynone' : 'checkout'}>
                    {
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