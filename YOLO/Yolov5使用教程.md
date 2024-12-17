## 1.使用工具
编程软件： Pycharm

标注软件： Labelme或者Labeling

环境配置：适合yolov5-7.0的Conda虚拟环境，使用的GPU版pytorch

推荐用yolov5-7.0版本，报错少些，本来用的5.0版本，折腾死了。

官方代码：[https://github.com/ultralytics/yolov5](https://github.com/ultralytics/yolov5)

## 2.目的
使用Yolov5训练自己的目标检测模型，实现蚂蚁、蜜蜂、猫、狗、帽子、人的图片检测以及实时视频检测。

## 3.数据集
整个数据集一共639张图片，使用lableimg进行手动标注，标注文件为xml格式，使用python脚本将其转化为yolov中可使用的txt格式。

ant：81张 ， train：76张，val：5张

bee：80张，train：76张，val：5张

cat：125张，train：116张，val：10张

dog：125张，train：116张，val：10张

hat：125张，train：112张，val：10张

person：100张，train：90张，val：10张

**总共639张图片，训练集589张，验证集50张。**

## 4.实现过程及结果
**将数据集按如下目录放置：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273308122-b4d8ef95-6c6d-48b4-bbd9-300c15b28327.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273318991-1045471a-30c9-43c1-801a-b8dd4208f849.png)

**配置data/VOC.yaml文件和models/yolov5s.yaml文件：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273345077-8f65bba6-8901-47a0-8cd5-a643f698aa1c.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273356678-77b7e8ce-304b-42b9-9f03-92bad56a63e8.png)



**修改train.py以下参数：**![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273388016-43f0ccb4-acc7-42f2-baae-67920fbcc4d8.png)



**开始训练100轮：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273428242-628be8f6-7404-457c-bc44-bc8f8bbcefcb.png)

**训练好的模型会被保存在 yolov5 目录下的 runs/train/weights/ 下：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273469693-7f48df51-6b1a-4628-bcf8-a8a2d4a818e2.png)

**开始检测：**

修改detect.py以下参数

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273535214-941b80e9-28b6-4fb2-b19a-dd87edfe0700.png)

可以直接在终端命令运行检测： 

```bash
python detect.py --weights runs/train/exp/weights/best.pt --source 待检测文件路径
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273667556-299538fc-bf63-4d94-9409-f5b8e1ba6960.png)



**将要检测的图片的路径改为0，切换摄像头模式实时监测，效果如下：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273695062-78f72000-372e-4551-bd21-4fb5b0ae1101.png)  ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725273703292-2de6fa62-8b29-4fcd-8c8c-d6e9b7e3e55c.png)

## 5.注意事项
如果训练过程中出现memory错误虚拟内存不足，修改yolov5代码，修改文件在 yolov5\utils\dataloader.py，修改第147行参数 num_workers为0，就不会虚拟内存不够了。如果还不行，减小 --batch-size 和降低 --epoch试一试。

