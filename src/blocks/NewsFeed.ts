import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const NewsFeed: Block = {
  slug: 'newsFeed',
  labels: {
    singular: 'News Feed',
    plural: 'News Feeds',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Latest News',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'latest',
      options: [
        { label: 'Latest News', value: 'latest' },
        { label: 'By Service', value: 'byService' },
        { label: 'By Location', value: 'byLocation' },
        { label: 'By Category', value: 'byCategory' },
        { label: 'Manual Selection', value: 'manual' },
      ],
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        condition: (_data, siblingData) => siblingData?.source === 'byService',
      },
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      admin: {
        condition: (_data, siblingData) => siblingData?.source === 'byLocation',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => siblingData?.source === 'byCategory',
      },
    },
    {
      name: 'selectedNews',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      admin: {
        condition: (_data, siblingData) => siblingData?.source === 'manual',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 20,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    ...visibilityFields,
  ],
}
