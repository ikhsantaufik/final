"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "John@mail.com",
          password: "uhuy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dede",
          email: "Dede@mail.com",
          password: "super",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
