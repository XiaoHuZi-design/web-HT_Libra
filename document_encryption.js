(function () {
    //依赖https://github.com/brix/crypto-js
    if (!window.$docsify) {
        return;
    }

    function parsePwd(content) {
        const urlParams = new URLSearchParams(window.location.search);
        const pwdParam = urlParams.get('pwd');

        // 改进正则表达式以提高效率
        return content.replace(/<pwd\s+(.*?)>([\s\S]*?)<\/pwd>/g, function (match, attributes, pwdContent) {
            const attributesMap = {};
            attributes.replace(/(\w+)=['"](.*?)['"]/g, (match, key, value) => {
                attributesMap[key] = value;
            });

            const { value: password = '', pwd = '', url: urlContent = '' } = attributesMap;
            
            if (pwdParam === password) {
                return pwdContent; // 如果 URL 参数匹配，则显示 <pwd> 标签内容
            } 
            
            if (pwdParam) {
                alert("密码错误,请重新输入");
            }
            
            return `<p style="text-align: center;"><img src="${urlContent}" data-origin="_media/get_password.jpg" alt="无法加载图片..." width="250" height="250"/></p>
                    <p style="text-align: center;"><strong>扫码添加微信获取密码${pwd}</strong></p>
                    <p style="text-align: center;"><input id ="pwd" /> <button onclick="addParamAndRefresh()">确定</button></p>`;
        });
    }

    // Parse <pwd> tags in the page content
    function parseContent(content) {
        return parsePwd(content);
    }

    const afterEachHook = function (hook, vm) {
        hook.beforeEach((html, next) => {
            next(parseContent(html));
        });
    }

    window.$docsify.plugins = [afterEachHook, ...(window.$docsify.plugins || [])];
})();

// 点击按钮时执行的函数
function addParamAndRefresh() {
    const inputElement = document.getElementById('pwd');
    const inputValue = inputElement.value.trim();

    if (!inputValue) {
        alert("输入不能为空，请输入密码");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('pwd', inputValue);

    // 更新当前页面URL
    const newURL = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
    window.location.href = newURL;
}
