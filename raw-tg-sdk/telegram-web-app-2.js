// WebView
(function () {
  var eventHandlers = {};

  var locationHash = location.hash.toString();
  var initParams = urlParseHashParams(locationHash);
  // 从 window.sessionStorage 中取出存储的值，附加到 initParams，
  // 并把最新的 initParams 存储到 sessionStorage

  if (isIframe) {
    // 通过浏览器登录 TG，打开 Mini App 就是 iframe
    // 这一段删除代码是 iframe 下细节处理
  }

  function urlSafeDecode(urlencoded) {}

  function urlParseHashParams(locationHash) {}

  function urlParseQueryString(queryString) {}

  // Telegram apps will implement this logic to add service params (e.g. tgShareScoreUrl) to game URL
  function urlAppendHashParams(url, addHash) {}

  // 通过  window.TelegramWebviewProxy 的 postEvent 向 TG 发送消息
  // 如果是 iframe 加载，使用 window.parent.postMessage
  // callback 是通信成功后的回调函数
  function postEvent(eventType, callback, eventData) {}

  // TG 客户端调用 Mini App
  function receiveEvent(eventType, eventData) {
    console.log("[Telegram.WebView] < receiveEvent", eventType, eventData);
    callEventCallbacks(eventType, function (callback) {
      callback(eventType, eventData);
    });
  }

  // 获取 Mini App 的回调处理逻辑
  function callEventCallbacks(eventType, func) {}

  function onEvent(eventType, callback) {}

  function offEvent(eventType, callback) {}

  // 构建 window.Telegram.WebView 对象
  if (!window.Telegram) {
    window.Telegram = {};
  }
  window.Telegram.WebView = {
    initParams: initParams,
    isIframe: isIframe,
    onEvent: onEvent,
    offEvent: offEvent,
    postEvent: postEvent,
    receiveEvent: receiveEvent,
    callEventCallbacks: callEventCallbacks,
  };

  // 构建 window.Telegram.Utils 对象
  window.Telegram.Utils = {
    urlSafeDecode: urlSafeDecode,
    urlParseQueryString: urlParseQueryString,
    urlParseHashParams: urlParseHashParams,
    urlAppendHashParams: urlAppendHashParams,
    sessionStorageSet: sessionStorageSet,
    sessionStorageGet: sessionStorageGet,
  };
})();

// WebApp
(function () {
  var Utils = window.Telegram.Utils;
  var WebView = window.Telegram.WebView;
  var initParams = WebView.initParams;
  var isIframe = WebView.isIframe;

  var WebApp = {};
  var webAppInitData = "",
    webAppInitDataUnsafe = {};
  var themeParams = {},
    colorScheme = "light";
  var webAppVersion = "6.0";
  var webAppPlatform = "unknown";
  var webAppIsActive = true;
  var webAppIsFullscreen = false;
  var webAppIsOrientationLocked = false;
  var webAppBackgroundColor = "bg_color";
  var webAppHeaderColorKey = "bg_color";
  var webAppHeaderColor = null;

  // 下面删除了一些 主题(Theme) 相关的处理细节

  // 获取是否是全屏模式 isFullscreen
  var stored_fullscreen = Utils.sessionStorageGet("isFullscreen");

  // 获取是否锁定屏幕旋转
  var stored_orientation_lock = Utils.sessionStorageGet("isOrientationLocked");
  if (stored_orientation_lock) {
    setOrientationLock(stored_orientation_lock == "yes");
  }

  var lastWindowHeight = window.innerHeight;

  // 屏幕 viewport 调整回调处理
  function onViewportChanged(eventType, eventData) {}
  function onWindowResize(e) {}
  function onVisibilityChanged(eventType, eventData) {}

  // 这是一个事件处理函数，通常绑定到点击事件（例如通过 addEventListener('click', linkHandler)）。
  function linkHandler(e) {
    // 检查用户是否在点击时按下了 Meta 键（Mac 上的 Command 键）或 Ctrl 键。
    // 如果按下了这些修饰键（通常用于打开新标签页或复制链接等操作），函数直接返回，不执行后续逻辑。
    // 允许用户通过修饰键执行默认浏览器行为，而不是被拦截。
    if (e.metaKey || e.ctrlKey) return;

    var el = e.target;
    while (el.tagName != "A" && el.parentNode) {
      el = el.parentNode;
    }
    if (
      el.tagName == "A" &&
      el.target != "_blank" &&
      (el.protocol == "http:" || el.protocol == "https:") &&
      el.hostname == "t.me"
    ) {
      //WebApp.openTgLink接受一个 Telegram 链接（例如 https://t.me/username），
      // 并指示 Telegram 应用在内部打开该链接，而不是通过外部浏览器跳转。
      WebApp.openTgLink(el.href);
      e.preventDefault();
    }
  }

  function receiveWebViewEvent(eventType) {
    var args = Array.prototype.slice.call(arguments);
    eventType = args.shift();
    WebView.callEventCallbacks("webview:" + eventType, function (callback) {
      callback.apply(WebApp, args);
    });
  }

  function onWebViewEvent(eventType, callback) {
    WebView.onEvent("webview:" + eventType, callback);
  }

  function offWebViewEvent(eventType, callback) {
    WebView.offEvent("webview:" + eventType, callback);
  }

  function setFullscreen(is_fullscreen) {
    webAppIsFullscreen = !!is_fullscreen;
    Utils.sessionStorageSet("isFullscreen", webAppIsFullscreen ? "yes" : "no");
  }

  function setOrientationLock(is_locked) {
    webAppIsOrientationLocked = !!is_locked;
    Utils.sessionStorageSet(
      "isOrientationLocked",
      webAppIsOrientationLocked ? "yes" : "no",
    );
  }

  var webAppCallbacks = {};

  var viewportHeight = false,
    viewportStableHeight = false,
    isExpanded = true;
  function setViewportHeight(data) {}

  var safeAreaInset = { top: 0, bottom: 0, left: 0, right: 0 };
  function setSafeAreaInset(data) {}

  var contentSafeAreaInset = { top: 0, bottom: 0, left: 0, right: 0 };
  function setContentSafeAreaInset(data) {}

  var isClosingConfirmationEnabled = false;
  function setClosingConfirmation(need_confirmation) {}

  //动态启用或禁用垂直滑动
  function toggleVerticalSwipes(enable_swipes) {}

  function onFullscreenChanged(eventType, eventData) {}
  function onFullscreenFailed(eventType, eventData) {}

  function toggleOrientationLock(locked) {}

  // “添加到主屏幕”功能
  var homeScreenCallbacks = [];
  function onHomeScreenAdded(eventType, eventData) {}
  function onHomeScreenChecked(eventType, eventData) {}

  // 在 Telegram Mini Apps 中，这段代码可能用于实现“分享功能”，例如：
  // 用户点击“分享”按钮，Mini App 调用 Telegram 的分享界面。
  // Telegram 客户端处理分享请求，并返回成功或失败的结果。
  // Mini App 根据结果更新界面或执行后续逻辑。
  var WebAppShareMessageOpened = false;
  function onPreparedMessageSent(eventType, eventData) {}
  function onPreparedMessageFailed(eventType, eventData) {}

  // 设置 Emoji 状态：Mini App 可能允许用户选择并设置自己的 Emoji 状态。(相关代码已经删除)

  var webAppPopupOpened = false;

  function getHeaderColor() {}
  function setHeaderColor(color) {}
  function updateHeaderColor() {}

  function getBackgroundColor() {}
  function setBackgroundColor(color) {}
  function updateBackgroundColor() {}

  function getBottomBarColor() {}
  function setBottomBarColor(color) {}
  function updateBottomBarColor() {}

  function isColorDark(rgb) {}

  // 定义一个返回按钮
  var BackButton = (function () {})();

  // 定义 debugBottomBar
  if (initParams.tgWebAppDebug) {
  }

  // 定义 BottomButton
  var BottomButtonConstructor = function (type) {};
  var MainButton = BottomButtonConstructor("main");
  var SecondaryButton = BottomButtonConstructor("secondary");

  // 定义 SettingsButton
  var SettingsButton = (function () {})();

  //  触觉反馈(震动)
  var HapticFeedback = (function () {})();

  //  云存储，每个 bot 可以在云存储中为每个用户存储最多 1024 个 items。
  var CloudStorage = (function () {})();

  //  生物识别相关功能
  var BiometricManager = (function () {})();

  //  地理位置信息相关功能
  var LocationManager = (function () {})();

  //  加速度传感器信息,  设备的物理运动（速度变化）, 比如摇一摇
  var Accelerometer = (function () {})();

  //设备的静态朝向（相对于地球）， 适合检测稳定朝向（如指南针）
  var DeviceOrientation = (function () {})();

  // 陀螺仪（Gyroscope）信息
  var Gyroscope = (function () {})();

  // 支付单据相关，Stars Payment?
  var webAppInvoices = {};
  function onInvoiceClosed(eventType, eventData) {}

  // Popup
  var webAppPopupOpened = false;
  function onPopupClosed(eventType, eventData) {}

  // 我二维码相关
  var webAppScanQrPopupOpened = false;
  function onQrTextReceived(eventType, eventData) {}
  function onScanQrPopupClosed(eventType, eventData) {}

  // 剪切板相关
  function onClipboardTextReceived(eventType, eventData) {}

  // 申请一些写权限回调，比如设置用户的 Emoji 状态
  var WebAppWriteAccessRequested = false;
  function onWriteAccessRequested(eventType, eventData) {}

  // 获取“请求的联系信息”(如电话号码)
  function getRequestedContact(callback, timeout) {}

  // 处理“文件下载请求”的回调逻辑
  function onFileDownloadRequested(eventType, eventData) {}

  if (!window.Telegram) {
    window.Telegram = {};
  }

  WebApp.requestFullscreen = function () {};
  WebApp.exitFullscreen = function () {};
  WebApp.addToHomeScreen = function () {};
  WebApp.checkHomeScreenStatus = function (callback) {};
  WebApp.onEvent = function (eventType, callback) {
    onWebViewEvent(eventType, callback);
  };
  WebApp.offEvent = function (eventType, callback) {
    offWebViewEvent(eventType, callback);
  };
  WebApp.sendData = function (data) {};
  WebApp.switchInlineQuery = function (query, choose_chat_types) {};
  WebApp.openLink = function (url, options) {};
  WebApp.openTelegramLink = function (url, options) {};
  WebApp.openInvoice = function (url, callback) {};
  WebApp.showPopup = function (params, callback) {};
  WebApp.showAlert = function (message, callback) {};
  WebApp.showConfirm = function (message, callback) {};
  WebApp.showScanQrPopup = function (params, callback) {};
  WebApp.closeScanQrPopup = function () {};
  WebApp.readTextFromClipboard = function (callback) {};
  WebApp.requestWriteAccess = function (callback) {};
  WebApp.requestContact = function (callback) {};
  WebApp.downloadFile = function (params, callback) {};
  WebApp.shareToStory = function (media_url, params) {};
  WebApp.shareMessage = function (msg_id, callback) {};
  WebApp.setEmojiStatus = function (custom_emoji_id, params, callback) {};
  WebApp.requestEmojiStatusAccess = function (callback) {};
  WebApp.invokeCustomMethod = function (method, params, callback) {};
  WebApp.ready = function () {
    WebView.postEvent("web_app_ready");
  };
  WebApp.expand = function () {
    WebView.postEvent("web_app_expand");
  };
  WebApp.close = function (options) {
    WebView.postEvent("web_app_close", false, req_params);
  };

  window.Telegram.WebApp = WebApp;

  updateHeaderColor();
  updateBackgroundColor();
  updateBottomBarColor();
  setViewportHeight();

  WebView.onEvent("theme_changed", onThemeChanged);
  WebView.onEvent("viewport_changed", onViewportChanged);
  WebView.onEvent("safe_area_changed", onSafeAreaChanged);
  WebView.onEvent("content_safe_area_changed", onContentSafeAreaChanged);
  WebView.onEvent("visibility_changed", onVisibilityChanged);
  WebView.onEvent("invoice_closed", onInvoiceClosed);
  WebView.onEvent("popup_closed", onPopupClosed);
  WebView.onEvent("qr_text_received", onQrTextReceived);
  WebView.onEvent("scan_qr_popup_closed", onScanQrPopupClosed);
  WebView.onEvent("clipboard_text_received", onClipboardTextReceived);
  WebView.onEvent("write_access_requested", onWriteAccessRequested);
  WebView.onEvent("phone_requested", onPhoneRequested);
  WebView.onEvent("file_download_requested", onFileDownloadRequested);
  WebView.onEvent("custom_method_invoked", onCustomMethodInvoked);
  WebView.onEvent("fullscreen_changed", onFullscreenChanged);
  WebView.onEvent("fullscreen_failed", onFullscreenFailed);
  WebView.onEvent("home_screen_added", onHomeScreenAdded);
  WebView.onEvent("home_screen_checked", onHomeScreenChecked);
  WebView.onEvent("prepared_message_sent", onPreparedMessageSent);
  WebView.onEvent("prepared_message_failed", onPreparedMessageFailed);
  WebView.onEvent("emoji_status_set", onEmojiStatusSet);
  WebView.onEvent("emoji_status_failed", onEmojiStatusFailed);
  WebView.postEvent("web_app_request_theme");
  WebView.postEvent("web_app_request_viewport");
  WebView.postEvent("web_app_request_safe_area");
  WebView.postEvent("web_app_request_content_safe_area");
})();
