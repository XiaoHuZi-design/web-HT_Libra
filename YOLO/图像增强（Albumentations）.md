[基于Albumentations的图像增强，对yolo数据，生成增强后的图片以及标签。_albumentations图像增强-CSDN博客](https://blog.csdn.net/weixin_67977644/article/details/135949095)

<font style="color:rgb(78, 161, 219) !important;">Albumentations</font><font style="color:rgb(77, 77, 77);">是一个用于图像增强的Python库，它提供了多种增强技术，包括随机裁剪、旋转、缩放、翻转、变形、颜色变换、模糊等操作。使用Albumentations库可以快速、高效地对图像数据进行增强，从而提升机器学习模型的鲁棒性。</font>

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/10/26 16:15
# @Author  : LingJiaXiaoHu
# @File    : Albumentations_yolo.py
# @Software: win11 pytorch(GPU版本） python3.9.16

from albumentations import *
from albumentations.pytorch import ToTensorV2
import os
import cv2
from tqdm import tqdm


class YOLOAugmenter:
    def __init__(self, picture_path, label_path, save_img_path, save_label_path):
        self.picture_names = sorted(os.listdir(picture_path))
        self.label_names = sorted(os.listdir(label_path))
        self.picture_paths = [os.path.join(picture_path, name) for name in self.picture_names]
        self.label_paths = [os.path.join(label_path, name) for name in self.label_names]
        self.save_img_path = save_img_path
        self.save_label_path = save_label_path

        os.makedirs(save_img_path, exist_ok=True)
        os.makedirs(save_label_path, exist_ok=True)

    def get_transforms(self, image_height, image_width):
        # 动态设置裁剪尺寸，确保不会超出图像大小
        crop_height = min(416, image_height)
        crop_width = min(416, image_width)

        return Compose([
            HorizontalFlip(p=0.5),
            VerticalFlip(p=0.5),
            RandomBrightnessContrast(p=0.5),
            RandomCrop(height=crop_height, width=crop_width, p=0.5),
            ShiftScaleRotate(shift_limit=0.1, scale_limit=0.1, rotate_limit=15, p=0.5),
            Blur(blur_limit=3, p=0.5),
        ], bbox_params=BboxParams(format='yolo', label_fields=['class_labels']))

    def load_labels(self, label_path):
        with open(label_path, 'r') as f:
            values = f.read().strip().split('\n')
        class_labels, bboxes = [], []
        for value in values:
            data = value.split()
            class_labels.append(int(data[0]))
            bboxes.append([float(x) for x in data[1:]])
        return class_labels, bboxes

    def save_augmented_data(self, img, bboxes, labels, img_name, label_name):
        cv2.imwrite(os.path.join(self.save_img_path, img_name), img)
        label_data = "\n".join([f"{int(label)} " + " ".join(map(str, bbox)) for label, bbox in zip(labels, bboxes)])
        with open(os.path.join(self.save_label_path, label_name), 'w') as f:
            f.write(label_data)

    def augment_image_and_labels(self, img_path, label_path):
        # 读取图像
        image = cv2.imread(img_path)
        h, w, _ = image.shape

        # 获取图像增强
        transform = self.get_transforms(h, w)
        class_labels, bboxes = self.load_labels(label_path)

        transformed = transform(image=image, bboxes=bboxes, class_labels=class_labels)
        return transformed['image'], transformed['bboxes'], transformed['class_labels']

    def run(self):
        for img_path, label_path, img_name, label_name in tqdm(
            zip(self.picture_paths, self.label_paths, self.picture_names, self.label_names),
            total=len(self.picture_paths), desc='Processing'):
            try:
                augmented_image, augmented_bboxes, augmented_labels = self.augment_image_and_labels(img_path, label_path)
                if augmented_labels:
                    self.save_augmented_data(augmented_image, augmented_bboxes, augmented_labels, img_name, label_name)
            except Exception as e:
                print(f"Error processing {img_path}: {e}")


if __name__ == '__main__':
    # 原图像和标签路径
    picture_path = r'datasets/NEU_DET/images'
    label_path = r'datasets/NEU_DET/labels'
    # 增强后的图像和标签保存路径
    save_img_path = r'datasets/NEU_DET/NEU-DET/NEU_DET/images'
    save_label_path = r'datasets/NEU_DET/NEU-DET/NEU_DET/labels'

    augmenter = YOLOAugmenter(picture_path, label_path, save_img_path, save_label_path)
    augmenter.run()

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729931190641-3c24cfde-0476-4a1d-bdf1-4b748e5d3646.png)

有重复标签

```python
    def load_labels(self, label_path):
        with open(label_path, 'r') as f:
            values = f.read().strip().split('\n')
        if not values:
            raise ValueError(f"标签文件为空: {label_path}")

        unique_labels = set()  # 用于存储去重的标签
        class_labels, bboxes = [], []
        
        for value in values:
            data = value.split()
            if len(data) < 5:  # 检查是否包含类别标签和坐标
                raise ValueError(f"标签文件格式错误: {label_path}")
            
            label_tuple = (int(data[0]),) + tuple(float(x) for x in data[1:])
            if label_tuple not in unique_labels:
                unique_labels.add(label_tuple)
                class_labels.append(int(data[0]))
                bboxes.append([float(x) for x in data[1:]])
            else:
                print(f"重复标注已删除: {label_path} 中的 {label_tuple}")
        
        return class_labels, bboxes

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729931361708-bde73bdc-ccbe-4201-80e0-da12046aa682.png)

有错误标签格式  空的

之前的xml转换有问题，重写一个 没有空的txt

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/10/26 16:53
# @Author  : LingJiaXiaoHu
# @File    : xml2yolo.py
# @Software: win11 pytorch(GPU版本） python3.9.16

import os
import xml.etree.ElementTree as ET


def convert_voc_to_yolo(xml_folder, yolo_folder, class_names):
    """
    将 Pascal VOC XML 格式数据集转换为 YOLO 格式

    Args:
        xml_folder (str): XML 文件存储路径
        yolo_folder (str): YOLO 标签文件存储路径
        class_names (list): 类别名列表
    """
    if not os.path.exists(yolo_folder):
        os.makedirs(yolo_folder)

    for xml_file in os.listdir(xml_folder):
        if not xml_file.endswith(".xml"):
            continue

        xml_path = os.path.join(xml_folder, xml_file)
        tree = ET.parse(xml_path)
        root = tree.getroot()

        # 获取图像的宽度和高度
        size = root.find("size")
        img_width = int(size.find("width").text)
        img_height = int(size.find("height").text)

        yolo_data = []

        # 解析每个目标对象
        for obj in root.findall("object"):
            class_name = obj.find("name").text
            if class_name not in class_names:
                print(f"Warning: '{class_name}' not found in class list.")
                continue

            class_id = class_names.index(class_name)
            bbox = obj.find("bndbox")
            xmin = int(bbox.find("xmin").text)
            ymin = int(bbox.find("ymin").text)
            xmax = int(bbox.find("xmax").text)
            ymax = int(bbox.find("ymax").text)

            # 转换为 YOLO 格式
            x_center = ((xmin + xmax) / 2) / img_width
            y_center = ((ymin + ymax) / 2) / img_height
            bbox_width = (xmax - xmin) / img_width
            bbox_height = (ymax - ymin) / img_height

            yolo_data.append(f"{class_id} {x_center} {y_center} {bbox_width} {bbox_height}")

        # 保存为 .txt 文件
        txt_filename = os.path.splitext(xml_file)[0] + ".txt"
        txt_path = os.path.join(yolo_folder, txt_filename)

        with open(txt_path, "w") as f:
            f.write("\n".join(yolo_data))
        print(f"Converted {xml_file} to {txt_filename}")


# 定义类别名称
class_names = ['crazing', 'inclusion', 'patches', 'pitted_surface', 'rolled-in_scale', 'scratches']  # 这里填入你的类别名称

# 执行转换
xml_folder = "datasets/NEU_DET/NEU-DET/ANNOTATIONS"  # XML 文件存储路径
yolo_folder = "datasets/NEU_DET/NEU-DET/NEU_DET/txt"  # YOLO 标签文件存储路径
convert_voc_to_yolo(xml_folder, yolo_folder, class_names)

```

最终代码：

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/10/26 16:15
# @Author  : LingJiaXiaoHu
# @File    : Albumentations_yolo.py
# @Software: win11 pytorch(GPU版本） python3.9.16

from albumentations import *
from albumentations.pytorch import ToTensorV2
import os
import cv2
from tqdm import tqdm


class YOLOAugmenter:
    def __init__(self, picture_path, label_path, save_img_path, save_label_path):
        self.picture_names = sorted(os.listdir(picture_path))
        self.label_names = sorted(os.listdir(label_path))
        self.picture_paths = [os.path.join(picture_path, name) for name in self.picture_names]
        self.label_paths = [os.path.join(label_path, name) for name in self.label_names]
        self.save_img_path = save_img_path
        self.save_label_path = save_label_path

        os.makedirs(save_img_path, exist_ok=True)
        os.makedirs(save_label_path, exist_ok=True)

    def get_transforms(self, image_height, image_width):
        # 动态设置裁剪尺寸，确保不会超出图像大小  crop_height 和 crop_width 最多为 416，或者是图像的实际尺寸（如果图像小于 416）。
        crop_height = min(416, image_height)
        crop_width = min(416, image_width)

        return Compose([
            HorizontalFlip(p=0.5),   # 以 50% 的概率水平翻转图像。
            VerticalFlip(p=0.5),     # 以 50% 的概率垂直翻转图像。
            RandomBrightnessContrast(p=0.5), # 以 50% 的概率随机调整图像的亮度和对比度，增强图像亮度和对比的多样性。
            RandomCrop(height=crop_height, width=crop_width, p=0.5), # 以 50% 的概率裁剪图像，裁剪尺寸为 crop_height 和 crop_width，可以增强图像局部的细节信息。
            ShiftScaleRotate(shift_limit=0.1, scale_limit=0.1, rotate_limit=15, p=0.5), # 以 50% 的概率对图像进行平移、缩放和旋转。最大平移比例为 10%，缩放比例为 10%，旋转角度在 ±15 度之间。
            Blur(blur_limit=3, p=0.5),  # 以 50% 的概率对图像进行模糊处理，使图像更具模糊效果。
        ], bbox_params=BboxParams(format='yolo', label_fields=['class_labels']))

    def load_labels(self, label_path):
        with open(label_path, 'r') as f:
            values = f.read().strip().split('\n')
        class_labels, bboxes = [], []
        for value in values:
            data = value.split()
            class_labels.append(int(data[0]))
            bboxes.append([float(x) for x in data[1:]])
        return class_labels, bboxes

    # def load_labels(self, label_path):
    #     with open(label_path, 'r') as f:
    #         values = f.read().strip().split('\n')
    #     if not values:
    #         raise ValueError(f"标签文件为空: {label_path}")
    #
    #     unique_labels = set()  # 用于存储去重的标签
    #     class_labels, bboxes = [], []
    #
    #     for value in values:
    #         data = value.split()
    #         if len(data) < 5:  # 检查是否包含类别标签和坐标
    #             raise ValueError(f"标签文件格式错误: {label_path}")
    #
    #         label_tuple = (int(data[0]),) + tuple(float(x) for x in data[1:])
    #         if label_tuple not in unique_labels:
    #             unique_labels.add(label_tuple)
    #             class_labels.append(int(data[0]))
    #             bboxes.append([float(x) for x in data[1:]])
    #         else:
    #             print(f"重复标注已删除: {label_path} 中的 {label_tuple}")
    #
    #     return class_labels, bboxes

    def save_augmented_data(self, img, bboxes, labels, img_name, label_name):
        cv2.imwrite(os.path.join(self.save_img_path, img_name), img)
        label_data = "\n".join([f"{int(label)} " + " ".join(map(str, bbox)) for label, bbox in zip(labels, bboxes)])
        with open(os.path.join(self.save_label_path, label_name), 'w') as f:
            f.write(label_data)

    def augment_image_and_labels(self, img_path, label_path):
        # 读取图像
        image = cv2.imread(img_path)
        h, w, _ = image.shape

        # 获取图像增强
        transform = self.get_transforms(h, w)
        class_labels, bboxes = self.load_labels(label_path)

        transformed = transform(image=image, bboxes=bboxes, class_labels=class_labels)
        return transformed['image'], transformed['bboxes'], transformed['class_labels']

    def run(self):
        for img_path, label_path, img_name, label_name in tqdm(
                zip(self.picture_paths, self.label_paths, self.picture_names, self.label_names),
                total=len(self.picture_paths), desc='Processing'):
            try:
                augmented_image, augmented_bboxes, augmented_labels = self.augment_image_and_labels(img_path, label_path)
                if augmented_labels:
                    self.save_augmented_data(augmented_image, augmented_bboxes, augmented_labels, img_name, label_name)
            except Exception as e:
                print(f"Error processing {img_path}: {e}")


if __name__ == '__main__':
    # 原图像和标签路径
    picture_path = r'datasets/NEU_DET/NEU-DET/IMAGES'
    label_path = r'datasets/NEU_DET/NEU-DET/txt'
    # 增强后的图像和标签保存路径
    save_img_path = r'datasets/NEU_DET/NEU-DET/Albument/images'
    save_label_path = r'datasets/NEU_DET/NEU-DET/Albument/labels'

    augmenter = YOLOAugmenter(picture_path, label_path, save_img_path, save_label_path)
    augmenter.run()
```



```python
import os


def rename_augmented_data(augmented_images_path, augmented_labels_path, prefix="aug", start_index=1):
    """
    重命名数据增强后的图片和标签文件。

    Args:
        augmented_images_path (str): 图片文件存储路径
        augmented_labels_path (str): 标签文件存储路径
        prefix (str): 文件名前缀
        start_index (int): 起始编号
    """
    image_files = sorted([f for f in os.listdir(augmented_images_path) if f.endswith(".jpg")])
    label_files = sorted([f for f in os.listdir(augmented_labels_path) if f.endswith(".txt")])

    for i, (image_file, label_file) in enumerate(zip(image_files, label_files), start=start_index):
        new_name = f"{prefix}_{i:05d}"  # 新文件名格式：例如 aug_00001

        # 原文件路径
        old_image_path = os.path.join(augmented_images_path, image_file)
        old_label_path = os.path.join(augmented_labels_path, label_file)

        # 新文件路径
        new_image_path = os.path.join(augmented_images_path, new_name + ".jpg")
        new_label_path = os.path.join(augmented_labels_path, new_name + ".txt")

        # 重命名文件
        os.rename(old_image_path, new_image_path)
        os.rename(old_label_path, new_label_path)

        print(f"Renamed {image_file} to {new_name}.jpg")
        print(f"Renamed {label_file} to {new_name}.txt")


# 设置路径
augmented_images_path = "datasets/NEU_DET/NEU-DET/Albument/images"
augmented_labels_path = "datasets/NEU_DET/NEU-DET/Albument/labels"

# 执行重命名
rename_augmented_data(augmented_images_path, augmented_labels_path, prefix="aug", start_index=1)
```

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/10/26 17:13
# @Author  : LingJiaXiaoHu
# @File    : rename.py
# @Software: win11 pytorch(GPU版本） python3.9.16
import os
import shutil


def rename_and_save_augmented_data(augmented_images_path, augmented_labels_path,
                                   new_images_path, new_labels_path, prefix="aug", start_index=1):
    """
    重命名数据增强后的图片和标签文件，并保存在新的目录中。

    Args:
        augmented_images_path (str): 原图片文件存储路径
        augmented_labels_path (str): 原标签文件存储路径
        new_images_path (str): 新图片文件存储路径
        new_labels_path (str): 新标签文件存储路径
        prefix (str): 文件名前缀
        start_index (int): 起始编号
    """
    # 创建新目录（如果不存在）
    os.makedirs(new_images_path, exist_ok=True)
    os.makedirs(new_labels_path, exist_ok=True)

    # 获取原图片和标签文件
    image_files = sorted([f for f in os.listdir(augmented_images_path) if f.endswith(".jpg")])
    label_files = sorted([f for f in os.listdir(augmented_labels_path) if f.endswith(".txt")])

    for i, (image_file, label_file) in enumerate(zip(image_files, label_files), start=start_index):
        #new_name = f"{prefix}_{i:05d}"  # 新文件名格式：例如 aug_00001
        # 获取原始文件名（去掉后缀）
        original_name = os.path.splitext(image_file)[0]
        new_name = f"{original_name}_{i:05d}_{prefix}"  # 新文件名格式：例如 aug_00001

        # 原文件路径
        old_image_path = os.path.join(augmented_images_path, image_file)
        old_label_path = os.path.join(augmented_labels_path, label_file)

        # 新文件路径
        new_image_path = os.path.join(new_images_path, new_name + ".jpg")
        new_label_path = os.path.join(new_labels_path, new_name + ".txt")

        # 复制并重命名文件
        shutil.copy2(old_image_path, new_image_path)
        shutil.copy2(old_label_path, new_label_path)

        print(f"Copied and renamed {image_file} to {new_name}.jpg")
        print(f"Copied and renamed {label_file} to {new_name}.txt")


# 设置路径
augmented_images_path = r"datasets/NEU_DET/NEU-DET/Albument/images4"  # 原图片文件夹路径
augmented_labels_path = r"datasets/NEU_DET/NEU-DET/Albument/labels4"  # 原标签文件夹路径
new_images_path = r"datasets/NEU_DET/NEU-DET/Albument/new_augmented/images4"  # 新图片文件夹路径
new_labels_path = r"datasets/NEU_DET/NEU-DET/Albument/new_augmented/labels4"  # 新标签文件夹路径

# 执行重命名和保存
rename_and_save_augmented_data(
    augmented_images_path,
    augmented_labels_path,
    new_images_path,
    new_labels_path,
    prefix="aug4",
    start_index=1
)
```



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729943623884-51c17aec-f3e8-4082-b66b-b450da366244.png)



一共9000张：训练集7200张，验证集900张（每类150张），测试集900张（每类150张）

