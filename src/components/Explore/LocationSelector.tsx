import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { Location } from 'common/locations';
import { getLocationLabel } from './utils';
import * as Styles from './LocationSelector.style';

const getFips = (location: Location) =>
  location.full_fips_code || location.state_fips_code;

const getOptionSelected = (option: Location, value: Location) =>
  getFips(option) === getFips(value);

const AutocompleteLocations: React.FC<{
  locations: Location[];
  selectedLocations: Location[];
  onChangeLocations: (
    event: React.ChangeEvent<{}>,
    newLocations: Location[],
  ) => void;
}> = ({ locations, onChangeLocations, selectedLocations }) => (
  <Autocomplete
    multiple
    options={locations}
    getOptionLabel={getLocationLabel}
    onChange={onChangeLocations}
    getOptionSelected={getOptionSelected}
    value={selectedLocations}
    renderInput={params => (
      <TextField
        variant="outlined"
        {...params}
        placeholder="Compare states or counties"
      />
    )}
  />
);

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
      {modalOpen ? (
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
      ) : null}
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
