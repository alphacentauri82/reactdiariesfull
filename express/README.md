Dependencies
====================

```
node 6.x
```

Yarn installation
====================

```bash
brew install yarn
```

[yarn documentation](https://yarnpkg.com/lang/en/docs/install/)

Installation
====================
```bash
yarn install
```
### Link module 'school-diaries-client'

```bash
yarn link "school-diaries-client"
```

Postman test
====================

##Registration user endpoint

### Post
http://localhost:5050/signup

### Body
```
{
  "username": "random.user",
  "dni": "33777888",
  "role": "student",
  "name": "Random User",
  "password": "pass"
}
```

##Login user endpoint

### Post
http://localhost:5050/signin

### Body
```
{
  "dni": "33777888",
  "password": "pass"
}
```
