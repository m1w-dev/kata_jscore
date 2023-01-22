
# kata_jscore 4.4.9

Работа с API в Postman.

## Регистрация нового пользователя

```http
  POST https://blog.kata.academy/api/users
```
BODY:
```json
{
  "user": {
    "username": "m1wdev",
    "email": "1@m1w.ru",
    "password": "<password>"
  }
}
```
RESPONSE:
```json
{
  "user": {
    "username": "m1wdev",
    "email": "1@m1w.ru",
    "token": "<token>"
   }
}
```
## Получение токена

```http
  POST https://blog.kata.academy/api/users/login
```
BODY:
```json
{
  "user": {
    "email": "1@m1w.ru",
    "password": "<password>"
  }
}
```
RESPONSE:
```json
{
    "user": {
        "username": "m1wdev",
        "email": "1@m1w.ru",
        "token": "<token>"
    }
}
```
## Получаем данные пользователя

```http
  GET https://blog.kata.academy/api/user
  -h 'Authorization: Bearer <token>'
```
RESPONSE:
```json
{
    "user": {
        "username": "m1wdev",
        "email": "1@m1w.ru",
        "token": "<new_token>"
    }
}
```
