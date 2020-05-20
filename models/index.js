const S = require("sequelize");
const sequelize = new S("postgres://postgres:argentina09@localhost:5432/wiki", {
  logging: false,
  dialect: "postgres",
});

class User extends S.Model {}
class Page extends S.Model {}



Page.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    urlTitle: {
      type: S.STRING,
      allowNull: false,
    },
    content: {
      type: S.TEXT,
      allowNull: null,
    },
    status: {
      type: S.ENUM("open", "closed"),
    },
    date: {
      type: S.DATE,
      defaultValue: S.NOW,
    },
    route:{
     type:S.VIRTUAL,
      get(){return `/${this.urlTitle}`}  // Data.value     
    }
  },
  { sequelize, modelName: "page" }
);

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  { sequelize, modelName: "user" }
);


Page.belongsTo(User, { as: 'author' });

Page.addHook('beforeValidate', (page) =>{
    if (page.title) {
      return page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
  });




module.exports = { User: User, Page: Page , sequelize };
