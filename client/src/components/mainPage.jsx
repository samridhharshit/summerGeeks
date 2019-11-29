import React from "react";
// importing button tag from reactstrap
import {Button} from "reactstrap";

// importing host information details component
import HostForm from "./hostForm";

// importing component that gives options to the customer wheather to checkin or checkout
import CustomerOptions from "./customerOptions";

class MainPage extends React.Component {

    state = {
        showHostForm: false,
        showCustomerOptions: false
    };

    //sets the state "showCustomerOptions" to true enabling the user to have options for customer "checkin" or "checkout"
    displayCustomerOptions = () => {
        this.setState({
            showCustomerOptions: true
            }, () => {console.log("state changed!")}
        )
    }

    //sets the state "showHostForm" enabling the host to feed his information
    displayHostForm = () => {
      this.setState({
          showHostForm: true
      }, () => {console.log("state changed!")}
      )
    };

    render() {
        return (
            <div className="mainPage">

                <div className="customer">
                    {
                        //ternary operator to check if the "showCustomerOptions" is true then render the "CustomerOptions"                              component else show the button to enable the option
                        this.state.showCustomerOptions ?
                            <CustomerOptions /> :
                            <Button onClick={this.displayCustomerOptions}>customer!</Button>
                    }
                </div>
                <div className="host">
                    {
                        //ternary operator to check if the "showHostForm" is true then render the "HostForm"                                            component else show the button to enable the option
                        this.state.showHostForm ?
                            <HostForm /> :
                            <Button onClick={this.displayHostForm}>host!</Button>
                    }
                </div>
            </div>
        )
    }
}

export default MainPage;
