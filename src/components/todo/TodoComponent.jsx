import React, {Component} from "react";
import moment from "moment";
import {ErrorMessage, Field, Form, Formik} from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    onSubmit(values) {
        let username = AuthenticationService.getUsername()
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo).then(
                () => {
                    this.props.history.push('/todos')
                }
            )

        } else {

            TodoDataService.updateTodo(username, this.state.id, todo).then(
                () => {
                    this.props.history.push('/todos')
                }
            )
        }

    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Please enter a descripiton'
        } else if (values.description.length < 5) {
            errors.description = 'Please enter at least 5 characters for the description'
        }
        if (!moment(values.targetDate).isValid) {
            errors.targetDate = 'Please enter a valid date'
        }
        return errors
    }

    componentDidMount() {
        let username = AuthenticationService.getUsername()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDatemoment).format('YYYY-MM-DD')
            }))
    }

    render() {
        let {description, targetDate} = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className='container'>
                    <Formik
                        initialValues={{description, targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name='description' component='div' className='alert alert-warning'/>
                                    <ErrorMessage name='targetDate' component='div' className='alert alert-warning'/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className='form-control' type='date' name='targetDate'/>
                                    </fieldset>
                                    <button type='submit' className='btn btn-success'>Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )

    }
}

export default TodoComponent
