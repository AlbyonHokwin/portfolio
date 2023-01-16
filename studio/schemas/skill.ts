import { defineType } from "sanity";

export default defineType({
    name: 'skill',
    type: 'document',
    title: 'Compétence',
    fields: [
        { name: 'skill', type: 'string', title: 'Compétence' },
        { name: 'image', type: 'image', options: { hotspot: true }, title: 'Image' },
    ]
})