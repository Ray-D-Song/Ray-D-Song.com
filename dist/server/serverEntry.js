import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, renderToString } from "vue/server-renderer";
import { watch, ref, defineComponent, createVNode, Teleport, withDirectives, vShow, mergeProps, unref, useSSRContext, withCtx, createSSRApp } from "vue";
import { createPinia } from "pinia";
import { createRouter as createRouter$2, useRouter, RouterView, createMemoryHistory } from "vue-router";
import "unplugin-vue-router/runtime";
import "clipboard-polyfill";
import { useLocalStorage, useTimeoutFn } from "@vueuse/core";
const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("./assets/index-yJVuNqU-.js")
    /* no children */
  },
  {
    path: "/post",
    /* internal name: '/post' */
    /* no component */
    children: [
      {
        path: "cloudflare-d1",
        name: "/post/cloudflare-d1",
        component: () => import("./assets/cloudflare-d1-qaDqSUbm.js"),
        /* no children */
        meta: {
          "title": "cloudflare worker/D1 初探",
          "intro": "最近想给博客加个访问量展示, 因为网站本身套了一层 cf, 自然想到用 cf 的 serverless 方案, 也就是 worker.",
          "time": "2023-11-18",
          "tag": "Serverless"
        }
      },
      {
        path: "coroutine-and-fiber",
        name: "/post/coroutine-and-fiber",
        component: () => import("./assets/coroutine-and-fiber-3186ipgO.js"),
        /* no children */
        meta: {
          "title": "协程(Coroutine)和纤程(Fiber)",
          "intro": "最近在看 C++ 引入 Fiber 的[N4024文档: 区分纤程和协程](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4024.pdf), 文章给纤程和协程十分明确的区分. 但过去我看过的很多资料会将其混为一谈或者模糊二者的边界, 所以写了这篇博客来总结一下.",
          "time": "2023-9-13",
          "tag": "Concurrent"
        }
      },
      {
        path: "single-thread-concurrency",
        name: "/post/single-thread-concurrency",
        component: () => import("./assets/single-thread-concurrency-46Bgyjfa.js"),
        /* no children */
        meta: {
          "title": "单线程并发",
          "intro": "小短文, 讨论单线程并发和 node.js 这样异步协程模型的优势",
          "time": "2023-8-17",
          "tag": "Concurrent"
        }
      },
      {
        path: "value-of-tailwind",
        name: "/post/value-of-tailwind",
        component: () => import("./assets/value-of-tailwind-yvT9fTaB.js"),
        /* no children */
        meta: {
          "title": "TailwindCSS 的价值",
          "intro": "tailwind 一直饱受非议, 其中说的最多的大概就是「我为什么不直接写内联样式?」. 其实 tailwind 不仅是简写了样式名这么简单, 它是一系列便利的封装.",
          "time": "2023-10-11",
          "tag": "CSS"
        }
      },
      {
        path: "vitest-unit-test",
        name: "/post/vitest-unit-test",
        component: () => import("./assets/vitest-unit-test-vm_51mgE.js"),
        /* no children */
        meta: {
          "title": "Vue 使用 Vitest 进行单元测试",
          "intro": "笔者过去并没有写过前端单测, 只在例如 Go 这样社区大力推崇 TDD 的语言中实践过, 最近遇到很多前端通过人肉测试难以覆盖的场景, 因此尝试 vitest.",
          "time": "2023-12-18",
          "tag": "Test"
        }
      },
      {
        path: "vue-compiler-macro-defineprops",
        name: "/post/vue-compiler-macro-defineprops",
        component: () => import("./assets/vue-compiler-macro-defineprops-BIUwb9Pm.js"),
        /* no children */
        meta: {
          "title": "Vue 宏编译: 以 defineProps 为例",
          "intro": "分析 Vue defineProps 的 type-only 写法是如何根据类型信息生成运行时代码的",
          "time": "2024-2-29",
          "tag": "Vue"
        }
      }
    ]
  },
  {
    path: "/temp",
    /* internal name: '/temp' */
    /* no component */
    children: [
      {
        path: "javascript-class",
        name: "/temp/javascript-class",
        component: () => import("./assets/javascript-class-j-BcEbLs.js")
        /* no children */
      },
      {
        path: "typescript-extends",
        name: "/temp/typescript-extends",
        component: () => import("./assets/typescript-extends-xUK5CAyc.js")
        /* no children */
      },
      {
        path: "vite-plugin-scoped-style",
        name: "/temp/vite-plugin-scoped-style",
        component: () => import("./assets/vite-plugin-scoped-style-EEvA73nb.js")
        /* no children */
      }
    ]
  }
];
function createRouter$1(options) {
  const { extendRoutes } = options;
  const router = createRouter$2(Object.assign(
    options,
    { routes: typeof extendRoutes === "function" ? extendRoutes(routes) : routes }
  ));
  return router;
}
function useTheme() {
  const currentTheme = useLocalStorage("theme", "light");
  function toggle() {
    currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
  }
  watch(currentTheme, (value, oldValue) => {
    const doc = document.documentElement;
    doc.classList.remove(oldValue);
    doc.classList.add(value);
  });
  return {
    currentTheme,
    toggle
  };
}
function useToast(content) {
  const toastVisible = ref(false);
  const {
    isPending,
    start
  } = useTimeoutFn(() => {
    toastVisible.value = false;
  }, 3e3);
  function handleShowToast() {
    if (isPending.value)
      return;
    toastVisible.value = true;
    start();
  }
  const toast = defineComponent(() => {
    return () => createVNode(Teleport, {
      "to": "#teleported"
    }, {
      default: () => [withDirectives(createVNode("div", {
        "class": "toast"
      }, [content]), [[vShow, toastVisible.value]])]
    });
  });
  return {
    toast,
    handleShowToast
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useTheme();
    useRouter();
    const { toast, handleShowToast } = useToast("copy success");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex justify-center items-center flex-col" }, _attrs))}><div class="w-full backdrop-blur-xl fixed left-0 top-0 flex justify-between z-20"><div class="i-mdi-dinosaur-pixel w-10 h-10 mx-2 my-1 hover:cursor-pointer hover:opacity-80"></div><div class="flex"><div class="i-grommet-icons:github w-6 h-6 m-2 hover:cursor-pointer hover:opacity-80"></div><div class="i-fluent:rss-24-filled w-6 h-6 m-2 hover:cursor-pointer hover:opacity-80"></div><div class="i-fluent:dark-theme-24-filled w-6 h-6 m-2 hover:cursor-pointer hover:opacity-80"></div></div></div><div class="w-9/10 lg:8/10 xl:7/10 prose mt-15">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(unref(toast), null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layout/default.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex justify-center items-center dark:bg-dark bg-light dark:text-dark text-light" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(RouterView), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(RouterView))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function createRouter() {
  return createRouter$1({
    history: createMemoryHistory()
  });
}
function createVueInstance() {
  const app = createSSRApp(_sfc_main);
  const store = createPinia();
  const router = createRouter();
  app.use(store).use(router);
  return { app, store, router };
}
function path2ToLnk(filePath) {
  if (filePath.endsWith(".js"))
    return `<link rel="modulepreload" crossorigin href="${filePath}">`;
  else if (filePath.endsWith(".css"))
    return `<link rel="stylesheet" href="${filePath}">`;
  else if (filePath.endsWith(".woff"))
    return ` <link rel="preload" href="${filePath}" as="font" type="font/woff" crossorigin>`;
  else if (filePath.endsWith(".woff2"))
    return ` <link rel="preload" href="${filePath}" as="font" type="font/woff2" crossorigin>`;
  else if (filePath.endsWith(".gif"))
    return ` <link rel="preload" href="${filePath}" as="image" type="image/gif">`;
  else if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg"))
    return ` <link rel="preload" href="${filePath}" as="image" type="image/jpeg">`;
  else if (filePath.endsWith(".png"))
    return ` <link rel="preload" href="${filePath}" as="image" type="image/png">`;
  return "";
}
function renderPreload(manifest, { modules }) {
  let links = "";
  modules.forEach((key) => {
    const filePathArr = manifest[key] ?? [];
    filePathArr.forEach((filePath) => {
      links += path2ToLnk(filePath);
    });
  });
  return links;
}
async function serverRender(url, mainfest) {
  const { app, store, router } = createVueInstance();
  try {
    await router.push(url);
    await router.isReady();
    const ctx = {};
    const html = await renderToString(app, ctx);
    const preload = renderPreload(mainfest ?? {}, ctx);
    const storeState = JSON.stringify(store.state.value);
    return { html, storeState, preload };
  } catch (err) {
    console.log(err);
  }
}
export {
  routes as r,
  serverRender
};
