import { sanityClient as client } from "./sanityClient";

import type { profileType } from "@/types/profileType";
import type { socialType } from "@/types/socialType";

const fetchProfile = async () => {
    const fetchedProfile: profileType = await client.fetch(`*[_type == "profile"]{
        firstname, lastname, email, description,
        picture { alt, caption,
            "url": asset->url,
            "aspect": asset->metadata.dimensions.aspectRatio,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
        },
        pictureGit { alt, caption,
            "url": asset->url,
            "aspect": asset->metadata.dimensions.aspectRatio,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
        },
    }[0]`);

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
    }
};

export { fetchProfile };