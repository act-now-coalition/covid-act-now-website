import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import { Modal } from '@material-ui/core';
import { Region } from 'common/regions';
import * as Styles from './LocationSelector.style';
import AutocompleteRegions, {
  getLocationLabel,
} from 'components/AutocompleteRegions';
import MenuButton from './Dropdown/MenuButton';
import { LockBodyScroll } from 'components/Dialog';

const LocationSelector: React.FC<{
  regions: Region[];
  selectedRegions: Region[];
  onChangeSelectedRegions: (newLocations: Region[]) => void;
  maxWidth: number;
}> = ({ regions, selectedRegions, onChangeSelectedRegions, maxWidth }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onChangeRegions = (
    event: React.ChangeEvent<{}>,
    newRegions: Region[],
  ) => {
    onChangeSelectedRegions(newRegions);
  };

  const onClickButton = () => setModalOpen(!modalOpen);
  const closeModal = () => setModalOpen(false);

  const regionNames = selectedRegions.map(getLocationLabel).join(', ');

  const id = uuidv4();

  return (
    <React.Fragment>
      <MenuButton
        onClick={onClickButton}
        menuLabel="Locations"
        buttonLabel={regionNames}
        maxWidth={maxWidth}
        ariaControlsId={id}
      />
      {modalOpen && (
        <>
          <LockBodyScroll />
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
              </Styles.ModalBody>
            </Styles.ModalContainer>
          </Modal>
        </>
      )}
    </React.Fragment>
  );
};

export default LocationSelector;
