import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    console.log(email, password);
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label htmlFor="email">Email</label>
          <Field className="form-control" name="email" component="input" type="email" />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password</label>
          <Field className="form-control" name="password" component="input" type="password" />
        </fieldset>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const InitializeFromStateForm = reduxForm({
  form: 'signin',  // a unique identifier for this form
})(Signin)

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(mapStateToProps, actions)(InitializeFromStateForm);
