// Type guards and utilities for Square Catalog objects
import type { CatalogObject } from 'square';

// Type guard functions for different catalog object types
export function isCatalogItem(obj: CatalogObject): obj is CatalogObject.Item {
    return obj.type === 'ITEM';
}

export function isCatalogImage(obj: CatalogObject): obj is CatalogObject.Image {
    return obj.type === 'IMAGE';
}

export function isCatalogCategory(obj: CatalogObject): obj is CatalogObject.Category {
    return obj.type === 'CATEGORY';
}

export function isCatalogItemVariation(obj: CatalogObject): obj is CatalogObject.ItemVariation {
    return obj.type === 'ITEM_VARIATION';
}

export function isCatalogTax(obj: CatalogObject): obj is CatalogObject.Tax {
    return obj.type === 'TAX';
}

export function isCatalogDiscount(obj: CatalogObject): obj is CatalogObject.Discount {
    return obj.type === 'DISCOUNT';
}

export function isCatalogModifierList(obj: CatalogObject): obj is CatalogObject.ModifierList {
    return obj.type === 'MODIFIER_LIST';
}

export function isCatalogModifier(obj: CatalogObject): obj is CatalogObject.Modifier {
    return obj.type === 'MODIFIER';
}

// Convenience functions for filtering catalog objects by type
export function getCatalogItems(objects: CatalogObject[] | undefined): CatalogObject.Item[] {
    if (!objects) return [];
    return objects.filter(isCatalogItem);
}

export function getCatalogImages(objects: CatalogObject[] | undefined): CatalogObject.Image[] {
    if (!objects) return [];
    return objects.filter(isCatalogImage);
}

export function getCatalogCategories(objects: CatalogObject[] | undefined): CatalogObject.Category[] {
    if (!objects) return [];
    return objects.filter(isCatalogCategory);
}

export function getCatalogItemVariations(objects: CatalogObject[] | undefined): CatalogObject.ItemVariation[] {
    if (!objects) return [];
    return objects.filter(isCatalogItemVariation);
}

export function getCatalogModifierLists(objects: CatalogObject[] | undefined): CatalogObject.ModifierList[] {
    if (!objects) return [];
    return objects.filter(isCatalogModifierList);
}

export function getCatalogModifiers(objects: CatalogObject[] | undefined): CatalogObject.Modifier[] {
    if (!objects) return [];
    return objects.filter(isCatalogModifier);
}
