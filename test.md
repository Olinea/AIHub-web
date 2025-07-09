ConversationDetail.vue:461 Starting stream request...
chat-debug.ts:66 Making request to: /api/v1/chat/completions
chat-debug.ts:67 Request body: {
  "id": 4,
  "conversationId": 67,
  "messages": [
    {
      "role": "user",
      "content": "你好",
      "name": null
    },
    {
      "role": "assistant",
      "content": "你好！😊 很高兴见到你～有什么我可以帮你的吗？",
      "name": null
    },
    {
      "role": "user",
      "content": "你好",
      "name": null
    },
    {
      "role": "user",
      "content": "一句话介绍你自己",
      "name": null
    },
    {
      "role": "assistant",
      "content": "你好呀！我是 **DeepSeek Chat**，由深度求索打造的智能AI助手，擅长回答问题、提供创意、陪你聊天，还能帮你处理各种文档！😊 有什么需要帮忙的吗？",
      "name": null
    },
    {
      "role": "user",
      "content": "一句话说明会做什么",
      "name": null
    }
  ],
  "stream": true,
  "temperature": 0.7,
  "max_tokens": 2000
}
chat-debug.ts:78 Response status: 200
chat-debug.ts:79 Response headers: {access-control-allow-origin: 'http://localhost:5173', cache-control: 'no-cache, no-store, max-age=0, must-revalidate', connection: 'close', content-type: 'text/event-stream', date: 'Wed, 09 Jul 2025 11:44:12 GMT', …}
chat-debug.ts:94 Starting to read stream...
chat-debug.ts:102 Raw chunk received: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"role\":\"assistant\",\"content\":\"\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\ndata:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"我是\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"role\":\"assistant\",\"content\":\"\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"role\":\"assistant\",\"content\":\"\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"我是\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"我是\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"你的\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"你的\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"你的\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"智能\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\ndata:"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"智能\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"智能\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"助手\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"助手\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"助手\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"，\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"，\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"，\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"能\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"能\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"能\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"聊天\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"聊天\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"聊天\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"、\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\ndata:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"解答\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"、\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"、\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"解答\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"解答\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"问题\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"问题\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"问题\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"、\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"、\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"、\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"处理\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:102 Raw chunk received: "\nretry:0\n\ndata:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"文档\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"处理\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"处理\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"文档\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"文档\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"、\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:102 Raw chunk received: "\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"、\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"、\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"提供\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:102 Raw chunk received: "\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"提供\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"提供\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"创意\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:102 Raw chunk received: "\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"创意\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"创意\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"，\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"，\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"，\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"随时\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"随时\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"随时\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"帮你\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"帮你\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"帮你\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"解决\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:102 Raw chunk received: "\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"解决\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"解决\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"各种\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"各种\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"各种\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"需求\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:102 Raw chunk received: "\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"需求\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"需求\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"！\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"！\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"！\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"😊\"},\"logprobs\":null,\"finish_reason\":null}]}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"😊\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"😊\"},\"logprobs\":null,\"finish_reason\":null}]}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:"
chat-debug.ts:102 Raw chunk received: "{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"\"},\"logprobs\":null,\"finish_reason\":\"stop\"}],\"usage\":{\"prompt_tokens\":77,\"completion_tokens\":25,\"total_tokens\":102,\"prompt_tokens_details\":{\"cached_tokens\":0},\"prompt_cache_hit_tokens\":0,\"prompt_cache_miss_tokens\":77}}\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"\"},\"logprobs\":null,\"finish_reason\":\"stop\"}],\"usage\":{\"prompt_tokens\":77,\"completion_tokens\":25,\"total_tokens\":102,\"prompt_tokens_details\":{\"cached_tokens\":0},\"prompt_cache_hit_tokens\":0,\"prompt_cache_miss_tokens\":77}}"
chat-debug.ts:145 Line does not start with "data: ": "data:{\"id\":\"e3ef9ee5-26d1-406a-aa25-fa168fd5938f\",\"object\":\"chat.completion.chunk\",\"created\":1752061449,\"model\":\"deepseek-chat\",\"system_fingerprint\":\"fp_8802369eaa_prod0623_fp8_kvcache\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"\"},\"logprobs\":null,\"finish_reason\":\"stop\"}],\"usage\":{\"prompt_tokens\":77,\"completion_tokens\":25,\"total_tokens\":102,\"prompt_tokens_details\":{\"cached_tokens\":0},\"prompt_cache_hit_tokens\":0,\"prompt_cache_miss_tokens\":77}}"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
chat-debug.ts:102 Raw chunk received: "data:[DONE]\nretry:0\n\n"
chat-debug.ts:111 Processing line: "data:[DONE]"
chat-debug.ts:145 Line does not start with "data: ": "data:[DONE]"
chat-debug.ts:111 Processing line: "retry:0"
chat-debug.ts:145 Line does not start with "data: ": "retry:0"
chat-debug.ts:111 Processing line: ""
