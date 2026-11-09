import { useEffect, useState } from 'react';
import { Badge, Card, Flex, Stack, Text } from '@sanity/ui';
import { useClient, useFormValue, type ObjectInputProps } from 'sanity';
import { useLanguageFilterStudioContext } from '@sanity/language-filter';
import type { InternationalizedArrayItem } from 'sanity-plugin-internationalized-array';
import { apiVersion, formatTitle, locales, siteName, type LocaleCode } from '@repo/sanity';


type LocalizedString = InternationalizedArrayItem<string>[];

type SeoTitle = {
  text?: LocalizedString
  ignoreFormat?: boolean
  format?: LocalizedString
};

const pickLocale = (items: LocalizedString | null | undefined, locale: LocaleCode) =>
  items?.find(({ language }) => language === locale)?.value;

/** Settings' SEO title, kept in sync with its draft */
const useDefaultSeoTitle = (enabled: boolean) =>
{
  const client = useClient({ apiVersion });
  const [title, setTitle] = useState<SeoTitle | null>(null);

  useEffect(() =>
  {
    if (!enabled) return;
    const fetchTitle = () => client
      .withConfig({ perspective: 'drafts' })
      .fetch<SeoTitle | null>('*[_id == "settings"][0].seo.title')
      .then(setTitle);
    fetchTitle();
    const subscription = client
      .listen('*[_id in ["settings", "drafts.settings"]]', {}, { visibility: 'query' })
      .subscribe(fetchTitle);
    return () => subscription.unsubscribe();
  }, [client, enabled]);

  return title;
};

/** Renders the SEO title fields followed by a preview of the final title per locale */
export const SeoTitleInput = (props: ObjectInputProps<SeoTitle>) =>
{
  const { value } = props;
  const isDefault = props.schemaType.fields.some(({ name }) => name === 'format');
  const defaults = useDefaultSeoTitle(!isDefault);
  // Documents without a `title` field (e.g. Settings) resolve to undefined:
  const documentTitle = useFormValue(['title']) as LocalizedString | undefined;
  const { selectedLanguageIds } = useLanguageFilterStudioContext();

  const visibleLocales = selectedLanguageIds.length ?
    locales.filter(({ id }) => selectedLanguageIds.includes(id)) :
    locales;

  return (
    <Stack gap={4}>
      {props.renderDefault(props)}
      <Card border radius={2} padding={3} tone='transparent'>
        <Stack gap={3}>
          <Text size={1} weight='medium'>
            Preview
          </Text>
          {visibleLocales.map(({ id }) =>
          {
            const title = pickLocale(value?.text, id) || (!isDefault && (
              pickLocale(documentTitle, id) || pickLocale(defaults?.text, id)
            ));
            return (
              <Flex key={id} align='center' gap={2}>
                <Badge fontSize={0}>
                  {id.toUpperCase()}
                </Badge>
                <Text size={1} muted={!title}>
                  {title ?
                    formatTitle(title, {
                      format: pickLocale(isDefault ? value?.format : defaults?.format, id),
                      ignoreFormat: value?.ignoreFormat ?? defaults?.ignoreFormat,
                    }) :
                    siteName}
                </Text>
              </Flex>
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
};
