import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import * as users from '../mock/users'
import * as products from '../mock/products'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users', 'Products'],
  endpoints: (builder) => ({
    // Auth simulation
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        const okAdmin = email === 'admin@company.com' && password === 'admin123'
        const okUser = email === 'user@company.com' && password === 'user123'
        if (!okAdmin && !okUser) return { error: { status: 401, data: { message: 'Invalid' } } }
        const role = okAdmin ? 'admin' : 'user'
        return { data: { token: 'mock-token', role, user: { email } } }
      },
    }),

    // Users
    getUsers: builder.query({
      queryFn: async (params) => ({ data: await users.list(params) }),
      providesTags: (result) =>
        result?.items ? [...result.items.map((u) => ({ type: 'Users', id: u.id })), { type: 'Users', id: 'LIST' }] : [{ type: 'Users', id: 'LIST' }],
    }),
    getUser: builder.query({
      queryFn: async (id) => ({ data: await users.getById(id) }),
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    createUser: builder.mutation({
      queryFn: async (payload) => ({ data: await users.create(payload) }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      queryFn: async ({ id, ...changes }) => ({ data: await users.update(id, changes) }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Users', id }, { type: 'Users', id: 'LIST' }],
      async onQueryStarted({ id, ...changes }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          api.util.updateQueryData('getUser', id, (draft) => {
            Object.assign(draft, changes)
          })
        )
        try { await queryFulfilled } catch { patch.undo() }
      },
    }),
    deleteUser: builder.mutation({
      queryFn: async (id) => ({ data: await users.remove(id) }),
      invalidatesTags: (r, e, id) => [{ type: 'Users', id }, { type: 'Users', id: 'LIST' }],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          api.util.updateQueryData('getUser', id, (draft) => {
            return null
          })
        )
        try { await queryFulfilled } catch { patch.undo() }
      },
    }),

    // Products
    getProducts: builder.query({
      queryFn: async (params) => ({ data: await products.list(params) }),
      providesTags: (result) =>
        result?.items ? [...result.items.map((p) => ({ type: 'Products', id: p.id })), { type: 'Products', id: 'LIST' }] : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductStats: builder.query({
      queryFn: async () => ({ data: await products.stats() }),
      providesTags: [{ type: 'Products', id: 'STATS' }],
    }),
    getProduct: builder.query({
      queryFn: async (id) => ({ data: await products.getById(id) }),
      providesTags: (r, e, id) => [{ type: 'Products', id }],
    }),
    createProduct: builder.mutation({
      queryFn: async (payload) => ({ data: await products.create(payload) }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: builder.mutation({
      queryFn: async ({ id, ...changes }) => ({ data: await products.update(id, changes) }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Products', id }, { type: 'Products', id: 'LIST' }],
      async onQueryStarted({ id, ...changes }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          api.util.updateQueryData('getProduct', id, (draft) => {
            Object.assign(draft, changes)
          })
        )
        try { await queryFulfilled } catch { patch.undo() }
      },
    }),
    deleteProduct: builder.mutation({
      queryFn: async (id) => ({ data: await products.remove(id) }),
      invalidatesTags: (r, e, id) => [{ type: 'Products', id }, { type: 'Products', id: 'LIST' }],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductStatsQuery,
} = api