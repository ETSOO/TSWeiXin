# @etsoo/weixin
**TypeScript WeChat JSSDK type definition and function extension / 微信JSSDK类型定义和功能扩展**

- Wechat JSSDK 1.6 type definition / 微信JSSDK版本1.6类型定义
- wxe extended utils for promise calls / wxe 扩展工具，支持异步调用

Official / 官网：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

## Installing

Using npm:

```bash
$ npm install @etsoo/weixin
```

Using yarn:

```bash
$ yarn add @etsoo/weixin
```
## wxe

|Name|Description|
|---:|---|
|configAsync|Async config / 异步配置|
|checkJsApiAsync|Async check Api / 异步检查接口|
|recordVoice|Record voice / 录音，支持开始和结束一步操作|
|promise|Makes async call / 创建异步调用|
|setupShare|Setup wechat share / 设置微信分享，链接必须在公众号聊天窗口打开|