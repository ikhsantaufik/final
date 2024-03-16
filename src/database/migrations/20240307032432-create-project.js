"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("project", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      date1: {
        type: Sequelize.DATE,
      },
      date2: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.TEXT,
      },
      reactjs: {
        type: Sequelize.BOOLEAN,
      },
      nodejs: {
        type: Sequelize.BOOLEAN,
      },
      java: {
        type: Sequelize.BOOLEAN,
      },
      javascript: {
        type: Sequelize.BOOLEAN,
      },
      image: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("project");
  },
};
