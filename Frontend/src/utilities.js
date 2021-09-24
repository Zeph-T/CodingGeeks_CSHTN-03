export const api = {
    BASE_URL : 'http://localhost:8000',
    LOGIN_URL : '/auth/login',
    LOGOUT_URL : '/logout',
    SIGNUP_URL : '/auth/signup',
    CHECK_FOR_LOGGED_IN_USER : '/api/checkForLoggedInUser',
    ACTIVATE_USER  : '/auth/activateUser/',
    GET_ITEMS_FOR_HOME_PAGE : '/api/itemsForHome',
    GET_CATEGORY_ITEMS : "/api/category/",
    GET_SEARCH_ITEMS : '/api/items?',
    GET_PRODUCT : '/api/product/',
    GET_EXTRACTED_ITEMS : '/api/getExtractedItems',
    ADD_CART : '/api/addToCart',
    ADD_TO_WISHLIST : '/api/addToWishlist',
    GET_CART : '/api/getCart',
    GET_WISHLIST : '/api/getWishList',
    RESET_PASSWORD : '/auth/resetPassword',
    VALIDATE_RESET_PASSWORD_TOKEN : '/auth/verifyPasswordToken'
}