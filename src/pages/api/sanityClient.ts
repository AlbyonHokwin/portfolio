import { createClient } from "next-sanity";

export const sanityClient = createClient({
    projectId: "0klfxkkg",
    dataset: "production",
    apiVersion: "2023-01-16",
    useCdn: false
});