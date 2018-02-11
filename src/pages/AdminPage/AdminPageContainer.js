import React, {Component} from 'react';
import axios from 'axios';
import AdminPage from './AdminPage';

class AdminPageContainer extends Component {

  async componentDidMount() {
    try {
      const {data: dump} = await axios.get('/log/dump');
      await this.setState({dump});
    } catch(error) {

    }

    try {
      const {data: serverLog} = await axios.get('/log/server.log');
      this.setState({serverLog});
    } catch(error) {

    }

    try {
      const {data: sshLog} = await axios.get('/log/ssh.log');
      this.setState({sshLog});
    } catch(error) {

    }
  }

  state = {
    dump: null,
    serverLog: null,
    sshLog: null
  };

  render() {
    return (
      <AdminPage
        {...this.state}
      />
    );
  }
}

export default AdminPageContainer;