
import React from 'react';
import DataTable from 'react-data-table-component';

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const columns = [
  {
      name: 'Summary',
      selector: row => row.summary,
  },
  {
      name: 'City',
      selector: row => row.city,
  },
  {
    name: 'State',
    selector: row => row.state,
  },
  {
      name: 'When',
      selector: row => row.date_time,
  },
  {
    name: 'Shape',
    selector: row => row.shape,
  },
  {
    name: 'Full Description',
    selector: row => row.text,
  },
  {
    name: 'City Latitude',
    selector: row => row.city_latitude,
  },
  {
    name: 'City Logitude',
    selector: row => row.city_longitude,
  },
];

const Table = ({data}) => {
  return (
    <DataTable
    columns={columns}
    data={data}
    expandableRows
    expandableRowsComponent={ExpandedComponent}
    />
  )
}

export default Table;