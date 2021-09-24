
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('hobbies').del()
    .then(function () {
      // Inserts seed entries
      return knex('hobbies').insert([
        {id: 1, name: 'hobby1', description: "A hobby", "userId": 1},
        {id: 2, name: 'hobby2', description: "A hobby", "userId": 2},
      ]);
    });
};
