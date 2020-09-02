import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { Location } from 'common/locations';
import * as Styles from './LocationSelector.style';
import AutocompleteLocations from 'components/AutocompleteLocations';

const LocationSelector: React.FC<{
  locations: Location[];
  selectedLocations: Location[];
  onChangeSelectedLocations: (newLocations: Location[]) => void;
}> = ({ locations, selectedLocations, onChangeSelectedLocations }) => {
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
      <Button
        variant="outlined"
        disableRipple
        disableFocusRipple
        disableTouchRipple
        onClick={onClickButton}
      >
        Compare
      </Button>
      {modalOpen && (
        <Modal open={modalOpen} onClose={closeModal}>
          <Styles.ModalContainer>
            <Styles.ModalHeader>
              <Grid container>
                <Grid item xs={9}>
                  <Styles.ModalTitle>Compare Locations</Styles.ModalTitle>
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
