"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: './dist/migrations',
        pathTs: './src/migrations',
        glob: '!(*.d).{js,ts}',
        transactional: true,
        disableForeignKeys: true,
        allOrNothing: true,
        dropTables: true,
        safe: false,
        snapshot: true,
        emit: 'ts',
    },
    entities: ['./dist/Entidades/'],
    entitiesTs: ['./src/Entidades/'],
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    dbName: process.env.DATABASE,
    type: 'postgresql',
    debug: process.env.ENV === 'dev' ? true : false
};
//# sourceMappingURL=mikro-orm.config.js.map