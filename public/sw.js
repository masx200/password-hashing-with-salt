if (!self.define) {
  let e, s = {};
  const n = (
    n,
    t,
  ) => (n = new URL(n + ".js", t).href,
    s[n] || new Promise((s) => {
      if ("document" in self) {
        const e = document.createElement("script");
        e.src = n, e.onload = s, document.head.appendChild(e);
      } else e = n, importScripts(n), s();
    }).then(() => {
      let e = s[n];
      if (!e) throw new Error(`Module ${n} didn’t register its module`);
      return e;
    }));
  self.define = (t, i) => {
    const r = e || ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let o = {};
    const l = (e) => n(e, r),
      u = { module: { uri: r }, exports: o, require: l };
    s[r] = Promise.all(t.map((e) => u[e] || l(e))).then((e) => (i(...e), o));
  };
}
define(["./workbox-5ffe50d4"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute([{ url: "assets/index-BG0CrHgY.js", revision: null }, {
      url: "assets/index-DdY6t2qx.css",
      revision: null,
    }, {
      url: "manifest.webmanifest",
      revision: "73e1a02c9816c704064a7cf173a7686a",
    }], {}),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html")),
    );
});
