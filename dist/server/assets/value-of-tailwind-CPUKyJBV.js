import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./copy-BS8KA7rl.js";
const title = "TailwindCSS 的价值";
const intro = "tailwind 一直饱受非议, 其中说的最多的大概就是「我为什么不直接写内联样式?」. 其实 tailwind 不仅是简写了样式名这么简单, 它是一系列便利的封装.";
const time = "2023-10-11";
const tag = "CSS";
const _sfc_main = {
  __name: "value-of-tailwind",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const frontmatter = { "title": "TailwindCSS 的价值", "intro": "tailwind 一直饱受非议, 其中说的最多的大概就是「我为什么不直接写内联样式?」. 其实 tailwind 不仅是简写了样式名这么简单, 它是一系列便利的封装.", "time": "2023-10-11", "tag": "CSS" };
    __expose({ frontmatter });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "markdown-body" }, _attrs))}><p>tailwind 一直饱受非议, 其中说的最多的大概就是「我为什么不直接写内联样式?」. 其实 tailwind 不仅是简写了样式名这么简单, 它是一系列便利的封装.</p><h1>动画</h1><p>举个简单的例子, <code>animate-spin</code> 属性用于添加旋转动画, 常用在 loading 中. 如果你用传统的 css/sass 编写, 那你至少需要以下代码.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="${ssrRenderStyle({ "background-color": "#faf4ed", "--shiki-dark-bg": "#1a1b26", "color": "#575279", "--shiki-dark": "#a9b1d6" })}" tabindex="0"><div class="copy-container"><div class="lang-symbol">css</div><img${ssrRenderAttr("src", _imports_0)} class="copy-icon" data-code="animation: 龍pin 1s linear infinite;

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
"></div><code><span class="line"><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#A9B1D6" })}">animation: spin 1s linear infinite;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9D7CD8" })}">@</span><span style="${ssrRenderStyle({ "color": "#286983", "--shiki-dark": "#BB9AF7" })}">keyframes</span><span style="${ssrRenderStyle({ "color": "#907AA9", "--shiki-dark": "#E0AF68", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}"> spin</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#A9B1D6" })}">  from </span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#7AA2F7" })}">    transform</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#B4637A", "--shiki-dark": "#0DB9D7", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}"> rotate</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">(</span><span style="${ssrRenderStyle({ "color": "#D7827E", "--shiki-dark": "#FF9E64" })}">0</span><span style="${ssrRenderStyle({ "color": "#286983", "--shiki-dark": "#F7768E" })}">deg</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">)</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#A9B1D6" })}">  to </span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#7AA2F7" })}">    transform</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#B4637A", "--shiki-dark": "#0DB9D7", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}"> rotate</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">(</span><span style="${ssrRenderStyle({ "color": "#D7827E", "--shiki-dark": "#FF9E64" })}">360</span><span style="${ssrRenderStyle({ "color": "#286983", "--shiki-dark": "#F7768E" })}">deg</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">)</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">}</span></span>
<span class="line"></span></code></pre><h1>交互</h1><p>如果你希望一个 button 在鼠标炫富时颜色变浅, 在 tailwind 中只需要简单的<code>hover:opacity-90</code>, 传统的 css 则需要:</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="${ssrRenderStyle({ "background-color": "#faf4ed", "--shiki-dark-bg": "#1a1b26", "color": "#575279", "--shiki-dark": "#a9b1d6" })}" tabindex="0"><div class="copy-container"><div class="lang-symbol">css</div><img${ssrRenderAttr("src", _imports_0)} class="copy-icon" data-code=".btn:hover {
  background-color: rga(xxx,xxx,xxx, 0.9)
}
"></div><code><span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#E0AF68", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}">.</span><span style="${ssrRenderStyle({ "color": "#907AA9", "--shiki-dark": "#9ECE6A", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}">btn</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#E0AF68", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}">:</span><span style="${ssrRenderStyle({ "color": "#907AA9", "--shiki-dark": "#BB9AF7", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}">hover</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#7AA2F7" })}">  background-color</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#BB9AF7" })}"> rga(xxx</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">,</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#BB9AF7" })}">xxx</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">,</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#BB9AF7" })}">xxx</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">,</span><span style="${ssrRenderStyle({ "color": "#D7827E", "--shiki-dark": "#FF9E64" })}"> 0.9</span><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#9ABDF5" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">}</span></span>
<span class="line"></span></code></pre><h1>响应式设计</h1><p>同时现代很多网页需要同时满足大屏设备和移动小屏设备的适配, 一般我们会用 css3 的 @media 来根据窗口尺寸编写不同的 css.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="${ssrRenderStyle({ "background-color": "#faf4ed", "--shiki-dark-bg": "#1a1b26", "color": "#575279", "--shiki-dark": "#a9b1d6" })}" tabindex="0"><div class="copy-container"><div class="lang-symbol">css</div><img${ssrRenderAttr("src", _imports_0)} class="copy-icon" data-code="@media (max-width: 768px) {
  body {
    width: 80%
  }
}
"></div><code><span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9D7CD8" })}">@</span><span style="${ssrRenderStyle({ "color": "#286983", "--shiki-dark": "#9D7CD8" })}">media</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}"> (</span><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#7AA2F7" })}">max-width</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#D7827E", "--shiki-dark": "#FF9E64" })}"> 768</span><span style="${ssrRenderStyle({ "color": "#286983", "--shiki-dark": "#F7768E" })}">px</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">)</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#0DB9D7" })}">  body</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#7AA2F7" })}">    width</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#D7827E", "--shiki-dark": "#FF9E64" })}"> 80</span><span style="${ssrRenderStyle({ "color": "#286983", "--shiki-dark": "#F7768E" })}">%</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">}</span></span>
<span class="line"></span></code></pre><p>在 tailwind 上, 适配 768px 宽度的设备, 你只要在样式前加入 <code>md</code> 前缀即可.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="${ssrRenderStyle({ "background-color": "#faf4ed", "--shiki-dark-bg": "#1a1b26", "color": "#575279", "--shiki-dark": "#a9b1d6" })}" tabindex="0"><div class="copy-container"><div class="lang-symbol">html</div><img${ssrRenderAttr("src", _imports_0)} class="copy-icon" data-code="&lt;body cla龍s=&quot;md:w-4/5&quot;&gt;
"></div><code><span class="line"><span style="${ssrRenderStyle({ "color": "#9893A5", "--shiki-dark": "#BA3C97" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#F7768E" })}">body</span><span style="${ssrRenderStyle({ "color": "#907AA9", "--shiki-dark": "#BB9AF7", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}"> class</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#9ECE6A" })}">md:w-4/5</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#9893A5", "--shiki-dark": "#BA3C97" })}">&gt;</span></span>
<span class="line"></span></code></pre><h1>利好无设计开发</h1><p>个人或者小团队开发产品, 没有专业的设计师出图, 写组件相当痛苦. 例如 box-shadow 属性, button、card、modal, 每个都需要不一样的 shadow 样式. 在自己编写的时候经常要重复修改多次来达到一个比较好的效果, twc 提供了 7 个不同规格的选项, 都是泛用性非常高的选择. 现在你要写一个现代化外观的按钮只需要<code>class=&quot;shadow-md rounded-lg&quot;</code>就行了.</p><h1>新的组件模式</h1><p>tailwind 还有个衍生品, Headless UI. 将组件的功能和样式彻底分离. 很多时候组件的功能是相同的 , 但是需要不同的样式, 有时候样子一样的组件却需要完全不同的 api. Headless 就是为了解决这个问题.</p><blockquote><p>NuxtLab UI 就是一个无头tailwind组件库, 闲得蛋疼可以看看, 代码很干净.</p></blockquote><h1>class 也太特么长了</h1><p>这是一个由 tailwind 编写的 checkbox, 做了动效和深色适配.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="${ssrRenderStyle({ "background-color": "#faf4ed", "--shiki-dark-bg": "#1a1b26", "color": "#575279", "--shiki-dark": "#a9b1d6" })}" tabindex="0"><div class="copy-container"><div class="lang-symbol">html</div><img${ssrRenderAttr("src", _imports_0)} class="copy-icon" data-code="&lt;input type=&quot;checkbox&quot; cla龍s=&quot;w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600&quot;/&gt;
"></div><code><span class="line"><span style="${ssrRenderStyle({ "color": "#9893A5", "--shiki-dark": "#BA3C97" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#F7768E" })}">input</span><span style="${ssrRenderStyle({ "color": "#907AA9", "--shiki-dark": "#BB9AF7", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}"> type</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#9ECE6A" })}">checkbox</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#907AA9", "--shiki-dark": "#BB9AF7", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}"> class</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#9ECE6A" })}">w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#89DDFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#9893A5", "--shiki-dark": "#BA3C97" })}">/&gt;</span></span>
<span class="line"></span></code></pre><p>看到这个长度是不是蚌埠住了. 没关系 tailwind 有<code>@layer</code>和<code>@apply</code>, 你可以像组织传统 css 一样去组织 tailwind, 封装自己的样式组件.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="${ssrRenderStyle({ "background-color": "#faf4ed", "--shiki-dark-bg": "#1a1b26", "color": "#575279", "--shiki-dark": "#a9b1d6" })}" tabindex="0"><div class="copy-container"><div class="lang-symbol">css</div><img${ssrRenderAttr("src", _imports_0)} class="copy-icon" data-code="@layer component龍 {
  .checkbox {
    @apply
    w-4
    h-4
    text-blue-600
    bg-gray-100
    border-gray-300
    rounded
    focus:ring-blue-500
    dark:focus:ring-blue-600
    dark:ring-offset-gray-800
    focus:ring-2
    dark:bg-gray-700
    dark:border-gray-600
  }
}
"></div><code><span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9D7CD8" })}">@</span><span style="${ssrRenderStyle({ "color": "#286983", "--shiki-dark": "#BB9AF7" })}">layer</span><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#A9B1D6" })}"> components </span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#E0AF68", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}">  .</span><span style="${ssrRenderStyle({ "color": "#907AA9", "--shiki-dark": "#9ECE6A", "font-style": "italic", "--shiki-dark-font-style": "inherit" })}">checkbox</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#9ABDF5" })}">    @</span><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#9ABDF5" })}">apply</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#9ABDF5" })}">    w-</span><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#9ABDF5" })}">4</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#9ABDF5" })}">    h-</span><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#9ABDF5" })}">4</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#9ABDF5" })}">    text-blue-</span><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#9ABDF5" })}">600</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#9ABDF5" })}">    bg-gray-</span><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#9ABDF5" })}">100</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#9ABDF5" })}">    border-gray-</span><span style="${ssrRenderStyle({ "color": "#575279", "--shiki-dark": "#9ABDF5" })}">300</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#9ABDF5" })}">    rounded</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#56949F", "--shiki-dark": "#9ABDF5" })}">    focus</span><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#BB9AF7" })}">ring-blue-500</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#FF9E64" })}">    dark</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#BB9AF7" })}">:focus:ring-blue-600</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#FF9E64" })}">    dark</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#BB9AF7" })}">:ring-offset-gray-800</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#BB9AF7" })}">    focus:ring-2</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#FF9E64" })}">    dark</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#BB9AF7" })}">:bg-gray-700</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#FF9E64" })}">    dark</span><span style="${ssrRenderStyle({ "color": "#EA9D34", "--shiki-dark": "#BB9AF7" })}">:border-gray-600</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#797593", "--shiki-dark": "#9ABDF5" })}">}</span></span>
<span class="line"></span></code></pre><p>过长的样式导致的问题是无法避免的, 即便你直接写内联也是一样, 最终一定会回到封装样式组件的路上. 但之前所有的好处(抽象、减少代码量、响应式…)都还在. 这也是一种「不过早抽象」的价值. 一个小的 idea, 你可以一把梭抢先实现原型, 后期再抽离维护, tailwind 降低了这一操作的难度.</p><blockquote><p>当然, 这种种好处的前提是, 要么你写风格多样化的 C 端界面, 要么需要创建属于自己团队的组件库. 然而很明显, 大多数公司还停留在<code>element antd</code>一把梭的阶段. 但这当然不是 tailwind 的问题.</p></blockquote><blockquote><p>实际上海外 <code>3T架构(Next tRPC Tailwind)</code> 已经火了有一阵了, 当然你也可以说这是前端瞎折腾, 但这确实是写出「现代、好看、交互强的界面」的捷径.</p></blockquote></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/page/post/value-of-tailwind.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default,
  intro,
  tag,
  time,
  title
};
