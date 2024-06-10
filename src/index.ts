/// <reference types="wx" />

import { CountdownTask } from '@etsoo/task';

/**
 * wx extended Utils
 * 微信脚本扩展工具
 */
export namespace wxe {
    /**
     * Make async call
     * 异步调用
     * @param fn 异步调用的wx方法
     * @param params 参数
     * @returns 结果
     */
    export function promise<F extends (params: any) => void>(
        fn: F,
        params: Omit<Parameters<F>[0], 'success' | 'fail'>
    ) {
        type P = NonNullable<Parameters<F>[0]>;
        type D = Parameters<P['success']>[0];
        return new Promise<D>((resolve, reject) => {
            fn({
                ...params,
                success: resolve,
                fail: reject
            });
        });
    }

    /**
     * Config
     * 配置
     * @param params Parameters
     * @returns
     */
    export function configAsync(params: wx.ConfigParams) {
        return new Promise<wx.ErrorData | null>((resolve) => {
            // 是否为微信客户端
            if (!navigator.userAgent.match(/MicroMessenger/i)?.length) {
                resolve({ errMsg: 'No MicroMessenger' });
                return;
            }

            wx.config({
                ...params
            });
            wx.ready(() => {
                resolve(null);
            });
            wx.error((res) => {
                resolve(res);
            });
        });
    }

    /**
     * 异步判断当前客户端版本是否支持指定JS接口
     * @param params Parameters
     * @returns 判定结果
     */
    export function checkJsApiAsync<T extends wx.ApiName[]>(
        params: Omit<wx.CheckJsApiParams<T>, 'success' | 'fail'>
    ) {
        type P = Required<wx.CheckJsApiParams<T>>;
        return new Promise<Parameters<P['success']>[0]>((resolve) => {
            wx.checkJsApi({
                ...params,
                fail(res) {
                    resolve({ ...res, checkResult: {} });
                },
                success(res) {
                    resolve(res);
                }
            });
        });
    }

    /**
     * Record voice
     * 录音
     * @returns data and stop methods
     */
    export function recordVoice() {
        const task = new CountdownTask();
        return {
            stop() {
                task.stop();
            },
            data() {
                return new Promise<string | null>((resolve) => {
                    wx.startRecord({
                        success: () => {
                            task.start(() => {
                                wx.stopRecord({
                                    success(res) {
                                        resolve(res.localId);
                                    },
                                    fail() {
                                        resolve(null);
                                    }
                                });
                            }, 59500);
                        },
                        fail: () => {
                            resolve(null);
                        }
                    });
                });
            }
        };
    }

    /**
     * Setup wechat share, the link should be opened inside the public account
     * 设置微信分享，链接必须在公众号聊天界面打开（2022/5/19还需要）
     * @param data Shared data
     * @param p checkJsApi result
     * @param debug Show error message
     */
    export function setupShare(
        data: wx.UpdateAppMessageShareDataParams,
        p: { [K in wx.ApiName]?: wx.CheckJsApiResult },
        debug?: boolean
    ) {
        // 朋友圈版本数据
        const { desc, ...data1 } = data;

        try {
            if (p.updateAppMessageShareData === true)
                wx.updateAppMessageShareData(data);

            if (p.updateTimelineShareData === true)
                wx.updateTimelineShareData(data1);
        } catch (e) {
            if (debug) alert('New: ' + e);
            else console.log('New', e);
        }

        try {
            if (p.onMenuShareAppMessage === true)
                wx.onMenuShareAppMessage(data);

            if (p.onMenuShareTimeline === true) wx.onMenuShareTimeline(data1);
        } catch (e) {
            if (debug) alert('Old: ' + e);
            else console.log('Old', e);
        }
    }
}
