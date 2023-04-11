// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import NewEvent from './pages/NewEvent';
import { action as manipulateEventAction } from './components/EventForm';
import EditEvent from './pages/EditEvent';
import EventDetail, { loader as eventDetailLoader, action as deleteEventAction } from './pages/EventDetail';
import Root from './pages/Root';
import EventsRoot from './pages/EventsRoot';
import Error from './pages/Error';
import Newsletter, { action as newsletterAction } from './pages/Newsletter';
import Authentication, { action as authAction } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { tokenLoader, checkAuthLoader } from './util/auth';

const router = createBrowserRouter([
  {
    path: '/', element: <Root />, errorElement: <Error />, id: 'root', loader: tokenLoader, children: [
      { index: true, element: <Home /> },
      {
        path: 'events', element: <EventsRoot />, children: [
          { index: true, element: <EventsPage />, loader: eventsLoader },
          {
            path: ':eventId', id: 'event-detail', loader: eventDetailLoader, children: [
              { index: true, element: <EventDetail />, action: deleteEventAction },
              { path: 'edit', element: <EditEvent />, action: manipulateEventAction, loader: checkAuthLoader }
            ]
          },

          { path: 'new', element: <NewEvent />, action: manipulateEventAction, loader: checkAuthLoader },

        ]
      },
      { path: 'auth', element: <Authentication />, action: authAction },
      {
        path: 'newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      }

    ],
  },

]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
