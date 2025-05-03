import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/Index";
import Layout from "../Layout";
import Stats from "../pages/Stats";
import Requests from "../pages/Requests";
import Reports from "../pages/Reports";

export const router = createBrowserRouter([
    { path: '/', element: <Layout />,
        children: [
            {
                path: '', element: <Index />
            },
            {
                path: 'stats', element: <Stats />
            },
            {
                path: 'requests', element: <Requests />
            },
            {
                path: 'reports', element: <Reports />
            },
        ]
     }
])