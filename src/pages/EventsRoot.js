import EventsNavigation from '../components/EventsNavigation';
import { Outlet } from 'react-router-dom';
function EventsRoot() {
return (
<>
    <EventsNavigation />
    <main><Outlet /> </main>
</>
);
};
export default EventsRoot;