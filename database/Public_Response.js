import { Model } from 'objection';

// Safer to use static async function instead of arrow functions for class methods as this refers to class not an instance
// Arrow functions do not bind their own this, so using them as class methods can lead to unexpected behavior
// and make it difficult to access class properties or methods.
class PublicResponse extends Model{

    static get tableName() {
        return 'PUBLIC_RESPONSE';
    };

    static get idColumn() {
        return 'ID';
    }

    static get jsonSchema() {
        return {
          type: 'object',
          required: ['MOVIE_ID', 'MOVIE_NAME', 'TOMATO_METER','AUDIENCE_SCORE','METACRITICAL','CINEMA_SCORE','DOMESTIC_RANKING','WORLD_WIDE_RANKING','PHASE_ID'],
          properties: {
            id: { type: 'integer' },
            movie_id: { type: 'integer' },
            movie_name: { type: 'string' },
            tomato_meter: { type: 'integer' },
            audience_score: { type: 'integer' },
            metacritical: { type: 'integer' },
            cinema_score: { type: 'string' },
            domestic_ranking: { type: 'integer' },
            world_wide_ranking: { type: 'integer' },
            phase_id: { type: 'integer' }
          }
        };
    };
}

export default PublicResponse;