import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
    name: 'accessibleImage',
    type: 'image',
    title: 'Image',
    options: { hotspot: true },
    fields: [
        {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            description: 'Alternative text is required.',
            hidden: ({ parent }) => !parent?.asset,
            validation: Rule => [
                Rule.required(),
            ],
        },
        {
            name: 'caption',
            type: 'string',
            title: 'Caption',
            hidden: ({ parent }) => !parent?.asset,
        }
    ]
})