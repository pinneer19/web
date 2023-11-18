import User from "./pages/User";
import {
    APPOINTMENT_ROUTE,
    CATALOG_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SERVICE_ROUTE,
    USER_ROUTE
} from "./utils/constants";
import Appointment from "./pages/Appointment";
import Catalog from "./pages/Catalog";
import ServicePage from "./pages/ServicePage";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: User
    },
    {
        path: APPOINTMENT_ROUTE,
        Component: Appointment
    }
]

export const publicRoutes = [
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: APPOINTMENT_ROUTE,
        Component: Appointment
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
    }
]