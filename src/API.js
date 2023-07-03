import axios from "axios";

export default axios.create({
    baseURL: "https://tournament-time.herokuapp.com/",
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': true,
    crossorigin: true,
})