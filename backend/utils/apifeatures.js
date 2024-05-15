class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i' // case-insensitive
            }
        } : {};

        this.query = this.query.find({ ...keyword });

        return this; 
    }

    filter() {
        const queryCopy = { ...this.queryString };

        const excludedFields = ['keyword', 'page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryCopy[el]);

        // filter for price and rating
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryString));

        return this;
    }
}

module.exports = ApiFeatures;
