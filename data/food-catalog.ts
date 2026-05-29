import type { LocaleText } from '@/lib/locale';

export type FoodCatalogSpot = {
  id: string;
  mapQuery: string;
  name: LocaleText;
  walk: LocaleText;
  walkClass?: string;
  descHtml: LocaleText;
  addr?: LocaleText;
  photoSrc?: string;
  published: boolean;
};

export type FoodCatalogCategory = {
  id: string;
  title: LocaleText;
  note?: LocaleText;
  drive?: boolean;
  published: boolean;
  spots: FoodCatalogSpot[];
};

export type FoodCatalog = {
  categories: FoodCatalogCategory[];
};
