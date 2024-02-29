import{_ as s}from"./copy-D7w4FOSZ.js";import{b as n,o as i,h as l}from"./index-7d07Ouw1.js";const o={class:"markdown-body"},t=l('<p>最近在看 C++ 引入 Fiber 的<a href="https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4024.pdf">N4024文档: 区分纤程和协程</a>, 文章给纤程和协程十分明确的区分. 但过去我看过的很多资料会将其混为一谈或者模糊二者的边界, 所以写了这篇博客来总结一下.</p><h1>纤程</h1><p>线程是一种轻量级的线程, 本质是对线程时间进行切片处理, 调度也由用户进行. 最早是 Microsoft 为了解决 Unix 平台的引用程序移植到 Windows 上时出现的问题而发起的提案. 因此, 纤程是一种偏底层的概念, 通常由操作系统或runtime自动管理, 并不需要程序员手动干预. 例如 Windows 上的纤程就是在其内核上实现.</p><blockquote><p>值得注意的是, php8 引入的 Fiber 虽然叫做纤程, 其本质是协程.</p></blockquote><p>一个线程可以包含多个纤程, 纤程的好处是可以有效防止长时间的线程挂起. 例如在 IO 操作时, 实例化一个纤程进行 IO 操作, 在该纤程阻塞的过程中, 因为仅占用了一部分的时间切片, 程序依旧可以继续执行.</p><h1>协程</h1><p>协程的核心就是协作, 通过明确的挂起和恢复来控制执行的流程，使得不同任务之间可以更好地协同工作，共享信息，避免竞态条件，提高性能. 协程在许多语言中都有实现, 例如 <code>Lua、Go、Ruby、Java(Virtual Threads)</code>, <code>Python 和 JavaScript(基于生成器)</code>. 如果要用一句话来总结协程: <code>控制流的主动让出和恢复</code>.</p><h2>有栈协程和无栈协程</h2><p>协程有很多种, 按照多个协程之间是否存在调用栈, 可以分为<code>有栈协程(如goroutine、lua协程)</code>和<code>无栈协程(如JavaScript、Dart、Python)</code>.</p><blockquote><p>调用栈的作用是保存协程挂起时的状态. 有栈协程在恢复时会将其上下文从栈内存中捞出恢复到系统栈中. 无栈协程的挂起和恢复则依赖闭包和状态机实现.</p></blockquote><h2>对称协程和非对称协程</h2><p>非对称协程提供<code>两种控制操作</code>, <code>调用协程</code>和<code>挂起协程</code>. 非对称协程可以看做是其调用者的从属, 跟特定调用者绑定, 在让出控制权时, 只能回到原调用者. 对称协程提供<code>单个控制操作</code>, 可以通过该操作在协程之间显示的传递控制权. 对称协程在启动后和原调用者就没什么关系了, 也因此, 对称协程需要一个调度器去选择转移控制权操作的目标协程.</p><h3>对称</h3><p>对称协程的例子非常少, 以下是 C++ <code>Boost.Coroutine</code> 的示例.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">cpp</div><img src="'+s+`" class="copy-icon" data-code="#include &lt;iostream&gt;
#include &lt;coroutine&gt;

struct CountingCoroutine {
    struct promise_type {
        int current_value = 0;

        CountingCoroutine get_return_object() {
            return CountingCoroutine(std::coroutine_handle&lt;promise_type&gt;::from_promise(*this));
        }

        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() {}
        std::suspend_always yield_value(int value) {
            current_value = value;
            return {};
        }
    };

    std::coroutine_handle&lt;promise_type&gt; coroutine;

    CountingCoroutine(std::coroutine_handle&lt;promise_type&gt; handle) : coroutine(handle) {}

    ~CountingCoroutine() {
        if (coroutine)
            coroutine.destroy();
    }

    int getValue() const {
        return coroutine.promise().current_value;
    }

    void resume() {
        coroutine.resume();
    }
};

CountingCoroutine generateNumbers() {
    for (int i = 0; i &lt; 10; ++i) {
        //移交控制权
        co_yield i;
    }
}

int main() {
    CountingCoroutine counter = generateNumbers();

    while (counter.coroutine) {
        std::cout &lt;&lt; &quot;Value: &quot; &lt;&lt; counter.getValue() &lt;&lt; std::endl;
        //回到 co_yield 继续执行
        counter.resume();
    }

    return 0;
}
"></div><code><span class="line"><span style="color:#797593;--shiki-dark:#89DDFF;">#</span><span style="color:#286983;--shiki-dark:#BB9AF7;">include</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &lt;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">iostream</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#89DDFF;">#</span><span style="color:#286983;--shiki-dark:#BB9AF7;">include</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &lt;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">coroutine</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">struct</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> CountingCoroutine</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    struct</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> promise_type</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        int</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> current_value </span><span style="color:#286983;--shiki-dark:#89DDFF;">=</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 0</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#56949F;--shiki-dark:#C0CAF5;">        CountingCoroutine</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> get_return_object</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">            return</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> CountingCoroutine</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#D7827E;--shiki-dark:#C0CAF5;">std</span><span style="color:#797593;--shiki-dark:#89DDFF;">::</span><span style="color:#D7827E;--shiki-dark:#C0CAF5;">coroutine_handle</span><span style="color:#797593;--shiki-dark:#9ABDF5;">&lt;</span><span style="color:#56949F;--shiki-dark:#C0CAF5;">promise_type</span><span style="color:#797593;--shiki-dark:#9ABDF5;">&gt;</span><span style="color:#797593;--shiki-dark:#89DDFF;">::</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">from_promise</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#286983;--shiki-dark:#89DDFF;">*</span><span style="color:#575279;--shiki-dark:#F7768E;font-style:italic;--shiki-dark-font-style:inherit;">this</span><span style="color:#797593;--shiki-dark:#9ABDF5;">))</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#C0CAF5;">        std</span><span style="color:#797593;--shiki-dark:#89DDFF;">::</span><span style="color:#56949F;--shiki-dark:#C0CAF5;">suspend_always</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> initial_suspend</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;"> return</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {}</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#C0CAF5;">        std</span><span style="color:#797593;--shiki-dark:#89DDFF;">::</span><span style="color:#56949F;--shiki-dark:#C0CAF5;">suspend_always</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> final_suspend</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;"> noexcept</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;"> return</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {}</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> }</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        void</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> return_void</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {}</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        void</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> unhandled_exception</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {}</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#C0CAF5;">        std</span><span style="color:#797593;--shiki-dark:#89DDFF;">::</span><span style="color:#56949F;--shiki-dark:#C0CAF5;">suspend_always</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> yield_value</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#286983;--shiki-dark:#BB9AF7;">int</span><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;"> value</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#9ABDF5;">            current_value </span><span style="color:#286983;--shiki-dark:#89DDFF;">=</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> value</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">            return</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {}</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">        }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#C0CAF5;">    std</span><span style="color:#797593;--shiki-dark:#89DDFF;">::</span><span style="color:#575279;--shiki-dark:#9ABDF5;">coroutine_handle</span><span style="color:#286983;--shiki-dark:#BB9AF7;">&lt;</span><span style="color:#575279;--shiki-dark:#9ABDF5;">promise_type</span><span style="color:#286983;--shiki-dark:#BB9AF7;">&gt;</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> coroutine</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#7AA2F7;">    CountingCoroutine</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#D7827E;--shiki-dark:#C0CAF5;">std</span><span style="color:#797593;--shiki-dark:#89DDFF;">::</span><span style="color:#56949F;--shiki-dark:#C0CAF5;">coroutine_handle</span><span style="color:#797593;--shiki-dark:#9ABDF5;">&lt;</span><span style="color:#56949F;--shiki-dark:#C0CAF5;">promise_type</span><span style="color:#797593;--shiki-dark:#9ABDF5;">&gt;</span><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;"> handle</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#89DDFF;"> :</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> coroutine</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#575279;--shiki-dark:#9ABDF5;">handle</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#7AA2F7;">    ~CountingCoroutine</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        if</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#9ABDF5;">coroutine</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">            coroutine</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">destroy</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    int</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> getValue</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;"> const</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">        return</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> coroutine</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">promise</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">current_value</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    void</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> resume</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">        coroutine</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">resume</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#56949F;--shiki-dark:#C0CAF5;">CountingCoroutine</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> generateNumbers</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    for</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> (</span><span style="color:#286983;--shiki-dark:#BB9AF7;">int</span><span style="color:#575279;--shiki-dark:#A9B1D6;"> i </span><span style="color:#286983;--shiki-dark:#89DDFF;">=</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 0</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span><span style="color:#575279;--shiki-dark:#A9B1D6;"> i </span><span style="color:#286983;--shiki-dark:#BB9AF7;">&lt;</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 10</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span><span style="color:#286983;--shiki-dark:#89DDFF;"> ++</span><span style="color:#575279;--shiki-dark:#A9B1D6;">i</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">        //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">移交控制权</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        co_yield</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> i</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">int</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> main</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#A9B1D6;">    CountingCoroutine counter </span><span style="color:#286983;--shiki-dark:#89DDFF;">=</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> generateNumbers</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    while</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> (</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">counter</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#575279;--shiki-dark:#7DCFFF;font-style:italic;--shiki-dark-font-style:inherit;">coroutine</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#C0CAF5;">        std</span><span style="color:#797593;--shiki-dark:#89DDFF;">::</span><span style="color:#575279;--shiki-dark:#9ABDF5;">cout </span><span style="color:#286983;--shiki-dark:#89DDFF;">&lt;&lt;</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;"> &quot;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">Value: </span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&quot;</span><span style="color:#286983;--shiki-dark:#89DDFF;"> &lt;&lt;</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> counter</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">getValue</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#286983;--shiki-dark:#89DDFF;"> &lt;&lt;</span><span style="color:#D7827E;--shiki-dark:#C0CAF5;"> std</span><span style="color:#797593;--shiki-dark:#89DDFF;">::</span><span style="color:#575279;--shiki-dark:#9ABDF5;">endl</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">        //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">回到 co_yield 继续执行</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">        counter</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">resume</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">    return</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 0</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><p>在 Go 语言中, 我们可以通过 chan 在没有特定从属关系的情况下完成协程间控制权的转移, 也算是对称协程的实现:</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">go</div><img src="`+s+`" class="copy-icon" data-code="func main() {
    ch1 := make(chan int)
    ch2 := make(chan int)

    var wg sync.WaitGroup

    wg.Add(1)
    go func() { // &lt;--- 1
        defer wg.Done()
        for val := range ch1 {
            fmt.Println(val)
        }
    }()

    wg.Add(1)
    go func() { // &lt;--- 2
        defer wg.Done()
        for val := range ch2 {
            ch1 &lt;- val
        }
        close(ch1)
    }()

    wg.Add(1)
    go func() { // &lt;--- 3
        defer wg.Done()
        for i := 1; i &lt;= 5; i++ {
            ch2 &lt;- i
        }
        close(ch2)
    }()

    wg.Wait()
}
"></div><code><span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">func</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> main</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    ch1</span><span style="color:#286983;--shiki-dark:#89DDFF;"> :=</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> make</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#286983;--shiki-dark:#BB9AF7;">chan</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> int</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    ch2</span><span style="color:#286983;--shiki-dark:#89DDFF;"> :=</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> make</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#286983;--shiki-dark:#BB9AF7;">chan</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> int</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    var</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> wg</span><span style="color:#56949F;--shiki-dark:#C0CAF5;"> sync</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#56949F;--shiki-dark:#C0CAF5;">WaitGroup</span></span>
<span class="line"></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    wg</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">Add</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#D7827E;--shiki-dark:#FF9E64;">1</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    go</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> func</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> &lt;--- 1</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        defer</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> wg</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">Done</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        for</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> val</span><span style="color:#286983;--shiki-dark:#89DDFF;"> :=</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> range</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> ch1</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">            fmt</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">Println</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">val</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">        }</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    wg</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">Add</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#D7827E;--shiki-dark:#FF9E64;">1</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    go</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> func</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> &lt;--- 2</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        defer</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> wg</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">Done</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        for</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> val</span><span style="color:#286983;--shiki-dark:#89DDFF;"> :=</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> range</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> ch2</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">            ch1</span><span style="color:#286983;--shiki-dark:#89DDFF;"> &lt;-</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> val</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">        }</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#7AA2F7;">        close</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">ch1</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    wg</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">Add</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#D7827E;--shiki-dark:#FF9E64;">1</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">    go</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> func</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> &lt;--- 3</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        defer</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> wg</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">Done</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;">        for</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> i</span><span style="color:#286983;--shiki-dark:#89DDFF;"> :=</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 1</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> i</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> &lt;=</span><span style="color:#D7827E;--shiki-dark:#FF9E64;"> 5</span><span style="color:#797593;--shiki-dark:#89DDFF;">;</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> i</span><span style="color:#286983;--shiki-dark:#89DDFF;">++</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">            ch2</span><span style="color:#286983;--shiki-dark:#89DDFF;"> &lt;-</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> i</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">        }</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#7AA2F7;">        close</span><span style="color:#797593;--shiki-dark:#9ABDF5;">(</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">ch2</span><span style="color:#797593;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">    }()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    wg</span><span style="color:#797593;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">Wait</span><span style="color:#797593;--shiki-dark:#9ABDF5;">()</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span></code></pre><p>如果按照代码的顺序执行, 那正确的排列顺序是 3 2 1, 但在此处由于channel的阻塞特性, 第一个goroutine会等待第二个goroutine将数据从 ch2 传输到 ch1, 而第二个goroutine会等待第三个goroutine将数据发送到 ch2, 这就保证了它们的执行顺序. 最后，当所有goroutine都完成并且WaitGroup计数为0时, wg.Wait() 返回, 程序退出.</p><h3>非对称</h3><p>JavaScript 的 async、await、promise 则是创建非对称协程的工具.</p><pre class="shiki shiki-themes rose-pine-dawn tokyo-night" style="background-color:#faf4ed;--shiki-dark-bg:#1a1b26;color:#575279;--shiki-dark:#a9b1d6;" tabindex="0"><div class="copy-container"><div class="lang-symbol">javascript</div><img src="`+s+`" class="copy-icon" data-code="// async 标记的函数会创建协程
const useFetch = async () =&gt; { 
  // 执行到 await 处会将该协程挂起, 直到 fetch 返回
  const res = await fetch(&#39;https://www.v2ex.com/api/topics/hot.json&#39;)
  return res.json()
}

const main = () =&gt; {
  console.log(&#39;main start&#39;)
  // 执行到此处, 控制权转移到协程
  useFetch().then(res =&gt; { 
    // 执行到函数内部 await 处, 暂时挂起, 控制权返回到 main
    console.log(\`fetch res: \${res}\`)
  })
  console.log(&#39;main end&#39;)
}

main()
/**
 * main start
 * main end
 * fetch res: ...
 */
"></div><code><span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">//</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> async 标记的函数会创建协程</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">const</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;font-style:italic;--shiki-dark-font-style:inherit;"> useFetch</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;"> async</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> ()</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> =&gt;</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> </span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">  //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> 执行到 await 处会将该协程挂起, 直到 fetch 返回</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">  const</span><span style="color:#575279;--shiki-dark:#BB9AF7;font-style:italic;--shiki-dark-font-style:inherit;"> res</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;"> await</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;"> fetch</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">https://www.v2ex.com/api/topics/hot.json</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#286983;--shiki-dark:#BB9AF7;font-style:inherit;--shiki-dark-font-style:italic;">  return</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;"> res</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">json</span><span style="color:#575279;--shiki-dark:#9ABDF5;">()</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#286983;--shiki-dark:#9D7CD8;font-style:inherit;--shiki-dark-font-style:italic;">const</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;font-style:italic;--shiki-dark-font-style:inherit;"> main</span><span style="color:#286983;--shiki-dark:#89DDFF;"> =</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> ()</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> =&gt;</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">  console</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">log</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">main start</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">  //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> 执行到此处, 控制权转移到协程</span></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#7AA2F7;">  useFetch</span><span style="color:#575279;--shiki-dark:#9ABDF5;">()</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">then</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#907AA9;--shiki-dark:#E0AF68;font-style:italic;--shiki-dark-font-style:inherit;">res</span><span style="color:#286983;--shiki-dark:#BB9AF7;"> =&gt;</span><span style="color:#797593;--shiki-dark:#9ABDF5;"> {</span><span style="color:#575279;--shiki-dark:#9ABDF5;"> </span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">    //</span><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> 执行到函数内部 await 处, 暂时挂起, 控制权返回到 main</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">    console</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">log</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">fetch res: </span><span style="color:#797593;--shiki-dark:#7DCFFF;">\${</span><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">res</span><span style="color:#797593;--shiki-dark:#7DCFFF;">}</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">\`</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">  }</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#575279;--shiki-dark:#C0CAF5;font-style:italic;--shiki-dark-font-style:inherit;">  console</span><span style="color:#286983;--shiki-dark:#89DDFF;">.</span><span style="color:#D7827E;--shiki-dark:#7AA2F7;">log</span><span style="color:#575279;--shiki-dark:#9ABDF5;">(</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#EA9D34;--shiki-dark:#9ECE6A;">main end</span><span style="color:#EA9D34;--shiki-dark:#89DDFF;">&#39;</span><span style="color:#575279;--shiki-dark:#9ABDF5;">)</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#9ABDF5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D7827E;--shiki-dark:#7AA2F7;">main</span><span style="color:#575279;--shiki-dark:#9ABDF5;">()</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;">/**</span></span>
<span class="line"><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> * main start</span></span>
<span class="line"><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> * main end</span></span>
<span class="line"><span style="color:#9893A5;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> * fetch res: ...</span></span>
<span class="line"><span style="color:#797593;--shiki-dark:#51597D;font-style:italic;--shiki-dark-font-style:italic;"> */</span></span>
<span class="line"></span></code></pre><p>可以看到, 在 JS 中, 协程转移的控制权一定会返回到协程的调用者上.</p><h1>异同</h1><p>看到这里, 会发现纤程和协程极为相似. 没错, 大框架上两者的基本概念是一样的. 仅有的区别是纤程的状态保存由操作系统API提供, 而协程保存和恢复的方式由语言或库提供, 背后的实现更是则多种多样. 所以我们可以认为: 纤程实际上就是由操作系统提供的协程. 参考<a href="https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4024.pdf">Distinguishing coroutines and fibers</a>, 以下是一些细节的差别:</p><ol><li>Fiber 在发起后不再依赖于发起它的程序存在, 可以拥有独立的生命周期. Coroutine 作为发起者的「子程序」, 不存在独立的生命周期.</li><li>Fiber 和 Thread 行为模式基本一致. 存在一个调度器, 某个 Fiber 被阻塞, 会将控制权移交至调度器, 由调度器去唤起其他准备运行的 Fiber. 对称协程的行为方式和 Fiber 基本一致. 非对称协程不存在调度器, 控制权会回到发起者.</li></ol>`,25),r=[t],y="协程(Coroutine)和纤程(Fiber)",F="最近在看 C++ 引入 Fiber 的[N4024文档: 区分纤程和协程](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4024.pdf), 文章给纤程和协程十分明确的区分. 但过去我看过的很多资料会将其混为一谈或者模糊二者的边界, 所以写了这篇博客来总结一下.",D="2023-9-13",A="Concurrent",B={__name:"coroutine-and-fiber",setup(p,{expose:a}){return a({frontmatter:{title:"协程(Coroutine)和纤程(Fiber)",intro:"最近在看 C++ 引入 Fiber 的[N4024文档: 区分纤程和协程](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4024.pdf), 文章给纤程和协程十分明确的区分. 但过去我看过的很多资料会将其混为一谈或者模糊二者的边界, 所以写了这篇博客来总结一下.",time:"2023-9-13",tag:"Concurrent"}}),(k,c)=>(i(),n("div",o,r))}};export{B as default,F as intro,A as tag,D as time,y as title};
