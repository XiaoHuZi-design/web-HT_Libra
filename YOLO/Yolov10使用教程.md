[GitHub - THU-MIG/yolov10: YOLOv10: Real-Time End-to-End Object Detection](https://github.com/THU-MIG/yolov10)

## 安装环境
```bash
conda create -n yolov10 python=3.9
conda activate yolov10
pip install -r requirements.txt
pip install -e .  编译一下
```

```bash
pip install -r requirements.txt
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726301072772-5308900f-edf4-46d8-b219-92cbbd96643d.png)

```bash
pip install -e .
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726301375651-fa3197a4-f970-4778-b3db-0a6d522332be.png)

```bash
python app.py
# Please visit http://127.0.0.1:7860
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726301781584-bd116a3f-0a09-4fbd-bd60-ae2ddd7b7878.png)

更改：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726302211479-11d967e3-d640-4e5f-872b-c3226eabd2fb.png)

再次运行demo：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726302249430-383d6aff-154c-456f-b6d8-e5d49870006f.png)

进入web-ui界面：

Running on local URL:  [http://127.0.0.1:7860](http://127.0.0.1:7860)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726302329598-74c3a815-cca0-4add-b0cc-1b7c8f541c9b.png)

1. Download this file: [https://cdn-media.huggingface.co/frpc-gradio-0.2/frpc_windows_amd64.exe](https://cdn-media.huggingface.co/frpc-gradio-0.2/frpc_windows_amd64.exe)

2. Rename the downloaded file to: frpc_windows_amd64_v0.2

3. Move the file to this location: D:\Anaconda\envs\yolov10\lib\site-packages\gradio

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726302854276-11700055-917c-4d14-b630-38f9bfac2897.png)

可能会报毒

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726303108359-6ac14206-9df5-49e0-b39b-c8fc4dadb652.png)



还是错误不知道为啥

For further information visit [https://errors.pydantic.dev/2.9/u/schema-for-unknown-type](https://errors.pydantic.dev/2.9/u/schema-for-unknown-type)



**端口web-ui界面可能会报错，但不影响后面自己训练模型**



## 正文
**********************************************正文*********************************************************

下载预训练模型放置与weights目录

```plain
# yolo predict model = weights/yolov10n.pt   默认读取yolov10/ultralytics/assets下所有图像
```

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1726723178690-1dd228be-1273-4ae2-9130-9fbcd581edb2.jpeg)![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1726723189547-9a4313fd-27b2-4f33-a342-db3afa741531.jpeg)

**训练自己的数据集**

```plain
# yolo predict model = weights/yolov10n.pt   默认读取yolov10/ultralytics/assets下所有图像
# yolo predict model = yolov10s.pt source='xxx/bus.jpg'
# yolo predict model = yolov10s.pt source='xxx/bus.mp4'

#  yolo detect train data=ultralytics/cfg/datasets/coco.yaml model=ultralytics/cfg/models/v10/yolov10n.yaml epochs=50 batch=4 imgsz=640 device=0
#  yolo detect train data=coco.yaml model=yolov10n.yaml epochs=10 batch=4 imgsz=640 device=0  device是gpu模式，0代表一个显卡

#  yolo detect train data=coco.yaml model=yolov10n/s/m/b/l/x.yaml epochs=500 batch=256 imgsz=640 device=0,1,2,3,4,5,6,7
#  yolo val model=jameslahm/yolov10{n/s/m/b/l/x} data=coco.yaml batch=256
#  yolo predict model=jameslahm/yolov10{n/s/m/b/l/x}

# pip install torch==2.0.1+cu117 torchvision==0.15.2+cu117 -f https://download.pytorch.org/whl/cu117/torch_stable.html
# -i https://pypi.tuna.tsinghua.edu.cn/simple/

#yolo detect train data=datasets/strawberry/data.yaml model=weights/yolov10n.pt epochs=10 batch=4 imgsz=640 device=0
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726723022635-d888cbfe-05d1-497c-9773-a880a730b2b3.png)

暂时安装的cpu版本pytorch

```plain
# pip install torch==2.0.1+cu117 torchvision==0.15.2+cu117 -f https://download.pytorch.org/whl/cu117/torch_stable.html
# -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

数据集配置

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726722774402-7d5b8a79-98b3-4de5-b290-b87bfed1684e.png) 数据集还是yolov8一样

```plain
yolo detect train data=datasets/strawberry/data.yaml model=weights/yolov10n.pt epochs=10 batch=4 imgsz=640

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726722634204-eac91aa1-b9e7-4b1a-9b46-7f41a3bb98b6.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726722906659-9d8774d5-bede-4f05-bcf5-782ae362032d.png)

```plain
# yolo predict model = runs/detect/train/weights/best.pt source='datasets/strawberry/images/strawberry.jpg'
```

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1726723488523-f9bae622-a6ff-436b-8820-82d496bedaf2.jpeg)



```bash
yolo export model=weights/yolov10n.pt format=onnx opset=13 simplify
# yolo predict model=weights/yolov10n.onnx
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726724362546-8da86c31-9236-46aa-82f4-3aca7d7f55d8.png)

```bash
yolo export model=runs/detect/train/weights/best.pt format=onnx opset=13 simplify
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726724775812-ba3f3a60-5b0a-4d21-b2d6-57b65e6d6482.png)

```bash
(yolov10) PS D:\studyFiles\Py-project1\target_detection\yolov10\yolov10-main> yolo export model=runs/detect/train/weights/best.pt format=onnx opset=13 simplify
ONNX: simplifying with onnxslim 0.1.31...
ONNX: export success ✅ 1.5s, saved as 'runs\detect\train\weights\best.onnx' (8.9 MB)

Export complete (3.9s)
Results saved to D:\studyFiles\Py-project1\target_detection\yolov10\yolov10-main\runs\detect\train\weights
Predict:         yolo predict task=detect model=runs\detect\train\weights\best.onnx imgsz=640
Validate:        yolo val task=detect model=runs\detect\train\weights\best.onnx imgsz=640 data=datasets/strawberry/data.yaml
Visualize:       https://netron.app
💡 Learn more at https://docs.ultralytics.com/modes/export

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726724907506-24e1164b-d1e2-4318-a6b9-0cb887a3b034.png)

C++推理

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1726725189238-1303534b-6965-4afa-ad50-16a10dd925ee.png)怎么没有上面python效果好！



```bash
yolo predict model = runs/detect/train/weights/best.onnx source='datasets/strawberry/images/strawberry.jpg'
```

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1726725466614-5a2615c6-d346-483d-9a3a-d316819a0d61.jpeg)是一样的效果啊！怎么C++这个不一样

