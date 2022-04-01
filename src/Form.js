import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Form() {
  
  const defValues = {
    summary: "",
    city: "",
    state: "",
    shape: "",
    date_time: Date.now(),
    city_latitude: "",
    city_longitude: ""
  }
 
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    postSighting(data);
  }
 
  const postSighting = (data) => {
    const baseUrl = "http://localhost:9292";
    fetch(baseUrl + "/sightings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...data, date_time: new Date(data.date_time)}),
    })
      .then((res) => res.json())
      .then((savedSighting) => {
        console.log(savedSighting);
        reset({ ...defValues });
      }).catch((err) => {
        console.err(err.message);
      })
  }


  return (
    <div>
      <div id="submit-header">
    <h1>Submit a Sighting</h1>
    </div>
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Summary" {...register('summary')} />
      <input placeholder="City"{...register('city')} />
      <input placeholder="State"{...register('state')} />
      <input placeholder="Shape of Craft"{...register('shape')} />
      <input type="datetime-local" placeholder="Date and Time"{...register('date_time')} />
      <input type="number" step="0.001" placeholder="City Latitude" {...register('city_latitude')} />
      <input type="number" step="0.001" defaultValue = "-" placeholder="City Longitude" {...register('city_longitude')} />
      <input type="submit" />
    </form>
    </div>
  );
}

export default Form;