export default {
  control: (styles, { menuIsOpen}) => {
    return {
      ...styles,
      borderTop: '1px solid black',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      borderBottom: '1px solid black',
      borderRadius: menuIsOpen ? '3px 3px 0 0' : '3px',
      padding: '0.5rem 0.5rem',
      boxShadow: 'none',

      ':hover': {
        ...styles[':hover'],
        borderTop: '1px solid black',
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
        boxShadow: 'none',
      },
    };
  },
  placeholder: (styles) => ({
    ...styles,
    marginLeft: '27px',
  }),
  singleValue: (styles) => ({
    ...styles,
    marginLeft: '26px',
  }),
  menuList: (styles, state) => ({
    ...styles,
    padding: 0,
  }),
  menu: (styles, state) => ({
    ...styles,
    margin: 0,
    borderTop: 'none',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    boxShadow: 'none',
    borderRadius: '0 0 3px 3px',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected}) => {
    return {
      ...styles,
      borderTop: '1px solid black',
    };
  },
};
