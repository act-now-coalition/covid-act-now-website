import React from 'react';
import { useLocation } from 'react-router-dom';
import NavAllOtherPages from './NavAllOtherPages/NavAllOtherPages';
import NavLocationPage from './NavLocationPage/NavLocationPage';

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
  const { pathname } = useLocation();
  const isLocationPage = pathname.includes('/us');

  return (
    <>
      {isLocationPage ? (
        <NavLocationPage
          renderSecondaryElement={renderSecondaryElement}
          renderSearch={renderSearch}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      ) : (
        <NavAllOtherPages
          renderSecondaryElement={renderSecondaryElement}
          renderSearch={renderSearch}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
    </>
  );
};

export default NavBar;
