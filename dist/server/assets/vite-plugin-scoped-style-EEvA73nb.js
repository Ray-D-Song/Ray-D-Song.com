import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main = {
  __name: "vite-plugin-scoped-style",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const frontmatter = {};
    __expose({ frontmatter });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "markdown-body" }, _attrs))}><ol><li>dev 时 vite 有调用 rollup 吗?</li></ol><p>最近在跟着新版文档重学 React, 习惯了 Vue 开发后再回头看 React 不得不说确实有很多地方不方便.<br> 例如 Vue 可以通过<code>&lt;style scoped&gt;</code>进行 SFC 级别的的样式隔离, 而 React 在组件中导入样式文件则会作用全局, 造成<code>样式污染</code>.<br> 我不想引入<code>styled-component</code>增加复杂度, 也不想使用<code>css modules</code>, 在标签有多个class名时会很不方便.</p><p>社区内有两个基于打包工具的方案, 分别是: <a href="https://github.com/gaoxiaoliangz/react-scoped-css">react-scoped-css</a><a href="https://github.com/cmseguin/rollup-plugin-react-scoped-css">rollup-plugin-react-scoped-css </a></p><p>两个插件的功能相同, 第二个是第一个的 rollup 版本, 都是提供文件级别的样式隔离. 其原理是参考 Vue 的scoped, 为标签和样式打上哈希值. 具体可以参考作者的这篇文章: <a href="https://zhuanlan.zhihu.com/p/47870721">在 React 里像 Vue 一样写 CSS</a></p><p>但有一个问题, Vue 使用的是 SFC(单文件组件), 一个文件只有一个组件, 在写 JSX 时, 一个文件包含多个组件很常见, 这两个插件都只能做到文件级别的样式隔离, 同一文件内的组件一样会造成样式污染.</p><p>我的习惯是使用多种的 HTML标签, 而不是 div 一把梭, 这样在 css 编写时就可以直接用标签名而不是 className. 减少代码噪音的同时 HTML 结构也更清晰. 因此组件级别的样式隔离就是刚需</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/page/temp/vite-plugin-scoped-style.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
