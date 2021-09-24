exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'example1', email: 'example1@example.com' },
        { id: 2, name: 'example2', email: 'example2@example.com' },
        { id: 3, name: 'example3', email: 'example3@example.com' },
      ]);
    });
};
