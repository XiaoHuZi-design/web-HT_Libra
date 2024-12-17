[Train](https://docs.ultralytics.com/modes/train/)

预训练模型下载：[https://docs.ultralytics.com/models/yolov8/#supported-tasks-and-modes](https://docs.ultralytics.com/models/yolov8/#supported-tasks-and-modes)

## 正文
使用X-AnyLabeling标注工具进行标注（比较方便的一个开源工具）

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726133254149-8c9d6800-64aa-4028-b6f1-0f22abe02f5e.png)

<font style="color:#DF2A3F;">标注之后会保存为json格式</font>



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726141933457-c2963263-5318-4991-aa37-705891f64ccf.png)

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/7/26 21:54
# @Author  : LingJiaXiaoHu
# @File    : jsonZyolo.py
# @Software: win11 pytorch(GPU版本） python3.9.16

import json
import os
from pathlib import Path
import requests
import yaml
from PIL import Image
from tqdm import tqdm   # 进度条

def count_inner_list(nested_list):
    count = 0
    for lst in nested_list:
        if isinstance(lst,list):
            #             检查对象是否为指定类型
            count += 1
    return count

def output_label(json_path,yolo_path,image_path):
    # os.makedirs(yolo_path,exist_ok=True)
    json_path = Path(json_path).resolve()
    yolo_path = Path(yolo_path).resolve()
    json_parentpath = json_path.parent
    #names_dict = {0: "person"}
    names_dict = {0: "strawberry"}
    flipped_names = {v: k for k, v in names_dict.items()}
    for filename in tqdm(os.listdir(json_path),desc="Converting"):
        if filename.endswith('.json'):
            with open(os.path.join(json_path,filename), 'r',encoding='utf-8') as f:
                data = json.load(f)  # json files to dict:json_data
            last_part = os.path.basename(data.get("imagePath"))
            im_path = os.path.join(image_path,last_part)
            img = Image.open(requests.get(im_path,stream=True).raw if im_path.startswith("http") else im_path)
            width,height = img.size
            #                 size属性获得图像宽度和高度的元组，通常形式为(width, height)
            label_filename = last_part+"txt"
            label_path = os.path.join(yolo_path,Path(label_filename).with_suffix(".txt"))
            # 转换后标签存放路径
            temp_str = ""
            previous_person_data = ""
            cnt = 0
            for label in data.get("shapes"):
                #if label.get("label") == "person" :
                if label.get("label") == "strawberry":
                    cnt += 1
                    if cnt > 1:
                        current_person_data = f"{previous_person_data} {temp_str} \n"
                        previous_person_data = current_person_data
                    label_list = label.get("points")
                    x_1,y_1 = label_list[0]
                    x_2,y_2 = label_list[1]
                    x_centre = round(((x_1+x_2)/2)/width,2)
                    y_centre = round(((y_1+y_2)/2)/height,2)
                    person_width = round(abs(x_1-x_2)/width,2)
                    person_height = round(abs(y_1-y_2)/height,2)
                    #temp_str = (f"{flipped_names['person']} {x_centre} {y_centre} {person_width} {person_height} ")
                    temp_str = (f"{flipped_names['strawberry']} {x_centre} {y_centre} {person_width} {person_height} ")

                else:
                    label_list = label.get("points")
                    x,y=label_list[0]
                    # 根据json文件的特征，points内部是双重列表，且内层只有一个列表，所以我们将第一个列表的值分别赋值给x，y
                    x = round(x/width,2)
                    y = round(y/height,2)

                    temp_str = (f"{temp_str} {x} {y} ")
            current_person_data = f"{previous_person_data} {temp_str}"

            with open(label_path,"a") as f:
                f.write(current_person_data + "\n")
     # Save dataset.yaml
    d = {
        "path": f"{json_parentpath}  # dataset root dir".replace('\\','/'),
        "train": f"{json_parentpath}/images/train  # train images (relative to path) 128 images".replace('\\','/'),
        "val": f"{json_parentpath}/images/val  # val images (relative to path) 128 images".replace('\\','/'),
        "test": " # test images (optional)",
        "names": names_dict,
    }  # dictionary
    file_path = os.path.join(json_parentpath, "data.yaml")
    with open(file_path,"w",encoding='utf-8')as f:
        yaml.dump(d,f,sort_keys=False)
    print("Conversion completed successfully!")

if __name__ == '__main__':
    # output_label(r"E:\datasets\jsons",r"E:\datasets\labels",r"E:\datasets\images")
    output_label(r"D:\studyFiles\Py-project1\target_detection\yolov8\ultralytics-main_2\datasets\strawberry\jsons",
                 r"D:\studyFiles\Py-project1\target_detection\yolov8\ultralytics-main_2\datasets\strawberry\labels",
                 r"D:\studyFiles\Py-project1\target_detection\yolov8\ultralytics-main_2\datasets\strawberry\images\train")

```



```bash
# Train/val/test sets as 1) dir: path/to/imgs, 2) file: path/to/imgs.txt, or 3) list: [path/to/imgs1, path/to/imgs2, ..]
path: ../datasets/strawberry  # dataset root dir
train: images/train  # train images (relative to 'path') 128 images
val: images/val  # val images (relative to 'path') 128 images
test: images/test # test images (optional)

# Classes
names:
  0: strawberry

## yolo detect train data=datasets/person_car/mydataset_2.yaml model=yolov8n.pt epochs=100 imgsz=640 workers=0 batch=2
  # yolo predict model=runs/detect/train7/weights/best.pt source=datasets/strawberry/strawberry.jpg
  # yolo predict model=runs/detect/train7/weights/best.pt source=datasets/strawberry/images/test



  # 实例分割 yolo task=segment mode=predict model=yolov8s-seg.pt source='bus.jpg' show=True
  # yolo task=segment mode=predict model=yolov8s-seg.onnx source='bus.jpg' show=True
```



```python
yolo detect train data=datasets/person_car/mydataset_2.yaml model=yolov8n.pt epochs=100 imgsz=640 workers=0 batch=2
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726141655430-1a4109d2-1173-4eb9-9e3a-782d9c5b1cb9.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726141749846-43d6a401-3386-4849-8c61-3ad3089ab0f1.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726141312903-7ca1e3d9-2c55-4f20-8697-6315ec888c0c.png)

<font style="color:#DF2A3F;">还没到100轮，怎么提前结束训练了！！！</font>

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726142534355-1146e259-eed7-498c-9bfd-58242b0b77fd.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726142566779-4f5f4575-be22-47d4-9b35-c7f351871b43.png)



```python
yolo predict model=runs/detect/train10/weights/best.pt source=datasets/strawberry/images/strawberry.jpg
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726142458875-8323262d-e1c3-4f50-98b0-6f3f32d53116.png)

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1726142674012-744084f5-4f46-40d1-a14a-ce78a4d84014.jpeg)



```python
yolo predict model=runs/detect/train10/weights/best.pt source=datasets/strawberry/images/test
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726142786392-7c8f5930-ba6e-4c14-9874-e39f11915fb9.png)

<font style="color:#DF2A3F;">怎么一张图片都识别不到！！！</font>



**重新训练 试一试**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726143878971-283dcd48-87fa-428d-8aa1-dbff30a79ddd.png)

```bash
  yolo predict model=runs/detect/train11/weights/best.pt source=datasets/strawberry/images/strawberry.jpg
  yolo predict model=runs/detect/train11/weights/best.pt source=datasets/strawberry/images/test
```

**这次训练没有提前中断，但是还是一个没预测到**

_<font style="color:#8c8c8c;background-color:#ffffff;">应该是jsonZyolo.py脚本只能转矩形框（bounding boxes）的标注</font>_

```bash
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/9/12 20:45
# @Author  : LingJiaXiaoHu
# @File    : jsonZyolo_duobian.py
# @Software: win11 pytorch(GPU版本） python3.9.16

import json
import os
from pathlib import Path
import requests
from PIL import Image
from tqdm import tqdm
import yaml
import numpy as np


def count_inner_list(nested_list):
    count = 0
    for lst in nested_list:
        if isinstance(lst, list):
            count += 1
    return count


def get_polygon_bbox(points):
    """Convert polygon points to bounding box."""
    x_coords, y_coords = zip(*points)
    xmin = min(x_coords)
    ymin = min(y_coords)
    xmax = max(x_coords)
    ymax = max(y_coords)
    return xmin, ymin, xmax, ymax


def output_label(json_path, yolo_path, image_path):
    json_path = Path(json_path).resolve()
    yolo_path = Path(yolo_path).resolve()
    json_parentpath = json_path.parent
    names_dict = {0: "strawberry"}
    flipped_names = {v: k for k, v in names_dict.items()}

    os.makedirs(yolo_path, exist_ok=True)

    for filename in tqdm(os.listdir(json_path), desc="Converting"):
        if filename.endswith('.json'):
            with open(os.path.join(json_path, filename), 'r', encoding='utf-8') as f:
                data = json.load(f)
            last_part = os.path.basename(data.get("imagePath"))
            im_path = os.path.join(image_path, last_part)
            img = Image.open(requests.get(im_path, stream=True).raw if im_path.startswith("http") else im_path)
            width, height = img.size

            label_filename = Path(last_part).with_suffix(".txt")
            label_path = os.path.join(yolo_path, label_filename)

            with open(label_path, "w") as f:
                for label in data.get("shapes"):
                    if label.get("label") == "strawberry":
                        points = label.get("points")
                        if count_inner_list(points) > 1:
                            # 多边形标注
                            xmin, ymin, xmax, ymax = get_polygon_bbox(points)
                        else:
                            # 矩形标注
                            x1, y1 = points[0]
                            x2, y2 = points[1]
                            xmin, ymin, xmax, ymax = x1, y1, x2, y2

                        x_center = ((xmin + xmax) / 2) / width
                        y_center = ((ymin + ymax) / 2) / height
                        bbox_width = (xmax - xmin) / width
                        bbox_height = (ymax - ymin) / height

                        f.write(
                            f"{flipped_names['strawberry']} {x_center:.6f} {y_center:.6f} {bbox_width:.6f} {bbox_height:.6f}\n")

    # Save dataset.yaml
    d = {
        "path": str(json_parentpath),
        "train": str(json_parentpath / "images" / "train"),
        "val": str(json_parentpath / "images" / "val"),
        "test": "",  # Test images (optional)
        "names": names_dict,
    }
    file_path = os.path.join(json_parentpath, "data.yaml")
    with open(file_path, "w", encoding='utf-8') as f:
        yaml.dump(d, f, sort_keys=False)
    print("Conversion completed successfully!")


if __name__ == '__main__':
    output_label(
        r"D:\studyFiles\Py-project1\target_detection\yolov8\ultralytics-main_2\datasets\strawberry\jsons",
        r"D:\studyFiles\Py-project1\target_detection\yolov8\ultralytics-main_2\datasets\strawberry\labels",
        r"D:\studyFiles\Py-project1\target_detection\yolov8\ultralytics-main_2\datasets\strawberry\images\train"
    )
```

训练：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726146638420-86b0059d-1a4e-4c63-9bae-317e7480eaa2.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726146988625-4b23c7e8-fe0c-4f26-b1e1-142bf5cd2b7c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726146937399-7ff859c6-e6f6-4713-808d-014e47c7c935.png)

预测：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726146761862-b9d8dd6d-c5b4-4a5a-a81e-bd00fdca456b.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726146833927-5f029eac-cd4c-493f-a12c-d82bf26e3a62.png)

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1726147012460-a575464f-ac8a-421a-b5ef-e77a91fb61e1.jpeg)![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1726147250070-1aa8a0ea-ff15-403c-9be5-1b805106a369.jpeg)

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1726147355048-df642b45-c3f5-4f6f-a009-3b479b539020.jpeg)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726147439815-9396c5d0-ae8c-4249-bd54-6e44e1839c65.png)

图像分割：

没效果

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726147881110-2b3c2d5e-033d-4d1f-a994-8f329c0f0c53.png)

```bash
yolo detect train data=datasets/person_car/mydataset_2.yaml model=yolov8s-seg.pt epochs=100 imgsz=640 workers=0 batch=2
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726149289553-06a830cc-8577-4bd4-9369-96098b575417.png)

**数据集非分割数据集，不能用detect数据集训练分割模型，数据集格式·不对**

****

**。。。**

****

****

****

## 其他
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/6/4 11:27
# @Author  : LingJiaXiaoHu
# @File    : train.py.py
# @Software: win11 pytorch(GPU版本） python3.9.16
from ultralytics import YOLO

# Load a model
model = YOLO("yolov8n.pt")  # load a pretrained model (recommended for training)

# Train the model
results = model.train(data="mydataset_2.yaml", epochs=100, imgsz=640)


'''
 把权重文件yolov8n.pt放在根目录处
 最外层主目录直接命令行：yolo predict model=yolov8n.pt source='ultralytics/assets/bus.jpg'

 根目录下新建一个datasets文件夹，然后把coco128数据集放在下面  https : //ultralytics.com/assets /coco128.zip
 coco128数据集格式:
 images：下面的子文件夹为train2017，存放所有的训练图片；
 labels：下面的子文件夹为labels2017，存放所有的标注标签。
 配置文件：ultralytics/cfg/datasets/coco128.yaml
 *** 自己的数据集的命名和排列方式也要按这个格式来 ***

 改好参数后，训练自己的数据集命令：
 yolo detect train data=datasets/mydataset/mydataset.yaml model=yolov8n.yaml pretrained=yolov8n.pt epochs=100 batch=4 lr0=0.01 resume=True

 之后，模型验证命令： yolo detect val data=datasets/mydataset/mydataset.yaml model=runs/detect/train/weights/best.pt batch=4

 预测某张图片命令：yolo predict model=runs/detect/train/weights/best.pt source=insert.jpg

 !!!!!!!  之前安装的sd和yolov8 Ultralytics可能冲突导致路径不对 备份了一下
 You can update this in 'C:\\Users\\LingJiaXiaoHu\\AppData\\Roaming\\Ultralytics\\settings.yaml'

 报错：OSError: [WinError 1455] 页面文件太小，无法完成操作。
 yolo detect train data=datasets/mydataset/mydataset.yaml model=yolov8n.pt epochs=100 imgsz=640 workers=4 batch=4

 yolo detect train data=datasets/mydataset/mydataset.yaml model=yolov8n.pt epochs=100 imgsz=640 workers=0 batch=1  可以跑
 yolo detect val data=datasets/mydataset/mydataset.yaml model=runs/detect/train4/weights/best.pt workers=0 batch=1

**输入如下命令开始训练**
 yolo task=detect mode=train model=yolov8n.yaml data=datasets/mydataset/mydataset.yaml epochs=100 batch=4
 以上参数解释如下：

📌task：选择任务类型，可选['detect', 'segment', 'classify', 'init']。

📌mode: 选择是训练、验证还是预测的任务蕾西 可选['train', 'val', 'predict']。

📌model: 选择yolov8不同的模型配置文件，可选yolov8n.yaml，yolov8s.yaml、yolov8m.yaml、yolov8x.yaml等。

📌data: 选择生成的数据集配置文件

📌epochs：指的就是训练过程中整个数据集将被迭代多少次,显卡不行你就调小点。

📌batch：一次看完多少张图片才进行权重更新，梯度下降的mini-batch,显卡不行你就调小点。
'''
```

