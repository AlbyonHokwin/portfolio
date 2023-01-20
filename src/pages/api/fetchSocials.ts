import { sanityClient as client } from "./sanityClient";

import type { socialType } from "@/types/socialType";

const fetchSocials = async () => {
    const fetchedSocials: socialType[] = await client.fetch(`*[_type == "social"]{
            name, url,
            image{alt, caption, "url": asset->url}    
    }`);

    return fetchedSocials.map((social: socialType) => ({
        ...social,
        image: {
            ...social.image,
            caption: social.image.caption || '',
        }
    }));
};

export { fetchSocials };