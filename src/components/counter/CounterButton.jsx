import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './Counter.css'


class CounterButton extends Component{

  constructor(){
    super();
  }

  render(){
    const style = {fontSize: "50px", padding: "15px 30px"};
    return(
        <div className="counterButton">
          <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
          <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
        </div>
    )
  }
}

CounterButton.defaultProps = {
  by : 1
}

CounterButton.propTypes = {
  by : PropTypes.number
}


export default CounterButton