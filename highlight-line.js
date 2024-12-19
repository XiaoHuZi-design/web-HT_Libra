
(function () {
    window.$docsify.plugins.push(function (hook) {
        hook.afterEach(function (html) {
            // 使用 DOMParser 创建一个 DOM 文档
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');

            // 查找所有的代码块
            var codeBlocks = doc.querySelectorAll('pre');

            codeBlocks.forEach(function (block) {
                // 获取代码行
                var code = block.querySelector('code');
                if (!code) return; // 确保存在代码块

                var lines = code.innerHTML.split('\n');
                var lineCount = lines.length;

                // 创建行号的HTML
                var lineNumbers = '<div class="line-numbers">';
                for (let i = 1; i <= lineCount + 1; i++) {
                    lineNumbers += '<span class="line-number">' + i + '</span>';
                }
                lineNumbers += '</div>';

                // 使用原始的 code HTML，确保 Prims.js 的类保留
                var combinedHTML = `<div class="code-container">${lineNumbers}<pre>${code.outerHTML}</pre></div>`;
                block.innerHTML = combinedHTML; // 替换原代码块内容
            });

            // 返回处理后的 HTML
            return doc.body.innerHTML;
        });
    });
})();