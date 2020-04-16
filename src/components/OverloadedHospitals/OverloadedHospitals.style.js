import styled from 'styled-components';

export const OverloadedHospitalsContainer = styled.div`
  width: 850px;

  a {
    color: #3bbce6;
    text-decoration: none;
  }

  table {
    width: 100%;
    clear: both;
    border: 1px solid #ccc;
    border-collapse: collapse;

    thead {
      background: #ccc; // dunno how to get this out of color standards
    }

    th,
    td {
      padding: 10px;
      margin: 0;
      width: auto;
      min-width: 50px;
      text-align: left;
    }

    td:last-child {
      width: 100px;

      // unsure how to target NavigateNextIcon more specifially in
      // styled-components paradigm
      svg {
        float: right;
      }
    }
  }
`;

export const LinkButton = styled.button`
  font-size: 1rem;
  color: #3bbce6;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
  margin: 0;
  padding: 0;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;
