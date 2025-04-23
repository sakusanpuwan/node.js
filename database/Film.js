import knexdb from './knexdb.js';

// Safer to use static async function instead of arrow functions for class methods as this refers to class not an instance
// Arrow functions do not bind their own this, so using them as class methods can lead to unexpected behavior
// and make it difficult to access class properties or methods.
class Film {
    static table = 'FILMS';

    static async insert(filmData) {
        try {
            const result = await knexdb(this.table).insert(filmData);
            return result;
        } catch (error) {
            console.error('Error inserting film:', error);
            throw error;
        }
    }

    static async findAll() {
        try {
            const result = await knexdb(this.table).select('*');
            return result;
        } catch (error) {
            console.error('Error fetching films:', error);
            throw error;
        }
    }

    static async findAllTitles() {
        try {
            const result = await knexdb(this.table).select('TITLE');
            return result;
        } catch (error) {
            console.error('Error fetching film titles:', error);
            throw error;
        }
    }

    static async findByFilter(filters) {
        const query = knexdb(this.table).select('*');
        for (const key in filters) {
            query.where(key, filters[key]);
        }
        try {
            const result = await query;
            return result;
        } catch (error) {
            console.error('Error fetching films by filter: ' + JSON.stringify(filters), error);
            throw error;
        }
    }

    static async deleteByFilter(filters) {
        const query = knexdb(this.table).delete();
        for (const key in filters) {
            query.where(key, filters[key]);
        }
        try {
            const result = await query;
            return result;
        } catch (error) {
            console.error('Error deleting films by filter: ' + JSON.stringify(filters), error);
            throw error;
        }
    }
}

export default Film;