import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

export const LoadingPage = lazy(() => import('../pages/loading_page'));
export const HomePage = lazy(() => import('../pages/HomePage/app'));
export const LoginPage = lazy(() => import('../pages/login'));
export const RegisterPage = lazy(() => import('../pages/register'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const DashboardLayout = lazy(() => import('../layouts/dashboard'));
export const ProductPage = lazy(() => import('../pages/ProductPage/main'));
export const ProductDetailPage = lazy(() => import('../pages/ProductPage/detail'));
export const CartPage = lazy(() => import('../pages/CartPage/main'));
export const ProfilePage = lazy(() => import('../pages/Profile/main'));
export const OrderPage = lazy(() => import('../pages/OrderPage/main'));
export const BuyWithoutAccountPage = lazy(() => import('../pages/OrderPage/buyWithoutAccount'));
export const OrderTrackingPage = lazy(() => import('../pages/OrderPage/tracking'));
export const BlogPage = lazy(() => import('../pages/BlogPage/main'));
export const DetailBlogPage = lazy(() => import('../pages/BlogPage/detail'));
export const CreateBlogPage = lazy(() => import('../pages/BlogPage/create'));
export const UpdateBlogPage = lazy(() => import('../pages/BlogPage/update'));
export const ComboPage = lazy(() => import('../pages/ComboPage/main'));
export const ComboDetailPage = lazy(() => import('../pages/ComboPage/detail'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'product', element: <ProductPage /> },
        { path: 'product/detail/:id', element: <ProductDetailPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'buyWithoutAccount', element: <BuyWithoutAccountPage /> },
        { path: 'tracking/:id', element: <OrderTrackingPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'blog/:id', element: <DetailBlogPage /> },
        { path: 'blog/create', element: <CreateBlogPage /> },
        { path: 'blog/update/:id', element: <UpdateBlogPage /> },
        { path: 'combo', element: <ComboPage /> },
        { path: 'combo/detail', element: <ComboDetailPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
