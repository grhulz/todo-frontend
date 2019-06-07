import React, {Component} from "react";
import {Link} from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService.js";


class WelcomeComponent extends Component {
    constructor(props){
        super(props)
        this.retrieveWelcomMessage = this.retrieveWelcomMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state = {
            welcomeMessage:''
        }
    }
  render() {
    return (
        <>
          <h1>Welcome!</h1>
            <div className="container">
                Welcome {this.props.match.params.name}. You can manager your todos <Link to="/todos">here</Link>.
            </div>
            <div className="container">
                Click here to get a customized welcome message
                <button onClick={this.retrieveWelcomMessage} className='btn btn-success'>Get Welcome Message</button>
            </div>
            <div className="container">
                {this.state.welcomeMessage}
            </div>
        </>
    )
  }

    retrieveWelcomMessage(){
        // HelloWorldService.executeHelloWorldService()
        //     .then(response => this.handleSuccessfulResponse(response))
        // HelloWorldService.executeHelloWorldBeanService()
        //     .then(response => this.handleSuccessfulResponse(response))
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
  }
  handleSuccessfulResponse(response){
        this.setState({welcomeMessage:response.data.message})
  }
    handleError(error){
        // console.log(error.data.message)
        this.setState({welcomeMessage:error.response.data.message})
    }
}

export default WelcomeComponent
