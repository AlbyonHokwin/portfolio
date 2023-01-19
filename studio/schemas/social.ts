import { defineType, defineField } from "sanity";

export default defineType({
    name: 'social',
    type: 'document',
    title: 'Réseau social',
    fields: [
        defineField({ name: 'name', type: 'string', title: 'Nom' }),
        defineField({ name: 'url', type: 'url', title: 'URL' }),
    ]
})