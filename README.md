### run
```docker-compose up -d```

```http://localhost:8081/ping```

### rebuild
```docker-compose build --no-cache```

### connections
```curl --location --request GET 'http://localhost:8081/connections```

### connect
```
curl --location --request POST 'http://localhost:8081/connect' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Name",
    "photoUrl": "photoUrl",
    "connection": "localDescription"
}' 
```

### disconnect
```
curl --location --request POST 'http://localhost:8081/disconnect' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "e55837fa-c206-4480-bd9a-06df9293ad81"
}' 
```

### pair
```
curl --location --request POST 'http://localhost:8081/pair' \
--header 'Content-Type: application/json' \
--data-raw '{
    "myId": "c605dcff-d45d-4b5b-a9b1-062c5d402580",
    "pairId": "08d259c3-e8e2-4595-a85c-897cac21b771"
}'
```

### unpair
```
curl --location --request POST 'http://localhost:8081/unpair' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "c605dcff-d45d-4b5b-a9b1-062c5d402580"
}'
```

### clear connections
```
curl --location --request DELETE 'http://localhost:8081/connections'
```
