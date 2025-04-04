/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const generateUUID = require('../../utils/generate_uuid');
exports.up = function(knex) {
    const KEYPREFIX = "UR";
    const CRYPT_KEY_LEN_MIN = 5;
    const CRYPT_KEY_LEN_MAX = 10;
    return knex.schema.createTable('user', (table) => {
        table.string('id').primary().notNullable().defaultTo(generateUUID(KEYPREFIX, CRYPT_KEY_LEN_MIN, CRYPT_KEY_LEN_MAX));
        table.string('name').notNullable();
        table.string('email').unique();
        table.string('phone_no').unique();
        table.string('password').notNullable();
        table.boolean('is_admin').defaultTo(false);
        table.boolean('is_delete').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
