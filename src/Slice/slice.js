import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeSlice = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
        employeeData: builder.query({
            query: () => ({
                url: '/users',
                method: "GET"
            })
        })
    })
});

export const { useEmployeeDataQuery } = employeeSlice;
