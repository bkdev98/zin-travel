import React, { Component } from 'react';
import styled from 'styled-components';
import { InstantSearch, Hits, SearchBox, RefinementList } from 'react-instantsearch-dom';
import 'instantsearch.css/themes/algolia.css';

import Layout from '../components/layout';
import ServiceCard from '../components/service-card';
import { typeToText } from '../utils/string';

const Wrapper = styled.div`
  margin-top: 80px;
`;

const Container = styled.div`
  margin: 0px auto;
  max-width: 1200px;
  min-height: 70vh;
  li {
    list-style: none;
  }
`;

const Title = styled.h3`
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 100px;
`;

const SearchResult = ({ hit }) => (
  <ServiceCard data={hit.frontmatter} slug={hit.fields.slug} />
);

class TimKiemPage extends Component {
  state = {
    searchText: '',
    searchType: '',
  }

  componentDidMount() {
    const { location } = this.props;
    location && location.state && this.setState({ // eslint-disable-line
      searchText: location.state.searchText,
      searchType: location.state.searchType,
    });
  }

  render() {
    const { searchText, searchType } = this.state;

    return (
      <Layout>
        <Wrapper>
          <Container>
            <InstantSearch
              appId='821C6FSL9S'
              apiKey='fc0438887ca2209be744aa9be251983b'
              indexName='dev_SERVICES'
            >
              <Title>Kết quả tìm kiếm</Title>
              <SearchBox
                defaultRefinement={searchText}
                translations={{ placeholder: 'Địa chỉ, khách sạn, thành phố' }}
              />
              <RefinementList
                attribute='frontmatter.type'
                defaultRefinement={[searchType]}
                operator='or'
                transformItems={items => items.filter(item => item.label.length).map(item => ({ ...item, label: typeToText(item.label) }))}
              />
              <Hits hitComponent={SearchResult} />
            </InstantSearch>
          </Container>
        </Wrapper>
      </Layout>
    );
  }
}

export default TimKiemPage;
