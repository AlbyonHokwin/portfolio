import { sanityClient as client } from "./sanityClient";

import type { profileType } from "@/types/profileType";
import type { socialType } from "@/types/socialType";

const fetchProfile = async () => {
    const fetchedProfile: profileType = await client.fetch(`*[_type == "profile"]{
        firstname, lastname, email, description,
        picture{alt, caption, "url": asset->url},
        pictureGit{alt, caption, "url": asset->url},
        // socials[]->{
        //     name,
        //     url,
        //     image{alt, caption, "url": asset->url}    
        // }
    }[0]`);

    // console.log(fetchedProfile);

    return {
        ...fetchedProfile,
        picture: {
            ...fetchedProfile.picture,
            caption: fetchedProfile.picture.caption || '',
        },
        pictureGit: {
            ...fetchedProfile.pictureGit,
            caption: fetchedProfile.pictureGit.caption || '',
        },
        // socials: fetchedProfile.socials.map((social: socialType) => ({
        //     ...social,
        //     image: {
        //         ...social.image,
        //         caption: social.image.caption || '',
        //     }
        // }))
    }
};

export { fetchProfile };