import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import client from "./modules/client";
import axios from "axios";

const apiBaseURL = process.env.SERVER_API

export const store = new Vuex.Store({
    strict: true,
    modules: {
      client,
    },
  }
)


