import { Styles } from 'react-select';

const styles: Styles = {
  control: (styles, { menuIsOpen }: { menuIsOpen?: boolean }) => {
    return {
      ...styles,
      borderTop: '1px solid #e3e3e3',
      borderLeft: '1px solid #e3e3e3',
      borderRight: '1px solid #e3e3e3',
      borderBottom: '1px solid #e3e3e3',
      borderRadius: menuIsOpen ? '3px 3px 0 0' : '3px',
      padding: '0.5rem 0.5rem',
      boxShadow: 'none',

      ':hover': {
        // @ts-ignore TS has trouble with this line :(
        ...styles[':hover'],
        borderTop: '1px solid #e3e3e3',
        borderLeft: '1px solid #e3e3e3',
        borderRight: '1px solid #e3e3e3',
        borderBottom: '1px solid #e3e3e3',
        boxShadow: 'none',
      },
    };
  },
  placeholder: styles => ({
    ...styles,
    marginLeft: '27px',
  }),
  input: styles => ({
    ...styles,
    '& input': {
      fontSize: '16px !important',
    },
  }),
  singleValue: styles => ({
    ...styles,
    marginLeft: '26px',
  }),
  menuList: styles => ({
    ...styles,
    padding: 0,
  }),
  menu: styles => ({
    ...styles,
    margin: 0,
    borderTop: 'none',
    borderLeft: '1px solid #e3e3e3',
    borderRight: '1px solid #e3e3e3',
    borderBottom: '1px solid #e3e3e3',
    boxShadow: 'none',
    borderRadius: '0 0 3px 3px',
  }),
  option: styles => {
    return {
      ...styles,
      borderTop: '1px solid #e3e3e3',
    };
  },
};

export default styles;
