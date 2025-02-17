import Cookies from 'js-cookie';
import type { User } from '../types/auth';

const TOKEN_NAME = 'auth_token';
const USER_DATA = 'user_data';

export const auth = {
  getToken(): string | null {
    return Cookies.get(TOKEN_NAME) || null;
  },

  getUser(): User | null {
    const userData = Cookies.get(USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  login(token: string, user: User): void {
    // For development, set the token as a regular cookie so it's visible
    Cookies.set(TOKEN_NAME, token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Change to 'lax' for development
      expires: 7,
      path: '/'
    });

    // Store user data
    Cookies.set(USER_DATA, JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Change to 'lax' for development
      expires: 7,
      path: '/'
    });

    window.dispatchEvent(new Event('authChange'));
  },

  logout(): void {
    Cookies.remove(TOKEN_NAME, { path: '/' });
    Cookies.remove(USER_DATA, { path: '/' });
    window.dispatchEvent(new Event('authChange'));
    window.location.href = '/login';
  },

  isAuthenticated(): boolean {
    return !!this.getUser();
  },

  updateUser(updatedUser: Partial<User>): void {
    const currentUser = this.getUser();
    if (currentUser) {
      const newUser = { ...currentUser, ...updatedUser };
      Cookies.set(USER_DATA, JSON.stringify(newUser), {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Change to 'lax' for development
        expires: 7,
        path: '/'
      });
      window.dispatchEvent(new Event('authChange'));
    }
  },
};