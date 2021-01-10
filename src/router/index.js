import Home from "../Components/Home";
import Clients from "../Components/Clients";
import Transactions from "../Components/Transactions";
import AddClient from "../Components/AddClient";
import EditClient from "../Components/EditClient";
import Login from "../Components/Login";
import Logout from "../Components/Logout";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
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
    path: '/clients/edit/:id',
    name: 'edit_client',
    component: EditClient,
    props: true,
  },

  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions,
  },
]
export default routes
