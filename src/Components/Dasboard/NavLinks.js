import { faPlus, faShoppingCart, faTruckFast, faUsers } from "@fortawesome/free-solid-svg-icons";

export const NavLinks = [
    {
        name: 'Users',
        path: 'users',
        icon: faUsers,
        role: '1995'
    },
    {
        name: 'Add User',
        path: 'user/add',
        icon: faPlus,
        role: '1995'
    },
    {
        name: 'Categories',
        path: 'categories',
        icon: faShoppingCart,
        role: ['1999', '1995', '2001']
    },
    {
        name: 'Add Category',
        path: 'category/add',
        icon: faPlus,
        role: ['1999', '1995', '2001']
    },
    {
        name: 'Products',
        path: 'products',
        icon: faTruckFast,
        role: ['1999', '1995', '2001']
    },
    {
        name: 'Add Product',
        path: 'product/add',
        icon: faPlus,
        role: ['1999', '1995', '2001']
    },
]