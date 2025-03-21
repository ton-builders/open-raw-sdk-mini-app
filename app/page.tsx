"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 动态加载 Telegram Web App SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true); // 脚本加载完成
    };
    document.body.appendChild(script);

    // 清理脚本
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 初始化 Telegram Web App
  useEffect(() => {
    if (isScriptLoaded && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready(); // 通知 Telegram 应用已准备好
      webApp.expand(); // 展开到全屏
      setUser(webApp.initDataUnsafe?.user); // 获取用户信息
    }
  }, [isScriptLoaded]);

  function onClickA() {
    // alert(window.Telegram.WebApp.openTgLink);
    alert(window.Telegram.WebApp);
    alert(window.Telegram.WebApp.openTelegramLink);
    // [Telegram.WebApp] Url host is not supported "https://www.google.com/"
    window.Telegram.WebApp.openTelegramLink("https://www.google.com/");
  }

  function onClickTonMasterBot() {
    window.Telegram.WebApp.openTelegramLink("https://t.me/trc404/app");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a href="/">Back</a>
      <a href="https://www.google.com/">Google</a>
      <a onClick={onClickA}>openTgLink Google</a>
      <a onClick={onClickTonMasterBot}>openTgLink TON Master Bot</a>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start bg-amber-950">
        <div style={{ padding: "20px" }}>
          <h1>Telegram Web App Demo</h1>
          {isScriptLoaded ? (
            user ? (
              <div>
                <p>
                  Welcome, {user.first_name} {user.last_name}!
                </p>
                <p>User ID: {user.id}</p>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </div>
            ) : (
              <p>No user data available</p>
            )
          ) : (
            <p>Loading Telegram Web App SDK...</p>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a href="/">Back</a>
        <a href="https://www.google.com/">Google</a>
        <a onClick={onClickA}>openTgLink Google</a>
      </footer>
    </div>
  );
}
