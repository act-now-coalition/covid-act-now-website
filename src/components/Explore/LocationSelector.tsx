import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { Location } from 'common/locations';
import * as Styles from './LocationSelector.style';
import AutocompleteLocations from 'components/AutocompleteLocations';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as ExploreStyles from './Explore.style';

const LocationSelector: React.FC<{
  locations: Location[];
  selectedLocations: Location[];
  onChangeSelectedLocations: (newLocations: Location[]) => void;
  hasMultipleLocations: boolean;
  normalizeData: boolean;
  setNormalizeData: React.Dispatch<React.SetStateAction<boolean>>;
  compareCopy: string;
}> = ({
  locations,
  selectedLocations,
  onChangeSelectedLocations,
  hasMultipleLocations,
  normalizeData,
  setNormalizeData,
  compareCopy,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [modalOpen, setModalOpen] = useState(false);

  const onChangeLocations = (
    event: React.ChangeEvent<{}>,
    newLocations: Location[],
  ) => {
    onChangeSelectedLocations(newLocations);
  };

  const onClickButton = () => setModalOpen(!modalOpen);
  const closeModal = () => setModalOpen(false);

  return isMobile ? (
    <React.Fragment>
      <Styles.ModalOpenButton
        variant="outlined"
        disableRipple
        disableFocusRipple
        disableTouchRipple
        onClick={onClickButton}
      >
        {compareCopy}
      </Styles.ModalOpenButton>
      {modalOpen && (
        <Modal open={modalOpen} onClose={closeModal}>
          <Styles.ModalContainer>
            <Styles.ModalHeader>
              <Grid container>
                <Grid item xs={9}>
                  <Styles.ModalTitle>{compareCopy}</Styles.ModalTitle>
                </Grid>
                <Grid item xs container justify="flex-end">
                  <Styles.DoneButton size="small" onClick={closeModal}>
                    Done
                  </Styles.DoneButton>
                </Grid>
              </Grid>
            </Styles.ModalHeader>
            <Styles.ModalBody>
              <AutocompleteLocations
                locations={locations}
                onChangeLocations={onChangeLocations}
                selectedLocations={selectedLocations}
              />
              {hasMultipleLocations && (
                <ExploreStyles.NormalizeDataContainer>
                  <Grid key="legend" item sm xs={12}>
                    <FormControlLabel
                      control={
                        <ExploreStyles.NormalizeCheckbox
                          checked={normalizeData}
                          onChange={() => {
                            setNormalizeData(!normalizeData);
                          }}
                          name="normalize data"
                          disableRipple
                          id="normalize-data-control"
                        />
                      }
                      label="Normalize Data"
                    />
                  </Grid>
                  <ExploreStyles.NormalizeSubLabel>
                    Per 100k population
                  </ExploreStyles.NormalizeSubLabel>
                </ExploreStyles.NormalizeDataContainer>
              )}
            </Styles.ModalBody>
          </Styles.ModalContainer>
        </Modal>
      )}
    </React.Fragment>
  ) : (
    <AutocompleteLocations
      locations={locations}
      onChangeLocations={onChangeLocations}
      selectedLocations={selectedLocations}
    />
  );
};

export default LocationSelector;
