export const typeToText = (type) => {
  switch (type) {
    case 'hotel':
      return 'Khách sạn';
    case 'golf':
      return 'Sân golf';
    case 'restaurant':
      return 'Nhà hàng';
    default:
      return type;
  }
};

export const typeToUrl = (type) => {
  switch (type) {
    case 'hotel':
      return '/khach-san';
    case 'golf':
      return '/san-golf';
    case 'restaurant':
      return '/nha-hang';
    default:
      return type;
  }
};
