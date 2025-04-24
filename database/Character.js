import { Model } from 'objection';

class Character extends Model {
  static get tableName() {
    return 'CHARACTERS';
  }

  static get idColumn() {
    return 'CHARACTER_ID';
  }
}

export default Character;