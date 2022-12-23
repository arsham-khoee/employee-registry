

export const AppRoutes = [
    {
        path: "/signup",
        method: "post",
        auth: false,
    },
    {
        path: '/login',
        method: 'post',
        auth: false,
    },
    {
        path: '/employees',
        method: 'get',
        auth: true,
    },
    {
        path: '/employees',
        method: 'post',
        auth: true,
    },
    {
        path: '/employees/:id',
        method: 'get',
        auth: true,
    },
    {
        path: '/employees/:id',
        method: 'patch',
        auth: true,
    },
    {
        path: '/employees/:id',
        method: 'delete',
        auth: true,
    },
    {
        path: '/departments',
        method: 'get',
        auth: true,
    },
    {
        path: '/departments/:id',
        method: 'get',
        auth: true,
    },
    {
        path: '/departments',
        method: 'post',
        auth: true,
    },
    {
        path: '/departments/:id',
        method: 'patch',
        auth: true,
    },
    {
        path: '/departments/:id',
        method: 'delete',
        auth: true,
    },
]