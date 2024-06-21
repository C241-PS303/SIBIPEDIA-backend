const Hapi = require('@hapi/hapi');


const sibiRoutes = require('./routes/sibiRoutes'); 
const authRoutes = require('./routes/authRoutes');
const QuizRoutes = require('./routes/QuizRoutes');


const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT||3000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'] 
            }
        }

    });

    server.route(authRoutes);
    server.route(sibiRoutes);
    server.route(QuizRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
