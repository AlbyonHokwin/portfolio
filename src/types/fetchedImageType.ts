export type fetchedImageType = {
    alt: string;
    asset: {
        _ref: string;
        _type: "reference";
        url: 'string'; // When dereferencing
    }
    crop: {
        _type: "sanity.imageCrop";
        top: number;
        bottom: number;
        left: number;
        right: number;
    }
    hotspot: {
        _type: "sanity.imageHotspot";
        height: number;
        width: number;
        x: number;
        y: number;
    }
}