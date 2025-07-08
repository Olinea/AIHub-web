
## GET 获取AI模型详情

GET /api/admin/ai-models/{id}

根据ID获取AI模型详情

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer(int32)| 是 |模型ID|

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":{"id":1,"modelName":"gpt-4","provider":"OpenAI","apiEndpoint":"https://api.openai.com/v1/chat/completions","apiKey":"sk-xxxxxxxxxxxxxxxxxxxxxxxxx","apiSecret":"secret_xxxxxxxxxxxxxxxxx","organizationId":"string","projectId":"string","extraHeaders":"string","costPer1kTokens":0.03,"rateLimitPerMinute":60,"isEnabled":true,"createdAt":"2019-08-24T14:15:22Z","updatedAt":"2019-08-24T14:15:22Z"},"timestamp":1625644800000}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ApiResponseAiModels](#schemaapiresponseaimodels)|

<a id="opIdupdateAiModel"></a>

## PUT 更新AI模型

PUT /api/admin/ai-models/{id}

更新指定ID的AI模型信息

> Body 请求参数

```json
{
  "id": 1,
  "modelName": "gpt-4",
  "provider": "OpenAI",
  "apiEndpoint": "https://api.openai.com/v1/chat/completions",
  "apiKey": "sk-123123xxx",
  "apiSecret": "anim proident sunt",
  "organizationId": "org-xxxxxxxxxxxxxxxxx",
  "projectId": "proj_xxxxxxxxxxxxxxxxx",
  "extraHeaders": "{\"Custom-Header\":\"value\"}",
  "costPer1kTokens": 0.03,
  "rateLimitPerMinute": 60,
  "isEnabled": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer(int32)| 是 |模型ID|
|body|body|[UpdateAiModelRequest](#schemaupdateaimodelrequest)| 否 |none|

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":{"id":1,"modelName":"gpt-4","provider":"OpenAI","apiEndpoint":"https://api.openai.com/v1/chat/completions","apiKey":"sk-xxxxxxxxxxxxxxxxxxxxxxxxx","apiSecret":"secret_xxxxxxxxxxxxxxxxx","organizationId":"string","projectId":"string","extraHeaders":"string","costPer1kTokens":0.03,"rateLimitPerMinute":60,"isEnabled":true,"createdAt":"2019-08-24T14:15:22Z","updatedAt":"2019-08-24T14:15:22Z"},"timestamp":1625644800000}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ApiResponseAiModels](#schemaapiresponseaimodels)|

<a id="opIddeleteAiModel"></a>

## DELETE 删除AI模型

DELETE /api/admin/ai-models/{id}

删除指定ID的AI模型

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer(int32)| 是 |模型ID|

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":{},"timestamp":1625644800000}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ApiResponseVoid](#schemaapiresponsevoid)|

<a id="opIdgetAiModels"></a>

## GET 获取AI模型列表

GET /api/admin/ai-models

分页获取AI模型列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|current|query|integer(int32)| 否 |页码|
|size|query|integer(int32)| 否 |每页大小|
|modelName|query|string| 否 |模型名称|
|provider|query|string| 否 |提供商|
|isEnabled|query|boolean| 否 |是否启用|

> 返回示例

> 200 Response

```
{
    "code": 200,
    "message": "获取AI模型列表成功",
    "data": {
        "records": [
            {
                "id": 2,
                "modelName": "gemini-1.5-pro",
                "provider": "Google",
                "apiEndpoint": "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                "apiKey": "AIzaSyA4qI17efdFj062ZyopPCa7dtB0h68Eykw",
                "apiSecret": "",
                "organizationId": "",
                "projectId": "your-google-cloud-project-id",
                "extraHeaders": "{\"X-Goog-User-Project\": \"your-google-cloud-project-id\"}",
                "costPer1kTokens": 0.010000,
                "rateLimitPerMinute": 60,
                "isEnabled": true,
                "createdAt": "2025-07-08T09:54:23",
                "updatedAt": "2025-07-08T03:17:24"
            },
            {
                "id": 1,
                "modelName": "gpt-4",
                "provider": "OpenAI",
                "apiEndpoint": "https://api.openai.com/v1/chat/completions",
                "apiKey": "sk-123123xxx",
                "apiSecret": "anim proident sunt",
                "organizationId": "org",
                "projectId": "",
                "extraHeaders": "{\"Custom-Header\":\"value\"}",
                "costPer1kTokens": 0.030000,
                "rateLimitPerMinute": 60,
                "isEnabled": false,
                "createdAt": "2025-07-08T09:54:16",
                "updatedAt": "2025-07-08T10:01:35"
            }
        ],
        "total": 2,
        "size": 10,
        "current": 1,
        "pages": 1
    },
    "timestamp": 1751964680442
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ApiResponsePageAiModels](#schemaapiresponsepageaimodels)|

<a id="opIdaddAiModel"></a>

## POST 添加AI模型

POST /api/admin/ai-models

添加新的AI模型
前端需要约束输入的provider，提供商只能选择OpenAI，Google等已知的AI服务提供商。
> Body 请求参数

```json
{
  "modelName": "gemini-1.5-pro",
  "provider": "Google",
  "apiEndpoint": "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
  "apiKey": "your-google-api-key",
  "apiSecret": "",
  "organizationId": "",
  "projectId": "",
  "extraHeaders": "{\"X-Goog-User-Project\": \"your-google-cloud-project-id\"}",//可为空
  "costPer1kTokens": 0.01,
  "rateLimitPerMinute": 60,
  "isEnabled": false
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AddAiModelRequest](#schemaaddaimodelrequest)| 否 |none|

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":{"id":1,"modelName":"gpt-4","provider":"OpenAI","apiEndpoint":"https://api.openai.com/v1/chat/completions","apiKey":"sk-xxxxxxxxxxxxxxxxxxxxxxxxx","apiSecret":"secret_xxxxxxxxxxxxxxxxx","organizationId":"string","projectId":"string","extraHeaders":"string","costPer1kTokens":0.03,"rateLimitPerMinute":60,"isEnabled":true,"createdAt":"2019-08-24T14:15:22Z","updatedAt":"2019-08-24T14:15:22Z"},"timestamp":1625644800000}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ApiResponseAiModels](#schemaapiresponseaimodels)|

<a id="opIdtoggleAiModelStatus"></a>

## PATCH 切换AI模型状态

PATCH /api/admin/ai-models/{id}/status

启用或禁用AI模型

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer(int32)| 是 |模型ID|

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":{"id":1,"modelName":"gpt-4","provider":"OpenAI","apiEndpoint":"https://api.openai.com/v1/chat/completions","apiKey":"sk-xxxxxxxxxxxxxxxxxxxxxxxxx","apiSecret":"secret_xxxxxxxxxxxxxxxxx","organizationId":"string","projectId":"string","extraHeaders":"string","costPer1kTokens":0.03,"rateLimitPerMinute":60,"isEnabled":true,"createdAt":"2019-08-24T14:15:22Z","updatedAt":"2019-08-24T14:15:22Z"},"timestamp":1625644800000}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ApiResponseAiModels](#schemaapiresponseaimodels)|

<a id="opIdgetAllAiModels"></a>

## GET 获取所有AI模型

GET /api/admin/ai-models/all

获取所有AI模型（不分页）

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":[{"id":1,"modelName":"gpt-4","provider":"OpenAI","apiEndpoint":"https://api.openai.com/v1/chat/completions","apiKey":"sk-xxxxxxxxxxxxxxxxxxxxxxxxx","apiSecret":"secret_xxxxxxxxxxxxxxxxx","organizationId":"string","projectId":"string","extraHeaders":"string","costPer1kTokens":0.03,"rateLimitPerMinute":60,"isEnabled":true,"createdAt":"2019-08-24T14:15:22Z","updatedAt":"2019-08-24T14:15:22Z"}],"timestamp":1625644800000}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ApiResponseListAiModels](#schemaapiresponselistaimodels)|

# AI模型测试

<a id="opIdtestApiConnection"></a>

## POST 测试API连接

POST /api/admin/ai-models/{id}/test-connection

测试指定AI模型的API连接是否正常

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer(int32)| 是 |模型ID|

> 返回示例

> 200 Response

```
{
    "code": 200,
    "message": "API连接测试完成",
    "data": "🔍 测试模型信息:\n模型名称: gemini-1.5-pro\n提供商: Google\nAPI端点: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent\nAPI密钥: AIzaSyA4***0h68Eykw\n项目ID: your-google-cloud-project-id\n\n📊 测试结果:\n✅ Google API连接测试成功\n响应内容: Hello! This is a successful connection. I can",
    "timestamp": 1751944657980
}
```
data使用Toast显示
### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ApiResponseString](#schemaapiresponsestring)|

<a id="opIdshowModelConfig"></a>

## GET 显示模型配置

GET /api/admin/ai-models/{id}/show-config

显示指定AI模型的完整配置信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer(int32)| 是 |模型ID|

> 返回示例

> 200 Response

```
{"code":200,"message":"操作成功","data":{"id":1,"modelName":"gpt-4","provider":"OpenAI","apiEndpoint":"https://api.openai.com/v1/chat/completions","apiKey":"sk-xxxxxxxxxxxxxxxxxxxxxxxxx","apiSecret":"secret_xxxxxxxxxxxxxxxxx","organizationId":"string","projectId":"string","extraHeaders":"string","costPer1kTokens":0.03,"rateLimitPerMinute":60,"isEnabled":true,"createdAt":"2019-08-24T14:15:22Z","updatedAt":"2019-08-24T14:15:22Z"},"timestamp":1625644800000}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ApiResponseAiModels](#schemaapiresponseaimodels)|
