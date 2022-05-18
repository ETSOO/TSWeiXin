/// <reference types="wx" />

import { wxe } from '.';

// 简单测试
// 通过在 public/index.html 导入 JSSDK
// 在 webpack.config.js, externals: ['wx']，排除对 wx 的打包依赖
// 在 webpack.config.js, entry 指定编译 web.ts 为 wxutils.js 并在 index.html中导入

// 开通微信公众号测试账号 https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
// 安装配置 ngrok: https://ngrok.com/download
// ngrok http 9000 --host-header="localhost:9000"，运行服务，9000为当前测试服务器端口，会有一个随机公共域名映射：da44-202-180-93-189.au.ngrok.io -> http://localhost:9000
// 访问如果出现 “Invalid Host header”，配置 devServer allowedHosts: 'all' //for ngrok，并重新运行服务
// 如果希望获得更长的Session，注册 https://ngrok.com/docs#authtoken
// 配置 JS接口安全域名 为 da44-202-180-93-189.au.ngrok.io，重启 ngrok 后需要重新设置
// 下载 微信开发者工具，登陆后进行公众号调试，域名使用上面的公网地址即可
// 在线签名地址：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign

document.addEventListener('DOMContentLoaded', async () => {
    const appId = 'wxff9d39c6461328dd';

    document.getElementById('app-id')!.innerHTML = appId;
    const stateE = document.getElementById('state')!;
    stateE.innerHTML = 'Loading...';

    /*
    try {
        wx.config({
            debug: true,
            appId,
            nonceStr: 'UnW7MTdpP8IM6WTW',
            timestamp: '1652860914719',
            signature: '3002f148882e27927e322d8411a13ca5f59c1d6c',
            jsApiList: [
                'getNetworkType',
                'updateAppMessageShareData',
                'updateTimelineShareData',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'translateVoice',
                'scanQRCode'
            ]
        });
        wx.error((res) => {
            alert('error' + res);
        });
        wx.ready(() => {
            alert('ready');
        });
    } catch (e) {
        alert('e');
    }
    */

    const result = await wxe.configAsync({
        debug: false,
        appId,
        nonceStr: 'UnW7MTdpP8IM6WTW',
        timestamp: '1652860914719',
        signature: '3002f148882e27927e322d8411a13ca5f59c1d6c',
        jsApiList: [
            'getNetworkType',
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'translateVoice',
            'scanQRCode'
        ]
    });

    if (result == null) {
        stateE.innerHTML = 'OK';
    } else {
        stateE.innerHTML = result.errMsg;
    }

    document.getElementById('check-api')!.innerHTML = JSON.stringify(
        (
            await wxe.checkJsApiAsync({
                jsApiList: ['getNetworkType', 'updateAppMessageShareData']
            })
        ).checkResult
    );

    document.getElementById('network-type')!.innerHTML = (
        await wxe.promise(wx.getNetworkType, {})
    ).networkType;

    const shareData: wx.UpdateTimelineShareDataParams = {
        title: '测试分享',
        link: 'https://ask.studyleader.com',
        imgUrl: 'https://ask.studyleader.com/img/logo.png'
    };
    const shareMData: wx.UpdateAppMessageShareDataParams = {
        ...shareData,
        desc: '来自亿速思维，测试分享信息，请关注我们'
    };

    wx.updateAppMessageShareData(shareMData);
    wx.onMenuShareAppMessage(shareMData);

    wx.updateTimelineShareData(shareData);
    wx.onMenuShareTimeline(shareData);

    document
        .getElementById('choose-image')
        ?.addEventListener('click', async () => {
            const data = await wxe.promise(wx.chooseImage, {
                cancel(res) {
                    console.log('Cancelled', res);
                }
            });
            console.log(data.localIds.length);
        });

    document
        .getElementById('preview-image')
        ?.addEventListener('click', async () => {
            const data = await wxe.promise(wx.chooseImage, {
                cancel(res) {
                    console.log('Cancelled', res);
                }
            });
            await wxe.promise(wx.previewImage, {
                urls: data.localIds,
                current: data.localIds[0]
            });
        });

    document
        .getElementById('upload-image')
        ?.addEventListener('click', async () => {
            const data = await wxe.promise(wx.chooseImage, {
                count: 1
            });
            const result = await wxe.promise(wx.uploadImage, {
                localId: data.localIds[0]
            });
            const downloadResult = await wxe.promise(wx.downloadImage, {
                serverId: result.serverId
            });
            console.log(downloadResult.localId);
        });

    const task = wxe.recordVoice();
    let recordLocalId: string | null;

    document
        .getElementById('start-record')
        ?.addEventListener('click', async () => {
            recordLocalId = await task.data();
            if (recordLocalId) {
                await wxe.promise(wx.playVoice, {
                    localId: recordLocalId
                });
            }
        });
    document
        .getElementById('stop-record')
        ?.addEventListener('click', async () => {
            if (recordLocalId) {
                await wxe.promise(wx.playVoice, {
                    localId: recordLocalId
                });
            } else {
                task.stop();
            }
        });

    document
        .getElementById('pause-voice')
        ?.addEventListener('click', async () => {
            if (recordLocalId)
                await wxe.promise(wx.pauseVoice, {
                    localId: recordLocalId
                });
        });

    document
        .getElementById('stop-voice')
        ?.addEventListener('click', async () => {
            if (recordLocalId) {
                try {
                    await wxe.promise(wx.stopVoice, {
                        localId: recordLocalId
                    });
                } catch (e) {
                    console.log('stop-voice', e);
                }

                document.getElementById('voice-p')!.style.display = 'block';
            }
        });

    document
        .getElementById('upload-voice')
        ?.addEventListener('click', async () => {
            if (recordLocalId) {
                const data = await wxe.promise(wx.uploadVoice, {
                    localId: recordLocalId
                });

                await wxe.promise(wx.downloadVoice, {
                    serverId: data.serverId
                });
            }
        });

    document
        .getElementById('translate-voice')
        ?.addEventListener('click', async () => {
            if (recordLocalId)
                await wxe.promise(wx.translateVoice, {
                    localId: recordLocalId
                });
        });

    document
        .getElementById('scan-qrcode')
        ?.addEventListener('click', async () => {
            const data = await wxe.promise(wx.scanQRCode, {
                needResult: 1
            });
            console.log(data.resultStr);
        });
});
