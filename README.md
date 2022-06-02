# KTF Backend

## /auth/google-data

Save the data we get from Google login

> POST (user only) (Firebase auth token required)

### Authentication Header:

```
Bearer <Firebase auth token>
```

### Body:

```json
{
  "displayName": "",
  "email": "",
  "photoURL": ""
}
```

---

## /auth/user-data

Save the data we get from User after Google auth

> POST (user only) (Firebase auth token required)

### Authentication Header:

```
Bearer <Firebase auth token>
```

### Body:

```json
{
  "college": "",
  "phoneNumber": 0,
  "graduationYear": 0,
  "course": "",
  "dob": "",
  "gender": "",
  "address": "",
  "state": "",
  "pinCode": 0
}
```

---

## /data/events

All event details.

> GET (public)

---

## /data/merch

All merch details.

> GET (public)

---

## /data/sponsors

All the sponsor details.

> GET (public)

---

## /data/members

All the member details.

> GET (public)

---

## /data/user

All the details of a user.

> GET (user only) (Firebase auth token required) (Bearer token)

---

## /data/cart

Cart items of a user.

> GET (user only) (Firebase auth token required) (Bearer token)

---

## /cart/add

Add an item to cart.

> POST (user only) (Firebase auth token required)

### Authentication Header:

```
Bearer <Firebase auth token>
```

### Body:

```json
{
  "eventID": ""
}
```

```json
{
  "merchID": "",
  "quantity": 0,
  "merchSize": ""
}
```

### `quantity and merchSize is optional.`

---

## /cart/save-local-storage

As Soon as the user login to the Google it will save the cart items of the local storage to the database with others.

> POST (user only) (Firebase auth token required)

---

## /cart/remove

Remove an item from cart.

> POST (user only) (Firebase auth token required)

---

## /cart/checkout ????
