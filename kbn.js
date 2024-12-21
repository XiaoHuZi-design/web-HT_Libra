// kbn.js
(function() {
    'use strict';

    // 初始化设置
    const settings = {
        onlyWifi: false, /*是否仅在Wi-Fi环境下运行*/
        characterId: 6, /*人物ID*/
        clothesId: 19, /*衣服ID*/
        showCloseButton: true, /*是否显示关闭按钮*/
        size: '180x170', /*看板娘大小*/
        position: 'right:10px; bottom:10px;', /*停靠侧:到侧边距离*/
        tooltipSize: '160x50', /*提示框大小*/
        tooltipFontSize: '14px', /*提示框字体大小*/
        tooltipYOffset: '-13px', /*提示框Y轴偏移*/
        toolbarIconSize: '18px', /*工具栏图标大小*/
        toolbarLineHeight: '36px', /*工具栏行高*/
        hitokotoApi: null, /*一言API可选'fghrsh.net', 'hitokoto.cn', 'jinrishici.com'(古诗词)*/
    };

    // 检查网络环境并决定是否加载看板娘
    function shouldLoadKBN() {
        if (!settings.onlyWifi) return true;
        if (navigator.connection && navigator.connection.effectiveType !== 'wifi') {
            console.log('非Wi-Fi环境，不加载看板娘');
            return false;
        }
        return true;
    }

    // 加载看板娘库
    function loadKBNLibrary() {
        if (!shouldLoadKBN()) return;

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/IlysvlVEizbr/Live2D@1.9/kbn.js';
        script.defer = true;
        script.onload = () => initKBN();
        document.body.appendChild(script);
    }

    // 初始化看板娘
    function initKBN() {
        window.kbn_setting0 = settings.characterId;
        window.kbn_setting1 = settings.clothesId;
        window.kbn_setting2 = settings.showCloseButton;
        window.kbn_setting3 = settings.size;
        window.kbn_setting4 = settings.position;
        window.kbn_setting5 = settings.tooltipSize;
        window.kbn_setting6 = settings.tooltipFontSize;
        window.kbn_setting7 = settings.tooltipYOffset;
        window.kbn_setting8 = settings.toolbarIconSize;
        window.kbn_setting9 = settings.toolbarLineHeight;
        window.kbn_setting10 = settings.hitokotoApi;

        // 调用Live2D库提供的初始化函数
        window.initKBN = function() {
            try {
                if (typeof window.waifuRun === 'function') {
                    window.waifuRun(); // 如果有这个函数就调用它
                } else {
                    console.error('Live2D waifuRun function not found.');
                }
            } catch (e) {
                console.error('Failed to initialize KBN:', e);
            }
        };
        
        // 初始化看板娘
        window.initKBN();
    }

    // 在文档完全加载后执行
    document.addEventListener('DOMContentLoaded', loadKBNLibrary);

})();