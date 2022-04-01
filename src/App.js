import React, {useState, useEffect} from 'react';
import {render} from 'react-dom';
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DataTable from 'react-data-table-component';
import Form from "./Form"
import { Segment, Header, Divider } from 'semantic-ui-react';
import Favorites from "./Favorites"


const MAPBOX_TOKEN = 'pk.eyJ1Ijoicm95Z2JldiIsImEiOiJjbDFjYzRyYjcwMXU4M2RzNHphb3NpZzBlIn0.9eeP8zSUgqTVf-36OqYcEQ'; // Set your mapbox token here

function Root() {
  const [sightings, setSightings] = useState([]);
  const [favorites, setFavorites] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [viewState, setViewState] = useState({
    latitude: 47.7418,
    longitude: -120.5291,
    zoom: 6
  });
  

  
  useEffect(() => {
    fetch('http://localhost:9292/sightings')
    .then(res => res.json())
    .then(setSightings)
  }, [])

  // useEffect(() => {
  //   fetch('http://localhost:9292/favorites')
  //   .then(res => res.json())
  //   .then(setFavorites)
  // }, [])


  

const togglePopup = (sighting) => {
  setIsPopupOpen(!isPopupOpen);
}

// const deleteSighting = (sighting) => {
//     setSightings(sightings.filter((sighting) => sighting !== sighting));
//   };

  return (
    // <div className='ui fluid container'>
    // <Segment placeholder>
    //   <Header as='h2'>XTERRESTRIAL WA</Header>
    <>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: 800, height: 600}}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {sightings.map((sighting) => (
          <div>
          <Marker longitude={sighting.city_longitude} latitude={sighting.city_latitude} color="red" 
          onClick={()=>togglePopup(sighting)} 
          />
          <Popup longitude={sighting.city_longitude} latitude={sighting.city_latitude} isPopupOpen={isPopupOpen} >
            <div>
            <h3>{sighting.city}</h3>
            <h4>{sighting.summary}</h4>
            <h5>{sighting.date_time}</h5>
            </div>
          </Popup>

          </div>
        ))}
        
      </Map>
     

      <Form />

      {/* <DataTable
      columns={columns}
      data={sightings}
      selectableRows
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      /> */}

      {/* <Favorites favorites={favorites}/> */}
    </>
    // </Segment>
    // <Divider />
    // </div>
  );
}





// https://github.com/bevin-duncan/UFOTracker-Front




render(<Root />, document.body.appendChild(document.createElement('div')));

