declare namespace NodeJS {
    export interface ProcessEnv {
        SANITY_PROJECT_ID: string;
        SANITY_DATASET: string;
        SANITY_API_VERSION: string;
        NEXT_PUBLIC_EMAILJS_SERVICE_ID: string;
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string;
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string;
        NEXT_PUBLIC_EMAILJS_PRIVATE_KEY: string;
    }
}
