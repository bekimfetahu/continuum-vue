import Home from "../Components/Home";
import Clients from "../Components/Clients";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients,
  },
]
export default routes
