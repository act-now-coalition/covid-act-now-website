import React from 'react';
import { useLocation } from 'react-router-dom';
import * as Style from './Breadcrumbs.style';

export interface BreadcrumbItem {
  to: string;
  label: string;
}

const Breadcrumbs: React.FC<{ pathItems: BreadcrumbItem[] }> = ({
  pathItems,
}) => {
  const { pathname } = useLocation();
  return (
    <Style.Breadcrumbs>
      {pathItems.map(({ to, label }) => (
        <Style.BreadcrumbLink
          to={to}
          key={to}
          activeClassName="active"
          isActive={() => pathname === to}
        >
          {label}
        </Style.BreadcrumbLink>
      ))}
    </Style.Breadcrumbs>
  );
};

export default Breadcrumbs;
