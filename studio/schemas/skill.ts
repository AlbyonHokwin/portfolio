import { defineType, defineField } from "sanity";

export default defineType({
    name: 'skill',
    type: 'document',
    title: 'Compétence',
    fields: [
        defineField({ name: 'skill', type: 'string', title: 'Compétence' }),
        defineField({ name: 'image', type: 'image', options: { hotspot: true }, title: 'Image' }),
    ]
})