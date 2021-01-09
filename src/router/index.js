import Home from "../Components/Home";
import Clients from "../Components/Clients";
import Transactions from "../Components/Transactions";
import AddClient from "../Components/AddClient";

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
  {
    path: '/clients/add',
    name: 'add_client',
    component: AddClient,
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions,
  },
]
export default routes
