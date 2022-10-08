import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Formik } from 'formik';
import {
  StyledHeader,
  StyledForm,
  StyledField,
  StyledButton,
} from './Searchbar.styled';

export class Searchbar extends Component {
  handleSubmit = ({ photoName }, { resetForm }) => {
    this.props.onSubmit(photoName);
    resetForm();
  };
  render() {
    return (
      <StyledHeader>
        <Formik initialValues={{ photoName: '' }} onSubmit={this.handleSubmit}>
          <StyledForm>
            <StyledButton type="submit">
              <FaSearch size="20" />
            </StyledButton>

            <StyledField
              type="text"
              name="photoName"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </StyledForm>
        </Formik>
      </StyledHeader>
    );
  }
}
