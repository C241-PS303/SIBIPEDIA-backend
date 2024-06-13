const Hapi = require('@hapi/hapi');


const sibiRoutes = require('./routes/sibiRoutes'); 
const authRoutes = require('./routes/authRoutes');


const init = async () => {
    const server = Hapi.server({
        port: 3002,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'] 
            }
        }

    });

    server.route(authRoutes);
    server.route(sibiRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
