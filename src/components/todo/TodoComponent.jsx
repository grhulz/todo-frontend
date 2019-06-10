import React, {Component} from "react";
import moment from "moment";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'

class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: 'Learn to dance',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }
    onSubmit(values){
        console.log(values)
    }
    validate(values){
        let errors = {}
        if(!values.description){
            errors.description = 'Please enter a descripiton'
        }else if (values.description.length < 5){
            errors.description = 'Please enter at least 5 characters for the description'
        }
        if(!moment(values.targetDate).isValid){
            errors.targetDate = 'Please enter a valid date'
        }
        return errors
    }

    componentDidMount() {
        TodoDataService.
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
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name='description' component='div' className='alert alert-warning'/>
                                    <ErrorMessage name='targetDate' component='div' className='alert alert-warning'/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field  className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field  className='form-control' type='date' name='targetDate'/>
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
