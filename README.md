# api-location-firebase


API Criada para uso dentro do aplicativo Easy Sport Match, desenvolvido durante especializaçao em Engenharia de Software EES UFSCAR


Requests disponíveis



# GET /locations/:id

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| id            | string        | sim          |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| id     | string        |
| userID     | string        |
| locationName     | string        |
| zip     | string        |
| city     | string        |
| address     | string        |
| imageUrl     | string        |
| geolocation     | Map<string,string>        |
| createDate     | string        |

---

# GET /locations/

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
|       |               |         |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| listLocations     | List<Map<string,string>>        |

---


# POST /locations/

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| latitude      | string              | sim        |
| longitude      | string              | sim        |
| address      | string              | sim        |
| avaiableDays      | string              | sim        |
| avaiableHours      | string              | sim        |
| city      | string              | sim        |
| hourValue      | string              | sim        |
| imageUrl      | string              | sim        |
| locationName      | string              | sim        |
| number      | string              | sim        |
| userID      | string              | sim        |
| zip      | string              | sim        |



## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| id      | string              | 
| geolocation      | Map<string,string>|
| address      | string              |
| avaiableDays      | string              |
| avaiableHours      | string              |
| city      | string              | 
| hourValue      | string              |
| imageUrl      | string              | 
| locationName      | string              |
| number      | string              | 
| userID      | string              | 
| zip      | string              | 


---

# PATCH /locations/avaiability/:id

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
|  id     |   string            | sim         |
|  avaiableDays      |   string            | sim         |
|  avaiableHours      |   string            | sim         |
|  hourValue      |   string            | sim         |




## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| response     | string        |

---

# PATCH /locations/:id

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| id      | string              | sim        |
| latitude      | string              | sim        |
| longitude      | string              | sim        |
| address      | string              | sim        |
| avaiableDays      | string              | sim        |
| avaiableHours      | string              | sim        |
| city      | string              | sim        |
| hourValue      | string              | sim        |
| imageUrl      | string              | sim        |
| locationName      | string              | sim        |
| number      | string              | sim        |
| userID      | string              | sim        |
| zip      | string              | sim        |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| response     | string        |

---
