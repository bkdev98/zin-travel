import React from 'react';
import styled from 'styled-components';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const Wrapper = styled.div`
  color: #D4AF65;
  font-size: 16px;
  display: flex;
  margin-top: ${props => (props.isMore ? 0 : '0px')};
  align-items: center;
  text-decoration: none !important;
  svg {
    font-size: 18px;
    margin-left: 6px;
  }
`;

const TruncateButton = ({ isMore }) => (
  <Wrapper isMore={isMore}>
    {isMore ? (
      <>
        <span>Xem thêm</span>
        <MdExpandMore />
      </>
    ) : (
      <>
        <span>Thu gọn</span>
        <MdExpandLess />
      </>
    )}
  </Wrapper>
);

export default TruncateButton;
