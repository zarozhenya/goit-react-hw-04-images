import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { Formik } from 'formik';
import {
  StyledHeader,
  StyledForm,
  StyledField,
  StyledButton,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ photoName }, { resetForm }) => {
    onSubmit(photoName);
    resetForm();
  };
  return (
    <StyledHeader>
      <Formik initialValues={{ photoName: '' }} onSubmit={handleSubmit}>
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
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
