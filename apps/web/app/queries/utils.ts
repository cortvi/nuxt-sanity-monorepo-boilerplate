/*
 * `locale::pick(field).value` projects only the `$locale` value of a localized field.
 * Prepend `LOCALE_FN` to every query that uses it. TypeGen can't type `field[$locale]`,
 * so it needs one `select` branch per locale, and GROQ functions must return a projection.
 */
export const LOCALE_FN = /* groq */ `
  fn locale::pick($field) = $field {
    "value": select(
      $locale == "en" => en,
      $locale == "es" => es
    )
  };
`;
