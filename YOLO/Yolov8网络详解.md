## 前言
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726741438287-3f27b53f-d102-45f8-93a6-c9b2cc79424f.png)

n代表Nano，s代表small，m代表medium，l代表large，x代表xlarge

随着字母的递增，参数量也是在不断递增的

左图，v8相对于其他框架，其精度在同样的参数量上基本都是领先于其他框架的

右图，主要呈现速度，可以看出同样的精度范围内，yolov8的速度更快

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726741479694-dc9d333f-1085-43c9-b786-de082cc9cfc4.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726741052837-6d222923-f234-4b8c-985b-b845e0e59b7a.png)



Yolov8网络结构图  [https://github.com/open-mmlab/mmyolo/blob/dev/configs/yolov8/README.md](about:blank)  
![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1726712892397-9715a0c6-0768-4015-99f6-99df66188ece.jpeg)

## 网络结构
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726712902156-236a2c65-3682-4c90-82b2-47eae6b910ba.png)

Backbone主干网络部分主要进行特征提取，可以提取三个不同尺度的特征出来，其中有80x80，40x40，20x20这些网格大小的多尺度特征，然后送入到Neck的部分，Neck部分主要是做一些特征融合，融合之后的特征会送入到头部来做进一步的解码，解码的任务分为两部分，一个是bonding_box（边界框的解码），一个是class_loss（分类的解码）。

解耦头的设计：可以看到边界框 回归和分类分为了两个分支，而不是原先一股脑的放在一块。

```yaml
# Ultralytics YOLO 🚀, AGPL-3.0 license
# YOLOv8 object detection model with P3-P5 outputs. For Usage examples see https://docs.ultralytics.com/tasks/detect

# Parameters
nc: 80 # number of classes
scales: # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'
  # [depth, width, max_channels]
  n: [0.33, 0.25, 1024] # YOLOv8n summary: 225 layers,  3157200 parameters,  3157184 gradients,   8.9 GFLOPs
  s: [0.33, 0.50, 1024] # YOLOv8s summary: 225 layers, 11166560 parameters, 11166544 gradients,  28.8 GFLOPs
  m: [0.67, 0.75, 768] # YOLOv8m summary: 295 layers, 25902640 parameters, 25902624 gradients,  79.3 GFLOPs
  l: [1.00, 1.00, 512] # YOLOv8l summary: 365 layers, 43691520 parameters, 43691504 gradients, 165.7 GFLOPs
  x: [1.00, 1.25, 512] # YOLOv8x summary: 365 layers, 68229648 parameters, 68229632 gradients, 258.5 GFLOPs

# YOLOv8.0n backbone
backbone:
  # [from, repeats, module, args]
  - [-1, 1, Conv, [64, 3, 2]] # 0-P1/2
  - [-1, 1, Conv, [128, 3, 2]] # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, Conv, [256, 3, 2]] # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, Conv, [512, 3, 2]] # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, Conv, [1024, 3, 2]] # 7-P5/32
  - [-1, 3, C2f, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]] # 9

# YOLOv8.0n head
head:
  - [-1, 1, nn.Upsample, [None, 2, "nearest"]]
  - [[-1, 6], 1, Concat, [1]] # cat backbone P4
  - [-1, 3, C2f, [512]] # 12

  - [-1, 1, nn.Upsample, [None, 2, "nearest"]]
  - [[-1, 4], 1, Concat, [1]] # cat backbone P3
  - [-1, 3, C2f, [256]] # 15 (P3/8-small)

  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]] # cat head P4
  - [-1, 3, C2f, [512]] # 18 (P4/16-medium)

  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]] # cat head P5
  - [-1, 3, C2f, [1024]] # 21 (P5/32-large)

  - [[15, 18, 21], 1, Detect, [nc]] # Detect(P3, P4, P5)

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726743802846-592d2486-0a61-4b87-8e56-e1541897b067.png)

Detect 层通常是指负责最终预测的层，它将特征图转换为边界框预测和类别概率。

### 1.主干网络（backbone）
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726740822362-5b6551e9-8515-4bbc-8c75-337f2e0f6859.png)

将Yolov5原先的C3结构更换为了梯度流更丰富的C2f结构





### 2.解码头（head）
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726741254534-4896f50f-3dc6-4d1c-9f1a-d29e67c5005d.png)

