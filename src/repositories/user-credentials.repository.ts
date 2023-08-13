import {inject} from '@loopback/core';
import {
  DefaultCrudRepository, juggler
} from '@loopback/repository';
import {UserCredentials, UserCredentialsRelations} from '../models';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
>{
  constructor(
    @inject('datasources.db') protected db: juggler.DataSource,
  ) {
    super(UserCredentials, db);
  }
}

