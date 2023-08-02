require('dotenv').config();
const Hapi = require('@hapi/hapi');

const albums_v1 = require('./api/albums_v1');
const AlbumsService_v1 = require('./services/postgres/AlbumsService_v1');
const AlbumsValidator_v1 = require('./validator/albums_v1');

const songs_v1 = require('./api/songs_v1');
const SongsService_v1 = require('./services/postgres/SongsService_v1');
const SongsValidator_v1 = require('./validator/songs_v1');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: songs_v1,
      options: {
        service: new SongsService_v1(),
        validator: SongsValidator_v1,
      },
    },
    {
      plugin: albums_v1,
      options: {
        service: new AlbumsService_v1(),
        validator: AlbumsValidator_v1,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
