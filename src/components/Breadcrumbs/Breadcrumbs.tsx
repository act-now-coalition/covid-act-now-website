import React from 'react';
import * as Style from './Breadcrumbs.style';

export interface BreadcrumbItem {
  to: string;
  label: string;
}

const Breadcrumbs: React.FC<{ item: BreadcrumbItem }> = ({ item }) => {
  return (
    <nav aria-label="breadcrumbs">
      <Style.BreadcrumbLink to={item.to}>
        <Style.ArrowBackIcon fontSize="small" aria-hidden />
        {item.label}
      </Style.BreadcrumbLink>
    </nav>
  );
};
export default Breadcrumbs;
