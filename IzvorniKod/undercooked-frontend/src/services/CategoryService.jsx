import { myFetch } from "../functions/myFetch";

const URL = "/api/recipes/categories";

class CategoryService {
    constructor(props) {
        //this.setMessage = props.setMessage;
        this.get = this.get.bind(this);

    }
    get() {
        return myFetch(URL, {
            method: "GET",
            mode: "cors"
        }, false);
    }
}

export default CategoryService;