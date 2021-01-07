import axios from "axios";

// to set API for PROD and DEV environments setup in config/dev.env.js and prod.env.js
const apiBaseURL = process.env.SERVER_API

export default {
  namespaced: true,
  
}
