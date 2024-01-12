export default class CategoryService {
    categories = ["All", "GlavnoJelo", "Category 3", "Category 4"]
    constructor(props) {
        this.getCategories = this.getCategories.bind(this);
    }
    getCategories() {
        return this.categories;
    }
}