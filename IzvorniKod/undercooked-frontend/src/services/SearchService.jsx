import { myFetch } from "../functions/myFetch";

const URL = "/api/recipes/search?"


export default class SearchService {
    constructor() {
        this.getResults = this.getResults.bind(this);
    }
    getResults(params) {
        if (params === "category=All") {
            return myFetch("/api/recipes", {
                method: "GET",
                mode: "cors"
            }, false)
        }
        return myFetch(URL + params, {
            method: "GET",
            mode: "cors"
        }, false)
    }
}