import { trim, startCase } from 'lodash';
import slugify from 'slugify';

export function normalizeForComparison(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return trim(text)
    .replace(/\s+/g, ' ') // Múltiples espacios a uno solo
    .toLowerCase() // Todo en minúsculas para comparación
    .normalize('NFD') // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Remover tildes y acentos
    .replace(/[^\w\s]/g, '') // Solo letras, números y espacios
    .trim();
}

export function normalizeForDisplay(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const cleaned = trim(text)
    .replace(/\s+/g, ' ') // Múltiples espacios a uno solo
    .replace(/\.{2,}/g, '.') // Múltiples puntos a uno solo
    .replace(/-{2,}/g, '-'); // Múltiples guiones a uno solo

  return startCase(cleaned); // Primera letra de cada palabra en mayúscula
}

export function normalizeToSlug(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'es'
  });
}