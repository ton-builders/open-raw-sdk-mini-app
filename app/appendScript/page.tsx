"use client";

import Image from "next/image";
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
    alert(window.WebApp);
    alert(window.WebApp.openTelegramLink);
    window.WebApp.openTelegramLink("https://www.google.com/");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a href="/">Back</a>
      <a href="https://www.google.com/">Google</a>
      <a onClick={onClickA}>openTgLink Google</a>

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
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
