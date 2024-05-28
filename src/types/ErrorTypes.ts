export interface SiteError {
    isSiteError: boolean;
    siteMessage: string;
}; // Display on entire site

export interface InputError {
    isInputError: boolean;
    siteMessage: boolean;
}; // Display in input areas
