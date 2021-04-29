import React from 'react';
// import { useLocation } from 'react-router-dom';
import NavAllOtherPages from './NavAllOtherPages/NavAllOtherPages';

const noop = () => {};

const NavBar: React.FC<{
  renderSearch: () => React.ReactElement;
  renderSecondaryElement: () => React.ReactElement;
  menuOpen?: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  renderSearch,
  renderSecondaryElement,
  menuOpen = false,
  setMenuOpen = noop,
}) => {
  return (
    <>
      {/* {isLocationPage ? (
        <NavLocationPage
          renderSecondaryElement={renderSecondaryElement}
          renderSearch={renderSearch}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      ) : ( */}
      <NavAllOtherPages
        renderSecondaryElement={renderSecondaryElement}
        renderSearch={renderSearch}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      {/* // )} */}
    </>
  );
};

export default NavBar;
