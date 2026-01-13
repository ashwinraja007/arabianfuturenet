import { type SchemaTypeDefinition } from 'sanity'

const careersPage = {
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description' },
        { name: 'image', type: 'image', title: 'Background Image' },
      ],
    },
    {
      name: 'benefits',
      title: 'Benefits Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description' },
        {
          name: 'items',
          title: 'Benefit Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'icon', type: 'string', title: 'Icon Name' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description' },
        { name: 'image', type: 'image', title: 'Background Image' },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
      ]
    }
  ],
}

const service = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'mainImage', type: 'image', title: 'Main Image' },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'globalHubs',
      title: 'Global Hubs',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
}

export const schemaTypes: SchemaTypeDefinition[] = [careersPage, service]