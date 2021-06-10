import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from '@material-ui/core';
import { Region } from 'common/regions';
import * as Styles from './LocationSelector.style';
import AutocompleteRegions from 'components/AutocompleteRegions';
import MenuButton from './Dropdown/MenuButton';
import { LockBodyScroll } from 'components/Dialogs';
import { FilledButton } from 'components/ButtonSystem';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';

const LocationSelector: React.FC<{
  regions: Region[];
  selectedRegions: Region[];
  onChangeSelectedRegions: (newLocations: Region[]) => void;
  maxWidth: number;
  regionNamesMenuLabel: string;
}> = ({
  regions,
  selectedRegions,
  onChangeSelectedRegions,
  maxWidth,
  regionNamesMenuLabel,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onChangeRegions = (
    event: React.ChangeEvent<{}>,
    newRegions: Region[],
  ) => {
    onChangeSelectedRegions(newRegions);
  };

  const onClickButton = () => {
    if (!modalOpen) {
      trackEvent(
        EventCategory.EXPLORE,
        EventAction.OPEN_MODAL,
        'Trends location selector modal',
      );
    }
    setModalOpen(!modalOpen);
  };

  const closeModal = () => setModalOpen(false);

  const id = uuidv4();

  return (
    <React.Fragment>
      <MenuButton
        onClick={onClickButton}
        menuLabel="Locations"
        buttonLabel={regionNamesMenuLabel}
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
                  trackingCategory={EventCategory.NONE} // Setting to NONE since this isn't useful tracking, just including the props because they're required
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
