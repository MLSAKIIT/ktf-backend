# KTF Backend


## /auth/google-data
> POST (user only) (Firebase auth token required)
 
Save the data we get from Google login


## /auth/user-data
> POST (user only) (Firebase auth token required)

Save the data we get from User after Google auth

## /data/events
> GET (public)

All event details.

## /data/sponsors
> GET (public)

All the sponsor details.

## /data/members
> GET (public)

All the member details.

## /data/user/:userId
> GET (user only) (Firebase auth token required) (Bearer token)

All the details of a user.
## /data/cart/:userId
> GET (user only) (Firebase auth token required) (Bearer token)

Cart items of a user.

## /cart/add
> POST (user only) (Firebase auth token required)

Add an item to cart.

## /cart/save-local-storage
> POST (user only) (Firebase auth token required)

As Soon as the user login to the Google it will save the cart items of the local storage to the database with others.

## /cart/remove
> POST (user only) (Firebase auth token required)

Remove an item from cart.

## /cart/checkout ????
