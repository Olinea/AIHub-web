

## PUT 更新用户积分

PUT /api/auth/admin/users/credit

管理员更新用户的积分余额

> Body 请求参数

```json
{
  "userId": 6,
  "creditBalance": 100
}
```

### 请求参数

| 名称 | 位置 | 类型                                                      | 必选 | 说明 |
| ---- | ---- | --------------------------------------------------------- | ---- | ---- |
| body | body | [UpdateUserCreditRequest](#schemaupdateusercreditrequest) | 否   | none |

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":"string","timestamp":1625644800000}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                      |
| ------ | ------------------------------------------------------- | ---- | --------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK   | [ApiResponseString](#schemaapiresponsestring) |

<a id="opIdupdateUserAdmin"></a>

## PUT 更新用户管理员状态

PUT /api/auth/admin/users/admin

管理员更新用户的管理员权限

> Body 请求参数

```json
{
  "userId": 1,
  "isAdmin": 1
}
```

### 请求参数

| 名称 | 位置 | 类型                                                    | 必选 | 说明 |
| ---- | ---- | ------------------------------------------------------- | ---- | ---- |
| body | body | [UpdateUserAdminRequest](#schemaupdateuseradminrequest) | 否   | none |

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":"string","timestamp":1625644800000}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                      |
| ------ | ------------------------------------------------------- | ---- | --------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK   | [ApiResponseString](#schemaapiresponsestring) |

<a id="opIdgetAllUsers"></a>

## GET 获取所有用户

GET /api/auth/admin/users

管理员获取所有用户列表（分页）

### 请求参数

| 名称    | 位置  | 类型           | 必选 | 说明 |
| ------- | ----- | -------------- | ---- | ---- |
| current | query | integer(int32) | 否   | none |
| size    | query | integer(int32) | 否   | none |

> 返回示例

> 200 Response

```
{
    "code": 200,
    "message": "获取用户列表成功",
    "data": {
        "records": [
            {
                "id": 12,
                "username": "笪文昊",
                "email": "rmftt4_gdg30@sina.com",
                "creditBalance": 10.0000,
                "createdAt": "2025-07-08T07:36:34.717+00:00",
                "updatedAt": "2025-07-08T07:36:34.717+00:00",
                "isAdmin": 0
            }
        ],
        "total": 11,
        "size": 10,
        "current": 2,
        "pages": 2
    },
    "timestamp": 1751961692769
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                                  |
| ------ | ------------------------------------------------------- | ---- | --------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK   | [ApiResponsePageUserInfo](#schemaapiresponsepageuserinfo) |

<a id="opIdgetUsersSummary"></a>

## GET 获取用户统计

GET /api/auth/admin/users/summary

管理员获取用户总数、新增用户、活跃用户等统计信息

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":{"total":0,"newUsers":{"daily":0,"weekly":0,"monthly":0},"activeUsers":{"dau":0,"wau":0,"mau":0}},"timestamp":1625644800000}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                                                  |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK   | [ApiResponseUsersSummaryResponse](#schemaapiresponseuserssummaryresponse) |

<a id="opIdsearchUsers"></a>

## GET 搜索用户

GET /api/auth/admin/users/search

管理员根据关键字搜索用户

### 请求参数

| 名称    | 位置  | 类型   | 必选 | 说明 |
| ------- | ----- | ------ | ---- | ---- |
| keyword | query | string | 是   | none |

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":[{"id":0,"username":"string","email":"string","creditBalance":0,"createdAt":"2019-08-24T14:15:22Z","updatedAt":"2019-08-24T14:15:22Z","isAdmin":0}],"timestamp":1625644800000}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                                  |
| ------ | ------------------------------------------------------- | ---- | --------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK   | [ApiResponseListUserInfo](#schemaapiresponselistuserinfo) |

<a id="opIddeleteUser"></a>

## DELETE 删除用户

DELETE /api/auth/admin/users/{userId}

管理员删除用户

### 请求参数

| 名称   | 位置 | 类型           | 必选 | 说明 |
| ------ | ---- | -------------- | ---- | ---- |
| userId | path | integer(int64) | 是   | none |

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":"string","timestamp":1625644800000}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                      |
| ------ | ------------------------------------------------------- | ---- | --------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK   | [ApiResponseString](#schemaapiresponsestring) |
