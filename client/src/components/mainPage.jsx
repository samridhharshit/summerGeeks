import React from "react";
import {Button} from "reactstrap";

import HostForm from "./hostForm";
import CustomerOptions from "./customerOptions";

class MainPage extends React.Component {

    state = {
        showHostForm: false,
        showCustomerOptions: false
    };

    displayCustomerOptions = () => {
        this.setState({
            showCustomerOptions: true
            }, () => {console.log("state changed!")}
        )
    }

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
                        this.state.showCustomerOptions ?
                            <CustomerOptions /> :
                            <Button onClick={this.displayCustomerOptions}>customer!</Button>
                    }
                </div>
                <div className="host">
                    {
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