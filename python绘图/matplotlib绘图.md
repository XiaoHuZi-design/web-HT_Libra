可以参考以下网站：

[https://matplotlib.org/](https://matplotlib.org/https://matplotlib.org/2.0.2/gallery.html)

[https://matplotlib.org/2.0.2/gallery.html](https://matplotlib.org/2.0.2/gallery.html)



# 一、曲线绘制
## （1）设置图例
在 matplotlib 中，可通过legend函数设置图例，调用方式如下：

```python
legend()                       #以默认形式设置图例
legend(labels)               #标记已有的绘图
legend(handles, labels)  #明确定义图例中的元素

```

## （2）设置坐标轴及标题
在使用 matplotlib 模块画坐标图时，往往需要对坐标轴设置很多参数，这些参数包括横纵坐标轴范围、坐标轴刻度大小、坐标轴名称等等，在 matplotlib 中包含了很多函数，用来对这些参数进行设置。

```python
plt.xlim、plt.ylim用于设置横纵坐标轴范围；

plt.xlabel、plt.ylabel用于设置坐标轴名称；

plt.xticks、plt.yticks用于设置坐标轴刻度；

plt.title用于设置图像标题。

上面的plt表示 matplotlib.pyplot 模块，
即在程序中以import matplotlib.pyplot as plt方式导入 matplotlib.pyplot 模块。

```

## （3）绘制多条曲线
绘制多条曲线有两种情况：第一种是在同一坐标系上绘制多条曲线，能够清楚地看到多条曲线的对比情况。可通过直接叠加使用plot进行绘制。

示例如下：

```python
import matplotlib.pyplot as plt
from math import sin, cos, radians

x = range(0, 360)
y1 = [sin(radians(e)) for e in x]
y2 = [cos(radians(e)) for e in x]

plt.plot(x, y1, 'b-')
plt.plot(x, y2, 'r--')
plt.legend(['sin(x)', 'cos(x)'], loc='upper center')
plt.xlabel('x')         #设置 x 轴文字标记
plt.ylabel('sin/cos')   #设置 y 轴文字标记
plt.axis([0, 360, -1.0, 1.0])  #设置坐标范围
plt.show()

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725184429268-4c68feea-adc2-4a86-9120-aa8f5bb5ab22.png)

第二种是在不同子图上画图，多用于呈现不同内容的曲线。需要用到subplot函数，它主要用于创建子图。

示例如下：

```python
import numpy as np
import matplotlib.pyplot as plt

x1 = np.linspace(0.0, 5.0)
x2 = np.linspace(0.0, 2.0)
y1 = np.cos(2 * np.pi * x1) * np.exp(-x1)
y2 = np.cos(2 * np.pi * x2)

plt.subplot(2, 1, 1) # 开始绘制子图 1
plt.plot(x1, y1, 'o-')
plt.title('A tale of 2 subplots')
plt.ylabel('Damped oscillation') 
plt.subplot(2, 1, 2) # 开始绘制子图 2
plt.plot(x2, y2, '.-')
plt.xlabel('time (s)')
plt.ylabel('Undamped')
plt.show() 

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725184479749-d5b1322c-5467-491e-9ad8-0ba405ea65fa.png)



请你在同一坐标系中绘制两条函数曲线，具体公式如下：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725184515331-b0f82ac1-09b1-42a2-9376-05d78c048763.png)  ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725184522482-a6f10c0f-ad81-49fb-a26a-21b5fc1fd6f8.png)

```python
#请在同一坐标系中绘制两条曲线
import matplotlib
import matplotlib.pyplot as plt
import numpy as np

def f(x):
    a = np.e
    result1 = x*x*a**(-1*x*x)
    return result1

def g(x):
    a = np.e
    result2 = x**4*a**(-1*x*x)
    return result2

x = np.linspace(0,3,50)
y1 = f(x)
plt.plot(x,y1,'r--')
y2 = g(x)
plt.plot(x,y2,'bo-')

plt.xlabel('t')    #设置x轴文字标记
plt.ylabel("y")    #设置y轴文字标记
plt.title('Plotting two curves in the same plot')   #设置图像标题
plt.legend(['y1','y2'])    #设置图例

plt.show()
plt.savefig('fig1.png')

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725184553715-aabeff1b-decc-47af-a024-2834bd6c1fac.png)



# 二、统计图绘制
## （1）绘制并列柱状图
bar函数调用方式如下所示:

```python
matplotlib.pyplot.bar(x, height, width=0.8, bottom=None, *, align='center', data=None, **kwargs)
```

要想绘制堆积（并列）柱状图，可通过设置第一个参数x的值来使得柱形错位显示，x的每一个元素表示柱形的中间位置，示例代码如下所示：

```python
import numpy as np
import matplotlib.pyplot as plt
# A班计算机程序设计课5个小组的平均成绩柱状图
A_means_score = np.array([90, 85, 77, 82, 79])
# B班计算机程序设计课5个小组的平均成绩柱状图
B_means_score = np.array([67, 82, 87, 92, 95])
index = np.arange(5)
bar_width = 0.35
plt.bar(index, A_means_score, bar_width, # A班x轴数据起始位置为index序列
        alpha=0.4, color='b')
plt.bar(index+bar_width, B_means_score, bar_width, #B班x轴起始位置与A班数据错开
        alpha=0.4, color='r')
x_labels = ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5']
plt.xticks(index+bar_width/2, x_labels) # index+bar_width/2 使得标签居中显示
plt.show()

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725183903823-52b06fdb-6ced-4949-a044-3048b4f6c3f4.png)

## （2）绘制饼图
matplotlib 模块使用pie函数绘制饼图，其调用方式如下：

```python
matplotlib.pyplot.pie(x, explode=None, labels=None, colors=None, autopct=None, pctdistance=0.6, shadow=False, labeldistance=1.1, startangle=None, radius=None, counterclock=True, wedgeprops=None, textprops=None, center=(0, 0), frame=False, rotatelabels=False, *, data=None)
```

饼图是逆时针绘制的，参数x表示绘制的序列数据，explode用于突出某个楔形（切片），具体值为偏移圆中心的占比，labels是一个字符串序列，用于给每个楔形打标签，colors用于指定楔形的颜色，autopct参数表示用数值标记楔形，可指定显示方式且标记在内部。

代码示例如下：

```python
import matplotlib.pyplot as plt

labels = ['Frogs', 'Hogs', 'Dogs', 'Logs'] # 标签列表
sizes = [15, 30, 45, 10] # 绘制数据
explode = (0, 0.1, 0, 0)  # 只突出第二个切块，偏移比例为0.1 (i.e. 'Hogs')

plt.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
        shadow=True, startangle=90) # shadow表示添加阴影，startangle表示旋转角度
plt.axis('equal')  # 用于显示为一个长宽相等的饼图
plt.show() #展示图像

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725184015835-87052b0c-682b-4fa7-908a-c2cbaad6d6fc.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725184603262-65aa86a9-f2eb-4b91-a887-6c9c5c929289.png)



# 三、案例代码
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725189842860-fd02b7d4-4035-47f5-bf57-7292169e29e4.png)

[01绘制sin函数.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189920781-a4c12ca5-e754-48d0-9eb1-0dc5586469c1.py)[02-1绘制抛物线函数.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189920860-354e41e0-0022-484f-80bc-1eb81db33180.py)[02-2抛物线函数向量化.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189920889-0116c2d1-a3cf-4941-8a8f-f33771915686.py)[03函数曲线绘制与坐标处理.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189920863-a4a1d115-bb31-4c5b-8fe3-1ed307c769ce.py)[04-1绘制多条曲线.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189920879-444570d4-dc94-4166-b070-6689be683c6d.py)[04-2绘制多条曲线.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921139-25bdab92-9873-4c4d-a060-e858f40c76ae.py)[04-3绘制多条曲线练习.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921223-cea73ae7-9599-4a4d-a894-65c737f024e0.py)[05绘制阶跃函数曲线.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921229-12126d57-aa95-4162-88c4-78fb957d75f6.py)[06向量化处理_绘制函数图像.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921221-40aca696-d767-4267-ab58-f095e36ca091.py)[07-1柱状图.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921235-691c8c77-8d8a-4518-8f81-7a4140e03673.py)[07-2柱状图 - 商品房销售价格统计图.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921482-aa62e1d0-15d6-44e0-a97a-34bf28662e18.py)[08-1并列柱状图.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921588-c220f72f-e12f-4a7d-a044-133ef9454a57.py)[08-2并列柱状图 - 商品房销售价格统计图.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921592-e8ec4f89-7f9d-4256-b9c5-1493812c2eaa.py)[09-1饼状图.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921588-ef386896-a56b-4f04-9a47-8c30ca28af02.py)[09-2饼状图 - 2010 全国人口普查数据分析.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921610-defc5b1f-7f38-4540-ab75-ef5b02660b5a.py)[10-1多子图.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921832-efa7e4d4-5c0b-4883-8d9f-5f05583604c7.py)[10-2多子图绘制 - 2010 全国人口普查数据分析.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921933-ead4fea8-a1a0-4dcb-b3ff-26a726d9ae5e.py)[11-1地图模拟.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921976-f63fe68f-6971-4b5b-b028-e09e208cac91.py)[11-2地图模拟官方案例.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921981-6a521d48-1e03-419a-ac96-fe7f9229dfd2.py)[11-3数据获取与绘图 - 地图模拟.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189921977-555db4b5-195b-444a-8211-7e3e8f7961e5.py)[excel数据处理.py](https://www.yuque.com/attachments/yuque/0/2024/py/39216292/1725189922224-66e8b024-5da2-4a90-8e16-f7b1d29a2c4d.py)[fig.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189922299-32813f7d-fff9-4691-8575-8f55f1e75464.png)[fig1.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189922361-3d2a16e3-33d5-4b32-8d94-5ced4d8f553c.png)[fig2.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189922372-b0e1f939-814a-4a30-8f7d-a1e37b28982f.png)[map.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189922463-44374fde-250b-43a8-99cb-69e6477ef2f0.png)[pwx.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189922612-b4f6ad3d-d63a-4c9c-a84b-06fd4e1f3b12.png)[sin.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189922881-cd15e051-b3c3-4634-92dc-2f380c9511e3.png)[饼状图.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189923048-0a961a91-4ae2-44c5-967d-46cdf5167223.png)[并列柱状图.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189923231-e21af862-a7a7-41bb-9e9a-258e47efefbc.png)[多子图.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189923289-5edf14b1-0f69-4b38-9f58-a72bf74987ea.png)[抛物线.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189923151-1b964e51-97c7-4aea-b5f6-1f1b064c475d.png)[柱状图.png](https://www.yuque.com/attachments/yuque/0/2024/png/39216292/1725189923319-65003cb4-a1a9-4521-8413-152734bb24ab.png)

