import type { LoginInput, RegisterInput, AuthResponse } from "../types/auth";
import type { Cart } from "../types/cart";
import type { Product } from "../types/product";
import type { User, UpdateUserDetails } from "../types/user";
import Cookies from 'js-cookie';
import { auth } from "./auth";

const GRAPHQL_URL = 'https://croche-backend-production-64d2.up.railway.app/graphql';

const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        name
        email
        isAdmin
        createdAt
        updatedAt
      }
    }
  }
`;

const REGISTER_MUTATION = `
  mutation Register($input: RegisterUserInput!) {
    register(input: $input) {
      access_token
      user {
        id
        name
        email
        isAdmin
        createdAt
        updatedAt
      }
    }
  }
`;

const GET_PRODUCTS_QUERY = `
  query GetProducts {
    products {
      id
      name
      category
      stock
      description
      prices {
        size
        value
      }
      images {
        id
        url
      }
    }
  }
`;

const GET_PRODUCT_QUERY = `
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      category
      stock
      description
      prices {
        size
        value
      }
      images {
        id
        url
      }
    }
  }
`;

const GET_USER_QUERY = `
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      email
      isAdmin
      createdAt
      updatedAt
      userDetails {
        id
        address
        city
        pincode
        country
        phone
      }
    }
  }
`;

const GET_USER_BY_ID_QUERY = `
  query UserById($userId: String!) {
    userById(id: $userId) {
      id
      name
      email
      isAdmin
      createdAt
      updatedAt
      userDetails {
        id
        address
        city
        pincode
        country
        phone
      }
    }
  }
`;

const UPDATE_USER_DETAILS_MUTATION = `
  mutation UpdateUserDetails($input: UpdateUserDetailsInput!) {
    updateUserDetails(input: $input) {
      id
      address
      city
      pincode
      country
      phone
    }
  }
`;
const GET_CART_QUERY = `
  query GetCart($userId: String!) {
    getCart(userId: $userId) {
      id
      items {
        id
        quantity
        size
        product {
          id
          name
          prices {
            size
            value
          }
          images {
            id
            url
          }
        }
      }
      total
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      id
      userId
      items {
        id
        quantity
        size
        product {
          id
          name
          prices {
            size
            value
          }
        }
      }
      total
    }
  }
`;

// Add these mutation constants
const UPDATE_CART_ITEM_MUTATION = `
  mutation UpdateCartItem($userId: String!, $input: UpdateCartItemInput!) {
    updateCartItem(userId: $userId, input: $input) {
      id
      userId
      items {
        id
        quantity
        size
        product {
          id
          name
          prices {
            size
            value
          }
        }
      }
      total
    }
  }
`;

const REMOVE_CART_ITEM_MUTATION = `
  mutation RemoveCartItem($userId: String!, $cartItemId: String!) {
    removeCartItem(userId: $userId, cartItemId: $cartItemId) {
      id
      userId
      items {
        id
        quantity
        size
        product {
          id
          name
          prices {
            size
            value
          }
        }
      }
      total
    }
  }
`;

async function graphqlRequest<T>(
  query: string, 
  variables: Record<string, unknown>, 
  requireAuth: boolean = false
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'apollo-require-preflight': 'true'
  };

  if (requireAuth) {
    const token = Cookies.get('auth_token');
    if (!token) {
      throw new Error('Authentication required');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'GraphQL request failed');
  }

  return data.data;
}

export const authApi = {
  // Auth
  async login(credentials: LoginInput): Promise<AuthResponse> {
    const data = await graphqlRequest<{ login: AuthResponse }>(
      LOGIN_MUTATION,
      { input: credentials },
      false
    );
    return data.login;
  },

  async register(userData: RegisterInput): Promise<AuthResponse> {
    const data = await graphqlRequest<{ register: AuthResponse }>(
      REGISTER_MUTATION,
      { input: userData },
      false
    );
    return data.register;
  },

  // Products
  async getProducts(): Promise<Product[]> {
    const data = await graphqlRequest<{ products: Product[] }>(
      GET_PRODUCTS_QUERY,
      {},
      false
    );
    return data.products;
  },

  async getProduct(id: string): Promise<Product> {
    const data = await graphqlRequest<{ product: Product }>(
      GET_PRODUCT_QUERY,
      { id },
      false
    );
    return data.product;
  },

  // Users
  async getUserByEmail(email: string): Promise<User> {
    const data = await graphqlRequest<{ userByEmail: User }>(
      GET_USER_QUERY,
      { email },
      true
    );
    return data.userByEmail;
  },

  async getUserById(userId: string): Promise<User> {
    const data = await graphqlRequest<{ userById: User }>(
      GET_USER_BY_ID_QUERY,
      { userId },
      true
    );
    return data.userById;
  },

  async updateUserDetails(input: UpdateUserDetails): Promise<UpdateUserDetails> {
    const data = await graphqlRequest<{ updateUserDetails: UpdateUserDetails }>(
      UPDATE_USER_DETAILS_MUTATION,
      { input },
      true
    );
    return data.updateUserDetails;
  },

  async addToCart(productId: string, userId: string, size: string, quantity: number): Promise<Cart> {
    const data = await graphqlRequest<{ addToCart: Cart }>(
      ADD_TO_CART_MUTATION,
      { 
        input: {
          userId,
          productId,
          size,
          quantity
        }
      },
      true
    );
    return data.addToCart;
  },

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    const user = auth.getUser();
    if (!user?.id) throw new Error('User not authenticated');

    const data = await graphqlRequest<{ updateCartItem: Cart }>(
      UPDATE_CART_ITEM_MUTATION,
      { 
        userId: user.id,
        input: {
          cartItemId: itemId,
          quantity
        }
      },
      true
    );
    return data.updateCartItem;
  },

  async removeCartItem(itemId: string): Promise<Cart> {
    const user = auth.getUser();
    if (!user?.id) throw new Error('User not authenticated');

    const data = await graphqlRequest<{ removeCartItem: Cart }>(
      REMOVE_CART_ITEM_MUTATION,
      { 
        userId: user.id,
        cartItemId: itemId
      },
      true
    );
    return data.removeCartItem;
  },

  async getCart(userId: string): Promise<Cart> {
    const data = await graphqlRequest<{ getCart: Cart }>(
      GET_CART_QUERY,
      { userId },
      true
    );
    return data.getCart;
  }
};