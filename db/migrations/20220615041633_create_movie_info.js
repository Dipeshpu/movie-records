/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const generateUUID = require('../../utils/generate_uuid');
exports.up = function(knex) {
  const CRYPT_KEY_LEN_MIN = 5;
  const CRYPT_KEY_LEN_MAX = 10;
    return new Promise(async (resolve, reject) => {
        try {
          await knex.schema.createTable('genre', (table) => {
            table.string('id').primary().notNullable().defaultTo(generateUUID('GN', CRYPT_KEY_LEN_MIN, CRYPT_KEY_LEN_MAX));
            table.string('name').unique().notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
          });
          
          await knex.schema.createTable('movie', (table) => {
              table.string('id').primary().notNullable().defaultTo(generateUUID('MO', CRYPT_KEY_LEN_MIN, CRYPT_KEY_LEN_MAX));
              table.string('title').notNullable();
              table.string('lang').notNullable();
              table.time('duration');
              table.boolean('is_delete').defaultTo(false);
              table.date('release_date').defaultTo(knex.fn.now());
              table.timestamp('created_at').defaultTo(knex.fn.now());
              table.timestamp('updated_at').defaultTo(knex.fn.now());
              table.string('genre_id').references('id').inTable('genre');
          });
          await knex.schema.createTable('people', (table) => {
              table.string('id').primary().notNullable().defaultTo(generateUUID('PO', CRYPT_KEY_LEN_MIN, CRYPT_KEY_LEN_MAX));
              table.string('name').unique().notNullable();
              table.timestamp('created_at').defaultTo(knex.fn.now());
              table.timestamp('updated_at').defaultTo(knex.fn.now());
          });
    
          await knex.schema.createTable('movie_actor', (table) => {
              table.string('id').primary().notNullable().defaultTo(generateUUID('MA', CRYPT_KEY_LEN_MIN, CRYPT_KEY_LEN_MAX));
              table.string('actor_id').references('id').inTable('people');
              table.string('movie_id').references('id').inTable('movie');
              table.timestamp('created_at').defaultTo(knex.fn.now());
              table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
    
            await knex.schema.createTable('movie_director', (table) => {
              table.string('id').primary().notNullable().defaultTo(generateUUID('MD', CRYPT_KEY_LEN_MIN, CRYPT_KEY_LEN_MAX));
              table.string('director_id').references('id').inTable('people');
              table.string('movie_id').references('id').inTable('movie');
              table.timestamp('created_at').defaultTo(knex.fn.now());
              table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        resolve();
      }
      catch(error){
        reject(error);
      }
    })
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return new Promise(async (resolve, reject) => {
        try {
          await knex.schema.dropTable('movie_actor');
          await knex.schema.dropTable('movie_director');
          await knex.schema.dropTable('movie');
          await knex.schema.dropTable('people');
          await knex.schema.dropTable('genre');
          resolve();
        }
        catch(error){
          reject(error);
      }
    })
};
