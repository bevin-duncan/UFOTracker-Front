import React from 'react';
import { useForm } from 'react-hook-form';

function FormWithHook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

 

//  const baseUrl = "http://localhost:9292";
//  event.preventDefault();
//  fetch(baseUrl + "/sightings", {
//    method: "POST",
//    headers: {
//      "Content-Type": "application/json",
//    },
//    body: JSON.stringify(formState),
//  })
//    .then((res) => res.json())
//    .then((savedSighting) => {
//      onSubmitSighting(savedSighting);
//      setFormState(initialFormState);
//    })
//    .then((data) => {
//      history.push("/");
//    });




  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="Summary" {...register('summary')} />
      <input defaultValue="City"{...register('city')} />
      <input defaultValue="State"{...register('state')} />
      <input defaultValue="Shape of Craft"{...register('shape')} />
      <input type="datetime-local" defaultValue="Date and Time"{...register('date_time')} />
      <input defaultValue="City Latitude"{...register('city_latitude', { pattern: /\d+/ })} />
      <input defaultValue="City Longitude"{...register('city_longitude', { pattern: /\d+/ })} />
      <input type="submit" />
    </form>
  );
}

export default FormWithHook;