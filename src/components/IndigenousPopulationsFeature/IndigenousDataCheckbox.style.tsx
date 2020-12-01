import styled from 'styled-components';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { COLOR_MAP } from 'common/colors';
import { NewIndicatorTag } from 'components/SummaryStats/SummaryStats.style';

export const Container = styled.div`
  display: flex;
  max-width: 750px;
  width: 100%;
  padding: 1.5rem 0;
  border-radius: 4px;
  color: ${COLOR_MAP.GRAY_BODY_COPY};

  strong {
    color: black;
  }

  span {
    color: ${COLOR_MAP.BLUE};
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;

export const CheckboxWrapper = styled.div`
  span {
    padding: 0 9px 0 0;
    align-items: flex-start;
  }
`;

export const CopyContainer = styled.div`
  a {
    color: ${COLOR_MAP.BLUE};
  }

  ${NewIndicatorTag} {
    color: white;
    cursor: default;
  }
`;

export const Checkbox = styled(MuiCheckbox)`
  svg {
    fill: ${COLOR_MAP.GRAY.DARK};
  }
`;
