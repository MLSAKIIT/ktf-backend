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
  "eventID": 0
}
```

```json
{
  "merchID": 0,
  "quantity": 0,
  "merchSize": ""
}
```

### `quantity and merchSize is optional.`

---

## /cart/save-local-storage ??

As Soon as the user login to the Google it will save the cart items of the local storage to the database with others.

> POST (user only) (Firebase auth token required)

---

## /cart/update

Update the quantity and size of an item in cart.

> POST (user only) (Firebase auth token required)

### Authentication Header:

```
Bearer <Firebase auth token>
```

### Body:

```json
{
  "merchID": 0,
  "quantity": 0,
  "merchSize": ""
}
```

---

## /cart/remove/:id

Remove an item from cart.

> DELETE (user only) (Firebase auth token required)

### Authentication Header:

```

Bearer <Firebase auth token>

```

### `:id will contain the eventID or merchID.`

---

## /cart/add-coupon

Add coupon to cart.

> POST (user only) (Firebase auth token required)

### Authentication Header:

```

Bearer <Firebase auth token>

```

### Body

```json
{
  "coupon": ""
}
```

---

## /cart/remove-coupon

Add coupon to cart.

> GET (user only) (Firebase auth token required)

### Authentication Header:

```

Bearer <Firebase auth token>

```

---

## /payment/order

Create an order.

> GET (user only) (Firebase auth token required)

### Authentication Header:

```

Bearer <Firebase auth token>

```

### Return value

```json
{
  "orderID": "",
  "amount": 0,
  "currency": ""
}
```

---

## /payment/verify

Verify and save the payment details.

> POST (user only) (Firebase auth token required)

### Authentication Header:

```

Bearer <Firebase auth token>

```

### Body:

```json
{
  "orderID": "",
  "razorpayPaymentID": "",
  "razorpaySignature": ""
}
```

---

## /admin/add-coupons

Add new coupons.

> POST (admin only) (Firebase auth token required)

### Authentication Header:

```

Bearer <Firebase auth token>

```

### Body:

```json
{
  "code": "",
  "discount": 0,
  "type": "",
  "description": ""
}
```

---

## /admin/check

Check if the user is registered in the event

> POST (admin only) (Firebase auth token required)

### Authentication Header:

```

Bearer <Firebase auth token>

```

### Body:

```json
{
  "uid": "",
  "eventID": ""
}
```

---

## /admin/check-in

Check if the user is checked in the event

> POST (admin only) (Firebase auth token required)

### Authentication Header:

```

Bearer <Firebase auth token>

```

### Body:

```json
{
  "uid": "",
  "eventID": ""
}
```

---
