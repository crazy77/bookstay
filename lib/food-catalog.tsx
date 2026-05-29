import { renderToStaticMarkup } from 'react-dom/server';
import { FOOD_CATEGORIES } from '@/data/food-spots';
import { FOOD_SPOT_PHOTOS } from '@/data/food-spot-photos';
import type { FoodCatalog, FoodCatalogCategory } from '@/data/food-catalog';
import { foodSpotSlug } from '@/lib/food-spot-slug';
import { getSupabasePublicServer } from '@/lib/supabase';
import { sanitizeRichHtml } from '@/lib/rich-content';

type FoodCatalogRow = {
  payload: FoodCatalog;
};

export function defaultFoodCatalog(): FoodCatalog {
  return {
    categories: FOOD_CATEGORIES.map((category, categoryIndex) => ({
      id: `category-${categoryIndex + 1}`,
      title: category.title,
      note: category.note,
      drive: category.drive,
      published: true,
      spots: category.spots.map((spot, spotIndex) => {
        const slug = foodSpotSlug(spot.mapQuery);
        const photo =
          slug && slug in FOOD_SPOT_PHOTOS
            ? FOOD_SPOT_PHOTOS[slug as keyof typeof FOOD_SPOT_PHOTOS]
            : undefined;
        return {
          id: slug ?? `spot-${categoryIndex + 1}-${spotIndex + 1}`,
          mapQuery: spot.mapQuery,
          name: spot.name,
          walk: spot.walk,
          walkClass: spot.walkClass,
          descHtml: {
            ko: toHtml(spot.desc.ko),
            en: toHtml(spot.desc.en),
            zh: toHtml(spot.desc.zh),
          },
          addr: spot.addr,
          photoSrc: photo?.src,
          published: true,
        };
      }),
    })),
  };
}

export async function getFoodCatalog(): Promise<FoodCatalog> {
  const supabase = getSupabasePublicServer();
  if (!supabase) return defaultFoodCatalog();

  const { data, error } = await supabase
    .from('food_catalog')
    .select('payload')
    .eq('id', 'default')
    .eq('published', true)
    .maybeSingle();

  if (error || !data) return defaultFoodCatalog();
  return normalizeCatalog((data as FoodCatalogRow).payload);
}

export function normalizeCatalog(catalog: FoodCatalog): FoodCatalog {
  return {
    categories: (catalog.categories ?? []).map((category, categoryIndex) => ({
      ...category,
      id: category.id || `category-${categoryIndex + 1}`,
      published: category.published !== false,
      spots: (category.spots ?? []).map((spot, spotIndex) => ({
        ...spot,
        id: spot.id || `spot-${categoryIndex + 1}-${spotIndex + 1}`,
        descHtml: {
          ko: sanitizeRichHtml(spot.descHtml?.ko ?? ''),
          en: sanitizeRichHtml(spot.descHtml?.en ?? ''),
          zh: sanitizeRichHtml(spot.descHtml?.zh ?? ''),
        },
        published: spot.published !== false,
      })),
    })),
  };
}

export function visibleFoodCategories(catalog: FoodCatalog): FoodCatalogCategory[] {
  return catalog.categories
    .filter((category) => category.published)
    .map((category) => ({
      ...category,
      spots: category.spots.filter((spot) => spot.published),
    }));
}

function toHtml(value: React.ReactNode) {
  if (typeof value === 'string') return value;
  return sanitizeRichHtml(renderToStaticMarkup(<>{value}</>));
}
