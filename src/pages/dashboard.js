import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Row, Grid, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import moment from 'moment';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CallIcon from '@material-ui/icons/Call';
import MoreIcon from '@material-ui/icons/More';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import Layout from '../components/layout';
import { typeToText } from '../utils/string';
import { getCustomerList, getRequestList } from '../actions';

const Wrapper = styled.div`
  margin-top: 80px;
  height: 60vh;
  text-align: center;
  padding-top: 30vh;
`;

class DashboardPage extends Component {
  state = {
    user: null,
    showDetail: false,
    selected: null,
  }

  handleShowDetail = (selected) => {
    this.setState({ showDetail: true, selected });
  }

  handleHideDetail = () => {
    this.setState({ showDetail: false, selected: null });
  }

  componentDidMount = async () => {
    const data = await localStorage.getItem('netlify-cms-user');
    const user = JSON.parse(data);
    this.setState({ user });
    if (user && user.is_admin) {
      this.props.getRequestList();
      this.props.getCustomerList();
    }
  }

  render() {
    const { pageContext: { locale }, customerList, requestList } = this.props;
    const { user, showDetail, selected } = this.state;

    if (!user) {
      return (
        <Layout locale={locale}>
          <Wrapper>
            <h1>CHƯA ĐĂNG NHẬP</h1>
            <p>Nếu là người quản lý, hãy đăng nhập tại <a target='__blank' href='/admin/?no-cache=1' style={{ color: '#D5B05F' }}>trang quản trị</a> và quay trở lại.</p>
          </Wrapper>
        </Layout>
      );
    }

    return (
      <Layout locale={locale}>
        <Grid fluid style={{ minHeight: 'calc(100vh - 120px)', maxWidth: 1200, margin: '120px auto 0' }}>
          <Row>
            <Col style={{ maxHeight: 'calc(100vh - 140px)', overflow: 'scroll' }} lg={4} md={12}>
              <Paper elevation={1}>
                <List dense subheader={<ListSubheader>Khách hàng</ListSubheader>}>
                  {customerList.map(customer => (
                    <ListItem key={customer._id} button>
                      <ListItemAvatar>
                        <Avatar
                          alt={customer.name}
                          style={{ color: '#FFF', backgroundColor: '#D5B05F' }}
                          // src={`/static/images/avatar/${customer + 1}.jpg`}
                        >
                          {customer.name.charAt('0')}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={customer.name} secondary={customer.phone} />
                      <ListItemSecondaryAction>
                        <IconButton style={{ color: '#D5B05F' }} onClick={() => window.open(`tel:${customer.phone}`)}>
                          <CallIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Col>
            <Col lg={8} md={12}>
              <Paper elevation={1}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tiêu đề</TableCell>
                      <TableCell>Dịch vụ</TableCell>
                      <TableCell>Khách hàng</TableCell>
                      <TableCell align="right">Ngày tạo</TableCell>
                      <TableCell>Chi tiết</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestList.map(row => {
                      return (
                        <TableRow key={row._id}>
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell>{typeToText(row.type, 'vn')}</TableCell>
                          <TableCell>{row.customer.name}</TableCell>
                          <TableCell align="right">{moment(row.createdAt).fromNow()}</TableCell>
                          <TableCell>
                            <IconButton style={{ color: '#D5B05F' }} onClick={() => this.handleShowDetail(row._id)}>
                              <MoreIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Col>
          </Row>
          {requestList.map(row => (
            <Dialog
              key={row._id}
              open={showDetail && selected === row._id}
              onClose={this.handleHideDetail}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">{row.title}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Loại: <strong>{typeToText(row.type, 'vn')}</strong><br />
                  Khách hàng: <strong>{row.customer.name}</strong> | <a style={{ color: '#D5B05F' }} href={`tel:${row.customer.phone}`}>{row.customer.phone}</a><br />
                  Ngày tạo: <strong>{moment(row.createdAt).fromNow()}</strong><br />
                  <Divider style={{ margin: '5px 0' }} />
                  Số khách: <strong>{row.customerCount}</strong><br />
                  {row.type === 'hotel'
                  ? (
                    <Fragment>
                      Ngày đến: <strong>{row.startDate}</strong><br />
                      Ngày đi: <strong>{row.endDate}</strong><br />
                    </Fragment>
                  ) : (
                    <Fragment>
                      Ngày sử dụng: <strong>{row.useDate}</strong><br />
                      Thời gian: <strong>{row.time}</strong><br />
                    </Fragment>
                  )}
                  <Divider style={{ margin: '5px 0' }} />
                  Trạng thái email: <strong>{row.mailStatus}</strong> {row.mailStatus === '200' && '(OK)'}<br />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleHideDetail} style={{ color: '#D5B05F' }} autoFocus>
                  Xong
                </Button>
              </DialogActions>
            </Dialog>
          ))}
        </Grid>
      </Layout>
    );
  }
}

export default connect(state => ({
  requestList: state.services.requestList,
  customerList: state.services.customerList,
}), {
  getCustomerList,
  getRequestList,
})(DashboardPage);
