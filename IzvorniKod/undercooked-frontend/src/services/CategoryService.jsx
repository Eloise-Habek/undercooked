import { myFetch } from "../functions/myFetch";

const URL = "/api/recipes/categories";

class CategoryService {
    constructor(props) {
        //this.setMessage = props.setMessage;
        this.get = this.get.bind(this);

    }
    async get() {
        const res = await fetch(URL, {
            method: "GET",
            mode: "cors"
        });
        return await await res.json();
    }
}

export default CategoryService;