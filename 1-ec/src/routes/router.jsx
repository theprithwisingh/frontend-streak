import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryPage from '../pages/CategoryPage';
import SearchPage from '../pages/SearchPage';
import CheckoutPage from '../pages/CheckoutPage';
import CartModal from '../components/CartModal';
import SearchModal from '../components/SearchModal';
import { ScrollRestoration } from '@tanstack/react-router';

// Root layout containing Navigation and Footer
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-surface text-on-surface">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
      <CartModal />
      <SearchModal />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductPage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$categoryId',
  component: CategoryPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: SearchPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const routeTree = rootRoute.addChildren([indexRoute, productRoute, categoryRoute, searchRoute, checkoutRoute]);

export const router = createRouter({ routeTree });
