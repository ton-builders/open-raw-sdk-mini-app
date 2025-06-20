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

      // 默认进入全屏模式
      webApp.requestFullscreen();
    }
  }, [isScriptLoaded]);

  function openTgLink() {
    // alert(window.Telegram.WebApp.openTgLink);
    console.info(window.Telegram.WebApp);
    console.info(window.Telegram.WebApp.openTelegramLink);
    // [Telegram.WebApp] Url host is not supported "https://www.google.com/"
    window.Telegram.WebApp.openLink("https://www.google.com/");
  }

  function onClickTonMasterBot() {
    window.Telegram.WebApp.openTelegramLink("https://t.me/buzzit1_bot/buzzit?startapp=5499157826");
  }

  function requestFullScreen() {
    window.Telegram.WebApp.requestFullscreen();
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <a href="/" className={"bg-gray-500 gap-2 p-2 rounded-2xl"}>Back</a>

      <a href="https://www.google.com/" className={"bg-blue-800 gap-2 p-2 rounded-2xl"}> a tag open Google</a>


      <a onClick={openTgLink} className={"bg-blue-800 gap-2 p-2 rounded-2xl"}>openTgLink Google (fail with error)</a>


      <a onClick={onClickTonMasterBot} className={"bg-blue-800 gap-2 p-2 rounded-2xl"}>openTgLink open Mini App</a>
      <a onClick={requestFullScreen} className={"bg-red-800 gap-2 p-2 rounded-2xl"}>Request Full Screen</a>

      <main className="flex gap-[32px] row-start-2 items-center sm:items-start ">

        <div  className="w-full overflow-hidden bg-amber-950" >
          <h1>Telegram Web App Demo</h1>
          {isScriptLoaded ? (
            user ? (
              <div className="overflow-hidden">
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

    </div>
  );
}
