export enum RabbitMQ {
    UserQueue = 'users',
    CustomerQueue = 'customers',
    BrandQueue = 'brands',
    CategoryQueue = 'categories',
    OrderQueue = 'orders',
    ProductQueue = 'products'
}

export enum UserMSG {
    CREATE = 'CREATE_USER',
    FIND_ALL = 'FIND_USERS',
    FIND_ONE = 'FIND_USER',
    UPDATE = 'UPDATE_USER',
    DELETE = 'DELETE_USER',
    VALID_USER = 'VALID_USER'
}

export enum CustomerMSG {
    CREATE = 'CREATE_CUSTOMER',
    FIND_ALL = 'FIND_CUSTOMERS',
    FIND_ONE = 'FIND_CUSTOMER',
    UPDATE = 'UPDATE_CUSTOMER',
    DELETE = 'DELETE_CUSTOMER'
}

export enum BrandMSG {
    CREATE = 'CREATE_BRAND',
    FIND_ALL = 'FIND_BRANDS',
    FIND_ONE = 'FIND_BRAND',
    UPDATE = 'UPDATE_BRAND',
    DELETE = 'DELETE_BRAND'
}

export enum CategoryMSG {
    CREATE = 'CREATE_CATEGORY',
    FIND_ALL = 'FIND_CATEGORIES',
    FIND_ONE = 'FIND_CATEGORY',
    UPDATE = 'UPDATE_CATEGORY',
    DELETE = 'DELETE_CATEGORY'
}

export enum OrderMSG {
    CREATE = 'CREATE_ORDER',
    FIND_ALL = 'FIND_ORDERS',
    FIND_ONE = 'FIND_ORDER',
    UPDATE = 'UPDATE_ORDER',
    DELETE = 'DELETE_ORDER'
}

export enum ProductMSG {
    CREATE = 'CREATE_PRODUCT',
    FIND_ALL = 'FIND_PRODUCTS',
    FIND_ONE = 'FIND_PRODUCT',
    UPDATE = 'UPDATE_PRODUCT',
    DELETE = 'DELETE_PRODUCT'
}
