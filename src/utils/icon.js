import React from 'react';
import { MdWifi, MdHotTub, MdLocalLaundryService, MdAcUnit, MdApps } from 'react-icons/md';

export const getUtilityIcon = (icon) => {
  switch (icon) {
    case 'wifi':
      return <MdWifi />;
    case 'hot-water':
      return <MdHotTub />;
    case 'laundry':
      return <MdLocalLaundryService />;
    case 'air-conditioner':
      return <MdAcUnit />;
    default:
      return <MdApps />;
  }
};
