import React from 'react';
import { TextButton } from 'components/ButtonSystem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { EventCategory } from 'components/Analytics';

export interface BreadcrumbItem {
  to: string;
  label: string;
}

const Breadcrumbs: React.FC<{ item: BreadcrumbItem }> = ({ item }) => {
  return (
    <TextButton
      to={item.to}
      startIcon={<ArrowBackIcon />}
      trackingCategory={EventCategory.LEARN}
      trackingLabel="Breadcrumbs"
    >
      {item.label}
    </TextButton>
  );
};
export default Breadcrumbs;
