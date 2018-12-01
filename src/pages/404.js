import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';

const Wrapper = styled.div`
  margin-top: 80px;
  height: 60vh;
  text-align: center;
  padding-top: 30vh;
`;

const NotFoundPage = () => (
  <Layout>
    <Wrapper>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Wrapper>
  </Layout>
);

export default NotFoundPage;
