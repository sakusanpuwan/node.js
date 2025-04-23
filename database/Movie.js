import { Model } from 'objection';

// Safer to use static async function instead of arrow functions for class methods as this refers to class not an instance
// Arrow functions do not bind their own this, so using them as class methods can lead to unexpected behavior
// and make it difficult to access class properties or methods.
class Movie extends Model{

    static get tableName() {
        return 'MOVIES';
    };

    static get idColumn() {
        return 'MOVIE_ID';
    }

    static get jsonSchema() {
        return {
          type: 'object',
          required: ['MOVIE_NAME', 'RELEASE_DATE', 'MOVIE_DURATION','DIRECTOR','WRITER','PRODUCER','STATUS'],
          properties: {
            id: { type: 'integer' },
            movie_name: { type: 'string' },
            release_date: { type: 'string', format: 'date-time' }, // Updated for Oracle DATE
            director: { type: 'string' },
            writer: { type: 'string' },
            producer: { type: 'string' },
            status: { type: 'string' }
          }
        };
    };

}

export default Movie;