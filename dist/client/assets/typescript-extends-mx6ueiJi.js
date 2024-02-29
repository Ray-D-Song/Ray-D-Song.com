import{_ as s}from"./copy-D7w4FOSZ.js";import{b as n,o as i,h as l}from"./index-1IxJmiPE.js";const t={class:"markdown-body"},e=l('<h1>class extends</h1><p>TS 是 JS 的超集, 拥有 JS 的所有行为, ES6 标准的 class 可以使用 extends 关键字表示类继承.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="'+s+`" class="copy-icon" data-code="// B extends A 则 会拥有 A 的所有属性和方法
class A {
  name: string
  constructor(name: string) { this.name = name }

  logName() { 
    console.log(\`\${this.name}\`)
  }
}

class B extends A {}

const b = new B(&#39;Ray&#39;)
b.logName() // &quot;Ray&quot;
"></div><code><span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> B extends A 则 会拥有 A 的所有属性和方法</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">class</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> A</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">  name</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">  constructor</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">name</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#575279;--shiki-dark:#F7768E;font-style:italic;--shiki-dark-font-style:inherit;"> this</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">name</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> name</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#7AA2F7;">  logName</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> </span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    console</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">log</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span><span style="color:#797593;--shiki-dark:#7DCFFF;">\${</span><span style="color:#575279;--shiki-dark:#F7768E;font-style:italic;--shiki-dark-font-style:inherit;">this</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">name</span><span style="color:#797593;--shiki-dark:#7DCFFF;">}</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">class</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> B</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;"> extends</span><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> A</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">const</span><span style="color:#575279;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> b</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#286983;--shiki-dark:#89DDFF;"> new</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> B</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">Ray</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">b</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">logName</span><span style="color:#575279;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> &quot;Ray&quot;</span></span>
<span class="line"></span></code></pre><h2>原理</h2><p>ES6 的 class 由原型链模拟出来的「类」.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">mermaid</div><img src="`+s+`" class="copy-icon" data-code="classDiagram
    A &lt;|-- B : [[Prototype]]
    class A{
      +name
      +logName()
    }
    class B
"></div><code><span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">classDiagram</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    A &lt;|-- B : [[Prototype]]</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    class A{</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">      +name</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">      +logName()</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    }</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    class B</span></span>
<span class="line"></span></code></pre><p>B 的原型属性<code>[[Prototype]]</code>被标记为 A, 当访问<code>logName</code>方法时在B中没有找到, 就会到 B 的原型 A 中去寻找, 巧妙的模拟了类继承的行为.</p><h1>类型编程</h1><h2>接口继承</h2><p>在类型编程中, extends 作用于 interface 的效果和 &amp; 符号作用于 type 的效果一致<br> 都表示将类型 A 的属性添加到类型 B 中, 可以理解为<code>字段mixin</code></p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="interface A {
  age: number
}

interface B extends A {
  name: string
}
// 等价于:
type B = {
  name: string
} &amp; A

// ✅
const b: B = {
  age: 24,
  name: &#39;Ray&#39;
}
"></div><code><span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">interface</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> A</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">  age</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> number</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">interface</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> B</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;"> extends</span><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> A</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">  name</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> 等价于:</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">type</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> B</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">  name</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span><span style="color:#286983;--shiki-dark:#89DDFF;"> &amp;</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> A</span></span>
<span class="line"></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> ✅</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">const</span><span style="color:#575279;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> b</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> B</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">  age</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 24</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#73DACA;">  name</span><span style="color:#797593;--shiki-dark:#89DDFF;">:</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">Ray</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><p>同时 Typescript 作为 duck type 语言, 如果类型 B 定义的位置在类型 A 后, 且字段是类型 A 的超集, 则类型 B 默认继承了类型 A.<br> 因此在多重继承时, 不存在两个继承源相同字段类型不同的情况, 不需要考虑继承顺序.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="interface A {
  age: number
}

// ❌: Interface &#39;B&#39; incorrectly extends interface &#39;A&#39;.ts(2430)
interface B {
  age: string
  job: string
}

/** 
 * 
 * ❌: Interface &#39;C&#39; cannot simultaneously extend types &#39;A&#39; and &#39;B&#39;.
 * Named property &#39;age&#39; of types &#39;A&#39; and &#39;B&#39; are not identical. 
 */
interface C extends A, B {
  name: string
}
"></div><code><span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">interface</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> A</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">  age</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> number</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> ❌: Interface &#39;B&#39; incorrectly extends interface &#39;A&#39;.ts(2430)</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">interface</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> B</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">  age</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">  job</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">/**</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> </span></span>
<span class="line"><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> * </span></span>
<span class="line"><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> * ❌: Interface &#39;C&#39; cannot simultaneously extend types &#39;A&#39; and &#39;B&#39;.</span></span>
<span class="line"><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> * Named property &#39;age&#39; of types &#39;A&#39; and &#39;B&#39; are not identical. </span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> */</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">interface</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> C</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;"> extends</span><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> A</span><span style="color:#797593;--shiki-dark:#89DDFF;">,</span><span style="color:#907AA9;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> B</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#73DACA;font-style:italic;--shiki-dark-font-style:inherit;">  name</span><span style="color:#286983;--shiki-dark:#89DDFF;">:</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> string</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><h2>类型三目运算</h2><p>有一道非常经典的类型体操题, 实现一个<code>First&lt;T&gt;</code>泛型, 它接受一个数组<code>T</code>并返回它的第一个元素的类型.<br> 解法如下</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">typescript</div><img src="`+s+`" class="copy-icon" data-code="type First&lt;T extends any[]&gt; = T extends [] ? never : T[0]
"></div><code><span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">type</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> First</span><span style="color:#797593;--shiki-dark:#89DDFF;">&lt;</span><span style="color:#56949F;--shiki-dark:#C0CAF5;">T</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;"> extends</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> any</span><span style="color:#575279;--shiki-dark:#9ABDF5;">[]</span><span style="color:#797593;--shiki-dark:#89DDFF;">&gt;</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> T</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;"> extends</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> []</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> ?</span><span style="color:#56949F;--shiki-dark:#0DB9D7;"> never</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> :</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> T</span><span style="color:#575279;--shiki-dark:#9ABDF5;">[</span><span style="color:#D7827E;--shiki-dark:#FF9E64;">0</span><span style="color:#575279;--shiki-dark:#9ABDF5;">]</span></span>
<span class="line"></span></code></pre><p>思路: 如果是空数组, 返回无类型, 如果有元素则返回 T[0] extends 在此处用作条件判断, 意思是<code>T类型实例的值是否可以赋值给[]类型实例的值</code>, 与此同时[]类型的实例只能是空字符串</p><blockquote><p>参考引用</p><ol><li><a href="https://zh.javascript.info/class-inheritance">现代 JavaScript 教程</a></li><li><a href="https://juejin.cn/post/6998736350841143326">TS关键字extends用法总结</a></li></ol></blockquote>`,18),o=[e],h="TypeScript extends 关键字详解",D="总结 Typescript 中 extends 关键字的用法和场景",F="2024-2-20",A="TypeScript",f={__name:"typescript-extends",setup(r,{expose:a}){return a({frontmatter:{title:"TypeScript extends 关键字详解",intro:"总结 Typescript 中 extends 关键字的用法和场景",time:"2024-2-20",tag:"TypeScript"}}),(k,c)=>(i(),n("div",t,o))}};export{f as default,D as intro,A as tag,F as time,h as title};
