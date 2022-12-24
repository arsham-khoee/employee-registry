import { signupAction, loginAction, employeesGetAllAction, employeePostAction, employeeGetByIdAction, employeeGetChangesHistoryAction, employeeUpdateAction, employeeDeleteAction } from './controller/employee'
import { departmentPostAction, departmentsGetAllAction, departmentGetByIdAction, departmentUpdateAction, departmentDeleteAction } from './controller/department'

export const AppRoutes = [
    {
        path: "/signup",
        method: "patch",
        auth: false,
        action: signupAction
    },
    {
        path: '/login',
        method: 'post',
        auth: false,
        action: loginAction
    },
    {
        path: '/employees',
        method: 'get',
        auth: true,
        action: employeesGetAllAction
    },
    {
        path: '/employees',
        method: 'post',
        auth: true,
        action: employeePostAction
    },
    {
        path: '/employees/:id',
        method: 'get',
        auth: true,
        action: employeeGetByIdAction
    },
    {
        path: '/employees/:id/changes',
        method: 'get',
        auth: true,
        action: employeeGetChangesHistoryAction
    },
    {
        path: '/employees/:id',
        method: 'patch',
        auth: true,
        action: employeeUpdateAction
    },
    {
        path: '/employees/:id',
        method: 'delete',
        auth: true,
        action: employeeDeleteAction
    },
    {
        path: '/departments',
        method: 'post',
        auth: true,
        action: departmentPostAction
    },
    {
        path: '/departments',
        method: 'get',
        auth: true,
        action: departmentsGetAllAction
    },
    {
        path: '/departments/:id',
        method: 'get',
        auth: true,
        action: departmentGetByIdAction
    },
    {
        path: '/departments/:id',
        method: 'patch',
        auth: true,
        action: departmentUpdateAction
    },
    {
        path: '/departments/:id',
        method: 'delete',
        auth: true,
        action: departmentDeleteAction
    },
]