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
