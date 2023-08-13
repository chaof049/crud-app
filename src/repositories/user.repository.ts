import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository, HasOneRepositoryFactory, juggler, repository
} from '@loopback/repository';
import {NewUserRequest, NewUserRequestRelations, UserCredentials} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';

export class NewUserRequestRepository extends DefaultCrudRepository<
  NewUserRequest,
  typeof NewUserRequest.prototype.id,
  NewUserRequestRelations
>{
  public readonly credentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof NewUserRequest.prototype.id
  >;
  constructor(
    @inject('datasources.db') protected db: juggler.DataSource,
    @repository.getter('UserCredentialsRepository')
    getUserCredentialsRepository: Getter<UserCredentialsRepository>,
  ) {
    super(NewUserRequest, db);
    this.credentials = this.createHasOneRepositoryFactoryFor(
      'credentials',
      getUserCredentialsRepository,
    );
    this.registerInclusionResolver('credentials', this.credentials.inclusionResolver);
  }


}
