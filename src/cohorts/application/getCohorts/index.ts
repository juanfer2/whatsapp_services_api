import { Inject, Service } from 'typedi';
import { CohortRepository } from '../../domain';

@Service('GetCohorts')
export default class GetCohorts {
  constructor(@Inject('CohortRepository') private readonly cohortRepository: CohortRepository) {}

  async getAllCohorts() {
    const cohors = this.cohortRepository.all();

    return cohors;
  }
}
