import type { LoginInput, RegisterInput, AuthResponse } from "../types/auth";
import type { Product } from "../types/product";
import type { User, UpdateUserDetails } from "../types/user";

const GRAPHQL_URL = 'http://localhost:3000/graphql';

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


async function graphqlRequest<T>(query: string, variables: Record<string, any>, requireAuth: boolean = false): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'apollo-require-preflight': 'true'
  };

  if (requireAuth) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    credentials: 'include',
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
      { input: credentials }
    );
    return data.login;
  },

  async register(userData: RegisterInput): Promise<AuthResponse> {
    const data = await graphqlRequest<{ register: AuthResponse }>(
      REGISTER_MUTATION,
      { input: userData }
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

  // User
  async getUserByEmail(email: string): Promise<User> {
    const data = await graphqlRequest<{ userByEmail: User }>(
      GET_USER_QUERY,
      { email },
      true
    );
    return data.userByEmail;
  },

  async updateUserDetails(input: UpdateUserDetails): Promise<UpdateUserDetails> {
    const data = await graphqlRequest<{ updateUserDetails: UpdateUserDetails }>(
      UPDATE_USER_DETAILS_MUTATION,
      { input },
      true
    );
    return data.updateUserDetails;
  }
}