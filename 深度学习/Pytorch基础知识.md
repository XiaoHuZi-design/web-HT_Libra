## Jupyter Notebook笔记
[（1）线性模型.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260107342-50206302-181d-492b-856a-5006f8d54c54.ipynb)[（2）梯度下降.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260107211-3a535e31-2098-40c6-a6f1-5e41dc4f2153.ipynb)[（3）反向传播.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260107224-9f43704f-8eda-493f-adff-4e4d0dc5326d.ipynb)[（4）用pytorch实现线性回归.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260117071-e1aec20b-fd47-4bc0-b004-7ad9cf099159.ipynb)[（5）用pytorch实现逻辑斯蒂回归.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260115054-f6ab4713-4ea6-4a8a-86aa-394c7b6bb703.ipynb)[（6）处理多维特征的输入.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260113728-a36ae4d2-c30f-4280-9dfd-ae59087afdf6.ipynb)[（7）加载数据集.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260107848-9590e515-74d9-4cdb-9730-5eb8ef8c8ce0.ipynb)[Markdown使用方法.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260109600-9cf1107b-cd05-4c66-ab44-288e690f17b5.ipynb)[npy和npz数据格式.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260108474-ecefcd32-2c23-47b4-8307-81c0f0008034.ipynb)[pytorch基础语法.ipynb](https://www.yuque.com/attachments/yuque/0/2024/ipynb/39216292/1725260112127-976884d7-8507-4e77-9e93-6e7f75fa4dd5.ipynb)

# 一、深度学习pytorch
## 1.1深度学习的概念和应用
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181450126-e4c781d8-be09-4bb9-913f-146bf3773fa0.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181388230-37319c8d-0ce5-43e3-855f-7d84600f61a7.png)

## 1.2使用工具及环境
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181524906-fbdf95df-107d-4645-9490-4e8db1b63dae.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181553288-af777b9d-e42f-484d-9e71-fdfd99befbf5.png)

## 1.3卷积神经网络介绍
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181634194-defaba22-df3a-479a-b028-5072a31d6bfa.png)

### 1.3.1计算机眼中的图像
**图像简介 **

① 在计算机眼中，Lena 这个人的图像被分成很多很多个小方格。 

② 每一个小格叫做一个像素点，计算机就是由这些像素点组成一张图像的。 

③ 每一个像素点有 RGB 三个通道，每个通道的值在 0-255 之间，0 表示黑的，255 表示非常亮。 

④ 图像长宽有多少个像素，RGB 矩阵就有多大。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181771797-a7efbe9d-b264-43f8-b723-9ccb655ccd20.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181792690-a6fc37b0-3d8c-4262-9d63-f626649c5433.png)

### 1.3.2卷积原理
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181822049-6f1e3447-0548-49e9-affd-34eebe80d5de.png)

![](https://cdn.nlark.com/yuque/0/2024/gif/39216292/1725181874392-4fc2fb6a-b0e2-49ca-9d2a-ca67b0fd7d07.gif)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181887436-3d3bff20-b438-4947-8c48-adb9e41c8856.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725181918804-74acc933-8d32-4df5-a500-7718429a0f9f.png)

### 1.3.3步幅、填充原理
① 步幅：卷积核经过输入特征图的采样间隔。设置步幅的目的：希望减小输入参数的数目，减少计算量。

② 填充：在输入特征图的每一边添加一定数目的行列。设置填充的目的：希望每个输入方块都能作为卷积窗口的中心，或使得输出的特征图的长、宽 = 输入的特征图的长、宽。

③ 一个尺寸 a * a 的特征图，经过 b * b 的卷积层，步幅（stride）= c，填充（padding）= d，若d等于0，也就是不填充，输出的特征图的尺寸 =（a-b）/ c+1；若d不等于0，也就是填充，输出的特征图的尺寸 =（a+2d-b）/ c+1。



例子1：一个特征图尺寸为4 * 4的输入，使用3 * 3的卷积核，步幅=1，填充=0，输出的尺寸=(4 - 3)/1 + 1 = 2。

![](https://cdn.nlark.com/yuque/0/2024/gif/39216292/1725182027651-c1f83ac9-e910-460c-95be-43192a451492.gif)

例子2： 一个特征图尺寸为5 * 5的输入，使用3 * 3的卷积核，步幅=1，填充=1，输出的尺寸=(5 + 2 * 1 - 3)/1 + 1 = 5。

![](https://cdn.nlark.com/yuque/0/2024/gif/39216292/1725182049457-767a4660-24ac-445e-b7c0-63c0d097a89f.gif)

例子3：一个特征图尺寸为5 * 5的输入， 使用3 * 3的卷积核，步幅=2，填充=0，输出的尺寸=(5-3)/2 + 1 = 2。

![](https://cdn.nlark.com/yuque/0/2024/gif/39216292/1725182065394-a59f2fb5-c752-436f-8e85-fd5f729ff4b1.gif)

### 1.3.4卷积神经网络
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182116426-b175b9ac-2965-4ecb-aba2-b1d9229e12c4.png)

一般的卷积神经网络由以下几个层组成：卷积层，池化层，全连接层，Softmax层。这四者构成了常见的卷积神经网络。

1．卷积层。 卷积层是一个卷积神经网络最重要的部分，也是卷积神经网络得名的缘由。卷积层中每一个节点的输入是上一层神经网络的一小块，卷积层试图将神经网络中的每一个小块进行更加深入地分析从而得到抽象程度更高的特征。

2．池化层。池化层的神经网络不会改变三维矩阵的深度，但是它将缩小矩阵的大小。池化层操作将分辨率较高的图片转化为分辨率较低的图片。

3．全连接层。 经过多轮的卷积层和池化层处理后，卷积神经网络一般会接1到2层全连接层来给出最后的分类结果。

4．Softmax层。Softmax层主要用于分类问题。

### 1.3.5卷积层
在PyTorch中, 类nn.Conv2d()是卷积核模块。卷积核及其调用例子如下：

```python
nn.Conv2d(in_channels, out_channels, kernel_size, stride=1, padding=0,dilation=1,groups=1, bias=True）
```

nn.Conv2d中参数含义：in_channels表示输入数据体的深度；out_channels表示输出数据体的深度；kernel_size 表示卷积核的大小；stride表示滑动的步长；padding表示边界0填充的个数；

dilation表示输入数据体的空间间隔；groups 表示输入数据体和输出数据体在深度上的关联；bias 表示偏置。

卷积的作用：可以减少模型的参数数量和连接数量，降低模型的复杂度，提高模型的泛化能力，并且有利于提取局部特征。

① Conv1d代表一维卷积，Conv2d代表二维卷积，Conv3d代表三维卷积。

② kernel_size在训练过程中不断调整，定义为3就是3 * 3的卷积核，实际我们在训练神经网络过程中其实就是对kernel_size不断调整。

③ 可以根据输入的参数获得输出的情况，如下图所示。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182303703-8ea8b8ec-2563-42c2-9c1d-c61cafaf9953.png)

### 1.3.6池化层
卷积网络也经常使用池化层来缩减模型的大小，提高计算速度，同时提高所提取特征的鲁棒性。

在PyTorch中，池化层是包括在类nn.MaxPool2d和nn.AvgPoo2d。下面介绍一下nn.MaxPool2d及其调用例子。其调用如下：

```python
nn.MaxPool2d(kernel_size, stride=None, padding=0, dilation=1, return_indices=False,ceil_mode=False)
```

采用较多的一种池化过程叫做最大池化（Max Pooling）。将输入拆分成不同的区域，输出的每个元素都是对应区域中元素的最大值，如下图所示：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182416886-a4213c1c-20f7-4022-b07c-d35636cbf2cb.png)

池化过程类似于卷积过程，上图所示的池化过程中相当于使用了一个大小的滤波器，且池化步长 。卷积过程中的几个计算大小的公式也都适用于池化过程。如果有多个通道，那么就对每个通道分别执行计算过程。

另一种池化过程是平均池化（Average Pooling），就是从取某个区域的最大值改为求这个区域的平均值：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182451989-39178029-157c-4ed4-96cf-9dd1e9aa5ab8.png)

### 1.3.7经典卷积神经网络
经典的卷积神经网络：LeNet 、AlexNet 、VGGNet、GoogleNet和ResNet等。

#### （1） LeNet
LeNet具体指的是LeNet-5。LeNet-5模型是Yann LeCun教授于1998年在论文Gradient-based learning applied to document recognition中提出的，它是第一个成功应用于数字识别问题的卷积神经网络。在MNIST数据集上，LeNet-5模型可以达到大约99.2%的正确率。LeNet-5模型总共有7层，包括有2个卷积层，2个池化层，2个全连接层和一个输出层。它的网络结构如下：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182557683-cbbbd513-c5a3-4d50-9ed5-0cc7fdb90b59.png)

#### （2）AlexNet
2012年， Hilton的学生Alex Krizhevsky提出了卷积神经网络模型AlexNet。AlexNet在卷积神经网络上成功地应用了Relu，Dropout和LRN等技巧。在ImageNet竞赛上，AlexNet以领先第二名10%的准确率而夺得冠军。成功地展示了深度学习的威力。它的网络结构如下：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182590355-3121ed23-21a0-4b20-9801-8f5c1873e421.png)

#### （3）VGGNet
VGGNet是牛津大学计算机视觉组和Google DeepMind公司的研究人员一起研发的一种卷积神经网络。通过堆叠3×3 的小型卷积核和2×2的最大池化层，VGGNet成功地构筑了最深达19层的卷积神经网络。VGGNet取得了2014年Image NET 比赛的第二名，由于VGGNet的拓展性强，迁移到其他图片数据上的泛化性比较好，可用作迁移学习。表1显示了VGGNet各级别的网络结构图。虽然从A到E每一级网络逐渐变深，但是网络的参数量并没有增长很多，因为参数量主要都消耗在最后3个全连接层。前面的卷积层参数很深，参数量并不是很多，但是在训练时计算量大，比较耗时。D和E模型就是VGGNet-16和VGGNet-19。网络结构如下图：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182627301-7894b20d-682c-418d-8a2f-1b8b3d943f52.png)

#### （4）ResNet
ResNet（残差网络）是一种深度卷积神经网络，由何恺明等人在2015年提出。该网络通过引入残差模块，有效地解决了深度神经网络训练过程中的梯度消失和退化问题，使得网络可以非常深（突破1000层），同时保持了良好的性能和收敛速度。ResNet在当年的ImageNet竞赛中获得了分类任务、目标检测和图像分割的第一名，展现了其强大的能力。在网络结构上，ResNet参考了VGG19网络，并在其基础上进行了改进，通过短路机制加入了残差单元。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182675297-cf933a26-ca38-4208-b7b0-d7ba89197e34.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182692735-27b393e1-5c73-42d4-bb2f-43181bdadc75.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725182711628-c57f32d5-8f08-4f45-8bd4-a19c5870e450.png)

## 1.4 pytorch模型训练常规套路
详情可看我在CSDN写的笔记：

[https://blog.csdn.net/weixin_47006778/article/details/132846420?spm=1001.2014.3001.5502](https://blog.csdn.net/weixin_47006778/article/details/132846420?spm=1001.2014.3001.5502)

[https://blog.csdn.net/weixin_47006778/article/details/133555801?spm=1001.2014.3001.5502](https://blog.csdn.net/weixin_47006778/article/details/133555801?spm=1001.2014.3001.5502)

### （1）导入模块
```python
import time

import torch.optim
import torchvision
from torch import nn
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter

from model import Tudui  #预先定义好的模型Tudui

```

### （2）准备数据集
在 PyTorch 中加载官方数据集非常简单，可以使用 torchvision 库中的 datasets 模块。该模块提供了许多常用数据集的加载方法，例如 MNIST、CIFAR10、ImageNet 等。

```python
# 准备数据集  可以先下载好放在对应文件目录下
train_data = torchvision.datasets.CIFAR10(root="./CF_dataset",train=True,transform=torchvision.transforms.ToTensor(),
                                          download=True)
test_data = torchvision.datasets.CIFAR10(root="./CF_dataset",train=False,transform=torchvision.transforms.ToTensor(),
                                         download=True)

# length 长度
train_data_size = len(train_data)
test_data_size = len(test_data)
# 如果train_data_size = 10，训练数据集的长度为：10
print("训练数据集的长度为：{}".format(train_data_size))
print("测试数据集的长度为：{}".format((test_data_size)))

# 利用 DataLoader来加载数据集
train_dataloader = DataLoader(train_data,batch_size=64)
test_dataloader = DataLoader(test_data,batch_size=64)

```

### （3）搭建神经网络
```python
#搭建神经网络
class Tudui(nn.Module):
    def __init__(self):
        super(Tudui,self).__init__()
        # 输出大小N = (输入大小W - 卷积核大小F + 2倍填充值大小P)/步长大小S + 1
        # 池化层的输出尺寸计算公式与卷积层相同，但因为池化操作不会改变通道数，所以输出尺寸的通道数与输入尺寸相同。
        # pytorch中tensor（也就是输入输出层）的通道排序为：[batch, channel, height, width]
        self.model1 = Sequential(
            nn.Conv2d(3, 32, 5, stride=1, padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 32, 5, stride=1, padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 5, stride=1, padding=2),
            nn.MaxPool2d(2),
            nn.Flatten(),    # 展平 64 X 4 X 4 = 1024
            nn.Linear(1024, 64),
            nn.Linear(64, 10)
        )

    def forward(self,x):
        x = self.model1(x)          #使用Squential()简洁很多
        return x

```

### （4）训练和测试
```python
for i in range(epoch):
    print("------第{}轮训练开始------".format(i+1))

    # 训练步骤开始
    tudui.train()  #不用也可以
    for data in train_dataloader:
        imgs,targets = data
        outputs = tudui(imgs)
        loss = loss_fn(outputs,targets)

        # 优化器优化模型
        optimizer.zero_grad()    #优化器梯度清零
        loss.backward()
        optimizer.step()

        total_train_step = total_train_step + 1
        if total_train_step % 100 == 0:  # 使输出更好看  逢百记录
            end_time = time.time()  # 每一次结束时间
            print(end_time - start_time)
            print("训练次数:{}，Loss:{}".format(total_train_step,loss.item()))     # item()将tensor数据类型转换成数字
            writer.add_scalar("train_loss",loss.item(),total_train_step)         # *

```

```python
# 测试步骤开始
tudui.eval()   #不用也可以
total_accuracy = 0
total_test_loss = 0
with torch.no_grad():
    for data in test_dataloader:
        imgs,targets = data
        outputs = tudui(imgs)
        loss = loss_fn(outputs,targets)
        total_test_loss = total_test_loss + loss.item()      # *
        accuracy = (outputs.argmax(1) == targets).sum()   #argmax(), 1 取矩阵横向最大值 ， 0 取矩阵纵向最大值
        toatl_accuracy = total_accuracy + accuracy

    print("整体测试集上的Loss:{}".format(total_test_step))
print("整体测试集上的正确率:{}".format(toatl_accuracy / test_data_size))
writer.add_scalar("test_loss",total_test_loss,total_test_step)   # *
writer.add_scalar("test_accuracy",total_accuracy/test_data_size,total_test_step)
total_test_step = total_test_step + 1   # *

```

### （5）保存模型
```python
# 保存模型
torch.save(tudui,"tudui_{}.pth".format(i))     #后缀可以改，通常pth
#官方 torch.save(tudui.state_dict(),"dudui_{}.pth".format(i))
print("模型已保存")

```

### （6）定义设备（cpu或gpu)
```python
# 定义训练的设备
#device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
device = torch.device("cuda")        # cuda或者cpu

```



可以利用Tensorboard显示结果：首先在终端Terminal输入命令 tensorboard --logdir=你设置的logs日志路径，然后点击网址在打开Tensorboard网页查看：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725183244557-fd3bc220-bbb8-4bd0-8c1a-a5d7569d9911.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725183256758-abc8d6da-95a3-4a66-966a-7ea618e98a14.png)



## 1.5 深度学习案例
网上找了些案例在学习中... ...

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725183321725-f6cdaccb-e654-4eda-ae0b-e0ed918f12dd.png)



# 二、参考资料
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725183423906-b9063e67-1bc0-4f1b-92cb-2eec71b9490b.png)



B站up（跟李沐学AI)：GitHub项目地址：[https://github.com/d2l-ai/d2l-zh](https://github.com/d2l-ai/d2l-zh)

在线课程：[https://courses.d2l.ai/zh-v2/](https://courses.d2l.ai/zh-v2/)

在线教材《动手深度学习》：[https://zh-v2.d2l.ai/](https://zh-v2.d2l.ai/)

中文版课件：[https://github.com/d2l-ai/berkeley-stat-157/tree/master/slides-zh](https://github.com/d2l-ai/berkeley-stat-157/tree/master/slides-zh)

小王同学笔记：[https://github.com/AccumulateMore/CV](https://github.com/AccumulateMore/CV)   	  [https://github.com/AccumulateMore/OpenCV/tree/main](https://github.com/AccumulateMore/OpenCV/tree/main) 	 

[https://github.com/AccumulateMore/NLP](https://github.com/AccumulateMore/NLP)

其他pytorch学习教程：学习资源汇总：[https://github.com/INTERMT/Awesome-PyTorch-Chinese](https://github.com/INTERMT/Awesome-PyTorch-Chinese)

案例：[https://github.com/pytorch/examples](https://github.com/pytorch/examples)

资源整合清单：[https://github.com/bharathgs/Awesome-pytorch-list](https://github.com/bharathgs/Awesome-pytorch-list)   		    [https://github.com/ritchieng/the-incredible-pytorchB](https://github.com/ritchieng/the-incredible-pytorchB)

站up(霹雳吧啦Wz)代码: [https://github.com/WZMIAOMIAO/deep-learning-for-image-processingPytorch](https://github.com/WZMIAOMIAO/deep-learning-for-image-processingPytorch) Forums论坛: [https://discuss.pytorch.org/Pytorch](https://discuss.pytorch.org/Pytorch)

官方文档：[https://pytorch.org/vision/stable/index.html](https://pytorch.org/vision/stable/index.html)

网易云听课笔记：[https://github.com/AlbertHG/Coursera-Deep-Learning-deeplearning.ai/tree/master](https://github.com/AlbertHG/Coursera-Deep-Learning-deeplearning.ai/tree/master)

半小时学会神经网络：[https://www.cnblogs.com/wmr95/articles/7814892.html](https://www.cnblogs.com/wmr95/articles/7814892.html)

计算机视觉的四大基本任务：[https://www.cnblogs.com/jiading/articles/12911724.html](https://www.cnblogs.com/jiading/articles/12911724.html)

