import Knex from 'knex';

import { IConfig } from '../../shared/config';

export default class DB {
    private connection: Knex;

    constructor(private config: IConfig) {
        this.connection = Knex(this.config.get('knex'));
    }

    getConnection(): Knex {
        return this.connection;
    }
}
