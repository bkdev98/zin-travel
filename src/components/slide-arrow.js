import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  :before {
    display: none;
  }
`;

const NextIcon = styled(MdNavigateNext)`
  font-size: 25px;
  color: #D4AF65;
`;

const PrevIcon = styled(MdNavigateBefore)`
  font-size: 25px;
  color: #D4AF65;
`;

const SlideArrow = ({ type, className, style, onClick }) => (
  <Wrapper
    className={className}
    style={style}
    onClick={onClick}
    role='button'
  >
    {type === 'next' ? <NextIcon /> : <PrevIcon /> }
  </Wrapper>
);

export default SlideArrow;
