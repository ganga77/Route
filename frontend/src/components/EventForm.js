import { useNavigate, Form, useNavigation, redirect } from 'react-router-dom';
import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const title=event ? event.title : '';
  const description=event ? event.description : '';
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting'
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={title} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={description}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        {isSubmitting ? <button>Submitting...</button> : <button>Save</button>}
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({request, params}) {
  const method = request.method;
  const data = await request.formData();
  const eventId = params.eventId;

  const eventData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description')
  }

  let url = 'http://localhost:8080/events';
  if(method === 'PATCH'){
    url = 'http://localhost:8080/events/' + eventId;
  }
  const response = await fetch(url, 
  {
      method: method,
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(eventData)
  } 
  )

  if (!response.ok) {
      throw new Response(JSON.stringify({
          message: `Failed to create the event`, 
          status: 500}
  ))
    }
    
    return redirect('/events')

    
}
