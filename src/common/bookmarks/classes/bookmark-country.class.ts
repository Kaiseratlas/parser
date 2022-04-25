import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { Country } from '../../countries';
import { Expose } from 'class-transformer';
import type { Ideology } from '../../ideologies';
import type { Idea } from '../../ideas';
import type { Focus } from '../../goals';
import type { Bookmark } from './bookmark.class';

export class BookmarkCountry extends ProductEntity {
  constructor(
    product: Product,
    protected readonly bookmark: Bookmark,
    protected readonly tag: Country['tag'],
  ) {
    super(product);
  }

  getCountry(): Promise<Country> {
    return this.product.common.countries.get(this.tag);
  }

  @Expose({ name: 'minor' })
  readonly isMinor: boolean = false;
  @Expose()
  protected readonly history: string;

  getHistory() {
    return this.product.i18n.t({ key: this.history });
  }
  @Expose({ name: 'ideology' })
  protected readonly ideologyId: Ideology['id'];

  getIdeology(): Promise<Ideology> {
    return this.product.common.ideologies.get(this.ideologyId);
  }

  @Expose({ name: 'ideas' })
  protected readonly ideaIds: Array<Idea['id']> = [];

  async getIdeas(): Promise<Idea[]> {
    const ideas = await this.product.common.ideas.load();
    return ideas.filter((idea) => this.ideaIds.includes(idea.id));
  }

  @Expose({ name: 'focuses' })
  protected readonly focusIds: Array<Focus['id']> = [];

  // async getFocuses(): Promise<Focus[]> {
  //   const focuses = await this.product.common.focuses.load();
  //   return focuses.filter((focus) => this.focusIds.includes(focus.id));
  // }
}
