import EventForm from "../components/EventForm"
import { useLoaderData } from "react-router-dom"
export default function EditEventPage(){
    const data = useLoaderData();
    return <EventForm method='PATCH' event={data.event}/>
}