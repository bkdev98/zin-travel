import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { graphql } from 'gatsby';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'recompose';

import Layout from '../components/layout';
import Map from '../components/map';

const styles = () => ({
  outline: {
    padding: '14px 10px !important',
  },
  input: {
    fontSize: '16px !important',
  },
  button: {
    marginTop: 10,
    color: 'white',
    fontWeight: 400,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D4AF65',
    },
  },
});

const Wrapper = styled.div`
  margin-top: 80px;
`;

const Container = styled.div`
  margin: 0px auto;
  max-width: 1200px;
  height: 35vh;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(60, 60, 62, 0.1);
`;

const Inner = styled.div`
  position: absolute;
  top: -15vh;
  border-radius: 6px;
  width: 100%;
  height: 50vh;
  background-color: white;
  overflow: hidden;
`;

const Image = styled.div`
  width: 100%;
  height: 50vh;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  background-color: #D4AF65;
  border-radius: 6px 0px 0px;
  filter: brightness(80%);
  transition: all 0.4s ease;
  ${Inner}:hover & {
    filter: brightness(65%);
  }
`;

const Information = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
`;

const Title = styled.h1`
  color: white;
  font-size: 26px;
  margin-bottom: 20px;
  font-weight: 400;
`;

const ContactTitle = styled(Title)`
  color: #4A4A4A;
  text-align: center;
`;

const Meta = styled.p`
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  a {
    text-decoration: none;
    color: white;
    cursor: pointer;
    position: relative;
    text-transform: none;
    font-size: 18px;
    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease-in-out;
      transition-delay: 0.1s;
    }
    :hover::after {
      transform: scaleX(1);
      transition-delay: 0s;
    }
  }
`;

const Form = styled.form`
  padding: 25px;
`;

const ContactForm = ({ classes, fields, handleChange, handleSubmit, intl }) => (
  <Form onSubmit={handleSubmit}>
    <ContactTitle><FormattedMessage id='contact.title' /></ContactTitle>
    <Row>
      <Col sm={12} md={6}>
        <TextField
          label={intl.formatMessage({ id: 'contact.name' })}
          fullWidth
          value={fields.customerName}
          onChange={e => handleChange(e.target.value, 'customerName')}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            classes: {
              root: classes.input,
              input: classes.outline,
            },
          }}
        />
      </Col>
      <Col sm={12} md={6}>
        <TextField
          label={intl.formatMessage({ id: 'contact.phone' })}
          fullWidth
          value={fields.customerPhone}
          onChange={e => handleChange(e.target.value, 'customerPhone')}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            step: 300,
            classes: {
              root: classes.input,
              input: classes.outline,
            },
          }}
        />
      </Col>
    </Row>
    <TextField
      label={intl.formatMessage({ id: 'contact.email' })}
      fullWidth
      value={fields.customerEmail}
      onChange={e => handleChange(e.target.value, 'customerEmail')}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        classes: {
          root: classes.input,
          input: classes.outline,
        },
      }}
    />
    <TextField
      label={intl.formatMessage({ id: 'contact.content' })}
      multiline
      line
      fullWidth
      rows={6}
      rowsMax={6}
      value={fields.content}
      onChange={e => handleChange(e.target.value, 'content')}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        classes: {
          root: classes.input,
        },
      }}
    />
    <Button
      size='large'
      fullWidth
      color='primary'
      variant='contained'
      classes={{
        root: classes.button,
      }}
      onClick={handleSubmit}
    >
      <FormattedMessage id='contact.send' />
    </Button>
  </Form>
);

const InjectedForm = compose(injectIntl)(ContactForm);

class LienHePage extends Component {
  state = {
    fields: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      content: '',
    },
  }

  handleChange = (value, field) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value,
      },
    });
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    const { data: { info }, classes, pageContext: { locale } } = this.props;
    const { fields } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Layout locale={locale}>
          <Wrapper>
            <Map address={info.edges[0].node.address} />
            <Container>
              <Inner>
                <Grid fluid style={{ padding: 0 }}>
                  <Row>
                    <Col sm={12} md={6} lg={7} style={{ position: 'relative', height: '50vh' }}>
                      <Image image={info.edges[0].node.contactBackground} />
                      <Information>
                        <Title>{info.edges[0].node.companyName}</Title>
                        <Meta><FormattedMessage id='contact.address' />: <a>{info.edges[0].node.address}</a></Meta>
                        <Meta><FormattedMessage id='contact.phone' />: <a>{info.edges[0].node.phone}</a></Meta>
                        <Meta><FormattedMessage id='contact.email' />: <a>{info.edges[0].node.email}</a></Meta>
                      </Information>
                    </Col>
                    <Col sm={12} md={6} lg={5}>
                      <InjectedForm
                        fields={fields}
                        classes={classes}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                      />
                    </Col>
                  </Row>
                </Grid>
              </Inner>
            </Container>
          </Wrapper>
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(LienHePage);

export const pageQuery = graphql`
  query ContactQuery {
    info: allPagesYaml(filter: { companyName: { ne: null } }) {
      edges {
        node {
          companyName
          address
          phone
          email
          contactBackground
        }
      }
    }
  }
`;
