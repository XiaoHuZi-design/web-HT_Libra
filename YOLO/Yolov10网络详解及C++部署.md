

Windows:   【c++部署yolov10详细教程，yolov10 cpp部署-哔哩哔哩】 [https://b23.tv/yTYjU3V](about:blank)

Linux:  [https://github.com/Aimol-l/OrtInference](about:blank)  
 

## Yolov10网络详解
 【用30分钟带你从代码角度理解YOLOv10！基本原理+代码实战通通都有！-神经网络/计算机视觉/目标检测】 [https://www.bilibili.com/video/BV1Pr421A7oV/?share_source=copy_web&vd_source=15777ee1ddccdb98cdd99268c52b0741](about:blank)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726738182293-aa4bb910-2eeb-4991-a977-0bcd919c3f8c.png)

可以看到Yolov10响应速度和精度是很高的，参数量更少，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726738425911-4c17f102-ccae-40fe-be39-a01b47d0ec69.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726738930072-19a4acc4-0330-4881-ac7a-b6ddbdbd3957.png)

```yaml
yolov10-main
├── datasets: 存放数据集的目录。
├── docker: Docker相关文件，用于容器化部署。
│   ├── Dockerfile: 用于构建默认Docker镜像。
│   ├── Dockerfile-arm64: 用于构建ARM64架构的Docker镜像。
│   ├── Dockerfile-conda: 用于构建包含Conda环境的Docker镜像。
│   ├── Dockerfile-cpu: 用于构建仅支持CPU的Docker镜像。
│   ├── Dockerfile-jetson: 用于构建NVIDIA Jetson设备的Docker镜像。
│   ├── Dockerfile-python: 用于构建包含Python环境的Docker镜像。
│   ├── Dockerfile-runner: 用于构建运行特定任务的Docker镜像。
├── docs: 项目文档目录。
│   ├── en: 英文文档目录。
│   ├── overrides: MkDocs配置覆盖目录。
│   ├── build_docs.py: 构建文档的脚本。
│   ├── build_reference.py: 构建参考文档的脚本。
│   ├── coming_soon_template.md: 即将发布的模板文档。
│   ├── mkdocs_github_authors.yaml: MkDocs配置文件，包含GitHub作者信息。
│   └── README.md: 文档目录的说明文件。
├── examples: 示例代码目录。
│   ├── YOLOv8-CPP-Inference: YOLOv8 C++推理示例。
│   ├── YOLOv8-LibTorch-CPP-Inference: YOLOv8 LibTorch C++推理示例。
│   ├── YOLOv8-ONNXRuntime: YOLOv8 ONNXRuntime推理示例。
│   ├── YOLOv8-ONNXRuntime-CPP: YOLOv8 ONNXRuntime C++推理示例。
│   ├── YOLOv8-ONNXRuntime-Rust: YOLOv8 ONNXRuntime Rust推理示例。
│   ├── YOLOv8-OpenCV-int8-tflite-Python: YOLOv8 OpenCV int8 tflite Python推理示例。
│   ├── YOLOv8-OpenCV-ONNX-Python: YOLOv8 OpenCV ONNX Python推理示例。
│   ├── YOLOv8-Region-Counter: YOLOv8区域计数示例。
│   ├── YOLOv8-SAHI-Inference-Video: YOLOv8 SAHI视频推理示例。
│   ├── YOLOv8-Segmentation-ONNXRuntime-Python: YOLOv8分割 ONNXRuntime Python推理示例。
│   ├── heatmaps.ipynb: 热图生成示例。
│   ├── hub.ipynb: 模型集线器示例。
│   ├── object_counting.ipynb: 物体计数示例。
│   ├── object_tracking.ipynb: 物体跟踪示例。
│   └── tutorial.ipynb: 教程示例。
├── figures: 存放项目相关的图像文件。
│   ├── latency.svg: 延迟图。
│   ├── params.svg: 参数图。
├── models: 存放模型文件的目录。
│   ├── yolov10n.pt: YOLOv10n模型文件。
├── runs: 存放运行结果的目录。
│   ├── detect: 检测结果。
│   ├── train5: 第五次训练结果。
│   ├── train6: 第六次训练结果。
│   ├── val: 验证结果。
├── tests: 测试代码目录。
│   ├── conftest.py: 测试配置文件。
│   ├── test_cli.py: CLI测试脚本。
│   ├── test_cuda.py: CUDA测试脚本。
│   ├── test_engine.py: 引擎测试脚本。
│   ├── test_explorer.py: 探索测试脚本。
│   ├── test_integrations.py: 集成测试脚本。
│   ├── test_python.py: Python测试脚本。
├── ultralytics: YOLOv10核心代码目录。
│   ├── assets: 资产文件目录。
│   ├── cfg: 配置文件目录。
│   ├── data: 数据文件目录。
│   ├── engine: 引擎代码目录。
│   ├── hub: 模型集线器目录。
│   ├── models: 模型代码目录。
│   ├── nn: 神经网络代码目录。
│   ├── solutions: 解决方案目录。
│   ├── trackers: 跟踪器目录。
│   ├── utils: 工具函数目录。
│   └── __init__.py: 初始化文件。
├── ultralytics.egg-info: 项目安装信息目录。
│   ├── dependency_links.txt: 依赖链接信息。
│   ├── entry_points.txt: 入口点信息。
│   ├── PKG-INFO: 包信息。
│   ├── requires.txt: 依赖项信息。
│   ├── SOURCES.txt: 源文件信息。
│   └── top_level.txt: 顶级模块信息。
├── .gitignore: 指定应忽略的文件和目录。
├── .pre-commit-config.yaml: 配置pre-commit钩子的文件。
├── 1.txt: 未知用途文件。
├── CONTRIBUTING.md: 贡献指南，指导用户如何为项目做贡献。
├── LICENSE: 包含项目的许可信息。
├── mkdocs.yml: MkDocs配置文件，用于生成项目文档。
├── pyproject.toml: 项目配置文件，包括依赖项和工具配置。
├── README.md: 提供项目概述和使用说明。
└── requirements.txt: 列出项目所需的Python依赖库。

```

```yaml
ultralytics
├── assets: 存放资产文件的目录。
├── cfg: 配置文件目录。
│   └── default.yaml: 默认配置文件，包含训练和测试的参数设置。
├── data: 数据文件目录。
│   ├── __init__.py: 初始化数据模块。
│   ├── annotator.py: 数据注释工具。
│   ├── augment.py: 数据增强工具。
│   ├── base.py: 数据处理的基础类和函数。
│   ├── build.py: 数据构建工具。
│   ├── converter.py: 数据转换工具。
│   ├── dataset.py: 数据集处理工具。
│   ├── loaders.py: 数据加载工具。
│   ├── split_dota.py: 专用于DOTA数据集的分割工具。
│   └── utils.py: 数据处理的辅助工具。
├── engine: 引擎代码目录。
│   ├── __init__.py: 初始化引擎模块。
│   ├── exporter.py: 导出模型的工具。
│   ├── model.py: 定义模型结构的文件。
│   ├── predictor.py: 预测功能的实现。
│   ├── results.py: 处理和展示结果的工具。
│   ├── trainer.py: 模型训练的工具。
│   ├── tuner.py: 模型调优工具。
│   └── validator.py: 模型验证工具。
├── hub: 模型集线器目录。
│   ├── __init__.py: 初始化集线器模块。
│   ├── auth.py: 处理身份验证的工具。
│   ├── session.py: 管理会话的工具。
│   └── utils.py: 集线器模块的辅助工具。
├── models: 模型代码目录。
│   ├── fastsam: 存放FastSAM模型相关代码的目录。
│   ├── nas: 存放NAS模型相关代码的目录。
│   ├── rtdetr: 存放RT-DETR模型相关代码的目录。
│   ├── sam: 存放SAM模型相关代码的目录。
│   ├── utils: 存放模型工具函数的目录。
│   └── yolo: YOLO模型相关代码的目录。
│       ├── __init__.py: 初始化YOLO模型模块。
│       ├── model.py: 定义YOLO模型结构的文件。
│       ├── predict.py: YOLO模型的预测实现。
│       ├── train.py: YOLO模型的训练实现。
│       └── val.py: YOLO模型的验证实现。
├── nn: 神经网络代码目录。
│   ├── __init__.py: 初始化神经网络模块。
│   ├── modules: 存放神经网络模块的目录。
│       └── __init__.py: 初始化模块目录。
│   ├── autobackend.py: 自动选择后端的工具。
│   └── tasks.py: 定义神经网络任务的文件。
├── solutions: 解决方案目录。
│   ├── __init__.py: 初始化解决方案模块。
│   ├── ai_gym.py: AI健身房相关解决方案。
│   ├── distance_calculation.py: 距离计算相关解决方案。
│   ├── heatmap.py: 热图生成解决方案。
│   ├── object_counter.py: 物体计数解决方案。
│   └── speed_estimation.py: 速度估算解决方案。
├── trackers: 跟踪器目录。
│   ├── __init__.py: 初始化跟踪器模块。
│   ├── basetrack.py: 基础跟踪器实现。
│   ├── bot_sort.py: BOT SORT跟踪器实现。
│   ├── byte_tracker.py: BYTE跟踪器实现。
│   ├── README.md: 跟踪器模块说明文件。
│   └── track.py: 跟踪器的主要实现文件。
├── utils: 工具函数目录。
│   ├── __init__.py: 初始化工具模块。
│   ├── autobatch.py: 自动批处理工具。
│   ├── benchmarks.py: 基准测试工具。
│   ├── checks.py: 检查工具。
│   ├── dist.py: 分布式计算工具。
│   ├── downloads.py: 下载工具。
│   ├── errors.py: 错误处理工具。
│   ├── files.py: 文件处理工具。
│   ├── instance.py: 实例化工具。
│   ├── loss.py: 损失计算工具。
│   ├── metrics.py: 评估指标工具。
│   ├── ops.py: 操作函数工具。
│   ├── patches.py: 补丁工具。
│   ├── plotting.py: 绘图工具。
│   ├── tal.py: TAL相关工具。
│   ├── torch_utils.py: PyTorch工具函数。
│   ├── triton.py: Triton相关工具。
│   └── tuner.py: 调优工具。
```

默认参数：

```yaml
# Ultralytics YOLO 🚀, AGPL-3.0 license
# Default training settings and hyperparameters for medium-augmentation COCO training

task: detect # (str) YOLO task, i.e. detect, segment, classify, pose
mode: train # (str) YOLO mode, i.e. train, val, predict, export, track, benchmark

# Train settings -------------------------------------------------------------------------------------------------------
model: # (str, optional) path to model file, i.e. yolov8n.pt, yolov8n.yaml
data: # (str, optional) path to data file, i.e. coco128.yaml
epochs: 100 # (int) number of epochs to train for
time: # (float, optional) number of hours to train for, overrides epochs if supplied
patience: 100 # (int) epochs to wait for no observable improvement for early stopping of training
batch: 16 # (int) number of images per batch (-1 for AutoBatch)
imgsz: 640 # (int | list) input images size as int for train and val modes, or list[w,h] for predict and export modes
save: True # (bool) save train checkpoints and predict results
save_period: -1 # (int) Save checkpoint every x epochs (disabled if < 1)
val_period: 1 # (int) Validation every x epochs
cache: False # (bool) True/ram, disk or False. Use cache for data loading
device: # (int | str | list, optional) device to run on, i.e. cuda device=0 or device=0,1,2,3 or device=cpu
workers: 8 # (int) number of worker threads for data loading (per RANK if DDP)
project: # (str, optional) project name
name: # (str, optional) experiment name, results saved to 'project/name' directory
exist_ok: False # (bool) whether to overwrite existing experiment
pretrained: True # (bool | str) whether to use a pretrained model (bool) or a model to load weights from (str)
optimizer: auto # (str) optimizer to use, choices=[SGD, Adam, Adamax, AdamW, NAdam, RAdam, RMSProp, auto]
verbose: True # (bool) whether to print verbose output
seed: 0 # (int) random seed for reproducibility
deterministic: True # (bool) whether to enable deterministic mode
single_cls: False # (bool) train multi-class data as single-class
rect: False # (bool) rectangular training if mode='train' or rectangular validation if mode='val'
cos_lr: False # (bool) use cosine learning rate scheduler
close_mosaic: 10 # (int) disable mosaic augmentation for final epochs (0 to disable)
resume: False # (bool) resume training from last checkpoint
amp: True # (bool) Automatic Mixed Precision (AMP) training, choices=[True, False], True runs AMP check
fraction: 1.0 # (float) dataset fraction to train on (default is 1.0, all images in train set)
profile: False # (bool) profile ONNX and TensorRT speeds during training for loggers
freeze: None # (int | list, optional) freeze first n layers, or freeze list of layer indices during training
multi_scale: False # (bool) Whether to use multiscale during training
# Segmentation
overlap_mask: True # (bool) masks should overlap during training (segment train only)
mask_ratio: 4 # (int) mask downsample ratio (segment train only)
# Classification
dropout: 0.0 # (float) use dropout regularization (classify train only)

# Val/Test settings ----------------------------------------------------------------------------------------------------
val: True # (bool) validate/test during training
split: val # (str) dataset split to use for validation, i.e. 'val', 'test' or 'train'
save_json: False # (bool) save results to JSON file
save_hybrid: False # (bool) save hybrid version of labels (labels + additional predictions)
conf: # (float, optional) object confidence threshold for detection (default 0.25 predict, 0.001 val)
iou: 0.7 # (float) intersection over union (IoU) threshold for NMS
max_det: 300 # (int) maximum number of detections per image
half: False # (bool) use half precision (FP16)
dnn: False # (bool) use OpenCV DNN for ONNX inference
plots: True # (bool) save plots and images during train/val

# Predict settings -----------------------------------------------------------------------------------------------------
source: # (str, optional) source directory for images or videos
vid_stride: 1 # (int) video frame-rate stride
stream_buffer: False # (bool) buffer all streaming frames (True) or return the most recent frame (False)
visualize: False # (bool) visualize model features
augment: False # (bool) apply image augmentation to prediction sources
agnostic_nms: False # (bool) class-agnostic NMS
classes: # (int | list[int], optional) filter results by class, i.e. classes=0, or classes=[0,2,3]
retina_masks: False # (bool) use high-resolution segmentation masks
embed: # (list[int], optional) return feature vectors/embeddings from given layers

# Visualize settings ---------------------------------------------------------------------------------------------------
show: False # (bool) show predicted images and videos if environment allows
save_frames: False # (bool) save predicted individual video frames
save_txt: False # (bool) save results as .txt file
save_conf: False # (bool) save results with confidence scores
save_crop: False # (bool) save cropped images with results
show_labels: True # (bool) show prediction labels, i.e. 'person'
show_conf: True # (bool) show prediction confidence, i.e. '0.99'
show_boxes: True # (bool) show prediction boxes
line_width: # (int, optional) line width of the bounding boxes. Scaled to image size if None.

# Export settings ------------------------------------------------------------------------------------------------------
format: torchscript # (str) format to export to, choices at https://docs.ultralytics.com/modes/export/#export-formats
keras: False # (bool) use Kera=s
optimize: False # (bool) TorchScript: optimize for mobile
int8: False # (bool) CoreML/TF INT8 quantization
dynamic: False # (bool) ONNX/TF/TensorRT: dynamic axes
simplify: False # (bool) ONNX: simplify model using `onnxslim`
opset: # (int, optional) ONNX: opset version
workspace: 4 # (int) TensorRT: workspace size (GB)
nms: False # (bool) CoreML: add NMS

# Hyperparameters ------------------------------------------------------------------------------------------------------
lr0: 0.01 # (float) initial learning rate (i.e. SGD=1E-2, Adam=1E-3)
lrf: 0.01 # (float) final learning rate (lr0 * lrf)
momentum: 0.937 # (float) SGD momentum/Adam beta1
weight_decay: 0.0005 # (float) optimizer weight decay 5e-4
warmup_epochs: 3.0 # (float) warmup epochs (fractions ok)
warmup_momentum: 0.8 # (float) warmup initial momentum
warmup_bias_lr: 0.1 # (float) warmup initial bias lr
box: 7.5 # (float) box loss gain
cls: 0.5 # (float) cls loss gain (scale with pixels)
dfl: 1.5 # (float) dfl loss gain
pose: 12.0 # (float) pose loss gain
kobj: 1.0 # (float) keypoint obj loss gain
label_smoothing: 0.0 # (float) label smoothing (fraction)
nbs: 64 # (int) nominal batch size
hsv_h: 0.015 # (float) image HSV-Hue augmentation (fraction)
hsv_s: 0.7 # (float) image HSV-Saturation augmentation (fraction)
hsv_v: 0.4 # (float) image HSV-Value augmentation (fraction)
degrees: 0.0 # (float) image rotation (+/- deg)
translate: 0.1 # (float) image translation (+/- fraction)
scale: 0.5 # (float) image scale (+/- gain)
shear: 0.0 # (float) image shear (+/- deg)
perspective: 0.0 # (float) image perspective (+/- fraction), range 0-0.001
flipud: 0.0 # (float) image flip up-down (probability)
fliplr: 0.5 # (float) image flip left-right (probability)
bgr: 0.0 # (float) image channel BGR (probability)
mosaic: 1.0 # (float) image mosaic (probability)
mixup: 0.0 # (float) image mixup (probability)
copy_paste: 0.0 # (float) segment copy-paste (probability)
auto_augment: randaugment # (str) auto augmentation policy for classification (randaugment, autoaugment, augmix)
erasing: 0.4 # (float) probability of random erasing during classification training (0-1)
crop_fraction: 1.0 # (float) image crop fraction for classification evaluation/inference (0-1)

# Custom config.yaml ---------------------------------------------------------------------------------------------------
cfg: # (str, optional) for overriding defaults.yaml

# Tracker settings ------------------------------------------------------------------------------------------------------
tracker: botsort.yaml # (str) tracker type, choices=[botsort.yaml, bytetrack.yaml]

```

中文版：[默认参数解释.md](https://www.yuque.com/attachments/yuque/0/2024/md/39216292/1726737234779-e333cfd4-b863-4d8c-ac82-f530c2fad43b.md)

```markdown
| 参数名       | 输入类型            | 参数解释                                                                 |
|--------------|---------------------|--------------------------------------------------------------------------|
| task         | str                 | YOLO模型的任务选择，选择你是要进行检测、分类等操作                      |
| mode         | str                 | YOLO模式的选择，选择要进行训练、推理、输出、验证等操作                  |
| model        | str/optional        | 模型的文件，可以是官方的预训练模型，也可以是训练自己模型的yaml文件       |
| data         | str/optional        | 模型的地址，可以是文件的地址，也可以是配置好地址的yaml文件               |
| epochs       | int                 | 训练的轮次，将你的数据输入到模型里进行训练的次数                         |
| patience     | int                 | 早停机制，当你的模型精度没有改进了就提前停止训练                         |
| batch        | int                 | 我们输入的数据集会分解为多个子集，一次向模型里输入多少个子集             |
| imgsz        | int/list            | 输入的图片的大小，可以是整数就代表图片尺寸为int*int，或者list分别代表宽和高[w，h] |
| save         | bool                | 是否保存模型以及预测结果                                                 |
| save_period  | int                 | 在训练过程中多少次保存一次模型文件,就是生成的pt文件                      |
| cache        | bool                | 参数cache用于控制是否启用缓存机制                                         |
| device       | int/str/list/optional | GPU设备的选择：cuda device=0 or device=0,1,2,3 or device=cpu             |
| workers      | int                 | 工作的线程，Windows系统一定要设置为0否则很可能会引起线程报错             |
| name         | str/optional        | 模型保存的名字，结果会保存到'project/name' 目录下                        |
| exist_ok     | bool                | 如果模型存在的时候是否进行覆盖操作                                       |
| pretrained   | bool                | 参数pretrained用于控制是否使用预训练模型                                 |
| optimizer    | str                 | 优化器的选择choices=[SGD, Adam, Adamax, AdamW, NAdam, RAdam, RMSProp, auto] |
| verbose      | bool                | 用于控制在执行过程中是否输出详细的信息和日志                             |
| seed         | int                 | 随机数种子，模型中涉及到随机的时候，根据随机数种子进行生成               |
| deterministic| bool                | 用于控制是否启用确定性模式，在确定性模式下，算法的执行将变得可重复，即相同的输入将产生相同的输出 |
| single_cls   | bool                | 是否是单标签训练                                                         |
| rect         | bool                | 当 rect 设置为 True 时，表示启用矩形训练或验证。矩形训练或验证是一种数据处理技术，其中在训练或验证过程中，输入数据会被调整为具有相同宽高比的矩形形状 |
| cos_lr       | bool                | 控制是否使用余弦学习率调度器                                             |
| close_mosaic | int                 | 控制在最后几个 epochs 中是否禁用马赛克数据增强                           |
| resume       | bool                | 用于从先前的训练检查点（checkpoint）中恢复模型的训练                     |
| amp          | bool                | 用于控制是否进行自动混合精度                                             |
| fraction     | float               | 用于指定训练数据集的一部分进行训练的比例。默认值为 1.0                    |
| profile      | bool                | 用于控制是否在训练过程中启用 ONNX 和 TensorRT 的性能分析                  |
| freeze       | int/list/optional   | 用于指定在训练过程中冻结前 n 层或指定层索引的列表，以防止它们的权重更新。这对于迁移学习或特定层的微调很有用 |

```

模型配置文件：

```yaml
# Parameters
nc: 80 # number of classes
scales: # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'
  # [depth, width, max_channels]
  n: [0.33, 0.25, 1024] 

# YOLOv8.0n backbone
backbone:
  # [from, repeats, module, args]
  - [-1, 1, Conv, [64, 3, 2]] # 0-P1/2
  - [-1, 1, Conv, [128, 3, 2]] # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, Conv, [256, 3, 2]] # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, SCDown, [512, 3, 2]] # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, SCDown, [1024, 3, 2]] # 7-P5/32
  - [-1, 3, C2f, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]] # 9
  - [-1, 1, PSA, [1024]] # 10

# YOLOv8.0n head
head:
  - [-1, 1, nn.Upsample, [None, 2, "nearest"]]
  - [[-1, 6], 1, Concat, [1]] # cat backbone P4
  - [-1, 3, C2f, [512]] # 13

  - [-1, 1, nn.Upsample, [None, 2, "nearest"]]
  - [[-1, 4], 1, Concat, [1]] # cat backbone P3
  - [-1, 3, C2f, [256]] # 16 (P3/8-small)

  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 13], 1, Concat, [1]] # cat head P4
  - [-1, 3, C2f, [512]] # 19 (P4/16-medium)

  - [-1, 1, SCDown, [512, 3, 2]]
  - [[-1, 10], 1, Concat, [1]] # cat head P5
  - [-1, 3, C2fCIB, [1024, True, True]] # 22 (P5/32-large)

  - [[16, 19, 22], 1, v10Detect, [nc]] # Detect(P3, P4, P5)

```



yolov10s.yaml 下面就是s，名称根据不同型号定义的，其他部分基本一样，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726738630827-ff007bb1-3bc4-4bd9-84db-5521289e1061.png)



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



yolov10基于yolov8改的，下面看看有什么区别，



将backbone的C2f后面两层卷积换成了SCDown，另外加了一个PSA模块，

将head的最后一个C2f换成C2fCIB，以及将Detect换成v10Detect，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726739894251-5c0f2542-06f9-40e5-906e-072869bde2d7.png)



<font style="color:#DF2A3F;">Yolov10的主要创新点是取消后处理NMS</font>

NMS 非极大值抑制（Non-Maximum Suppresion，NMS）



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726740468124-fc129017-9f95-4f92-bda1-1af7716fa996.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726740484959-474b4270-bac7-47c3-97f2-2b60efe3a73f.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726740497396-e61a9277-5a3f-4e10-a028-358c7b0dde82.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726740512429-66c6b1be-5626-4026-aa41-7152a6a70d6f.png)





## 方法1
  
 像yolov8部署那个一样配置环境试一试，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726714620212-542fa492-f16c-43a1-b24b-d9e76352c6cf.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726712148827-e82329cb-7e67-406b-aa26-4b98c79a6a1f.png)

 $(SolutionDir)$(Platform)\$(Configuration)\  
改 输出目录 $(SolutionDir)$(ProjectName)\$(Configuration)\  
 

附加包含目录 ./include/opencv;./include/CUDA;./include/onnxruntime;  
附加库目录 ./lib  
附加依赖项 onnxruntime.lib;opencv_world481.lib

**还是报错，不知道为啥**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726717665195-7ada4817-23f5-4c3b-a371-6d657cf344dc.png)





##   
方法2（成功）
**<font style="color:#DF2A3F;">换种方法，直接vs里面安装依赖</font>**

**<font style="color:#DF2A3F;">新建项目后，</font>**

**右键引用**，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726715656908-4f34a249-3698-482b-81c4-942a9ab32708.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726713639939-28ab76f1-6233-4228-9d76-a5d9557dc41c.png)

先安装cpu版本onnxruntime试一试，gpu版本还要配置cuda

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726714109333-fdf63b6b-a307-4738-8dd9-601de861b65c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726714672962-e0c02c35-57c2-4821-8eaf-d11e7f954e78.png)

安装好后生成package

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726714328138-843a8947-9165-40e3-9181-2da67a6f3d73.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726714432999-e8efacc7-68ac-4273-955f-1ca547932ca0.png)

<font style="color:#DF2A3F;">可能是与前面手动配置的有冲突</font>

新建一个工程再试一试，

```cpp
// yolov10_cpp.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>
#include <onnxruntime_cxx_api.h>
#include <opencv2/opencv.hpp>

using std::cout;
using std::endl;
using std::vector;
using std::string;
using cv::Mat;

static const vector<std::string> class_name =
{ "person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light",
"fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow",
"elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee",
"skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard",
"tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple",
"sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch",
"potted plant", "bed", "dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone",
"microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear",
"hair drier", "toothbrush" };

// 前处理
// 推理
// 后处理
// 一条一维向量加形状信息
// 640 * 640 * 3
// 
vector<float> img2vector(const Mat& img)
{
    vector<float> B;
    vector<float> G;
    vector<float> R;
    B.reserve(640 * 640 * 3);
    G.reserve(640 * 640);
    R.reserve(640 * 640);
    const uchar* pdata = (uchar*)img.datastart;
    for (int i = 0; i < img.dataend - img.datastart; i += 3)
        {
            B.push_back((float)*(pdata + i) / 255.0);
            G.push_back((float)*(pdata + i + 1) / 255.0);
            R.push_back((float)*(pdata + i + 2) / 255.0);
        }
    B.insert(B.cend(), G.cbegin(), G.cend());
    B.insert(B.cend(), R.cbegin(), R.cend());
    return B;
}

void print_float_data(const float* const pdata, int data_num_per_line = 6, int data_num = 300)
{
    for (int i = 0; i < data_num; i++)
        {
            for (int j = 0; j < data_num_per_line; j++)
                {
                    cout << *(pdata + i * data_num_per_line + j) << " ";
                }
            cout << endl;
        }
}

vector<vector<float>> float2vector(const float* const pdata, int data_num_per_line = 6, int data_num = 100, float conf = 0.8)
{
    vector<vector<float>> info;
    vector<float> info_line;
    for (int i = 0; i < data_num; i++)
        {
            if (*(pdata + i * data_num_per_line + 4) < conf)
            {
                continue;
            }
            for (int j = 0; j < data_num_per_line; j++)
                {
                    //cout << *(pdata + i * data_num_per_line + j) << " ";
                    info_line.push_back(*(pdata + i * data_num_per_line + j));
                }
            info.push_back(info_line);
            info_line.clear();
            //cout << endl;
        }
    return info;
}

void draw_box(Mat& img, const vector<vector<float>>& info)
{
    float w = img.cols;
    float h = img.rows;
    for (int i = 0; i < info.size(); i++)
        {
            cv::rectangle(img, cv::Point(info[i][0] * w / 640.0, info[i][1] * h / 640.0),
            cv::Point(info[i][2] * w / 640.0, info[i][3] * h / 640.0), cv::Scalar(0, 255, 0));
        string label;
        label += class_name[info[i][5]];
        label += "  ";
        std::stringstream oss;
        oss << info[i][4];
        label += oss.str();
        cv::putText(img, label, cv::Point(info[i][0] * w / 640.0, info[i][1] * h / 640.0), 1, 1, cv::Scalar(0, 255, 0), 2);

    }
}

int main()
{
    Ort::Env env;
    Ort::Session session(env, L"D:/studyFiles/VS-project/Visual studio community 2022 file/yolov10_cpp/models/yolov10n.onnx", Ort::SessionOptions{ nullptr });


    Mat src_img = cv::imread("D:/studyFiles/VS-project/Visual studio community 2022 file/yolov10_cpp/images/bus.jpg");
    Mat img;
    cv::resize(src_img, img, cv::Size(640, 640));
    vector<float> img_vector = img2vector(img);
    vector<int64_t> dim = { 1, 3, 640, 640 };
    Ort::Value input_tensor = Ort::Value::CreateTensor<float>(
        Ort::MemoryInfo::CreateCpu(OrtDeviceAllocator, OrtMemTypeCPU),
        img_vector.data(), img_vector.size(),
        dim.data(), dim.size()
    );
    vector<const char*> input_names = { "images" };
    vector<const char*> output_names = { "output0" };
    vector<Ort::Value> output_tensors = session.Run(Ort::RunOptions{ nullptr }, input_names.data(), &input_tensor,
        input_names.size(), output_names.data(), output_names.size());

    float* output = output_tensors[0].GetTensorMutableData<float>();
    //print_float_data(output);
    auto info = float2vector(output);

    draw_box(src_img, info);

    cv::imshow("test", src_img);
    cv::waitKey(0);

    std::cout << "Hello World!\n";
}

// 运行程序: Ctrl + F5 或调试 >“开始执行(不调试)”菜单
// 调试程序: F5 或调试 >“开始调试”菜单

// 入门使用技巧: 
//   1. 使用解决方案资源管理器窗口添加/管理文件
//   2. 使用团队资源管理器窗口连接到源代码管理
//   3. 使用输出窗口查看生成输出和其他消息
//   4. 使用错误列表窗口查看错误
//   5. 转到“项目”>“添加新项”以创建新的代码文件，或转到“项目”>“添加现有项”以将现有代码文件添加到项目
//   6. 将来，若要再次打开此项目，请转到“文件”>“打开”>“项目”并选择 .sln 文件

```

<font style="color:#DF2A3F;">又报错 由于找不到hdf5.dll</font>

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726716080476-8d005cef-4515-47d8-a1d7-2d9d8cf61b71.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726720678008-47ca2cfa-66ef-438a-9bd4-2e6450b40619.png)

python的库文件中

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726721003979-f9af3e49-4573-491e-91e1-8f605b22baa5.png)

放入System32有效果

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726721934717-d6ded26b-811e-4964-a824-0f368f28ce89.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726722216470-9e9423dd-4a51-4621-8117-784793dcf7d2.png)



