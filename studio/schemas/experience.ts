import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
    name: 'experience',
    type: 'document',
    title: 'Experience',
    fields: [
        defineField({ name: 'jobTitle', type: 'string', title: 'Nom du poste' }),
        defineField({ name: 'company', type: 'string', title: 'Nom de l\'entreprise' }),
        defineField({ name: 'logo', type: 'accessibleImage', title: 'Logo' }),
        defineField({ name: 'location', type: 'string', title: 'Lieu' }),
        defineField({ name: 'startDate', type: 'date', title: 'Date de début' }),
        defineField({ name: 'endDate', type: 'date', title: 'Date de fin' }),
        defineField({ name: 'industry', type: 'string', title: 'Secteur' }),
        defineField({
            name: 'description',
            title: 'Descriptif',
            type: 'array',
            of: [defineArrayMember({ type: 'block' })]
        }),
        defineField({
            name: 'skills',
            title: 'Compétences',
            type: 'array',
            of: [defineArrayMember({ type: 'reference', to: [{ type: 'skill' }] })]
        })
    ],
    orderings: [
        {
            title: 'Newest',
            name: 'startDateDesc',
            by: [
                { field: 'startDate', direction: 'desc' }
            ]
        },
        {
            title: 'Oldest',
            name: 'startDateAsc',
            by: [
                { field: 'startDate', direction: 'asc' }
            ]
        },
    ]
});