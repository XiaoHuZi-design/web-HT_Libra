<p><pwd value="632147"  pwd="" url="_media/get_password.jpg">
# 前言
## 1、什么是数字图像
一幅图像可以定义为一个二维函数f(x,y)，其中x和y是空间（平面）坐标，而f在任意坐标(x,y)处的幅度称为图像在该点处的亮度或灰度。当x、y和f的幅度值都是有限的离散值时，称该图像为数字图像。

数字图像由有限数量的元素组成，每个元素都有一个特定的位置和数值。这些元素称为图画元素，图像元素或像素。

## 2、数字图像的表示
由数值f(x,y)组成的一个阵列（矩阵）表示，可以用公式将一个M×N矩阵表示为

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725187200147-6dc4f735-996a-4040-a575-2314d4485d6b.png)

右边实数矩阵表示数字图像，每个元素称为像素。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725187235177-759a6898-bd3a-4dd4-89c3-9902ac262923.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725187241886-6e3431ad-5d2f-4222-bbe9-a7ba7b2cb550.png)

图像数字化要求对M值、N值和离散灰度级数L进行判定。对于M和N,除必须取正整数外并无其他限制。然而，出于存储和量化硬件的考虑，灰度级数通常取2的整数次幂，即

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725187289841-0aa90f8b-3e48-4609-995b-cae148ef9a63.png)

式中，k是整数。假设离散灰度级是等间隔的，且它们是区间[0,L-1]内的整数。



## 特别篇：如何访问像素
```plain
访问（j,i）处像素
以8位（0~255）灰度图像和BGR彩色图像为例，用at可以访问图像像素：
//灰度图像
image.at<uchar>(j, i) //j为行数，i为列数
//BGR彩色图像   Vec3f或Vec3b
image.at<Vec3b>(j, i)[0] //B分量
image.at<Vec3b>(j, i)[1] //G分量
image.at<Vec3b>(j, i)[2] //R分量

```

灰度级越大，图像的颜色越偏向白色；灰度级越小，图像的颜色越偏向黑色。



# 基本操作
## 1.图像读取与显示
```cpp
#include <iostream>
#include <opencv2/opencv.hpp> //汇总了图像处理相关的所有头文件（15个）  只要这一个就行

using namespace cv;
using namespace std;

int main()
{			
	//D:\\新桌面\\漫画人物壁纸\\1648229235164_1648228777745.jpg
	//string path = R"(A005.png)";	//图片的路径名 R"(相对路径 文件粘贴在主文件目录下为文件名 或 绝对路径\\ 或 /)"
	string path = "A005.png";
	Mat img = imread(path);		//将图片加载后赋值到图像变量img中

	//Mat类是OpenCV库中用于表示图像或矩阵的一个核心数据结构，imread 函数在未能正确加载图片时返回的是一个空的 Mat 对象，因此你应该检查 img.empty() 而不是 path.empty()
	//检查文件是否打开 没打开时执行打印语句
	if (img.empty()) { 
		cout << "file not loaded" << endl; 
		return -1;  //结束程序运行
	}
	
	namedWindow("Image", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全
	imshow("Image", img);//创建一个窗口来显示图像img
	waitKey(0);//不断刷新图像
	return 0;
}


/*
1、waitKey()函数的功能是不断刷新图像，频率为delay，单位是ms。
2、delay为0时，则会一直显示这一帧。
3、delay不为0时，则在显示完一帧图像后程序等待“delay"ms再显示下一帧图像。
*/
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725256206562-80321c57-90c4-4615-981e-57eb36c95d25.png)

## 2.图像预处理
```cpp
#include <iostream>
#include <opencv2/opencv.hpp>  //汇总了图像处理相关的所有头文件（15个）  只要这一个就行
//#include<vector>    //std::vector是一个动态数组，可以自动调整大小

using namespace cv;
using namespace std;

int main() {

	string path = "A005.png";
	Mat img = imread(path);

	Mat imgGray, imgBlur, imgCanny, imgDil, imgErode;  //创建空的数据矩阵

	//将照片转换为灰度
	cvtColor(img, imgGray, COLOR_BGR2GRAY);

	//高斯模糊  (输入图像，输出图像，高斯内核（宽，高）【可以不同，必正奇数】，x反向偏差，y方向偏差（若y是0，则函数会自动使y与x相同，若x和y都是0，xy将由高斯内核的两个值计算而来））
	GaussianBlur(imgGray, imgBlur, Size(3, 3), 3, 0);

	//Canny边缘检测器  一般在使用Canny边缘检测器之前会做一些模糊处理  第3和第4个参数分别代表底阈值和高阈值，其中底阈值常取高阈值的1/2或1/3
	Canny(imgBlur, imgCanny, 25, 75);

	//创建一个可以使用膨胀的内核
	Mat kernel = getStructuringElement(MORPH_RECT, Size(3, 3));
	//图像膨胀
	dilate(imgCanny, imgDil, kernel);
	//图像侵蚀
	erode(imgDil, imgErode, kernel);


	//结果呈现  WINDOW_FREERATIO和WINDOW_NORMAL是OpenCV中用于窗口显示的两种模式
	namedWindow("Image", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全
	imshow("Image", img);
	namedWindow("Image Gray", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全
	imshow("Image Gray", imgGray);
	namedWindow("Image Blur", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全
	imshow("Image Blur", imgBlur);
	namedWindow("Image Canny", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全
	imshow("Image Canny", imgCanny);
	namedWindow("Image Dilation", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全
	imshow("Image Dilation", imgDil);
	namedWindow("Image Erode", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全
	imshow("Image Erode", imgErode);


	waitKey(0);
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725256585500-301fd310-cf13-4b5f-bcc2-c2422dc13280.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725256605156-02c09bfb-841e-47ee-b781-87fedecf156b.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725256620448-07a0d51f-a329-4b4f-a809-770694220f5b.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725256636412-25133c70-bcd3-47fd-a159-a3818a05acad.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725256649333-01e00c48-fce5-4e95-8b85-cbab9c19c2d8.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725256664370-d31347b5-a8a4-48a7-9440-ad26b2d70dd3.png)

## 3.图像裁剪
```cpp
#include <iostream>
#include <opencv2/opencv.hpp>  //汇总了图像处理相关的所有头文件（15个）  只要这一个就行

using namespace cv;
using namespace std;

void main() {

	string path = "A005.png";
	Mat img = imread(path);
	Mat imgResize, imgCrop;

	//调整图像大小
	cout << img.size() << endl;   //查看原图像的大小
	//resize(img, imgResize, Size(640, 480));   //按自定义的宽度与高度缩放
	resize(img, imgResize, Size(), 0.5, 0.5); //按比例缩放

	//图像裁剪
	Rect roi(200, 100, 300, 300);
	//前面两个参数为距左上原点的x方向与y方向的距离，后两个参数为延伸的x，y长度
	imgCrop = img(roi);

	imshow("Image", img);
	imshow("Image Resize", imgResize);
	imshow("Image Crop", imgCrop);

	waitKey(0);
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725272290224-69267621-fd17-4c50-a7bd-43dfe3c82ce5.png)

## 4.图像堆叠拼接
```cpp
/*
#include <iostream>
#include <opencv2/opencv.hpp>
#include <vector>

int main()
{
	//图片深度要一样
	cv::Mat image = cv::imread("B1.png");
	cv::Mat image2 = cv::imread("B2.png");

	cv::Mat output;
	cv::hconcat(image, image2, output);

	// 创建一个窗口并显示图像    WINDOW_FREERATIO和WINDOW_NORMAL是OpenCV中用于窗口显示的两种模式
	cv::namedWindow("hcontact", cv::WindowFlags::WINDOW_NORMAL);

	cv::imshow("hcontact", output);

	cv::waitKey(0);

	return 0;
}
*/
```

```cpp
//把多张图片水平拼接

#include <iostream>
#include <opencv2/opencv.hpp>
#include <vector>

int main()
{
    #if 0 
    //不知道为啥拼接是黑的看不到图片
    cv::Mat image = cv::imread("tubiao/setting.png");
    cv::Mat image2 = cv::imread("tubiao/save.png");
    cv::Mat image3 = cv::imread("tubiao/picture.png");
    #else
    cv::Mat image = cv::imread("B1.png");
    cv::Mat image2 = cv::imread("B1.png");
    cv::Mat image3 = cv::imread("B1.png");
    #endif
    std::vector<cv::Mat> images;
    images.push_back(image);
    images.push_back(image2);
    images.push_back(image3);

    cv::Mat output2;
    cv::hconcat(images, output2);

    // 创建一个窗口并显示图像    WINDOW_FREERATIO和WINDOW_NORMAL是OpenCV中用于窗口显示的两种模式
    cv::namedWindow("hcontact2", cv::WindowFlags::WINDOW_NORMAL);

    cv::imshow("hcontact2", output2);
    cv::waitKey(0);

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725272612671-1f814320-92c9-4d5e-ad82-6ed6061cafd6.png)

## 5.绘制形状和添加文本
```cpp
#include <iostream>
#include <opencv2/opencv.hpp>  //汇总了图像处理相关的所有头文件（15个）  只要这一个就行
using namespace cv;
using namespace std;
//绘制形状和添加文本
void main() {
	//创建空白图像  img(宽度，高度，BGR彩色图像，初始化每个像素的值（白色））  黑色（0,0,0）
	Mat img(512, 512, CV_8UC3, Scalar(255, 255, 255));

	//绘制圆形 线条宽度为10
	circle(img, Point(256, 256), 155, Scalar(0, 69, 255),10);  
	//circle(img, Point(256, 256), 155, Scalar(0, 69, 255), FILLED，10);
	//函数参数分别是 输出到图像img，圆心，半径，颜色，厚度（FILLED 表示填满）

	//绘制矩形
	rectangle(img, Point(130, 226), Point(382, 286), Scalar(255, 255, 255), FILLED);
	//函数参数分别是 输出到图像img，矩形左上角顶点坐标，右下角顶点坐标，颜色，厚度

	//绘制线段
	line(img, Point(130, 296), Point(382, 296), Scalar(255, 255, 255), 2);
	//函数参数分别是 输出到图像img，两个端点坐标，颜色，厚度

	//添加文本  OpenCV支持多种Hershey字体，例如FONT_HERSHEY_SIMPLEX, FONT_HERSHEY_PLAIN, FONT_HERSHEY_DUPLEX等。
	putText(img, "Murtaza's Workshop", Point(137, 262), FONT_HERSHEY_DUPLEX, 0.75, Scalar(0, 69, 255), 2);
	//函数参数分别是 输出到图像img，文本内容，左下角起点，字体，大小，颜色，厚度

	imshow("Image", img);

	waitKey(0);
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725256992321-2f4b51cb-af17-42c0-8a1d-20300be30261.png)

## 6.透视变换
```cpp
#include <iostream>
#include <opencv2/opencv.hpp>  //汇总了图像处理相关的所有头文件（15个）  只要这一个就行
using namespace cv;
using namespace std;

float w = 250, h = 350;
Mat matrix, imgWarp;   //matrix将用于存储透视变换矩阵，imgWarp将用于存储变换后的图像。
// 透视变换
void main() {

	string path = "card.png";
	Mat img = imread(path);

	//包含4个Point2f类型元素的数组，表示源图像上的四个点。 Point2f是一个二维点，由两个浮点数表示，这里是四个点的坐标
	//Point2f src[4] = { {529,142},{771,190},{405,395},{674,457} };


	/*
	* 可以利用Halcon放大器标点读值 像素的位置
*   Q的坐标
*  （322,9）          （276,279）
*  （628,35）         （567,342）

*   J的坐标
*   （106,715）   （83,953）
*   （352,781）   （327,1050）

*   9的坐标
*   (383,677)      (434,957)
*   (700,586)      (753,912)
	*/


	//用Halcon  放大镜找出Q的四点位置（行，列） （322,9）          （276,279）     （628, 35）         （567, 342）
	//Point2f src[4] = { {9,322},{279,276},{35,628},{342,567} };
	//J的四点位置
	Point2f src[4] = { {715,106},{953,83},{781,352},{1050,327} };
	//9的四点位置
	//Point2f src[4] = { {677,383},{957,434},{586,700},{912,753} };

	Point2f dst[4] = { {0.0f,0.0f},{w,0.0f},{0.0f,h},{w,h} };   //这四个点定义了透视变换后新图像的坐标位置

	matrix = getPerspectiveTransform(src, dst);//获取原图像四边形到目标图像四边形的透视变换矩阵
	//src为源图像四边形顶点坐标，dst为目标图像对应的四边形顶点坐标
	warpPerspective(img, imgWarp, matrix, Point(w, h));
	//参数分别为 输入图像，输出图像，透视变换矩阵，图像大小（宽，高）

	for (int i = 0; i < 4; i++)
	{
		circle(img, src[i], 10, Scalar(0, 0, 255), FILLED);
	}//在原图像中标记目标顶点

	imshow("Image", img);
	imshow("Image Warp", imgWarp);

	waitKey(0);
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725272394170-eb9622a1-95c3-45f1-adfe-b889d93d6fc6.png)

## 7.颜色变换
```cpp
#include <iostream>
#include <opencv2/opencv.hpp>  //汇总了图像处理相关的所有头文件（15个）  只要这一个就行

using namespace cv;
using namespace std;

Mat imgHSV, mask;
int hmin = 0, smin = 0, vmin = 0;
int hmax = 179, smax = 255, vmax = 255;

void main() {

	string path = "海绵宝宝01.jpg";
	Mat img = imread(path);
	//色彩空间转换函数-cvtColor
	cvtColor(img, imgHSV, COLOR_BGR2HSV);
	//HSV颜色空间  H（色调）：0~180  S（饱和度）：0~255  V（亮度）：0~255

	namedWindow("Trackbars", (640, 200));//创建一个名为Trackbars的窗口，大小为640*200
	createTrackbar("Hue Min", "Trackbars", &hmin, 179);
	createTrackbar("Hue Max", "Trackbars", &hmax, 179);
	createTrackbar("Sat Min", "Trackbars", &smin, 255);
	createTrackbar("Sat Max", "Trackbars", &smax, 255);
	createTrackbar("Val Min", "Trackbars", &vmin, 255);
	createTrackbar("Val Max", "Trackbars", &vmax, 255);
	//createTrackbar函数是创建轨迹条，
	//4个参数分别是 轨迹条名字，输出的窗口，一个指向整数的指针来表示当前的值，可到达的最大值

	while (true)
	{
		//检测我们所要的颜色 设置一个遮罩 在范围内的颜色
		Scalar lower(hmin, smin, vmin);//HSV范围最低值
		Scalar upper(hmax, smax, vmax);//HSV范围最高值
		inRange(imgHSV, lower, upper, mask);//输入，低值，高值，输出
		//inRange是将在阈值区间内的像素值设置为白色（255），而不在阈值区间内的像素值设置为黑色（0）

		imshow("Image", img);
		imshow("Image HSV", imgHSV);
		imshow("Image Mask", mask);

		waitKey(1);
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725257251827-b1caa52c-7086-48d4-8225-7ea713424a80.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725257273511-528a5cf4-218a-4fc7-ad37-7b787a59aed4.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725257449483-87a486f7-8fcc-4422-9ec9-386ef99d59ae.png)

## 8.形状检测和轮廓检测
```cpp
#include <iostream>
#include <opencv2/opencv.hpp>  //汇总了图像处理相关的所有头文件（15个）  只要这一个就行

using namespace cv;
using namespace std;

Mat imgGray, imgBlur, imgCanny, imgDil, imgErode;

//定义一个轮廓处理函数  其目的是从经过预处理的二值图像中提取轮廓，并根据轮廓的特性对其进行分类和标注
void getContours(Mat imgDil, Mat img) {

	//定义了一个二维向量contours,用于存储提取的轮廓信息。每个内部向量表示一个轮廓，而每个轮廓是由一系列的Point组成的。
	vector<vector<Point>> contours; //例如{ {Point(20,30),Point(50,60)},{}, {}} 三个轮廓，第一个轮廓有两个点，第二、三个为空
	//定义了一个向量hierarchy，它包含了多个Vec4i类型的元素。Vec4i是一个包含4个整数的向量。这个hierarchy向量用于存储轮廓之间的层次信息，例如哪个轮廓是外部轮廓，哪个是内部轮廓
	vector<Vec4i>hierarchy; 

	//使用OpenCV的findContours函数从膨胀后的图像中提取轮廓。RETR_EXTERNAL表示只检测最外层轮廓，CHAIN_APPROX_SIMPLE是对轮廓进行压缩，只保留端点。
	findContours(imgDil, contours, hierarchy, RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);

	//使用drawContours函数在图像img上绘制所有的检测到的轮廓。轮廓将以品红色（由Scalar(255, 0, 255)指定）和2像素的厚度绘制
	//drawContours(img, contours, -1, Scalar(255, 0, 255), 2);
	
	//定义了一个新的二维向量conPoly，其大小与检测到的轮廓数量相同。这个向量将用于存储每个轮廓的近似多边形
	vector<vector<Point>>conPoly(contours.size());
	//定义了一个新的向量boundRect，其大小与检测到的轮廓数量相同。这个向量将用于存储每个轮廓的边界矩形（bounding rectangle）
	vector<Rect> boundRect(contours.size());

	for (int i = 0; i < contours.size(); i++)
	{
		//计算轮廓的面积，并根据面积进行过滤，去除可能的噪点
		int area = contourArea(contours[i]);
		cout << area << endl;//需要正确过滤的面积（过滤噪点）

		//定义一个字符串变量objectType，用于存储检测到的形状的名称
		string objectType;
		//判断形状 根据轮廓的面积和顶点数，对形状进行分类（如三角形、矩形、正方形和圆形）。对于矩形和正方形，还计算长宽比以确定其确切的形状。
		if (area > 1000)  //过滤面积较小的轮廓，这些轮廓可能代表噪声或不重要的细节
		{
			float peri = arcLength(contours[i], true); //计算当前轮廓的周长，并将结果存储在变量peri中
			//找到当前轮廓的一个近似多边形，这个多边形将用于后续的形状分类。多边形的精度由参数0.02 * peri控制
			approxPolyDP(contours[i], conPoly[i], 0.02 * peri, true);

			cout << conPoly[i].size() << endl; //输出近似多边形的顶点数，这有助于了解多边形的大致形状
			boundRect[i] = boundingRect(conPoly[i]);//计算近似多边形的边界矩形，并将其存储在boundRect向量中

			int objCor = (int)conPoly[i].size(); //将近似多边形的顶点数转换为整数，并存储在变量objCor中

			//如果多边形有3个顶点，则将其分类为三角形，并将objectType设置为"Tri"
			if (objCor == 3) { objectType = "Tri"; }
			//如果多边形有4个顶点，则进一步检查其长宽比以确定它是正方形还是矩形
			if (objCor == 4) {

				float aspRatio = (float)boundRect[i].width / (float)boundRect[i].height;
				cout << aspRatio << endl;
				if (aspRatio > 0.95 && aspRatio < 1.05) { objectType = "Square"; }
				else {
					objectType = "Rect";
				}
			}
			//如果多边形有超过4个顶点，则将其分类为圆形，并将objectType设置为"Circle"
			if (objCor > 4) { objectType = "Circle"; }

			//使用drawContours函数在原始图像img上绘制轮廓。它绘制的是conPoly中的第i个轮廓（即当前正在处理的轮廓）。
			drawContours(img, conPoly, i, Scalar(255, 0, 255), 2);//描绘计数轮廓 轮廓会以品红色（RGB值为(255, 0, 255)）和2像素的厚度进行绘制
			//使用rectangle函数在原始图像img上绘制一个矩形，该矩形是围绕当前正在处理的轮廓的边界矩形。boundRect[i].tl()返回边界矩形的左上角点，而boundRect[i].br()返回右下角点。
			rectangle(img, boundRect[i].tl(), boundRect[i].br(), Scalar(0, 255, 0), 5);//绘制边界矩形 矩形会以绿色（RGB值为(0, 255, 0)）和5像素的厚度进行绘制

			//打印图形的名字  在原始图像上的边界矩形的上方标注形状的名称（如"Tri"、"Square"、"Rect"或"Circle"） 
			// 文本会标注在边界矩形的左上角，具体位置是矩形的x坐标不变，y坐标减去5个像素。
			// 使用的字体是FONT_HERSHEY_PLAIN，字体大小为1，文本颜色为蓝紫色（RGB值为(0, 69, 255)），并且文本线的厚度为2像素。
			putText(img, objectType, { boundRect[i].x,boundRect[i].y - 5 }, FONT_HERSHEY_PLAIN, 1, Scalar(0, 69, 255), 2);
		}
	}
}

void main() {

	//从指定路径读取一个名为"contours.png"的图像
	//string path = "contours.png";
	string path = "xz.png";
	Mat img = imread(path);

	//图像的预处理
	//1.将照片转换为灰度图像,有助于简化图像处理过程，因为灰度图像只有一个通道
	cvtColor(img, imgGray, COLOR_BGR2GRAY);
	//2.高斯模糊，以减少图像中的噪声
	GaussianBlur(imgGray, imgBlur, Size(3, 3), 3, 0);
	//3.Canny边缘检测,使用Canny算法检测图像中的边缘
	Canny(imgBlur, imgCanny, 25, 75);
	//4.创建一个可以使用膨胀的内核  定义了一个3x3的结构元素（用于形态学操作），然后使用该元素对Canny边缘检测的结果进行膨胀
	Mat kernel = getStructuringElement(MORPH_RECT, Size(3, 3));  
	//5.图像膨胀  在进行轮廓检测之前，对Canny边缘检测的结果进行膨胀操作，可以增强轮廓并去除噪声。
	dilate(imgCanny, imgDil, kernel);

	//获取并显示轮廓  
	getContours(imgDil, img);

	// 显示处理后的图像
	imshow("Image", img);

	//imshow("Image Gray", imgGray);
	//imshow("Image Blur", imgBlur);
	//imshow("Image Canny", imgCanny);
	//imshow("Image Dilation", imgDil);

	waitKey(0); 
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725257538910-4ef7bad2-6947-4494-80bd-0dd512237c58.png)

## 9.人脸识别
```cpp
#include <iostream>
#include <opencv2/opencv.hpp>  //汇总了图像处理相关的所有头文件（15个）  只要这一个就行

using namespace cv;
using namespace std;

void main() {

	//string path = "B3.jpg";
	string path = "person.jpg";
	Mat img = imread(path);

	CascadeClassifier faceCascade;//创建级联分类器
	//载入训练模型  这是OpenCV库中一个常用于面部检测的模型  在sources/data/haarcascades_cuda文件夹中 D:/OpenCV - 4.8.1/opencv/sources/data/haarcascades_cuda/haarcascade_frontalface_default.xml
	faceCascade.load("haarcascade_frontalface_default.xml");

	if (faceCascade.empty()) { cout << "XML file not loaded" << endl; }
	//检查文件是否打开 没打开时执行打印语句

	vector<Rect>faces;//创建人脸存放的vector
	// faceCascade.detectMultiScale(img, faces, scaleFactor, minNeighbors);  
	// faces：这是一个输出向量，用于存储检测到的人脸的矩形区域  scaleFactor：通常设置为1.1  minNeighbors：指定每一个目标至少被检测到几次才算是真的目标。通常设置为3-6。
	faceCascade.detectMultiScale(img, faces, 1.1, 10);
	//detectMultiScale函数可以检测出图片中所有的人脸，并用vector保存各个人脸的坐标、大小

	//使用try-catch语句捕获异常，并打印出更详细的错误信息
	try {
		faceCascade.detectMultiScale(img, faces, 1.1, 10);
	}
	catch (cv::Exception& e) {
		std::cerr << e.what() << std::endl;
	}

		//在原图像中画出人脸矩形边框
	for (int i = 0; i < faces.size(); i++)
	{
		rectangle(img, faces[i].tl(), faces[i].br(), Scalar(255, 0, 255), 3);
	}

	imshow("Image", img);

	waitKey(0);
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725257670599-d0543ced-b23a-4cea-ad7f-fbc153d13472.png)

# 图像增强
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725187537246-05096ed0-b541-4b6c-98b4-b1fb82c7c715.png)

## 一、灰度变换
灰度变换可使图像动态范围增大，图像对比度扩展，图像变清晰，特征明显。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725187704950-b5d2fd48-5c12-4cd3-85ab-534f5666409f.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725187716292-e79a2204-acd6-40a9-b88d-1a446f7cb89d.png)

图像反转就是线性变换的一种

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725187745033-556c99d3-887f-4523-82f1-e6103a165b22.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725187758982-0b28201b-5944-4279-9ebc-a6ac8a3ff49f.png)

### ①线性变换
线性变换：原理：线性变换是一种简单的亮度和对比度调整方法，通过对每个像素的灰度级别应用线性变换公式来实现。对每个像素应用公式 output_pixel = input_pixel * alpha + beta，其中 alpha 控制对比度，beta 控制亮度。增大 alpha 值可以增加对比度，增大 beta 值可以增加亮度。

```plain
/*
线性变换（亮度和对比度调整）：
原理：线性变换是一种简单的亮度和对比度调整方法，通过对每个像素的灰度级别应用线性变换公式来实现。
对每个像素应用公式 output_pixel = input_pixel * alpha + beta，其中 alpha 控制对比度，beta 控制亮度。增大 alpha 值可以增加对比度，增大 beta 值可以增加亮度。
*/
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
    Mat image1, output_image, image1_gray;   //定义输入图像，输出图像，灰度图像
    image1 = imread("person.jpg");  //读取图像；
    if (image1.empty())
    {
        cout << "读取错误" << endl;
        return -1;
    }

    cvtColor(image1, image1_gray, COLOR_BGR2GRAY);  //灰度化
    imshow(" image1_gray", image1_gray);   //显示灰度图像

    output_image = image1_gray.clone();
    for (int i = 0; i < image1_gray.rows; i++)
    {
        for (int j = 0; j < image1_gray.cols; j++)
        {
            output_image.at<uchar>(i, j) = 1.5 * double(image1_gray.at<uchar>(i, j)) + 30;  //线性变换 s=1.5r+30
        }
    }
    normalize(output_image, output_image, 0, 255, NORM_MINMAX);  //图像归一化，转到0~255范围内
    convertScaleAbs(output_image, output_image);  //数据类型转换到CV_8U
    imshow(" output_image", output_image);  //显示变换图像


    waitKey(0);  //暂停，保持图像显示，等待按键结束
    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200028196-9456d52a-1e2c-4942-8e84-924c12038a27.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200036807-ea68734b-7855-44d1-be1e-078f77048c2d.png)



```plain
/*
灰度反转：将图像亮暗对调，可以增强图像中暗色区域细节
s = T(r) = L - 1 - r

其中L为图像灰度级，0~255灰度图像的灰度级为256.
*/
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image1, output_image, image1_gray;   //定义输入图像，输出图像，灰度图像
	image1 = imread("person.jpg");  //读取图像；
	if (image1.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	cvtColor(image1, image1_gray, COLOR_BGR2GRAY);  //灰度化
	imshow(" image1_gray", image1_gray);   //显示灰度图像

	output_image = image1_gray.clone();
	for (int i = 0; i < image1_gray.rows; i++)
	{
		for (int j = 0; j < image1_gray.cols; j++)
		{
			output_image.at<uchar>(i, j) = 256 - 1 - image1_gray.at<uchar>(i, j);  //灰度反转
		}
	}
	imshow("output_image", output_image);  //显示反转图像


	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200306637-25d5d423-0e20-45a9-b358-758a8cc290bc.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200315115-98cad7a6-8368-496e-adfe-e674ab491fc1.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200345045-966ca51b-4a3b-49fd-bc06-6389ab8d4985.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200357892-1dc660a3-9717-4e3f-8659-21a9a3dc16b6.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200368314-d9efa7b9-4013-4704-9736-40444566ce66.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200397111-31b36917-6759-4572-81b2-a321c651a730.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200409096-69ce4bd8-f6ce-40af-8cb5-cd840afb0b9a.png)

### ②对数变换
对数变换：原理：对数变换通过应用对数函数对图像的每个像素值进行修改。这种变换适用于增强图像的低灰度级别，因为它拉伸了低灰度级别之间的差异。公式为 output_pixel = c * log(1 + input_pixel)，其中 c 是缩放常数。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200511271-51c330a3-141b-46f7-8a80-934ceb65156c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200523918-944f551e-62c8-497f-8c38-e9c82c2b2d94.png)

```plain
/*
对数变换：
原理：对数变换通过应用对数函数对图像的每个像素值进行修改。这种变换适用于增强图像的低灰度级别，因为它拉伸了低灰度级别之间的差异。
公式为 output_pixel = c * log(1 + input_pixel)，其中 c 是缩放常数。
*/
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
    Mat image1, output_image, image1_gray;   //定义输入图像，输出图像，灰度图像
    image1 = imread("person.jpg");  //读取图像；
    if (image1.empty())
    {
        cout << "读取错误" << endl;
        return -1;
    }

    cvtColor(image1, image1_gray, COLOR_BGR2GRAY);  //灰度化
    imshow(" image1_gray", image1_gray);   //显示灰度图像

    output_image = image1_gray.clone();
    for (int i = 0; i < image1_gray.rows; i++)
    {
        for (int j = 0; j < image1_gray.cols; j++)
        {
            output_image.at<uchar>(i, j) = 6 * log((double)(image1_gray.at<uchar>(i, j)) + 1);  //对数变换 s=6*log(r+1)
        }
    }
    normalize(output_image, output_image, 0, 255, NORM_MINMAX);  //图像归一化，转到0~255范围内
    convertScaleAbs(output_image, output_image);  //数据类型转换到CV_8U
    imshow(" output_image", output_image);  //显示变换图像


    waitKey(0);  //暂停，保持图像显示，等待按键结束
    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200649488-2844a603-688e-4456-b41c-f4e228074ef9.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200656156-d0de8af5-5454-46ff-bcaf-0acfc1eda5b4.png)

### ③伽马变换
伽马变换：原理：伽马变换通过应用幂函数对图像的每个像素值进行修改。伽马校正可以用于调整图像的对比度和亮度。公式为 output_pixel = c * (input_pixel ^ gamma)，其中 c 是缩放常数，gamma 是伽马值。增大 gamma 值可以增加对比度。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200736490-de1e86f7-5b8b-4961-84e4-f20066939212.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200746553-affffb33-a67e-4030-838c-f2751c781440.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200762038-67bfd4b4-db5b-4164-9173-fef8578e7865.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200773206-c9bebdd1-2d08-49a2-9c2a-6af9305b9c99.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200785546-bae5a1d2-c35f-4485-be05-523ef94d36e9.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200795490-b8b4f555-0d3b-4f9f-b9ad-9ea02593ce5c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200803478-67e0495c-3d3a-418f-8d58-a9d68a291df0.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725200815173-3f17b87e-b223-45ce-84d3-e61b82a11b62.png)

```cpp
//uchar用于单通道灰度图像，Vec3f和Vec3b用于三通道彩色图像，但前者使用浮点数表示颜色值，后者使用字节表示。

/*
伽马校正：
原理：伽马校正通过应用幂函数对图像的每个像素值进行修改。伽马校正可以用于调整图像的对比度和亮度。
公式为 output_pixel = c * (input_pixel ^ gamma)，其中 c 是缩放常数，gamma 是伽马值。增大 gamma 值可以增加对比度。
*/
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
    Mat image1, output_image, image1_gray;   //定义输入图像，输出图像，灰度图像
    image1 = imread("person.jpg");  //读取图像；
    if (image1.empty())
    {
        cout << "读取错误" << endl;
        return -1;
    }

    cvtColor(image1, image1_gray, COLOR_BGR2GRAY);  //灰度化
    imshow(" image1_gray", image1_gray);   //显示灰度图像

    output_image = image1_gray.clone();
    for (int i = 0; i < image1_gray.rows; i++)
        {
            for (int j = 0; j < image1_gray.cols; j++)
                {
                    output_image.at<uchar>(i, j) = 6 * pow((double)image1_gray.at<uchar>(i, j), 0.5);  //幂律变换 s=6*r^0.5
                }
        }
    normalize(output_image, output_image, 0, 255, NORM_MINMAX);  //图像归一化，转到0~255范围内
    convertScaleAbs(output_image, output_image);  //数据类型转换到CV_8U
    imshow(" output_image", output_image);  //显示变换图像


    waitKey(0);  //暂停，保持图像显示，等待按键结束
    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201015479-70f4022e-daf4-49f9-a6a4-2d4b1217007f.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201021853-c109a885-7053-4f94-b1db-e3ac94c5b749.png)



```cpp
#include<iostream>
#include <opencv2/opencv.hpp>  
#include <cmath>  

// 使用给定的伽马值对彩色图像进行伽马变换  
cv::Mat gammaTransformation(const cv::Mat& image, double gamma) {
    cv::Mat transformedImage;

    // 将图像转换为浮点型，以避免整数溢出  
    image.convertTo(transformedImage, CV_32F);

    // 手动应用伽马变换公式  
    for (int y = 0; y < transformedImage.rows; ++y) {
        for (int x = 0; x < transformedImage.cols; ++x) {
            for (int c = 0; c < transformedImage.channels(); ++c) {
                // 获取当前像素的值  
                float pixelValue = transformedImage.at<cv::Vec3f>(y, x)[c];

                // 应用伽马变换：先将像素值归一化到[0, 1]，然后应用伽马变换，最后再映射回[0, 255]  
                pixelValue = std::pow(pixelValue / 255.0, gamma) * 255.0;

                // 将处理后的像素值存回图像中  
                transformedImage.at<cv::Vec3f>(y, x)[c] = pixelValue;
            }
        }
    }

    // 将浮点图像转换回8位无符号整数格式  
    transformedImage.convertTo(transformedImage, CV_8U);
    return transformedImage;
}

int main() {
    // Load an image  
    cv::Mat image = cv::imread("person.jpg");
    if (image.empty()) {
        std::cerr << "Could not open or find the image" << std::endl;
        return -1;
    }

    // Apply gamma transformation  
    double gamma = 2.0; // Example gamma value  
    cv::Mat gammaCorrectedImage = gammaTransformation(image, gamma);

    // Save the gamma-corrected image  
    //cv::imwrite("gamma_corrected_image.jpg", gammaCorrectedImage);

    cv::imshow("origin_image", image);
    cv::imshow("gamma_corrected_image", gammaCorrectedImage);
    cv::waitKey(0);  //暂停，保持图像显示，等待按键结束

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201197395-d3878699-6d90-4c9d-b3e4-67a69ccee34e.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201204091-7e32f6f8-eea9-4931-96da-7b0d7fc8a68d.png)



```cpp
线性变换，对数变换和伽马变换通常需要进行归一化，尤其是在将变换后的像素值映射回原始图像的数据范围（通常是[0, 255]）时。归一化的目的是确保变换后的像素值落在有效的显示和存储范围内。

cv::Mat src; // 假设这是一个浮点类型的图像  
cv::Mat dst; // 用于存储归一化后的图像  
  
// 将浮点图像进行最小-最大归一化到0-255范围，并转换为8位无符号整数图像  
cv::normalize(src, dst, 0, 255, cv::NORM_MINMAX, CV_8U);

```



## 二、灰度直方图
灰度直方图反映的是一幅图像中灰度级与各灰度级像素出现的频率之间的关系。以灰度级为横坐标，纵坐标为灰度级的频率，绘制频率同灰度级的关系就是灰度直方图。频率计算公式为

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201357802-080013a0-2ede-49ed-aa6d-f3783c5e854d.png)

式中：  ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201389909-1acbc454-618e-474c-a244-76e2bc004d47.png)是图像中灰度为i的像素数，n为图像总像素数。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201415048-682ccba3-8afd-4edf-8865-230cc232e1b7.png)

```cpp
#include<iostream>
#include<opencv2/opencv.hpp>
using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, hist;   //定义输入图像，灰度图像, 直方图  img/red_panda.jpg   img/white_panda.jpg  img/orange.jpg   img/football_ball.jpg   img/baseball_ball.png     
	image = imread("cat.jpg");  //读取图像；cat.jpg   LenaNoise.png   img/hand.jpg  img/black_to_white.jpg  img/early_1800.jpg   A013.jpg   person.jpg  
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	cvtColor(image, image_gray, COLOR_BGR2GRAY);  //灰度化           关联  HSV（色相，饱和度和明度）化是：COLOR_BGR2HSV
    //namedWindow("image_gray", WINDOW_FREERATIO);//创建一个可调节的窗口 以免图片显示不全
	imshow("image_gray", image_gray);   //显示灰度图像

	//获取图像直方图
	int histsize = 256;
	float ranges[] = { 0,256 };
	const float* histRanges = { ranges };
	calcHist(&image_gray, 1, 0, Mat(), hist, 1, &histsize, &histRanges, true, false);

	//创建直方图显示图像
	int hist_h = 300;//直方图的图像的高
	int hist_w = 512; //直方图的图像的宽
	int bin_w = hist_w / histsize;//指定每个等级直方图条形的宽度,2
	Mat histImage(hist_h, hist_w, CV_8UC3, Scalar(0, 0, 0));//黑色图片上绘制直方图显示的图像

	//绘制并显示直方图
	normalize(hist, hist, 0, hist_h, NORM_MINMAX, -1, Mat());//归一化直方图
	for (int i = 1; i < histsize; i++)
	{
        // 直方图是以条形图的形式从图像的底部开始绘制的，每个条形的顶部对应着该直方图条目的值，但实际左上角才是图像原点
        // hist_h - cvRound(hist.at<float>(i - 1)) 这个表达式计算的是每个直方图条目的顶部在图像中的y坐标
		line(histImage, Point((i - 1) * bin_w, hist_h - cvRound(hist.at<float>(i - 1))),
			Point((i)*bin_w, hist_h - cvRound(hist.at<float>(i))), Scalar(255, 0, 0), 2, 8, 0);    //BGR 蓝色
	}

	namedWindow("histImage", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全
	imshow("histImage", histImage);

	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201590908-dd12f1a0-72b9-498a-aebe-6e8dd90075f7.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201597689-ba202655-95a4-449f-8a45-71439b4efb2d.png)

```cpp

#include <iostream>
#include <opencv2/opencv.hpp>

using namespace std;
using namespace cv;

//显示彩色图像三通道直方图
void showHist(Mat& img, Mat& dst)
{
    //1、创建3个矩阵来处理每个通道输入图像通道。
    //我们用向量类型变量来存储每个通道，并用split函数将输入图像划分成3个通道。
    vector<Mat>bgr;
    split(img, bgr);

    //2、定义变量范围并创建3个矩阵来存储每个直方图
    int histsize = 256;
    float range[] = { 0,256 };
    const float* histRange = { range };
    Mat b_hist, g_hist, r_hist;

    //3、使用calcHist函数计算直方图
    calcHist(&bgr[0], 1, 0, Mat(), b_hist, 1, &histsize, &histRange);
    calcHist(&bgr[1], 1, 0, Mat(), g_hist, 1, &histsize, &histRange);
    calcHist(&bgr[2], 1, 0, Mat(), r_hist, 1, &histsize, &histRange);

    //4、创建一个512*300像素大小的彩色图像，用于绘制显示
    int width = 512;
    int height = 300;
    Mat histImage(height, width, CV_8UC3, Scalar(20, 20, 20));

    //5、将最小值与最大值标准化直方图矩阵
    normalize(b_hist, b_hist, 0, height, NORM_MINMAX);
    normalize(g_hist, g_hist, 0, height, NORM_MINMAX);
    normalize(r_hist, r_hist, 0, height, NORM_MINMAX);

    //6、使用彩色通道绘制直方图
    int binStep = cvRound((float)width / (float)histsize);  //通过将宽度除以区间数来计算binStep变量

    for (int i = 1; i < histsize; i++)
    {
        line(histImage,
            Point(binStep * (i - 1), height - cvRound(b_hist.at<float>(i - 1))),
            Point(binStep * (i), height - cvRound(b_hist.at<float>(i))),
            Scalar(255, 0, 0)
        );
        line(histImage,
            Point(binStep * (i - 1), height - cvRound(g_hist.at<float>(i - 1))),
            Point(binStep * (i), height - cvRound(g_hist.at<float>(i))),
            Scalar(0, 255, 0)
        );
        line(histImage,
            Point(binStep * (i - 1), height - cvRound(r_hist.at<float>(i - 1))),
            Point(binStep * (i), height - cvRound(r_hist.at<float>(i))),
            Scalar(0, 0, 255)
        );
    }
    dst = histImage;
    return;
}

//显示灰度直方图
void showgrayHist(Mat& img_gray, Mat& dst)
{

    //1、定义变量范围并创建3个矩阵来存储每个直方图
    int histsize = 256;
    float range[] = { 0,256 };
    const float* histRange = { range };
    Mat grayhist;

    //2、使用calcHist函数计算直方图
    calcHist(&img_gray, 1, 0, Mat(), grayhist, 1, &histsize, &histRange);

    //3、创建一个512*300像素大小的彩色图像，用于绘制显示
    int width = 512;
    int height = 300;
    Mat histImage(height, width, CV_8UC3, Scalar(20, 20, 20));

    //4、将最小值与最大值标准化直方图矩阵
    normalize(grayhist, grayhist, 0, height, NORM_MINMAX);

    //5、使用彩色通道绘制直方图
    int binStep = cvRound((float)width / (float)histsize);  //通过将宽度除以区间数来计算binStep变量

    for (int i = 1; i < histsize; i++)
    {
        line(histImage,
            Point(binStep * (i - 1), height - cvRound(grayhist.at<float>(i - 1))),
            Point(binStep * (i), height - cvRound(grayhist.at<float>(i))),
            Scalar(255, 0, 0),2,8,0
        );
    }
    dst = histImage;
    return;
}

int main()
{
    Mat src = imread("cat.jpg");
    Mat histImage;
    if (!src.data)
    {
        cout << "No src data!" << endl;
    }
    else
    {
        imshow("src", src);
    }
    showHist(src, histImage);

    Mat image_gray, grayhistImage;
    cvtColor(src, image_gray, COLOR_BGR2GRAY);  //灰度化           关联  HSV（色相，饱和度和明度）化是：COLOR_BGR2HSV
    imshow("image_gray", image_gray); 
    showgrayHist(image_gray,grayhistImage);

    //namedWindow("histImage", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全

    namedWindow("histImage", 0);
    imshow("histImage", histImage);
    namedWindow("grayhistImage", 0);
    imshow("grayhistImage", grayhistImage);
    waitKey(0);
    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201858164-26430f16-a728-4948-a04d-257d42d3070a.png)



**其他图片直方图：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201895054-a8ea8f91-d3f0-4f5e-b323-ba532a60ef26.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201925649-cb9cc31a-3785-449b-91a2-3ff9413d7b16.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201953072-ab145c20-d6c4-4218-803b-438ea67489ec.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725201960889-59a8298c-2247-43af-8c8e-6880a4d1fa4a.png)

## 三、直方图均衡化
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202079283-4d5d841a-ae0a-4d1d-857a-c980b01cb873.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202094935-a3a1f5b1-88a4-4ae2-93dc-bb297d4954ee.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202104467-39e0a53c-1f1e-4faa-addf-c4ce6b56166a.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202113146-f2522480-67dd-416f-a773-48130ad0a469.png)

```cpp
/*
直方图均衡化：
原理：直方图均衡化旨在拉伸图像的灰度级别分布，使其更均匀。这通过重新分配像素值以增加亮度级别的数量来实现。
这有助于增强图像的对比度，并突出图像中的细节。该方法的原理是重新映射图像的累积分布函数，使其变为均匀分布。
*/
#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>
using namespace cv;
using namespace std;

int main()
{
    Mat image, image_gray, image_enhanced;   //定义输入图像，灰度图像, 直方图
    image = imread("cat.jpg");  //读取图像；
    if (image.empty())
    {
        cout << "读取错误" << endl;
        return -1;
    }

    cvtColor(image, image_gray, COLOR_BGR2GRAY);  //灰度化
    imshow(" image_gray", image_gray);   //显示灰度图像

    equalizeHist(image_gray, image_enhanced);//直方图均衡化
    imshow(" image_enhanced", image_enhanced);   //显示增强图像

    waitKey(0);  //暂停，保持图像显示，等待按键结束
    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202205959-17a09162-d0e9-48d8-9f0c-3c2041d34b12.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202230443-7e86e8af-96ad-451c-af3f-ba42c9dee1a8.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202222985-adbbf0ef-39f1-46b8-bc61-1f4956843941.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202238104-040013ca-6e45-4504-a957-7547676c78f1.png)



```cpp
/*自适应直方图均衡化：
原理：自适应直方图均衡化将图像划分为小块，然后对每个块进行直方图均衡化。
这使得图像在不同区域的灰度级别分布更加均匀，尤其是当图像具有明显的亮度变化时。
*/
/**
#include <opencv2/opencv.hpp>  
#include <opencv2/highgui/highgui.hpp>  

int main()
{
    // 读取图像  
    cv::Mat src = cv::imread("cat.jpg", cv::IMREAD_GRAYSCALE);
    if (src.empty())
    {
        std::cout << "不可以打开图像" << std::endl;
        return -1;
    }

    // 创建CLAHE对象  Contrast Limited Adaptive Histogram Equalization  用于对图像进行自适应直方图均衡化
    // 参数2.0是对比度限制（clipLimit），cv::Size(8, 8)是图像分割的块大小（tileGridSize）  
    cv::Ptr<cv::CLAHE> clahe = cv::createCLAHE(2.0, cv::Size(8, 8));

    // 应用CLAHE到图像  使用CLAHE对象的apply方法将CLAHE处理应用到原始图像src上，并将处理后的图像存储在dst中
    cv::Mat dst;
    clahe->apply(src, dst);

    // 显示原始图像和CLAHE处理后的图像  
    cv::namedWindow("image_gray", cv::WINDOW_AUTOSIZE);
    cv::imshow("image_gray", src);

    cv::namedWindow("CLAHE Image", cv::WINDOW_AUTOSIZE);
    cv::imshow("CLAHE Image", dst);

    // 等待用户按键，然后关闭窗口  
    cv::waitKey(0);
    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202308043-61c8acbf-d249-4e43-8369-5b16e3822b74.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202498177-4f49f128-53e0-4d3c-a9cd-e44d2216e21e.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202315562-39a5897f-6fd9-4ef9-83cd-f43b1897450e.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202515380-472afd8f-a7eb-4122-bb4f-bfd5900b3f01.png)



图像均衡化通常会拓展灰度级范围，进而增强图像的对比度，因此输入图像覆盖的灰度级区间越小，直方图均衡对其影响越大。

#### PS：直方图规定化
直方图匹配（直方图规定化）：用于生成具有规定直方图的图像的方法。将某幅影像或某一区域的直方图匹配到另一幅影像上，以使两幅影像的色调保持一致。两幅图像比对前，通常要使其直方图形式一致。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202570241-c084cf78-f969-4939-9565-6f1982429f19.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202590932-28f25d6a-85e1-491e-a3fd-75a753cfbabe.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202672228-ecd450c8-601b-41cc-a660-cc6567ee422c.png)

```cpp
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image1, image1_gray, hist1, image2, image2_gray, hist2, image_enhanced;   //定义修改图像，灰度修改图像, 修改直方图，目标图像，灰度目标图像，目标直方图, 规定化增强图像
	image1 = imread("cat.jpg");  //读取图像；
	if (image1.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	cvtColor(image1, image1_gray, COLOR_BGR2GRAY);  //灰度化
	imshow(" image1_gray", image1_gray);   //显示灰度图像

	image2 = imread("img/red_panda.jpg");  //读取图像；
	if (image2.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	cvtColor(image2, image2_gray, COLOR_BGR2GRAY);  //灰度化
	imshow(" image2_gray", image2_gray);   //显示灰度图像

	//均衡化处理
	equalizeHist(image1_gray, image1_gray);
	equalizeHist(image2_gray, image2_gray);


	//获取两个均衡化图像的直方图
	int histsize = 256;
	float ranges[] = { 0,256 };
	const float* histRanges = { ranges };
	calcHist(&image1_gray, 1, 0, Mat(), hist1, 1, &histsize, &histRanges, true, false);
	calcHist(&image2_gray, 1, 0, Mat(), hist2, 1, &histsize, &histRanges, true, false);

	//计算两个均衡化图像直方图的累积概率
	float hist1_cdf[256] = { hist1.at<float>(0) };
	float hist2_cdf[256] = { hist2.at<float>(0) };
	for (int i = 1; i < 256; i++)
	{
		hist1_cdf[i] = (hist1_cdf[i - 1] + hist1.at<float>(i));
		hist2_cdf[i] = (hist2_cdf[i - 1] + hist2.at<float>(i));
	}

	for (int i = 0; i < 256; i++)
	{
		hist1_cdf[i] = hist1_cdf[i] / (image1_gray.rows * image1_gray.cols);
		hist2_cdf[i] = hist2_cdf[i] / (image2_gray.rows * image2_gray.cols);
	}

	// 两个累计概率之间的差值，用于找到最接近的点
	float diff_cdf[256][256];
	for (int i = 0; i < 256; i++) {
		for (int j = 0; j < 256; j++)
		{
			diff_cdf[i][j] = fabs(hist1_cdf[i] - hist2_cdf[j]);
		}
	}

	Mat lut(1, 256, CV_8U);
	for (int i = 0; i < 256; i++)
	{
		//查找源灰度级为i的映射灰度和i的累积概率差最小(灰度接近)的规定化灰度
		float min = diff_cdf[i][0];
		int index = 0;
		for (int j = 0; j < 256; j++) {
			if (min > diff_cdf[i][j]) {
				min = diff_cdf[i][j];
				index = j;
			}
		}
		lut.at<uchar>(i) = index;
	}
	LUT(image1_gray, lut, image_enhanced);  //图像中进行映射
	imshow("image_enhanced", image_enhanced);


	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202860604-841d4e9e-0174-47a0-a131-ad272caea532.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202902358-86df729c-33ba-47d6-b379-4eb3492f4032.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202909807-9a429bf4-e5e1-4fc7-b275-8a5fbf3c27c4.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202917029-04c5c4e9-2d7f-4aa4-b453-2749fe795f04.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202924702-22ca4939-c14a-4bc7-b733-925bb5182474.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725202932355-0a719ecd-cc72-4646-b7cb-be661e702abf.png)



# 图像平滑
图像平滑（通过积分过程使得图像边缘模糊）

概念：为抑制噪声、改善图像质量所进行的处理称为图像平滑或去噪。可以在空间域和频率域中进行。

空间滤波通过把每个像素的值替换为该像素及其邻域的函数值来修改图像。如果对图像像素执行的运算是线性的，那么称该滤波器为线性空间滤波器。否则，称该滤波器为非线性空间滤波器。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725203066480-e017deae-b881-4047-b778-82777da30403.png)

线性滤波就是找到合适的方法来修改图像的频率内容。在空间域中，我们是通过卷积滤波来实现这一要求的。在频率域中，我们则是用乘法滤波器来实现这一要求的。

## 1.中值滤波
一种非线性平滑滤波方法，用于消除椒盐噪声等异常值的影响。中值滤波将每个像素点的灰度值设置为该点某邻域窗口内的所有像素点灰度值的中值。它基于排序统计理论，通过选择合适的点来替代污染点的值，可以很好地保护图像的尖锐边缘。中值滤波对于去除由异常值引起的噪声特别有效，但在处理高斯噪声方面效果较差。

### Opencv调用
```cpp
/*
            // 方框滤波
            Mat boxFilteredImage;
            boxFilter(image, boxFilteredImage, CV_32F, Size(5, 5));
            display_MatInQT(ui->label_1, boxFilteredImage);

            // 均值滤波
            Mat meanFilteredImage;
            blur(image, meanFilteredImage, Size(5, 5));
            display_MatInQT(ui->label_1, meanFilteredImage);

            // 中值滤波
            Mat medianFilteredImage;
            medianBlur(image, medianFilteredImage, 5);
            display_MatInQT(ui->label_1, medianFilteredImage);

            // 高斯滤波
            Mat gaussianFilteredImage;
            GaussianBlur(image, gaussianFilteredImage, Size(5, 5), 0);
            display_MatInQT(ui->label_1, gaussianFilteredImage);

            // 双边滤波
            Mat filteredImage;     //滤波器直径15  颜色空间的标准差50  空间空间的标准差50
            bilateralFilter(image, filteredImage, 15, 50, 50);
            display_MatInQT(ui->label_1, filteredImage);
   */
```

### 加入椒盐噪声
```cpp
#include <iostream>  
#include <opencv2/opencv.hpp>  

// 添加白色或黑色椒盐噪声  
void addSaltAndPepperNoise(cv::Mat& image, double probability) {
    for (int i = 0; i < image.rows; ++i) {
        for (int j = 0; j < image.cols; ++j) {
            //生成一个随机数（rand()返回的值）并将其转换为双精度浮点数。
            //然后，我们将其除以RAND_MAX（这是rand()函数能够返回的最大值），得到一个在0到1之间的随机数。
            //如果这个随机数小于我们设定的噪声概率probability(介于0和1之间的浮点数)，则我们决定在这个位置添加噪声。
            if ((static_cast<double>(rand()) / RAND_MAX) < probability) {
                // 随机设置为0（黑色）或255（白色）   rand() % 2会返回一个0或1的随机数，当返回0时，我们将像素设置为0，否则设置为255。
                image.at<uchar>(i, j) = (rand() % 2 == 0) ? 0 : 255;
            }
        }
    }
}

int main() {
    // 读取灰度图像  
    cv::Mat grayImage = cv::imread("cat.jpg", cv::IMREAD_GRAYSCALE);
    if (grayImage.empty()) {
        std::cerr << "Could not open or find the image" << std::endl;
        return -1;
    }

    // 显示原始图像  
    cv::imshow("Original Image", grayImage);

    // 添加椒盐噪声  
    double noiseProbability = 0.05; // 噪声概率，5% 的像素受到噪声影响，可以根据需要调整  
    addSaltAndPepperNoise(grayImage, noiseProbability);

    // 显示带噪声的图像  
    cv::imshow("Noisy Image", grayImage);

    // 应用中值滤波器去噪  
    int filterSize = 3; // 滤波器大小，通常为3, 5, 7等奇数  
    cv::Mat filteredImage;
    cv::medianBlur(grayImage, filteredImage, filterSize);

    // 显示去噪后的图像  
    cv::imshow("Filtered Image", filteredImage);

    // 等待按键，然后关闭窗口  
    cv::waitKey(0);
    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725238970635-22b297dc-062f-4b14-9b5b-969857f5ed33.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725238977854-ee5bb023-e61b-45b3-837c-59c7f5584dc2.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725238985745-de70ab62-c35f-4b6e-b235-935f32dca630.png)



```cpp
#include <iostream>  
#include <vector>  
#include <algorithm>  
#include <opencv2/opencv.hpp>  

#include <random>  //随机数头文件
using namespace cv;
using namespace std;
void Salt(Mat image, int n); //n：加入噪声点数

// 获取窗口内像素的中值  
int getMedian(const std::vector<int>& window) {
    std::vector<int> sortedWindow(window);
    std::nth_element(sortedWindow.begin(), sortedWindow.begin() + window.size() / 2, sortedWindow.end());
    return sortedWindow[window.size() / 2];
}

// 应用中值滤波器  
void medianFilter(cv::Mat& image, int filterSize) {
    int halfSize = filterSize / 2;
    cv::Mat filteredImage = image.clone();

    for (int i = halfSize; i < image.rows - halfSize; ++i) {
        for (int j = halfSize; j < image.cols - halfSize; ++j) {
            std::vector<int> window;

            for (int m = -halfSize; m <= halfSize; ++m) {
                for (int n = -halfSize; n <= halfSize; ++n) {
                    window.push_back(image.at<uchar>(i + m, j + n));
                }
            }

            int median = getMedian(window);
            filteredImage.at<uchar>(i, j) = median;
        }
    }

    image = filteredImage;
}

int main() {
    // 读取图像  
    cv::Mat image = cv::imread("cat.jpg", cv::IMREAD_GRAYSCALE);  //LenaNoise.png
    if (image.empty()) {
        std::cerr << "Could not open or find the image" << std::endl;
        return -1;
    }

    cv::imshow("origin", image);
    Salt(image, 5000); //加入5000个噪声点
    imshow("SaltAndPepperNoise", image);  //显示噪声图像；

    // 应用中值滤波器  
    medianFilter(image, 3);

    // 显示处理后的图像    保存 cv::imwrite("output.jpg", image);
    cv::imshow("output", image);
    cv::waitKey(0);

    return 0;
}

// 在图像中加入白色椒盐噪声
void Salt(Mat image, int n)
{
    //随机数生成器
    default_random_engine generater;
    uniform_int_distribution<int>randomRow(0, image.rows - 1);
    uniform_int_distribution<int>randomCol(0, image.cols - 1);

    int i, j;
    for (int k = 0; k < n; k++)
    {
        i = randomCol(generater);
        j = randomRow(generater);
        if (image.channels() == 1)
        {
            image.at<uchar>(j, i) = 255;
        }
        else if (image.channels() == 3)
        {
            image.at<Vec3b>(j, i)[0] = 255;
            image.at<Vec3b>(j, i)[1] = 255;
            image.at<Vec3b>(j, i)[2] = 255;
        }
    }
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725239246500-14e3695a-6ae8-4e5e-a01f-a457453cd138.png)

### 中值滤波原理
```cpp
/*
中值滤波的原理如下：
        中值滤波器的基本原理是用像素在其邻域中的中值来代替该像素的值
1、选择一个奇数大小的滤波器窗口（如3x3, 5x5等），确保窗口中心有一个像素。
2、将滤波器窗口在图像上滑动，对窗口内的像素进行排序。
3、将排序后的像素数组的中值赋给窗口中心的像素。
4、重复步骤2和3，直到处理完图像中的所有像素。
*/
#include <iostream>  
#include <vector>  
#include <algorithm> // 为了使用 std::nth_element  

//填充边界 计算中值时填充不会计入

// 获取窗口内像素的中值  
int getMedian(const std::vector<int>& window) {
    std::vector<int> sortedWindow(window);
    //std::nth_element 函数会重新排列元素，使得第 n 个元素（从 0 开始计数）位于它在完全排序后应该出现的位置，而所有小于它的元素都在它前面，所有大于它的元素都在它后面。
    std::nth_element(sortedWindow.begin(), sortedWindow.begin() + sortedWindow.size() / 2, sortedWindow.end());
    if (sortedWindow.size() % 2 == 0) {
        // 如果窗口大小是偶数，返回中间两个数的平均值  中位数不要小数
        return (sortedWindow[sortedWindow.size() / 2 - 1] + sortedWindow[sortedWindow.size() / 2]) / 2;
    }
    else {
        // 如果窗口大小是奇数，返回中间那个数  
        return sortedWindow[sortedWindow.size() / 2];
    }
}

```

```cpp
// 应用中值滤波器  
void medianFilter(std::vector<std::vector<int>>& image, int filterSize) {
    int halfSize = filterSize / 2;
    int rows = image.size();
    int cols = image[0].size();

    // 创建输出图像  
    std::vector<std::vector<int>> filteredImage(rows, std::vector<int>(cols, 0));

    // 遍历图像中的每个像素  
    for (int i = halfSize; i < rows - halfSize; ++i) {
        for (int j = halfSize; j < cols - halfSize; ++j) {
            // 创建窗口并填充像素值  
            std::vector<int> window;
            for (int m = -halfSize; m <= halfSize; ++m) {
                for (int n = -halfSize; n <= halfSize; ++n) {
                    //直接通过当前遍历的索引 i 和 j 加上偏移量 m 和 n 来获取像素值。 所以边界值中位数为0
                    window.push_back(image[i + m][j + n]);
                }
            }

            // 获取中值并设置到输出图像  
            filteredImage[i][j] = getMedian(window);
        }
    }

    // 更新原图像  
    image = filteredImage;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725239477551-6c2a0bf7-ec8d-44f9-a435-4c5fdb357a6c.png)

```cpp
// 应用中值滤波器 
void medianFilter(std::vector<std::vector<int>>& image, int filterSize) {
    if (filterSize % 2 == 0) {
        throw std::invalid_argument("Filter size must be odd.");
    }

    int halfSize = filterSize / 2;
    int rows = image.size();
    int cols = image[0].size();

    // 创建带有边界扩展的新图像  
    int paddedRows = rows + 2 * halfSize;
    int paddedCols = cols + 2 * halfSize;
    std::vector<std::vector<int>> paddedImage(paddedRows, std::vector<int>(paddedCols, 0));

    // 创建输出图像  
    std::vector<std::vector<int>> filteredImage(rows, std::vector<int>(cols, 0));

    // 遍历扩展图像中的每个像素  
    for (int i = halfSize; i < paddedRows - halfSize; ++i) {
        for (int j = halfSize; j < paddedCols - halfSize; ++j) {
            // 创建窗口并填充像素值  
            std::vector<int> window;
            for (int m = -halfSize; m <= halfSize; ++m) {
                for (int n = -halfSize; n <= halfSize; ++n) {
                    // 使用 originalRow 和 originalCol 的方式首先计算出像素在原始图像中的实际位置，然后再检查这个位置是否在图像边界内。
                    // 如果是，则将该像素值添加到窗口中。这种方式确保了只有位于图像内部的像素才会被包括在内。
                    int originalRow = i - halfSize + m;
                    int originalCol = j - halfSize + n;
                    if (originalRow >= 0 && originalRow < rows && originalCol >= 0 && originalCol < cols) {
                        window.push_back(image[originalRow][originalCol]);
                    }
                }
            }
            // 获取中值并设置到输出图像 
            if (!window.empty()) {
                filteredImage[i - halfSize][j - halfSize] = getMedian(window);
            }
        }
    }
    // 更新原图像  
    image = filteredImage;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725239625077-7bfebe7f-1ab8-4b81-ad40-3fd677075c76.png)填充的0不算入排序 不要小数



```cpp
int main() {
    // 示例图像（灰度）  
    std::vector<std::vector<int>> image = {
        {1, 2, 3, 4, 5},
        {6, 7, 8, 9, 10},
        {11, 12, 13, 14, 15},
        {16, 17, 18, 19, 20},
        {21, 22, 23, 24, 25}
    };

    // 应用3x3中值滤波器  
    medianFilter(image, 3);

    // 输出滤波后的图像  
    for (const auto& row : image) {
        for (int pixel : row) {
            std::cout << pixel << " ";
        }
        std::cout << std::endl;
    }

    return 0;
}
```

## 2.均值滤波
一种简单的平滑滤波方法，使用滤波窗口内像素的平均值来代替中心像素的值。对于滤波窗口内的每个像素，计算其邻域内所有像素的平均值，然后将结果作为中心像素的值。均值滤波可以有效地平滑图像并去除高频噪声，但会模糊图像并失去细节。

### Opencv调用
```cpp
#include <opencv2/opencv.hpp>  
#include <iostream>  

int main() {
    cv::Mat src, dst;

    // 读取图像  
    src = cv::imread("cat.jpg", cv::IMREAD_GRAYSCALE);
    if (src.empty()) {
        std::cout << "Could not read the image!" << std::endl;
        return -1;
    }

    // 创建目标图像  
    //dst.create(src.size(), src.type());

    // 应用3x3均值滤波器  
    cv::blur(src, dst, cv::Size(3, 3));

    // 显示原图像和处理后的图像  
    cv::imshow("Original Image", src);
    cv::imshow("Averaging Filter", dst);

    // 等待用户按键，然后关闭窗口  
    cv::waitKey(0);

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725240900559-6f391bec-3800-4972-9f30-42da30ee8384.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725240908672-103b9c33-907b-49ff-981a-ad8deaa24a41.png)

### 均值滤波原理
```cpp
// 基本思想是用像素点周围像素的均值来代替该像素点的值
#include <iostream>  
#include <vector>  
#include <cmath> // for round()   

// 填充边界 计算均值时填充不会计入

// 计算窗口内像素的平均值  
float getAverage(const std::vector<int>& window) {
    int sum = 0;
    for (int pixel : window) {
        sum += pixel;
    }
    return static_cast<float>(sum) / window.size();
}

void meanFilter(std::vector<std::vector<int>>& image, int filterSize) {
    if (filterSize % 2 == 0) {
        throw std::invalid_argument("Filter size must be odd.");
    }

    int halfSize = filterSize / 2;
    int rows = image.size();
    int cols = image[0].size();

    // 创建带有边界扩展的新图像  初始化了带有扩张边界的新图像 paddedImage，将所有像素值设置为0
    int paddedRows = rows + 2 * halfSize;
    int paddedCols = cols + 2 * halfSize;
    std::vector<std::vector<int>> paddedImage(paddedRows, std::vector<int>(paddedCols, 0));
    // 创建输出图像  
    std::vector<std::vector<int>> filteredImage(rows, std::vector<int>(cols, 0));
    // 遍历扩展图像中的每个像素  
    for (int i = halfSize; i < paddedRows - halfSize; ++i) {
        for (int j = halfSize; j < paddedCols - halfSize; ++j) {
            // 创建窗口并填充像素值  
            std::vector<int> window;
            for (int m = -halfSize; m <= halfSize; ++m) {
                for (int n = -halfSize; n <= halfSize; ++n) {
                    // 检查当前像素是否在原始图像范围内  
                    int originalRow = i - halfSize + m;
                    int originalCol = j - halfSize + n;
                    if (originalRow >= 0 && originalRow < rows && originalCol >= 0 && originalCol < cols) {
                        window.push_back(image[originalRow][originalCol]);
                    }
                }
            }
            // 获取平均值并设置到输出图像，四舍五入  
            if (!window.empty()) { // 确保窗口不为空  
                filteredImage[i - halfSize][j - halfSize] = static_cast<int>(round(getAverage(window)));
            }
        }
    }
    // 更新原图像  
    image = filteredImage;
}

int main() {
    // 示例：创建一个简单的图像和一个3x3均值滤波器  
    std::vector<std::vector<int>> image = {
        {10, 20, 30, 40, 50},
        {20, 30, 40, 50, 60},
        {30, 40, 50, 60, 70},
        {40, 50, 60, 70, 80},
        {50, 60, 70, 80, 90}
    };

    int filterSize = 3;
    meanFilter(image, filterSize);

    // 打印滤波后的图像  
    for (const auto& row : image) {
        for (int val : row) {
            std::cout << val << " ";
        }
        std::cout << std::endl;
    }

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725241085064-6a5a5e7e-9fe4-4c71-b59f-381a39983f4f.png)填充的0不算平均

## 3.高斯滤波
基于高斯分布的平滑滤波方法。它认为像素点的邻域内的像素值与中心像素点的距离越近，其权重越大。高斯滤波通过计算高斯函数来赋予邻域内每个像素一个权重，然后使用加权平均来平滑图像。高斯滤波能够更好地保留图像的细节和边缘信息，同时有效地去除噪声。

高斯滤波是一种线性平滑滤波方法，广泛应用于图像处理的减噪过程。它的主要原理是通过对图像中的每个像素应用高斯函数加权平均其邻近像素的值来实现。

高斯滤波器的操作可以描述为：用一个用户指定的模板（也称为卷积核或掩膜）扫描图像中的每一个像素，用模板确定的邻域内像素的加权平均灰度值去替代模板中心像素点的值。这个模板的系数是根据高斯函数生成的，其形状和大小决定了对图像平滑的程度。

高斯函数是一个钟形曲线，其数学表达式为：G(x, y) = 1 / (2πσ^2) * e^-((x^2 + y^2) / (2σ^2))

其中，(x, y) 是像素的坐标，σ 是高斯函数的标准差，G(x, y) 是高斯权重。

这个高斯函数决定了模板的系数，距离模板中心越近，系数越大；距离越远，系数越小。因此，高斯滤波器相比于均值滤波器对图像的模糊程度较小。

### Opencv调用
```cpp
#include <opencv2/opencv.hpp>  
#include <iostream>  
using namespace cv;
using namespace std;

int main() {
    // 读取图像  
    Mat image = imread("cat.jpg");
    if (image.empty()) {
        std::cerr << "无法加载图像" << std::endl;
        return -1;
    }

    cvtColor(image, image, COLOR_BGR2GRAY);  //灰度化

    Mat gaussianFilteredImage;
    // 核需要是奇数  sigmaX和sigmaY参数默认是0(自动计算）  borderType参数的默认值是cv::BORDER_DEFAULT，零填充
    // sigmaX和sigmaY会被设置为核大小的一半减去1，然后再除以2。也就是说，如果核的大小是(5, 5)，则sigmaX和sigmaY会被计算为1.40625（因为(5 - 1) / 2 / 2 = 1.40625）
    //GaussianBlur(image, gaussianFilteredImage, Size(29, 29), 0, 0, BORDER_DEFAULT);  //核越大，标准差越大，越模糊
    GaussianBlur(image, gaussianFilteredImage, Size(5, 5), 0 ,0);

    // 显示原图像和滤波后的图像  
    imshow("Original Image", image);
    imshow("Gaussian Blurred Image", gaussianFilteredImage);

    // 等待按键  
    waitKey(0);

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725241798842-71e074c4-9fd2-47a5-aa63-527d3c1bc06a.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725241807019-13055dda-68dc-401b-9e54-124060265f65.png)



### rng.fill生成高斯分布
```cpp
#include<iostream>
#include<opencv2/opencv.hpp>
using namespace cv;
using namespace std;

//高斯噪声
void Gaussian_noise(Mat image) {

    imshow("orign", image);//展示原图
    Mat gray;
    cvtColor(image, gray, COLOR_BGR2GRAY);
    Mat image_noise = Mat::zeros(image.rows, image.cols, image.type());
    Mat gray_noise = Mat::zeros(gray.rows, gray.cols, gray.type());

    imshow("gray", gray);//展示灰度图

    RNG rng;//创建一个RNG类      
    rng.fill(image_noise, RNG::NORMAL, 10, 20);//生成三通道的高斯分布随机数  RNG::NORMAL可能是一个枚举值，指示要生成的随机数的分布类型，这里是正态分布（高斯分布） 均值10和标准差20
    rng.fill(gray_noise, RNG::NORMAL, 15, 30);

    imshow("image_noise", image_noise);//三通道的高斯噪声
    imshow("gray_noise", gray_noise);//单通道的高斯噪声

    image = image + image_noise;//在彩色图像中添加高斯噪声
    gray = gray + gray_noise;//在灰度图像中添加高斯噪声

    //显示添加高斯噪声后的图像
    imshow("image_Gaussian", image);
    imshow("gray_Gaussian", gray);

    waitKey(0);
}

int main() {

    Mat image;
    image = imread("cat.jpg");  //读取图像；
    Gaussian_noise(image);

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725241892600-a5a12455-9710-4a90-bf35-62753df6cf43.png)

### 高斯滤波原理
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242024960-e2380cc1-689d-4a42-b658-ca347da02ef7.png)

```cpp
//C++实现高斯滤波
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

//1 高斯滤波
void Gaussfilter_ly(Mat input_image, Mat& output_image, int Gauss_size, double Sigma)
{
    //保证高斯核大小为大于等于3的奇数
    if (Gauss_size < 3) Gauss_size = 3;
    else Gauss_size = (int)(Gauss_size / 2) * 2 + 1;

    //生成高斯卷积核
    double** Gausskernel = new double* [Gauss_size];
    for (int i = 0; i < Gauss_size; i++)
    {
        Gausskernel[i] = new double[Gauss_size];
    }
    int center = Gauss_size / 2;
    double sum = 0;

    for (int i = 0; i < Gauss_size; i++)
    {
        for (int j = 0; j < Gauss_size; j++)
        {
            Gausskernel[i][j] = exp(-((i - center) * (i - center) + (j - center) * (j - center)) / (2 * Sigma * Sigma));
            sum += Gausskernel[i][j];
        }
    }
    //高斯卷积核归一化
    double sum1 = 1 / sum;
    for (int i = 0; i < Gauss_size; i++)
    {
        for (int j = 0; j < Gauss_size; j++)
        {
            Gausskernel[i][j] *= sum1;
        }
    }

    //滤波
    Mat tem_image = input_image.clone();
    int rows = input_image.rows - center;
    int cols = input_image.cols - center;
    for (int i = center; i < rows; i++)
    {
        for (int j = center; j < cols; j++)
        {
            double sum = 0;
            for (int m = -center; m <= center; m++)
            {
                for (int n = -center; n <= center; n++)
                {
                    sum += Gausskernel[center + m][center + n] * input_image.at<uchar>(i + m, j + n);
                }
            }
            tem_image.at<uchar>(i, j) = static_cast<uchar>(sum);
        }
    }
    output_image = tem_image;

    //释放内存
    for (int i =0; i < Gauss_size; i++) delete[] Gausskernel[i];
    delete[] Gausskernel;
}

int main() {
    // 读取图像
    Mat image = imread("cat.jpg");
    if (image.empty()) {
        std::cerr << "无法加载图像" << std::endl;
        return -1;
    }

    cvtColor(image, image, COLOR_BGR2GRAY);  //灰度化

    Mat gaussianFilteredImage;
    int Gauss_size = 5;
    double Sigma = 1.5;
    Gaussfilter_ly(image, gaussianFilteredImage, Gauss_size , Sigma);

    // 显示原图像和滤波后的图像
    imshow("Original Image", image);
    imshow("Gaussian Blurred Image", gaussianFilteredImage);

    // 等待按键
    waitKey(0);

    return 0;
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242547492-67a8b68a-01a4-49f1-81bc-b4b50aae8ff3.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242553931-4395dcf3-dfb3-4240-8455-7899e527f718.png)

# 图像锐化
图像锐化（通过微分过程使得图像边缘突出、清晰）

锐化通常称为高通滤波。此时，通过(负责细节的)高频，而衰减或抑制低频。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242658073-604e0e6c-7ace-4032-8421-ba5b556834f6.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242669233-27327d5b-4210-4e64-bcae-430d1eb437a8.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242679496-12948cba-e497-41f3-b2ea-ba9cd286c689.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242691784-de94f95e-bc07-47b8-8595-796d61021eac.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242701472-705a14f2-2fc4-40aa-91e1-63f357b31ad6.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242713357-c0f0741e-672b-4e59-b3b2-9b36d7b41233.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242806498-e1166550-d392-4e22-8350-040f9afdbb9c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242778243-947e057a-4ecd-41a1-915e-ae255bbf2518.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242855090-5de558a9-881f-487d-bc7f-1c76cca312ff.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242829047-3729a2c1-cb70-44ff-b940-3cafe8d3e664.png)



## 1.Laplacian锐化
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242897507-7b5ae3e9-1807-4b0e-9442-d0f81483d102.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725242930490-dd0a3f4c-966c-482a-80d0-e176d1253dc9.png)

### cv::filter2D应用拉普拉斯核
```cpp
#include <opencv2/opencv.hpp>  
#include <iostream>  

int main() {
	// 读取图像  
	cv::Mat srcImage = cv::imread("cat.jpg", cv::IMREAD_COLOR);
	if (srcImage.empty()) {
		std::cerr << "无法读取图像" << std::endl;
		return -1;
	}

	// 创建拉普拉斯滤波器  
	//cv::Mat laplacianKernel = (cv::Mat_<float>(3, 3) << 0, 1, 0, 1, -4, 1, 0, 1, 0);
	// 创建锐化滤波器（拉普拉斯算子）   调整中心值为5大于周围的值，可以在边缘处产生更大正的响应
	cv::Mat laplacianKernel = (cv::Mat_<float>(3, 3) <<
		0, -1, 0,
		-1, 5, -1,
		0, -1, 0
		);

	// 应用拉普拉斯滤波器  
	cv::Mat dstImage;
	// void cv::filter2D(InputArray src, OutputArray dst, int ddepth, InputArray kernel, Point anchor=Point(-1,-1), double delta=0, int borderType=BORDER_DEFAULT)
	// 该函数允许你使用自定义的卷积核（或称为滤波器、核）来对图像进行卷积处理，从而实现各种图像处理效果，如锐化、模糊、边缘检测等
	cv::filter2D(srcImage, dstImage, srcImage.depth(), laplacianKernel);         //ddepth设置为 -1，则输出图像将具有与原图像相同的数据类型和深度

	// 将滤波后的图像与原始图像相加，实现锐化效果  
	cv::Mat sharpenedImage = srcImage + dstImage;

	// 显示原始图像和锐化后的图像  
	cv::imshow("Original Image", srcImage);
	cv::imshow("Sharpened Image", sharpenedImage);

	// 等待用户按键，然后关闭窗口  
	cv::waitKey(0);
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243148207-a86da253-8725-4584-b926-35e9a774236e.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243154813-a841f94e-e436-4824-a190-25b10053d0d0.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243162250-957adf7a-62b5-4122-bfb9-604306ac6be2.png)

### 相邻像素之间的差分等效
```cpp
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

//定义滤波函数
void myfilter(Mat& image_input, Mat& image_output); //四邻域
void myfilter2(Mat& image_input, Mat& image_output); //八邻域

int main()
{
	Mat image, image_gray, image_output, image_output2;   //定义输入图像，灰度图像，输出图像
	image = imread("cat.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("image", image);

	cvtColor(image, image_gray, COLOR_BGR2GRAY);
	imshow("image_gray", image_gray);

	//自编函数
	myfilter(image_gray, image_output); //4邻域
	imshow("image_output", image_output);

	myfilter2(image_gray, image_output2); //8邻域
	imshow("image_output2", image_output2);

	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}


void myfilter(Mat& image_input, Mat& image_output) //4
{
	image_output = image_input.clone();
	int la;
	for (int i = 1; i < (image_input.rows - 1); i++)
	{
		for (int j = 1; j < (image_input.cols - 1); j++)
		{
			//这行代码计算了像素 (i, j) 及其四个相邻像素（上、下、左、右）之间的差分。利用像素及其邻域之间的差分来增强图像中的边缘信息
			//具体来说，它计算了中心像素值的四倍减去其四个相邻像素值的和。这个操作类似于一个离散微分或拉普拉斯算子，用于检测图像中的边缘或快速变化区域。
			la = 4 * image_input.at<uchar>(i, j) - image_input.at<uchar>(i + 1, j) - image_input.at<uchar>(i - 1, j) - image_input.at<uchar>(i, j + 1) - image_input.at<uchar>(i, j - 1);

			image_output.at<uchar>(i, j) = saturate_cast<uchar>(image_output.at<uchar>(i, j) + la);

		}
	}
}

void myfilter2(Mat& image_input, Mat& image_output) //8
{
	image_output = image_input.clone();
	int la2;
	for (int i = 1; i < (image_input.rows - 1); i++)
	{
		for (int j = 1; j < (image_input.cols - 1); j++)
		{
			la2 = 8 * image_input.at<uchar>(i, j) - image_input.at<uchar>(i + 1, j) - image_input.at<uchar>(i - 1, j) - image_input.at<uchar>(i, j + 1) - image_input.at<uchar>(i, j - 1)
				- image_input.at<uchar>(i - 1, j - 1) - image_input.at<uchar>(i + 1, j + 1) - image_input.at<uchar>(i - 1, j + 1) - image_input.at<uchar>(i + 1, j - 1);

			image_output.at<uchar>(i, j) = saturate_cast<uchar>(image_output.at<uchar>(i, j) + la2);

		}
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243543899-b07bb62b-1cbd-4eeb-a060-400630d2e833.png)

## 2.梯度锐化
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243640227-a8ae393b-d607-4b3d-a487-6abc9e5e5b43.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243744217-b793d474-910d-439b-b8d7-5d7aa6a0f9b4.png)

```cpp
//定义一个梯度算子矩阵，通常使用Prewitt算子、Sobel算子或Roberts算子等
#include <opencv2/opencv.hpp>  
#include <iostream>  

int main() {
    // 读取图像  
    cv::Mat src = cv::imread("cat.jpg", cv::IMREAD_GRAYSCALE); // 使用灰度图像  
    if (src.empty()) {
        std::cerr << "无法读取图像" << std::endl;
        return -1;
    }

    // 定义Sobel算子矩阵 (3x3)  
    cv::Mat sobelX = (cv::Mat_<float>(3, 3) <<
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
        );

    cv::Mat sobelY = (cv::Mat_<float>(3, 3) <<
        -1, -2, -1,
        0, 0, 0,
        1, 2, 1
        );

    cv::Mat dstX, dstY;
    cv::filter2D(src, dstX, src.depth(), sobelX);         //ddepth设置为 -1，则输出图像将具有与原图像相同的数据类型和深度
    cv::filter2D(src, dstY, src.depth(), sobelY);

    // 将滤波后的图像与原始图像相加，实现锐化效果  
    cv::Mat sharpenedImageX = src + dstX;
    cv::Mat sharpenedImageY = src + dstY;
    cv::Mat sharpenedImage = src + dstX + dstY;

    // 显示原始图像和梯度幅度图像  
    cv::imshow("Original Image", src);
    cv::imshow("Gradient MagnitudeX", sharpenedImageX);
    cv::imshow("Gradient MagnitudeY", sharpenedImageY);
    cv::imshow("Gradient Magnitude", sharpenedImage);

    // 等待用户按键，然后关闭窗口  
    cv::waitKey(0);

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243917992-d6e2da3b-5bb9-4f93-bf4e-4e55a2be18b6.png)  ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243933870-e420a8ef-75a8-4800-a599-69fbf4b7e0b4.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243942428-10ed6a37-6b1f-4a06-963c-1a131b6e3f6f.png)  ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725243949970-fb981556-ca06-42c8-b0fc-a80ca1e50684.png)

```cpp
#include <opencv2/opencv.hpp>  
#include <iostream>  

int main() {
    // 读取图像（假设为灰度图）  
    cv::Mat image = cv::imread("cat.jpg", cv::IMREAD_GRAYSCALE);
    if (image.empty()) {
        std::cerr << "Error: Image not found." << std::endl;
        return -1;
    }

    // 将输入图像转换为浮点型  
    cv::Mat imageFloat;
    image.convertTo(imageFloat, CV_32F);

    // 计算x方向和y方向的梯度  
    cv::Mat grad_x, grad_y;
    cv::Mat sobelX = (cv::Mat_<float>(3, 3) << -1, 0, 1, -2, 0, 2, -1, 0, 1); // Sobel X滤波器  
    cv::Mat sobelY = (cv::Mat_<float>(3, 3) << -1, -2, -1, 0, 0, 0, 1, 2, 1); // Sobel Y滤波器  
    cv::filter2D(imageFloat, grad_x, CV_32F, sobelX);
    cv::filter2D(imageFloat, grad_y, CV_32F, sobelY);

    // 计算梯度的平方  
    cv::Mat grad_x2, grad_y2;
    cv::multiply(grad_x, grad_x, grad_x2, 1, CV_32F); // 显式指定输出类型为CV_32F  
    cv::multiply(grad_y, grad_y, grad_y2, 1, CV_32F); // 显式指定输出类型为CV_32F  

    // 求和并开方计算梯度幅度  
    cv::Mat grad_magnitude;
    cv::add(grad_x2, grad_y2, grad_magnitude, cv::noArray(), CV_32F); // 显式指定输出类型为CV_32F  
    cv::sqrt(grad_magnitude, grad_magnitude); // 梯度幅度已经是浮点型，无需再次指定  

    // 归一化到显示范围（可选）  
    cv::Mat grad_magnitude_normalized;
    cv::normalize(grad_magnitude, grad_magnitude_normalized, 0, 255, cv::NORM_MINMAX, CV_8U);

    // 将梯度幅度与原始图像相加，实现锐化效果
    cv::Mat sharpenedImage = image + grad_magnitude_normalized;

    // 显示结果  
    cv::imshow("Original Image", image);
    cv::imshow("Gradient Magnitude", grad_magnitude_normalized);
    cv::imshow("sharpened_img", sharpenedImage);
    cv::waitKey(0); // 等待按键  

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244084284-6d2fec90-db9f-4eec-8263-69698be899a9.png)



梯度：梯度表示图像中某一点处的亮度变化方向和速率。在图像处理中，梯度常用于检测图像中的强度或颜色的变化程度。梯度可以通过各种梯度算子（如Sobel、Prewitt、Scharr等）来计算。梯度图像可以显示图像中所有位置的亮度变化程度和方向。

边缘：边缘是图像中亮度变化显著的地方，通常是物体的轮廓或物体之间的边界。边缘检测是图像处理中的一个重要任务，用于识别图像中的不连续点或剧烈变化点。边缘检测算法（如Canny、Roberts、Laplacian等）通常基于梯度信息来工作，因为边缘处通常伴随着亮度的剧烈变化。

虽然梯度和边缘都与图像中的亮度变化有关，但它们并不相同。梯度更关注于亮度变化的方向和速率，而边缘则更关注于亮度变化的位置和强度。梯度图像包含了图像中所有位置的亮度变化信息，而边缘图像则只显示亮度变化显著的位置。

在实际应用中，梯度信息通常用于计算边缘，因为边缘处伴随着亮度的剧烈变化。

# 频率域图像增强
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244567724-810643b1-b593-4e87-b395-31af58a5a2bc.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244577588-0a3b93a6-9c30-4b73-9f75-60ecd91e0eca.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244591165-ad35ad33-f9ba-4125-8154-a2b2b87560ce.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244599198-7a3c48c9-4e9e-4a8e-9929-a46a0ef5cff1.png)

[傅立叶变换如何理解？美颜和变声都是什么原理？李永乐老师告诉你_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1A4411Y7vj/?spm_id_from=333.999.0.0&vd_source=9741da01eb5597a19fd0610df71471cc)

[【官方双语】形象展示傅里叶变换_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1pW411J7s8/?spm_id_from=333.999.0.0&vd_source=9741da01eb5597a19fd0610df71471cc)

人的大脑可以快速进行傅里叶变换，比如不同人说话声音不同，听到低频时可能是个男人，听到高频时可能是个女人。又比如看人时，人的大脑首先快速傅里叶变换，看低频（整体的轮廓），然后再仔细看看这个人漂不漂亮（看高频细节，例如皱纹、斑点、眼睛等）。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244906690-3f46a946-6fb9-4020-871a-19ba888d5ec7.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244915236-8b5d2d7e-3b93-42dd-88d0-aa1cee8c0d79.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244927820-04218f62-b3ea-4710-b654-d896cedc3946.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244990000-173992bc-72e4-4c90-ab56-25bae728acfa.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725244998683-a2c417cb-8aa7-447b-9658-4974e56d04ca.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245012356-1f3b7c28-7693-4a67-888b-157456f7c4b4.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245023005-cc176841-fede-43de-9f41-83e75f6a642b.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245029624-cf543bf0-ce61-4785-b1d6-02e20d649b52.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245080310-dc8493db-9a69-4f6a-986a-91dbdb321e48.png)

## 1.傅里叶变换及频谱图
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245164389-656f6e61-64c5-4560-a530-b979b3f99061.png)

```cpp
#include<iostream>
#include<opencv2/opencv.hpp>
#include<cmath>

using namespace cv;
using namespace std;


//定义傅里叶变换函数。input_image：输入图像；output_image：傅里叶频谱图；transform_array:傅里叶变换矩阵（复数）
void My_DFT(Mat input_image, Mat& output_image, Mat& transform_array);

int main()
{
	Mat image, image_gray, image_output, image_transform;   //定义输入图像，灰度图像，输出图像
	image = imread("cat.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("image", image);

	cvtColor(image, image_gray, COLOR_BGR2GRAY); //转换为灰度图
	imshow("image_gray", image_gray); //显示灰度图

	//傅里叶变换，image_output为可显示的频谱图，image_transform为傅里叶变换的复数结果
	My_DFT(image_gray, image_output, image_transform);
	imshow("image_output", image_output);

	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}


//傅里叶变换得到频谱图和复数域结果
void My_DFT(Mat input_image, Mat& output_image, Mat& transform_image)
{
	//1.扩展图像矩阵，为2，3，5的倍数时运算速度快     通过copyMakeBorder函数在图像周围添加零填充
	int m = getOptimalDFTSize(input_image.rows);
	int n = getOptimalDFTSize(input_image.cols);
	copyMakeBorder(input_image, input_image, 0, m - input_image.rows, 0, n - input_image.cols, BORDER_CONSTANT, Scalar::all(0));

	//2.创建一个双通道矩阵planes，用来储存复数的实部与虚部
	Mat planes[] = { Mat_<float>(input_image), Mat::zeros(input_image.size(), CV_32F) };

	//3.从多个单通道数组中创建一个多通道数组:transform_image。函数Merge将几个数组合并为一个多通道阵列，即输出数组的每个元素将是输入数组元素的级联
	merge(planes, 2, transform_image);

	//4.进行傅立叶变换
	dft(transform_image, transform_image);

	//5.计算复数的幅值，保存在output_image（频谱图）
	split(transform_image, planes); // 将双通道分为两个单通道，一个表示实部，一个表示虚部
	magnitude(planes[0], planes[1], output_image); //计算复数的幅值，保存在output_image（频谱图）

	//6.前面得到的频谱图数级过大，不好显示，因此转换
	output_image += Scalar(1);   // 取对数前将所有的像素都加1，防止log0
	log(output_image, output_image);   // 取对数
	normalize(output_image, output_image, 0, 1, NORM_MINMAX); //归一化

	//7.剪切和重分布幅度图像限
	output_image = output_image(Rect(0, 0, output_image.cols & -2, output_image.rows & -2));

	// 重新排列傅里叶图像中的象限，使原点位于图像中心
	int cx = output_image.cols / 2;
	int cy = output_image.rows / 2;
	Mat q0(output_image, Rect(0, 0, cx, cy));   // 左上区域
	Mat q1(output_image, Rect(cx, 0, cx, cy));  // 右上区域
	Mat q2(output_image, Rect(0, cy, cx, cy));  // 左下区域
	Mat q3(output_image, Rect(cx, cy, cx, cy)); // 右下区域

	//交换象限中心化
	Mat tmp;
	q0.copyTo(tmp); q3.copyTo(q0); tmp.copyTo(q3);//左上与右下进行交换   将直流低频分量移动到中心
	q1.copyTo(tmp); q2.copyTo(q1); tmp.copyTo(q2);//右上与左下进行交换   确保高频分量对称地分布在中心周围	
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245273346-e3a864e6-439b-4e65-953e-d919e5785154.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245281984-22b190a4-cbe2-401f-8996-71a9b18a8f41.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245293366-36df0738-7728-4a6d-84f9-5ad4338da081.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245307407-b9b6e748-9508-499b-bd1c-c80ae2608234.png)

频率是指图像中像素值变化的快慢程度，通常与图像的细节和纹理有关。在傅里叶变换中，频率是指图像中不同频率分量的强度分布，与灰度级没有直接关系。在频谱图中，低频分量通常对应于图像中变化缓慢的部分，如整体亮度、颜色等，而高频分量则对应于图像中变化快速的部分，如边缘、纹理等。



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245397716-606eec2d-49cc-4526-a1a8-772a0db5fc54.png)

### 特别篇：copyMakeBorder函数
```cpp
/*
 copyMakeBorder 函数是 OpenCV 中用于在图像边界添加像素的函数。它可以扩展图像的边界，通常用于在图像预处理步骤中，如卷积、滤波或傅里叶变换等，其中算法需要比原始图像更大的空间。
 void copyMakeBorder(InputArray src, OutputArray dst, int top, int bottom, int left, int right, int borderType, const Scalar& value = Scalar() )

参数解释：

src: 输入图像。
dst: 输出图像，大小比输入图像大，包含了边界。
top, bottom, left, right: 分别表示在图像的上、下、左、右四个方向要添加的像素数。
borderType: 边界类型，决定了如何添加像素。OpenCV 提供了几种预定义的边界类型，
			如 BORDER_CONSTANT（用常数颜色填充）、BORDER_REPLICATE（复制图像边缘的像素）、BORDER_REFLECT（反射图像边缘的像素）等。
value: 当 borderType 设置为 BORDER_CONSTANT 时，这个参数指定了用于填充边界的常数颜色或值。
*/

#include <opencv2/opencv.hpp>  
#include <iostream>  

int main() {
	// 读取图像  
	cv::Mat image = cv::imread("cat.jpg");
	if (image.empty()) {
		std::cerr << "Could not open or find the image" << std::endl;
		return -1;
	}

	// 创建一个与原始图像同样类型的新图像，大小增加了 10 像素（5 像素在顶部和底部，5 像素在左侧和右侧）  
	cv::Mat borderedImage = cv::Mat::zeros(image.size() + cv::Size(10, 10), image.type());

	// 使用 copyMakeBorder 在新图像上添加黑色边框  
	cv::copyMakeBorder(image, borderedImage, 5, 5, 5, 5, cv::BORDER_CONSTANT, cv::Scalar(0, 0, 0));

	// 显示原始图像和带有边框的图像  
	cv::imshow("Original Image", image);
	cv::imshow("Image with Border", borderedImage);

	cv::waitKey(0);
	return 0;
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245567712-cd32bc36-9936-4bd2-9b9f-5e5a616b170c.png)

## 2.低通滤波
```cpp
#include<iostream>
#include<opencv2/opencv.hpp>
//#include "MY_DFT.h"
//#include "Salt.h"

using namespace cv;
using namespace std;

#include <random>

// 噪声代码
void Salt(Mat image, int n)
{
	default_random_engine generater;
	uniform_int_distribution<int>randomRow(0, image.rows - 1);
	uniform_int_distribution<int>randomCol(0, image.cols - 1);

	int i, j;
	for (int k = 0; k < n; k++)
	{
		i = randomCol(generater);
		j = randomRow(generater);
		if (image.channels() == 1)
		{
			image.at<uchar>(j, i) = 255;
		}
		else if (image.channels() == 3)
		{
			image.at<Vec3b>(j, i)[0] = 255;
			image.at<Vec3b>(j, i)[1] = 255;
			image.at<Vec3b>(j, i)[2] = 255;
		}
	}
}

// 傅里叶变换代码
//傅里叶变换得到频谱图和复数域结果
void My_DFT(Mat input_image, Mat& output_image, Mat& transform_image)
{
	//1.扩展图像矩阵，为2，3，5的倍数时运算速度快
	int m = getOptimalDFTSize(input_image.rows);
	int n = getOptimalDFTSize(input_image.cols);
	copyMakeBorder(input_image, input_image, 0, m - input_image.rows, 0, n - input_image.cols, BORDER_CONSTANT, Scalar::all(0));

	//2.创建一个双通道矩阵planes，用来储存复数的实部与虚部
	Mat planes[] = { Mat_<float>(input_image), Mat::zeros(input_image.size(), CV_32F) };

	//3.从多个单通道数组中创建一个多通道数组:transform_image。函数Merge将几个数组合并为一个多通道阵列，即输出数组的每个元素将是输入数组元素的级联
	merge(planes, 2, transform_image);

	//4.进行傅立叶变换
	dft(transform_image, transform_image);

	//5.计算复数的幅值，保存在output_image（频谱图）
	split(transform_image, planes); // 将双通道分为两个单通道，一个表示实部，一个表示虚部
	Mat transform_image_real = planes[0];
	Mat transform_image_imag = planes[1];

	magnitude(planes[0], planes[1], output_image); //计算复数的幅值，保存在output_image（频谱图）

	//6.前面得到的频谱图数级过大，不好显示，因此转换
	output_image += Scalar(1);   // 取对数前将所有的像素都加1，防止log0
	log(output_image, output_image);   // 取对数
	normalize(output_image, output_image, 0, 1, NORM_MINMAX); //归一化

	//7.剪切和重分布幅度图像限
	output_image = output_image(Rect(0, 0, output_image.cols & -2, output_image.rows & -2));

	// 重新排列傅里叶图像中的象限，使原点位于图像中心
	int cx = output_image.cols / 2;
	int cy = output_image.rows / 2;
	Mat q0(output_image, Rect(0, 0, cx, cy));   // 左上区域
	Mat q1(output_image, Rect(cx, 0, cx, cy));  // 右上区域
	Mat q2(output_image, Rect(0, cy, cx, cy));  // 左下区域
	Mat q3(output_image, Rect(cx, cy, cx, cy)); // 右下区域

	//交换象限中心化 得到频谱图
	Mat tmp;
	q0.copyTo(tmp); q3.copyTo(q0); tmp.copyTo(q3);//左上与右下进行交换
	q1.copyTo(tmp); q2.copyTo(q1); tmp.copyTo(q2);//右上与左下进行交换

	//得到复数结果
	Mat q00(transform_image_real, Rect(0, 0, cx, cy));   // 左上区域
	Mat q01(transform_image_real, Rect(cx, 0, cx, cy));  // 右上区域
	Mat q02(transform_image_real, Rect(0, cy, cx, cy));  // 左下区域
	Mat q03(transform_image_real, Rect(cx, cy, cx, cy)); // 右下区域
	q00.copyTo(tmp); q03.copyTo(q00); tmp.copyTo(q03);//左上与右下进行交换
	q01.copyTo(tmp); q02.copyTo(q01); tmp.copyTo(q02);//右上与左下进行交换

	Mat q10(transform_image_imag, Rect(0, 0, cx, cy));   // 左上区域
	Mat q11(transform_image_imag, Rect(cx, 0, cx, cy));  // 右上区域
	Mat q12(transform_image_imag, Rect(0, cy, cx, cy));  // 左下区域
	Mat q13(transform_image_imag, Rect(cx, cy, cx, cy)); // 右下区域
	q10.copyTo(tmp); q13.copyTo(q10); tmp.copyTo(q13);//左上与右下进行交换
	q11.copyTo(tmp); q12.copyTo(q11); tmp.copyTo(q12);//右上与左下进行交换

	// 合并实部和虚部
	planes[0] = transform_image_real;
	planes[1] = transform_image_imag;
	merge(planes, 2, transform_image);//将傅里叶变换结果中心化
}
```

### 理想低通滤波
```cpp
// 1、频率域滤波--低通滤波--理想低通滤波
// 基本原理：通过设置频率半径，半径内的频率大小不变，半径外的频率置为0，即保留了低频区，滤除了高频区，达到滤波的目的。
// 理想低通滤波会导致振铃效应，因此现实很少使用理想低通滤波器，多使用高斯低通滤波或巴特沃斯低通滤波。

int main()
{
	Mat image, image_gray, image_output, image_transform;   //定义输入图像，灰度图像，输出图像
	image = imread("cat.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("image", image);

	cvtColor(image, image_gray, COLOR_BGR2GRAY); //转换为灰度图
	imshow("image_gray", image_gray); //显示灰度图

	Salt(image_gray, 1000);
	imshow("noise_gray", image_gray); //显示噪声图


	//1、傅里叶变换，image_output为可显示的频谱图，image_transform为傅里叶变换的复数结果
	My_DFT(image_gray, image_output, image_transform);
	imshow("image_output", image_output);

	//2、理想低通滤波
	Mat planes[] = { Mat_<float>(image_output), Mat::zeros(image_output.size(),CV_32F) };
	split(image_transform, planes);//分离通道，获取实部虚部
	Mat image_transform_real = planes[0];
	Mat image_transform_imag = planes[1];

	int core_x = image_transform_real.rows / 2;//频谱图中心坐标
	int core_y = image_transform_real.cols / 2;
	int r = 80;  //滤波半径
	for (int i = 0; i < image_transform_real.rows; i++)
	{
		for (int j = 0; j < image_transform_real.cols; j++)
		{
			//距离中心的距离大于设置半径r的点所在值设为0
			if (((i - core_x) * (i - core_x) + (j - core_y) * (j - core_y)) > r * r)
			{
				image_transform_real.at<float>(i, j) = 0;
				image_transform_imag.at<float>(i, j) = 0;
			}
		}
	}
	planes[0] = image_transform_real;
	planes[1] = image_transform_imag;
	Mat image_transform_ilpf;//定义理想低通滤波矩阵
	merge(planes, 2, image_transform_ilpf);

	//3、傅里叶逆变换
	Mat iDft[] = { Mat_<float>(image_output), Mat::zeros(image_output.size(),CV_32F) };
	idft(image_transform_ilpf, image_transform_ilpf);//傅立叶逆变换
	split(image_transform_ilpf, iDft);//分离通道，主要获取0通道
	magnitude(iDft[0], iDft[1], iDft[0]); //计算复数的幅值，保存在iDft[0]
	normalize(iDft[0], iDft[0], 0, 1, NORM_MINMAX);//归一化处理

	// 提取与原始图像相同大小的区域  
	iDft[0] = iDft[0](Rect(0, 0, image.cols, image.rows));
	imshow("idft", iDft[0]);//显示逆变换图像

	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725245750847-9dd21b5f-800f-474d-aa17-3949132f6c78.png)

### 高斯低通滤波
```cpp
// 2、频率域滤波--低通滤波--高斯低通滤波
// 理想低通滤波会导致振铃效应，高斯低通滤波则没有。但是高斯低通滤波不好控制低与高频的过度部分。巴特沃斯低通滤波器可以通过调整系数进行控制。

/**
int main()
{
	Mat image, image_gray, image_output, image_transform;   //定义输入图像，灰度图像，输出图像
	image = imread("cat.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("image", image);

	cvtColor(image, image_gray, COLOR_BGR2GRAY); //转换为灰度图
	imshow("image_gray", image_gray); //显示灰度图

	Salt(image_gray, 1000);
	imshow("noise_gray", image_gray); //显示噪声图


	//1、傅里叶变换，image_output为可显示的频谱图，image_transform为傅里叶变换的复数结果
	My_DFT(image_gray, image_output, image_transform);
	imshow("image_output", image_output);

	//2、高斯低通滤波
	Mat planes[] = { Mat_<float>(image_output), Mat::zeros(image_output.size(),CV_32F) };
	split(image_transform, planes);//分离通道，获取实部虚部
	Mat image_transform_real = planes[0];
	Mat image_transform_imag = planes[1];

	int core_x = image_transform_real.rows / 2;//频谱图中心坐标
	int core_y = image_transform_real.cols / 2;
	int r = 60;  //滤波半径
	float h;   //权重值h随着点到频谱中心的距离的增加而减小,离中心越远的点（对应高频成分），乘以的权重值越小，因此它们对滤波后图像的影响就越小
	for (int i = 0; i < image_transform_real.rows; i++)
	{
		for (int j = 0; j < image_transform_real.cols; j++)
		{
			h = exp(-((i - core_x) * (i - core_x) + (j - core_y) * (j - core_y)) / (2 * r * r));
			image_transform_real.at<float>(i, j) = image_transform_real.at<float>(i, j) * h;
			image_transform_imag.at<float>(i, j) = image_transform_imag.at<float>(i, j) * h;

		}
	}
	planes[0] = image_transform_real;
	planes[1] = image_transform_imag;
	Mat image_transform_ilpf;//定义高斯低通滤波结果
	merge(planes, 2, image_transform_ilpf);

	//3、傅里叶逆变换
	Mat iDft[] = { Mat_<float>(image_output), Mat::zeros(image_output.size(),CV_32F) };
	idft(image_transform_ilpf, image_transform_ilpf);//傅立叶逆变换
	split(image_transform_ilpf, iDft);//分离通道，主要获取0通道
	magnitude(iDft[0], iDft[1], iDft[0]); //计算复数的幅值，保存在iDft[0]
	normalize(iDft[0], iDft[0], 0, 1, NORM_MINMAX);//归一化处理

	// 提取与原始图像相同大小的区域
	iDft[0] = iDft[0](Rect(0, 0, image.cols, image.rows));
	imshow("idft", iDft[0]);//显示逆变换图像

	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246204838-8e210d01-eab3-4d62-81b6-4a576ba07de9.png)

### 巴特沃斯低通滤波
```cpp
// 3、频率域滤波--低通滤波--巴特沃斯低通滤波
// 理想低通滤波会导致振铃效应，高斯低通滤波则没有。但是高斯低通滤波不好控制低与高频的过度部分。巴特沃斯低通滤波器可以通过调整系数进行控制。

/***
int main()
{
	Mat image, image_gray, image_output, image_transform;   //定义输入图像，灰度图像，输出图像
	image = imread("cat.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("image", image);

	cvtColor(image, image_gray, COLOR_BGR2GRAY); //转换为灰度图
	imshow("image_gray", image_gray); //显示灰度图

	Salt(image_gray, 1000);
	imshow("noise_gray", image_gray); //显示噪声图


	//1、傅里叶变换，image_output为可显示的频谱图，image_transform为傅里叶变换的复数结果
	My_DFT(image_gray, image_output, image_transform);
	imshow("image_output", image_output);

	//2、巴特沃斯低通滤波
	Mat planes[] = { Mat_<float>(image_output), Mat::zeros(image_output.size(),CV_32F) };
	split(image_transform, planes);//分离通道，获取实部虚部
	Mat image_transform_real = planes[0];
	Mat image_transform_imag = planes[1];

	int core_x = image_transform_real.rows / 2;//频谱图中心坐标
	int core_y = image_transform_real.cols / 2;
	int r = 60;  //滤波半径
	float h;
	float n = 2; //巴特沃斯系数
	float D;  //距离中心距离
	for (int i = 0; i < image_transform_real.rows; i++)
	{
		for (int j = 0; j < image_transform_real.cols; j++)
		{
			D = (i - core_x) * (i - core_x) + (j - core_y) * (j - core_y);
			h = 1 / (1 + pow((D / (r * r)), n));
			image_transform_real.at<float>(i, j) = image_transform_real.at<float>(i, j) * h;
			image_transform_imag.at<float>(i, j) = image_transform_imag.at<float>(i, j) * h;

		}
	}
	planes[0] = image_transform_real;
	planes[1] = image_transform_imag;
	Mat image_transform_ilpf;//定义巴特沃斯低通滤波结果
	merge(planes, 2, image_transform_ilpf);

	//3、傅里叶逆变换
	Mat iDft[] = { Mat_<float>(image_output), Mat::zeros(image_output.size(),CV_32F) };
	idft(image_transform_ilpf, image_transform_ilpf);//傅立叶逆变换
	split(image_transform_ilpf, iDft);//分离通道，主要获取0通道
	magnitude(iDft[0], iDft[1], iDft[0]); //计算复数的幅值，保存在iDft[0]
	normalize(iDft[0], iDft[0], 0, 1, NORM_MINMAX);//归一化处理

	// 提取与原始图像相同大小的区域
	iDft[0] = iDft[0](Rect(0, 0, image.cols, image.rows));
	imshow("idft", iDft[0]);//显示逆变换图像

	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246136820-109ae8fc-7a9a-4bc5-adc9-7954c46ccc46.png)

# 形态学图像处理
膨胀、腐蚀、开运算和闭运算是数字图像处理中的形态学操作，主要用于对二值图像进行处理。以下是它们的主要功能和用途：

膨胀（Dilation）：膨胀是将与图像中白色像素（前景）接触的所有背景像素变为白色。换句话说，它会扩大白色区域。这种操作常用于填补物体内部的小孔或细长的凹陷。

腐蚀（Erosion）：与膨胀相反，腐蚀是将与图像中白色像素（前景）接触的所有背景像素变为黑色。这会导致白色区域缩小。腐蚀常用于消除小的白色噪声点或断开连接的对象。

开运算（Opening）：开运算是先腐蚀后膨胀的操作。这种操作常用于消除小的白色对象或噪声，而不显著改变较大对象的大小。

闭运算（Closing）：闭运算是先膨胀后腐蚀的操作。这种操作常用于填补物体内部的小孔或细长凹陷，同时不显著改变较大对象的大小。

这些操作在图像处理和计算机视觉中非常有用，例如，用于分割、噪声消除、对象识别和形状分析。通过选择合适的结构元素（通常是3x3或5x5的矩形或椭圆形窗口）并调整其大小和方向，可以进一步控制这些操作的效果。

## 1.形态学腐蚀
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246382058-9e4add26-6872-4646-a319-116df5f3f81a.png)

腐蚀的目的：去除图像中的某些部分以及会缩小细化目标。

```cpp
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw, image_erosion;   //定义输入图像，灰度图像，二值图像，腐蚀图像
	image = imread("cat.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("image", image);

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);

	//转换为二值图
	threshold(image_gray, image_bw, 120, 255, 0); //通过0，1调节二值图像背景颜色
	imshow("image_bw", image_bw);

	//腐蚀
	Mat se = getStructuringElement(0, Size(3, 3)); //构造矩形结构元素
	erode(image_bw, image_erosion, se, Point(-1, -1), 3); //执行腐蚀操作
	imshow("image_erosion", image_erosion);

	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246618191-c5a960dd-cf53-4404-97f4-661247957dcc.png)   ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246624685-3a0f739e-a3fe-4368-af1d-e73fedd05796.png)

## 2.形态学膨胀
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246708195-4dde75e0-484d-486d-8bb0-c99527a1ff91.png)

膨胀目的：增大图像中的目标，或者填充、连接某些目标。

```cpp
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw, image_dilate;   //定义输入图像，灰度图像，二值图像，膨胀图像
	image = imread("cat.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("image", image);

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);

	//转换为二值图
	threshold(image_gray, image_bw, 120, 255, 0); //通过0，1调节二值图像背景颜色
	imshow("image_bw", image_bw);

	//膨胀
	Mat se = getStructuringElement(0, Size(3, 3)); //构造矩形结构元素
	dilate(image_bw, image_dilate, se, Point(-1, -1), 9); //执行膨胀操作
	imshow("image_dilate", image_dilate);

	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246770363-ebd8ac3e-d3fd-48a2-a0c3-1c127f3c3ba2.png) ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246778460-e7eb79c6-2e5b-4b8b-86b8-8baaf2d03883.png)

## 3.开运算和闭运算
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246831421-88401df6-a62a-4f0b-9c0c-402e69978707.png)

```cpp
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw;   //定义输入图像，灰度图像，二值图像
	image = imread("cat.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("image", image);

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);

	//转换为二值图
	threshold(image_gray, image_bw, 120, 255, 1); //通过0，1调节二值图像背景颜色
	imshow("image_bw", image_bw);
	
	//闭运算
	Mat se = getStructuringElement(0, Size(3, 3)); //构造矩形结构元素
	dilate(image_bw, image_bw, se, Point(-1, -1), 5); //执行膨胀操作
	erode(image_bw, image_bw, se, Point(-1, -1), 5); //执行腐蚀操作
	
	//开运算
	//Mat se = getStructuringElement(0, Size(3, 3)); //构造矩形结构元素
	//erode(image_bw, image_bw, se, Point(-1, -1), 2); //执行腐蚀操作
	//dilate(image_bw, image_bw, se, Point(-1, -1), 2); //执行膨胀操作

	imshow("image_bw", image_bw);

	waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246894083-2cd718b5-321f-4bca-8e37-6b81da245aa4.png)   ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246909732-3c1cfa39-20ff-45ee-9424-69fdf791fb96.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246923127-4dabb7c4-4f1f-47fa-8b5d-f1855e9b7922.png)  ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725246934043-7bece63c-8356-4be4-b1ff-e3de8301e7ec.png)

##  4.morphologyEx函数
```cpp
void morphologyEx( InputArray src, 
                   OutputArray dst,
                   int op, 
                   InputArray kernel,
                   Point anchor = Point(-1,-1), 
                   int iterations = 1,
                   int borderType = BORDER_CONSTANT,
                   const Scalar& borderValue = morphologyDefaultBorderValue() );
形态学操作的类型op。可以是以下值之一：
cv::MORPH_ERODE：0 腐蚀操作。
cv::MORPH_DILATE：1 膨胀操作。
cv::MORPH_OPEN：2 开运算（先腐蚀后膨胀）。
cv::MORPH_CLOSE：3 闭运算（先膨胀后腐蚀）。
cv::MORPH_GRADIENT：4 形态学梯度（膨胀图与腐蚀图之差）。
cv::MORPH_TOPHAT：5 顶帽操作（原图像与开运算结果之差）。
cv::MORPH_BLACKHAT：6 黑帽操作（闭运算结果与原图像之差）。
cv::MORPH_HITMISS ： 7 击中-击不中变换。

    
// 创建一个5x5的矩形结构元素  
cv::Mat kernel = cv::getStructuringElement(cv::MORPH_RECT, cv::Size(5, 5));
// 对图像src执行闭运算
cv::morphologyEx(src, dst, cv::MORPH_CLOSE, kernel);  

```

知乎专栏 ：[https://zhuanlan.zhihu.com/p/542900419](https://zhuanlan.zhihu.com/p/542900419)

# 边缘检测与阈值分割
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725247242397-c1ef0ade-3eb8-4f29-891b-14066c5adcbb.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725247252642-e714a091-0954-4bd5-ad2d-53a921c0b7b6.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725247305233-c971a2ca-010a-46eb-ade2-1a672f25b480.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725247316569-686146c9-45fb-4439-bc78-eab67f4e8af9.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725247326048-3aef0e73-5a7c-4698-a24b-6df8282e1b25.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725247373623-aad3668a-9719-4e06-832c-29b53313bad1.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725247354538-220b1328-6877-4501-ab5a-5d71989768e9.png)

## 1.图像分割-孤立点检测
```cpp
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw, image_bw2;
	image = imread("cat.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);
	cv::imshow("image_gray", image_gray);

	//1.构建拉普拉斯孤立点检测卷积核
	Mat Laplacian_kernel = (cv::Mat_<float>(3, 3) << 
		0, 1, 0,
		1, -4, 1,
		0, 1, 0);

	//2.卷积运算
	filter2D(image_gray, image_bw, -1, Laplacian_kernel);
	cv::imshow("image_bw", image_bw);

	//3.阈值处理
	threshold(image_bw, image_bw2, 250, 255, 0); //通过0，1调节二值图像背景颜色
	cv::imshow("image_bw2", image_bw2);

	cv::waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251062914-d9b7134a-1314-4848-ab27-c3c7ec93314e.png)

## 2.图像分割-线检测
```cpp
 //使用拉普拉斯核进行线的检测：
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw, image_bw2;
	image = imread("bian.bmp");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);
	cv::imshow("image_gray", image_gray);

	//构建拉普拉斯卷积核
	Mat Laplacian_kernel = (cv::Mat_<float>(3, 3) << 
		0, 1, 0,
		1, -4, 1,
		0, 1, 0);

	//卷积运算
	filter2D(image_gray, image_bw, -1, Laplacian_kernel);
	cv::imshow("image_bw", image_bw);

	//8邻域
	Mat Laplacian_kerne2 = (cv::Mat_<float>(3, 3) << 1, 1, 1,
		1, -8, 1,
		1, 1, 1);
	filter2D(image_gray, image_bw2, -1, Laplacian_kerne2);
	cv::imshow("image_bw2", image_bw2);

	cv::waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251153816-185ce017-90a9-499f-93b7-3caf4c123e39.png)

### 规定方向的线检测
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251226343-ed200b28-7c66-4543-bb97-c8108c2c6f26.png)

```cpp
//规定方向的线检测
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw, image_bw2, image_bw3, image_bw4;
	image = imread("bian.bmp");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);
	cv::imshow("image_gray", image_gray);

	//水平
	Mat Laplacian_kernel = (cv::Mat_<float>(3, 3) << -1, -1, -1,
		2, 2, 2,
		-1, -1, -1);
	filter2D(image_gray, image_bw, -1, Laplacian_kernel);
	cv::imshow("image_bw", image_bw);

	//45°
	Mat Laplacian_kernel2 = (cv::Mat_<float>(3, 3) << 2, -1, -1,
		-1, 2, -1,
		-1, -1, 2);
	filter2D(image_gray, image_bw2, -1, Laplacian_kernel2);
	cv::imshow("image_bw2", image_bw2);

	//垂直
	Mat Laplacian_kernel3 = (cv::Mat_<float>(3, 3) << -1, 2, -1,
		-1, 2, -1,
		-1, 2, -1);
	filter2D(image_gray, image_bw3, -1, Laplacian_kernel3);
	cv::imshow("image_bw3", image_bw3);

	//-45°
	Mat Laplacian_kernel4 = (cv::Mat_<float>(3, 3) << -1, -1, 2,
		-1, 2, -1,
		2, -1, -1);
	filter2D(image_gray, image_bw4, -1, Laplacian_kernel4);
	cv::imshow("image_bw4", image_bw4);

	cv::waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251373194-261eadbf-ee03-419c-a608-b85c6f3e1a97.png)

原图

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251273033-9af92aa2-ca6a-4916-9c58-d81cee8c9551.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251281481-1d1e9c5c-59ad-45a4-b7b5-111ff48678dc.png)

水平							45°

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251289439-b7e97bd8-5465-4bd1-abcb-7de5a556420f.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251297319-f5bbfbd2-a74e-4415-9afc-ed4a9af75be2.png)

竖直							-45°



边缘检测步骤边缘检测通常包含三个步骤：

（1）对图像进行平滑处理，降低图像噪声。

（2）检测边缘点，从图像中提取所有可能是边缘的点（候选边缘点）。

（3）边缘定位，从候选边缘点中选择组成边缘点集中的成员点。

## 3.Roberts、Prewitt、Sobel边缘检测
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251529525-021ca096-c17c-4175-ae1b-0d2c857da159.png)

  ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251537984-5ff87c9f-7a29-4e1a-bddf-cf4cf5e926ac.png)    ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251544317-1fca322b-c0e7-4927-97c6-1d86bdeff50f.png)

```cpp
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw, image_bw1, image_bw2;
	image = imread("person.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);
	cv::imshow("image_gray", image_gray);

	//构建检测核
	Mat kernel1 = (cv::Mat_<float>(2, 2) << -1, 0, 0, 1);
	Mat kernel2 = (cv::Mat_<float>(2, 2) << 0, -1, 1, 0);
	//利用filter2D进行处理
	filter2D(image_gray, image_bw1, -1, kernel1);
	filter2D(image_gray, image_bw2, -1, kernel2);
	//结果取绝对值
	convertScaleAbs(image_bw1, image_bw1);
	convertScaleAbs(image_bw2, image_bw2);
	//转换为二值图
	threshold(image_bw1, image_bw1, 30, 255, 0);
	threshold(image_bw2, image_bw2, 30, 255, 0);
	//两个方向的结果相加
	image_bw = image_bw1 + image_bw2;

	cv::imshow("robert1", image_bw1);
	cv::imshow("robert2", image_bw2);
	cv::imshow("robert", image_bw);

	cv::waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251681855-690d593c-4b7e-4fd5-8ad5-52ff62c39f56.png)



```cpp
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw, image_bw1, image_bw2;
	image = imread("person.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);
	cv::imshow("image_gray", image_gray);

	//构建检测核
	Mat kernel1 = (cv::Mat_<float>(3, 3) << -1, -1, -1, 0, 0, 0, 1, 1, 1);
	Mat kernel2 = (cv::Mat_<float>(3, 3) << -1, 0, 1, -1, 0, 1, -1, 0, 1);
	//利用filter2D进行处理
	filter2D(image_gray, image_bw1, -1, kernel1);
	filter2D(image_gray, image_bw2, -1, kernel2);
	//结果取绝对值
	convertScaleAbs(image_bw1, image_bw1);
	convertScaleAbs(image_bw2, image_bw2);
	//转换为二值图
	threshold(image_bw1, image_bw1, 60, 255, 0);
	threshold(image_bw2, image_bw2, 60, 255, 0);
	//两个方向的结果相加
	image_bw = image_bw1 + image_bw2;

	cv::imshow("prewittX", image_bw1);
	cv::imshow("prewittY", image_bw2);
	cv::imshow("prewitt", image_bw);

	cv::waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251751766-7aba6ecb-8cf9-477f-8ae0-918843541760.png)



```cpp
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw, image_bw1, image_bw2;
	image = imread("person.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);
	cv::imshow("image_gray", image_gray);

	//构建检测核
	Mat kernel1 = (cv::Mat_<float>(3, 3) << -1, -2, -1, 0, 0, 0, 1, 2, 1);
	Mat kernel2 = (cv::Mat_<float>(3, 3) << -1, 0, 1, -2, 0, 2, -1, 0, 1);
	//利用filter2D进行处理
	filter2D(image_gray, image_bw1, -1, kernel1);
	filter2D(image_gray, image_bw2, -1, kernel2);
	//结果取绝对值
	convertScaleAbs(image_bw1, image_bw1);
	convertScaleAbs(image_bw2, image_bw2);
	//转换为二值图
	threshold(image_bw1, image_bw1, 60, 255, 0);
	threshold(image_bw2, image_bw2, 60, 255, 0);
	//两个方向的结果相加
	image_bw = image_bw1 + image_bw2;

	cv::imshow("sobelX", image_bw1);
	cv::imshow("sobelY", image_bw2);
	cv::imshow("sobel", image_bw);

	cv::waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725251843550-511f18af-f45a-4edf-811d-941f314ab0a5.png)



**利用opencv的Sobel函数处理**

```cpp
// 利用opencv的Sobel函数处理
#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	Mat image, image_gray, image_bw, image_bw1, image_bw2;
	image = imread("person.jpg");  //读取图像；
	if (image.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}

	//转换为灰度图像
	cvtColor(image, image_gray, COLOR_BGR2GRAY);
	cv::imshow("image_gray", image_gray);

	//Sobel   void Sobel(InputArray src, OutputArray dst, int ddepth, int dx, int dy, int ksize=3, double scale=1, double delta=0, int borderType=BORDER_DEFAULT)
	Sobel(image_gray, image_bw1, -1, 1, 0);   //dx=1 且 dy=0，则函数将计算一阶 x 导数
	Sobel(image_gray, image_bw2, -1, 0, 1);

	//结果取绝对值
	convertScaleAbs(image_bw1, image_bw1);
	convertScaleAbs(image_bw2, image_bw2);
	//转换为二值图       梯度值转换为二值图像可以清晰地显示出边缘，使得后续的图像处理或分析更加简单
	threshold(image_bw1, image_bw1, 60, 255, 0);
	threshold(image_bw2, image_bw2, 60, 255, 0);
	//两个方向的结果相加
	image_bw = image_bw1 + image_bw2;

	cv::imshow("sobelX", image_bw1);
	cv::imshow("sobelY", image_bw2);
	cv::imshow("sobel", image_bw);

	cv::waitKey(0);  //暂停，保持图像显示，等待按键结束
	return 0;
}
```

## 4.Canny边缘检测
<font style="color:rgb(25, 27, 31);">canny边缘检测算子是传统边缘检测算子中最优秀的，canny检测基于下面三个目标：</font>

<font style="color:rgb(25, 27, 31);">（1）</font>**<font style="color:rgb(25, 27, 31);">低错误率</font>**<font style="color:rgb(25, 27, 31);">。即所有边缘都应该找到，并且没有虚假边缘。</font>

<font style="color:rgb(25, 27, 31);">（2）</font>**<font style="color:rgb(25, 27, 31);">准确的定位边缘</font>**<font style="color:rgb(25, 27, 31);">。即检测到的边缘应该接近真实的边缘。</font>

<font style="color:rgb(25, 27, 31);">（3）</font>**<font style="color:rgb(25, 27, 31);">单个边缘点响应</font>**<font style="color:rgb(25, 27, 31);">。即对于边缘检测，只返回单点厚度的结果。</font>

### <font style="color:rgb(25, 27, 31);">方法步骤</font>
<font style="color:rgb(25, 27, 31);">（1）使用</font>[<font style="color:rgb(25, 27, 31);">高斯滤波器</font>](https://zhida.zhihu.com/search?q=%E9%AB%98%E6%96%AF%E6%BB%A4%E6%B3%A2%E5%99%A8&zhida_source=entity&is_preview=1)<font style="color:rgb(25, 27, 31);">平滑图像（基本边缘检测基本都有这步，为了减少噪声的影响）</font>

<font style="color:rgb(25, 27, 31);">（2）计算梯度幅值和边缘方向</font>

<font style="color:rgb(25, 27, 31);">（3）非极大值抑制（细化边缘）</font>

<font style="color:rgb(25, 27, 31);">（4）使用双阈值处理和连通性分析检测和链接边缘</font>

<font style="color:rgb(25, 27, 31);"></font>

```cpp
#include<opencv2/opencv.hpp>

using namespace std;
using namespace cv;

int main()
{
	Mat img1 = imread("person.jpg", 0);//读取灰度图像
	if (img1.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("gray", img1);

	Mat img2 = Mat(img1.size(), CV_8U, Scalar(0));

	//opencv自带canny检测函数
	Canny(img1, img2, 50, 150);
	imshow("canny", img2);
	waitKey();

	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725252079855-9b4ff272-0688-4323-9113-d4ccd6ebc1b3.png)   ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725252085489-7e71e351-d9fc-4c82-95ba-0c86f9ab7e4a.png)





知乎专栏：[https://zhuanlan.zhihu.com/p/558742282](https://zhuanlan.zhihu.com/p/558742282)

```cpp
#include<iostream>
#include<opencv2/opencv.hpp>
#include<cmath>

using namespace cv;
using namespace std;

//1 高斯滤波
void Gaussfilter_ly(Mat input_image, Mat& output_image, int Gauss_size, double Sigma)
{
	//保证高斯核大小为大于等于3的奇数
	if (Gauss_size < 3) Gauss_size = 3;
	else Gauss_size = (int)(Gauss_size / 2) * 2 + 1;

	//生成高斯卷积核
	double** Gausskernel = new double* [Gauss_size];
	for (int i = 0; i < Gauss_size; i++)
	{
		Gausskernel[i] = new double[Gauss_size];
	}
	int center = Gauss_size / 2;
	double sum = 0;

	for (int i = 0; i < Gauss_size; i++)
	{
		for (int j = 0; j < Gauss_size; j++)
		{
			Gausskernel[i][j] = exp(-((i - center) * (i - center) + (j - center) * (j - center)) / (2 * Sigma * Sigma));
			sum += Gausskernel[i][j];
		}
	}
	//高斯卷积核归一化
	double sum1 = 1 / sum;
	for (int i = 0; i < Gauss_size; i++)
	{
		for (int j = 0; j < Gauss_size; j++)
		{
			Gausskernel[i][j] *= sum1;
		}
	}

	//滤波
	Mat tem_image = input_image.clone();
	int rows = input_image.rows - center;
	int cols = input_image.cols - center;
	for (int i = center; i < rows; i++)
	{
		for (int j = center; j < cols; j++)
		{
			double sum = 0;
			for (int m = -center; m <= center; m++)
			{
				for (int n = -center; n <= center; n++)
				{
					sum += Gausskernel[center + m][center + n] * input_image.at<uchar>(i + m, j + n);
				}
			}
			tem_image.at<uchar>(i, j) = static_cast<uchar>(sum);
		}
	}
	output_image = tem_image;

	//释放内存
	for (int i = 0; i < Gauss_size; i++) delete[] Gausskernel[i];
	delete[] Gausskernel;
}


//2 计算梯度幅值图像,方向图像和边缘图像
void Grad_dire_ly(Mat input, Mat& Gradimage, Mat& Direimage)
{
	Mat tempGrad = Mat(input.size(), CV_16U, Scalar(0));
	Mat tempDire = Mat(input.size(), CV_8U, Scalar(0));

	int width = input.cols;
	int height = input.rows;

	for (int i = 1; i < height - 1; i++)
	{
		for (int j = 1; j < width - 1; j++)
		{
			//计算梯度及梯度幅值
			int gx = input.at<uchar>(i + 1, j - 1) + input.at<uchar>(i + 1, j) + input.at<uchar>(i + 1, j + 1)
				- input.at<uchar>(i - 1, j - 1) - input.at<uchar>(i - 1, j) - input.at<uchar>(i - 1, j + 1);
			int gy = input.at<uchar>(i - 1, j + 1) + input.at<uchar>(i, j + 1) + input.at<uchar>(i + 1, j + 1)
				- input.at<uchar>(i - 1, j - 1) - input.at<uchar>(i, j - 1) - input.at<uchar>(i + 1, j - 1);
			int sum = gx + gy;

			//梯度幅值图像
			tempGrad.at<ushort>(i, j) = abs(sum);

			//方向图像,图像中的坐标轴
			double dire = atan2(gy, gx) * 180 / 3.1415926;
			if (dire <= -67.5 || dire >= 67.5) tempDire.at<uchar>(i, j) = 1; //1：水平
			else if (dire > -67.5 && dire < -22.5) tempDire.at<uchar>(i, j) = 2; //2：45
			else if (dire > -22.5 && dire < 22.5) tempDire.at<uchar>(i, j) = 3; //3：垂直
			else tempDire.at<uchar>(i, j) = 4; //4：-45
		}
	}
	Gradimage = tempGrad;
	Direimage = tempDire;
}

//3 非极大值抑制图像
void Nonmax_suppression_ly(Mat Gradimage, Mat Direimage, Mat& Suppimage)
{
	Mat tempSupp = Mat(Gradimage.size(), Gradimage.type(), Scalar(0));

	int width = Gradimage.cols;
	int height = Gradimage.rows;

	for (int i = 1; i < height - 1; i++)
	{
		for (int j = 1; j < width - 1; j++)
		{
			switch (Direimage.at<uchar>(i, j))
			{
			case 1:
				if (Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i, j - 1) && Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i, j + 1))
					tempSupp.at<ushort>(i, j) = Gradimage.at<ushort>(i, j);
				else
					tempSupp.at<ushort>(i, j) = 0;
				break;
			case 2:
				if (Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i + 1, j - 1) && Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i - 1, j + 1))
					tempSupp.at<ushort>(i, j) = Gradimage.at<ushort>(i, j);
				else
					tempSupp.at<ushort>(i, j) = 0;
				break;
			case 3:
				if (Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i - 1, j) && Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i + 1, j))
					tempSupp.at<ushort>(i, j) = Gradimage.at<ushort>(i, j);
				else
					tempSupp.at<ushort>(i, j) = 0;
				break;
			case 4:
				if (Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i - 1, j - 1) && Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i + 1, j + 1))
					tempSupp.at<ushort>(i, j) = Gradimage.at<ushort>(i, j);
				else
					tempSupp.at<ushort>(i, j) = 0;
				break;
			default:

				break;
			}
		}
	}
	Suppimage = tempSupp;
}

//4 滞后阈值处理（双阈值）
void doubleThread_ly(Mat Suppimage, Mat& Edgeimage, int th_high, int th_low)
{
	int temp;
	if (th_high < th_low)
	{
		temp = th_high;
		th_high = th_low;
		th_low = temp;
	}

	Mat bw_h = Mat(Suppimage.size(), CV_8UC1, Scalar(0));
	Mat bw_l = Mat(Suppimage.size(), CV_8UC1, Scalar(0));

	int width = Suppimage.cols;
	int height = Suppimage.rows;

	for (int i = 0; i < height; i++)
	{
		for (int j = 0; j < width; j++)
		{
			if (Suppimage.at<ushort>(i, j) >= th_high)
				bw_h.at<uchar>(i, j) = 255;
			else
				bw_h.at<uchar>(i, j) = 0;
			if (Suppimage.at<ushort>(i, j) >= th_low && Suppimage.at<ushort>(i, j) < th_high)
				bw_l.at<uchar>(i, j) = 255;
			else
				bw_l.at<uchar>(i, j) = 0;
		}
	}

	Mat bw = bw_h.clone();
	for (int i = 1; i < height - 1; i++)
	{
		for (int j = 1; j < width - 1; j++)
		{
			if (bw_h.at<uchar>(i, j) == 255)
			{
				if (bw_l.at<uchar>(i - 1, j - 1) == 255)
					bw.at<uchar>(i - 1, j - 1) = 255;
				if (bw_l.at<uchar>(i - 1, j) == 255)
					bw.at<uchar>(i - 1, j) = 255;
				if (bw_l.at<uchar>(i - 1, j + 1) == 255)
					bw.at<uchar>(i - 1, j + 1) = 255;
				if (bw_l.at<uchar>(i, j - 1) == 255)
					bw.at<uchar>(i, j - 1) = 255;
				if (bw_l.at<uchar>(i, j + 1) == 255)
					bw.at<uchar>(i, j + 1) = 255;
				if (bw_l.at<uchar>(i + 1, j - 1) == 255)
					bw.at<uchar>(i + 1, j - 1) = 255;
				if (bw_l.at<uchar>(i + 1, j) == 255)
					bw.at<uchar>(i + 1, j) = 255;
				if (bw_l.at<uchar>(i + 1, j + 1) == 255)
					bw.at<uchar>(i + 1, j + 1) = 255;
			}
		}
	}

	Edgeimage = bw;
}

//5 canny函数
void canny_ly(Mat input_image, Mat& output_image, int th_high, int th_low, int Gauss_size, double sigmma)
{
	Mat Gaussimage, Gradimage, Direimage, Suppimage, Edgeimage;
	//1 高斯滤波函数
	Gaussfilter_ly(input_image, Gaussimage, Gauss_size, sigmma);
	//2 计算梯度幅值图像和方向图像
	Grad_dire_ly(Gaussimage, Gradimage, Direimage);
	//3 非极大值抑制图像
	Nonmax_suppression_ly(Gradimage, Direimage, Suppimage);
	//4 滞后阈值处理（双阈值）
	doubleThread_ly(Suppimage, Edgeimage, th_high, th_low);

	output_image = Edgeimage;
}


//#include "CannyLY.h"

int main()
{
	Mat img1 = imread("person.jpg", 0);//读取灰度图像
	if (img1.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("gray", img1);

	Mat img2;
	canny_ly(img1, img2, 50, 20, 3, 1);
	imshow("canny", img2);
	waitKey(0);

	return 0;
}
```

```cpp
#ifndef _CANNY_LY_
#define _CANNY_LY_

#include<opencv2/opencv.hpp>

using namespace std;
using namespace cv;

//1 高斯滤波函数
void Gaussfilter_ly(Mat input, Mat &output, int Gauss_size, double Sigma);

//2 计算梯度幅值图像和方向图像
void Grad_dire_ly(Mat input, Mat& Gradimage, Mat& Direimage);

//3 非极大值抑制图像
void Nonmax_suppression_ly(Mat Gradimage, Mat Direimage, Mat& Suppimage);

//4 滞后阈值处理（双阈值）
void doubleThread_ly(Mat Suppimage, Mat& Edgeimage, int th_high, int th_low);

//5 canny函数
void canny_ly(Mat input_image, Mat& output_image, int th_high, int th_low, int Gauss_size, double sigmma);

#endif

```

```cpp
#include "CannyLY.h"

//1 高斯滤波
void Gaussfilter_ly(Mat input_image, Mat& output_image, int Gauss_size, double Sigma)
{
	//保证高斯核大小为大于等于3的奇数
	if (Gauss_size < 3) Gauss_size = 3;
	else Gauss_size = (int)(Gauss_size / 2) * 2 + 1;

	//生成高斯卷积核
	double** Gausskernel = new double* [Gauss_size];
	for (int i = 0; i < Gauss_size; i++) 
	{
		Gausskernel[i] = new double[Gauss_size];
	}
	int center = Gauss_size / 2;
	double sum = 0;

	for (int i = 0; i < Gauss_size; i++)
	{
		for (int j = 0; j < Gauss_size; j++)
		{
			Gausskernel[i][j] = exp(-((i - center) * (i - center) + (j - center) * (j - center)) / (2 * Sigma * Sigma));
			sum += Gausskernel[i][j];
		}
	}
	//高斯卷积核归一化
	double sum1 = 1 / sum;
	for (int i = 0; i < Gauss_size; i++)
	{
		for (int j = 0; j < Gauss_size; j++)
		{
			Gausskernel[i][j] *= sum1;
		}
	}

	//滤波
	Mat tem_image = input_image.clone();
	int rows = input_image.rows - center;
	int cols = input_image.cols - center;
	for (int i = center; i < rows; i++) 
	{
		for (int j = center; j < cols; j++) 
		{
			double sum = 0;
			for (int m = -center; m <= center; m++) 
			{
				for (int n = -center; n <= center; n++) 
				{
					sum += Gausskernel[center + m][center + n] * input_image.at<uchar>(i + m, j + n);
				}
			}
			tem_image.at<uchar>(i, j) = static_cast<uchar>(sum);
		}
	}
	output_image = tem_image;

	//释放内存
	for (int i =0; i < Gauss_size; i++) delete[] Gausskernel[i];
	delete[] Gausskernel;
}


//2 计算梯度幅值图像,方向图像和边缘图像
void Grad_dire_ly(Mat input, Mat& Gradimage, Mat& Direimage)
{
	Mat tempGrad = Mat(input.size(), CV_16U, Scalar(0));
	Mat tempDire = Mat(input.size(), CV_8U, Scalar(0));

	int width = input.cols;
	int height = input.rows;

	for (int i = 1; i < height - 1; i++)
	{
		for (int j = 1; j < width - 1; j++)
		{
			//计算梯度及梯度幅值
			int gx = input.at<uchar>(i + 1, j - 1) + input.at<uchar>(i + 1, j) + input.at<uchar>(i + 1, j + 1)
				- input.at<uchar>(i - 1, j - 1) - input.at<uchar>(i - 1, j) - input.at<uchar>(i - 1, j + 1);
			int gy = input.at<uchar>(i - 1, j + 1) + input.at<uchar>(i, j + 1) + input.at<uchar>(i + 1, j + 1)
				- input.at<uchar>(i - 1, j - 1) - input.at<uchar>(i, j - 1) - input.at<uchar>(i + 1, j - 1);
			int sum = gx + gy;

			//梯度幅值图像
			tempGrad.at<ushort>(i, j) = abs(sum);

			//方向图像,图像中的坐标轴
			double dire = atan2(gy, gx) * 180 / 3.1415926;
			if(dire <= -67.5 || dire >= 67.5) tempDire.at<uchar>(i, j) = 1; //1：水平
			else if(dire > -67.5 && dire < -22.5) tempDire.at<uchar>(i, j) = 2; //2：45
			else if(dire > -22.5 && dire < 22.5) tempDire.at<uchar>(i, j) = 3; //3：垂直
			else tempDire.at<uchar>(i, j) = 4; //4：-45
		}
	}
	Gradimage = tempGrad;
	Direimage = tempDire;
}

//3 非极大值抑制图像
void Nonmax_suppression_ly(Mat Gradimage, Mat Direimage, Mat& Suppimage)
{
	Mat tempSupp = Mat(Gradimage.size(), Gradimage.type(), Scalar(0));

	int width = Gradimage.cols;
	int height = Gradimage.rows;

	for (int i = 1; i < height - 1; i++)
	{
		for (int j = 1; j < width - 1; j++)
		{
			switch (Direimage.at<uchar>(i, j))
			{
				case 1 :
					if (Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i, j - 1) && Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i, j + 1))
						tempSupp.at<ushort>(i, j) = Gradimage.at<ushort>(i, j);
					else
						tempSupp.at<ushort>(i, j) = 0;
					break;
				case 2:
					if (Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i + 1, j - 1) && Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i - 1, j + 1))
						tempSupp.at<ushort>(i, j) = Gradimage.at<ushort>(i, j);
					else
						tempSupp.at<ushort>(i, j) = 0;
					break;
				case 3:
					if (Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i - 1, j) && Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i + 1, j))
						tempSupp.at<ushort>(i, j) = Gradimage.at<ushort>(i, j);
					else
						tempSupp.at<ushort>(i, j) = 0;
					break;
				case 4:
					if (Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i - 1, j - 1) && Gradimage.at<ushort>(i, j) >= Gradimage.at<ushort>(i + 1, j + 1))
						tempSupp.at<ushort>(i, j) = Gradimage.at<ushort>(i, j);
					else
						tempSupp.at<ushort>(i, j) = 0;
					break;
				default:

					break;
			}
		}
	}
	Suppimage = tempSupp;
}

//4 滞后阈值处理（双阈值）
void doubleThread_ly(Mat Suppimage, Mat& Edgeimage, int th_high, int th_low)
{
	int temp;
	if (th_high < th_low)
	{
		temp = th_high;
		th_high = th_low;
		th_low = temp;
	}

	Mat bw_h = Mat(Suppimage.size(), CV_8UC1, Scalar(0));
	Mat bw_l = Mat(Suppimage.size(), CV_8UC1, Scalar(0));

	int width = Suppimage.cols;
	int height = Suppimage.rows;

	for (int i = 0; i < height; i++)
	{
		for (int j = 0; j < width; j++)
		{
			if (Suppimage.at<ushort>(i, j) >= th_high)
				bw_h.at<uchar>(i, j) = 255;
			else
				bw_h.at<uchar>(i, j) = 0;
			if (Suppimage.at<ushort>(i, j) >= th_low && Suppimage.at<ushort>(i, j) < th_high)
				bw_l.at<uchar>(i, j) = 255;
			else
				bw_l.at<uchar>(i, j) = 0;
		}
	}

	Mat bw = bw_h.clone();
	for (int i = 1; i < height - 1; i++)
	{
		for (int j = 1; j < width - 1; j++)
		{
			if (bw_h.at<uchar>(i, j) == 255)
			{
				if (bw_l.at<uchar>(i - 1, j - 1) == 255)
					bw.at<uchar>(i - 1, j - 1) = 255;
				if (bw_l.at<uchar>(i - 1, j) == 255)
					bw.at<uchar>(i - 1, j) = 255;
				if (bw_l.at<uchar>(i - 1, j+ 1) == 255)
					bw.at<uchar>(i - 1, j + 1) = 255;
				if (bw_l.at<uchar>(i, j - 1) == 255)
					bw.at<uchar>(i, j - 1) = 255;
				if (bw_l.at<uchar>(i, j + 1) == 255)
					bw.at<uchar>(i, j + 1) = 255;
				if (bw_l.at<uchar>(i + 1, j - 1) == 255)
					bw.at<uchar>(i + 1, j - 1) = 255;
				if (bw_l.at<uchar>(i + 1, j) == 255)
					bw.at<uchar>(i + 1, j) = 255;
				if (bw_l.at<uchar>(i + 1, j + 1) == 255)
					bw.at<uchar>(i + 1, j + 1) = 255;
			}
		}
	}

	Edgeimage = bw;
}

//5 canny函数
void canny_ly(Mat input_image, Mat& output_image, int th_high, int th_low, int Gauss_size, double sigmma)
{
	Mat Gaussimage, Gradimage, Direimage, Suppimage, Edgeimage;
	//1 高斯滤波函数
	Gaussfilter_ly(input_image, Gaussimage, Gauss_size, sigmma);
	//2 计算梯度幅值图像和方向图像
	Grad_dire_ly(Gaussimage, Gradimage, Direimage);
	//3 非极大值抑制图像
	Nonmax_suppression_ly(Gradimage, Direimage, Suppimage);
	//4 滞后阈值处理（双阈值）
	doubleThread_ly(Suppimage, Edgeimage, th_high, th_low);

	output_image = Edgeimage;
}

```

```cpp
#include<opencv2/opencv.hpp>
#include "CannyLY.h"

using namespace std;
using namespace cv;

int main()
{
	Mat img1 = imread("lena.png", 0);//读取灰度图像
	if (img1.empty())
	{
		cout << "读取错误" << endl;
		return -1;
	}
	imshow("img1", img1);

	Mat img2;
	canny_ly(img1, img2, 50, 20, 3, 1);
	imshow("img2", img2);
	waitKey();

	return 0;
}

```

## 5.阈值分割
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725252893329-5f69a7a6-fe6d-44f5-99bf-7cae87bb7899.png)

```cpp
#include <opencv2/opencv.hpp>  
#include <iostream>   

using namespace std;
using namespace cv; 

double kittler(Mat& image) {
    // 将图像转换为浮点数类型  
    Mat image_float;
    image.convertTo(image_float, CV_32F);

    // 计算图像的直方图  
    Mat hist, hist_norm;
    int histSize = 256;
    float range[] = { 0, 256 };
    const float* histRange = { range };
    calcHist(&image_float, 1, 0, Mat(), hist, 1, &histSize, &histRange);
    normalize(hist, hist_norm, 0, 255, NORM_MINMAX);

    // 计算累计直方图  
    Mat hist_cum;
    accumulate(hist_norm, hist_cum);

    // 计算最佳阈值  
    double max_val = 0;
    double min_val = 0;
    double sum = 0;
    double max_err = 0;
    double err[256];
    for (int i = 0; i < histSize; i++) {
        double total = hist_cum.at<float>(i);
        double left = hist_cum.at<float>(i - 1);
        double err_val = fabs(total - left);
        err[i] = err_val;
        double p1, p2;
        if (total > 0 && left > 0) {

            p1 = (double)i / histSize;
            p2 = (double)(i - 1) / histSize;
            sum += err_val;
            if (err_val > max_err) {
                max_err = err_val;
                max_val = p1;
            }
        }
        else {
            min_val = p2;
        }
    }
    double m1 = sum / (max_val + min_val);
    double m2 = sum * sum / ((max_val + min_val) * (max_val + min_val));
    double mean = m1 - m2;
    double stddev = sqrt(m2 - mean * mean);
    double thresh = mean + 0.5 * stddev; // Kittler's method threshold formula  
    return thresh;
}

void zero_one_img(Mat& image)
{
    Mat gray;
    cvtColor(image, gray, COLOR_BGR2GRAY);
    namedWindow("gray", WINDOW_FREERATIO);
    imshow("gray", gray);

    // threshold(灰度图, 输出图像, 阈值, 图像最大像素值, 阈值分割方法); 
    Mat binary;
    //不同方法模式
    threshold(gray, binary, 127, 255, THRESH_BINARY);  //大于阈值时置 255，否则置 0
    namedWindow("THRESH_BINARY", WINDOW_FREERATIO);
    imshow("THRESH_BINARY", binary);

    threshold(gray, binary, 127, 255, THRESH_BINARY_INV);  //大于阈值时置 0，否则置 255
    namedWindow("THRESH_BINARY_INV", WINDOW_FREERATIO);
    imshow("THRESH_BINARY_INV", binary);

    threshold(gray, binary, 127, 255, THRESH_TRUNC);  //大于阈值时置为阈值 thresh，否则不变（保持原色）
    namedWindow("THRESH_TRUNC", WINDOW_FREERATIO);
    imshow("THRESH_TRUNC", binary);

    threshold(gray, binary, 127, 255, THRESH_TOZERO);   //大于阈值时不变（保持原色），否则置 0
    namedWindow("THRESH_TOZERO", WINDOW_FREERATIO);
    imshow("THRESH_TOZERO", binary);

    threshold(gray, binary, 127, 255, THRESH_TOZERO_INV);   //大于阈值时置 0，否则不变（保持原色）
    namedWindow("THRESH_TOZERO_INV", WINDOW_FREERATIO);
    imshow("THRESH_TOZERO_INV", binary);

    //全局阈值分割方法: 均值法、 OTSU(大津算法)、 三角法（Triangle）
    
    //均值法：统计图像像素值的均值作为阈值
    Scalar m = mean(gray);
    //printf("means : %2f\n", m[0]);

    threshold(gray, binary, m[0], 255, THRESH_BINARY);
    namedWindow("THRESH_BINARY", WINDOW_FREERATIO);
    imshow("THRESH_BINARY", binary);
    
    //OTSU法（基于最小类内方差求阈值的方法）：基于像素直方图的统计结果，统计各像素点值的方差值，选类内方差最小的像素点值作为阈值。
    threshold(gray, binary, 0, 255, THRESH_BINARY | THRESH_OTSU);
    namedWindow("THRESH_OTSU", WINDOW_FREERATIO);
    imshow("THRESH_OTSU", binary);

    //Triangle法：获取如下直方图后，从最高点到最低点作一线段，以α和β为45°为前提，寻找右图上使得d最大的线段，将此时α角点的像素点值作为阈值。
    threshold(gray, binary, 0, 255, THRESH_BINARY | THRESH_TRIANGLE);
    namedWindow("THRESH_OTSU", WINDOW_FREERATIO);
    imshow("THRESH_OTSU", binary);


    // 适用情况总结:OTSU法适用于有多峰直方图的图像，三角法使用有单峰直方图的图像。
    /*
    //OTSU
    double t1 = threshold(gray, binary, 0, 255, THRESH_BINARY | THRESH_OTSU);//t1为otsu分割阈值
    printf("otsu threshold T:%.2f\n", t1);
    imshow("otsu binary", binary);

    //三角法 triangle
    double t2 = threshold(gray, binary, 0, 255, THRESH_BINARY | THRESH_TRIANGLE);//t2为triangle分割阈值
    printf("triangle threshold T:%.2f\n", t2);
    imshow("triangle binary", binary);
    */


    //自适应阈值
    adaptiveThreshold(gray, binary, 255, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, 3, 0);   //阈值是邻域的高斯核加权均值
    namedWindow("adaptiveThreshold-gaussian", WINDOW_FREERATIO);
    imshow("adaptiveThreshold-gaussian", binary);

    adaptiveThreshold(gray, binary, 255, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY, 3, 0);   //阈值是邻域的均值
    namedWindow("adaptiveThreshold-mean", WINDOW_FREERATIO);
    imshow("adaptiveThreshold-mean", binary);

    
    // 应用Kittler算法进行阈值分割  
    //double thresh = kittler(gray);
    //threshold(gray, binary, thresh, 255, THRESH_BINARY + THRESH_OTSU);
    //namedWindow("KittlerThreshold", WINDOW_FREERATIO);
    //imshow("KittlerThreshold", binary);

    waitKey(0); // 等待用户按键，然后关闭窗口
}


int main() {

    // 读取图像  
    cv::Mat image = cv::imread("A005.png", cv::IMREAD_COLOR);
    if (image.empty()) {
        std::cout << "无法读取图像" << std::endl;
        return -1;
    }

    // 调用zero_one_img函数  
    zero_one_img(image);

    return 0;
 
}

```

```cpp
    // threshold(灰度图, 输出图像, 阈值, 图像最大像素值, 阈值分割方法); 
    Mat binary;
    //不同方法模式
    threshold(gray, binary, 127, 255, THRESH_BINARY);  //大于阈值时置 255，否则置 0
    namedWindow("THRESH_BINARY", WINDOW_FREERATIO);
    imshow("THRESH_BINARY", binary);

    threshold(gray, binary, 127, 255, THRESH_BINARY_INV);  //大于阈值时置 0，否则置 255
    namedWindow("THRESH_BINARY_INV", WINDOW_FREERATIO);
    imshow("THRESH_BINARY_INV", binary);

    threshold(gray, binary, 127, 255, THRESH_TRUNC);  //大于阈值时置为阈值 thresh，否则不变（保持原色）
    namedWindow("THRESH_TRUNC", WINDOW_FREERATIO);
    imshow("THRESH_TRUNC", binary);

    threshold(gray, binary, 127, 255, THRESH_TOZERO);   //大于阈值时不变（保持原色），否则置 0
    namedWindow("THRESH_TOZERO", WINDOW_FREERATIO);
    imshow("THRESH_TOZERO", binary);

    threshold(gray, binary, 127, 255, THRESH_TOZERO_INV);   //大于阈值时置 0，否则不变（保持原色）
    namedWindow("THRESH_TOZERO_INV", WINDOW_FREERATIO);
    imshow("THRESH_TOZERO_INV", binary);

```

```cpp
    //全局阈值分割方法: 均值法、 OTSU(大津算法)、 三角法（Triangle）
    
    //均值法：统计图像像素值的均值作为阈值
    Scalar m = mean(gray);
    //printf("means : %2f\n", m[0]);

    threshold(gray, binary, m[0], 255, THRESH_BINARY);
    namedWindow("THRESH_BINARY", WINDOW_FREERATIO);
    imshow("THRESH_BINARY", binary);
    
    //OTSU法（基于最小类内方差求阈值的方法）：基于像素直方图的统计结果，统计各像素点值的方差值，选类内方差最小的像素点值作为阈值。
    threshold(gray, binary, 0, 255, THRESH_BINARY | THRESH_OTSU);
    namedWindow("THRESH_OTSU", WINDOW_FREERATIO);
    imshow("THRESH_OTSU", binary);

    //Triangle法：获取如下直方图后，从最高点到最低点作一线段，以α和β为45°为前提，寻找右图上使得d最大的线段，将此时α角点的像素点值作为阈值。
    threshold(gray, binary, 0, 255, THRESH_BINARY | THRESH_TRIANGLE);
    namedWindow("THRESH_OTSU", WINDOW_FREERATIO);
    imshow("THRESH_OTSU", binary);

```

```cpp
//自适应阈值
adaptiveThreshold(gray, binary, 255, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, 3, 0);   //阈值是邻域的高斯核加权均值
namedWindow("adaptiveThreshold-gaussian", WINDOW_FREERATIO);
imshow("adaptiveThreshold-gaussian", binary);

adaptiveThreshold(gray, binary, 255, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY, 3, 0);   //阈值是邻域的均值
namedWindow("adaptiveThreshold-mean", WINDOW_FREERATIO);
imshow("adaptiveThreshold-mean", binary);

```

```cpp
#include <opencv2/opencv.hpp>  
#include <iostream>   

using namespace std;
using namespace cv; 

double kittler(Mat& image) {
    // 将图像转换为浮点数类型  
    Mat image_float;
    image.convertTo(image_float, CV_32F);

    // 计算图像的直方图  
    Mat hist, hist_norm;
    int histSize = 256;
    float range[] = { 0, 256 };
    const float* histRange = { range };
    calcHist(&image_float, 1, 0, Mat(), hist, 1, &histSize, &histRange);
    normalize(hist, hist_norm, 0, 255, NORM_MINMAX);

    // 计算累计直方图  
    Mat hist_cum;
    accumulate(hist_norm, hist_cum);

    // 计算最佳阈值  
    double max_val = 0;
    double min_val = 0;
    double sum = 0;
    double max_err = 0;
    double err[256];
    for (int i = 0; i < histSize; i++) {
        double total = hist_cum.at<float>(i);
        double left = hist_cum.at<float>(i - 1);
        double err_val = fabs(total - left);
        err[i] = err_val;
        double p1, p2;
        if (total > 0 && left > 0) {

            p1 = (double)i / histSize;
            p2 = (double)(i - 1) / histSize;
            sum += err_val;
            if (err_val > max_err) {
                max_err = err_val;
                max_val = p1;
            }
        }
        else {
            min_val = p2;
        }
    }
    double m1 = sum / (max_val + min_val);
    double m2 = sum * sum / ((max_val + min_val) * (max_val + min_val));
    double mean = m1 - m2;
    double stddev = sqrt(m2 - mean * mean);
    double thresh = mean + 0.5 * stddev; // Kittler's method threshold formula  
    return thresh;
}

void zero_one_img(Mat& image)
{
    Mat gray;
    cvtColor(image, gray, COLOR_BGR2GRAY);
    namedWindow("gray", WINDOW_FREERATIO);
    imshow("gray", gray);

    Mat binary;
    
    //应用Kittler算法进行阈值分割  
    double thresh = kittler(gray);
    threshold(gray, binary, thresh, 255, THRESH_BINARY + THRESH_OTSU);
    namedWindow("KittlerThreshold", WINDOW_FREERATIO);
    imshow("KittlerThreshold", binary);

    waitKey(0); // 等待用户按键，然后关闭窗口
}


int main() {

    // 读取图像  
    cv::Mat image = cv::imread("A005.png", cv::IMREAD_COLOR);
    if (image.empty()) {
        std::cout << "无法读取图像" << std::endl;
        return -1;
    }

    // 调用zero_one_img函数  
    zero_one_img(image);

    return 0;
 
}

```

**阈值分割-全局阈值分割**

原理步骤当目标像素的灰度值与背景像素的灰度值相差比较明显时，就可以使用一个全局阈值进行分割。一种自动计算全局阈值T的迭代计算方法步骤：

（1）为全局阈值T选择一个初始的估计值；

（2）使用初始值T进行阈值分割，此时图像分为两组像素：大于阈值的像素组G1，小于阈值的像素组G2；

（3）分别计算属于G1、G2像素的平均灰度值m1和m2；

（4）针对m1和m2计算一个新的阈值 T=（m1 + m2）/2；

（5）重复（2）到（4），直到连续迭代中计算的连续两个T的差小于某个预定义的值T0为止。

```cpp
#include<opencv2/opencv.hpp>
#include<iostream>

using namespace std;
using namespace cv;

//声明全局阈值分割函数,输入图像，输出图像，T0，初始阈值T
void global_threshold_segmentation(Mat& input_image, Mat& output_image, int T0, int T);

int main()
{
	Mat image, image_gray, image_bw;
	image = imread("Cameraman.bmp");
	if (image.empty())
	{
		cout << "读取图像出错" << endl;
		return -1;
	}

	cvtColor(image, image_gray, 6);
	namedWindow("image_gray", 0);
	imshow("image_gray", image_gray);

	//1 在这里使用图像的平均值作为初始值T, T0=5
	Scalar image_meam = cv::mean(image_gray); //使用opencv的mean函数求平均值
	int T = (int)image_meam[0];//图像的平均值作为初始值T
	global_threshold_segmentation(image_gray, image_bw, 5, T);
	namedWindow("image_bw", 0);
	imshow("image_bw", image_bw);

	//2 使用任意值作为初始阈值
	Mat image_bw2;
	int T1 = 5; //任意值
	global_threshold_segmentation(image_gray, image_bw2, 5, T1);
	namedWindow("image_bw2", 0);
	imshow("image_bw2", image_bw2);

	waitKey();

	return 0;
}

//定义全局阈值分割函数
void global_threshold_segmentation(Mat& input_image, Mat& output_image, int T0, int T)
{
	//使用初始值T进行分组并求每组的平均值m1和m2，并计算新的阈值T2
	int width = input_image.cols; //图像列数
	int height = input_image.rows; //图像行数
	uchar* Img = input_image.data; //图像指针
	int G1_mean, G2_mean; //定义每组像素的均值
	int G1_num = 1, G2_num = 1; //定义每组像素的数量，初始值设为1，以免后面出现除以0的问题
	int G1_sum = 0, G2_sum = 0; //定义每组灰度值之和

	for (int i = 0; i < height; i++)
	{
		uchar* Img = input_image.ptr(i); //图像每行数据的指针
		for (int j = 0; j < width; j++)
		{
			if (Img[j] < T)
			{
				G1_sum += Img[j];
				G1_num += 1;
			}
			else
			{
				G2_sum += Img[j];
				G2_num += 1;
			}
		}
	}
	G1_mean = G1_sum / G1_num;
	G2_mean = G2_sum / G2_num;
	int T2 = (G1_mean + G2_mean) * 0.5; //新阈值

	//迭代计算T
	if (abs(T2 - T) > T0)
	{
		global_threshold_segmentation(input_image, output_image, T0, T2);
	}
	else
	{
		threshold(input_image, output_image, T2, 255, 1);
	}

}
```



# 常用算法
## 1.霍夫变换
OpenCV霍夫直线检测函数使用

霍夫直线变换是一种用来在图像空间寻找直线的方法，输入图像要求是二值图像，同时为了提高检测直线的效率和准确率，

在使用霍夫线变换之前，最好对图像进行边缘检测生成边缘二值图像，这样的检测效果是最好的。

分别进行HoughLines和HoughLinesP函数检测直线。

总结：使用霍夫变换检测直线具体步骤：

1.彩色图像->灰度图

2.去噪（高斯核）

3.边缘提取（梯度算子、拉普拉斯算子、canny、sobel）

4.二值化（判断此处是否为边缘点，就看灰度值==255）

5.映射到霍夫空间（准备两个容器，一个用来展示hough-space概况，一个数组hough-space用来储存voting的值，因为投票过程往往有某个极大值超过阈值，多达几千，不能直接用灰度图来记录投票信息）

6.取局部极大值，设定阈值，过滤干扰直线

7.绘制直线、标定角点

```cpp
// Program:霍夫直线检测示例 HoughLines：标准霍夫变换、多尺度霍夫变换  输出距离和直线角度

#include <opencv2/opencv.hpp>
#include <vector>
#include <iostream>
int main()
{
    std::string img_path;
    cv::Mat mat_color;
    cv::Mat mat_gray;
    cv::Mat mat_binary;
    cv::Mat mat_canny;

    img_path = "img/hand.jpg";
    mat_color = cv::imread(img_path, 1);
    mat_gray = cv::imread(img_path, 0);

    // 进行形态学闭运算，闭运算可以消除图像中的小洞，填补轮廓线中的断裂  
    cv::Mat elementRect;
    // 创建一个3x3的矩形结构元素，锚点位于左上角(-1, -1)  
    elementRect = cv::getStructuringElement(cv::MORPH_RECT, cv::Size(3, 3), cv::Point(-1, -1));
    // 对灰度图像进行形态学闭运算  
    cv::morphologyEx(mat_gray, mat_gray, cv::MORPH_CLOSE, elementRect);

    // 对闭运算后的图像进行二值化处理，将灰度图像转换为二值图像  
    // 阈值为125，任何灰度值高于此值的像素都变为255，其余变为0  
    cv::threshold(mat_gray, mat_binary, 125, 255.0, cv::THRESH_BINARY);

    // 使用Canny算法检测二值图像中的边缘  
    // 最小阈值为50，最大阈值为125，双阈值有助于检测更完整的边缘  
    cv::Canny(mat_binary, mat_canny, 50, 125, 3);

    // 使用霍夫线变换检测Canny边缘检测后的图像中的直线  
    // 参数依次为：源图像、输出向量、距离分辨率、角度分辨率、阈值、最小线段长度、最大线段间隔  
    std::vector<cv::Vec2f> lines;
    cv::HoughLines(mat_canny, lines, 1, CV_PI / 180, 150, 0, 0);

    // 遍历检测到的直线并在原图像上绘制它们  
    std::cout << "line number: " << lines.size() << std::endl;
    for (size_t i = 0; i < lines.size(); i++)
    {
        // 获取当前直线的参数  
        cv::Vec2f linex = lines[i];
        std::cout << "radius: " << linex[0] << ", angle: " << 180 / CV_PI * linex[1] << std::endl;

        // 获取直线的极坐标参数  
        float rho = lines[i][0], theta = lines[i][1];

        // 计算直线在图像上的两个端点  
        cv::Point pt1, pt2;
        double a = cos(theta), b = sin(theta);
        double x0 = a * rho, y0 = b * rho;
        pt1.x = cvRound(x0 + 1000 * (-b));
        pt1.y = cvRound(y0 + 1000 * (a));
        pt2.x = cvRound(x0 - 1000 * (-b));
        pt2.y = cvRound(y0 - 1000 * (a));

        // 在彩色图像上绘制直线  
        line(mat_color, pt1, pt2, cv::Scalar(255, 0, 0), 1);
    }
    cv::imshow("color", mat_color);
    cv::imshow("gray", mat_gray);
    cv::imshow("binary", mat_binary);
    cv::imshow("canny", mat_canny); 
    cv::waitKey(0);

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725254692578-21cbd060-8330-46a9-b430-ed4377e6a48d.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725254739781-49604fd8-5722-4815-a85b-c89a38b082ba.png)

```cpp
// Program:霍夫P直线检测示例 HoughLinesP：渐进概率式霍夫变换   输出直线两个点坐标

#include <opencv2/opencv.hpp>
#include <vector>
#include <iostream>

int main()
{
    std::string img_path;
    cv::Mat mat_color;
    cv::Mat mat_gray;
    cv::Mat mat_binary;
    cv::Mat mat_canny;

    img_path = "img/hand.jpg";
    mat_color = cv::imread(img_path, 1);
    mat_gray = cv::imread(img_path, 0);

    // 进行形态学闭运算，用于连接图像中的断裂部分和填充小洞  
    cv::Mat elementRect;  
    // 创建一个3x3的矩形结构元素，其锚点位于中心位置(-1, -1)表示中心  
    elementRect = cv::getStructuringElement(cv::MORPH_RECT, cv::Size(3, 3), cv::Point(-1, -1));  
    // 对灰度图像mat_gray进行形态学闭运算，结果仍然保存在mat_gray中  
    cv::morphologyEx(mat_gray, mat_gray, cv::MORPH_CLOSE, elementRect);  
  
    // 对闭运算后的灰度图像进行二值化处理，使得灰度值大于或等于125的像素点变为白色(255)，其余为黑色(0)  
    cv::threshold(mat_gray, mat_binary, 125, 255.0, cv::THRESH_BINARY);  
  
    // 使用Canny算法检测二值图像mat_binary中的边缘  
    // 最小阈值为50，最大阈值为125，孔径大小为3  
    cv::Canny(mat_binary, mat_canny, 50, 125, 3);  
  
    // 使用霍夫概率直线变换（Probabilistic Hough Transform）检测Canny边缘检测后的图像中的直线  
    // 参数依次为：源图像、输出向量、距离分辨率、角度分辨率、阈值、最小线段长度、最大线段间隔  
    std::vector<cv::Vec4i> lines;  
    HoughLinesP(mat_canny, lines, 1, CV_PI / 180, 100, 10, 50);  
  
    // 遍历检测到的直线，并在原图像mat_color上绘制它们  
    for (size_t i = 0; i < lines.size(); i++)  
    { 
         // 获取当前直线的四个整数坐标值（x1, y1, x2, y2）  
         cv::Vec4i& linex = lines[i];  
      
         // 计算直线的x和y方向上的差  
         int dx = linex[2] - linex[0];  
         int dy = linex[3] - linex[1];  
      
         // 计算直线与x轴之间的角度（以度为单位）  
         double angle = atan2(double(dy), dx) * 180 / CV_PI;  
      
         // 注释掉的代码段用于过滤掉接近水平（角度绝对值小于等于20度）的直线  
         // if (abs(angle) <= 20)  
         //     continue;  
      
         // 在彩色图像mat_color上绘制直线  
         line(mat_color, cv::Point(linex[0], linex[1]), cv::Point(linex[2], linex[3]), cv::Scalar(255, 0, 0), 1);
    }

    cv::imshow("gray", mat_gray);
    cv::imshow("binary", mat_binary);
    cv::imshow("canny", mat_canny);
    cv::imshow("color", mat_color);
    cv::waitKey(0);


    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725254931712-f7f99d4a-a3a8-4f1f-ab94-186c47841b1f.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725254972244-747640da-22ed-4b93-8bf5-fdccb597147a.png)



## 2.ORB算法
```cpp
#include <opencv2/opencv.hpp>  
#include <opencv2/highgui/highgui.hpp>  
#include <iostream>  

using namespace cv;
using namespace std;

int main() {
    Mat img = imread("A005.png", IMREAD_GRAYSCALE); // 读取图像并转换为灰度图像  
    if (img.empty()) {
        cout << "无法加载图像" << endl;
        return -1;
    }

    // 实例化 ORB 特征检测器  
    Ptr<ORB> orb = ORB::create();

    // 检测关键点并计算描述符  
    vector<KeyPoint> keypoints;
    Mat descriptors;
    orb->detectAndCompute(img, noArray(), keypoints, descriptors);
    cout << "Num of keypoints: " << keypoints.size() << endl; // 500  
    cout << "Shape of kp descriptors: " << descriptors.rows << "x" << descriptors.cols << endl; // (500,32)  

    // 调整图像亮度并绘制关键点位置  
    Mat imgS;
    convertScaleAbs(img, imgS, 0.5, 128);
    Mat imgKp1;
    drawKeypoints(imgS, keypoints, imgKp1);

    // 绘制关键点大小和方向  
    Mat imgKp2;
    drawKeypoints(imgS, keypoints, imgKp2, Scalar::all(-1), DrawMatchesFlags::DRAW_RICH_KEYPOINTS);

    namedWindow("Original Image", WINDOW_NORMAL);
    namedWindow("ORB Keypoints", WINDOW_NORMAL);
    namedWindow("ORB Keypoints Scaled", WINDOW_NORMAL);

    imshow("Original Image", img); // 显示原始图像  
    imshow("ORB Keypoints", imgKp1); // 显示只绘制关键点位置的图像  
    imshow("ORB Keypoints Scaled", imgKp2); // 显示绘制关键点大小和方向的图像  

    waitKey(0); // 等待按键事件  
    return 0;
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725255233388-874151d5-8a53-47c5-a59d-42bcd03166ae.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725255254005-ced68ed1-0c83-41aa-9dbc-bcf83ef7fe18.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725255272408-2b09f3d2-23c0-4b52-8e60-e2ef09c4a26a.png)

## 3.SIFT算法
```cpp
#include <opencv2/opencv.hpp>  
#include <iostream>  

using namespace cv;
using namespace std;

int main() {
    // 读取图像  
    Mat image = imread("A005.png", IMREAD_GRAYSCALE);
    if (image.empty()) {
        cout << "无法加载图像" << endl;
        return -1;
    }

    // 创建SIFT对象并进行特征检测  
    Ptr<SIFT> sift = SIFT::create();
    vector<KeyPoint> keypoints;
    sift->detect(image, keypoints);

    // 绘制关键点并显示图像  
    Mat outputImage;
    drawKeypoints(image, keypoints, outputImage, Scalar::all(-1), DrawMatchesFlags::DEFAULT);
    imshow("SIFT特征检测结果", outputImage);
    waitKey(0);

    return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725255581600-a81ef024-90d5-4cb1-8bdc-17fe6946c6ed.png)
</pwd></p>


