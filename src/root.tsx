import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import { useEffect } from "react";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js", { scope: "/" });
      });
    }
  }, []);
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
        <link rel="stylesheet" href="./style.css" />
        <link rel="stylesheet" href="./avast.css" />
        <link rel="stylesheet" href="./content.css" />
        <link rel="stylesheet" href="./local.css" />
        <link
          rel="stylesheet"
          href="./css-889f638c-b0d4-4bed-acf8-6e8b7915a1ff@mhtml.blink.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="./css-7dc9199b-2735-41bf-9538-168c7bab1b6b@mhtml.blink.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="./css-1f063f75-280e-41f3-adb6-57e17989de53@mhtml.blink.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="./random-password-generator.css"
          type="text/css"
        />
        {/* <link
          rel="stylesheet"
          href="./node_modules/bootstrap/dist/css/bootstrap.min.css"
        /> */}

        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-1adaa47b-e6a0-46c1-a936-1a0b1f28fa1f@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-8ecaa03f-3a70-4398-9b3e-ae1b81a7a1f0@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-42a6dc41-658a-43df-95d7-3e28a7373554@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-9fe3098f-e9c0-414f-b0c6-1f351afdbb89@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-d6adbc64-2928-40da-8bef-2d99a546b3dd@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-49d5f85d-0663-47fb-972b-ce40d637c812@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-f60b65da-4722-4f60-9ad7-02eb591d43d3@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-22b5c374-226f-41d3-ac1d-b21048d9320c@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-63ed80f3-d120-49c3-b734-b1e1285d283a@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-60fcf26f-6cce-4dfe-8cde-8182c61a0a79@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-e0021d94-0baf-4640-aa98-b1b7c6bf6886@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-fa4cfe1e-feaa-477c-9a23-31e2896918a3@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-12991d29-f2f4-4adf-8e07-9153b7e495b2@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-db34a5a8-de3a-4ee9-90aa-3dc639adf301@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-4b9f47ee-be2d-4f24-9428-964957433410@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-4e94a190-ad23-4433-86f3-1a906269f098@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-56bb8e52-5c4d-4f85-833f-d17de23883dc@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-f51f50c5-9805-41ce-90d1-50bcff3c06c9@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-2f4a4fd8-148f-4013-848d-7b7a0c9d5da2@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-cdf4f1c5-62ae-4d2e-b645-ce9323ecf468@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-3653c7f9-48d6-4b94-8534-5be76673b31e@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-58868fd7-faea-4461-a217-f89adbb9ffe1@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-41d4608a-90b7-44e5-b79a-9c832303bd6c@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-cdeb5e6e-553e-4301-9aae-be26bc4f3736@mhtml.blink.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/css-bf7b8d4c-6e4c-471a-a91a-4a7467bdbc82@mhtml.blink.css"
        ></link>
        <link rel="stylesheet" href="./antd/umi.850d089f.css"></link>
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/vendors_1-async.164d64c0.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="./antd/vendors_0-async.e96b29bd.css"
        ></link>
      </head>
      <body
        lang="en"
        class="tmpl-www mod-zh-cn first-menu-for-home navigation-for-desktop"
      >
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
