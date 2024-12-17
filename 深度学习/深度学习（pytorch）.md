[The latest in Machine Learning | Papers With Code](https://paperswithcode.com/)

[txyz.ai - Integrate all paths to knowledge](https://app.txyz.ai/)

## 各种安装命令：
```plain
pip install -i https://pypi.tuna.tsinghua.


清华大学 (推荐)	https://pypi.tuna.tsinghua.edu.cn/simple/
阿里云	https://mirrors.aliyun.com/pypi/simple/
中国科学技术大学	http://pypi.mirrors.ustc.edu.cn/simple/
豆瓣	https://pypi.douban.com/simple/
山东理工大学	http://pypi.sdutlinux.org/
华中理工大学	http://pypi.hustunique.com/


安装命令为（以下命令在 Prompt 的虚拟环境 DL 中执行）：
pip install D:\whl\torch-1.12.0+cu113-cp39-cp39-win_amd64.whl
pip install D:\whl\torchvision-0.13.0+cu113-cp39-cp39-win_amd64.whl       # 注意 可能需要先安装numpy和pillow
pip install D:\whl\torchaudio-0.12.0+cu113-cp39-cp39-win_amd64.whl
这三行代码的结构都是：pip install 路径\轮子名.whl 。



pip install d2l==0.17.6 太慢

pip install d2l==0.17.6 -i https://pypi.tuna.tsinghua.edu.cn/simple/ 可以很快

这个是0.15.1版本
pip install D:\whl\d2l-0.15.1-py3-none-any.whl


虚拟环境连接 Jupyter 内核
# 列出 Jupyter 的内核列表
jupyter kernelspec list
# 安装 ipykernel   每个环境要单独安装
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple ipykernel
# 将虚拟环境导入 Jupyter 的 kernel 中
python -m ipykernel install --user --name=环境名
# 删除虚拟环境的 kernel 内核
jupyter kernelspec remove 环境名
```



**数据集：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726824789367-5abb4e5c-1789-46ef-91b2-60a90f5711f2.png)

