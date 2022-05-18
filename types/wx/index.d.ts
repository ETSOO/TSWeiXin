/**
 * types/wx/index.d.ts
 * skipLibCheck = false
 * typeRoots includes ./types folder
 */

/**
 * Wechat JSSDK 1.6
 * UMD = Universal Module Definition
 * https://github.com/umdjs/umd
 * https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-plugin-d-ts.html
 */
declare namespace wx {
    /**
     * Api name
     */
    type ApiName =
        | 'updateAppMessageShareData'
        | 'onMenuShareAppMessage'
        | 'updateTimelineShareData'
        | 'onMenuShareTimeline'
        | 'onMenuShareWeibo'
        | 'chooseImage'
        | 'previewImage'
        | 'uploadImage'
        | 'downloadImage'
        | 'startRecord'
        | 'stopRecord'
        | 'onVoiceRecordEnd'
        | 'playVoice'
        | 'pauseVoice'
        | 'stopVoice'
        | 'onVoicePlayEnd'
        | 'uploadVoice'
        | 'downloadVoice'
        | 'translateVoice'
        | 'getNetworkType'
        | 'openLocation'
        | 'getLocation'
        | 'hideOptionMenu'
        | 'showOptionMenu'
        | 'hideMenuItems'
        | 'showMenuItems'
        | 'hideAllNonBaseMenuItem'
        | 'showAllNonBaseMenuItem'
        | 'closeWindow'
        | 'scanQRCode'
        | 'chooseWXPay'
        | 'openProductSpecificView'
        | 'addCard'
        | 'chooseCard'
        | 'openCard';

    // Menu items

    /**
     * Base / 基本 menu items
     */
    type MenuBaseItems =
        | 'menuItem:exposeArticle' // 举报
        | 'menuItem:setFont' // 调整字体
        | 'menuItem:dayMode' // 日间模式
        | 'menuItem:nightMode' // 夜间模式
        | 'menuItem:refresh' // 刷新
        | 'menuItem:profile' // 查看公众号（已添加）
        | 'menuItem:addContact'; // 查看公众号（未添加）

    /**
     * Share / 传播 menu items
     */
    type MenuShareItems =
        | 'menuItem:share:appMessage' // 发送给朋友
        | 'menuItem:share:timeline' // 分享到朋友圈
        | 'menuItem:share:qq' // 分享到QQ
        | 'menuItem:share:weiboApp' // 分享到Weibo
        | 'menuItem:favorite' // 收藏
        | 'menuItem:share:facebook' // 分享到FB
        | 'menuItem:share:QZone'; // 分享到 QQ 空间

    /**
     * Protcted / 保护类 menu items
     */
    type MenuProtectedItems =
        | 'menuItem:editTag' // 编辑标签
        | 'menuItem:delete' // 删除
        | 'menuItem:copyUrl' // 复制链接
        | 'menuItem:originPage' // 原网页
        | 'menuItem:readMode' // 阅读模式
        | 'menuItem:openWithQQBrowser' // 在QQ浏览器中打开
        | 'menuItem:openWithSafari' // 在Safari中打开
        | 'menuItem:share:email' // 邮件
        | 'menuItem:share:brand'; // 一些特殊公众号

    /**
     * Api type
     * N for Normal
     * C for Cancelable
     * M for Menu
     */
    type ApiType = 'N' | 'C' | 'M';

    /**
     * Api boolean type
     */
    type ApiBool = 0 | 1;

    /**
     * Error data
     * 错误信息
     */
    type ErrorData = { errMsg: string };

    /**
     * Base api parameters
     * Union type '1' | '2' vs intersection type { a: number} & {b: number } => {a: number, b: number }
     */
    type BaseParams<D extends {}> = {
        success?: (res: D & ErrorData) => void;
        fail?: (res: ErrorData) => void;
        complete?: (res: ErrorData) => void;
    };

    /**
     * Api parameters
     */
    type Params<D extends {} = {}, T extends ApiType = 'N'> = (T extends 'N'
        ? {}
        : T extends 'C'
        ? { cancel?: (res: ErrorData) => void }
        : { trigger?: (res: ErrorData) => void }) &
        BaseParams<D>;

    /**
     * Config base parameters
     */
    type ConfigBase = {
        appId: string;
        timestamp: string;
        nonceStr: string;
        signature: string;
    };

    /**
     * Config parameters
     */
    type ConfigParams = ConfigBase & {
        debug?: boolean;
        jsApiList: ApiName[];
    };

    /**
     * 通过config接口注入权限验证配置
     * @param params Parameters
     */
    function config(params: ConfigParams): void;

    /**
     * 通过ready接口处理成功验证
     * @param fn Callback
     */
    function ready(fn: () => void): void;

    /**
     * 通过error接口处理失败验证
     * @param fn Callback
     */
    function error(fn: (res: ErrorData) => void): void;

    /**
     * checkJsApi parameters
     * 如果权限项目没有在config中指定，会为空
     */
    type CheckJsApiParams<T extends ApiName = ApiName> = {
        jsApiList: T[];
    } & Params<{
        checkResult: { [P in T]?: boolean };
    }>;

    /**
     * 判断当前客户端版本是否支持指定JS接口
     * 需要首先在config的 jsApiList 指定，否则为空
     * @param params Parameters
     */
    function checkJsApi<T extends ApiName = ApiName>(
        params: CheckJsApiParams<T>
    ): void;

    /**
     * Share data base
     * 基础分享数据
     */
    type ShareData = {
        title: string;
        link: string;
        imgUrl: string;
    };

    /**
     * updateAppMessageShareData parameters
     */
    type UpdateAppMessageShareDataParams = {
        desc: string;
    } & ShareData &
        Params;

    /**
     * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
     * @param params Parameters
     */
    function updateAppMessageShareData(
        params: UpdateAppMessageShareDataParams
    ): void;

    /**
     * onMenuShareAppMessage parameters
     */
    type OnMenuShareAppMessageParams = UpdateAppMessageShareDataParams & {
        type?: 'link' | 'music' | 'video';
        dataUrl?: string;
    } & Params;

    /**
     * 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
     */
    function onMenuShareAppMessage(params: OnMenuShareAppMessageParams): void;

    /**
     * updateTimelineShareData parameters
     */
    type UpdateTimelineShareDataParams = ShareData & Params;

    /**
     * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
     * @param params Parameters
     */
    function updateTimelineShareData(
        params: UpdateTimelineShareDataParams
    ): void;

    /**
     * onMenuShareTimeline parameters
     */
    type OnMenuShareTimelineParams = UpdateTimelineShareDataParams;

    /**
     * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
     * @param params Parameters
     */
    function onMenuShareTimeline(params: OnMenuShareTimelineParams): void;

    /**
     * onMenuShareWeibo parameters
     */
    type OnMenuShareWeiboParams = {
        desc: string;
    } & (ShareData & Params<{}, 'C'>);

    /**
     * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
     * @param params Parameters
     */
    function onMenuShareWeibo(params: OnMenuShareWeiboParams): void;

    // Image / 图片

    /**
     * chooseImage parameters
     * localIds 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
     */
    type ChooseImageParams = {
        count?: number;
        sizeType?: ('original' | 'compressed')[];
        sourceType?: ('album' | 'camera')[];
    } & Params<{ localIds: string[] }, 'C'>;

    /**
     * 拍照或从手机相册中选图接口
     * @param params Parameters
     */
    function chooseImage(params: ChooseImageParams): void;

    /**
     * previewImage parameters
     */
    type PreviewImageParams = {
        current: string;
        urls: string[];
    } & Params;

    /**
     * 预览图片接口
     * @param param Parameters
     */
    function previewImage(param: PreviewImageParams): void;

    /**
     * uploadImage parameters
     * localId: 需要上传的图片的本地ID，由chooseImage接口获得
     * serverId: 返回图片的服务器端ID
     */
    type UploadImageParams = {
        localId: string;
        isShowProgressTips?: ApiBool;
    } & Params<{ serverId: string }>;

    /**
     * 上传图片接口
     * 备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id
     * @param params Parameters
     */
    function uploadImage(params: UploadImageParams): void;

    /**
     * downloadImage paramters
     */
    type DownloadImageParams = {
        serverId: string;
        isShowProgressTips?: ApiBool;
    } & Params<{ localId: string }>;

    /**
     * 下载图片接口
     * @param params Parameters
     */
    function downloadImage(params: DownloadImageParams): void;

    /**
     * getLocalImgData parameters
     * localData是图片的base64数据，可以用img标签显示
     */
    type GetLocalImgDataParams = { localId: string } & Params<{
        localData: string;
    }>;

    /**
     * 获取本地图片接口
     * 备注：此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题
     * @param params Parameters
     */
    function getLocalImgData(params: GetLocalImgDataParams): void;

    // Audio / 音频

    /**
     * startRecord parameters
     */
    type StartRecordParams = Params;

    /**
     * 开始录音接口
     * @param params Parameters
     */
    function startRecord(params?: StartRecordParams): void;

    /**
     * stopRecord parameters
     */
    type StopRecordParams = Params<{ localId: string }>;

    /**
     * 停止录音接口
     * @param params Parameters
     */
    function stopRecord(params: StopRecordParams): void;

    /**
     * onVoiceRecordEnd parameters
     */
    type OnVoiceRecordEndParams = Params<{ localId: string }>;

    /**
     * 监听录音自动停止接口
     * 录音时间超过一分钟没有停止的时候会执行 complete 回调
     * 测试过程发现bug无法触发
     * @param params Parameters
     */
    function onVoiceRecordEnd(params: OnVoiceRecordEndParams): void;

    /**
     * playVoice parameters
     */
    type PlayVoiceParams = { localId: string } & Params;

    /**
     * 播放语音接口
     * @param params Parameters
     */
    function playVoice(params: PlayVoiceParams): void;

    /**
     * pauseVoice parameters
     */
    type PauseVoiceParams = { localId: string } & Params;

    /**
     * 暂停播放接口
     * @param params Parameters
     */
    function pauseVoice(params: PauseVoiceParams): void;

    /**
     * stopVoice parameters
     */
    type StopVoiceParams = { localId: string } & Params;

    /**
     * 停止播放接口
     * @param params Parameters
     */
    function stopVoice(params: StopVoiceParams): void;

    /**
     * onVoicePlayEnd parameters
     */
    type OnVoicePlayEndParams = Params<{ localId: string }>;

    /**
     * 监听语音播放完毕接口
     * @param params Parameters
     */
    function onVoicePlayEnd(params: OnVoicePlayEndParams): void;

    /**
     * uploadVoiceParams parameters
     */
    type UploadVoiceParams = {
        localId: string;
        isShowProgressTips?: ApiBool;
    } & Params<{ serverId: string }>;

    /**
     * 上传语音接口
     * 备注：上传语音有效期3天，可用微信多媒体接口下载语音到自己的服务器，此处获得的 serverId 即 media_id，
     * 目前多媒体文件下载接口的频率限制为10000次/天
     * @param params Parameters
     */
    function uploadVoice(params: UploadVoiceParams): void;

    /**
     * downloadVoiceParams parameters
     */
    type DownloadVoiceParams = {
        serverId: string;
        isShowProgressTips?: ApiBool;
    } & Params<{ localId: string }>;

    /**
     * 下载语音接口
     * @param params Parameters
     */
    function downloadVoice(params: DownloadVoiceParams): void;

    /**
     * translateVoice parameters
     */
    type TranslateVoiceParams = {
        localId: string;
        isShowProgressTips?: ApiBool;
    } & Params<{ translateResult: string }>;

    /**
     * 识别音频并返回识别结果接口
     * @param params Parameters
     */
    function translateVoice(params: TranslateVoiceParams): void;

    /**
     * getNetworkType parameters
     */
    type GetNetworkTypeParams = Params<{
        networkType: '2g' | '3g' | '4g' | '5g' | 'wifi';
    }>;

    /**
     * 获取网络状态接口
     * @param params Parameters
     */
    function getNetworkType(params?: GetNetworkTypeParams): void;

    /**
     * openLocation parameters
     */
    type OpenLocationParams = {
        latitude: number;
        longitude: number;
        name: string;
        address: string;
        scale?: number;
        infoUrl?: string;
    } & Params;

    /**
     * 使用微信内置地图查看位置接口
     * @param params Parameters
     */
    function openLocation(params: OpenLocationParams): void;

    /**
     * getLocation parameters
     * 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
     */
    type GetLocationParams = { type: 'wgs84' | 'gcj02' } & Params<{
        latitude: number;
        longitude: number;
        speed: number;
        accuracy: number;
    }>;

    /**
     * 获取地理位置接口
     * @param params Parameters
     */
    function getLocation(params: GetLocationParams): void;

    /**
     * startSearchBeacons parameters
     * 摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面
     */
    type StartSearchBeaconsParams = { ticket: string } | Params;

    /**
     * 开启查找周边ibeacon设备接口
     * 备注：如需接入摇一摇周边功能，请参考：申请开通摇一摇周边
     * @param params Parameters
     */
    function startSearchBeacons(params: StartSearchBeaconsParams): void;

    /**
     * stopSearchBeacons parameters
     */
    type StopSearchBeaconsParams = Params;

    /**
     * 关闭查找周边ibeacon设备接口
     * @param params Parameters
     */
    function stopSearchBeacons(params: StopSearchBeaconsParams): void;

    /**
     * onSearchBeacons parameters
     */
    type OnSearchBeaconsParams = Params<{
        beacons: {
            major: number;
            minor: number;

            // 设备唯一识别号
            uuid: string;

            // 距离，单位为米
            accuracy: string;

            // 接收信号的强度指示
            rssi: string;

            // 精度，0：CLProximityUnknown, 1：CLProximityImmediate, 2：CLProximityNear, 3：CLProximityFar
            proximity: string;

            // 接收信号时设备的方向（安卓设备返回有此字段，iOS无）；iOS设备若需要获取方向，可以利用HTML5标准API获取
            heading: string;
        };
    }>;

    /**
     * 监听周边ibeacon设备接口
     * @param params Parameters
     */
    function onSearchBeacons(params: OnSearchBeaconsParams): void;

    /**
     * closeWindow parameters
     */
    type CloseWindowParams = Params;

    /**
     * 关闭当前网页窗口接口
     * @param params Parameters
     */
    function closeWindow(params?: CloseWindowParams): void;

    /**
     * hideMenuItems parameters
     */
    type HideMenuItemsParams = {
        menuList: (MenuShareItems | MenuProtectedItems)[];
    } & Params;

    /**
     * 批量隐藏功能按钮接口
     * 只能隐藏“传播类”和“保护类”按钮
     * @param params Parameters
     */
    function hideMenuItems(params: HideMenuItemsParams): void;

    /**
     * showMenuItems parameters
     */
    type ShowMenuItemsParams = {
        menuList: (MenuBaseItems | MenuShareItems | MenuProtectedItems)[];
    } & Params;

    /**
     * 批量显示功能按钮接口
     * @param params Parameters
     */
    function showMenuItems(params: ShowMenuItemsParams): void;

    /**
     * hideAllNonBaseMenuItem parameters
     */
    type HideAllNonBaseMenuItemParams = Params;

    /**
     * 隐藏所有非基础按钮接口
     * @param params Parameters
     */
    function hideAllNonBaseMenuItem(
        params?: HideAllNonBaseMenuItemParams
    ): void;

    /**
     * showAllNonBaseMenuItem parameters
     */
    type ShowAllNonBaseMenuItemParams = Params;

    /**
     * 显示所有功能按钮接口
     * @param params Parameters
     */
    function showAllNonBaseMenuItem(
        params?: ShowAllNonBaseMenuItemParams
    ): void;

    /**
     * scanQRCode parameters
     */
    type ScanQRCodeParams<N extends ApiBool> = {
        // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
        needResult?: N;

        // 可以指定扫二维码还是一维码，默认二者都有
        scanType?: ('qrCode' | 'barCode')[];
    } & Params<{
        resultStr: N extends 1 ? string : never;
    }>;

    /**
     * 调起微信扫一扫接口
     * @param params Parameters
     */
    function scanQRCode<N extends ApiBool = 0>(
        params: ScanQRCodeParams<N>
    ): void;

    /**
     * openProductSpecificView parameters
     */
    type OpenProductSpecificViewParams = {
        // 商品id
        productId: string;

        // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
        viewType: '0' | '1' | '2';
    } & Params;

    /**
     * 跳转微信商品页接口
     * @param params Parameters
     */
    function openProductSpecificView(
        params: OpenProductSpecificViewParams
    ): void;

    /**
     * Card signature result
     */
    type CardSignResult = {
        timestamp: string;
        nonceStr: string;
        signType: string;
        cardSign: string;
    };

    /**
     * Card extentions
     * cardExt本身是一个JSON字符串，是商户为该张卡券分配的唯一性信息
     */
    type CardExt = {
        // 指定的卡券code码，只能被领一次。自定义code模式的卡券必须填写，非自定义code和预存code模式的卡券不必填写
        code?: string;

        // 指定领取者的openid，只有该用户能领取。bind_openid字段为true的卡券必须填写，bind_openid字段为false不必填写
        openid?: string;

        // 时间戳，商户生成从1970年1月1日00:00:00至今的秒数,即当前的时间,且最终需要转换为字符串形式;由商户生成后传入,不同添加请求的时间戳须动态生成，若重复将会导致领取失败！
        timestamp: string;

        // 随机字符串，由开发者设置传入， 加强安全性（若不填写可能被重放请求） 。随机字符串，不长于32位。推荐使用大小写字母和数字，不同添加请求的nonce须动态生成，若重复将会导致领取失败
        nonce_str?: string;

        // 卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类型为 DAT E_TYPE_FIX_TERM时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取时间不同步的问题
        fixed_begintimestamp?: string;

        // 领取渠道参数，用于标识本次领取的渠道值
        outer_str?: string;

        // 签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用SHA1
        signature: string;
    };

    /**
     * Card list for post
     */
    type CardListPost = {
        cardList: { cardId: string; cardExt: string }[];
    };

    /**
     * Card list data
     */
    type CardListData = {
        cardList: { cardId: string; cardExt: CardExt }[];
    };

    /**
     * chooseCard parameters
     */
    type ChooseCardParams = {
        // 门店ID。shopID用于筛选出拉起带有指定location_list(shopID)的卡券列表
        shopId?: string;

        // 卡券类型，用于拉起指定卡券类型的卡券列表。当cardType为空时，默认拉起所有卡券的列表
        cardType?: string;

        // 卡券ID，用于拉起指定cardId的卡券列表，当cardId为空时，默认拉起所有卡券的列表
        cardId?: string;
    } & (CardSignResult & Params<CardListData>);

    /**
     * 拉取适用卡券列表并获取用户选择信息
     * @param params Parameters
     */
    function chooseCard(params: ChooseCardParams): void;

    /**
     * addCard parameters
     */
    type AddCardParams = CardListPost & Params<CardListData>;

    /**
     * 批量添加卡券接口
     * @param params Parameters
     */
    function addCard(params: AddCardParams): void;

    /**
     * openCard parameters
     */
    type OpenCardParams = CardListPost & Params;

    /**
     * 查看微信卡包中的卡券接口
     * @param params Parameters
     */
    function openCard(params: OpenCardParams): void;

    /**
     * chooseWXPay parameters
     */
    type ChooseWXPayParams = {
        // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        timestamp: number;

        // 支付签名随机串，不长于 32 位
        nonceStr: string;

        // 统一支付接口返回的prepay_id参数值
        package: string;

        // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
        signType: 'RSA' | 'MD5' | 'HMAC-SHA256';

        // 支付签名
        paySign: string;
    } & Params;

    /**
     * 发起一个微信支付请求
     * @param params Parameters
     */
    function chooseWXPay(params: ChooseWXPayParams): void;

    /**
     * 地址信息
     */
    type OpenAddress = {
        // 收货人姓名
        userName: string;

        // 邮编
        postalCode: string;

        // 省份
        provinceName: string;

        // 市县
        cityName: string;

        // 国家或地区
        countryName: string;

        // 收货地址国家码
        nationalCode: string;

        // 详细收货地址
        detailInfo: string;

        // 收货人手机号码
        telNumber: string;
    };

    /**
     * openAddress parameters
     */
    type OpenAddressParams = Params<OpenAddress>;

    /**
     * 共享收货地址接口
     * 其中，地区对应是国标三级地区码，如“广东省-广州市-天河区”，对应的邮编是是510630。详情参考链接：http://xzqh.mca.gov.cn/defaultQuery
     * @param params Parameters
     */
    function openAddress(params: OpenAddressParams): void;
}
