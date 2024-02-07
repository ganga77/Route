import { useLoaderData } from 'react-router';

import EventsList from '../components/EventsList';

function EventsPage() {

    const data = useLoaderData(); // It will fetch the data

    const events = data.events; // Check in backend/routes/events. If we will go to localhost:3000/events then the data is stored in the events variable
  return (
    <>
    <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader(){
    const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({
        message: 'Could not load events', 
        status: 500}
))
  } else {
    return response;
  }
  }