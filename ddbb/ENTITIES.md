Entities
====================

##user   

```javascript

{
  id: <ObjectId1>,
  username: string,
  dni: string,
  role: string,
  name: string,
  password: string
}

```

##school   

```javascript

{
  id: <ObjectId2>,
  name: string,
  address: string,
  number: string,
  category: string
}

```

##professor   

```javascript

{
  id: <ObjectId3>,
  user_id: <ObjectId1>,
  schools: [<ObjectId2>],
  assignments: [<ObjectId8>],
  username: string,
  dni: string,
  registration_number: integer
}

```

##tutor   

```javascript

{
  id: <ObjectId4>,
  user_id: <ObjectId1>,
  students: [<ObjectId7>],
  name: string,
  dni: string,
  address: string,
  role_tutor: string
}

```

##preceptor   

```javascript

{
  id: <ObjectId5>,
  user_id: <ObjectId1>,
  schools: [<ObjectId2>],
  divisions: [<ObjectId6>],
  name: string,
  dni: string,
  address: string
}

```

##division   

```javascript

{
  id: <ObjectId6>,
  school_id: <ObjectId2>,
  preceptor_id: <ObjectId5>,
  assignments: [<ObjectId8>],
  number: integer,
  description: string
}

```

##student   

```javascript

{
  id: <ObjectId7>,
  school_id: <ObjectId2>,
  tutor_id: <ObjectId4>,
  preceptor_id: <ObjectId5>,
  division_id: <ObjectId6>,
  assignments: [<ObjectId8>],
  name: string,
  dni: string,
  address: string
}

```

##assignment   

```javascript

{
  id: <ObjectId8>,
  professors: [<ObjectId3>],
  name: string
}

```

##message   

```javascript

{
  id: <ObjectId9>,
  school_id: <ObjectId2>,
  sent_id: <ObjectId5> / <ObjectId3>,
  recipients: [<ObjectId3> / <ObjectId4> / <ObjectId5>],
  subject: string,
  message: string
}

```
