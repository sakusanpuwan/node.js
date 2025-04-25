import { Model } from 'objection';

// Safer to use static async function instead of arrow functions for class methods as this refers to class not an instance
// Arrow functions do not bind their own this, so using them as class methods can lead to unexpected behavior
// and make it difficult to access class properties or methods.
class Film extends Model{

    static get tableName() {
        return 'FILMS';
    };

    static get idColumn() {
        return 'ID';
    }

    static get jsonSchema() {
        return {
          type: 'object',
          required: ['TITLE', 'DURATION', 'RATING'],
          properties: {
            TITLE: { type: 'string' },
            DURATION: { type: 'integer' },
            RATING: { type: 'string' }
          }
        };
    };

}

export default Film;