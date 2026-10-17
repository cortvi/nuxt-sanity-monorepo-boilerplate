import type { RuleDef } from 'sanity';
import { locales } from '@repo/sanity';


/** Validates each locale of a localized field, listing the failing locales in the message */
export const localeValidation = <R extends RuleDef<R>, T>(
  rule: R,
  predicate: (value?: T) => boolean,
  message: string,
  level: 'error' | 'warning' | 'info' = 'error'
) =>
{
  return rule.custom((value?: Record<string, T | undefined>) =>
  {
    const failing = locales.filter(({ id }) => !predicate(value?.[id]));
    if (failing.length)
    {
      const affectedLocales = failing.map(({ id }) => id.toUpperCase()).join(', ');
      return `[${affectedLocales}] ${message}`;
    }
    return true;
  })[level]();
};

/** Validation for localized fields that are required in every locale */
export const requiredInAllLocales = <R extends RuleDef<R>, T>(rule: R) =>
{
  return localeValidation(
    rule,
    (value?: T) => !!value,
    'Required'
  );
};
