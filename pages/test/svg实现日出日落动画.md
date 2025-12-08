使用svg 帮我做一个 日出日落的动画

这是一个使用纯 SVG 和 CSS 动画制作的“日出日落”效果。

这个动画包含了以下细节：
1.  **天空颜色变化**：从深夜的深蓝 -> 日出的橙红 -> 正午的蔚蓝 -> 日落的紫红 -> 再回到深夜。
2.  **太阳运动轨迹**：太阳沿着弧线从左下升起，划过天空，再从右下落下。
3.  **太阳颜色变化**：在地平线时是红色/橙色，在正午变成明亮的黄色。
4.  **星星闪烁**：当天空变黑时，背景中的星星会出现并闪烁。

### 代码实现

你可以直接将下面的代码保存为 `.html` 文件并在浏览器中打开，或者保存为 `.svg` 文件。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SVG 日出日落动画</title>
    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #222;
        }
        svg {
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
            max-width: 100%;
            border-radius: 8px;
        }
    </style>
</head>
<body>

<!-- SVG 开始 -->
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
    <style>
        /* 1. 天空颜色动画 */
        @keyframes skyCycle {
            0% { fill: #0b1026; }   /* 深夜 */
            15% { fill: #2b32b2; }  /* 黎明前 */
            30% { fill: #ff7e5f; }  /* 日出橙色 */
            45% { fill: #87CEEB; }  /* 正午蓝天 */
            55% { fill: #87CEEB; }  /* 正午蓝天保持 */
            70% { fill: #feb47b; }  /* 日落金黄 */
            85% { fill: #4b134f; }  /* 傍晚紫色 */
            100% { fill: #0b1026; } /* 回到深夜 */
        }

        /* 2. 太阳公转动画 (控制位置) */
        @keyframes sunMove {
            0% { transform: rotate(-110deg); }
            100% { transform: rotate(110deg); }
        }

        /* 3. 太阳颜色与光晕动画 */
        @keyframes sunColor {
            0% { fill: #ff4500; r: 25; fill-opacity: 0.8; } /* 红太阳 */
            20% { fill: #ff8c00; r: 30; fill-opacity: 1; }
            50% { fill: #ffff00; r: 35; fill-opacity: 1; filter: url(#glow); } /* 正午亮黄 */
            80% { fill: #ff4500; r: 30; fill-opacity: 1; filter: none;}
            100% { fill: #8b0000; r: 25; fill-opacity: 0.8; }
        }

        /* 4. 星星透明度动画 */
        @keyframes starFade {
            0% { opacity: 1; }
            30% { opacity: 0; }
            70% { opacity: 0; }
            100% { opacity: 1; }
        }

        /* 应用动画 */
        #sky-rect {
            animation: skyCycle 10s linear infinite;
        }

        /* 太阳容器：以此为中心旋转，圆心设置在画面底部中间 */
        #sun-orbit {
            transform-origin: 400px 600px; /* 旋转中心点在画面下方 */
            animation: sunMove 10s linear infinite;
        }

        #the-sun {
            animation: sunColor 10s linear infinite;
        }

        #stars {
            animation: starFade 10s linear infinite;
        }
        
    </style>

    <!-- 定义滤镜：高斯模糊做发光效果 -->
    <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>

    <!-- 天空背景 -->
    <rect id="sky-rect" width="800" height="500" x="0" y="0" />

    <!-- 星星组 -->
    <g id="stars" fill="#FFF">
        <circle cx="100" cy="100" r="2" />
        <circle cx="200" cy="50" r="1.5" />
        <circle cx="500" cy="80" r="2" />
        <circle cx="700" cy="150" r="1.5" />
        <circle cx="300" cy="200" r="1" />
        <circle cx="600" cy="40" r="2.5" />
        <circle cx="50" cy="300" r="1.5" />
        <circle cx="750" cy="250" r="2" />
    </g>

    <!-- 太阳轨道系统 -->
    <g id="sun-orbit">
        <!-- 太阳本体：位置稍微偏离旋转中心，形成拱形轨迹 -->
        <!-- cx=400 对应旋转中心X轴，cy=100 代表最高点高度 -->
        <circle id="the-sun" cx="400" cy="100" r="30" />
    </g>

    <!-- 地面/山脉 (放在最上层以遮挡落下的太阳) -->
    <path d="M0 500 L0 400 Q 200 300 400 400 T 800 400 L 800 500 Z" fill="#2c3e50" />
    <path d="M0 500 L0 450 Q 150 420 300 480 T 800 460 L 800 500 Z" fill="#1a252f" opacity="0.8"/>

</svg>
<!-- SVG 结束 -->

</body>
</html>
```

### 实现原理简析：

1.  **`<style>` 内嵌动画**：
    *   我使用了 CSS `@keyframes` 来控制动画，这比 SMIL（SVG 原生动画标签）更现代、性能更好且易于修改。
    *   整个动画周期设置为 `10s`（10秒），你可以修改 `animation: ... 10s ...` 中的数字来调整快慢。

2.  **太阳的轨迹 (`#sun-orbit`)**：
    *   这是一个巧妙的技巧。我没有让太阳自己移动 `x` 和 `y` 坐标，而是创建了一个巨大的、不可见的“转臂”（Group `<g>`）。
    *   设置 `transform-origin: 400px 600px;`，这意味着旋转中心在画布底部下方 100px 的地方。
    *   当这个组旋转时，位于顶部的太阳就会画出一个完美的圆弧。

3.  **层级遮挡**：
    *   SVG 的渲染顺序是“代码在后的在上面”。
    *   **山脉 (`path`)** 写在代码的最后，所以当太阳转到下方时，会被山脉自然遮挡，形成真实的日出日落切断效果。

4.  **滤镜 (`filter`)**：
    *   使用了 `<feGaussianBlur>` 给正午的太阳增加了一点发光（Glow）效果，让它看起来更刺眼、明亮。