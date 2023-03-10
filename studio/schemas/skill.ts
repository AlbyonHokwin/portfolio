import { defineType, defineField } from "sanity";

export default defineType({
    name: 'skill',
    type: 'document',
    title: 'Compétence',
    fields: [
        defineField({ name: 'skill', type: 'string', title: 'Compétence' }),
        defineField({ name: 'image', type: 'accessibleImage', title: 'Image' }),
        defineField({ name: 'isActual', type: 'boolean', title: 'Actuel', initialValue: true}),
    ]
})