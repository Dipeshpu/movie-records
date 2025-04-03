/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {id: 1, email: 'test@gmail.com', name: 'test', password: 'test1'},
    {id: 2, email: 'test1@gmail.com', name: 'test1', password: 'test1'},
    {id: 3, email: 'test2@gmail.com', name: 'test2', password: 'test1'}
  ]);
};
