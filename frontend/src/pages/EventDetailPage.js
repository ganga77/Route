
import { useLoaderData, redirect } from "react-router-dom";
import EventItem from '../components/EventItem.js'
export default function EventDetailPage(){
    const data = useLoaderData();  //useLoaderData is used to get the result from fetch
    
    return <>
    <EventItem event={data.event}/> 
    </>
}

export async function loader({request, params}){
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw new Response(JSON.stringify({
        message: `Failed to load the event with ID ${id}`, 
        status: 500}
))
  } else {
    return response;
  }
  }

  //We are adding Delete action here instead of using it in child(EventItem).
  export async function action({params}){
    const id=params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Response(JSON.stringify({
            message: `Failed to delete the event with ID ${id}`, 
            status: 500}
    ))
      }
      return redirect('/events')
  }