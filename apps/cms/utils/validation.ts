import type { RuleDef } from 'sanity';
import type { InternationalizedArrayItem } from 'sanity-plugin-internationalized-array';
import { locales } from '@repo/sanity';


/** Validates each locale of a localized field, flagging the input of every failing locale */
export const localeValidation = <R extends RuleDef<R>, T>(
  rule: R,
  predicate: (value?: T) => boolean,
  message: string,
  level: 'error' | 'warning' | 'info' = 'error'
) =>
{
  return rule.custom((value?: InternationalizedArrayItem<T>[]) =>
  {
    const errors = locales.flatMap(({ id }) =>
    {
      const item = value?.find(({ language }) => language === id);
      if (predicate(item?.value)) return [];
      return [{
        message: `[${id.toUpperCase()}] ${message}`,
        ...item && { path: [{ _key: item._key }, 'value'] },
      }];
    });
    return errors.length ? errors : true;
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
