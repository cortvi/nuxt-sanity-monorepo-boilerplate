const required = (name: string) =>
{
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
};


export const projectId = required('SANITY_STUDIO_PROJECT_ID');
export const dataset = required('SANITY_STUDIO_DATASET');
