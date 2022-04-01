import React, {useState, useEffect} from 'react';
import {render} from 'react-dom';
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Form from "./Form";
import Table from "./DataTableComponent";
// import { Segment, Header, Divider } from 'semantic-ui-react';
// import Sightingorites from "./Sightingorites"


const MAPBOX_TOKEN = 'pk.eyJ1Ijoicm95Z2JldiIsImEiOiJjbDFjYzRyYjcwMXU4M2RzNHphb3NpZzBlIn0.9eeP8zSUgqTVf-36OqYcEQ'; // Set your mapbox token here

function Root() {
  // const initialisPopupOpen = {
  //   summary: "",
  //   city: "",
  //   state: "",
  //   shape: "",
  //   date_time: Date.now(),
  //   city_latitude: 0,
  //   city_longitude: 0
  // }
  const [sightings, setSightings] = useState([]);
  // const [Sightingorites, setSightingorites] = useState([])
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState({
    0: false,
  });
  const [viewState, setViewState] = useState({
    latitude: 47.7418,
    longitude: -120.5291,
    zoom: 6
  });
  

  
  useEffect(() => {
    getSightings()
  }, [])

  const getSightings = () => {
    fetch('http://localhost:9292/sightings')
    .then(res => res.json())
    .then(setSightings)
  }
  // useEffect(() => {
  //   fetch('http://localhost:9292/Sightingorites')
  //   .then(res => res.json())
  //   .then(setSightingorites)
  // }, [])


  

  // const togglePopup = (sighting) => {
  //   // e.preventDefault();
  //   setIsPopupOpen(sighting)
  //   // console.log(e.target.c);
  //   // setIsPopupOpen(!isPopupOpen);
  // }

  const deleteSighting = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:9292/sighting/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(deletedSighting => onDeletedSighting(deletedSighting))
    .catch(err => console.error(err.message))
      // setSightings(sightings.filter((sighting) => sighting !== sighting));
  };

  const onDeletedSighting = (sighting) => {
    alert(`Sighting ${sighting.id} deleted`)
    getSightings();
  }

  return (
    // <div className='ui fluid container'>
    // <Segment placeholder>
    //   <Header as='h2'>XTERRESTRIAL WA</Header>
    <>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: "100%", height: 400, margin: "auto" }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {sightings.map((sighting, index) => (
          <div key={sighting.id}>
            <Marker
              longitude={sighting.city_longitude} 
              latitude={sighting.city_latitude} 
              color="red" 
              onClick={() => setIsPopupOpen({ ...isPopupOpen, [sighting.id]: true })}
            />
            {isPopupOpen[sighting.id] && (
              <Popup key={index} longitude={sighting.city_longitude} latitude={sighting.city_latitude} closeOnClick={false} onClose={() => setIsPopupOpen(false)}>
                <div>
                  <h3>City:{sighting.city}</h3>
                  <h4>Shape:{sighting.shape}</h4>
                  <h4>Summary:{sighting.summary}</h4>
                  <h5>{sighting.date_time}</h5>
                </div>
                <div className="button" onClick={(e) => deleteSighting(e, sighting.id)}>Delete</div>
              </Popup>
            )}
          </div>
        ))}
      </Map>
     

      <Form />

      <Table data={sightings} />

      {/* <Sightingorites Sightingorites={Sightingorites}/> */}
    </>
    // </Segment>
    // <Divider />
    // </div>
  );
}





// https://github.com/bevin-duncan/UFOTracker-Front




render(<Root />, document.body.appendChild(document.createElement('div')));

