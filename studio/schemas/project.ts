import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
    name: 'project',
    type: 'document',
    title: 'Projet',
    fields: [
        defineField({name:'projectTitle', type: 'string', title: 'Nom du projet'}),
        defineField({ name: 'description', type: 'text', title: 'Descriptif' }),
        defineField({name:'onProgress', type: 'boolean', title: 'En cours'}),
        defineField({ name: 'date', type: 'date', title: 'Date du projet' }),
        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
        defineField({ name: 'video', type: 'url', title: 'Vidéo'}),
        defineField({
            name: 'skills',
            title: 'Compétences',
            type: 'array',
            of: [defineArrayMember({ type: 'reference', to: [{ type: 'skill' }] })]
        })
    ]
})