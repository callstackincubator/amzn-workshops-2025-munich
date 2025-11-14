import { resources as en } from '../../vega-sports-app/assets/text/en/strings.puff.json';
import { resources as pl } from '../../vega-sports-app/assets/text/pl/strings.puff.json';

function getResources(locale: string) {
  switch (locale) {
    case 'pl':
      return pl;

    case 'en':
    default:
      return en;
  }
}

export const AssetResolver = {
  getString: (id: string, { locale }) => {
    return { value: getResources(locale)[id] };
  },
  getNumber: (id: string, { locale }) => Number(getResources(locale)[id]),
  getMajorVersion: () => 1,
  getMinorVersion: () => 0,
  getPatchVersion: () => 0,
};
