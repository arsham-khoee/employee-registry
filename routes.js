import { signupAction, loginAction, employeesGetAllAction, employeePostAction, employeeGetByIdAction, employeeGetChangesHistoryAction, employeeUpdateAction, employeeDeleteAction } from './controller/employee'
import { departmentPostAction, departmentsGetAllAction, departmentGetByIdAction, departmentUpdateAction, departmentDeleteAction } from './controller/department'

export const AppRoutes = [
    {
        path: "/api/signup",
        method: "patch",
        auth: false,
        action: signupAction
    },
    {
        path: '/api/login',
        method: 'post',
        auth: false,
        action: loginAction
    },
    {
        path: '/api/employees',
        method: 'get',
        auth: true,
        action: employeesGetAllAction
    },
    {
        path: '/api/employees',
        method: 'post',
        auth: true,
        action: employeePostAction
    },
    {
        path: '/api/employees/:id',
        method: 'get',
        auth: true,
        action: employeeGetByIdAction
    },
    {
        path: '/api/employees/department/:id',
        method: 'get',
        auth: true,
        action: employeesGetByDepartmentId
    },
    {
        path: '/api/employees/:id/changes',
        method: 'get',
        auth: true,
        action: employeeGetChangesHistoryAction
    },
    {
        path: '/api/employees/:id',
        method: 'patch',
        auth: true,
        action: employeeUpdateAction
    },
    {
        path: '/api/employees/:id',
        method: 'delete',
        auth: true,
        action: employeeDeleteAction
    },
    {
        path: '/api/departments',
        method: 'post',
        auth: true,
        action: departmentPostAction
    },
    {
        path: '/api/departments',
        method: 'get',
        auth: true,
        action: departmentsGetAllAction
    },
    {
        path: '/api/departments/:id',
        method: 'get',
        auth: true,
        action: departmentGetByIdAction
    },
    {
        path: '/api/departments/:id',
        method: 'patch',
        auth: true,
        action: departmentUpdateAction
    },
    {
        path: '/api/departments/:id',
        method: 'delete',
        auth: true,
        action: departmentDeleteAction
    },
]