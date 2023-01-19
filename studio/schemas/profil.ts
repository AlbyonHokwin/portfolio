import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
    name: 'profil',
    type: 'document',
    title: 'Profil',
    fields: [
        defineField({ name: 'firstname', type: 'string', title: 'Prénom' }),
        defineField({ name: 'lastname', type: 'string', title: 'Nom' }),
        defineField({ name: 'description', type: 'text', title: 'Description' }),
        defineField({ name: 'email', type: 'string', title: 'Adresse e-mail' }),
        defineField({ name: 'phone', type: 'string', title: 'Numéro de téléphone' }),
        defineField({ name: 'picture', type: 'accessibleImage', title: 'Image de profil' }),
        defineField({ name: 'pictureGit', type: 'accessibleImage', title: 'Image de profil sur github' }),
        defineField({
            name: 'socials',
            title: 'Réseaux sociaux',
            type: 'array',
            of: [defineArrayMember({ type: 'reference', to: [{ type: 'social' }] })]
        })
    ]
})