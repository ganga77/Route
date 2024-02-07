import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/Error';
import EditEventPage from './pages/EditEventPage';
import EventDetailPage, {loader as eventLoader, action as deleteEvent} from './pages/EventDetailPage';
import EventsPage , {loader as eventsLoader} from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';
import RootLayout from './pages/Root';
import EventRootLayout from './pages/EventRoot';
import {action as manipulateEvents} from './components/EventForm.js'

const router = createBrowserRouter([
  {path: '/', element: <RootLayout />,
  errorElement: <ErrorPage />, 
  children: [
    {path: '', element: <HomePage />},
    {path: 'events', element: <EventRootLayout />, children: [
      {path: '', element: <EventsPage />, loader: eventsLoader},
      {path: ':eventId', element: <EventDetailPage />, loader: eventLoader, action: deleteEvent},
      {path: ':eventId/edit', element: <EditEventPage />, loader: eventLoader, action: manipulateEvents},
      {path: 'new', element: <NewEventPage />, action: manipulateEvents}
    ]},
    
  ]},
  
])
function App() {
  return <RouterProvider router={router}/>
}

export default App;
