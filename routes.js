import { SignupAction } from "./controller/employee"

export const AppRoutes = [
    {
        path: "/signup",
        method: "patch",
        auth: false,
        action: SignupAction
    },
    {
        path: '/login',
        method: 'post',
        auth: false,
        action: userSignupAction
    },
    {
        path: '/employees',
        method: 'get',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/employees',
        method: 'post',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/employees/:id',
        method: 'get',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/employees/:id/changes',
        method: 'get',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/employees/:id',
        method: 'patch',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/employees/:id',
        method: 'delete',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/departments',
        method: 'get',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/departments/:id',
        method: 'get',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/departments/:id/changes',
        method: 'get',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/departments',
        method: 'post',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/departments/:id',
        method: 'patch',
        auth: true,
        action: userSignupAction
    },
    {
        path: '/departments/:id',
        method: 'delete',
        auth: true,
        action: userSignupAction
    },
]