import React, { ChangeEvent } from 'react';
import {
  StyledFormGroup,
  StyledCheckbox,
  StyledFormControlLabel,
} from './EmailForm.style';
import { GrayBodyCopy } from 'components/NewLocationPage/Shared/Shared.style';

const DailyDownloadCheckbox: React.FC<{
  checkDailyDownload: boolean;
  onChangeDailyDownload: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ checkDailyDownload, onChangeDailyDownload }) => {
  return (
    <StyledFormGroup>
      <StyledFormControlLabel
        labelPlacement="end"
        control={
          <StyledCheckbox
            checked={checkDailyDownload}
            onChange={onChangeDailyDownload}
            name="check-daily-download"
          />
        }
        label={
          <GrayBodyCopy>
            Also send me daily news with the latest data and scientific
            findings.
          </GrayBodyCopy>
        }
      />
    </StyledFormGroup>
  );
};

export default DailyDownloadCheckbox;
