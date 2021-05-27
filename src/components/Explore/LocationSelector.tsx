import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from '@material-ui/core';
import { Region } from 'common/regions';
import * as Styles from './LocationSelector.style';
import AutocompleteRegions, {
  getLocationLabel,
} from 'components/AutocompleteRegions';
import MenuButton from './Dropdown/MenuButton';
import { LockBodyScroll } from 'components/Dialog';
import { FilledButton } from 'components/ButtonSystem';
import { EventCategory } from 'components/Analytics';

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
            style={{ touchAction: 'none', display: 'flex' }}
          >
            <Styles.ModalContainer>
              <Styles.ModalHeader>
                <Styles.ModalTitle>
                  Compare states, counties, or metro areas
                </Styles.ModalTitle>
                <FilledButton
                  onClick={closeModal}
                  trackingLabel="Close trends modal"
                  trackingCategory={EventCategory.EXPLORE}
                >
                  Done
                </FilledButton>
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
