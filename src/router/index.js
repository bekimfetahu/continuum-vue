import Home from "../Components/Home";
import Clients from "../Components/Clients";
import Transactions from "../Components/Transactions";
import AddClient from "../Components/AddClient";
import EditClient from "../Components/EditClient";
import Login from "../Components/Login";
import Logout from "../Components/Logout";

function guard(to, from, next) {
  if (localStorage.getItem('access_token') !== null) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

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
    beforeEnter : guard,

  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients,
    beforeEnter : guard,
  },
  {
    path: '/clients/add',
    name: 'add_client',
    component: AddClient,
    beforeEnter : guard,
  },
  {
    path: '/clients/edit/:id',
    name: 'edit_client',
    component: EditClient,
    props: true,
    beforeEnter : guard,
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions,
    beforeEnter : guard,
  },
]
export default routes
