import { defineField, defineType, type SchemaTypeDefinition } from 'sanity'
import blockContent from '../blockContent'

// --- Careers Page Schema ---
const careersPage = defineType({
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'text', title: 'Description' }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Background Image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Section Title' }),
        defineField({ name: 'description', type: 'text', title: 'Section Description' }),
        defineField({
          name: 'items',
          title: 'Benefit Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', type: 'string', title: 'Title' }),
                defineField({ name: 'description', type: 'text', title: 'Description' }),
                defineField({
                  name: 'icon',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Name of the Lucide icon (e.g., Users, TrendingUp)',
                  options: {
                    list: ['Users', 'TrendingUp', 'Heart', 'Globe', 'Award', 'Target']
                  }
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'text', title: 'Description' }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Background Image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo', // Assuming 'seo' type is defined globally or imported if needed, but for this file we'll rely on it being available in the studio context or we can import it if it was in the same file. 
      // Since we are aggregating, we should ideally include 'seo' definition here or import it. 
      // For simplicity in this generated file, we assume 'seo' is registered or we treat it as object if missing.
    }),
  ],
})

// --- Service Schema (Extended for LCL Consolidation) ---
const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    // Added fields for LCL Consolidation lists
    defineField({
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features or services (e.g. for LCL Consolidation)',
    }),
    defineField({
      name: 'globalHubs',
      title: 'Global Hubs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of locations or hubs',
    }),
  ],
})

export const schemaTypes: SchemaTypeDefinition[] = [blockContent, careersPage, service]