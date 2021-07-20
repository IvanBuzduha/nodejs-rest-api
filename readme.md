hw04

# Contacts API

## Overview

This is a Rest Api application for working with a collection of contacts.

Modules and libraries used in the project:
    connect-flash
    cors
    cross-env
    dotenv
    express
    joi
    lowdb
    mongodb
    mongoose
    morgan
    passport
    
## Routes

The REST API supports the following routes:

#### Registration request

```shell
POST /users/register
Content-Type: application/json
RequestBody: {
    "name":"Name",
    "email": "example@example.com",
    "password": "examplepassword"
}
```

#### Registration success response
```shell
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "name":"Name",
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### Login request

```shell
POST /users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Login success response

```shell
{
    "status": "success",
    "code": 200,
    "data": {
        "token": "token",
        "user": {
            "name": "Name",
            "email": "example@example.com",,
            "subscription": "starter"
        }
    }
}
```

#### Logout request

```shell
POST /users/logout
Authorization: "Bearer {{token}}"
```

#### Logout success response

```shell
Status: 204 No Content
```

#### Current user request

```shell
GET /users/current
Authorization: "Bearer {{token}}"
```

#### Current user success response

```shell
{
    "status": "success",
    "code": 200,
    "data": {
        "name": "Name",
        "email": "example@example.com",,
        "subscription": "starter"
        }
    }
```


#### Get all contacts request

```shell
GET /api/contacts

```

#### Get all contacts success response

```shell
{
    "status": "success",
    "code": 200,
    "data": {
        "contacts": [
            {
                "favorite": false,
                "_id": "60f6ecee952a261cd8436956",
                "name": "SysAdmin",
                "email": "sysadmin@gmail.com",
                "phone": "111-111-1111",
                "owner": {
                    "name": "Name",
                    "email": "example@mail.com"
                },
                "createdAt": "2021-07-20T15:34:06.156Z",
                "updatedAt": "2021-07-20T15:34:06.156Z"
            }
        ]
    }
}
```

#### Get contact by Id request

```shell
GET /api/contacts/:contactId

```

#### Get all contacts success response

```shell
{
    "status": "success",
    "code": 200,
    "data": {
        "contacts": [
            {
                "favorite": false,
                "_id": "60f6ecee952a261cd8436956",
                "name": "SysAdmin",
                "email": "sysadmin@gmail.com",
                "phone": "111-111-1111",
                "owner": {
                    "name": "Name",
                    "email": "example@mail.com"
                },
                "createdAt": "2021-07-20T15:34:06.156Z",
                "updatedAt": "2021-07-20T15:34:06.156Z"
            }
        ]
    }
}
```

#### Create contact request

```shell
POST /api/contacts
Content-Type: application/json
RequestBody:
{
    "name":"Admin",
    "email":"admin@gmail.com",
    "phone":"222-222-2222"
}

```

#### Create contact success response

```shell
{
    "status": "success",
    "code": 201,
    "message": "New contact has been added",
    "data": {
        "contact": {
            "favorite": false,
            "_id": "60f6ef5e952a261cd843696d",
            "name": "Admin",
            "email": "admin@gmail.com",
            "phone": "222-222-2222",
            "owner": "60f6b02c0bd12910e077aa02",
            "createdAt": "2021-07-20T15:44:30.362Z",
            "updatedAt": "2021-07-20T15:44:30.362Z"
        }
    }
}
```

#### Delete contact request

```shell
DELETE /api/contacts/:contactId
```

#### Delete contact success response

```shell
{
    "status": "success",
    "message": "Contact has been deleted",
    "code": 200,
}
```

#### Update contact request

```shell
PATCH /api/contacts/:contactId
Content-Type: application/json
RequestBody:
{
    "phone": "111-444-1111"
}

```

#### Update contact success response

```shell
{
    "status": "success",
    "message": "Data has been updated",
    "code": 200,
    "data": {
        "contact": {
            "favorite": false,
            "_id": "60f6ecee952a261cd8436956",
            "name": "SysAdmin",
            "email": "sysadmin@gmail.com",
            "phone": "111-444-1111",
            "owner": "60f6b02c0bd12910e077aa02",
            "createdAt": "2021-07-20T15:34:06.156Z",
            "updatedAt": "2021-07-20T15:42:49.410Z"
        }
    }
}
```