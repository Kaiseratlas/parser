import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';

export class AutonomyState extends ProductEntity {
  @Expose()
  readonly id: string;
  @Expose()
  readonly default = false;
  @Expose({ name: 'is_puppet' })
  readonly isPuppet: boolean;
  @Expose({ name: 'use_overlord_color' })
  readonly useOverlordColor = false; // TODO: what is default value?
  @Expose({ name: 'min_freedom_level' })
  readonly minFreedomLevel: number;
  @Expose({ name: 'peace_conference_initial_freedom' })
  readonly peaceConferenceInitialFreedom: number;
  @Expose({ name: 'manpower_influence' })
  readonly manpowerInfluence: number;
}
