import React, {useState, useEffect} from 'react';
import {render} from 'react-dom';
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Form from "./Form";
import Table from "./DataTableComponent";
import SearchBar from "./SearchBar"
import Header from "./Header"
import { Container } from 'semantic-ui-react';



const MAPBOX_TOKEN = 'pk.eyJ1Ijoicm95Z2JldiIsImEiOiJjbDFjYzRyYjcwMXU4M2RzNHphb3NpZzBlIn0.9eeP8zSUgqTVf-36OqYcEQ'; // Set your mapbox token here

function Root() {
  const [sightings, setSightings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [isPopupOpen, setIsPopupOpen] = useState({
    0: false,
  });
  const [viewState, setViewState] = useState({
    latitude: 47.741,
    longitude: -120.529,
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



  const filteredSightings = sightings.filter((sighting) => {
    return (
      sighting.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sighting.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sighting.shape.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const deleteSighting = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:9292/sighting/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(deletedSighting => onDeletedSighting(deletedSighting))
      
  };

  const onDeletedSighting = (sighting) => {
    alert(`Sighting ${sighting.id} deleted`)
    getSightings();
  }

  return (
    <div id="mainDisplay" className='ui fluid container'>
      <Header />
    <>
    <Container>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: "100%", height: 600, margin: "relative" }}
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
                  <h3>City: {sighting.city}</h3>
                  <h4>Shape: {sighting.shape}</h4>
                  <h4>Summary: {sighting.summary}</h4>
                  <h5>{sighting.date_time}</h5>
                </div>
                <button class="ui button" 
                onClick={(e) => deleteSighting(e, sighting.id)}>Delete
                </button>

                {/* <div className="button" onClick={(e) => deleteSighting(e, sighting.id)}>Delete</div> */}
              </Popup>
            )}
          </div>
        ))}
      </Map>
      </Container>
     <Form />
    <SearchBar searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}/>
    <Table data={filteredSightings} font="Arial"/>

      
    </>
    {/* // </Segment>
    // <Divider /> */}
    </div>
  );
}





// https://github.com/bevin-duncan/UFOTracker-Front




render(<Root />, document.body.appendChild(document.createElement('div')));

