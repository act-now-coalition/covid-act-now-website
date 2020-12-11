import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { Region } from 'common/regions';
import * as Styles from './LocationSelector.style';
import AutocompleteLocations from 'components/AutocompleteLocations';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as ExploreStyles from './Explore.style';
import AutocompleteRegions from 'components/AutocompleteLocations/AutocompleteRegions';

const LocationSelector: React.FC<{
  regions: Region[];
  selectedRegions: Region[];
  onChangeSelectedRegions: (newLocations: Region[]) => void;
  normalizeData: boolean;
  setNormalizeData: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  regions,
  selectedRegions,
  onChangeSelectedRegions,
  normalizeData,
  setNormalizeData,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const hasMultipleLocations = selectedRegions.length > 1;

  const [modalOpen, setModalOpen] = useState(false);

  const onChangeRegions = (
    event: React.ChangeEvent<{}>,
    newRegions: Region[],
  ) => {
    onChangeSelectedRegions(newRegions);
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
        Compare states or counties
      </Styles.ModalOpenButton>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={closeModal}
          style={{ touchAction: 'none' }}
        >
          <Styles.ModalContainer>
            <Styles.ModalHeader>
              <Grid container>
                <Grid item xs={9}>
                  <Styles.ModalTitle>
                    Compare states or counties
                  </Styles.ModalTitle>
                </Grid>
                <Grid item xs container justify="flex-end">
                  <Styles.DoneButton size="small" onClick={closeModal}>
                    Done
                  </Styles.DoneButton>
                </Grid>
              </Grid>
            </Styles.ModalHeader>
            <Styles.ModalBody>
              <AutocompleteRegions
                regions={regions}
                onChangeRegions={onChangeRegions}
                selectedRegions={selectedRegions}
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
    <AutocompleteRegions
      regions={regions}
      onChangeRegions={onChangeRegions}
      selectedRegions={selectedRegions}
    />
  );
};

export default LocationSelector;
