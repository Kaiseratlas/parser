import { Mod } from '../src/core';

describe('', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  // it('', async () => {
  //   const ideologies = await kr.common.ideologies.load();
  // });

  // it('', async () => {
  //   const abilities = await kr.common.abilities.load();
  //   console.log('abilities', abilities);
  // });

  // it('', async () => {
  //   const AS = await kr.common.AS.load();
  //   console.log('AS', AS);
  // });

  // it('', async () => {
  //   const focuses = await kr.common.focuses.load();
  //   console.log('focuses', focuses);
  // });

  // it('', async () => {
  //   const tree = await kr.common.focuses.get('norway_focus');
  //   const focus = tree.get('NOR_south_industry_1');
  //   expect(focus.id).toBe('NOR_south_industry_1');
  // });

  it('', async () => {
    const ideaCategories = await kr.common.ideaCategories.load();
    console.log('ideaCategories', ideaCategories);
  });

  // it('', async () => {
  //   const characters = await kr.common.characters.load();
  //   // console.log('characters', characters);
  // });

  // it('', async () => {
  //   const id = 'social_democrat';
  //   const socDem = await kr.common.ideologies.get(id);
  //   console.log('socDem', socDem);
  //   expect(socDem.id).toBe(id);
  // });
  //
  // it('', async () => {
  //   const id = 'hgfhfghgfhfghfghcg';
  //   const socDem = await kr.common.ideologies.get(id);
  //   console.log('socDem', socDem);
  //   expect(socDem).toBe(null);
  // });
});
