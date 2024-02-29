import{_ as s}from"./copy-D7w4FOSZ.js";import{b as n,o as i,h as l}from"./index-7d07Ouw1.js";const o={class:"markdown-body"},e=l('<p>Vue macro(宏) 随着<code>&lt;script setup&gt;</code>写法一同引入 Vue 生态, 进一步丰富了 Vue 在编译期的想象力.<br> 本文主要分析 Vue defineProps 的 type-only 写法是如何根据类型信息生成运行时代码.</p><p>我们先拉取 Vue 的源代码, 并切换到3.0.3版本, 这是最早引入 script setup 和 defineProps macro 的版本.</p><p>Vue 的 script setup 编译器源码位于<code>packages/compiler-sfc/src/compileScript.ts</code>, 接下来所有的代码都出自这个文件</p><p>为了方便查看运行结果和打印, 在根目录下的<code>package.json</code>新增<code>test-compiler</code>命令, 这条命令表示只运行<code>packages/compiler-sfc</code>文件夹下的<code>with TypeScript</code>测试.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">json</div><img src="'+s+`" class="copy-icon" data-code="&quot;scripts&quot;: {
  &quot;test-compiler&quot;: &quot;jest packages/compiler-sfc --testPathPattern=&#39;packages/compiler-sfc&#39; --testNamePattern=&#39;with TypeScript&#39; &quot;,
  },
"></div><code><span class="line"><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&quot;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">scripts</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&quot;</span><span style="color:#575279;--shiki-dark:#A9B1D6;">: </span><span style="color:#797593;--shiki-dark:#9ABDF5;">{</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#89DDFF;">  &quot;</span><span style="color:#56949F;--shiki-dark:#7AA2F7;">test-compiler</span><span style="color:#797593;--shiki-dark:#89DDFF;">&quot;</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &quot;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">jest packages/compiler-sfc --testPathPattern=&#39;packages/compiler-sfc&#39; --testNamePattern=&#39;with TypeScript&#39; </span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&quot;</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span><span style="color:#575279;--shiki-dark:#A9B1D6;">,</span></span>
<span class="line"></span></code></pre><p>先看 defineProps&lt;{}&gt;() 会被编译成什么<br> 在<code>packages/compiler-sfc/__tests__/compileScript.spec.ts</code>文件的451 行打个<code>console.log(content)</code>, 查看编译完成的内容<br> 输入:</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">vue</div><img src="`+s+`" class="copy-icon" data-code="import { defineProps } from &#39;vue&#39;


defineProps&lt;{
  string: string
  number: number
  boolean: boolean
  object: object
  // ...
}&gt;()
"></div><code><span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">import { defineProps } from &#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">defineProps</span><span style="color:#9893A5;--shiki-dark:#BA3C97;">&lt;</span><span style="color:#575279;--shiki-dark:#A9B1D6;">{</span></span>
<span class="line"><span style="color:#56949F;--shiki-dark:#F7768E;">  string:</span><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> string</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;">  number:</span><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> number</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;">  boolean:</span><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> boolean</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;">  object:</span><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> object</span></span>
<span class="line"><span style="color:#B4637A;--shiki-dark:#FF5370;">  //</span><span style="color:#797593;--shiki-dark:#89DDFF;"> .</span><span style="color:#575279;--shiki-dark:#89DDFF;">..</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;">}</span><span style="color:#9893A5;--shiki-dark:#BA3C97;">&gt;</span><span style="color:#575279;--shiki-dark:#A9B1D6;">()</span></span>
<span class="line"></span></code></pre><p>输出:</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="import { defineComponent as _defineComponent } from &#39;vue&#39;


export default _defineComponent({
  expose: [],
  props: {
    string: { type: String, required: true },
    number: { type: Number, required: true },
    boolean: { type: Boolean, required: true },
    object: { type: Object, required: true },
    // ...
  } as unknown as undefined,
  setup(__props: {
        string: string
        number: number
        boolean: boolean
        object: object
        // ...
      }) {

return {  }
}

})
"></div><code><span class="line"><span style="color:#286983;--shiki-dark:#7DCFFF;">import</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> defineComponent</span><span style="color:#286983;--shiki-dark:#89DDFF;"> as</span><span style="color:#575279;--shiki-dark:#0DB9D7;font-style:italic;--shiki-dark-font-style:inherit;"> _defineComponent</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span><span style="color:#286983;--shiki-dark:#7DCFFF;"> from</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">vue</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#7DCFFF;">export</span><span style="color:#286983;--shiki-dark:#7DCFFF;"> default</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> _defineComponent</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#797593;--shiki-dark:#9ABDF5;">{</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#73DACA;">  expose</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> []</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#73DACA;">  props</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#73DACA;">    string</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#286983;--shiki-dark:#41A6B5;"> type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> String</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#286983;--shiki-dark:#41A6B5;"> required</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> true</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#73DACA;">    number</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#286983;--shiki-dark:#41A6B5;"> type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> Number</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#286983;--shiki-dark:#41A6B5;"> required</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> true</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#73DACA;">    boolean</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#286983;--shiki-dark:#41A6B5;"> type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> Boolean</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#286983;--shiki-dark:#41A6B5;"> required</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> true</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#73DACA;">    object</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#286983;--shiki-dark:#41A6B5;"> type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> Object</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#286983;--shiki-dark:#41A6B5;"> required</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> true</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">    //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> ...</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span><span style="color:#286983;--shiki-dark:#89DDFF;"> as</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> unknown</span><span style="color:#286983;--shiki-dark:#89DDFF;"> as</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#7AA2F7;">  setup</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">__props</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">        string</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">        number</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> number</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">        boolean</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> boolean</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">        object</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> object</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">        //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> ...</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">      })</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">return</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"></span></code></pre><p>可以看到 defineProps 被编译为<code>defineComponent</code>方法中的 options props 写法, 同时还定义了 defineComponent 方法中的 setup 函数选项并保留了类型的定义.</p><h2>定位</h2><p>在<code>packages/compiler-sfc/src/compileScript.ts</code>文件中, 我们一眼能找到一个看起来是处理 props 的方法:</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="function processDefineProps(node: Node): boolean {
  if (isCallOf(node, DEFINE_PROPS)) {
    hasDefinePropsCall = true
    // context call has type parameters - infer runtime types from it
    if (node.typeParameters) {
      const typeArg = node.typeParameters.params[0]
      if (typeArg.type === &#39;TSTypeLiteral&#39;) {
        propsTypeDecl = typeArg
      }
    }
    return true
  }
  return false
}
"></div><code><span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">function</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> processDefineProps</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">node</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> Node</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> boolean</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">  if</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">isCallOf</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">node</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#575279;--shiki-dark:#FF9E64;font-style:italic;--shiki-dark-font-style:inherit;"> DEFINE_PROPS</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)) </span><span style="color:#797593;--shiki-dark:#9ABDF5;">{</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    hasDefinePropsCall</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> true</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">    //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> context call has type parameters - infer runtime types from it</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    if</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">node</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">typeParameters</span><span style="color:#575279;--shiki-dark:#9ABDF5;">) </span><span style="color:#797593;--shiki-dark:#9ABDF5;">{</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">      const</span><span style="color:#575279;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> typeArg</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> node</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">typeParameters</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">params</span><span style="color:#575279;--shiki-dark:#9ABDF5;">[</span><span style="color:#D7827E;--shiki-dark:#FF9E64;">0</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">      if</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">typeArg</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">type</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> ===</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">TSTypeLiteral</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#575279;--shiki-dark:#9ABDF5;">) </span><span style="color:#797593;--shiki-dark:#9ABDF5;">{</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">        propsTypeDecl</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> typeArg</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">      }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">    return</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> true</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">  return</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> false</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><p>这个函数接受参数<code>node</code>, 并将propsTypeDecl赋值为 node.typeParameters.params[0]<br> 接下来我们按照看源码的惯例: 向前找入参 node, 向后找 propsTypeDecl 的作用.</p><h2>向前看: node 是什么, 从哪来</h2><p>我们在 processDefineProps 方法中打印一下 node:</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="Node {
  type: &#39;CallExpression&#39;,
  start: 101,
  end: 732,
  loc: SourceLocation {
    start: Position { line: 7, column: 6 },
    end: Position { line: 30, column: 10 },
    filename: undefined,
    identifierName: undefined
  },
  range: undefined,
  leadingComments: undefined,
  trailingComments: undefined,
  innerComments: undefined,
  extra: undefined,
  callee: Node {
    type: &#39;Identifier&#39;,
    start: 101,
    end: 112,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: &#39;defineProps&#39;
    },
    range: undefined,
    leadingComments: undefined,
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    name: &#39;defineProps&#39;
  },
  arguments: [],
  typeParameters: Node {
    type: &#39;TSTypeParameterInstantiation&#39;,
    start: 112,
    end: 730,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    range: undefined,
    leadingComments: undefined,
    trailingComments: undefined,
    innerComments: undefined,
    extra: undefined,
    params: [ [Node] ]
  }
}
"></div><code><span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">Node</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">CallExpression</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 101</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 732</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  loc</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> SourceLocation</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> Position</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#D7827E;--shiki-dark:#73DACA;"> line</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 7</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#D7827E;--shiki-dark:#73DACA;"> column</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 6</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> Position</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#D7827E;--shiki-dark:#73DACA;"> line</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 30</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#D7827E;--shiki-dark:#73DACA;"> column</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 10</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    filename</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    identifierName</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  range</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  leadingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  trailingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  innerComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  extra</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  callee</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> Node</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">Identifier</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 101</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 112</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    loc</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> SourceLocation</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">      start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Position</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">      end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Position</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">      filename</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">      identifierName</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">defineProps</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    range</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    leadingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    trailingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    innerComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    extra</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    name</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">defineProps</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  arguments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> []</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  typeParameters</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> Node</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">TSTypeParameterInstantiation</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 112</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 730</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    loc</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> SourceLocation</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">      start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Position</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">      end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Position</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">      filename</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">      identifierName</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    range</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    leadingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    trailingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    innerComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    extra</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    params</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [ [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Node</span><span style="color:#575279;--shiki-dark:#9ABDF5;">] ]</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><p>熟悉 babel 的哥们应该一眼能看出这是 babel 的 AST(抽象语法树).</p><blockquote><p>抽象语法树可以简单理解为分析源代码产生的相关信息<br> 我们继续找, 看看是哪里提供了这个 node.<br> 在 552 行, 我们可以找到 node 是 scriptSetupAst 的遍历子节点</p></blockquote><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="// line 552
for (const node of scriptSetupAst)
"></div><code><span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> line 552</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">for</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">const</span><span style="color:#575279;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> node</span><span style="color:#286983;--shiki-dark:#89DDFF;"> of</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> scriptSetupAst</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"></span></code></pre><p>而 <code>scriptSetupAst</code> 是调用了 parse 函数, 传入了<code>&lt;script setup&gt;</code>标签内的内容</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="// parse &lt;script setup&gt; and  walk over top level statements
const scriptSetupAst = parse(
  scriptSetup.content,
  {
    plugins: [
      ...plugins,
    ],
    sourceType: &#39;module&#39;
  },
  startOffset
)
"></div><code><span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> parse &lt;script setup&gt; and  walk over top level statements</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">const</span><span style="color:#575279;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> scriptSetupAst</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> parse</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">  scriptSetup</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">content</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">    plugins</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#F7768E;font-weight:inherit;--shiki-dark-font-weight:bold;">      ...</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">plugins</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#9ABDF5;">    ]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">    sourceType</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">module</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">  startOffset</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"></span></code></pre><p>继续寻找 parse 函数的定义, 在 209 行.<br> parse 函数调用了_parse 函数, 而 _parse 函数是<code>@babel/parser</code>包中 parse 函数的别名, 该函数返回的就是 Babel AST 格式的 AST, 证实了之前的猜想</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="function parse(
  input: string,
  options: ParserOptions,
  offset: number
): Statement[] {
  try {
    return _parse(input, options).program.body
  } catch (e) {
    ...
  }
}
"></div><code><span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">function</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> parse</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">  input</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">  options</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> ParserOptions</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">  offset</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> number</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> Statement</span><span style="color:#575279;--shiki-dark:#9ABDF5;">[]</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">  try</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">    return</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> _parse</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">input</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> options</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">program</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">body</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> catch</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">e</span><span style="color:#575279;--shiki-dark:#9ABDF5;">) </span><span style="color:#797593;--shiki-dark:#9ABDF5;">{</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#F7768E;font-weight:inherit;--shiki-dark-font-weight:bold;">    ...</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><p>到这里, 「向前看」的工作已经完成, 大体流程为</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">mermaid</div><img src="`+s+`" class="copy-icon" data-code="flowchart
    A(script setup 内容) --&gt;|babel parse| B(scriptSetupAst)
    B --&gt;|for...of|C(TSTypeLiteral AST)
"></div><code><span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">flowchart</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    A(script setup 内容) --&gt;|babel parse| B(scriptSetupAst)</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    B --&gt;|for...of|C(TSTypeLiteral AST)</span></span>
<span class="line"></span></code></pre><h2>向后看: propsTypeDecl 有什么用, 怎么处理</h2><p>processDefineProps 的作用是对 propsTypeDecl 赋值, 那么赋值后对 propsTypeDecl 进行了哪些操作就是生成运行时 props 定义的关键.<br> 按照惯例, 首先打印 propsTypeDecl</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="propsTypeDecl:  Node {
  type: &#39;TSTypeLiteral&#39;,
  start: 113,
  end: 729,
  loc: SourceLocation {
    start: Position { line: 7, column: 18 },
    end: Position { line: 30, column: 7 },
    filename: undefined,
    identifierName: undefined
  },
  range: undefined,
  leadingComments: undefined,
  trailingComments: undefined,
  innerComments: undefined,
  extra: undefined,
  members: [
    Node {
      type: &#39;TSPropertySignature&#39;,
      start: 123,
      end: 137,
      loc: [SourceLocation],
      range: undefined,
      leadingComments: undefined,
      trailingComments: undefined,
      innerComments: undefined,
      extra: undefined,
      key: [Node],
      computed: false,
      typeAnnotation: [Node]
    },
    Node {
      type: &#39;TSPropertySignature&#39;,
      start: 146,
      end: 160,
      loc: [SourceLocation],
      range: undefined,
      leadingComments: undefined,
      trailingComments: undefined,
      innerComments: undefined,
      extra: undefined,
      key: [Node],
      computed: false,
      typeAnnotation: [Node]
    },
    Node {
      type: &#39;TSPropertySignature&#39;,
      start: 169,
      end: 185,
      loc: [SourceLocation],
      range: undefined,
      leadingComments: undefined,
      trailingComments: undefined,
      innerComments: undefined,
      extra: undefined,
      key: [Node],
      computed: false,
      typeAnnotation: [Node]
    },
    ...
  ]
}
"></div><code><span class="line"><span style="color:#D7827E;--shiki-dark:#C0CAF5;">propsTypeDecl</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">  Node</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">TSTypeLiteral</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 113</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 729</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  loc</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> SourceLocation</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> Position</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#D7827E;--shiki-dark:#73DACA;"> line</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 7</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#D7827E;--shiki-dark:#73DACA;"> column</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 18</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> Position</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#D7827E;--shiki-dark:#73DACA;"> line</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 30</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#D7827E;--shiki-dark:#73DACA;"> column</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 7</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    filename</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">    identifierName</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  range</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  leadingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  trailingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  innerComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  extra</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;">  members</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">    Node</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">TSPropertySignature</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 123</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 137</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      loc</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">SourceLocation</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      range</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      leadingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      trailingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      innerComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      extra</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      key</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Node</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      computed</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> false</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      typeAnnotation</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Node</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">    Node</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">TSPropertySignature</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 146</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 160</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      loc</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">SourceLocation</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      range</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      leadingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      trailingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      innerComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      extra</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      key</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Node</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      computed</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> false</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      typeAnnotation</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Node</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">    Node</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">TSPropertySignature</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      start</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 169</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      end</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 185</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      loc</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">SourceLocation</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      range</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      leadingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      trailingComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      innerComments</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      extra</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> undefined</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      key</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Node</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      computed</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> false</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">      typeAnnotation</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">Node</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#F7768E;font-weight:inherit;--shiki-dark-font-weight:bold;">    ...</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#9ABDF5;">  ]</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><p>可以看到, propsTypeDecl 就是 defineProps 类型声明的 AST. 主要内容是<code>members</code>字段, 每一个Node对应着一个 props 元素声明</p><p>接下来我们找哪里使用了这个<code>propsTypeDecl</code></p><p>propsTypeDecl 有两处引用</p><h3>生成运行时props(重点)</h3><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="// 4. extract runtime props/emits code from setup context type
if (propsTypeDecl) {
  extractRuntimeProps(propsTypeDecl, typeDeclaredProps, declaredTypes)
}
"></div><code><span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> 4. extract runtime props/emits code from setup context type</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">if</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">propsTypeDecl</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#7AA2F7;">  extractRuntimeProps</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">propsTypeDecl</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> typeDeclaredProps</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> declaredTypes</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><p>参数除了 propsTypeDecl 之外, 还有</p><ul><li>typeDeclaredProps: 类型定义为<code>Record&lt;string, string[]&gt;</code>, 默认为{}的变量</li><li>declaredTypes: 类型<code>Record&lt;string, string[]&gt;</code>, 默认{}的变量</li></ul><p>接下来看看这个函数都做了啥操作</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="function extractRuntimeProps(
  node: TSTypeLiteral,
  props: Record&lt;string, PropTypeData&gt;,
  declaredTypes: Record&lt;string, string[]&gt;
) {
  // members 即 literal type 的AST数组
  for (const m of node.members) {
    // 判断是否为 literal type
    if (m.type === &#39;TSPropertySignature&#39; &amp;&amp; m.key.type === &#39;Identifier&#39;) {
      // 为 typeDeclaredProps 添加字段
      props[m.key.name] = {
        key: m.key.name,
        required: !m.optional,
        type:
          // dev 下生成 type 字段, 生产环境不需要类型信息, 直接赋值 null
          __DEV__ &amp;&amp; m.typeAnnotation
            ? inferRuntimeType(m.typeAnnotation.typeAnnotation, declaredTypes)
            : [\`null\`]
      }
    }
  }
}
"></div><code><span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">function</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> extractRuntimeProps</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">  node</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> TSTypeLiteral</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">  props</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> Record</span><span style="color:#797593;--shiki-dark:#89DDFF;">&lt;</span><span style="color:#56949F;--shiki-dark:#0DB9D7;">string</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> PropTypeData</span><span style="color:#797593;--shiki-dark:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">  declaredTypes</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> Record</span><span style="color:#797593;--shiki-dark:#89DDFF;">&lt;</span><span style="color:#56949F;--shiki-dark:#0DB9D7;">string</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span><span style="color:#575279;--shiki-dark:#9ABDF5;">[]</span><span style="color:#797593;--shiki-dark:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">  //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> members 即 literal type 的AST数组</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">  for</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">const</span><span style="color:#575279;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> m</span><span style="color:#286983;--shiki-dark:#89DDFF;"> of</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> node</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">members</span><span style="color:#575279;--shiki-dark:#9ABDF5;">) </span><span style="color:#797593;--shiki-dark:#9ABDF5;">{</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">    //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> 判断是否为 literal type</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    if</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">m</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">type</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> ===</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">TSPropertySignature</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> &amp;&amp;</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> m</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">key</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">type</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> ===</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">Identifier</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#575279;--shiki-dark:#9ABDF5;">) </span><span style="color:#797593;--shiki-dark:#9ABDF5;">{</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">      //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> 为 typeDeclaredProps 添加字段</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">      props</span><span style="color:#575279;--shiki-dark:#9ABDF5;">[</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">m</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">key</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">name</span><span style="color:#575279;--shiki-dark:#9ABDF5;">] </span><span style="color:#286983;--shiki-dark:#89DDFF;">=</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">        key</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> m</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">key</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">name</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">        required</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> !</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">m</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">optional</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">        type</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">          //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> dev 下生成 type 字段, 生产环境不需要类型信息, 直接赋值 null</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">          __DEV__</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> &amp;&amp;</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> m</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">typeAnnotation</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">            ?</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> inferRuntimeType</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">m</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">typeAnnotation</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">typeAnnotation</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> declaredTypes</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">            :</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">null</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">      }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><p>该函数的作用就是根据 AST 的信息生成运行时的 props 声明, 并赋值给第二个参数<code>typeDeclaredProps</code>, 这个参数最终就是编译完成的 Props.<br> 这里还调用了<code>inferRuntimeType</code>方法, 方法主体就是 switch 语句, 根据不同的<code>node.type</code>字段返回不同的运行时类型声明<br> 截取其中一小段:</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="switch (node.type) {
  case &#39;TSStringKeyword&#39;:
    return [&#39;String&#39;]
  case &#39;TSNumberKeyword&#39;:
    return [&#39;Number&#39;]
"></div><code><span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">switch</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">node</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">type</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">  case</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">TSStringKeyword</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">    return</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">String</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">  case</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">TSNumberKeyword</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">    return</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> [</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">Number</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span></span>
<span class="line"></span></code></pre><h3>生成 __props 字段</h3><p>propsTypeDecl 另一处引用是用来生成<code>defineProps</code>方法中的__props字段:</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="// 9. finalize setup() argument signature
let args = \`__props\`
if (propsTypeDecl) {
  args += \`: \${scriptSetup.content.slice(
    propsTypeDecl.start!,
    propsTypeDecl.end!
  )}\`
}
// inject user assignment of props
// we use a default __props so that template expressions referencing props
// can use it directly
if (propsIdentifier) {
  s.prependRight(startOffset, \`\\nconst \${propsIdentifier} = __props\`)
}
if (emitIdentifier) {
  args +=
    emitIdentifier === \`emit\` ? \`, { emit }\` : \`, { emit: \${emitIdentifier} }\`
  if (emitTypeDecl) {
    args += \`: {
      emit: (\${scriptSetup.content.slice(
        emitTypeDecl.start!,
        emitTypeDecl.end!
      )}),
      slots: any,
      attrs: any
    }\`
  }
}
"></div><code><span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> 9. finalize setup() argument signature</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">let</span><span style="color:#575279;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> args</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> \`</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">__props</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">if</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">propsTypeDecl</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">  args</span><span style="color:#286983;--shiki-dark:#89DDFF;"> +=</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> \`</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">: </span><span style="color:#797593;--shiki-dark:#7DCFFF;">\${</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">scriptSetup</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">content</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">slice</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    propsTypeDecl</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">start</span><span style="color:#286983;--shiki-dark:#BB9AF7;">!</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    propsTypeDecl</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">end</span><span style="color:#286983;--shiki-dark:#BB9AF7;">!</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#9ABDF5;">  )</span><span style="color:#797593;--shiki-dark:#7DCFFF;">}</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> inject user assignment of props</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> we use a default __props so that template expressions referencing props</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> can use it directly</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">if</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">propsIdentifier</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">  s</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">prependRight</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">startOffset</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> \`</span><span style="color:#286983;--shiki-dark:#89DDFF;">\\n</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">const </span><span style="color:#797593;--shiki-dark:#7DCFFF;">\${</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">propsIdentifier</span><span style="color:#797593;--shiki-dark:#7DCFFF;">}</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;"> = __props</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">if</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">emitIdentifier</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">  args</span><span style="color:#286983;--shiki-dark:#89DDFF;"> +=</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    emitIdentifier</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> ===</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> \`</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">emit</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> ?</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> \`</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">, { emit }</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> :</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> \`</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">, { emit: </span><span style="color:#797593;--shiki-dark:#7DCFFF;">\${</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">emitIdentifier</span><span style="color:#797593;--shiki-dark:#7DCFFF;">}</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;"> }</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">  if</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">emitTypeDecl</span><span style="color:#575279;--shiki-dark:#9ABDF5;">) </span><span style="color:#797593;--shiki-dark:#9ABDF5;">{</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    args</span><span style="color:#286983;--shiki-dark:#89DDFF;"> +=</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> \`</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">: {</span></span>
<span class="line"><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">      emit: (</span><span style="color:#797593;--shiki-dark:#7DCFFF;">\${</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">scriptSetup</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">content</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">slice</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">        emitTypeDecl</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">start</span><span style="color:#286983;--shiki-dark:#BB9AF7;">!</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">        emitTypeDecl</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">end</span><span style="color:#286983;--shiki-dark:#BB9AF7;">!</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#9ABDF5;">      )</span><span style="color:#797593;--shiki-dark:#7DCFFF;">}</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">),</span></span>
<span class="line"><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">      slots: any,</span></span>
<span class="line"><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">      attrs: any</span></span>
<span class="line"><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">    }</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><h2>总结</h2><p>到这里我们分析完了整个的流程, 如下:</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">mermaid</div><img src="`+s+`" class="copy-icon" data-code="flowchart
    A(script setup 内容) --&gt;|babel parse| B(scriptSetupAst)
    B --&gt;|for...of|C(TSTypeLiteral AST)
    C --&gt;|extractRuntimeProps|D(runtime Props)
    C --&gt;|&quot;finalize setup() argument signature&quot;|E(defineComponent: __props)
"></div><code><span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">flowchart</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    A(script setup 内容) --&gt;|babel parse| B(scriptSetupAst)</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    B --&gt;|for...of|C(TSTypeLiteral AST)</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    C --&gt;|extractRuntimeProps|D(runtime Props)</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    C --&gt;|&quot;finalize setup() argument signature&quot;|E(defineComponent: __props)</span></span>
<span class="line"></span></code></pre>`,46),p=[e],h="Vue 宏编译: 以 defineProps 为例",D="分析 Vue defineProps 的 type-only 写法是如何根据类型信息生成运行时代码的",F="2024-2-29",A="Vue",f={__name:"vue-compiler-macro-defineprops",setup(r,{expose:a}){return a({frontmatter:{title:"Vue 宏编译: 以 defineProps 为例",intro:"分析 Vue defineProps 的 type-only 写法是如何根据类型信息生成运行时代码的",time:"2024-2-29",tag:"Vue"}}),(k,c)=>(i(),n("div",o,p))}};export{f as default,D as intro,A as tag,F as time,h as title};
