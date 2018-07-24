import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <lable>{field.lable}</lable>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
        {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          lable="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          lable="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          lable="Post Content"
          name="content"
          component={this.renderField}
        />

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const error = {};

  if (!values.title) {
    error.title = 'Enter a title';
  }

  if (!values.categories) {
    error.categories = 'Enter a Categories!';
  }

  if (!values.content) {
    error.content = 'Enter a Content!';
  }

  return error;
}

export default reduxForm({
  validate,
  form: 'PostNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);
