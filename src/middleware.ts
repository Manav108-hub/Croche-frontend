import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async ({ request, cookies, redirect }, next) => {
  const url = new URL(request.url);
  
  // Define protected routes
  const protectedRoutes = ['/profile', '/settings', '/orders'];
  const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route));

  if (isProtectedRoute) {
    const authToken = cookies.get('auth_token');
    const userData = cookies.get('user_data');

    if (!authToken || !userData) {
      return redirect('/login');
    }

    // For profile pages, validate user ID
    if (url.pathname.startsWith('/profile/')) {
      try {
        const pathId = url.pathname.split('/')[2];
        const user = JSON.parse(userData.value);
        if (pathId !== user.id) {
          return redirect('/login');
        }
      } catch {
        return redirect('/login');
      }
    }
  }

  return next();
});