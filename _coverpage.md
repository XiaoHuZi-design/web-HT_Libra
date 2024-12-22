<!-- _coverpage.md -->

<!-- 背景图片 -->
<div style="background-color: #f0f0f0; display: inline-block; padding: 10px; margin-top: 55px;">
    <img src="_media/人工智能.png" alt="人工智能" width="300" height="200">
</div>

# HT的研究生指南 

> 💪采用Docsify与Typora所设计的轻量化日常科研记录，研究方向：深度学习、图像处理、机器人、机器视觉、单片机、具身智能。

便携化办公、学习  
- ROS RVIZ GAZEBO RQT TF  
- STM32 YOLO TRANSFORM DEEPLEARNING IMAGEPROCESSING

<!-- [🍑GitHub](https://github.com/XiaoHuZi-design)  
[🍑求学之路 Let Go](/README.md) -->

<div style="display: inline-block;">
    <a href="https://github.com/XiaoHuZi-design">
        <button style="width: 75px; height: 25px; font-size: 12px;">🍑GitHub</button>
    </a>
    <a href="#/README.md">  
    <!-- 加个#号，不然跳转后是文档     -->
        <button style="width: 120px; height: 25px; font-size: 12px;">🍑求学之路 Let Go</button>
    </a>
</div>

---

## 机械仔 Libra

嗨！我是一个可爱的机械仔。我喜欢音乐、星星和所有美好的事物！

<!-- 横向居中排列的点赞、收藏、音乐图标 -->
<div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
    <button class="text-red-500 hover:text-red-600 transition duration-300" id="likeBtn">
        ❤️
    </button>
    <button class="text-yellow-500 hover:text-yellow-600 transition duration-300" id="collectBtn">
        ⭐
    </button>
    <button class="text-green-500 hover:text-green-600 transition duration-300" id="musicBtn">
        🎵
    </button>
</div>

<!-- 跳转按钮 -->
<div style="text-align: center; margin-top: 20px;">
    <button id="greetBtn" style="display: inline-block; background-color: #4CAF50; color: white; font-weight: bold; padding: 10px 20px; border-radius: 5px;">
        跟我打个招呼吧！
    </button>
</div>

<!-- 显示互动信息 -->
<div id="greetMessage" style="text-align: center; margin-top: 20px; font-size: 18px; color: #555;"></div>

<!-- 显示点赞计数 -->
<div id="likeCount" style="text-align: center; margin-top: 10px; font-size: 18px; color: #f44336;">
    点赞数: 0
</div>

<!-- JavaScript -->
<script>
    // 等待页面完全加载后执行代码
    window.onload = function() {
        // 初始化点赞数
        let likeCount = 0;

        // 打招呼按钮点击事件
        document.getElementById('greetBtn').addEventListener('click', function() {
            const greetMessage = document.getElementById('greetMessage');
            greetMessage.innerHTML = "嗨！很高兴你来打招呼啦！";
            greetMessage.style.color = '#4CAF50';
        });

        // 点赞按钮点击事件
        document.getElementById('likeBtn').addEventListener('click', function() {
            likeCount++; // 点赞数增加1
            document.getElementById('likeCount').innerText = `点赞数: ${likeCount}`; // 更新显示的点赞数
        });

        // 收藏按钮点击事件（可选，功能可扩展）
        document.getElementById('collectBtn').addEventListener('click', function() {
            alert('你收藏了这个内容！'); // 点击时弹出提示
        });

        // 音乐按钮点击事件（可选，功能可扩展）
        document.getElementById('musicBtn').addEventListener('click', function() {
            alert('你喜欢音乐！'); // 点击时弹出提示
        });
    }
</script>
