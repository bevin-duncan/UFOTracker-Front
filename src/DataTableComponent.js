

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
    name: 'City Latitude',
    selector: row => row.city_latitude,
  },
  {
    name: 'City Logitude',
    selector: row => row.city_longitude,
  },
];
