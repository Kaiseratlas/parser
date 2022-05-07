import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';
import { DivisionTemplateUnit as TemplateUnit } from './division-template-unit.class';

interface AddUnitOptions extends Pick<TemplateUnit, 'x' | 'y'> {
  readonly unitId: TemplateUnit['unitId'];
}

export class DivisionTemplate extends ProductEntity {
  static readonly Unit = TemplateUnit;

  /**
   * Name sets the template name, as seen in the Recruit and Deploy menu.
   */
  @Expose({ name: 'name' })
  readonly id: string;
  /**
   * Sets a name group
   * @protected
   */
  @Expose({ name: 'division_names_group' })
  protected readonly divisionNamesGroupId: string;
  /**
   * Regiments is what the division comprises of
   */
  readonly regiments: TemplateUnit[] = [];
  /**
   * Support is the support companies the unit comes with.
   */
  readonly support: TemplateUnit[] = [];

  protected serializeOptions({ unitId, x, y }: AddUnitOptions): TemplateUnit {
    return new DivisionTemplate.Unit(this.product, unitId, x, y);
  }

  addRegiment(...templateUnitOptions: AddUnitOptions[]) {
    this.regiments.push(
      ...templateUnitOptions.map<TemplateUnit>(
        this.serializeOptions.bind(this),
      ),
    );
  }

  addSupport(...templateUnitOptions: AddUnitOptions[]) {
    this.support.push(
      ...templateUnitOptions.map<TemplateUnit>(
        this.serializeOptions.bind(this),
      ),
    );
  }
}
