import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { GetCohorts } from '../../application';

@Service()
export class CohortsController {
  constructor(@Inject('GetCohorts') private getCohorts: GetCohorts) {}

  public all = async (_: Request, res: Response) => {
    const cohorts = await this.getCohorts.getAllCohorts();

    res.send(cohorts);
  };
}
