import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../navigation/NavBar/NavBar';
import './AdminPage.css';

const AdminPageTable = ({rows}) => (
  <div className="AdminPage-tableWrapper">
    <table className="AdminPage-table">
      <thead>
        {rows.length > 0 && <AdminPageTableHeader row={rows[0]} />}
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <AdminPageTableRow key={i} columns={row} />
        ))}
      </tbody>
    </table>
  </div>
);

const AdminPageTableHeader = ({row}) => <tr>{Object.keys(row).map(key => <th key={key} className="AdminPage-tableData">{key}</th>)}</tr>;

const AdminPageTableRow = ({columns}) => <tr>{Object.keys(columns).map(columnKey => <td key={columnKey} className="AdminPage-tableData">{columns[columnKey]}</td>)}</tr>;

const AdminPage = props => (
  <div className="AdminPage">
    <h1>Admin Console</h1>
    {props.dump && Object.keys(props.dump).map(key => (
      <div key={key}>
        <h3>{key}</h3>
        <AdminPageTable
          rows={props.dump[key]}
        />
      </div>
    ))}
    {props.serverLog && (
      <div>
        <h3>Server Log</h3>
        {props.serverLog}
      </div>
    )}
    {props.sshLog && (
      <div>
        <h3>SSH Log</h3>
        {props.sshLog}
      </div>
    )}
    <NavBar/>
  </div>
);

AdminPage.propTypes = {
  dump: PropTypes.object,
  serverLog: PropTypes.any,
  sshLog: PropTypes.any
};

export default AdminPage;