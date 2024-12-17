(function () {
    // 插件函数
    const readingCountPlugin = function (hook) {
        hook.afterEach(function (html, next) {
            // 获取当前文档的标题
            const title = document.title;

            // 从 localStorage 获取阅读次数
            let count = localStorage.getItem(title) || 0;

            // 增加阅读次数
            count++;
            localStorage.setItem(title, count);

            // 显示阅读次数在右下角
            const readingCountHtml = `<div style="position: fixed; bottom: 20px; right: 20px; background-color: rgba(255, 255, 255, 0.8); 
                                          border: 1px solid #ccc; border-radius: 5px; padding: 10px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);">
                                          <strong style="font-size:12px;">阅读量: ${count}</strong>
                                       </div>`;

            // 将阅读次数插入到页面中
            next(html + readingCountHtml);
        });
    };

    // 将插件添加到 Docsify
    window.$docsify.plugins = [readingCountPlugin].concat(window.$docsify.plugins || []);
})();
