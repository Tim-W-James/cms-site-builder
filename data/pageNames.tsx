export const pageNames = ["index", "resources", "about", "contact"] as const;
export type PageName = (typeof pageNames)[number];
