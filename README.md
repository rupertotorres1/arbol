Temporary MacOS instructions while I figure out how to deploy:

1. Install homebrew if you haven’t already: `$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. Install postgresql for the database: `$ brew install postgresql`
3. Create the local db: `$ createdb todo-tree-dev`
4. Clone github project:`$ git clone git@github.com:rupertotorres1/todo-tree.git`
5. Go to backend/config/config.json and in the “development” config, substitute the “username” value (currently “ruperto”) with your computer’s username. HINT: get your username with `$ id -un`
6. Go to the backend directory in the terminal, then run the db migrations: `$ ./node_modules/.bin/sequelize db:migrate`
7. Go to the root directory in the terminal, then run: `$ npm start`
8. Go to localhost:3000 in the browser

Created with the help of the following articles/posts, among others:

- <https://medium.com/jtribe/node-js-in-2018-full-stack-tutorial-with-koa-react-redux-sagas-and-mongodb-14a7efaee4d4>
- <https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize>
- <https://mherman.org/blog/user-authentication-with-passport-and-koa/>
- <https://github.com/reduxjs/redux/pull/1269>
