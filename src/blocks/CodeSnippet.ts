import { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const CodeSnippet: Block = {
  slug: 'codeSnippet',
  interfaceName: 'CodeSnippetBlockType',
  fields: [
    {
      name: 'identifier',
      type: 'text',
      required: true,
      admin: {
        description: 'A friendly name to identify this code snippet in the CMS dashboard.',
      },
    },
    {
      name: 'htmlCode',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
        description: 'Paste your raw HTML, CRM widgets, or tracking scripts here. Be careful, this renders exactly as provided.',
      },
    },
    ...visibilityFields,
  ],
}
