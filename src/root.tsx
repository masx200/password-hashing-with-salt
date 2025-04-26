import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik";
import "bootstrap/dist/css/bootstrap.min.css"
import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

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
