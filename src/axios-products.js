import axios from "axios";

const instance = axios.create({
  baseURL: "https://percentfragrance-default-rtdb.firebaseio.com/",
});

export default instance;
