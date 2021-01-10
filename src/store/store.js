import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import client from "./modules/client";
import transaction from "./modules/transaction";
import auth from "./modules/auth";

export const store = new Vuex.Store({
    strict: true,
    modules: {
      client,
      transaction,
      auth,
    },
  }
)

