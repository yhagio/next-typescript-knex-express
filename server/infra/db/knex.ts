import Knex from 'knex';
import path from 'path';

import { IConfig } from '../../shared/config';

export default class DB {
    private connection: Knex;

    constructor(private config: IConfig) {
        this.connection = Knex(this.config.get('knex'));
    }

    getConnection(): Knex {
        return this.connection;
    }

    startTransaction(): Promise<Knex.Transaction> {
        return new Promise((resolve, reject) =>
            this.connection.transaction(trx => resolve(trx)).catch(reject)
        );
    }

    async migrate(): Promise<void> {
        const migrationKnex = await this.getMigrations();
        await migrationKnex.migrate.latest();
        await migrationKnex.destroy();
    }

    private getMigrations(): Knex {
        const migrationConfig = {
            ...this.config.get('knex'),
            migrations: {
                directory: path.normalize(`${__dirname}/migrations`),
                tableName: 'knex_migrations'
            }
        };
        return Knex(migrationConfig);
    }
}
