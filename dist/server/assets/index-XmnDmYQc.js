import { ref, computed, defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import "unplugin-vue-router/runtime";
import { r as routes } from "../serverEntry.js";
import _ from "lodash";
import "pinia";
import "clipboard-polyfill";
import "@vueuse/core";
function usePagination() {
  var _a, _b;
  const currentPage = ref(1);
  const pageSize = 10;
  const posts = ref((_b = (_a = routes.find((item) => item.path === "/post")) == null ? void 0 : _a.children) == null ? void 0 : _b.sort((a, b) => {
    var _a2, _b2;
    const timeA = new Date((_a2 = a.meta) == null ? void 0 : _a2.time);
    const timeB = new Date((_b2 = b.meta) == null ? void 0 : _b2.time);
    return timeB.getTime() - timeA.getTime();
  }));
  const total = computed(() => {
    var _a2;
    return ((_a2 = posts.value) == null ? void 0 : _a2.length) ?? 0;
  });
  const contentList = computed(() => {
    return _.chunk(posts.value, pageSize);
  });
  const pageCount = computed(() => contentList.value.length + 1);
  const content = computed(() => {
    return contentList.value[currentPage.value - 1];
  });
  const isFirstPage = computed(() => {
    return currentPage.value === 1;
  });
  const isLastPage = computed(() => {
    return currentPage.value === pageCount.value;
  });
  function next() {
    if (!isLastPage)
      currentPage.value++;
  }
  function pre() {
    if (!isFirstPage.value)
      currentPage.value--;
  }
  function nav(target) {
    if (target <= pageCount.value)
      currentPage.value = Number(target);
  }
  return {
    content,
    next,
    pre,
    nav,
    total,
    pageCount,
    pageSize,
    currentPage,
    isFirstPage,
    isLastPage
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { content, nav, pageCount, isLastPage, isFirstPage } = usePagination();
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-2xl mt-10 font-500" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(content), (c, idx) => {
        var _a, _b;
        _push(`<div class="my-7 hover:cursor-pointer flex flex-col"><span class="text-base font-700 mr-5 opacity-45">${ssrInterpolate((_a = c.meta) == null ? void 0 : _a.time)}</span><span>${ssrInterpolate((_b = c.meta) == null ? void 0 : _b.title)}</span></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/page/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
