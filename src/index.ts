import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./Resolvers/PostResolver";
import { UsuarioResolver } from './Resolvers/UsuarioResolver';
import { createClient } from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { Contexto } from './Contexto';



const Main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig); //conecta ao banco de dados
    await orm.getMigrator().up(); // Inicializa migrador que promoverá as alterações no banco de dados
    const app = Express(); //Cria e inicializa servidor express
  
    const redisStore = connectRedis(session);
    const redisClient = createClient({legacyMode: true});
    redisClient.connect().catch(console.error);

    app.use(
        session({
            name:'qid',
            store: new redisStore({
                client: redisClient as any,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
                httpOnly: true,
                sameSite: 'none',
                secure: true
            },
            saveUninitialized: false,
            secret:'djhasidgasifhaoijfgaps',
            resave: false
        })
    )

    const ServidorApollo = new ApolloServer({ //Criação de um servidor utilizando Apollo
        schema: await buildSchema({
            resolvers: [PostResolver,UsuarioResolver], //Resolvedores para entidades
            validate: false
        }),
        context: ({req, res}): Contexto => ({em: orm.em, req, res}) //Criação do contexto, onde este é o agente de entidades.
    });

    await ServidorApollo.start();
    ServidorApollo.applyMiddleware({
        app,
        cors:{
            origin: ['https://studio.apollographql.com'],
            credentials:true
        }
    });

    app.listen(3000, () => {
        console.log('Servidor inicializado no localhost');
    });
}

Main();