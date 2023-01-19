import { defineType, defineField } from "sanity";

export default defineType({
    name: 'social',
    type: 'document',
    title: 'Réseau social',
    fields: [
        defineField({ name: 'name', type: 'string', title: 'Nom' }),
        defineField({ name: 'image', type: 'accessibleImage', title: 'Image' }),
        defineField({ name: 'url', type: 'url', title: 'URL' }),
    ]
})