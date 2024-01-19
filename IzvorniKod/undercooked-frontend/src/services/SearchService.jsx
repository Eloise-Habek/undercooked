import { myFetch } from "../functions/myFetch";

const URL = "/api/recipes/search?"


export default class SearchService {
    constructor() {
        this.getResults = this.getResults.bind(this);
    }
    getResults(params) {
        return myFetch(URL + params, {
            method: "GET",
            mode: "cors"
        }, false)
    }
}