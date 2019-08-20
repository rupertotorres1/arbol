Check it out at <https://https://arbol-app.herokuapp.com/>

How to run locally:

1. Install homebrew if you haven’t already: `$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. Install postgresql for the database: `$ brew install postgresql`
3. Create the local db: `$ createdb arbol-dev`
4. Clone github project:`$ git clone git@github.com:rupertotorres1/Arbol.git`
5. Go to backend/config/config.json and in the “development” config, substitute the “username” value (currently “ruperto”) with your computer’s username. HINT: get your username with `$ id -un`
6. Go to the backend directory in the terminal, then run the db migrations: `$ ./node_modules/.bin/sequelize db:migrate`
7. Go to the root directory in the terminal, then run: `$ npm run dev`
8. Go to localhost:3000 in the browser
