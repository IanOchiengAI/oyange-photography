import { createCRUDHooks } from "./useGenericCRUD";

// Portfolio Items
const portfolioCRUD = createCRUDHooks("portfolio_items");
export const usePortfolioItems = () => portfolioCRUD.useList("sort_order");
export const useUpsertPortfolioItem = () => portfolioCRUD.useUpsert();
export const useDeletePortfolioItem = () => portfolioCRUD.useDelete();

// Featured Projects
const featuredCRUD = createCRUDHooks("featured_projects");
export const useFeaturedProjects = () => featuredCRUD.useList("sort_order");
export const useUpsertFeaturedProject = () => featuredCRUD.useUpsert();
export const useDeleteFeaturedProject = () => featuredCRUD.useDelete();

// Services
const servicesCRUD = createCRUDHooks("services");
export const useServices = () => servicesCRUD.useList("sort_order");
export const useUpsertService = () => servicesCRUD.useUpsert();
export const useDeleteService = () => servicesCRUD.useDelete();

// Packages
const packagesCRUD = createCRUDHooks("packages");
export const usePackages = () => packagesCRUD.useList("sort_order");
export const useUpsertPackage = () => packagesCRUD.useUpsert();
export const useDeletePackage = () => packagesCRUD.useDelete();

// Testimonials
const testimonialsCRUD = createCRUDHooks("testimonials");
export const useTestimonials = () => testimonialsCRUD.useList("sort_order");
export const useUpsertTestimonial = () => testimonialsCRUD.useUpsert();
export const useDeleteTestimonial = () => testimonialsCRUD.useDelete();

