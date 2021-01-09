import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import client from "./modules/client";
import transaction from "./modules/transaction";

export const store = new Vuex.Store({
    strict: true,
    modules: {
      client,
      transaction,
    },
  }
)

