import { Country, Ideology } from '../../src';
import { ExportToCsv } from 'export-to-csv';
import fs from 'fs';

describe('', () => {
  let countries: Country[];
  let ideologies: Ideology[];

  beforeAll(async () => {
    await kr.i18n.load();
    await kr.history.countries.load();
    countries = await kr.common.countries.load();
    ideologies = await kr.common.ideologies.load();
  });

  it('', async () => {
    const originalCountries = await Promise.all(
      countries
        .filter((country) => country.tag !== 'XXA' && !country.isDynamic)
        .filter(async (country) => {
          return country.tag !== (await country.getCurrentTag());
        }),
    );
    const data = await Promise.all(
      originalCountries
        .filter((country) => country.tag !== 'XXA' && !country.isDynamic)
        .map(async (country) => {
          const localisation = await country.getCurrentName();
          const localisation1 = await country.getDefaultName();

          const ideologiesNames = {};
          await Promise.all(
            ideologies.map(async (ideology) => {
              const l = await country.getName(ideology.id);
              ideologiesNames[ideology.id] = l?.value;
            }),
          );

          return {
            tag: country.tag,
            currentTag: await country.getCurrentTag(),
            formalName: localisation?.value,
            name: localisation1?.value,
            totalist: ideologiesNames['totalist'],
            syndicalist: ideologiesNames['syndicalist'],
            radical_socialist: ideologiesNames['radical_socialist'],
            social_democrat: ideologiesNames['social_democrat'],
            social_liberal: ideologiesNames['social_liberal'],
            market_liberal: ideologiesNames['market_liberal'],
            social_conservative: ideologiesNames['social_conservative'],
            authoritarian_democrat: ideologiesNames['authoritarian_democrat'],
            paternal_autocrat: ideologiesNames['paternal_autocrat'],
            national_populist: ideologiesNames['national_populist'],
          };
        }),
    );
    const data2 = await Promise.all(
      countries
        .filter((country) => country.tag !== 'XXA' && !country.isDynamic)
        .map(async (country) => {
          const localisation = await country.getOriginalCurrentName();
          const localisation1 = await country.getOriginalDefaultName();

          const ideologiesNames = {};
          await Promise.all(
            ideologies.map(async (ideology) => {
              const l = await country.getOriginalName(ideology.id);
              ideologiesNames[ideology.id] = l?.value;
            }),
          );

          return {
            tag: country.tag,
            currentTag: country.tag,
            formalName: localisation?.value,
            name: localisation1?.value,
            totalist: ideologiesNames['totalist'],
            syndicalist: ideologiesNames['syndicalist'],
            radical_socialist: ideologiesNames['radical_socialist'],
            social_democrat: ideologiesNames['social_democrat'],
            social_liberal: ideologiesNames['social_liberal'],
            market_liberal: ideologiesNames['market_liberal'],
            social_conservative: ideologiesNames['social_conservative'],
            authoritarian_democrat: ideologiesNames['authoritarian_democrat'],
            paternal_autocrat: ideologiesNames['paternal_autocrat'],
            national_populist: ideologiesNames['national_populist'],
          };
        }),
    );
    const csvExporter = new ExportToCsv();
    const csv = csvExporter.generateCsv(
      data
        .filter((c) => c.tag !== c.currentTag)
        .concat(data2)
        .sort((a, b) => a.tag.localeCompare(b.tag)),
      true,
    );
    await fs.promises.writeFile('country_names.csv', csv);
  });
});
