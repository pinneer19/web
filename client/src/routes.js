import User from "./pages/User";
import {
    API_ROUTE,
    REVIEWS_ROUTE,
    CATALOG_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SERVICE_ROUTE,
    USER_ROUTE
} from "./utils/constants";
import Reviews from "./pages/Reviews";
import Catalog from "./pages/Catalog";
import ServicePage from "./pages/ServicePage";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: User
    }
]

export const publicRoutes = [
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: REVIEWS_ROUTE,
        Component: Reviews
    },
    {
        path: SERVICE_ROUTE + '/:id',
        Component: ServicePage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: REVIEWS_ROUTE,
        Component: Reviews
    }
]