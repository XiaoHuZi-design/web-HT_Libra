[OpenCV-3.4.1-Mingw7.3.0_X64.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/39216292/1725288053855-a88eaf80-a328-4243-917a-948691fc0b0b.zip)

[opencv-4.5.4-release-x64-mingw73build.7z](https://www.yuque.com/attachments/yuque/0/2024/7z/39216292/1725288182079-ec615ec4-c4e7-4c98-8bc1-a470c22f81f1.7z)

## 一、图像处理小软件
### 1.第一个
**UI界面如下：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725277565859-2d6a5b0d-10bd-4508-a9d8-57fc391986d0.png)



```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <opencv2/opencv.hpp>
using namespace std;
using namespace cv;
#include <QDebug>
#include <QFileDialog>
#include <QMessageBox>
#include <math.h>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}



//图片居中显示,图片大小与label大小相适应
QImage MainWindow::ImageSetSize (QImage  qimage,QLabel *qLabel)
{
    QImage image;
    QSize imageSize = qimage.size();
    QSize labelSize = qLabel->size();

    double dWidthRatio = 1.0*imageSize.width() / labelSize.width();
    double dHeightRatio = 1.0*imageSize.height() / labelSize.height();
            if (dWidthRatio>dHeightRatio)
            {
                image = qimage.scaledToWidth(labelSize.width());
            }
            else
            {
                image = qimage.scaledToHeight(labelSize.height());
            }
            return image;
 }

//选择图片
void MainWindow::on_ChPicBtn_clicked()
{
    //打开图片文件，选择图片
    QStringList srcDirPathListS = QFileDialog::getOpenFileNames(this, tr("选择图片"),
                                                                QDir::homePath(), tr("图像文件(*.jpg *.png *.bmp)"));
    qDebug()<<"图片路径"<<srcDirPathListS; //在控制台输出路径观察
    srcDirPathList = srcDirPathListS;//持久化图片
    if(!srcDirPathList.isEmpty())
    {
        imagenum =0;
        QImage image=QImage(srcDirPathList.at(imagenum));//初始化选中第一张图片
        qDebug()<<"image:"<<image;

        if(srcDirPathList.count()==1){
            ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(imagenum)),ui->piclabel)));
            ui->BeforeLabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(imagenum)),ui->BeforeLabel)));
            ui->AfterLabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(imagenum)),ui->AfterLabel)));
        }
        else{
            ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(imagenum)),ui->piclabel)));
            ui->BeforeLabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(srcDirPathList.count()-1)),ui->BeforeLabel)));
            ui->AfterLabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(imagenum+1)),ui->AfterLabel)));
        }

    }
    else if(srcDirPathList.isEmpty())
    {
         return;
    }
}


//切换到上一张
void MainWindow::on_BeforeBtn_clicked()
{
    // 如果图片路径列表为空，则不执行任何操作或显示错误消息
    if (srcDirPathList.isEmpty()) {
        // 可以选择显示一个错误消息，例如：
        // QMessageBox::warning(this, "警告", "没有选择图片！");
        return; // 或者直接返回，不执行后续操作
    }

    // 切换到上一张图片   通过检查是否已经在第一张图片并相应地跳转到最后一张来实现循环
    if (imagenum == 0) {
        // 如果是第一张图片，则切换到最后一张
        imagenum = srcDirPathList.count() - 1;
    } else {
        // 否则切换到上一张图片
        imagenum = imagenum - 1;
    }

    // 设置当前图片
    ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(imagenum)), ui->piclabel)));

    // 设置前一张图片，确保索引不越界
    int prevIndex = imagenum - 1;
    if (prevIndex < 0) {
        prevIndex = srcDirPathList.count() - 1; // 如果越界，则设置为最后一张图片
    }
    ui->BeforeLabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(prevIndex)), ui->BeforeLabel)));

    // 设置后一张图片，确保索引不越界
    int nextIndex = imagenum + 1;
    if (nextIndex >= srcDirPathList.count()) {
        nextIndex = 0; // 如果越界，则设置为第一张图片
    }
    ui->AfterLabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(nextIndex)), ui->AfterLabel)));
}

//切换到下一张
void MainWindow::on_AfterBtn_clicked()
{
    // 如果图片路径列表为空，则不执行任何操作或显示错误消息
    if (srcDirPathList.isEmpty()) {
        // 可以选择显示一个错误消息，例如：
        // QMessageBox::warning(this, "警告", "没有选择图片！");
        return; // 或者直接返回，不执行后续操作
    }

    // 切换到下一张图片  通过模运算实现了循环切换，即使当前是最后一张图片也能无缝切换到第一张
    imagenum = (imagenum + 1) % srcDirPathList.count();

    // 设置当前图片
    ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(imagenum)), ui->piclabel)));

    // 设置前一张和后一张图片的逻辑与 on_BeforeBtn_clicked() 函数中类似
    // ... (可以复制上面的相关代码块并适当修改索引)
    // 设置前一张图片，确保索引不越界
    int prevIndex = imagenum - 1;
    if (prevIndex < 0) {
        prevIndex = srcDirPathList.count() - 1; // 如果越界，则设置为最后一张图片
    }
    ui->BeforeLabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(prevIndex)), ui->BeforeLabel)));

    // 设置后一张图片，确保索引不越界
    int nextIndex = imagenum + 1;
    if (nextIndex >= srcDirPathList.count()) {
        nextIndex = 0; // 如果越界，则设置为第一张图片
    }
    ui->AfterLabel->setPixmap(QPixmap::fromImage(ImageSetSize(QImage(srcDirPathList.at(nextIndex)), ui->AfterLabel)));
}




//显示原图按钮
void MainWindow::on_YuanTuBtn_clicked()
{
    if(srcDirPathList.isEmpty())
    {
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{
        QImage image=QImage(srcDirPathList.at(imagenum));
        ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(image,ui->piclabel)));
    }
}

//灰度化
QImage MainWindow::gray(QImage image){
    QImage newImage =image.convertToFormat(QImage::Format_ARGB32);
    QColor oldColor;

        for(int y = 0; y < newImage.height(); y++)
        {
            for(int x = 0; x < newImage.width(); x++)
            {
                oldColor = QColor(image.pixel(x,y));
                int average = (oldColor.red() + oldColor.green() + oldColor.blue()) / 3;
                newImage.setPixel(x, y, qRgb(average, average, average));
            }
        }
        return newImage;
}

//灰度化按钮
void MainWindow::on_GreyBtn_clicked()
{
    if(srcDirPathList.isEmpty())
    {
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{
        QImage image=QImage(srcDirPathList.at(imagenum));
        QImage grayimage=gray(image);
        ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(grayimage,ui->piclabel)));
    }
}

//二值化
QImage MainWindow::TwoSide(QImage grayimage,int value){
    QImage TwoSideImage =grayimage.convertToFormat(QImage::Format_ARGB32);
    QColor oldColor;
    int ts;
    for(int y = 0; y < grayimage.height(); y++)
    {
        for(int x = 0; x < grayimage.width(); x++)
        {
                oldColor = QColor(grayimage.pixel(x,y));
                ts = oldColor.red();
            if(ts<value){
                ts=0;
            }else{
                ts=255;
            }
            TwoSideImage.setPixel(x,y, qRgb(ts, ts, ts));

        }
    }
    return TwoSideImage;
}
//二值化调节条
void MainWindow::on_TwoSidelSlider_valueChanged(int value)
{
    if(srcDirPathList.isEmpty()){
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{
        QImage image=QImage(srcDirPathList.at(imagenum));//读取当前图片
        QImage grayimage=gray(image);//灰度化
        QImage TwoSideImage=TwoSide(grayimage,value);//二值化
        ui->TwoSideLineEdit->setText(QString::number(value));//改变文本框内值为二值化比对值
        ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(TwoSideImage,ui->piclabel)));//显示二值化图像
    }
}
//二值化文本框
void MainWindow::on_TwoSideLineEdit_textChanged(const QString &arg1)
{
    if(srcDirPathList.isEmpty()){
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{
        int value=arg1.toInt();
        if (value>=0 && value<=255)
        {
        QImage image=QImage(srcDirPathList.at(imagenum));
        QImage grayimage=gray(image);
        QImage TwoSideImage=TwoSide(grayimage,value);//都是和上面一样的
        ui->TwoSidelSlider->setValue(value);//当文本框内数值改变时，动态变化调节条位置
        ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(TwoSideImage,ui->piclabel)));
        }
        else
        {
            QMessageBox::information(this,tr("请输入正确数值"),
                                     tr("请输入0-255！"));
            return;
        }
    }
}


//均值滤波按钮
void MainWindow::on_TXTBtn_clicked()
{
    if(srcDirPathList.isEmpty())
    {
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{
        QImage image=QImage(srcDirPathList.at(imagenum));
        QImage avgimage=avg(image);
        ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(avgimage,ui->piclabel)));
    }
}
//均值滤波
QImage MainWindow::avg(QImage image)
{
    int kernel [3][3] = {
        {1,1,1},
        {1,1,1},
        {1,1,1}};
        int sizeKernel = 3;
        int sumKernel = 9;
        QColor color;
         for(int x = sizeKernel/2;x<image.width() - sizeKernel/2;x++)
        {
           for(int y= sizeKernel/2;y<image.height() - sizeKernel/2;y++)
            {
                int r = 0;
                int g = 0;
                int b = 0;
                for(int i = -sizeKernel/2;i<=sizeKernel/2;i++)
                {
                   for(int j = -sizeKernel/2;j<=sizeKernel/2;j++)
                    {
                     color = QColor(image.pixel(x+i,y+j));
                     r+=color.red()*kernel[sizeKernel/2+i][sizeKernel/2+j];
                     g+=color.green()*kernel[sizeKernel/2+i][sizeKernel/2+j];
                     b+=color.blue()*kernel[sizeKernel/2+i][sizeKernel/2+j];
                    }
                }
                r = qBound(0,r/sumKernel,255);
                g = qBound(0,g/sumKernel,255);
                b = qBound(0,b/sumKernel,255);
                image.setPixel(x,y,qRgb( r,g,b));
            }
        }
         return image;
}


//伽马变换
QImage MainWindow::Gamma(QImage image,int value){
    QImage GammaImage =image.convertToFormat(QImage::Format_ARGB32);
    QColor oldColor;

    for(int y = 0; y < image.height(); y++)
    {
        for(int x = 0; x < image.width(); x++)
        {
                oldColor = QColor(image.pixel(x,y));
                double red=oldColor.red();
                double green=oldColor.green();
                double blue=oldColor.blue();

                int r=qBound(0,(int)pow(red,value),255);
                int g=qBound(0,(int)pow(green,value),255);
                int b=qBound(0,(int)pow(blue,value),255);
            GammaImage.setPixel(x,y, qRgb(r, g, b));

        }
    }
    return GammaImage;
}
//调节条伽马变换
void MainWindow::on_GammaSlider_valueChanged(int value)
{
    if(srcDirPathList.isEmpty()){
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{
        QImage image=QImage(srcDirPathList.at(imagenum));//读取当前图片
        QImage GammaImage=Gamma(image,value);//伽马变换
        ui->GammaLineEdit->setText(QString::number(value));//改变文本框内值为伽马因子
        ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(GammaImage,ui->piclabel)));//显示伽马变换图像
    }
}
//文本框伽马变换
void MainWindow::on_GammaLineEdit_textChanged(const QString &arg1)
{
    if(srcDirPathList.isEmpty()){
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{
        int value=arg1.toInt();
        if (value>=0 && value<=25)
        {
        QImage image=QImage(srcDirPathList.at(imagenum));
        QImage GammaImage=Gamma(image,value);//都是和上面一样的
        ui->GammaSlider->setValue(value);//当文本框内数值改变时，动态变化调节条位置
        ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(GammaImage,ui->piclabel)));
        }
        else
        {
            QMessageBox::information(this,tr("请输入正确数值"),
                                     tr("请输入0-25！"));
            return;
        }
    }
}




// 将 QImage 转换为 cv::Mat
cv::Mat QImage2Mat(const QImage &image)
{
    cv::Mat mat;

    // 检查QImage是否为空
    if (image.isNull())
        return mat;

    // 确定QImage的图像格式
    switch (image.format())
    {
    case QImage::Format_RGB32:
    case QImage::Format_ARGB32:
        mat = cv::Mat(image.height(), image.width(), CV_8UC4, (void*)image.constBits(), image.bytesPerLine());
        break;
    case QImage::Format_RGB888:
        mat = cv::Mat(image.height(), image.width(), CV_8UC3, (void*)image.constBits(), image.bytesPerLine());
        cv::cvtColor(mat, mat, cv::COLOR_BGR2RGB); // OpenCV默认使用BGR格式，而QImage使用RGB格式
        break;
    case QImage::Format_Grayscale8:
        mat = cv::Mat(image.height(), image.width(), CV_8UC1, (void*)image.constBits(), image.bytesPerLine());
        break;
    default:
        qWarning("QImage2Mat: Unsupported QImage format");
        return mat;
    }

    return mat;
}

// 将 cv::Mat 转换为 QImage
QImage Mat2QImage(const cv::Mat &cvImg)
{
    QImage qImg;
    if (cvImg.channels() == 3) // 3通道彩色图像
    {
        cv::cvtColor(cvImg, cvImg, cv::COLOR_BGR2RGB); // OpenCV默认使用BGR格式
        qImg = QImage((const unsigned char*)(cvImg.data),
                      cvImg.cols, cvImg.rows,
                      cvImg.cols * cvImg.channels(),
                      QImage::Format_RGB888);
    }
    else if (cvImg.channels() == 1) // 灰度图像
    {
        qImg = QImage((const unsigned char*)(cvImg.data),
                      cvImg.cols, cvImg.rows,
                      cvImg.cols * cvImg.channels(),
                      QImage::Format_Grayscale8);
    }
    else
    {
        // 处理其他情况，如4通道图像等
        qImg = QImage((const unsigned char*)(cvImg.data),
                      cvImg.cols, cvImg.rows,
                      cvImg.cols * cvImg.channels(),
                      QImage::Format_RGB888);
    }

    return qImg;
}

// Canny边缘检测
void MainWindow::on_CannyBtn_clicked()
{
    if (srcDirPathList.isEmpty())
    {
        QMessageBox::information(this, tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else
    {
        QImage image = QImage(srcDirPathList.at(imagenum));
        cv::Mat cvImage = QImage2Mat(image); // 将QImage转换为cv::Mat

        // 转换为灰度图像，因为Canny边缘检测通常在灰度图像上执行
        cv::Mat grayImage;
        cvtColor(cvImage, grayImage, cv::COLOR_BGR2GRAY);

        cv::Mat canny_edges;

        // 执行Canny边缘检测
        //double lowThreshold = 100;
        //double highThreshold = 200;

        // 获取滑块的值作为 Canny 算法的阈值
        int lowThreshold = ui->lowSlider->value();
        int highThreshold =ui->highSlider->value(); /* 这里可以设置一个固定值，或者另一个滑块的值 */;
        cv::Canny(grayImage, canny_edges, lowThreshold, highThreshold);

        // 将结果转换回QImage并显示在QLabel上
        QImage qImage = Mat2QImage(canny_edges);
        //ui->piclabel->setPixmap(QPixmap::fromImage(qImage));
        ui->piclabel->setPixmap(QPixmap::fromImage(ImageSetSize(qImage,ui->piclabel)));
    }
}







void MainWindow::on_lowSlider_valueChanged(int value)
{
    if(srcDirPathList.isEmpty()){
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{

        ui->lowLineEdit->setText(QString::number(value));//改变文本框内值为二值化比对值
    }
}

void MainWindow::on_lowLineEdit_textChanged(const QString &arg1)
{
    if(srcDirPathList.isEmpty()){
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{
        int value=arg1.toInt();
        if (value>=0 && value<=255)
        {

        ui->lowSlider->setValue(value);//当文本框内数值改变时，动态变化调节条位置
        }
        else
        {
            QMessageBox::information(this,tr("请输入正确数值"),
                                     tr("请输入0-255！"));
            return;
        }
    }
}

void MainWindow::on_highSlider_valueChanged(int value)
{
    if(srcDirPathList.isEmpty()){
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{

        ui->highLineEdit->setText(QString::number(value));//改变文本框内值为二值化比对值
    }

}

void MainWindow::on_highLineEdit_textChanged(const QString &arg1)
{
    if(srcDirPathList.isEmpty()){
        QMessageBox::information(this,tr("请先选择图片"),
                                 tr("请先选择图片！"));
        return;
    }
    else{
        int value=arg1.toInt();
        if (value>=0 && value<=255)
        {

        ui->highSlider->setValue(value);//当文本框内数值改变时，动态变化调节条位置
        }
        else
        {
            QMessageBox::information(this,tr("请输入正确数值"),
                                     tr("请输入0-255！"));
            return;
        }
    }

}


//bug 单张图片报错  已解决

```

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include<opencv2/opencv.hpp>
using namespace std;
using namespace cv;
#include <QLabel>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_ChPicBtn_clicked();

    void on_BeforeBtn_clicked();
    void on_AfterBtn_clicked();

    void on_GreyBtn_clicked();
    void on_YuanTuBtn_clicked();
    void on_TwoSidelSlider_valueChanged(int value);
    void on_TwoSideLineEdit_textChanged(const QString &arg1);
    void on_TXTBtn_clicked();

    void on_GammaSlider_valueChanged(int value);
    void on_GammaLineEdit_textChanged(const QString &arg1);

    void on_CannyBtn_clicked();

    void on_lowSlider_valueChanged(int value);
    void on_lowLineEdit_textChanged(const QString &arg1);
    void on_highSlider_valueChanged(int value);
    void on_highLineEdit_textChanged(const QString &arg1);

private:

    QImage ImageSetSize (QImage  qimage,QLabel *qLabel);

    QImage gray(QImage image);
    QImage TwoSide(QImage grayimage,int value);
    QImage avg(QImage image);
    QImage Gamma(QImage image,int value);

    //QImage Cannyimg(QImage grayImage,int lowThreshold,int highThreshold);
    //QImage Cannyimg(const QString &imagePath, int lowThreshold, int highThreshold);


private:
    Ui::MainWindow *ui;

    int imagenum;
    QStringList srcDirPathList;
};
#endif // MAINWINDOW_H

```

```cmake
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

CONFIG += c++11

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
    main.cpp \
    mainwindow.cpp

HEADERS += \
    mainwindow.h

FORMS += \
    mainwindow.ui

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

INCLUDEPATH +=D:\OpenCV-3.4.1\build\include  \
              D:\OpenCV-3.4.1\build\include  \
              D:\OpenCV-3.4.1\build\include\opencv2

CONFIG(debug, debug|release): {

        LIBS += D:\OpenCV-3.4.1\build\x64\mingw\lib\libopencv_*d.dll.a
        }

        else:CONFIG(release, debug|release): {

        LIBS += D:\OpenCV-3.4.1\build\x64\mingw\lib\libopencv_*.dll.a

        }

```



**运行结果：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725277157051-a2d242d4-6c15-4e7a-b369-adff84b1030d.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725277516924-bb7658ee-ba39-4b20-b676-0db82955cdff.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725277303866-a1442877-a7aa-45a4-ae54-a1509655ac06.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725277457558-83546496-c4eb-4378-9d8d-9bcd681187d2.png)

### 2.第二个
**UI界面如下：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725277831997-dddf358b-98e1-43a9-af65-13f17c1f086d.png)



```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QMessageBox>
#include <QDebug>

using namespace cv;
using namespace std;

MainWindow::MainWindow(QWidget *parent)
: QMainWindow(parent)
, ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    #if 0
    //设置背景图片
    this->setAutoFillBackground(true); //允许绘制
    //创建图片控件   this->size()  1920,1200
    QPixmap pixmap(":/img/png/1.png");  //发现太大了加载不了
    if(!pixmap.isNull()) {
        //pixmap = pixmap.scaled(1920,1200, Qt::KeepAspectRatio,Qt::SmoothTransformation);
        pixmap = pixmap.scaled(this->size(), Qt::IgnoreAspectRatio); //忽略高宽比
        QPalette palette;  //创建一个调色板类
        palette.setBrush(QPalette::Background, QBrush(pixmap));
        this->setPalette(palette);
    } else {
        qDebug() << "Error: Pixmap is null";
    }
    #else
    /*
    Qt 设置样式表 加载图片时
    //背景 不会自动适应图片，background-image像电脑桌面的平铺，图片尺寸不变
    setStyleSheet(QString("background-image:url(:/image/test.jpg)"));
    //背景 自动适应图片，border-image像桌面的拉伸效果，常用
    setStyleSheet(QString("border-image:url(:/image/test.jpg);"));
    //前景 自动适应图片，border-image像桌面的拉伸效果，常用
    setStyleSheet(QString("image:url(:/image/test.jpg);"));
    */
    #endif
    //禁用按钮
    ui->pushButton_2->setEnabled(false);
    ui->pushButton_3->setEnabled(false);
    ui->pushButton_4->setEnabled(false);
    ui->pushButton_5->setEnabled(false);
    ui->pushButton_6->setEnabled(false);
    ui->pushButton_7->setEnabled(false);
    ui->pushButton_8->setEnabled(false);
    ui->pushButton_9->setEnabled(false);
    ui->pushButton_10->setEnabled(false);
    ui->pushButton_11->setEnabled(false);
    ui->pushButton_12->setEnabled(false);
    ui->pushButton_13->setEnabled(false);
    ui->pushButton_14->setEnabled(false);
    ui->pushButton_15->setEnabled(false);
    ui->pushButton_16->setEnabled(false);
    ui->pushButton_17->setEnabled(false);
    ui->pushButton_18->setEnabled(false);
    ui->pushButton_19->setEnabled(false);
    ui->pushButton_20->setEnabled(false);

    //给按钮添加菜单栏
    connect(ui->lead_image, &QAction::triggered, this, &MainWindow::on_pushButton_clicked);
    connect(ui->action_1, &QAction::triggered, this, &MainWindow::on_pushButton_2_clicked);
    connect(ui->action_2, &QAction::triggered, this, &MainWindow::on_pushButton_3_clicked);
    connect(ui->action_3, &QAction::triggered, this, &MainWindow::on_pushButton_4_clicked);
    connect(ui->action_4, &QAction::triggered, this, &MainWindow::on_pushButton_5_clicked);
    connect(ui->action_5, &QAction::triggered, this, &MainWindow::on_pushButton_6_clicked);

    connect(ui->median, &QAction::triggered, this, &MainWindow::on_pushButton_7_clicked);
    connect(ui->mean, &QAction::triggered, this, &MainWindow::on_pushButton_8_clicked);
    connect(ui->glauss, &QAction::triggered, this, &MainWindow::on_pushButton_9_clicked);
    connect(ui->sharp_1, &QAction::triggered, this, &MainWindow::on_pushButton_10_clicked);
    connect(ui->sharp_2, &QAction::triggered, this, &MainWindow::on_pushButton_11_clicked);

    connect(ui->Fourier, &QAction::triggered, this, &MainWindow::on_pushButton_12_clicked);
    connect(ui->low_filter, &QAction::triggered, this, &MainWindow::on_pushButton_13_clicked);
    connect(ui->high_filter, &QAction::triggered, this, &MainWindow::on_pushButton_14_clicked);

    connect(ui->actionRobert, &QAction::triggered, this, &MainWindow::on_pushButton_15_clicked);
    connect(ui->actionSobel, &QAction::triggered, this, &MainWindow::on_pushButton_16_clicked);
    connect(ui->actionLaplace, &QAction::triggered, this, &MainWindow::on_pushButton_17_clicked);
    connect(ui->actionPrewitt, &QAction::triggered, this, &MainWindow::on_pushButton_18_clicked);
    connect(ui->actionCanny, &QAction::triggered, this, &MainWindow::on_pushButton_19_clicked);
    connect(ui->actionOTSU, &QAction::triggered, this, &MainWindow::on_pushButton_20_clicked);
}

MainWindow::~MainWindow()
{
    delete ui;
}

/*
//菜单栏插入图片
// lead_image 是某个菜单项对象名, 点击这个菜单项会读取图片
void MainWindow::on_lead_image_triggered()
{
    QString curDir = QDir::currentPath(); // 选择文件
    QString filename = QFileDialog::getOpenFileName(this, "select Image", curDir,
                                                      "Images (*.png *.bmp *.jpg *.tif *.GIF );;All Files (*.*)");

    image = imread(filename.toLocal8Bit().data());
    if (image.data) {
        ui->pushButton_2->setEnabled(true);
        ui->pushButton_3->setEnabled(true);
        ui->pushButton_4->setEnabled(true);
        ui->pushButton_5->setEnabled(true);
        ui->pushButton_6->setEnabled(true);
        // 通过 lable 方式显示图片
        display_MatInQT(ui->label, image);
    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}
*/
//菜单栏导出图片
// save_image 是某个菜单项对象名, 点击这个菜单项会保存图片
void MainWindow::on_save_image_triggered()
{
    QString curDir=QDir::currentPath();//选择文件
    QString filename=QFileDialog::getSaveFileName(this,"save Image",curDir,
                                                   "Images (*.png *.bmp *.jpg *.tif *.GIF )");

    ui->label_2->pixmap()->toImage().save(filename);

}


//打开图像
void MainWindow::on_pushButton_clicked()
{
    //调用窗口打开文件
    ui->label->clear();
    ui->label_2->clear();

    QString filename = QFileDialog::getOpenFileName(this,
        tr("open image"),
        ".",
        tr("Image file(*.png *.jpg *.bmp)"));
    image = imread(filename.toLocal8Bit().data());
    if (image.data) {

        //解除按钮禁用
        ui->pushButton_2->setEnabled(true);
        ui->pushButton_3->setEnabled(true);
        ui->pushButton_4->setEnabled(true);
        ui->pushButton_5->setEnabled(true);
        ui->pushButton_6->setEnabled(true);
        ui->pushButton_7->setEnabled(true);
        ui->pushButton_8->setEnabled(true);
        ui->pushButton_9->setEnabled(true);
        ui->pushButton_10->setEnabled(true);
        ui->pushButton_11->setEnabled(true);
        ui->pushButton_12->setEnabled(true);
        ui->pushButton_13->setEnabled(true);
        ui->pushButton_14->setEnabled(true);
        ui->pushButton_15->setEnabled(true);
        ui->pushButton_16->setEnabled(true);
        ui->pushButton_17->setEnabled(true);
        ui->pushButton_18->setEnabled(true);
        ui->pushButton_19->setEnabled(true);
        ui->pushButton_20->setEnabled(true);

        // 通过 lable 方式显示图片
        display_MatInQT(ui->label, image);
    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }
}

//灰度线性变换
void MainWindow::on_pushButton_2_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        //Mat gray;
        //cvtColor(image, gray, COLOR_BGR2GRAY);

/*        // 用户定义的亮度和对比度参数
        double alpha = 1.5; // 控制对比度
        int beta = 30; // 控制亮度

        // 线性变换
        Mat adjusted_image = Mat::zeros(image.size(), image.type());

        for (int y = 0; y < image.rows; y++) {
            for (int x = 0; x < image.cols; x++) {
                for (int c = 0; c < image.channels(); c++) {
                    adjusted_image.at<Vec3b>(y, x)[c] = saturate_cast<uchar>(alpha * image.at<Vec3b>(y, x)[c] + beta);
                }
            }
        }

        display_MatInQT(ui->label_2, adjusted_image);

        // 显示原始图像和调整后的图像
        //imshow("原始图像", image);
        //imshow("亮度和对比度调整后的图像", adjusted_image);
        //waitKey(0);
*/
        Mat output_image, image1_gray;   //定义输入图像，输出图像，灰度图像

        cvtColor(image, image1_gray, COLOR_BGR2GRAY);  //灰度化
        //imshow(" image1_gray", image1_gray);   //显示灰度图像

        output_image = image1_gray.clone();
        for (int i = 0; i < image1_gray.rows; i++)
        {
            for (int j = 0; j < image1_gray.cols; j++)
            {
                output_image.at<uchar>(i, j) = 1.5*double(image1_gray.at<uchar>(i, j))+ 30;  //线性变换 s=1.5r+30
            }
        }
        normalize(output_image, output_image, 0, 255, NORM_MINMAX);  //图像归一化，转到0~255范围内
        convertScaleAbs(output_image, output_image);  //数据类型转换到CV_8U

        display_MatInQT(ui->label_2, output_image);
        //imshow(" output_image", output_image);  //显示变换图像

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//灰度对数变换
void MainWindow::on_pushButton_3_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
  /*      // 对数变换参数
        double c = 1.0; // 常数
        double gamma = 0.5; // 对数变换的参数

        // 对数变换
        Mat log_transformed_image = Mat::zeros(image.size(), image.type());

        for (int y = 0; y < image.rows; y++) {
            for (int x = 0; x < image.cols; x++) {
                for (int c = 0; c < image.channels(); c++) {
                    double pixel_value = image.at<Vec3b>(y, x)[c] / 255.0;
                    double corrected_value = c * log(1 + pixel_value) / log(1 + gamma);
                    log_transformed_image.at<Vec3b>(y, x)[c] = saturate_cast<uchar>(corrected_value * 255.0);
                }
            }
        }

        display_MatInQT(ui->label_2, log_transformed_image);

        // 显示原始图像和对数变换后的图像
        //imshow("原始图像", image);
        //imshow("对数变换后的图像", log_transformed_image);
        //waitKey(0);
*/
        Mat output_image, image1_gray;   //定义输入图像，输出图像，灰度图像

        cvtColor(image, image1_gray, COLOR_BGR2GRAY);  //灰度化
        //imshow(" image1_gray", image1_gray);   //显示灰度图像

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

        display_MatInQT(ui->label_2, output_image);
        //imshow(" output_image", output_image);  //显示变换图像

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//伽马变换
void MainWindow::on_pushButton_4_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
 /*       // 伽马值
        double gamma = 2;//大于等于0，小于0为黑色。

        // 伽马校正 创建新图像矩阵
        Mat gamma_corrected_image = Mat::zeros(image.size(), image.type());

        for (int y = 0; y < image.rows; y++) {
            for (int x = 0; x < image.cols; x++) {
                for (int c = 0; c < image.channels(); c++) {
                    double pixel_value = image.at<Vec3b>(y, x)[c] / 255.0;
                    double corrected_value = pow(pixel_value, gamma) * 255.0;
                    gamma_corrected_image.at<Vec3b>(y, x)[c] = saturate_cast<uchar>(corrected_value);
                }
            }
        }

        display_MatInQT(ui->label_2, gamma_corrected_image);

        // 显示原始图像和伽马校正后的图像
        //imshow("原始图像", image);
        //imshow("伽马校正后的图像", gamma_corrected_image);
        //waitKey(0);
*/
        Mat output_image, image1_gray;   //定义输入图像，输出图像，灰度图像

        cvtColor(image, image1_gray, COLOR_BGR2GRAY);  //灰度化
        //imshow(" image1_gray", image1_gray);   //显示灰度图像

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

        display_MatInQT(ui->label_2, output_image);
        //imshow(" output_image", output_image);  //显示变换图像

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//灰度直方图
void MainWindow::on_pushButton_5_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        Mat hist;
        // 灰度化
        cvtColor(image, gray, COLOR_BGR2GRAY);

        //获取图像直方图
        int histsize = 256;
        float ranges[] = { 0,256 };
        const float* histRanges = { ranges };
        calcHist(&gray, 1, 0, Mat(), hist, 1, &histsize, &histRanges, true, false);

        //创建直方图显示图像
        int hist_h = 300;//直方图的图像的高
        int hist_w = 512; //直方图的图像的宽
        int bin_w = hist_w / histsize;//直方图的等级
        Mat histImage(hist_h, hist_w, CV_8UC3, Scalar(0, 0, 0));//绘制直方图显示的图像

        //绘制并显示直方图
        normalize(hist, hist, 0, hist_h, NORM_MINMAX, -1, Mat());//归一化直方图
        for (int i = 1; i < histsize; i++)
        {
            line(histImage, Point((i - 1) * bin_w, hist_h - cvRound(hist.at<float>(i - 1))),
                 Point((i)*bin_w, hist_h - cvRound(hist.at<float>(i))), Scalar(255, 0, 0), 2, 8, 0);
        }
/*
        //转换Qpixmap并调整大小
        QPixmap pixmap = QPixmap::fromImage(QImage(histImage.data, histImage.cols,
                                                   histImage.rows, histImage.step, QImage::Format_RGB888));
        ui->label_2->setPixmap(pixmap.scaled(ui->label_2->width(), ui->label_2->height(), Qt::KeepAspectRatio)); //保持图像的原始比例
        ui->label_2->show();
*/
        display_MatInQT(ui->label_2, histImage);

        //imshow("histImage", histImage);
        //waitKey(0);  //暂停，保持图像显示，等待按键结束

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//直方图均衡化
void MainWindow::on_pushButton_6_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        Mat image_enhanced;
        cvtColor(image, gray, COLOR_BGR2GRAY);

        // 直方图均衡化
        equalizeHist(gray, image_enhanced);
/*
        //转换Qpixmap并调整大小
        QPixmap pixmap = QPixmap::fromImage(QImage(equalized_image.data, equalized_image.cols,
                                                   equalized_image.rows, equalized_image.step, QImage::Format_RGB888));
        ui->label_2->setPixmap(pixmap.scaled(ui->label_2->width(), ui->label_2->height(), Qt::KeepAspectRatio)); //保持图像的原始比例
        ui->label_2->show();
*/
        //display_MatInQT(ui->label_2, image_enhanced);

        // 显示原始图像和均衡化后的图像
        //imshow("原始图像", image);
        //imshow("equalized_image", image_enhanced);
        //waitKey(0);


        //获取图像直方图
        Mat hist;
        int histsize = 256;
        float ranges[] = { 0,256 };
        const float* histRanges = { ranges };
        calcHist(&image_enhanced, 1, 0, Mat(), hist, 1, &histsize, &histRanges, true, false);

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

        //namedWindow("histImage", WINDOW_FREERATIO);//创建一个名为Image的可调节的窗口 以免图片显示不全
        //imshow("histImage", histImage);
        display_MatInQT(ui->label_2, histImage);

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//中值滤波
void MainWindow::on_pushButton_7_clicked()
{
    ui->label_2->clear();

        if (image.data)
        {
            cvtColor(image, gray, COLOR_BGR2GRAY);

            // 中值滤波
            Mat medianFilteredImage;
            medianBlur(gray, medianFilteredImage, 5);
            display_MatInQT(ui->label_2, medianFilteredImage);
        }
        else
        {
            QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
        }

}

//均值滤波
void MainWindow::on_pushButton_8_clicked()
{
    ui->label_2->clear();

        if (image.data)
        {
            cvtColor(image, gray, COLOR_BGR2GRAY);

            // 均值滤波
            Mat meanFilteredImage;
            blur(gray, meanFilteredImage, Size(5, 5));
            display_MatInQT(ui->label_2, meanFilteredImage);
        }
        else
        {
            QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
        }

}

//高斯滤波
void MainWindow::on_pushButton_9_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        cvtColor(image, gray, COLOR_BGR2GRAY);

        // 高斯滤波
        Mat gaussianFilteredImage;
        GaussianBlur(gray, gaussianFilteredImage, Size(29, 29), 0);
        display_MatInQT(ui->label_2, gaussianFilteredImage);
    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//梯度锐化
void MainWindow::on_pushButton_10_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        cvtColor(image, gray, COLOR_BGR2GRAY);

        // 计算x方向和y方向的梯度
        cv::Mat grad_x, grad_y;
        cv::Sobel(gray, grad_x, CV_32F, 1, 0, 3); // 1表示沿x方向，0表示不沿y方向
        cv::Sobel(gray, grad_y, CV_32F, 0, 1, 3); // 0表示不沿x方向，1表示沿y方向

        // 计算梯度的平方
        cv::Mat grad_x2 = grad_x.mul(grad_x);
        cv::Mat grad_y2 = grad_y.mul(grad_y);

        // 求和并开方计算梯度幅度
        cv::Mat grad_magnitude;
        cv::add(grad_x2, grad_y2, grad_magnitude); // 将两个方向的梯度平方相加
        cv::sqrt(grad_magnitude, grad_magnitude); // 计算平方根得到梯度幅度

        // 归一化到显示范围（可选）
        cv::normalize(grad_magnitude, grad_magnitude, 0, 255, cv::NORM_MINMAX, CV_8U);

        // 将梯度幅度与原始图像相加，实现锐化效果
        cv::Mat sharpenedImage = gray + grad_magnitude;

        // 显示结果
        //cv::imshow("Original Image", image);
        //cv::imshow("Gradient Magnitude", grad_magnitude);
        //cv::imshow("sharpened_img", sharpenedImage);
        //cv::waitKey(0); // 等待按键
        display_MatInQT(ui->label_2, sharpenedImage);
    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//Laplacian锐化
void MainWindow::on_pushButton_11_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        Mat image_output, image_output2;   //定义输入图像，灰度图像，输出图像

        cvtColor(image, gray, COLOR_BGR2GRAY);
        //imshow("gray", image_gray);

        //自编函数
        //myfilter(gray, image_output); //4邻域
        //imshow("image_output", image_output);

        myfilter2(gray, image_output2); //8邻域
        //imshow("image_output2", image_output2);

        //waitKey(0);  //暂停，保持图像显示，等待按键结束

        display_MatInQT(ui->label_2, image_output2);

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

void MainWindow::myfilter(Mat& image_input, Mat& image_output) //4
{
    image_output = image_input.clone();
    int la;
    for (int i = 1; i < (image_input.rows - 1); i++)
    {
        for (int j = 1; j < (image_input.cols - 1); j++)
        {
            la = 4 * image_input.at<uchar>(i, j) - image_input.at<uchar>(i + 1, j) - image_input.at<uchar>(i - 1, j) - image_input.at<uchar>(i, j + 1) - image_input.at<uchar>(i, j - 1);

            image_output.at<uchar>(i, j) = saturate_cast<uchar>(image_output.at<uchar>(i, j) + la);

        }
    }
}

void MainWindow::myfilter2(Mat& image_input, Mat& image_output) //8
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

//Fourier傅里叶变换
void MainWindow::on_pushButton_12_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        Mat image_output, image_transform;   //定义输入图像，灰度图像，输出图像
        cvtColor(image, gray, COLOR_BGR2GRAY); //转换为灰度图

        //傅里叶变换，image_output为可显示的频谱图，image_transform为傅里叶变换的复数结果
        My_DFT(gray, image_output, image_transform);

        // 将频谱图转换为QPixmap并显示在QLabel中     QImage::Format_RGB888     QImage::Format_Grayscale8
        QPixmap pixmap = QPixmap::fromImage(QImage(image_output.data, image_output.cols,
                                                   image_output.rows, image_output.step, QImage::Format_Grayscale8));
        ui->label_2->setPixmap(pixmap.scaled(ui->label_2->width(), ui->label_2->height(), Qt::KeepAspectRatio)); //保持图像的原始比例
        ui->label_2->show();

        /*
        QImage grayImage(image_output.data, image_output.cols, image_output.rows, image_output.step, QImage::Format_Grayscale8);
        QPixmap pixmap = QPixmap::fromImage(grayImage);
        // 将QPixmap设置到QLabel上
        ui->label_2->setPixmap(pixmap);
        // 设置QLabel以缩放内容以适应其大小
        ui->label_2->setScaledContents(true);
        // 现在你可以将label添加到你的布局中，或者作为一个独立的窗口显示它
        ui->label_2->show();
        */

        //display_MatInQT(ui->label_2, image_output);  //不知道为啥QImage的频谱图显示不了

        //imshow("image", image);
        //imshow("image_gray", gray);
        imshow("image_output", image_output);
        waitKey(0);  //暂停，保持图像显示，等待按键结束

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//傅里叶变换得到频谱图和复数域结果
void MainWindow::My_DFT(Mat input_image, Mat& output_image, Mat& transform_image)
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

    //交换象限中心化
    Mat tmp;
    q0.copyTo(tmp); q3.copyTo(q0); tmp.copyTo(q3);//左上与右下进行交换
    q1.copyTo(tmp); q2.copyTo(q1); tmp.copyTo(q2);//右上与左下进行交换


    /*******************************/

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

//低通滤波
void MainWindow::on_pushButton_13_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        Mat image_output, image_transform;   //定义输入图像，灰度图像，输出图像

        cvtColor(image, gray, COLOR_BGR2GRAY); //转换为灰度图

        //Salt(gray, 1000);
        //imshow("noise_gray", gray); //显示噪声图


        //1、傅里叶变换，image_output为可显示的频谱图，image_transform为傅里叶变换的复数结果
        My_DFT(gray, image_output, image_transform);
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

        // 将频谱图转换为QPixmap并显示在QLabel中     QImage::Format_RGB888     QImage::Format_Grayscale8
        QPixmap pixmap = QPixmap::fromImage(QImage(iDft[0].data, iDft[0].cols,
                                                   iDft[0].rows, iDft[0].step, QImage::Format_Grayscale8));
        ui->label_2->setPixmap(pixmap.scaled(ui->label_2->width(), ui->label_2->height(), Qt::KeepAspectRatio)); //保持图像的原始比例
        ui->label_2->show();

        //display_MatInQT(ui->label_2, image_output);
        //display_MatInQT(ui->label_2, iDft[0]);

        waitKey(0);  //暂停，保持图像显示，等待按键结束

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//高通滤波
void MainWindow::on_pushButton_14_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        Mat image_output, image_transform;   //定义输入图像，灰度图像，输出图像

        cvtColor(image, gray, COLOR_BGR2GRAY); //转换为灰度图

        //1、傅里叶变换，image_output为可显示的频谱图，image_transform为傅里叶变换的复数结果
        My_DFT(gray, image_output, image_transform);
        imshow("image_output", image_output);

        //2、理想高通滤波
        Mat planes[] = { Mat_<float>(image_output), Mat::zeros(image_output.size(),CV_32F) };
        split(image_transform, planes);//分离通道，获取实部虚部
        Mat image_transform_real = planes[0];
        Mat image_transform_imag = planes[1];

        int core_x = image_transform_real.rows / 2;//频谱图中心坐标
        int core_y = image_transform_real.cols / 2;
        int r = 20;  //滤波半径
        for (int i = 0; i < image_transform_real.rows; i++)
        {
            for (int j = 0; j < image_transform_real.cols; j++)
            {
                //距离中心的距离大于设置半径r的点所在值设为0
                if (((i - core_x) * (i - core_x) + (j - core_y) * (j - core_y)) < r * r)
                {
                    image_transform_real.at<float>(i, j) = 0;
                    image_transform_imag.at<float>(i, j) = 0;
                }
            }
        }
        planes[0] = image_transform_real;
        planes[1] = image_transform_imag;
        Mat image_transform_ilpf;//定义理想高通滤波矩阵
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

        // 将频谱图转换为QPixmap并显示在QLabel中     QImage::Format_RGB888     QImage::Format_Grayscale8
        QPixmap pixmap = QPixmap::fromImage(QImage(iDft[0].data, iDft[0].cols,
                                                   iDft[0].rows, iDft[0].step, QImage::Format_Grayscale8));
        ui->label_2->setPixmap(pixmap.scaled(ui->label_2->width(), ui->label_2->height(), Qt::KeepAspectRatio)); //保持图像的原始比例
        ui->label_2->show();

        //display_MatInQT(ui->label_2, image_output);
        //display_MatInQT(ui->label_2, iDft[0]);

        waitKey(0);  //暂停，保持图像显示，等待按键结束


    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//Roberts边缘检测
void MainWindow::on_pushButton_15_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        Mat image_bw, image_bw1, image_bw2;

        //转换为灰度图像
        cvtColor(image, gray, COLOR_BGR2GRAY);
        //cv::imshow("image_gray", gray);

        //构建检测核
        Mat kernel1 = (cv::Mat_<float>(2, 2) << -1, 0, 0, 1);
        Mat kernel2 = (cv::Mat_<float>(2, 2) << 0, -1, 1, 0);
        //利用filter2D进行处理
        filter2D(gray, image_bw1, -1, kernel1);
        filter2D(gray, image_bw2, -1, kernel2);
        //结果取绝对值
        convertScaleAbs(image_bw1, image_bw1);
        convertScaleAbs(image_bw2, image_bw2);
        //转换为二值图
        threshold(image_bw1, image_bw1, 30, 255, 0);
        threshold(image_bw2, image_bw2, 30, 255, 0);
        //两个方向的结果相加
        image_bw = image_bw1 + image_bw2;

        //cv::imshow("robert1", image_bw1);
        //cv::imshow("robert2", image_bw2);
        //cv::imshow("robert", image_bw);
        //cv::waitKey(0);  //暂停，保持图像显示，等待按键结束
        display_MatInQT(ui->label_2, image_bw);

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//Sobel边缘检测
void MainWindow::on_pushButton_16_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        // sobel边缘检测
        //cv::Mat sobel;
        //cv::Sobel(image, sobel, CV_16S, 1, 0, 3, 1, 0); // 检测x方向的边缘
        //cv::convertScaleAbs(sobel, sobel); // 将16位有符号整数转换为8位无符号整数

        Mat image_bw, image_bw1, image_bw2;

        //转换为灰度图像
        cvtColor(image, gray, COLOR_BGR2GRAY);
        ///cv::imshow("gray", image_gray);

        //Sobel   void Sobel(InputArray src, OutputArray dst, int ddepth, int dx, int dy, int ksize=3, double scale=1, double delta=0, int borderType=BORDER_DEFAULT)
        Sobel(gray, image_bw1, -1, 1, 0);   //dx=1 且 dy=0，则函数将计算一阶 x 导数
        Sobel(gray, image_bw2, -1, 0, 1);

        //结果取绝对值
        convertScaleAbs(image_bw1, image_bw1);
        convertScaleAbs(image_bw2, image_bw2);
        //转换为二值图
        threshold(image_bw1, image_bw1, 60, 255, 0);
        threshold(image_bw2, image_bw2, 60, 255, 0);
        //两个方向的结果相加
        image_bw = image_bw1 + image_bw2;

        //cv::imshow("sobelX", image_bw1);
        //cv::imshow("sobelY", image_bw2);
        //cv::imshow("sobel", image_bw);
        //cv::waitKey(0);  //暂停，保持图像显示，等待按键结束

        display_MatInQT(ui->label_2, image_bw);

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//Laplace边缘检测
void MainWindow::on_pushButton_17_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        // Laplacian边缘检测
        cv::Mat laplacian;
        cv::Laplacian(image, laplacian, CV_16S, 3, 1); // 滤波器大小为3，delta值为1
        cv::convertScaleAbs(laplacian, laplacian); // 将16位有符号整数转换为8位无符号整数
        display_MatInQT(ui->label_2, laplacian);

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//Prewitt边缘检测
void MainWindow::on_pushButton_18_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        Mat image_bw, image_bw1, image_bw2;

        //转换为灰度图像
        cvtColor(image, gray, COLOR_BGR2GRAY);
        //cv::imshow("image_gray", image_gray);

        //构建检测核
        Mat kernel1 = (cv::Mat_<float>(3, 3) << -1, -1, -1, 0, 0, 0, 1, 1, 1);
        Mat kernel2 = (cv::Mat_<float>(3, 3) << -1, 0, 1, -1, 0, 1, -1, 0, 1);
        //利用filter2D进行处理
        filter2D(gray, image_bw1, -1, kernel1);
        filter2D(gray, image_bw2, -1, kernel2);
        //结果取绝对值
        convertScaleAbs(image_bw1, image_bw1);
        convertScaleAbs(image_bw2, image_bw2);
        //转换为二值图
        threshold(image_bw1, image_bw1, 60, 255, 0);
        threshold(image_bw2, image_bw2, 60, 255, 0);
        //两个方向的结果相加
        image_bw = image_bw1 + image_bw2;

        //cv::imshow("prewittX", image_bw1);
        //cv::imshow("prewittY", image_bw2);
        //cv::imshow("prewitt", image_bw);
        //cv::waitKey(0);  //暂停，保持图像显示，等待按键结束
        display_MatInQT(ui->label_2, image_bw);
    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }
}

//Canny边缘检测
void MainWindow::on_pushButton_19_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        // canny边缘检测
        cv::Mat canny_edges;
        cv::Canny(image, canny_edges, 100, 200); //所有梯度强度低于100的像素点都会被视为非边缘并被丢弃， 超过200的像素点都会被视为边缘像素
        display_MatInQT(ui->label_2, canny_edges);

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}

//OTSU阈值分割
void MainWindow::on_pushButton_20_clicked()
{
    ui->label_2->clear();

    if (image.data)
    {
        cvtColor(image, gray, COLOR_BGR2GRAY);

        Mat binary;
        //OTSU法（基于最小类内方差求阈值的方法）：基于像素直方图的统计结果，统计各像素点值的方差值，选类内方差最小的像素点值作为阈值。
        threshold(gray, binary, 0, 255, THRESH_BINARY | THRESH_OTSU);
        display_MatInQT(ui->label_2, binary);

    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }

}



QImage MainWindow::MatToQImage(const cv::Mat& mat)
{

    // 8-bits unsigned, NO. OF CHANNELS = 1
    if (mat.type() == CV_8UC1)
    {
        QImage image(mat.cols, mat.rows, QImage::Format_Indexed8);
        // Set the color table (used to translate colour indexes to qRgb values)
        image.setColorCount(256);
        for (int i = 0; i < 256; i++)
        {
            image.setColor(i, qRgb(i, i, i));
        }
        // Copy input Mat
        uchar* pSrc = mat.data;
        for (int row = 0; row < mat.rows; row++)
        {
            uchar* pDest = image.scanLine(row);
            memcpy(pDest, pSrc, mat.cols);
            pSrc += mat.step;
        }
        return image;
    }
    // 8-bits unsigned, NO. OF CHANNELS = 3
    else if (mat.type() == CV_8UC3)
    {
        // Copy input Mat
        const uchar* pSrc = (const uchar*)mat.data;
        // Create QImage with same dimensions as input Mat
        QImage image(pSrc, mat.cols, mat.rows, (int)mat.step, QImage::Format_RGB888);
        return image.rgbSwapped();
    }
    else if (mat.type() == CV_8UC4)
    {
        //qDebug() << "CV_8UC4";
        // Copy input Mat
        const uchar* pSrc = (const uchar*)mat.data;
        // Create QImage with same dimensions as input Mat
        QImage image(pSrc, mat.cols, mat.rows, (int)mat.step, QImage::Format_ARGB32);
        return image.copy();
    }
    else
    {
        //qDebug() << "ERROR: Mat could not be converted to QImage.";
        return QImage();
    }
}

//显示图像
void MainWindow::display_MatInQT(QLabel* label, Mat mat)
{

    label->setPixmap(QPixmap::fromImage(MatToQImage(mat)).scaled(label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation));

}

```

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QFileDialog>
#include <opencv2/opencv.hpp>

using namespace cv;

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    //菜单栏
    //void on_lead_image_triggered(); //菜单栏导入图片
    void on_save_image_triggered(); //菜单栏导出图片

    //图像预处理
    void on_pushButton_clicked(); //打开图像
    void on_pushButton_2_clicked(); //灰度线性变化
    void on_pushButton_3_clicked(); //灰度对数变换
    void on_pushButton_4_clicked(); //伽马变换
    void on_pushButton_5_clicked(); //灰度直方图
    void on_pushButton_6_clicked(); //直方图均衡化

    //空间域图像增强
    void on_pushButton_7_clicked(); //中值滤波
    void on_pushButton_8_clicked(); //均值滤波
    void on_pushButton_9_clicked(); //高斯滤波
    void on_pushButton_10_clicked(); //梯度锐化
    void on_pushButton_11_clicked(); //Laplacian锐化

    //频率域图像增强
    void on_pushButton_12_clicked(); //Fourier傅里叶变换
    void on_pushButton_13_clicked(); //低通滤波
    void on_pushButton_14_clicked(); //高通滤波

    //边缘检测和阈值分割
    void on_pushButton_15_clicked(); //Roberts
    void on_pushButton_16_clicked(); //Sobel
    void on_pushButton_17_clicked(); //Laplace
    void on_pushButton_18_clicked(); //Prewitt
    void on_pushButton_19_clicked(); //Canny
    void on_pushButton_20_clicked(); //OTSU阈值分割


private:
    QImage MatToQImage(const cv::Mat& mat);				// MAT类型 转 QImage类型
    void display_MatInQT(QLabel* label, cv::Mat mat);	// MAT对象 QT显示
    //定义傅里叶变换函数。input_image：输入图像；output_image：傅里叶频谱图；transform_array:傅里叶变换矩阵（复数）
    void My_DFT(Mat input_image, Mat& output_image, Mat& transform_array);

    //定义滤波函数
    void myfilter(Mat& image_input, Mat& image_output); //四邻域
    void myfilter2(Mat& image_input, Mat& image_output); //八邻域

private:
    Ui::MainWindow *ui;

    Mat image;
    Mat gray;
};
#endif // MAINWINDOW_H

```

```cmake
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

CONFIG += c++11

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
    main.cpp \
    mainwindow.cpp

HEADERS += \
    mainwindow.h

FORMS += \
    mainwindow.ui

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

INCLUDEPATH +=D:\OpenCV-3.4.1\build\include  \
              D:\OpenCV-3.4.1\build\include  \
              D:\OpenCV-3.4.1\build\include\opencv2

CONFIG(debug, debug|release): {

        LIBS += D:\OpenCV-3.4.1\build\x64\mingw\lib\libopencv_*d.dll.a
        }

        else:CONFIG(release, debug|release): {

        LIBS += D:\OpenCV-3.4.1\build\x64\mingw\lib\libopencv_*.dll.a

        }

RESOURCES += \
    res.qrc

```



**运行结果：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725277901991-7bb4c338-ec0f-4350-b462-aef11806772a.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725277921913-eb3ef9ca-3976-4f95-a41f-1bf489531e2c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725278008512-9249c434-79d0-4fdb-a97e-38aa391e5ed1.png)

... ...

### 3.第三个
**UI界面如下：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725278541105-b57c0289-94f1-4a42-b1a0-df50790414a7.png)



```cmake
#include "mainwindow.h"
#include "ui_mainwindow.h"


MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    //ui->label->setScaledContents(true);//fit video to label area 会失真

}

MainWindow::~MainWindow()
{
    delete ui;
}


//图片格式转换
QImage MainWindow::MatToQImage(const cv::Mat& mat)
{

    // 8-bits unsigned, NO. OF CHANNELS = 1
    if (mat.type() == CV_8UC1)
    {
        QImage image(mat.cols, mat.rows, QImage::Format_Indexed8);
        // Set the color table (used to translate colour indexes to qRgb values)
        image.setColorCount(256);
        for (int i = 0; i < 256; i++)
        {
            image.setColor(i, qRgb(i, i, i));
        }
        // Copy input Mat
        uchar* pSrc = mat.data;
        for (int row = 0; row < mat.rows; row++)
        {
            uchar* pDest = image.scanLine(row);
            memcpy(pDest, pSrc, mat.cols);
            pSrc += mat.step;
        }
        return image;
    }
    // 8-bits unsigned, NO. OF CHANNELS = 3
    else if (mat.type() == CV_8UC3)
    {
        // Copy input Mat
        const uchar* pSrc = (const uchar*)mat.data;
        // Create QImage with same dimensions as input Mat
        QImage image(pSrc, mat.cols, mat.rows, (int)mat.step, QImage::Format_RGB888);
        return image.rgbSwapped();
    }
    else if (mat.type() == CV_8UC4)
    {
        //qDebug() << "CV_8UC4";
        // Copy input Mat
        const uchar* pSrc = (const uchar*)mat.data;
        // Create QImage with same dimensions as input Mat
        QImage image(pSrc, mat.cols, mat.rows, (int)mat.step, QImage::Format_ARGB32);
        return image.copy();
    }
    else
    {
        //qDebug() << "ERROR: Mat could not be converted to QImage.";
        return QImage();
    }
}
//显示图像QLabel
void MainWindow::display_MatInQT(QLabel* label, Mat mat)
{

    label->setPixmap(QPixmap::fromImage(MatToQImage(mat)).scaled(label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation));

}

//原始视频
void MainWindow::on_pushButton_clicked()
{
    // 读取视频
    //VideoCapture capture("D:/新桌面/视频/cobe.mp4");
    VideoCapture capture;
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());

    if (!capture.isOpened()) {
        qDebug() << "无法打开视频文件" ;
        QMessageBox::information(this,tr("请先选择视频"),
                                 tr("请先选择视频！"));
    }
    else{
        long totalFrameNumber = capture.get(CAP_PROP_FRAME_COUNT);
        qDebug() << "整个视频共" << totalFrameNumber << "帧" ;

        // 获取帧率
        double rate = capture.get(CAP_PROP_FPS);
        qDebug() << "帧率为:" << rate ;

        int delay = static_cast<int>(1000 / rate); //每帧之间的时间间隔
        //Mat frame;
        if (!capture.read(frame))
        {
            qDebug() << "读取视频帧失败" ;
        }
        // 注意！在图像处理中，通常我们把图像的“行数”对应为图像的“高度”（height），把图像的“列数”对应为图像的“宽度”（width）
        qDebug() << "图片高height为:" << frame.rows;
        qDebug() << "图片宽width为:" << frame.cols;

        // 设置视频写入参数
        int isColor = 1;  //1是彩色,0是灰色
        int frameWidth = static_cast<int>(capture.get(CAP_PROP_FRAME_WIDTH));
        int frameHeight = static_cast<int>(capture.get(CAP_PROP_FRAME_HEIGHT));
        //发现mjpg编码不支持灰色,出现花屏
        //VideoWriter writer("output.avi", VideoWriter::fourcc('M', 'J', 'P', 'G'), rate, Size(frameWidth, frameHeight), isColor);  //其他常见的编解码器，如 XVID 或 DIVX
        VideoWriter writer("output.avi", VideoWriter::fourcc('X', 'V', 'I', 'D'), rate, Size(frameWidth, frameHeight), isColor);

        // 读取和写入帧的循环
        while (true) {
            if (!capture.read(frame)) {
                qDebug() << "读取视频帧失败,视频结束！" ;
                break;
            }

            frame.copyTo(frame);  // 对图片进行处理（这里只是复制）
            writer.write(frame);

            // 创建窗口并设置大小
            namedWindow("frame", WINDOW_AUTOSIZE);   // 创建一个自动调整大小的窗口
            //namedWindow("frame", WINDOW_NORMAL);   // 创建一个用户可调整大小的窗口
            imshow("frame", frame); //原始视频

            //显示在Label上
            //capture >> frame;
            if(!frame.empty())
            {
                display_MatInQT(ui->label,frame);
            }

            // 等待按键或延迟时间后继续
            int c = waitKey(delay);
            if (c == 'q' || c == 27) {  // 'q'键或Esc键退出循环
                break;
            }
        }

        // 释放资源
        capture.release();
        writer.release();
        destroyAllWindows();
    }


}

//灰度化
void MainWindow::on_pushButton_2_clicked()
{
    // 读取视频
    //VideoCapture capture("D:/新桌面/视频/cobe.mp4");
    VideoCapture capture;
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());

    if (!capture.isOpened()) {
        qDebug() << "无法打开视频文件" ;
        QMessageBox::information(this,tr("请先选择视频"),
                                 tr("请先选择视频！"));
    }
    else{
        long totalFrameNumber = capture.get(CAP_PROP_FRAME_COUNT);
        qDebug() << "整个视频共" << totalFrameNumber << "帧" ;

        // 获取帧率
        double rate = capture.get(CAP_PROP_FPS);
        qDebug() << "帧率为:" << rate ;

        int delay = static_cast<int>(1000 / rate);
        //Mat frame;
        if (!capture.read(frame))
        {
            qDebug() << "读取视频帧失败" ;
        }
        qDebug() << "图片高height为:" << frame.rows;
        qDebug() << "图片宽width为:" << frame.cols;

        // 设置视频写入参数
        int isColor = 0;  //1是彩色,0是灰色
        int frameWidth = static_cast<int>(capture.get(CAP_PROP_FRAME_WIDTH));
        int frameHeight = static_cast<int>(capture.get(CAP_PROP_FRAME_HEIGHT));
        //发现mjpg编码不支持灰色,出现花屏
        //VideoWriter writer("output.avi", VideoWriter::fourcc('M', 'J', 'P', 'G'), rate, Size(frameWidth, frameHeight), isColor);  //其他常见的编解码器，如 XVID 或 DIVX
        VideoWriter writer("output_gray.avi", VideoWriter::fourcc('X', 'V', 'I', 'D'), rate, Size(frameWidth, frameHeight), isColor);

        // 读取和写入帧的循环
        while (true) {
            if (!capture.read(frame)) {
                qDebug() << "读取视频帧失败,视频结束！" ;
                break;
            }

            frame.copyTo(frame);  // 对图片进行处理（这里只是复制）
            //写入并保存灰色视频avi
            if (frame.channels() == 3) {
                    // 如果帧是彩色的，转换为灰度
                    Mat grayFrame;
                    cvtColor(frame, grayFrame, COLOR_BGR2GRAY); //灰度化
                    writer.write(grayFrame); // 写入灰度帧
                } else {
                    // 如果帧已经是灰度的，直接写入
                    writer.write(frame);
                }

            // 创建窗口并设置大小
            namedWindow("frame", WINDOW_AUTOSIZE);
            imshow("frame", frame); //原始视频

            //灰度化
            cvtColor(frame, frame, COLOR_BGR2GRAY);
            //显示在Label上
            //capture >> frame;
            if(!frame.empty())
            {
                display_MatInQT(ui->label,frame);
            }

            // 等待按键或延迟时间后继续
            int c = waitKey(delay);
            if (c == 'q' || c == 27) {  // 'q'键或Esc键退出循环
                break;
            }
        }

        // 释放资源
        capture.release();
        writer.release();
        destroyAllWindows();
    }

}

//二值化
void MainWindow::on_pushButton_3_clicked()
{
    // 读取视频
    //VideoCapture capture("D:/新桌面/视频/cobe.mp4");
    VideoCapture capture;
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());

    if (!capture.isOpened()) {
        qDebug() << "无法打开视频文件" ;
        QMessageBox::information(this,tr("请先选择视频"),
                                 tr("请先选择视频！"));
    }
    else{
        long totalFrameNumber = capture.get(CAP_PROP_FRAME_COUNT);
        qDebug() << "整个视频共" << totalFrameNumber << "帧" ;

        // 获取帧率
        double rate = capture.get(CAP_PROP_FPS);
        qDebug() << "帧率为:" << rate ;

        int delay = static_cast<int>(1000 / rate);
        //Mat frame;
        if (!capture.read(frame))
        {
            qDebug() << "读取视频帧失败" ;
        }
        qDebug() << "图片高height为:" << frame.rows;
        qDebug() << "图片宽width为:" << frame.cols;

        // 设置视频写入参数
        int isColor = 0;  //1是彩色,0是灰色
        int frameWidth = static_cast<int>(capture.get(CAP_PROP_FRAME_WIDTH));
        int frameHeight = static_cast<int>(capture.get(CAP_PROP_FRAME_HEIGHT));
        //发现mjpg编码不支持灰色,出现花屏
        //VideoWriter writer("output.avi", VideoWriter::fourcc('M', 'J', 'P', 'G'), rate, Size(frameWidth, frameHeight), isColor);  //其他常见的编解码器，如 XVID 或 DIVX
        VideoWriter writer("output_two.avi", VideoWriter::fourcc('X', 'V', 'I', 'D'), rate, Size(frameWidth, frameHeight), isColor);

        // 读取和写入帧的循环
        while (true) {
            if (!capture.read(frame)) {
                qDebug() << "读取视频帧失败,视频结束！" ;
                break;
            }

            frame.copyTo(frame);  // 对图片进行处理（这里只是复制）
            //写入并保存视频avi
            if (frame.channels() == 3) {
                    // 如果帧是彩色的，转换为灰度
                    Mat grayFrame;
                    cvtColor(frame, grayFrame, COLOR_BGR2GRAY); //灰度化
                    // 二值化图像
                    int value = 127;
                    Mat binaryImage = TwoSide(grayFrame, value);
                    writer.write(binaryImage);
                } else {
                    // 如果帧已经是灰度的，直接写入
                    // 二值化图像
                    int value = 127;
                    Mat binaryImage = TwoSide(frame, value);
                    writer.write(binaryImage);
                }

            // 创建窗口并设置大小
            namedWindow("frame", WINDOW_AUTOSIZE);
            imshow("frame", frame); //原始视频

            //灰度化
            cvtColor(frame, frame, COLOR_BGR2GRAY);
            // 二值化图像
            int value = 127;
            frame = TwoSide(frame, value);
            //显示在Label上
            //capture >> frame;
            if(!frame.empty())
            {
                display_MatInQT(ui->label,frame);
            }

            // 等待按键或延迟时间后继续
            int c = waitKey(delay);
            if (c == 'q' || c == 27) {  // 'q'键或Esc键退出循环
                break;
            }
        }

        // 释放资源
        capture.release();
        writer.release();
        destroyAllWindows();
    }


}

Mat MainWindow::TwoSide(Mat grayimage, int value)
{
    Mat binaryImage;
    // 使用THRESH_BINARY_INV二值化类型，将大于阈值的像素设置为0（黑色），小于阈值的像素设置为255（白色）
    threshold(grayimage, binaryImage, value, 255, THRESH_BINARY_INV);
    return binaryImage;
}



//伽马变换
void MainWindow::on_pushButton_4_clicked()
{
    // 读取视频
    //VideoCapture capture("D:/新桌面/视频/cobe.mp4");
    VideoCapture capture;
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());

    if (!capture.isOpened()) {
        qDebug() << "无法打开视频文件" ;
        QMessageBox::information(this,tr("请先选择视频"),
                                 tr("请先选择视频！"));
    }
    else{
        long totalFrameNumber = capture.get(CAP_PROP_FRAME_COUNT);
        qDebug() << "整个视频共" << totalFrameNumber << "帧" ;

        // 获取帧率
        double rate = capture.get(CAP_PROP_FPS);
        qDebug() << "帧率为:" << rate ;

        int delay = static_cast<int>(1000 / rate);
        //Mat frame;
        if (!capture.read(frame))
        {
            qDebug() << "读取视频帧失败" ;
        }
        qDebug() << "图片高height为:" << frame.rows;
        qDebug() << "图片宽width为:" << frame.cols;

        // 设置视频写入参数
        int isColor = 0;  //1是彩色,0是灰色
        int frameWidth = static_cast<int>(capture.get(CAP_PROP_FRAME_WIDTH));
        int frameHeight = static_cast<int>(capture.get(CAP_PROP_FRAME_HEIGHT));
        //发现mjpg编码不支持灰色,出现花屏
        //VideoWriter writer("output.avi", VideoWriter::fourcc('M', 'J', 'P', 'G'), rate, Size(frameWidth, frameHeight), isColor);  //其他常见的编解码器，如 XVID 或 DIVX
        VideoWriter writer("output_gamma.avi", VideoWriter::fourcc('X', 'V', 'I', 'D'), rate, Size(frameWidth, frameHeight), isColor);

        // 读取和写入帧的循环
        while (true) {
            if (!capture.read(frame)) {
                qDebug() << "读取视频帧失败,视频结束！" ;
                break;
            }

            frame.copyTo(frame);  // 对图片进行处理（这里只是复制）
            //写入并保存视频avi
            if (frame.channels() == 3) {
                    // 如果帧是彩色的，转换为灰度
                    Mat grayFrame;
                    grayFrame = grayGamma(frame); //伽马变换

                    writer.write(grayFrame);
                } else {
                    // 如果帧已经是灰度的
                    writer.write(frame);
                }

            // 创建窗口并设置大小
            namedWindow("frame", WINDOW_AUTOSIZE);
            imshow("frame", frame); //原始视频

            frame = grayGamma(frame); //伽马变换
            //显示在Label上
            //capture >> frame;
            if(!frame.empty())
            {
                display_MatInQT(ui->label,frame);
            }

            // 等待按键或延迟时间后继续
            int c = waitKey(delay);
            if (c == 'q' || c == 27) {  // 'q'键或Esc键退出循环
                break;
            }
        }

        // 释放资源
        capture.release();
        writer.release();
        destroyAllWindows();
    }


}

//Canny检测
void MainWindow::on_pushButton_5_clicked()
{
    // 读取视频
    //VideoCapture capture("D:/新桌面/视频/cobe.mp4");
    VideoCapture capture;
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());

    if (!capture.isOpened()) {
        qDebug() << "无法打开视频文件" ;
        QMessageBox::information(this,tr("请先选择视频"),
                                 tr("请先选择视频！"));
    }
    else{
        long totalFrameNumber = capture.get(CAP_PROP_FRAME_COUNT);
        qDebug() << "整个视频共" << totalFrameNumber << "帧" ;

        // 获取帧率
        double rate = capture.get(CAP_PROP_FPS);
        qDebug() << "帧率为:" << rate ;

        int delay = static_cast<int>(1000 / rate);
        //Mat frame;
        if (!capture.read(frame))
        {
            qDebug() << "读取视频帧失败" ;
        }
        qDebug() << "图片高height为:" << frame.rows;
        qDebug() << "图片宽width为:" << frame.cols;

        // 设置视频写入参数
        int isColor = 0;  //1是彩色,0是灰色
        int frameWidth = static_cast<int>(capture.get(CAP_PROP_FRAME_WIDTH));
        int frameHeight = static_cast<int>(capture.get(CAP_PROP_FRAME_HEIGHT));
        //发现mjpg编码不支持灰色,出现花屏
        //VideoWriter writer("output.avi", VideoWriter::fourcc('M', 'J', 'P', 'G'), rate, Size(frameWidth, frameHeight), isColor);  //其他常见的编解码器，如 XVID 或 DIVX
        VideoWriter writer("output_canny.avi", VideoWriter::fourcc('X', 'V', 'I', 'D'), rate, Size(frameWidth, frameHeight), isColor);

        // 读取和写入帧的循环
        while (true) {
            if (!capture.read(frame)) {
                qDebug() << "读取视频帧失败,视频结束！" ;
                break;
            }

            frame.copyTo(frame);  // 对图片进行处理（这里只是复制）
            //写入并保存灰色视频avi
            if (frame.channels() == 3) {
                    // 如果帧是彩色的
                    Mat grayFrame;
                    cvtColor(frame, grayFrame, COLOR_BGR2GRAY); //灰度化
                    Canny(grayFrame, grayFrame, 100, 200); //所有梯度强度低于100的像素点都会被视为非边缘并被丢弃， 超过200的像素点都会被视为边缘像素

                    writer.write(grayFrame);
                } else {
                    // 如果帧已经是灰度的
                    Mat grayFrame;
                    Canny(grayFrame, grayFrame, 100, 200);

                    writer.write(grayFrame);
                }

            // 创建窗口并设置大小
            namedWindow("frame", WINDOW_AUTOSIZE);
            imshow("frame", frame); //原始视频

            cvtColor(frame, frame, COLOR_BGR2GRAY); //灰度化
            Canny(frame, frame, 100, 200); //所有梯度强度低于100的像素点都会被视为非边缘并被丢弃， 超过200的像素点都会被视为边缘像素
            //显示在Label上
            //capture >> frame;
            if(!frame.empty())
            {
                display_MatInQT(ui->label,frame);
            }

            // 等待按键或延迟时间后继续
            int c = waitKey(delay);
            if (c == 'q' || c == 27) {  // 'q'键或Esc键退出循环
                break;
            }
        }

        // 释放资源
        capture.release();
        writer.release();
        destroyAllWindows();
    }


}

//OTSU阈值分割
void MainWindow::on_pushButton_6_clicked()
{
    // 读取视频
    //VideoCapture capture("D:/新桌面/视频/cobe.mp4");
    VideoCapture capture;
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());

    if (!capture.isOpened()) {
        qDebug() << "无法打开视频文件" ;
        QMessageBox::information(this,tr("请先选择视频"),
                                 tr("请先选择视频！"));
    }
    else{
        long totalFrameNumber = capture.get(CAP_PROP_FRAME_COUNT);
        qDebug() << "整个视频共" << totalFrameNumber << "帧" ;

        // 获取帧率
        double rate = capture.get(CAP_PROP_FPS);
        qDebug() << "帧率为:" << rate ;

        int delay = static_cast<int>(1000 / rate);
        //Mat frame;
        if (!capture.read(frame))
        {
            qDebug() << "读取视频帧失败" ;
        }
        qDebug() << "图片高height为:" << frame.rows;
        qDebug() << "图片宽width为:" << frame.cols;

        // 设置视频写入参数
        int isColor = 0;  //1是彩色,0是灰色
        int frameWidth = static_cast<int>(capture.get(CAP_PROP_FRAME_WIDTH));
        int frameHeight = static_cast<int>(capture.get(CAP_PROP_FRAME_HEIGHT));
        //发现mjpg编码不支持灰色,出现花屏
        //VideoWriter writer("output.avi", VideoWriter::fourcc('M', 'J', 'P', 'G'), rate, Size(frameWidth, frameHeight), isColor);  //其他常见的编解码器，如 XVID 或 DIVX
        VideoWriter writer("output_OTSU.avi", VideoWriter::fourcc('X', 'V', 'I', 'D'), rate, Size(frameWidth, frameHeight), isColor);

        // 读取和写入帧的循环
        while (true) {
            if (!capture.read(frame)) {
                qDebug() << "读取视频帧失败,视频结束！" ;
                break;
            }

            frame.copyTo(frame);  // 对图片进行处理（这里只是复制）
            //写入并保存灰色视频avi
            if (frame.channels() == 3) {
                    // 如果帧是彩色的，转换为灰度
                    Mat grayFrame;
                    cvtColor(frame, grayFrame, COLOR_BGR2GRAY); //灰度化
                    //OTSU法（基于最小类内方差求阈值的方法）：基于像素直方图的统计结果，统计各像素点值的方差值，选类内方差最小的像素点值作为阈值。
                    threshold(grayFrame, grayFrame, 0, 255, THRESH_BINARY | THRESH_OTSU);

                    writer.write(grayFrame);
                } else {
                    // 如果帧已经是灰度的
                    threshold(frame, frame, 0, 255, THRESH_BINARY | THRESH_OTSU);
                    writer.write(frame);
                }

            // 创建窗口并设置大小
            namedWindow("frame", WINDOW_AUTOSIZE);
            imshow("frame", frame); //原始视频

            cvtColor(frame, frame, COLOR_BGR2GRAY); //灰度化
            threshold(frame, frame, 0, 255, THRESH_BINARY | THRESH_OTSU); //OTSU阈值分割
            //显示在Label上
            //capture >> frame;
            if(!frame.empty())
            {
                display_MatInQT(ui->label,frame);
            }

            // 等待按键或延迟时间后继续
            int c = waitKey(delay);
            if (c == 'q' || c == 27) {  // 'q'键或Esc键退出循环
                break;
            }
        }

        // 释放资源
        capture.release();
        writer.release();
        destroyAllWindows();
    }

}



Mat MainWindow::grayGamma(Mat image)
{
    if (image.data)
    {
        Mat output_image, image1_gray;   //定义输入图像，输出图像，灰度图像
        cvtColor(image, image1_gray, COLOR_BGR2GRAY);  //灰度化

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
        return output_image;
    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }
}




//中值滤波
void MainWindow::on_pushButton_7_clicked()
{
    // 读取视频
    //VideoCapture capture("D:/新桌面/视频/cobe.mp4");
    VideoCapture capture;
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());

    if (!capture.isOpened()) {
        qDebug() << "无法打开视频文件" ;
        QMessageBox::information(this,tr("请先选择视频"),
                                 tr("请先选择视频！"));
    }
    else{
        long totalFrameNumber = capture.get(CAP_PROP_FRAME_COUNT);
        qDebug() << "整个视频共" << totalFrameNumber << "帧" ;

        // 获取帧率
        double rate = capture.get(CAP_PROP_FPS);
        qDebug() << "帧率为:" << rate ;

        int delay = static_cast<int>(1000 / rate);
        //Mat frame;
        if (!capture.read(frame))
        {
            qDebug() << "读取视频帧失败" ;
        }
        qDebug() << "图片高height为:" << frame.rows;
        qDebug() << "图片宽width为:" << frame.cols;

        // 设置视频写入参数
        int isColor = 0;  //1是彩色,0是灰色
        int frameWidth = static_cast<int>(capture.get(CAP_PROP_FRAME_WIDTH));
        int frameHeight = static_cast<int>(capture.get(CAP_PROP_FRAME_HEIGHT));
        //发现mjpg编码不支持灰色,出现花屏
        //VideoWriter writer("output.avi", VideoWriter::fourcc('M', 'J', 'P', 'G'), rate, Size(frameWidth, frameHeight), isColor);  //其他常见的编解码器，如 XVID 或 DIVX
        VideoWriter writer("medianBlur.avi", VideoWriter::fourcc('X', 'V', 'I', 'D'), rate, Size(frameWidth, frameHeight), isColor);

        // 读取和写入帧的循环
        while (true) {
            if (!capture.read(frame)) {
                qDebug() << "读取视频帧失败,视频结束！" ;
                break;
            }

            frame.copyTo(frame);  // 对图片进行处理（这里只是复制）
            //写入并保存视频avi
            if (frame.channels() == 3) {
                    // 如果帧是彩色的，转换为灰度
                    Mat grayFrame;
                    cvtColor(frame, grayFrame, COLOR_BGR2GRAY); //灰度化
                    medianBlur(grayFrame, grayFrame, 5);//中值滤波

                    writer.write(grayFrame);
                } else {
                    // 如果帧已经是灰度的
                    medianBlur(frame, frame, 5);//中值滤波
                    writer.write(frame);
                }

            // 创建窗口并设置大小
            namedWindow("frame", WINDOW_AUTOSIZE);
            imshow("frame", frame); //原始视频

            cvtColor(frame, frame, COLOR_BGR2GRAY); //灰度化
            medianBlur(frame, frame, 5);//中值滤波
            //显示在Label上
            //capture >> frame;
            if(!frame.empty())
            {
                display_MatInQT(ui->label,frame);
            }

            // 等待按键或延迟时间后继续
            int c = waitKey(delay);
            if (c == 'q' || c == 27) {  // 'q'键或Esc键退出循环
                break;
            }
        }

        // 释放资源
        capture.release();
        writer.release();
        destroyAllWindows();
    }

}

//椒盐噪声
void MainWindow::on_pushButton_8_clicked()
{
    // 读取视频
    //VideoCapture capture("D:/新桌面/视频/cobe.mp4");
    VideoCapture capture;
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());

    if (!capture.isOpened()) {
        qDebug() << "无法打开视频文件" ;
        QMessageBox::information(this,tr("请先选择视频"),
                                 tr("请先选择视频！"));
    }
    else{
        long totalFrameNumber = capture.get(CAP_PROP_FRAME_COUNT);
        qDebug() << "整个视频共" << totalFrameNumber << "帧" ;

        // 获取帧率
        double rate = capture.get(CAP_PROP_FPS);
        qDebug() << "帧率为:" << rate ;

        int delay = static_cast<int>(1000 / rate);
        Mat frame;
        if (!capture.read(frame))
        {
            qDebug() << "读取视频帧失败" ;
        }
        qDebug() << "图片高height为:" << frame.rows;
        qDebug() << "图片宽width为:" << frame.cols;

        // 设置视频写入参数
        int isColor = 0;  //1是彩色,0是灰色
        int frameWidth = static_cast<int>(capture.get(CAP_PROP_FRAME_WIDTH));
        int frameHeight = static_cast<int>(capture.get(CAP_PROP_FRAME_HEIGHT));
        //发现mjpg编码不支持灰色,出现花屏
        //VideoWriter writer("output.avi", VideoWriter::fourcc('M', 'J', 'P', 'G'), rate, Size(frameWidth, frameHeight), isColor);  //其他常见的编解码器，如 XVID 或 DIVX
        VideoWriter writer("SaltAndPepper.avi", VideoWriter::fourcc('X', 'V', 'I', 'D'), rate, Size(frameWidth, frameHeight), isColor);

        // 读取和写入帧的循环
        while (true) {
            if (!capture.read(frame)) {
                qDebug() << "读取视频帧失败,视频结束！" ;
                break;
            }

            frame.copyTo(frame);  // 对图片进行处理（这里只是复制）
            //写入并保存视频avi
            if (frame.channels() == 3) {
                    // 如果帧是彩色的，转换为灰度
                    Mat grayFrame;
                    cvtColor(frame, grayFrame, COLOR_BGR2GRAY); //灰度化
                    // 添加椒盐噪声
                    double noiseProbability = 0.05; // 噪声概率，5% 的像素受到噪声影响，可以根据需要调整
                    addSaltAndPepperNoise(grayFrame, noiseProbability);

                    writer.write(grayFrame);
                } else {
                    // 如果帧已经是灰度的
                    double noiseProbability = 0.05; // 噪声概率，5% 的像素受到噪声影响，可以根据需要调整
                    addSaltAndPepperNoise(frame, noiseProbability);
                    writer.write(frame);
                }

            // 创建窗口并设置大小
            namedWindow("frame", WINDOW_AUTOSIZE);
            imshow("frame", frame); //原始视频

            cvtColor(frame, frame, COLOR_BGR2GRAY); //灰度化
            // 添加椒盐噪声
            double noiseProbability = 0.05; // 噪声概率，5% 的像素受到噪声影响，可以根据需要调整
            addSaltAndPepperNoise(frame, noiseProbability);
            //显示在Label上
            //capture >> frame;
            if(!frame.empty())
            {
                display_MatInQT(ui->label,frame);
            }

            // 等待按键或延迟时间后继续
            int c = waitKey(delay);
            if (c == 'q' || c == 27) {  // 'q'键或Esc键退出循环
                break;
            }
        }

        // 释放资源
        capture.release();
        writer.release();
        destroyAllWindows();
    }

}

// 添加白色或黑色椒盐噪声
void MainWindow::addSaltAndPepperNoise(cv::Mat& image, double probability) {
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




/***上者使用窗口界面cv::waitkey(delay)延迟读取下一帧，需要开启cv::imshow()***/
/***下者使用计时器QTimer，设置时间间隔timer->setInterval(1000/rate);发出信号来读取下一帧***/



/*
 * 转换原理
1.理解数据结构：Mat对象可以包含多通道的图像数据（如RGB、RGBA、灰度等），而QImage则通常使用RGB或ARGB格式存储像素数据。

2.通道顺序和颜色空间：OpenCV默认使用BGR颜色空间，而QImage使用RGB。因此，在转换过程中需要处理通道顺序的差异。

3.数据类型：Mat可以存储不同类型的数据（如CV_8UC3表示8位无符号整数的三通道图像），而QImage通常使用8位整数表示颜色分量。

4.步幅和行对齐：Mat的行数据可能是对齐的，即每行的字节数可能是4的倍数，而QImage则没有这样的要求。
*/
/*
QImage Mat2QImage(const cv::Mat &mat) {
    cv::Mat rgb;
    cv::cvtColor(mat, rgb, cv::COLOR_BGR2RGB); // 转换颜色空间从BGR到RGB
    QImage img((const unsigned char*)(rgb.data), rgb.cols, rgb.rows, rgb.cols*rgb.channels(), QImage::Format_RGB888);
    return img.copy(); // 返回QImage的深拷贝，避免内存问题
}
*/
/*
这里的QImage::Format_RGB888假设Mat对象是三通道的8位图像。
如果Mat是单通道灰度图，应该使用QImage::Format_Grayscale8。对于其他类型的Mat（如浮点数类型），需要先进行类型转换（如通过归一化到0-255范围并转换为8位整数）。
*/





//camera1


QImage Mat2QImage(cv::Mat cvImg)
{
    QImage qImg;
    if(cvImg.channels()==3)                             //3 channels color image
    {

        cv::cvtColor(cvImg,cvImg,COLOR_BGR2RGB);//default is BGR in opencv  转换颜色空间从BGR到RGB
        qImg =QImage((const unsigned char*)(cvImg.data),
                    cvImg.cols, cvImg.rows,
                    cvImg.cols*cvImg.channels(),//bytes per line(line stride)
                    QImage::Format_RGB888);
    }
    else if(cvImg.channels()==1)      //grayscale image  Format_Indexed8 8位的索引色  Format_Grayscale8 8位的灰度图
    {
        qImg =QImage((const unsigned char*)(cvImg.data),
                    cvImg.cols,cvImg.rows,
                    cvImg.cols*cvImg.channels(),
                    QImage::Format_Indexed8);
    }
    else
    {
        qImg =QImage((const unsigned char*)(cvImg.data),
                    cvImg.cols,cvImg.rows,
                    cvImg.cols*cvImg.channels(),
                    QImage::Format_RGB888);// format reference
    }

    return qImg;

}
void MainWindow::nextFrame()
{
    capture >> frame;
    if(!frame.empty())
    {
        image = Mat2QImage(frame);
        ui->label->setPixmap(QPixmap::fromImage(image));// convert QImage to QPixmap
    }
}
// open a file
void MainWindow::on_pushButton_open_clicked()
{
    if (capture.isOpened())
        capture.release();     //decide if capture is already opened; if so,close it
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());
    if (capture.isOpened())
    {
        //获取视频帧率和第一帧
        rate= capture.get(CAP_PROP_FPS);
        capture >> frame;
        if (!frame.empty())
        {

            image = Mat2QImage(frame);
            ui->label->setPixmap(QPixmap::fromImage(image));
            timer = new QTimer(this);
            timer->setInterval(1000/rate);   //set timer match with FPS  设置定时器的间隔  1秒等于1000毫秒
            connect(timer, SIGNAL(timeout()), this, SLOT(nextFrame()));//connect signal and slot
            timer->start();
        }
    }
}

void MainWindow::on_pushButton_process_clicked()
{
    cv::Mat cannyImg ;
    //cv::Canny(frame, cannyImg, 0, 30，3);
    cv::Canny(frame, cannyImg, 100, 200);
    cv::namedWindow("Canny");
    cv::imshow("Canny", cannyImg);//use cv::imshow to show the result
}

void MainWindow::on_pushButton_camera_clicked()
{
    QMessageBox:: StandardButton result =  QMessageBox::information(NULL, "Title", "World", QMessageBox::Yes | QMessageBox::No|QMessageBox::Abort, QMessageBox::Abort);
    switch (result)
    {
    case QMessageBox::Yes:
        std::cout<<"Yes";
        break;
    case QMessageBox::No:
        std::cout<<"NO";
        return;
        break;
    default:
        return;
        break;
    }
    if (capture.isOpened())
        capture.release();     //decide if capture is already opened; if so,close it
    capture.open(0);           //open the default camera
    if (capture.isOpened())
    {
        ui->pushButton_camera->setDisabled(true);
        //rate= capture.get(CAP_PROP_FPS);
        rate = 30;
        capture >> frame;
        if (!frame.empty())
        {

            image = Mat2QImage(frame);
            ui->label->setPixmap(QPixmap::fromImage(image));
            timer = new QTimer(this);
            timer->setInterval(1000/rate);   //set timer match with FPS
            connect(timer, SIGNAL(timeout()), this, SLOT(nextFrame()));
            timer->start();
        }
    }
}

void MainWindow::on_pushButton_close_clicked()
{
//    capture.
    capture.release();
    ui->pushButton_camera->setEnabled(true);
}

```

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include<opencv2/opencv.hpp>
using namespace std;
using namespace cv;
#include <QDebug>
#include <QLabel>

#include <stdio.h>
#include <time.h>
#include <QTimer>
#include <QFileDialog>
#include <QMessageBox>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void nextFrame();
    void on_pushButton_open_clicked();
    void on_pushButton_camera_clicked();
    void on_pushButton_process_clicked();
    void on_pushButton_close_clicked();

    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

    void on_pushButton_3_clicked();

    void on_pushButton_4_clicked();

    void on_pushButton_5_clicked();

    void on_pushButton_6_clicked();

    void on_pushButton_7_clicked();  //中值滤波
    void on_pushButton_8_clicked();  //椒盐噪声


private:
    void addSaltAndPepperNoise(cv::Mat& image, double probability);  //椒盐噪声

    QImage MatToQImage(const cv::Mat& mat);				// MAT类型 转 QImage类型
    void display_MatInQT(QLabel* label, cv::Mat mat);	// MAT对象 QT显示

    Mat TwoSide(Mat grayimage,int value); //二值化

    Mat grayGamma(Mat image); //伽马变换



private:
    Ui::MainWindow *ui;

    // CV 相关
    cv::Mat frame;
    cv::VideoCapture capture;
    QImage  image;
    QTimer *timer;
    double rate; //FPS
    cv::VideoWriter writer;   //make a video record
    cv::VideoWriter writer_canny;

};
#endif // MAINWINDOW_H

```

```cmake
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

CONFIG += c++11

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
    main.cpp \
    mainwindow.cpp

HEADERS += \
    mainwindow.h

FORMS += \
    mainwindow.ui

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

INCLUDEPATH +=D:\OpenCV-3.4.1\build\include  \
              D:\OpenCV-3.4.1\build\include  \
              D:\OpenCV-3.4.1\build\include\opencv2

CONFIG(debug, debug|release): {

        LIBS += D:\OpenCV-3.4.1\build\x64\mingw\lib\libopencv_*d.dll.a
        }

        else:CONFIG(release, debug|release): {

        LIBS += D:\OpenCV-3.4.1\build\x64\mingw\lib\libopencv_*.dll.a

        }

```



**运行结果：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725278621434-a63f4697-ed78-4fe9-bc71-aed73edfecb4.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725278670531-27b8cd4a-da78-433a-85a1-6e5b695d945b.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725278709304-ba6f91cd-b002-4b7f-b752-58db4df7377d.png)

... ...

### 4.第四个
**UI界面如下：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725278499612-7da28111-79a4-4824-8f36-c05da226387c.png)



```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QDebug>
#include <QFileDialog>
#include <QMessageBox>
#include <QTimer>
#include <QDateTime>

#include "grayscalevideosurface.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    //this->setFixedSize(1600,900); // 设置窗口的大小为1600x900像素
    this->setFixedSize(1600,1200);


    /*
        // 创建一个QMediaPlayer对象，指定视频输出类型为QMediaPlayer::VideoSurface
        mediaPlayer = new QMediaPlayer(this, QMediaPlayer::VideoSurface);
        // 创建一个QVideoWidget对象，它将用于显示视频内容
        QVideoWidget *videoWidget = new QVideoWidget(ui->frame_label);
        videowidget->resize(ui->frame_label->size());  // 调整视频窗口的大小以匹配ui->label的大小
        mediaPlayer->setVideoOutput(videoWidget);
        mediaPlayer->play();
    */

    //QAbstractVideoSurface类下有两个纯虚函数supportedPixelFormats()和present()，前者用于向Qt返回帧流的图像类型，后者可获取到每一帧

    // 1.从QMediaPlayer获取一个QVideoWidget对象，然后将其设置为QMediaPlayer的视频输出
    //QVideoWidget* videoWidget = new QVideoWidget;
    //player->setVideoOutput(videoWidget);
    // 2.创建一个继承自QAbstractVideoSurface的自定义类，并实现start(), stop()和present()等方法，以便我们可以在播放过程中捕获每一帧
/*
    QMediaPlayer *mediaPlayer = new QMediaPlayer;
    GrayscaleVideoSurface *videoSurface = new GrayscaleVideoSurface;
    mediaPlayer->setVideoOutput(videoSurface);
    //mediaPlayer->setMedia(QUrl("F:/Video/电影/其他/The.Pig.the.Snake.and.the.Pigeon.2023.1080p.NF.DDP5.1.H264-TZFILE.mkv"));
    //mediaPlayer->setMedia(QUrl::fromLocalFile(filepath));
    mediaPlayer->setMedia(QUrl(filepath));
    mediaPlayer->play();

    connect(videoSurface, SIGNAL(frameAvailable(QVideoFrame &)), this, SLOT(ProcessFrame(QVideoFrame &)));
*/


}

MainWindow::~MainWindow()
{
    delete ui;
}

// MainWindow类中的ProcessFrame函数，用于处理传入的视频帧
void MainWindow::ProcessFrame(QVideoFrame &frame)
{
    // 输出调试信息，表明正在处理帧
    qDebug() << "=============ProcessFrame===============";

    // 输出帧的宽度和高度
    qDebug() << "width : " << frame.width() << " height : " << frame.height();

    // 输出帧的开始时间（以毫秒为单位）
    qDebug() << "start time : " << frame.startTime()/1000 << "ms";

    // 输出帧的结束时间（以毫秒为单位）
    qDebug() << "end time : " << frame.endTime()/1000 << "ms";

    // 输出帧的像素格式
    qDebug() << "pixelFormat :" << frame.pixelFormat();

    // 将帧映射到可读模式，这样我们就可以访问它的数据了
    frame.map(QAbstractVideoBuffer::ReadOnly);

    // 从映射的帧数据中创建一个QImage对象，用于进一步处理或显示
    // 这里使用了帧的bits()指针、宽度、高度以及根据像素格式转换得到的图像格式
    QImage recvImage(frame.bits(), frame.width(), frame.height(), QVideoFrame::imageFormatFromPixelFormat(frame.pixelFormat()));

    // 输出映射后帧的数据大小（以字节为单位）
    qDebug() << "frame data size :" << frame.mappedBytes();

    // *************开始图像处理**************
    // 处理帧的逻辑
    currentFrame = frame; // 将帧存储在成员变量中

    // 将帧添加到帧容器中
    //cv::Mat cvImage = QImage2Mat(recvImage); // 将QImage转换为cv::Mat
    //cvImages.push_back(cvImage.clone()); // clone() 是必要的，因为Mat对象通常是按值传递的

#if 0
    // 生成文件名
    QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存图像到文件
    bool saveSuccess = recvImage.save(filename);  //QImage格式.save()
    qDebug() << "Image saved:" << saveSuccess;
#else

    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap = QPixmap::fromImage(recvImage);
    pixmap = pixmap.scaled(ui->frame_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel  原始视频播放
    ui->frame_label->setPixmap(pixmap);

    // 转灰度图
    recvImage = recvImage.convertToFormat(QImage::Format_Grayscale8);
    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap1 = QPixmap::fromImage(recvImage);
    pixmap1 = pixmap1.scaled(ui->frame_label_2->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel  灰度视频播放
    ui->frame_label_2->setPixmap(pixmap1);

    //  继续处理....

    // 生成文件名
    //QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存图像到文件 截图
    //bool saveSuccess = pixmap1.save(filename);  //QImage格式或QPixmap.save()
    //qDebug() << "Image saved:" << saveSuccess;

#endif
    // 解除帧的映射，释放资源
    frame.unmap();

}

// 暂停
void MainWindow::on_btn_pause_clicked()
{
    // 执行截图完成后的后续操作
    qDebug() << "Screenshot grab finished!";
    // 根据媒体播放器的当前状态决定是播放还是暂停
    switch (mediaPlayer->state()) {
    case QMediaPlayer::PlayingState:
        // 如果媒体播放器当前处于播放状态，则暂停播放
        mediaPlayer->pause();
        break;
    default:
        // 如果媒体播放器不在播放状态，则开始播放
        mediaPlayer->play();
        break;
    }
}

// 打开视频
void MainWindow::on_btn_open_clicked()
{
/*
    // 检查媒体播放器是否处于播放状态，如果是则停止
    if (mediaPlayer && mediaPlayer->state() != QMediaPlayer::StoppedState) {
        mediaPlayer->stop();
    }
*/

    // 选择一个视频文件，文件类型过滤器为mp4、mp3、mkv和avi
    //QString filepath = QFileDialog::getOpenFileName(this,"提示","F:/Video/电影","mp4(*.mp4 *.mkv *.avi);;mp3(*.mp3)");
    QString filepath = QFileDialog::getOpenFileName(this,"请选择一个视频","F:/Video/电影","All Files (*)");

    if (!filepath.isEmpty()) {
        // 用户选择了文件，你可以在这里处理文件路径
        qDebug() << "用户选择的文件路径是:" << filepath;

        // ... 在这里处理文件 ...
        mediaPlayer = new QMediaPlayer;
        GrayscaleVideoSurface *videoSurface = new GrayscaleVideoSurface;
        mediaPlayer->setVideoOutput(videoSurface);
        //mediaPlayer->setMedia(QUrl("F:/Video/电影/其他/The.Pig.the.Snake.and.the.Pigeon.2023.1080p.NF.DDP5.1.H264-TZFILE.mkv"));
        //mediaPlayer->setMedia(QUrl::fromLocalFile(filepath));
        mediaPlayer->setMedia(QUrl(filepath));
        mediaPlayer->play();   //多个路径视频重叠会闪烁


        connect(videoSurface, SIGNAL(frameAvailable(QVideoFrame &)), this, SLOT(ProcessFrame(QVideoFrame &)));

    }
}


// 截图 当前原始彩色帧
void MainWindow::on_btn_grab_clicked()
{  
    ui->curr_label->clear();

    // 将帧映射到可读模式，这样我们就可以访问它的数据了
    currentFrame.map(QAbstractVideoBuffer::ReadOnly);

    // 从映射的帧数据中创建一个QImage对象，用于进一步处理或显示
    // 这里使用了帧的bits()指针、宽度、高度以及根据像素格式转换得到的图像格式
    QImage recvImage(currentFrame.bits(), currentFrame.width(), currentFrame.height(), QVideoFrame::imageFormatFromPixelFormat(currentFrame.pixelFormat()));

    // 输出映射后帧的数据大小（以字节为单位）
    qDebug() << "frame data size :" << currentFrame.mappedBytes();

    // *************开始图像处理**************

    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap = QPixmap::fromImage(recvImage);
    pixmap = pixmap.scaled(ui->curr_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel
    ui->curr_label->setPixmap(pixmap);

    // 生成文件名
    QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存当前帧图像到文件
    bool saveSuccess = pixmap.save(filename);  //QImage格式或QPixmap.save()
    qDebug() << "Image saved:" << saveSuccess;

    // 解除帧的映射，释放资源
    currentFrame.unmap();

}

// 截图 当前帧灰度处理
void MainWindow::on_btn_gray_clicked()
{
    ui->curr_label->clear();

    /*
        // 使用迭代器逐个访问帧
        for (auto it = cvImages.begin(); it != cvImages.end(); ++it) {
            cv::Mat frame = *it; // 通过迭代器访问帧
            // 在这里处理帧，例如转换为灰度图像
            cv::Mat grayFrame;
            cv::cvtColor(frame, grayFrame, cv::COLOR_BGR2GRAY);

            // ... 其他处理 ...
            // 将结果转换回QImage
            QImage qImage = Mat2QImage(grayFrame);
            // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
            QPixmap pixmap = QPixmap::fromImage(qImage);
            pixmap = pixmap.scaled(ui->curr_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
            // 显示图像到QLabel
            ui->curr_label->setPixmap(pixmap);

            // 生成文件名
            QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
            // 保存当前帧图像到文件
            //bool saveSuccess = pixmap.save(filename);  //QImage格式或QPixmap.save()
            //qDebug() << "Image saved:" << saveSuccess;
        }
    */

    // 将帧映射到可读模式，这样我们就可以访问它的数据了
    currentFrame.map(QAbstractVideoBuffer::ReadOnly);

    // 从映射的帧数据中创建一个QImage对象，用于进一步处理或显示
    // 这里使用了帧的bits()指针、宽度、高度以及根据像素格式转换得到的图像格式
    QImage recvImage(currentFrame.bits(), currentFrame.width(), currentFrame.height(), QVideoFrame::imageFormatFromPixelFormat(currentFrame.pixelFormat()));

    // 输出映射后帧的数据大小（以字节为单位）
    qDebug() << "frame data size :" << currentFrame.mappedBytes();

    // *************开始图像处理**************
    // 转灰度图
    recvImage = recvImage.convertToFormat(QImage::Format_Grayscale8);
    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap = QPixmap::fromImage(recvImage);
    pixmap = pixmap.scaled(ui->curr_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel
    ui->curr_label->setPixmap(pixmap);

    // 生成文件名
    QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存当前帧图像到文件
    bool saveSuccess = pixmap.save(filename);  //QImage格式或QPixmap.save()
    qDebug() << "Image saved:" << saveSuccess;

    // 解除帧的映射，释放资源
    currentFrame.unmap();

}


// 截图 当前帧canny边缘检测
void MainWindow::on_btn_canny_clicked()
{
    ui->curr_label->clear();

    // 将帧映射到可读模式，这样我们就可以访问它的数据了
    currentFrame.map(QAbstractVideoBuffer::ReadOnly);

    // 从映射的帧数据中创建一个QImage对象，用于进一步处理或显示
    // 这里使用了帧的bits()指针、宽度、高度以及根据像素格式转换得到的图像格式
    QImage recvImage(currentFrame.bits(), currentFrame.width(), currentFrame.height(), QVideoFrame::imageFormatFromPixelFormat(currentFrame.pixelFormat()));

    // 输出映射后帧的数据大小（以字节为单位）
    qDebug() << "frame data size :" << currentFrame.mappedBytes();

    // *************开始图像处理**************

    cv::Mat cvImage = QImage2Mat(recvImage); // 将QImage转换为cv::Mat

    // 转换为灰度图像，因为Canny边缘检测通常在灰度图像上执行
    cv::Mat grayImage, canny_edges;
    cvtColor(cvImage, grayImage, cv::COLOR_BGR2GRAY);

    // 执行Canny边缘检测
    double lowThreshold = 100;
    double highThreshold = 200;
    // 获取滑块的值作为 Canny 算法的阈值
    cv::Canny(grayImage, canny_edges, lowThreshold, highThreshold);

    // 将结果转换回QImage
    QImage qImage = Mat2QImage(canny_edges);

    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap = QPixmap::fromImage(qImage);
    pixmap = pixmap.scaled(ui->curr_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel
    ui->curr_label->setPixmap(pixmap);

    // 生成文件名
    QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存当前帧图像到文件
    bool saveSuccess = pixmap.save(filename);  //QImage格式或QPixmap.save()
    qDebug() << "Image saved:" << saveSuccess;

    // 解除帧的映射，释放资源
    currentFrame.unmap();
}


// 中值滤波
void MainWindow::on_btn_median_clicked()
{
    ui->curr_label->clear();

    // 将帧映射到可读模式，这样我们就可以访问它的数据了
    currentFrame.map(QAbstractVideoBuffer::ReadOnly);

    // 从映射的帧数据中创建一个QImage对象，用于进一步处理或显示
    // 这里使用了帧的bits()指针、宽度、高度以及根据像素格式转换得到的图像格式
    QImage recvImage(currentFrame.bits(), currentFrame.width(), currentFrame.height(), QVideoFrame::imageFormatFromPixelFormat(currentFrame.pixelFormat()));

    // 输出映射后帧的数据大小（以字节为单位）
    qDebug() << "frame data size :" << currentFrame.mappedBytes();

    // *************开始图像处理**************

    cv::Mat cvImage = QImage2Mat(recvImage); // 将QImage转换为cv::Mat

    // 转换为灰度图像
    cv::Mat grayImage, canny_edges;
    cvtColor(cvImage, grayImage, cv::COLOR_BGR2GRAY);

    // 中值滤波
    Mat medianFilteredImage;
    medianBlur(grayImage, medianFilteredImage, 5);

    // 将结果转换回QImage
    QImage qImage = Mat2QImage(medianFilteredImage);

    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap = QPixmap::fromImage(qImage);
    pixmap = pixmap.scaled(ui->curr_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel
    ui->curr_label->setPixmap(pixmap);

    // 生成文件名
    QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存当前帧图像到文件
    bool saveSuccess = pixmap.save(filename);  //QImage格式或QPixmap.save()
    qDebug() << "Image saved:" << saveSuccess;

    // 解除帧的映射，释放资源
    currentFrame.unmap();
}

//椒盐噪声
void MainWindow::on_btn_saltandpepper_clicked()
{
    ui->curr_label->clear();

    // 将帧映射到可读模式，这样我们就可以访问它的数据了
    currentFrame.map(QAbstractVideoBuffer::ReadOnly);

    // 从映射的帧数据中创建一个QImage对象，用于进一步处理或显示
    // 这里使用了帧的bits()指针、宽度、高度以及根据像素格式转换得到的图像格式
    QImage recvImage(currentFrame.bits(), currentFrame.width(), currentFrame.height(), QVideoFrame::imageFormatFromPixelFormat(currentFrame.pixelFormat()));

    // 输出映射后帧的数据大小（以字节为单位）
    qDebug() << "frame data size :" << currentFrame.mappedBytes();

    // *************开始图像处理**************

    cv::Mat cvImage = QImage2Mat(recvImage); // 将QImage转换为cv::Mat

    // 转换为灰度图像
    cv::Mat grayImage, canny_edges;
    cvtColor(cvImage, grayImage, cv::COLOR_BGR2GRAY);

    // 添加椒盐噪声
    double noiseProbability = 0.05; // 噪声概率，5% 的像素受到噪声影响，可以根据需要调整
    addSaltAndPepperNoise(grayImage, noiseProbability);

    // 将结果转换回QImage
    QImage qImage = Mat2QImage(grayImage);

    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap = QPixmap::fromImage(qImage);
    pixmap = pixmap.scaled(ui->curr_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel
    ui->curr_label->setPixmap(pixmap);

    // 生成文件名
    QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存当前帧图像到文件
    bool saveSuccess = pixmap.save(filename);  //QImage格式或QPixmap.save()
    qDebug() << "Image saved:" << saveSuccess;

    // 解除帧的映射，释放资源
    currentFrame.unmap();
}

// 添加白色或黑色椒盐噪声
void MainWindow::addSaltAndPepperNoise(cv::Mat& image, double probability) {
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


// 伽马变换
void MainWindow::on_btn_gamma_clicked()
{
    ui->curr_label->clear();

    // 将帧映射到可读模式，这样我们就可以访问它的数据了
    currentFrame.map(QAbstractVideoBuffer::ReadOnly);

    // 从映射的帧数据中创建一个QImage对象，用于进一步处理或显示
    // 这里使用了帧的bits()指针、宽度、高度以及根据像素格式转换得到的图像格式
    QImage recvImage(currentFrame.bits(), currentFrame.width(), currentFrame.height(), QVideoFrame::imageFormatFromPixelFormat(currentFrame.pixelFormat()));

    // 输出映射后帧的数据大小（以字节为单位）
    qDebug() << "frame data size :" << currentFrame.mappedBytes();

    // *************开始图像处理**************

    cv::Mat cvImage = QImage2Mat(recvImage); // 将QImage转换为cv::Mat

    // 伽马变换
    cvImage = grayGamma(cvImage);

    // 将结果转换回QImage
    QImage qImage = Mat2QImage(cvImage);

    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap = QPixmap::fromImage(qImage);
    pixmap = pixmap.scaled(ui->curr_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel
    ui->curr_label->setPixmap(pixmap);

    // 生成文件名
    QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存当前帧图像到文件
    bool saveSuccess = pixmap.save(filename);  //QImage格式或QPixmap.save()
    qDebug() << "Image saved:" << saveSuccess;

    // 解除帧的映射，释放资源
    currentFrame.unmap();
}

Mat MainWindow::grayGamma(Mat image)
{
    if (image.data)
    {
        Mat output_image, image1_gray;   //定义输入图像，输出图像，灰度图像
        cvtColor(image, image1_gray, COLOR_BGR2GRAY);  //灰度化

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
        return output_image;
    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }
}


// 二值化
void MainWindow::on_btn_two_clicked()
{
    ui->curr_label->clear();

    // 将帧映射到可读模式，这样我们就可以访问它的数据了
    currentFrame.map(QAbstractVideoBuffer::ReadOnly);

    // 从映射的帧数据中创建一个QImage对象，用于进一步处理或显示
    // 这里使用了帧的bits()指针、宽度、高度以及根据像素格式转换得到的图像格式
    QImage recvImage(currentFrame.bits(), currentFrame.width(), currentFrame.height(), QVideoFrame::imageFormatFromPixelFormat(currentFrame.pixelFormat()));

    // 输出映射后帧的数据大小（以字节为单位）
    qDebug() << "frame data size :" << currentFrame.mappedBytes();

    // *************开始图像处理**************

    cv::Mat cvImage = QImage2Mat(recvImage); // 将QImage转换为cv::Mat

    // 转换为灰度图像
    cv::Mat grayImage;
    cvtColor(cvImage, grayImage, cv::COLOR_BGR2GRAY);

    // 使用THRESH_BINARY_INV二值化类型，将大于阈值的像素设置为0（黑色），小于阈值的像素设置为255（白色）
    Mat binaryImage;
    int value = 127;
    threshold(grayImage, binaryImage, value, 255, THRESH_BINARY_INV);

    // 将结果转换回QImage
    QImage qImage = Mat2QImage(binaryImage);

    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap = QPixmap::fromImage(qImage);
    pixmap = pixmap.scaled(ui->curr_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel
    ui->curr_label->setPixmap(pixmap);

    // 生成文件名
    QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存当前帧图像到文件
    bool saveSuccess = pixmap.save(filename);  //QImage格式或QPixmap.save()
    qDebug() << "Image saved:" << saveSuccess;

    // 解除帧的映射，释放资源
    currentFrame.unmap();
}


// OTSU阈值分割
void MainWindow::on_btn_otsu_clicked()
{
    ui->curr_label->clear();

    // 将帧映射到可读模式，这样我们就可以访问它的数据了
    currentFrame.map(QAbstractVideoBuffer::ReadOnly);

    // 从映射的帧数据中创建一个QImage对象，用于进一步处理或显示
    // 这里使用了帧的bits()指针、宽度、高度以及根据像素格式转换得到的图像格式
    QImage recvImage(currentFrame.bits(), currentFrame.width(), currentFrame.height(), QVideoFrame::imageFormatFromPixelFormat(currentFrame.pixelFormat()));

    // 输出映射后帧的数据大小（以字节为单位）
    qDebug() << "frame data size :" << currentFrame.mappedBytes();

    // *************开始图像处理**************

    cv::Mat cvImage = QImage2Mat(recvImage); // 将QImage转换为cv::Mat

    // 转换为灰度图像
    cv::Mat grayImage, canny_edges;
    cvtColor(cvImage, grayImage, cv::COLOR_BGR2GRAY);

    //OTSU阈值分割
    threshold(grayImage, grayImage, 0, 255, THRESH_BINARY | THRESH_OTSU);

    // 将结果转换回QImage
    QImage qImage = Mat2QImage(grayImage);

    // 将QImage转换为QPixmap，因为QLabel通常显示QPixmap
    QPixmap pixmap = QPixmap::fromImage(qImage);
    pixmap = pixmap.scaled(ui->curr_label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation);
    // 显示图像到QLabel
    ui->curr_label->setPixmap(pixmap);

    // 生成文件名
    QString filename = "./grab_img/" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";
    // 保存当前帧图像到文件
    bool saveSuccess = pixmap.save(filename);  //QImage格式或QPixmap.save()
    qDebug() << "Image saved:" << saveSuccess;

    // 解除帧的映射，释放资源
    currentFrame.unmap();
}


// 将 QImage 转换为 cv::Mat
cv::Mat MainWindow::QImage2Mat(const QImage &image)
{
    cv::Mat mat;

    // 检查QImage是否为空
    if (image.isNull())
        return mat;

    // 确定QImage的图像格式
    switch (image.format())
    {
    case QImage::Format_RGB32:
    case QImage::Format_ARGB32:
        mat = cv::Mat(image.height(), image.width(), CV_8UC4, (void*)image.constBits(), image.bytesPerLine());
        break;
    case QImage::Format_RGB888:
        mat = cv::Mat(image.height(), image.width(), CV_8UC3, (void*)image.constBits(), image.bytesPerLine());
        cv::cvtColor(mat, mat, cv::COLOR_BGR2RGB); // OpenCV默认使用BGR格式，而QImage使用RGB格式
        break;
    case QImage::Format_Grayscale8:
        mat = cv::Mat(image.height(), image.width(), CV_8UC1, (void*)image.constBits(), image.bytesPerLine());
        break;
    default:
        qWarning("QImage2Mat: Unsupported QImage format");
        return mat;
    }

    return mat;
}

// 将 cv::Mat 转换为 QImage
QImage MainWindow::Mat2QImage(const cv::Mat &cvImg)
{
    QImage qImg;
    if (cvImg.channels() == 3) // 3通道彩色图像
    {
        cv::cvtColor(cvImg, cvImg, cv::COLOR_BGR2RGB); // OpenCV默认使用BGR格式
        qImg = QImage((const unsigned char*)(cvImg.data),
                      cvImg.cols, cvImg.rows,
                      cvImg.cols * cvImg.channels(),
                      QImage::Format_RGB888);
    }
    else if (cvImg.channels() == 1) // 灰度图像
    {
        qImg = QImage((const unsigned char*)(cvImg.data),
                      cvImg.cols, cvImg.rows,
                      cvImg.cols * cvImg.channels(),
                      QImage::Format_Grayscale8);
    }
    else
    {
        // 处理其他情况，如4通道图像等
        qImg = QImage((const unsigned char*)(cvImg.data),
                      cvImg.cols, cvImg.rows,
                      cvImg.cols * cvImg.channels(),
                      QImage::Format_RGB888);
    }

    return qImg;
}

```

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

#include <QMediaPlayer> //播放器
#include <QMediaPlaylist> //播放列表
#include <QVideoWidget> //电影幕布
#include <QVideoFrame>

#include <opencv2/opencv.hpp>
using namespace cv;
#include "grayscalevideosurface.h"

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

    QMediaPlayer *player;
    QMediaPlaylist *playlist;
    QVideoWidget *videowidget;

    //QMediaPlayer *mediaPlayer;
    //QString filepath;
    QImage recvImage;

    QString label1;
    QString label2;

private slots:
    void on_btn_open_clicked(); //导入视频


    void ProcessFrame(QVideoFrame &frame); // 视频帧处理


    void on_btn_gray_clicked();


    void on_btn_canny_clicked();

    void on_btn_pause_clicked();

    void on_btn_grab_clicked();


    void on_btn_median_clicked();
    void on_btn_saltandpepper_clicked();
    void on_btn_gamma_clicked();
    void on_btn_two_clicked();
    void on_btn_otsu_clicked();

private:
    void addSaltAndPepperNoise(cv::Mat& image, double probability); //添加白色或黑色椒盐噪声

    Mat grayGamma(Mat image);
    QImage Mat2QImage(const cv::Mat &cvImg);
    cv::Mat QImage2Mat(const QImage &image);

signals:


private:
    Ui::MainWindow *ui;

    QVideoFrame currentFrame; // 存储当前帧
    QMediaPlayer* mediaPlayer; // 定义媒体播放器
    GrayscaleVideoSurface *videoSurface;
    //std::vector<cv::Mat> cvImages; // 存储帧的容器

};
#endif // MAINWINDOW_H

```

```cpp
#include "grayscalevideosurface.h"

#include <QImage>
#include <QDebug>


GrayscaleVideoSurface::GrayscaleVideoSurface(QObject *parent)
    : QAbstractVideoSurface(parent)
{
}

GrayscaleVideoSurface::~GrayscaleVideoSurface()
{
}

QList<QVideoFrame::PixelFormat> GrayscaleVideoSurface::supportedPixelFormats(QAbstractVideoBuffer::HandleType handleType) const
{
    QList<QVideoFrame::PixelFormat> listPixelFormats;

    listPixelFormats << QVideoFrame::Format_ARGB32
        << QVideoFrame::Format_ARGB32_Premultiplied
        << QVideoFrame::Format_RGB32
        << QVideoFrame::Format_RGB24
        << QVideoFrame::Format_RGB565
        << QVideoFrame::Format_RGB555
        << QVideoFrame::Format_ARGB8565_Premultiplied
        << QVideoFrame::Format_BGRA32
        << QVideoFrame::Format_BGRA32_Premultiplied
        << QVideoFrame::Format_BGR32
        << QVideoFrame::Format_BGR24
        << QVideoFrame::Format_BGR565
        << QVideoFrame::Format_BGR555
        << QVideoFrame::Format_BGRA5658_Premultiplied
        << QVideoFrame::Format_AYUV444
        << QVideoFrame::Format_AYUV444_Premultiplied
        << QVideoFrame::Format_YUV444
        << QVideoFrame::Format_YUV420P
        << QVideoFrame::Format_YV12
        << QVideoFrame::Format_UYVY
        << QVideoFrame::Format_YUYV
        << QVideoFrame::Format_NV12
        << QVideoFrame::Format_NV21
        << QVideoFrame::Format_IMC1
        << QVideoFrame::Format_IMC2
        << QVideoFrame::Format_IMC3
        << QVideoFrame::Format_IMC4
        << QVideoFrame::Format_Y8
        << QVideoFrame::Format_Y16
        << QVideoFrame::Format_Jpeg
        << QVideoFrame::Format_CameraRaw
        << QVideoFrame::Format_AdobeDng;

    //qDebug() << listPixelFormats;

    // Return the formats you will support
    return listPixelFormats;
}

bool GrayscaleVideoSurface::present(const QVideoFrame &frame)
{
    // 检查传入的帧是否有效
    if (frame.isValid())
    {
        // 创建一个帧的副本，这样我们可以在不修改原始帧的情况下处理它
        QVideoFrame cloneFrame(frame);

        // 发射一个信号，通知其他部分（如观察者或监听器）有新的帧可用
        // 这允许其他部分的代码在帧到达时执行相应的操作，例如处理或显示帧
        emit frameAvailable(cloneFrame);

        // 如果帧有效，函数返回true，表示处理成功
        return true;
    }

    stop();
    // 如果帧无效，函数返回false，表示处理失败
    return false;
}


//重写stop函数，当停止接收视频流时调用  stop()方法用于在播放停止时进行清理
void GrayscaleVideoSurface::stop()
{
    QAbstractVideoSurface::stop();
    emit framestop();
}


//这些虚函数，会自动被调用，start检测图像是否可以对等转换，每一帧有没有
bool GrayscaleVideoSurface::start(const QVideoSurfaceFormat &videoformat)
{
    QAbstractVideoSurface::start(videoformat);
    return false;
}






/*
#include <QVideoFrame>
#include <QImage>
#include <QDateTime>
#include <QDebug>
#include <QAbstractVideoBuffer>

// 截图
bool GrayscaleVideoSurface::present(const QVideoFrame &frame) {
    if (!frame.isValid()) {
        qDebug() << "Invalid frame";
        return false;
    }
    QVideoFrame cloneFrame(frame);
    // 映射帧数据以便读取
    if (!cloneFrame.map(QAbstractVideoBuffer::ReadOnly)) {
        qDebug() << "Failed to map frame";
        return false;
    }

    // 创建一个QImage对象来保存帧数据
    QImage img((const uchar*)cloneFrame.bits(), cloneFrame.width(), cloneFrame.height(),
               cloneFrame.bytesPerLine(), QVideoFrame::imageFormatFromPixelFormat(cloneFrame.pixelFormat()));

    // 生成文件名
    QString filename = "./" + QDateTime::currentDateTime().toString("yyyy-MM-dd hh-mm-ss-zzz") + ".jpg";

    // 保存图像到文件
    bool saveSuccess = img.save(filename);
    qDebug() << "Image saved:" << saveSuccess;

    // 解除帧的映射
    cloneFrame.unmap();

    // 发出信号或执行其他后续操作
    emit finishGrab(); // 假设你有一个名为finishGrab的信号 不然会一直截图

    return saveSuccess;
}
*/

```

```cpp
#ifndef GRAYSCALEVIDEOSURFACE_H
#define GRAYSCALEVIDEOSURFACE_H


#include <QAbstractVideoSurface>  // 引入QAbstractVideoSurface头文件
#include <QVideoFrame>
#include <QLabel>

// 定义GrayscaleVideoSurface类，继承自QAbstractVideoSurface
class GrayscaleVideoSurface : public QAbstractVideoSurface {
    Q_OBJECT  // 使用Q_OBJECT宏，以便使用Qt的信号和槽机制

public:
    // 构造函数，可以接收一个QObject指针作为父对象
    GrayscaleVideoSurface(QObject* parent = nullptr);
    // 析构函数
    ~GrayscaleVideoSurface();

    // 重写supportedPixelFormats函数，返回支持的像素格式列表
    QList<QVideoFrame::PixelFormat> supportedPixelFormats(
        QAbstractVideoBuffer::HandleType handleType) const override;

    // 重写start函数，当开始接收视频流时调用   start()方法中，我们可以获得视频格式的详细信息，例如分辨率和像素格式等
    bool start(const QVideoSurfaceFormat& format) override;

    // 重写stop函数，当停止接收视频流时调用  stop()方法用于在播放停止时进行清理
    void stop() override;

    // 重写present函数，当新的视频帧到达时调用  present()方法为每一帧调用，我们可以在此拿到QVideoFrame对象
    bool present(const QVideoFrame& frame) override;

signals:

    void frameAvailable(QVideoFrame &frame);
    void finishGrab(); //截图  假设你有一个名为finishGrab的信号

    void framestop();

private:


};

#endif // GRAYSCALEVIDEOSURFACE_H

```

```cmake
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

CONFIG += c++11

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

QT +=multimedia
QT +=multimediawidgets

SOURCES += \
    grayscalevideosurface.cpp \
    main.cpp \
    mainwindow.cpp

HEADERS += \
    grayscalevideosurface.h \
    mainwindow.h

FORMS += \
    mainwindow.ui

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target


INCLUDEPATH +=D:\OpenCV-3.4.1\build\include  \
              D:\OpenCV-3.4.1\build\include  \
              D:\OpenCV-3.4.1\build\include\opencv2

CONFIG(debug, debug|release): {

        LIBS += D:\OpenCV-3.4.1\build\x64\mingw\lib\libopencv_*d.dll.a
        }

        else:CONFIG(release, debug|release): {

        LIBS += D:\OpenCV-3.4.1\build\x64\mingw\lib\libopencv_*.dll.a

        }

```



**运行结果：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725278378047-32ab4063-80e8-4001-810e-7f1915bc8be9.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725278425079-36c18d41-e6b6-4155-a654-8bb23150c216.png)

## 二、自定义视频播放器
**UI界面如下：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725279287521-a66ae75a-9363-45a8-bd7d-519e6d073eca.png)



```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QFileDialog>
#include <QMessageBox>

#include <QTimer>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
#if 0
    // 创建媒体播放器和播放列表
    player = new QMediaPlayer(this);
    playlist = new QMediaPlaylist(this);
    player->setPlaylist(playlist);

    // 创建视频显示窗口部件
    videowidget = new QVideoWidget(ui->label);
    videowidget->resize(ui->label->size());

    // 设置视频输出和显示视频窗口
    player->setVideoOutput(videowidget);
    videowidget->show();

    // 设置要播放的媒体并播放   从一个本地文件路径创建一个QUrl对象
    //player->setMedia(QUrl::fromLocalFile("F:/Video/电影/其他/The.Pig.the.Snake.and.the.Pigeon.2023.1080p.NF.DDP5.1.H264-TZFILE.mkv"));
    // 在播放列表playlist添加一个视频
    playlist->addMedia(QUrl::fromLocalFile("D:/新桌面/视频/cobe.mp4"));
    // 添加第二个视频 ...
    playlist->addMedia(QUrl::fromLocalFile("F:/Video/电影/其他/The.Pig.the.Snake.and.the.Pigeon.2023.1080p.NF.DDP5.1.H264-TZFILE.mkv"));
    // 播放第二个视频
    playlist->setCurrentIndex(1);
    player->play();
#else
    this->setFixedSize(1680,900); // 设置窗口的大小为1680x900像素

    player = new QMediaPlayer(this); // 创建一个QMediaPlayer对象，它用于播放媒体文件
    playlist = new QMediaPlaylist(this); // 创建一个QMediaPlaylist对象，它用于管理播放列表

    videowidget = new QVideoWidget(ui->label); // 创建一个QVideoWidget对象，用于显示视频
    videowidget->resize(ui->label->size());  // 调整视频窗口的大小以匹配ui->label的大小

    player->setPlaylist(playlist); // 将播放列表设置给播放器
    player->setVideoOutput(videowidget); // 将视频输出设置到之前创建的QVideoWidget对象

    // 初始化表格控件的列数，这里只设置了一列
    ui->tablewidget_videolist->setColumnCount(1);  //初始化第一列不然输不出值
    // 设置播放速度的组合框当前文本为"1.0x"
    ui->combox_playspeed->setCurrentText("1.0x");
    // 设置表格控件的编辑触发器为NoEditTriggers，意味着表格项不可编辑
    ui->tablewidget_videolist->setEditTriggers(QTableWidget::NoEditTriggers);
    // 设置播放列表的播放模式为当前项目循环播放
    playlist->setPlaybackMode(QMediaPlaylist::CurrentItemInLoop);

    // 设置第一列的宽度为...像素
    ui->tablewidget_videolist->setColumnWidth(0, 320);
    // 根据内容自动调整所有列的宽度
    //ui->tablewidget_videolist->resizeColumnsToContents();
    // 设置第一行的高度为...像素
    //ui->tablewidget_videolist->setRowHeight(0, 50);
    // 根据内容自动调整所有行的高度
    //ui->tablewidget_videolist->resizeRowsToContents();

    // 创建一个QTimer对象，通常用于定时任务
    tct1 = new QTimer(this);

    // 进度条总时间与当前位置时间
    connect(player, &QMediaPlayer::durationChanged, this, &MainWindow::duration_change);
    connect(player, &QMediaPlayer::positionChanged, this, &MainWindow::position_change);

    // 双击播放列表播放
    connect(ui->tablewidget_videolist, &QTableWidget::doubleClicked, this, &MainWindow::double_click_play);
    // 切换播放列表的时候加一个play防止视频虫丰住
    connect(playlist, &QMediaPlaylist::mediaChanged, player, &QMediaPlayer::play);

#endif
}

MainWindow::~MainWindow()
{
    delete ui;
}

// 导入视频
void MainWindow::on_btn_open_clicked()
{
    qDebug() << "音视频计数" << playlist->mediaCount(); // 打印播放列表中的媒体数量
    qDebug() << "table计数，前" << ui->tablewidget_videolist->rowCount(); // 打印表格控件当前行数
    // 选择一个视频文件，文件类型过滤器为mp4、mp3、mkv和avi
    //QString filepath = QFileDialog::getOpenFileName(this,"提示","F:/Video/电影","mp4(*.mp4 *.mkv *.avi);;mp3(*.mp3)");
    QString filepath = QFileDialog::getOpenFileName(this,"提示","F:/Video/电影","All Files (*)");
    if(filepath.isEmpty()){
        return;
    }

    QFileInfo fileInfos(filepath); // 获取文件名称信息
    ui->labelCurrentMdia->setText(fileInfos.fileName());

    for(int i=0;i<ui->tablewidget_videolist->rowCount(); i++)
    {
        // 如果表格控件中某行的第一个单元格（索引为0）的文本与选择的文件名称相同
        if(ui->tablewidget_videolist->item(i,0)->text() == fileInfos.fileName())
        {
            qDebug() << ui->tablewidget_videolist->item(i,0)->text();  // 打印出已经存在的文件路径
            int ret = QMessageBox::warning(this, "提示","已存在相同音视频"); // 显示一个警告消息框
            return;
        }
    }
    // 如果文件不存在于表格中，增加表格控件的行数
    ui->tablewidget_videolist->setRowCount(ui->tablewidget_videolist->rowCount()+1);
    // 创建一个新的QTableWidgetItem，并将文件名称作为其内容
    //QTableWidgetItem *item = new QTableWidgetItem(filepath);
    QTableWidgetItem *item = new QTableWidgetItem(fileInfos.fileName());
    qDebug() << ui->tablewidget_videolist->rowCount()-1;  // 打印出表格控件当前的行数（用于调试）
    // 将新创建的item设置到表格控件最后一行的第一个单元格中
    ui->tablewidget_videolist->setItem(ui->tablewidget_videolist->rowCount()-1,0,item);

    playlist->addMedia(QUrl(filepath)); // 将选择的文件路径添加到播放列表（playlist）中
    player->setVolume(50);  // 设置播放器的音量为50%

    // 将视频进度滑块（slider_video）的值设置为0，即从头开始播放
    ui->slider_video->setValue(0);
    // 将音量滑块（slider_volume）的值设置为50，即中等音量
    ui->slider_volume->setValue(50);
}

// 测试
void MainWindow::on_btn_test_clicked()
{
    qDebug() << "currentcol:" << ui->tablewidget_videolist->currentColumn();
    qDebug() << "currentrow:" << ui->tablewidget_videolist->currentRow();
    qDebug() << "rowcount:" << ui->tablewidget_videolist->rowCount();
    qDebug() << "mediacount:" << playlist->mediaCount() << "currentmediacount:" << playlist->currentIndex();
    qDebug() << playlist->playbackMode();
}

// 双击列表播放
void MainWindow::double_click_play()
{
    // 检查tablewidget_videolist表格控件中是否有当前选中的项
    if(ui->tablewidget_videolist->currentItem() == NULL)
    {
        return;
    }
    // 如果有选中的项，则获取当前选中项的行号（currentRow()），并将播放列表（playlist）的当前索引设置为这一行号对应的视频
    playlist->setCurrentIndex(ui->tablewidget_videolist->currentRow());
    player->play();

    ui->labelCurrentMdia->clear();
}


/*****************简易版测试**********************/

// 音量调节
void MainWindow::on_slider_volume_valueChanged(int value)
{
    player->setVolume(value);
}

// 倍速调节
void MainWindow::on_combox_playspeed_currentTextChanged(const QString &arg1)
{
    if(arg1 == "2.0x")
    {
        player->setPlaybackRate(2.0);
    }
    else if(arg1 == "1.5x")
    {
        player->setPlaybackRate(1.5);
    }
    else if(arg1 == "1.0x")
    {
        player->setPlaybackRate(1.0);
    }
    else if(arg1 == "0.5x")
    {
        player->setPlaybackRate(0.5);
    }
}

// 播放模式
void MainWindow::on_combobox_playmod_currentTextChanged(const QString &arg1)
{
    if(arg1 == "单曲循环")
    {
        playlist->setPlaybackMode(QMediaPlaylist::CurrentItemInLoop);
    }
    else if(arg1 == "列表循环")
    {
        playlist->setPlaybackMode(QMediaPlaylist::Loop);
    }
    else if(arg1 == "顺序播放")
    {
        playlist->setPlaybackMode(QMediaPlaylist::Sequential);
    }
    else if(arg1 == "随机播放")
    {
        playlist->setPlaybackMode(QMediaPlaylist::Random);
    }
}

// 暂停 播放
void MainWindow::on_btn_pause_clicked()
{
    if(playlist->mediaCount() == 0)
    {
        return;
    }
    if(player->state() == QMediaPlayer::PlayingState)
    {
        player->pause(); //暂停
        ui->btn_pause->setIcon(QIcon(":/images/pause.bmp"));
    }
    else if(player->state() == QMediaPlayer::PausedState)
    {
        player->play();  //播放
        ui->btn_pause->setIcon(QIcon(":/images/play.bmp"));
    }
}

// 播放上一个视频
void MainWindow::on_btn_front_clicked()
{
    if(playlist->currentIndex() == 0)
    {
        qDebug() << "mediacount" << playlist->mediaCount() << "currindex" <<playlist->currentIndex();
        playlist->setCurrentIndex(playlist->mediaCount()-1);  //最后一个视频
        player->play();

        ui->labelCurrentMdia->clear();
    }
    else
    {
        playlist->setCurrentIndex(playlist->previousIndex()-1); //前一个视频
        player->play();

        ui->labelCurrentMdia->clear();
    }
}

// 播放下一个视频
void MainWindow::on_btn_next_clicked()
{
    playlist->setCurrentIndex(playlist->nextIndex()+1); //后一个视频
    player->play();

    ui->labelCurrentMdia->clear();
}

// 进度条更新
void MainWindow::on_slider_video_valueChanged(int value)
{
    if(ui->slider_video->isSliderDown() == true)
    {
        player->setPosition((value*player->duration())/100.0);
    }
}


//一键静音图标
void MainWindow::on_pushButton_Sound_clicked()
{
    bool mte=player->isMuted();
    player->setMuted(!mte);

    if(mte)
        ui->pushButton_Sound->setIcon(QIcon(":/images/volumn.bmp"));
    else
        ui->pushButton_Sound->setIcon(QIcon(":/images/mute.bmp"));;
}


#if 0
//进度条 总时间显示
void MainWindow::duration_change(qint64 duration)
{
    // 设置水平滑动条的最大值为传入的持续时间（毫秒）
    ui->slider_video->setMaximum(duration);

    // 计算总时长的秒数和分钟数
    int secs = duration / 1000; // 将毫秒转换为秒
    int mins = secs / 60;        // 将秒转换为分钟
    secs = secs % 60;            // 计算剩余的秒数

    // 格式化总时长为"分钟:秒"的格式，并存储在QString变量durationTime中
    durationTime = QString::asprintf("%d:%d", mins, secs);

    // 设置标签label_Ratio的文本为"当前播放时间/总时长"
    ui->label_Ratio->setText(positionTime + "/" + durationTime);
}

//进度条 位置改变当前时间显示
void MainWindow::position_change(qint64 position)
{
    // 如果滑动条正在被拖动，则不执行以下代码
    if(ui->slider_video->isSliderDown())
    {
        return;
    }

    // 设置滑动条的位置为传入的当前播放位置（毫秒）
    ui->slider_video->setSliderPosition(position);

    // 计算当前播放位置的秒数和分钟数
    int secs = position / 1000; // 将毫秒转换为秒
    int mins = secs / 60;        // 将秒转换为分钟
    secs = secs % 60;            // 计算剩余的秒数

    // 格式化当前播放时间为"分钟:秒"的格式，并存储在QString变量positionTime中
    positionTime = QString::asprintf("%d:%d", mins, secs);

    // 设置标签label_Ratio的文本为"当前播放时间/总时长"
    ui->label_Ratio->setText(positionTime + "/" + durationTime);
}

#else

// 进度条 总时间显示
void MainWindow::duration_change(qint64 duration)
{
    // 计算总时长的秒数和分钟数
    int sec = duration/1000; //全部秒数
    int min = sec/60; //分
    sec = sec%60; //剩余的秒数

    // 总时间
    label1 = QString::number(min)+':'+QString::number(sec);

}

//视频进度条位置改变 当前时间显示
void MainWindow::position_change(qint64 position)
{
      // 如果滑动条正在被拖动，则不执行以下代码
      if(ui->slider_video->isSliderDown())
      {
          return;
      }
      float a = float(position); // 当前播放位置转换为浮点数
      float b = float(player->duration()); // 视频总时长转换为浮点数
      ui->slider_video->setSliderPosition((a/b)*100); // 设置滑动条位置为当前位置占总时长的百分比

      // 计算当前播放位置的秒数和分钟数
      int sec = position/1000;  //全部秒数
      int min = sec/60;  //分
      sec = sec%60; //剩余的秒数

      // 当前时间/总时间
      label2 = QString::number(min)+':'+QString::number(sec)+'/'+label1;

      ui->label_Ratio->setText(label2);
}

#endif


```

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QMediaPlayer> //播放器
#include <QMediaPlaylist> //播放列表
#include <QVideoWidget> //电影幕布

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }

//class QAbstractButton;

QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

    QMediaPlayer *player;
    QMediaPlaylist *playlist;
    QVideoWidget *videowidget;

    QTimer *tct1;
    QString label1;
    QString label2;

private slots:
    void on_slider_volume_valueChanged(int value);

    void on_combox_playspeed_currentTextChanged(const QString &arg1);

    void on_btn_pause_clicked();

    void on_btn_front_clicked();

    void on_btn_next_clicked();

    void on_combobox_playmod_currentTextChanged(const QString &arg1);

    void on_slider_video_valueChanged(int value);

    void on_btn_open_clicked();

    void on_btn_test_clicked();

    void double_click_play(); //双击列表目录播放
    void duration_change(qint64 duration);  //进度条总时间显示
    void position_change(qint64 position); //进度条位置改变当前时间显示
    void on_pushButton_Sound_clicked(); //一键静音图标

private:
    Ui::MainWindow *ui;

    QString durationTime; //进度条总时间
    QString positionTime; //当前位置时间

    QString filepath; //文件路径

};
#endif // MAINWINDOW_H

```

```cmake
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

CONFIG += c++11

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

QT +=multimedia
QT +=multimediawidgets

SOURCES += \
    main.cpp \
    mainwindow.cpp

HEADERS += \
    mainwindow.h

FORMS += \
    mainwindow.ui

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

RESOURCES += \
    res.qrc \
    res.qrc

DISTFILES += \
    images/file.GIF \
    images/mute.bmp \
    images/pause.bmp \
    images/play.bmp \
    images/stop.bmp \
    images/volumn.bmp

```



**运行结果：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725279420010-cb7314d6-4cc5-46a9-b73a-4228c57b3dfe.png)

## 三、ONNX推理Yolov5 & Yolov8
### 1.opencv-dnn方法
[ONNX推理.mp4](https://www.yuque.com/attachments/yuque/0/2024/mp4/39216292/1725276724243-6b1dbb4b-9fcb-49dd-87a6-b107f05ff63a.mp4)

**UI界面如下：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725271947654-8043ba12-c6d6-406a-9b65-1bcc803a01f9.png)



```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <opencv2/opencv.hpp>
using namespace cv;  // 引入opencv的命名空间

MainWindow::MainWindow(QWidget *parent)
: QMainWindow(parent)
, ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    setWindowTitle(QStringLiteral("YoloV5(V8) target detection"));
    //禁用按钮
    ui->classes_btn->setEnabled(false);
    ui->openfile->setEnabled(false);
    ui->camera_btn->setEnabled(false);
    ui->pushButton_process->setEnabled(false);


    timer = new QTimer(this);
    timer->setInterval(33); //33
    connect(timer,SIGNAL(timeout()),this,SLOT(readFrame()));
    ui->startdetect->setEnabled(false);
    ui->stopdetect->setEnabled(false);

}

MainWindow::~MainWindow()
{
    delete ui;

}




//图片格式转换
QImage MainWindow::MatToQImage(const cv::Mat& mat)
{

    // 8-bits unsigned, NO. OF CHANNELS = 1
    if (mat.type() == CV_8UC1)
    {
        QImage image(mat.cols, mat.rows, QImage::Format_Indexed8);
        // Set the color table (used to translate colour indexes to qRgb values)
        image.setColorCount(256);
        for (int i = 0; i < 256; i++)
            {
                image.setColor(i, qRgb(i, i, i));
            }
        // Copy input Mat
        uchar* pSrc = mat.data;
        for (int row = 0; row < mat.rows; row++)
            {
                uchar* pDest = image.scanLine(row);
                memcpy(pDest, pSrc, mat.cols);
                pSrc += mat.step;
            }
        return image;
    }
        // 8-bits unsigned, NO. OF CHANNELS = 3
    else if (mat.type() == CV_8UC3)
    {
        // Copy input Mat
        const uchar* pSrc = (const uchar*)mat.data;
        // Create QImage with same dimensions as input Mat
        QImage image(pSrc, mat.cols, mat.rows, (int)mat.step, QImage::Format_RGB888);
        return image.rgbSwapped();
    }
    else if (mat.type() == CV_8UC4)
    {
        //qDebug() << "CV_8UC4";
        // Copy input Mat
        const uchar* pSrc = (const uchar*)mat.data;
        // Create QImage with same dimensions as input Mat
        QImage image(pSrc, mat.cols, mat.rows, (int)mat.step, QImage::Format_ARGB32);
        return image.copy();
    }
    else
    {
        //qDebug() << "ERROR: Mat could not be converted to QImage.";
        return QImage();
    }
}
//显示图像QLabel
void MainWindow::display_MatInQT(QLabel* label, Mat mat)
{

    label->setPixmap(QPixmap::fromImage(MatToQImage(mat)).scaled(label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation));

}





// 加载模型
void MainWindow::on_loadmodel_clicked()
{
    QString defaultPath = "D:/Qt/ONNX/models/yolov5s.onnx"; // 替换为你的默认路径
    QString onnxFile = QFileDialog::getOpenFileName(this,
    QStringLiteral("选择模型"),
    defaultPath,
    "ONNX Files (*.onnx)");
    //QString onnxFile = QFileDialog::getOpenFileName(this,QStringLiteral("选择模型"),".","*.onnx");

    if (!onnxFile.isEmpty()) {
        // 打印文件路径
        qDebug() << "Selected file path:" << onnxFile;

        ui->statusbar->showMessage(onnxFile);
        ui->textEditlog->append(QString::fromUtf8("Open onnxFile: %1 succesfully!").arg(onnxFile));

        //解除按钮禁用
        ui->classes_btn->setEnabled(true);

        onnxFileNames = onnxFile.toStdString();

    } else {
        // 用户取消了文件选择操作
        qDebug() << "No file selected.";
    }

}

// 加载类别
void MainWindow::on_classes_btn_clicked()
{
    QString defaultPath = "D:/Qt/ONNX/onnx_reference/classes/coco.names.txt"; // 替换为你的默认路径
    QString classes_txt = QFileDialog::getOpenFileName(this,
                                                        QStringLiteral("选择模型"),
                                                        defaultPath,
                                                        "Text Files (*.txt)");
    //QString classes_txt = QFileDialog::getOpenFileName(this,QStringLiteral("选择模型"),".","*.txt");

    if (!classes_txt.isEmpty()) {
        // 打印文件路径
        qDebug() << "Selected file path:" << classes_txt;

        ui->statusbar->showMessage(classes_txt);
        ui->textEditlog->append(QString::fromUtf8("Open classes_txt: %1 succesfully!").arg(classes_txt));

        //解除按钮禁用
        ui->openfile->setEnabled(true);
        ui->camera_btn->setEnabled(true);

        classes_path = classes_txt.toStdString();

    } else {
        // 用户取消了文件选择操作
        qDebug() << "No file selected.";
    }
}




// 打开视频  MSVC编译器中文有问题 乱码甚至报错


// 摄像头检测
void MainWindow::on_camera_btn_clicked()
{
    // 读取视频
    //VideoCapture capture;
    capture.open(0);

    if (!capture.isOpened()) {
        qDebug() << "Unable to open the video file." ;
    }else{
        ui->pushButton_process->setEnabled(true);

        long totalFrameNumber = capture.get(CAP_PROP_FRAME_COUNT);
        qDebug() << "The entire video consists of" << totalFrameNumber << "frames.";

        // 获取帧率
        double rate = capture.get(CAP_PROP_FPS);
        qDebug() << "rate:" << rate ;

        int delay = static_cast<int>(1000 / rate); //每帧之间的时间间隔

        if (!capture.read(frame))
        {
            qDebug() << "Failed to read video frames." ;
        }
        // 注意！在图像处理中，通常我们把图像的“行数”对应为图像的“高度”（height），把图像的“列数”对应为图像的“宽度”（width）
        qDebug() << "height:" << frame.rows;
        qDebug() << "width:" << frame.cols;
/*
        // 设置视频写入参数
        int isColor = 1;  //1是彩色,0是灰色
        int frameWidth = static_cast<int>(capture.get(CAP_PROP_FRAME_WIDTH));
        int frameHeight = static_cast<int>(capture.get(CAP_PROP_FRAME_HEIGHT));
        // 其他常见的编解码器，如 XVID 或 DIVX 、MJPG
        VideoWriter writer("target.avi", VideoWriter::fourcc('X', 'V', 'I', 'D'), rate, Size(frameWidth, frameHeight), isColor);
*/
        // 读取和写入帧的循环
        while (true) {
            if (!capture.read(frame)) {
                qDebug() << "Failed to read video frames, video has ended!";
                break;
            }

            //frame.copyTo(frame);  // 对图片进行处理（这里只是复制）

            bool runOnGPU = true;
            Inference inf(onnxFileNames, cv::Size(640, 640), classes_path, runOnGPU);

            // Inference starts here...推理开始...
            // 运行推理并获取输出结果
            std::vector<Detection> output = inf.runInference(frame);

            // 获取检测到的物体数量
            int detections = output.size();
            // 输出检测到的物体数量
            std::cout << "Number of detections:" << detections << std::endl;

            // 遍历每一个检测到的物体
            for (int i = 0; i < detections; ++i) {
                // 获取当前检测到的物体信息
                Detection detection = output[i];

                // 获取物体的边界框
                cv::Rect box = detection.box;
                // 获取物体的颜色（通常用于绘制边界框）
                cv::Scalar color = detection.color;

                // 在图片上绘制物体的边界框
                cv::rectangle(frame, box, color, 2);

                // 准备物体的类别和置信度的字符串
                std::string classString = detection.className + ' ' + std::to_string(detection.confidence).substr(0, 4);

                // 获取字符串的尺寸，用于后续绘制文本背景框
                cv::Size textSize = cv::getTextSize(classString, cv::FONT_HERSHEY_DUPLEX, 1, 2, 0);

                // 计算文本背景框的位置和大小
                cv::Rect textBox(box.x, box.y - 40, textSize.width + 10, textSize.height + 20);

                // 在图片上绘制文本背景框
                cv::rectangle(frame, textBox, color, cv::FILLED);

                // 在图片上绘制物体的类别和置信度文本
                cv::putText(frame, classString, cv::Point(box.x + 5, box.y - 10), cv::FONT_HERSHEY_DUPLEX, 1, cv::Scalar(0, 0, 0), 2, 0);
            }

            // Inference ends here...推理结束...

            // This is only for preview purposes 这段代码仅用于预览目的
            // 设置缩放比例，将图片缩小为原尺寸的0.8倍
            float scale = 0.8;
            cv::resize(frame, frame, cv::Size(frame.cols * scale, frame.rows * scale));

            display_MatInQT(ui->label,frame);


            //writer.write(frame);

            // 等待按键或延迟时间后继续
            int c = waitKey(delay);
            if (c == 'q' || c == 27) {  // 'q'键或Esc键退出循环
                break;
            }
        }

        // 释放资源
        capture.release();
        writer.release();
        destroyAllWindows();

    }
}



void MainWindow::readFrame()
{
    capture.read(frame);
    if (frame.empty()) return;

    auto start = std::chrono::steady_clock::now();
    //yolov5->detect(frame);

    bool runOnGPU = true;
    Inference inf(onnxFileNames, cv::Size(640, 640), classes_path, runOnGPU);

    // Inference starts here...推理开始...
    // 运行推理并获取输出结果
    std::vector<Detection> output = inf.runInference(frame);

    // 获取检测到的物体数量
    int detections = output.size();
    // 输出检测到的物体数量
    std::cout << "Number of detections:" << detections << std::endl;

    // 遍历每一个检测到的物体
    for (int i = 0; i < detections; ++i) {
        // 获取当前检测到的物体信息
        Detection detection = output[i];

        // 获取物体的边界框
        cv::Rect box = detection.box;
        // 获取物体的颜色（通常用于绘制边界框）
        cv::Scalar color = detection.color;

        // 在图片上绘制物体的边界框
        cv::rectangle(frame, box, color, 2);

        // 准备物体的类别和置信度的字符串
        std::string classString = detection.className + ' ' + std::to_string(detection.confidence).substr(0, 4);

        // 获取字符串的尺寸，用于后续绘制文本背景框
        cv::Size textSize = cv::getTextSize(classString, cv::FONT_HERSHEY_DUPLEX, 1, 2, 0);

        // 计算文本背景框的位置和大小
        cv::Rect textBox(box.x, box.y - 40, textSize.width + 10, textSize.height + 20);

        // 在图片上绘制文本背景框
        cv::rectangle(frame, textBox, color, cv::FILLED);

        // 在图片上绘制物体的类别和置信度文本
        cv::putText(frame, classString, cv::Point(box.x + 5, box.y - 10), cv::FONT_HERSHEY_DUPLEX, 1, cv::Scalar(0, 0, 0), 2, 0);
    }

    // Inference ends here...推理结束...

    // This is only for preview purposes 这段代码仅用于预览目的
    // 设置缩放比例，将图片缩小为原尺寸的0.8倍
    float scale = 0.8;
    cv::resize(frame, frame, cv::Size(frame.cols * scale, frame.rows * scale));


    auto end = std::chrono::steady_clock::now();
    std::chrono::duration<double, std::milli> elapsed = end - start;
    ui->textEditlog->append(QString("cost_time: %1 ms").arg(elapsed.count()));

    display_MatInQT(ui->label,frame);


}

void MainWindow::on_openfile_clicked()
{
    QString filename = QFileDialog::getOpenFileName(this,QStringLiteral("打开文件"),".","*.mp4 *.avi;;*.png *.jpg *.jpeg *.bmp");
    if(!QFile::exists(filename)){
        return;
    }
    ui->statusbar->showMessage(filename);

    QMimeDatabase db;
    QMimeType mime = db.mimeTypeForFile(filename);
    if (mime.name().startsWith("image/")) {
        //cv::Mat frame = cv::imread(filename.toLatin1().data());
        frame = cv::imread(filename.toLatin1().data());
        if(frame.empty()){
            ui->statusbar->showMessage("图像不存在！");
            return;
        }


        auto start = std::chrono::steady_clock::now();
        //yolov5->detect(temp);

        bool runOnGPU = true;
        Inference inf(onnxFileNames, cv::Size(640, 640), classes_path, runOnGPU);

        // Inference starts here...推理开始...
        // 运行推理并获取输出结果
        std::vector<Detection> output = inf.runInference(frame);

        // 获取检测到的物体数量
        int detections = output.size();
        // 输出检测到的物体数量
        std::cout << "Number of detections:" << detections << std::endl;

        // 遍历每一个检测到的物体
        for (int i = 0; i < detections; ++i) {
            // 获取当前检测到的物体信息
            Detection detection = output[i];

            // 获取物体的边界框
            cv::Rect box = detection.box;
            // 获取物体的颜色（通常用于绘制边界框）
            cv::Scalar color = detection.color;

            // 在图片上绘制物体的边界框
            cv::rectangle(frame, box, color, 2);

            // 准备物体的类别和置信度的字符串
            std::string classString = detection.className + ' ' + std::to_string(detection.confidence).substr(0, 4);

            // 获取字符串的尺寸，用于后续绘制文本背景框
            cv::Size textSize = cv::getTextSize(classString, cv::FONT_HERSHEY_DUPLEX, 1, 2, 0);

            // 计算文本背景框的位置和大小
            cv::Rect textBox(box.x, box.y - 40, textSize.width + 10, textSize.height + 20);

            // 在图片上绘制文本背景框
            cv::rectangle(frame, textBox, color, cv::FILLED);

            // 在图片上绘制物体的类别和置信度文本
            cv::putText(frame, classString, cv::Point(box.x + 5, box.y - 10), cv::FONT_HERSHEY_DUPLEX, 1, cv::Scalar(0, 0, 0), 2, 0);
        }

        // Inference ends here...推理结束...

        // This is only for preview purposes 这段代码仅用于预览目的
        // 设置缩放比例，将图片缩小为原尺寸的0.8倍
        float scale = 0.8;
        cv::resize(frame, frame, cv::Size(frame.cols * scale, frame.rows * scale));


        auto end = std::chrono::steady_clock::now();
        std::chrono::duration<double, std::milli> elapsed = end - start;
        ui->textEditlog->append(QString("cost_time: %1 ms").arg(elapsed.count()));

        display_MatInQT(ui->label,frame);

        filename.clear();
    }else if (mime.name().startsWith("video/")) {

        capture.open(filename.toLatin1().data());
        if (!capture.isOpened()){
            ui->textEditlog->append("fail to open MP4!");
            return;
        }

        ui->startdetect->setEnabled(true);
        ui->textEditlog->append(QString::fromUtf8("Open video: %1 succesfully!").arg(filename));

        //获取整个帧数QStringLiteral
        long totalFrame = capture.get(cv::CAP_PROP_FRAME_COUNT);
        int width = capture.get(cv::CAP_PROP_FRAME_WIDTH);
        int height = capture.get(cv::CAP_PROP_FRAME_HEIGHT);
        //ui->textEditlog->append(QStringLiteral("整个视频共 %1 帧, 宽=%2 高=%3 ").arg(totalFrame).arg(width).arg(height));
        ui->textEditlog->append(QStringLiteral("The entire video has %1 frames, Width=%2 Height=%3 ").arg(totalFrame).arg(width).arg(height));
        ui->label->resize(QSize(width, height)); //指定了控件的新宽度和高度

        //设置开始帧()
        long frameToStart = 0;
        capture.set(cv::CAP_PROP_POS_FRAMES, frameToStart);
        //ui->textEditlog->append(QStringLiteral("从第 %1 帧开始读").arg(frameToStart));
        ui->textEditlog->append(QStringLiteral("Start reading from frame %1").arg(frameToStart));

        //获取帧率
        double rate = capture.get(cv::CAP_PROP_FPS);
        ui->textEditlog->append(QStringLiteral("rate: %1fps ").arg(rate));

    }
}

void MainWindow::on_startdetect_clicked()
{
    timer->start();
    ui->startdetect->setEnabled(false);
    ui->stopdetect->setEnabled(true);
    ui->openfile->setEnabled(false);

    ui->textEditlog->append(QStringLiteral("=======================\n"
                                           "        Start Detection\n"
                                           "=======================\n"));
}

void MainWindow::on_stopdetect_clicked()
{
    ui->startdetect->setEnabled(true);
    ui->stopdetect->setEnabled(false);
    ui->openfile->setEnabled(true);

    timer->stop();
    ui->textEditlog->append(QStringLiteral("======================\n"
                                           "        Stop Detection\n"
                                           "======================\n"));
}





//camera1


QImage Mat2QImage(cv::Mat cvImg)
{
    QImage qImg;
    if(cvImg.channels()==3)                             //3 channels color image
    {

        cv::cvtColor(cvImg,cvImg,COLOR_BGR2RGB);//default is BGR in opencv  转换颜色空间从BGR到RGB
        qImg =QImage((const unsigned char*)(cvImg.data),
                    cvImg.cols, cvImg.rows,
                    cvImg.cols*cvImg.channels(),//bytes per line(line stride)
                    QImage::Format_RGB888);
    }
    else if(cvImg.channels()==1)      //grayscale image  Format_Indexed8 8位的索引色  Format_Grayscale8 8位的灰度图
    {
        qImg =QImage((const unsigned char*)(cvImg.data),
                    cvImg.cols,cvImg.rows,
                    cvImg.cols*cvImg.channels(),
                    QImage::Format_Indexed8);
    }
    else
    {
        qImg =QImage((const unsigned char*)(cvImg.data),
                    cvImg.cols,cvImg.rows,
                    cvImg.cols*cvImg.channels(),
                    QImage::Format_RGB888);// format reference
    }

    return qImg;

}
void MainWindow::nextFrame()
{
    capture >> frame;
    if(!frame.empty())
    {
        img = Mat2QImage(frame);
        ui->label->setPixmap(QPixmap::fromImage(img));// convert QImage to QPixmap
    }
}
// open a video
void MainWindow::on_pushButton_open_clicked()
{
    if (capture.isOpened())
        capture.release();     //decide if capture is already opened; if so,close it
    QString filename =QFileDialog::getOpenFileName(this,tr("Open Video File"),".",tr("Video Files(*.avi *.mp4 *.flv *.mkv)"));
    capture.open(filename.toLocal8Bit().data());
    if (capture.isOpened())
    {
        ui->pushButton_process->setEnabled(true);

        //获取视频帧率和第一帧
        rate= capture.get(CAP_PROP_FPS);
        capture >> frame;
        if (!frame.empty())
        {

            img = Mat2QImage(frame);
            ui->label->setPixmap(QPixmap::fromImage(img));
            timer = new QTimer(this);
            timer->setInterval(1000/rate);   //set timer match with FPS  设置定时器的间隔  1秒等于1000毫秒
            connect(timer, SIGNAL(timeout()), this, SLOT(nextFrame()));//connect signal and slot
            timer->start();
        }
    }
}

void MainWindow::on_pushButton_process_clicked()
{

    bool runOnGPU = true;
    Inference inf(onnxFileNames, cv::Size(640, 640), classes_path, runOnGPU);

    // Inference starts here...推理开始...
    // 运行推理并获取输出结果
    std::vector<Detection> output = inf.runInference(frame);

    // 获取检测到的物体数量
    int detections = output.size();
    // 输出检测到的物体数量
    std::cout << "Number of detections:" << detections << std::endl;

    // 遍历每一个检测到的物体
    for (int i = 0; i < detections; ++i) {
        // 获取当前检测到的物体信息
        Detection detection = output[i];

        // 获取物体的边界框
        cv::Rect box = detection.box;
        // 获取物体的颜色（通常用于绘制边界框）
        cv::Scalar color = detection.color;

        // 在图片上绘制物体的边界框
        cv::rectangle(frame, box, color, 2);

        // 准备物体的类别和置信度的字符串
        std::string classString = detection.className + ' ' + std::to_string(detection.confidence).substr(0, 4);

        // 获取字符串的尺寸，用于后续绘制文本背景框
        cv::Size textSize = cv::getTextSize(classString, cv::FONT_HERSHEY_DUPLEX, 1, 2, 0);

        // 计算文本背景框的位置和大小
        cv::Rect textBox(box.x, box.y - 40, textSize.width + 10, textSize.height + 20);

        // 在图片上绘制文本背景框
        cv::rectangle(frame, textBox, color, cv::FILLED);

        // 在图片上绘制物体的类别和置信度文本
        cv::putText(frame, classString, cv::Point(box.x + 5, box.y - 10), cv::FONT_HERSHEY_DUPLEX, 1, cv::Scalar(0, 0, 0), 2, 0);
    }

    // Inference ends here...推理结束...

    // This is only for preview purposes 这段代码仅用于预览目的
    // 设置缩放比例，将图片缩小为原尺寸的0.8倍
    float scale = 0.8;
    cv::resize(frame, frame, cv::Size(frame.cols * scale, frame.rows * scale));

    //display_MatInQT(ui->label,frame);
    cv::namedWindow("target");
    cv::imshow("target", frame);

}

void MainWindow::on_pushButton_camera_clicked()
{
    QMessageBox:: StandardButton result =  QMessageBox::information(NULL, "Title", "World", QMessageBox::Yes | QMessageBox::No|QMessageBox::Abort, QMessageBox::Abort);
    switch (result)
    {
    case QMessageBox::Yes:
        std::cout<<"Yes";
        break;
    case QMessageBox::No:
        std::cout<<"NO";
        return;
        break;
    default:
        return;
        break;
    }
    if (capture.isOpened())
        capture.release();     //decide if capture is already opened; if so,close it
    capture.open(0);           //open the default camera
    if (capture.isOpened())
    {
        ui->pushButton_camera->setDisabled(true);
        //rate= capture.get(CAP_PROP_FPS);
        rate = 30;
        capture >> frame;
        if (!frame.empty())
        {

            img = Mat2QImage(frame);
            ui->label->setPixmap(QPixmap::fromImage(img));
            timer = new QTimer(this);
            timer->setInterval(1000/rate);   //set timer match with FPS
            connect(timer, SIGNAL(timeout()), this, SLOT(nextFrame()));
            timer->start();
        }
    }
}

void MainWindow::on_pushButton_close_clicked()
{
//    capture.
    capture.release();
    ui->pushButton_camera->setEnabled(true);
    ui->pushButton_process->setEnabled(false);
}
```

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QFileDialog>
#include <QMessageBox>
#include <QDebug>

#include <iostream>
#include <vector>
#include <opencv2/opencv.hpp>
#include "inference.h"


#include <time.h>
#include <QTimer>

#include <QMutex>
#include <QMutexLocker>
#include <QMimeDatabase>

using namespace std;
using namespace cv;

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();


private slots:

    void on_loadmodel_clicked();

    void on_classes_btn_clicked();

    void on_camera_btn_clicked();

    void nextFrame();
    void on_pushButton_open_clicked();
    void on_pushButton_camera_clicked();
    void on_pushButton_process_clicked();
    void on_pushButton_close_clicked();


    void readFrame(); //自定义信号处理函数
    void on_openfile_clicked();
    void on_startdetect_clicked();
    void on_stopdetect_clicked();

private:

    QImage MatToQImage(const cv::Mat& mat);				// MAT类型 转 QImage类型
    void display_MatInQT(QLabel* label, cv::Mat mat);	// MAT对象 QT显示



private:
    Ui::MainWindow *ui;

    cv::Mat image;
    std::vector<std::string> imageNames;
    std::string onnxFileNames;
    std::string classes_path;

    cv::Mat frame;
    cv::VideoCapture capture;
    QImage  img;
    QTimer *timer;
    double rate; //FPS
    cv::VideoWriter writer;   //make a video record

};
#endif // MAINWINDOW_H
```

```cpp
#include "inference.h"

//如果你声明了一个变量为const，那么这个变量的值在初始化之后就不能再被修改 删掉  另外注意非常量引用只能绑定到左值
Inference::Inference(std::string &onnxModelPath, const cv::Size &modelInputShape, const std::string &classesTxtFile, const bool &runWithCuda)
{
    modelPath = onnxModelPath;
    modelShape = modelInputShape;
    classesPath = classesTxtFile;
    cudaEnabled = runWithCuda;

    loadOnnxNetwork();
    loadClassesFromFile();  //The classes are hard-coded for this example
}


std::vector<Detection> Inference::runInference(const cv::Mat &input)
{
    cv::Mat modelInput = input;
    if (letterBoxForSquare && modelShape.width == modelShape.height)
        modelInput = formatToSquare(modelInput);

    cv::Mat blob;
    cv::dnn::blobFromImage(modelInput, blob, 1.0/255.0, modelShape, cv::Scalar(), true, false);
    net.setInput(blob);

    std::vector<cv::Mat> outputs;
    net.forward(outputs, net.getUnconnectedOutLayersNames());

    int rows = outputs[0].size[1];
    int dimensions = outputs[0].size[2];

    bool yolov8 = false;
    // yolov5 has an output of shape (batchSize, 25200, 85) (Num classes + box[x,y,w,h] + confidence[c])
    // yolov8 has an output of shape (batchSize, 84,  8400) (Num classes + box[x,y,w,h])
    if (dimensions > rows) // Check if the shape[2] is more than shape[1] (yolov8)
    {
        yolov8 = true;
        rows = outputs[0].size[2];
        dimensions = outputs[0].size[1];

        outputs[0] = outputs[0].reshape(1, dimensions);
        cv::transpose(outputs[0], outputs[0]);
    }
    float *data = (float *)outputs[0].data;

    float x_factor = modelInput.cols / modelShape.width;
    float y_factor = modelInput.rows / modelShape.height;

    std::vector<int> class_ids;
    std::vector<float> confidences;
    std::vector<cv::Rect> boxes;

    for (int i = 0; i < rows; ++i)
        {
            if (yolov8)
            {
                float *classes_scores = data+4;

                cv::Mat scores(1, classes.size(), CV_32FC1, classes_scores);
                cv::Point class_id;
                double maxClassScore;

                minMaxLoc(scores, 0, &maxClassScore, 0, &class_id);

                if (maxClassScore > modelScoreThreshold)
                {
                    confidences.push_back(maxClassScore);
                    class_ids.push_back(class_id.x);

                    float x = data[0];
                    float y = data[1];
                    float w = data[2];
                    float h = data[3];

                    int left = int((x - 0.5 * w) * x_factor);
                    int top = int((y - 0.5 * h) * y_factor);

                    int width = int(w * x_factor);
                    int height = int(h * y_factor);

                    boxes.push_back(cv::Rect(left, top, width, height));
                }
            }
            else // yolov5
            {
                float confidence = data[4];

                if (confidence >= modelConfidenceThreshold)
                {
                    float *classes_scores = data+5;

                    cv::Mat scores(1, classes.size(), CV_32FC1, classes_scores);
                    cv::Point class_id;
                double max_class_score;

                minMaxLoc(scores, 0, &max_class_score, 0, &class_id);

                if (max_class_score > modelScoreThreshold)
                {
                    confidences.push_back(confidence);
                    class_ids.push_back(class_id.x);

                    float x = data[0];
                    float y = data[1];
                    float w = data[2];
                    float h = data[3];

                    int left = int((x - 0.5 * w) * x_factor);
                    int top = int((y - 0.5 * h) * y_factor);

                    int width = int(w * x_factor);
                    int height = int(h * y_factor);

                    boxes.push_back(cv::Rect(left, top, width, height));
                }
            }
        }

        data += dimensions;
    }

    std::vector<int> nms_result;
    cv::dnn::NMSBoxes(boxes, confidences, modelScoreThreshold, modelNMSThreshold, nms_result);

    std::vector<Detection> detections{};
    for (unsigned long i = 0; i < nms_result.size(); ++i)
    {
        int idx = nms_result[i];

        Detection result;
        result.class_id = class_ids[idx];
        result.confidence = confidences[idx];

        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<int> dis(100, 255);
        result.color = cv::Scalar(dis(gen),
                                  dis(gen),
                                  dis(gen));

        result.className = classes[result.class_id];
        result.box = boxes[idx];

        detections.push_back(result);
    }

    return detections;
}

void Inference::loadClassesFromFile()
{
    // 创建一个输入文件流对象，尝试打开 classesPath 指定的文件
    std::ifstream inputFile(classesPath);
    // 检查文件是否成功打开
    if (inputFile.is_open())
    {
        std::string classLine; // 定义一个字符串变量 classLine，用于临时存储每一行的内容
        // 使用循环逐行读取文件内容
        while (std::getline(inputFile, classLine))
            // 将读取到的每一行（即一个类别名）添加到 classes 向量中
            classes.push_back(classLine);
        inputFile.close();
    }
}

void Inference::loadOnnxNetwork()
{
    net = cv::dnn::readNetFromONNX(modelPath);
    if (cudaEnabled)
    {
        std::cout << "\nRunning on CUDA" << std::endl;
        net.setPreferableBackend(cv::dnn::DNN_BACKEND_CUDA);
        net.setPreferableTarget(cv::dnn::DNN_TARGET_CUDA);
    }
    else
    {
        std::cout << "\nRunning on CPU" << std::endl;
        net.setPreferableBackend(cv::dnn::DNN_BACKEND_OPENCV);
        net.setPreferableTarget(cv::dnn::DNN_TARGET_CPU);
    }
}

cv::Mat Inference::formatToSquare(const cv::Mat &source)
{
    int col = source.cols;
    int row = source.rows;
    int _max = MAX(col, row);
    cv::Mat result = cv::Mat::zeros(_max, _max, CV_8UC3);
    source.copyTo(result(cv::Rect(0, 0, col, row)));
    return result;
}

```

```cpp
#ifndef INFERENCE_H
#define INFERENCE_H

// Cpp native
#include <fstream>
#include <vector>
#include <string>
#include <random>

// OpenCV / DNN / Inference
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/dnn.hpp>

struct Detection
{
int class_id{0};
std::string className{};
float confidence{0.0};
cv::Scalar color{};
cv::Rect box{};
};

class Inference
{
public:
//Inference(const std::string &onnxModelPath, const cv::Size &modelInputShape = {640, 640}, const std::string &classesTxtFile = "", const bool &runWithCuda = true);
Inference(std::string &onnxModelPath, const cv::Size &modelInputShape = {640, 640}, const std::string &classesTxtFile = "", const bool &runWithCuda = true);
std::vector<Detection> runInference(const cv::Mat &input);


private:
void loadClassesFromFile();
void loadOnnxNetwork();
cv::Mat formatToSquare(const cv::Mat &source);

std::string modelPath{};
std::string classesPath{};
bool cudaEnabled{};

// 标注
//std::vector<std::string> classes{"person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch", "potted plant", "bed", "dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"};
//std::vector<std::string> classes{ "lion", "tiger" };
std::vector<std::string> classes;



cv::Size2f modelShape{};

float modelConfidenceThreshold {0.25};

float modelScoreThreshold      {0.45};  // yolov8 相识度
float modelNMSThreshold        {0.50};  // yolov8 重叠度

bool letterBoxForSquare = true;

cv::dnn::Net net;
};

#endif // INFERENCE_H
```

```cmake
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

    CONFIG += c++11

    # The following define makes your compiler emit warnings if you use
    # any Qt feature that has been marked deprecated (the exact warnings
    # depend on your compiler). Please consult the documentation of the
    # deprecated API in order to know how to port your code away from it.
    DEFINES += QT_DEPRECATED_WARNINGS

    # You can also make your code fail to compile if it uses deprecated APIs.
    # In order to do so, uncomment the following line.
    # You can also select to disable deprecated APIs only up to a certain version of Qt.
    #DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

    SOURCES += \
    inference.cpp \
    main.cpp \
    mainwindow.cpp

    HEADERS += \
    inference.h \
    mainwindow.h

    FORMS += \
    mainwindow.ui

    # Default rules for deployment.
    qnx: target.path = /tmp/$${TARGET}/bin
        else: unix:!android: target.path = /opt/$${TARGET}/bin
        !isEmpty(target.path): INSTALLS += target


#配置opencv  MinGW32配置的！！！ 配置好系统环境变量或将bin文件夹所有dll库文件复制到编译生成的debug文件夹
##1、附加包含目录
            #INCLUDEPATH += E:\opencv-4.5.4\build\include \
            #               E:\opencv-4.5.4\build\include\opencv2
            ##2、链接器 附加库目录和附加依赖项
            #LIBS += E:\opencv-4.5.4\build\x64\mingw\lib\libopencv_*.dll.a


            # 外部库只能用MSVC2017编译器 release模式
win32:CONFIG(release, debug|release): LIBS += -L$$PWD/../../../OpenCV-4.8.1/opencv/build/x64/vc16/lib/ -lopencv_world481
    else:win32:CONFIG(debug, debug|release): LIBS += -L$$PWD/../../../OpenCV-4.8.1/opencv/build/x64/vc16/lib/ -lopencv_world481d
    else:unix: LIBS += -L$$PWD/../../../OpenCV-4.8.1/opencv/build/x64/vc16/lib/ -lopencv_world481

    INCLUDEPATH += $$PWD/../../../OpenCV-4.8.1/opencv/build/include
    DEPENDPATH += $$PWD/../../../OpenCV-4.8.1/opencv/build/include

    # opencv-4.8.1_cuda 外部库
    #win32:CONFIG(release, debug|release): LIBS += -LE:/opencv-4.8.1_cuda/lib/ -lopencv_world481
    #else:win32:CONFIG(debug, debug|release): LIBS += -LE:/opencv-4.8.1_cuda/lib/ -lopencv_world481d
    #else:unix: LIBS += -LE:/opencv-4.8.1_cuda/lib/ -lopencv_world481

    #INCLUDEPATH += E:/opencv-4.8.1_cuda/include
    #DEPENDPATH += E:/opencv-4.8.1_cuda/include
```



**运行结果：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725272064372-0e50ffdb-d2f5-48cf-838e-da7c141c2721.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725274797457-ad426e9f-08ba-46d4-af6e-cddfe00cbfdd.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725274909453-f98a4cd3-a6fa-4af6-b00d-09a8cb31ccea.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725274958708-c0c5c75c-a606-4dc7-9142-4b0b2db217a8.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725275000084-166bcb41-ce29-4c01-958a-3b3a67383c5d.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725275085331-a2cb886b-3a8f-4f02-88be-cab817e6f706.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725275263598-ff980744-ca8d-48a7-a569-4e55a09bb9fc.png)



### 2.onnxruntime方法
**UI界面如下：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725275835684-96bbc135-0f6f-436c-aa2d-4d5c19676897.png)



```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    setWindowTitle(QStringLiteral("YoloV8 target detection - onnxruntime"));

    ui->load_classes->setEnabled(false);
    ui->open_btn->setEnabled(false);
    ui->detect_btn->setEnabled(false);
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::on_load_model_clicked()
{
    QString defaultPath = "D:/Qt/ONNX/models/yolov8n.onnx"; // 替换为你的默认路径
    QString onnxFile = QFileDialog::getOpenFileName(this,
                                                     QStringLiteral("选择模型"),
                                                     defaultPath,
                                                     "ONNX Files (*.onnx)");
    //QString onnxFile = QFileDialog::getOpenFileName(this,QStringLiteral("选择模型"),".","*.onnx");

    if (!onnxFile.isEmpty()) {
        // 打印文件路径
        qDebug() << "Selected file path:" << onnxFile;

        ui->statusbar->showMessage(onnxFile);
        ui->textEditlog->append(QString::fromUtf8("Open onnxFile: %1 succesfully!").arg(onnxFile));

        //解除按钮禁用
        ui->load_classes->setEnabled(true);

        onnxFileNames = onnxFile.toStdString();

    } else {
        // 用户取消了文件选择操作
        qDebug() << "No file selected.";
    }
}

void MainWindow::on_load_classes_clicked()
{
    // 清除之前文件的内容
    labels_txt_file.clear();

    QString defaultPath = "D:/Qt/ONNX/onnx_reference/classes/coco.names.txt"; // 替换为你的默认路径
    QString classes_txt = QFileDialog::getOpenFileName(this,
                                                        QStringLiteral("选择模型"),
                                                        defaultPath,
                                                        "Text Files (*.txt)");
    //QString classes_txt = QFileDialog::getOpenFileName(this,QStringLiteral("选择模型"),".","*.txt");

    if (!classes_txt.isEmpty()) {
        // 打印文件路径
        qDebug() << "Selected file path:" << classes_txt;

        ui->statusbar->showMessage(classes_txt);
        ui->textEditlog->append(QString::fromUtf8("Open classes_txt: %1 succesfully!").arg(classes_txt));

        //解除按钮禁用
        ui->open_btn->setEnabled(true);

        //std::vector<std::string> labels_txt_file{};

        // 将 classes_txt 转换为 std::string
        std::string classes_txt_std = classes_txt.toStdString();
        // 打开文件
        std::ifstream inputfile(classes_txt_std);

        // 检查文件是否成功打开
        if (inputfile.is_open()) {
            std::string line;
            // 逐行读取文件内容，并将每一行添加到 labels_txt_file 中
            while (std::getline(inputfile, line)) {
                labels_txt_file.push_back(line);
            }
            // 关闭文件
            inputfile.close();
        } else {
            // 文件打开失败，输出错误信息（这里使用 qDebug 输出调试信息）
            qDebug() << "Failed to open file: " << classes_txt;
        }

    } else {
        // 用户取消了文件选择操作
        qDebug() << "No file selected.";
    }
}

void MainWindow::on_open_btn_clicked()
{
    //调用窗口打开文件
    ui->label->clear();
    QString defaultPath = "D:/Qt/ONNX/onnx_reference/images/bus.jpg"; // 替换为你的默认路径
    QString filename = QFileDialog::getOpenFileName(this,
            tr("Open Image"),
            defaultPath, // 在这里指定默认路径
            tr("Image Files (*.png *.jpg *.bmp)"));

    if (!filename.isEmpty()) {
        // 打印文件路径
        qDebug() << "Selected file path:" << filename;

        imagePaths = filename.toStdString();

    } else {
        // 用户取消了文件选择操作
        qDebug() << "No file selected.";
    }

    image = imread(filename.toLocal8Bit().data());
    if (image.data) {

        //解除按钮禁用
        ui->detect_btn->setEnabled(true);


        // 通过 lable 方式显示图片
        display_MatInQT(ui->label, image);
    }
    else
    {
        QMessageBox::information(this, tr("提示"), tr("未成功载入图片！"), QMessageBox::Ok);
    }
}

void MainWindow::on_detect_btn_clicked()
{
    ui->label->clear();

//#define USE_CUDA    //注释掉该定义，则使用CPU进行推理

    DCSP_CORE* yoloDetector = new DCSP_CORE;
    //std::string model_path = "D:/Qt/ONNX/onnxruntime_yolov8/models/yolov8n.onnx";
    std::string model_path = onnxFileNames;
    //read_coco_yaml(yoloDetector); //从 YAML 文件中读取了一系列行，查找 "names:" 的部分,提取 "names:" 部分后面的字符串并存储在一个向量中
    //yoloDetector->classes = { "person" };   //std::vector<std::string> classes{};
    yoloDetector->classes = labels_txt_file;


    //std::string model_path = "D:/Qt/ONNX/models/v8_best15(hat-person).onnx";
    //yoloDetector->classes = { "hat","person" };
#ifdef USE_CUDA
    // GPU FP32 inference
    DCSP_INIT_PARAM params{ model_path, YOLO_ORIGIN_V8, {640, 640},  0.1, 0.5, true };
    // GPU FP16 inference
    // DCSP_INIT_PARAM params{ model_path, YOLO_ORIGIN_V8_HALF, {640, 640},  0.1, 0.5, true };
#else
    // CPU inference
    DCSP_INIT_PARAM params{ model_path, YOLO_ORIGIN_V8, {640, 640}, 0.1, 0.5, false };
#endif
    yoloDetector->CreateSession(params);
    //file_iterator(yoloDetector);
    file_iterator(yoloDetector, imagePaths);
}


/*
void MainWindow::file_iterator(DCSP_CORE*& p) {
    std::filesystem::path current_path = std::filesystem::current_path();
    std::filesystem::path imgs_path = current_path / "images";
    for (auto& i : std::filesystem::directory_iterator(imgs_path)) {
        if (i.path().extension() == ".jpg" || i.path().extension() == ".png" || i.path().extension() == ".jpeg") {
            std::string img_path = i.path().string();
            cv::Mat img = cv::imread(img_path);
            std::vector<DCSP_RESULT> res;
            p->RunSession(img, res);

            for (auto& re : res) {
                cv::RNG rng(cv::getTickCount());
                cv::Scalar color(rng.uniform(0, 256), rng.uniform(0, 256), rng.uniform(0, 256));

                cv::rectangle(img, re.box, color, 3);

                float confidence = floor(100 * re.confidence) / 100;
                std::cout << std::fixed << std::setprecision(2);
                std::string label = p->classes[re.classId] + " " +
                    std::to_string(confidence).substr(0, std::to_string(confidence).size() - 4);

                cv::rectangle(
                    img,
                    cv::Point(re.box.x, re.box.y - 25),
                    cv::Point(re.box.x + label.length() * 15, re.box.y),
                    color,
                    cv::FILLED
                );

                cv::putText(
                    img,
                    label,
                    cv::Point(re.box.x, re.box.y - 5),
                    cv::FONT_HERSHEY_SIMPLEX,
                    0.75,
                    cv::Scalar(0, 0, 0),
                    2
                );


            }
//            std::cout << "Press any key to exit" << std::endl;
//            cv::imshow("Result of Detection", img);
//            cv::waitKey(0);
//            cv::destroyAllWindows();

            // 通过 lable 方式显示图片
            display_MatInQT(ui->label, img);
        }
    }
}
*/


void MainWindow::file_iterator(DCSP_CORE*& p, const std::string& img_path) {
    cv::Mat img = cv::imread(img_path);

    if (img.empty()) {
        qDebug() << "Failed to read image: " << QString::fromStdString(img_path);
        return;
    }

    std::vector<DCSP_RESULT> res;
    p->RunSession(img, res);

    for (auto& re : res) {
        cv::RNG rng(cv::getTickCount());
        cv::Scalar color(rng.uniform(0, 256), rng.uniform(0, 256), rng.uniform(0, 256));

        cv::rectangle(img, re.box, color, 3);

        float confidence = floor(100 * re.confidence) / 100;
        std::cout << std::fixed << std::setprecision(2);
        std::string label = p->classes[re.classId] + " " +
            std::to_string(confidence).substr(0, std::to_string(confidence).size() - 4);

        cv::rectangle(
            img,
            cv::Point(re.box.x, re.box.y - 25),
            cv::Point(re.box.x + label.length() * 15, re.box.y),
            color,
            cv::FILLED
        );

        cv::putText(
            img,
            label,
            cv::Point(re.box.x, re.box.y - 5),
            cv::FONT_HERSHEY_SIMPLEX,
            0.75,
            cv::Scalar(0, 0, 0),
            2
        );
    }

    // 通过 label 方式显示图片
    display_MatInQT(ui->label, img);
}



int MainWindow::read_coco_yaml(DCSP_CORE*& p) {
    // Open the YAML file
    std::ifstream file("D:/Qt/ONNX/onnxruntime_yolov8/models/coco.yaml");
    if (!file.is_open()) {
        std::cerr << "Failed to open file" << std::endl;
        return 1;
    }

    // Read the file line by line
    std::string line;
    std::vector<std::string> lines;
    while (std::getline(file, line)) {
        lines.push_back(line);
    }

    // Find the start and end of the names section
    std::size_t start = 0;
    std::size_t end = 0;
    for (std::size_t i = 0; i < lines.size(); i++) {
        if (lines[i].find("names:") != std::string::npos) {
            start = i + 1;
        }
        else if (start > 0 && lines[i].find(':') == std::string::npos) {
            end = i;
            break;
        }
    }

    // Extract the names
    std::vector<std::string> names;
    for (std::size_t i = start; i < end; i++) {
        std::stringstream ss(lines[i]);
        std::string name;
        std::getline(ss, name, ':'); // Extract the number before the delimiter
        std::getline(ss, name); // Extract the string after the delimiter
        names.push_back(name);
    }

    p->classes = names;
    return 0;
}


//图片格式转换
QImage MainWindow::MatToQImage(const cv::Mat& mat)
{

    // 8-bits unsigned, NO. OF CHANNELS = 1
    if (mat.type() == CV_8UC1)
    {
        QImage image(mat.cols, mat.rows, QImage::Format_Indexed8);
        // Set the color table (used to translate colour indexes to qRgb values)
        image.setColorCount(256);
        for (int i = 0; i < 256; i++)
        {
            image.setColor(i, qRgb(i, i, i));
        }
        // Copy input Mat
        uchar* pSrc = mat.data;
        for (int row = 0; row < mat.rows; row++)
        {
            uchar* pDest = image.scanLine(row);
            memcpy(pDest, pSrc, mat.cols);
            pSrc += mat.step;
        }
        return image;
    }
    // 8-bits unsigned, NO. OF CHANNELS = 3
    else if (mat.type() == CV_8UC3)
    {
        // Copy input Mat
        const uchar* pSrc = (const uchar*)mat.data;
        // Create QImage with same dimensions as input Mat
        QImage image(pSrc, mat.cols, mat.rows, (int)mat.step, QImage::Format_RGB888);
        return image.rgbSwapped();
    }
    else if (mat.type() == CV_8UC4)
    {
        //qDebug() << "CV_8UC4";
        // Copy input Mat
        const uchar* pSrc = (const uchar*)mat.data;
        // Create QImage with same dimensions as input Mat
        QImage image(pSrc, mat.cols, mat.rows, (int)mat.step, QImage::Format_ARGB32);
        return image.copy();
    }
    else
    {
        //qDebug() << "ERROR: Mat could not be converted to QImage.";
        return QImage();
    }
}
//显示图像QLabel
void MainWindow::display_MatInQT(QLabel* label, Mat mat)
{

    label->setPixmap(QPixmap::fromImage(MatToQImage(mat)).scaled(label->size(), Qt::KeepAspectRatio, Qt::SmoothTransformation));

}
```

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QFileDialog>
#include <QMessageBox>
#include <QDebug>

#include <iostream>
#include <iomanip>
#include "inference.h"
#include <filesystem>
#include <fstream>
#include "inference.h"
#include <regex>

#include <opencv2/opencv.hpp>
using namespace cv;
using namespace std;

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_load_model_clicked();

    void on_load_classes_clicked();

    void on_open_btn_clicked();

    void on_detect_btn_clicked();

private:
    //void file_iterator(DCSP_CORE*& p);
    int read_coco_yaml(DCSP_CORE*& p);

    QImage MatToQImage(const cv::Mat& mat);				// MAT类型 转 QImage类型
    void display_MatInQT(QLabel* label, cv::Mat mat);	// MAT对象 QT显示

    void file_iterator(DCSP_CORE*& p, const std::string& img_path);


private:
    Ui::MainWindow *ui;

    cv::Mat image;
    std::string onnxFileNames;
    std::string imagePaths;

    std::vector<std::string> labels_txt_file{};
};
#endif // MAINWINDOW_H

```

```cpp
#include "inference.h"
#include <regex>

#define benchmark

DCSP_CORE::DCSP_CORE() {

}


DCSP_CORE::~DCSP_CORE() {
    delete session;
}

#ifdef USE_CUDA
namespace Ort
{
    template<>
    struct TypeToTensorType<half> { static constexpr ONNXTensorElementDataType type = ONNX_TENSOR_ELEMENT_DATA_TYPE_FLOAT16; };
}
#endif



template<typename T>
char *BlobFromImage(cv::Mat &iImg, T &iBlob) {
    int channels = iImg.channels();
    int imgHeight = iImg.rows;
    int imgWidth = iImg.cols;

    for (int c = 0; c < channels; c++) {
        for (int h = 0; h < imgHeight; h++) {
            for (int w = 0; w < imgWidth; w++) {
                iBlob[c * imgWidth * imgHeight + h * imgWidth + w] = typename std::remove_pointer<T>::type(
                        (iImg.at<cv::Vec3b>(h, w)[c]) / 255.0f);
            }
        }
    }
    return RET_OK;
}


char *PostProcess(cv::Mat &iImg, std::vector<int> iImgSize, cv::Mat &oImg) {
    cv::Mat img = iImg.clone();
    cv::resize(iImg, oImg, cv::Size(iImgSize.at(0), iImgSize.at(1)));
    if (img.channels() == 1) {
        cv::cvtColor(oImg, oImg, cv::COLOR_GRAY2BGR);
    }
    cv::cvtColor(oImg, oImg, cv::COLOR_BGR2RGB);
    return RET_OK;
}


char *DCSP_CORE::CreateSession(DCSP_INIT_PARAM &iParams) {
    char *Ret = RET_OK;
    std::regex pattern("[\u4e00-\u9fa5]");
    bool result = std::regex_search(iParams.ModelPath, pattern);
    if (result) {
        //Ret = "[DCSP_ONNX]:Model path error.Change your model path without chinese characters.";
        std::cout << Ret << std::endl;
        return Ret;
    }
    try {
        rectConfidenceThreshold = iParams.RectConfidenceThreshold;
        iouThreshold = iParams.iouThreshold;
        imgSize = iParams.imgSize;
        modelType = iParams.ModelType;
        env = Ort::Env(ORT_LOGGING_LEVEL_WARNING, "Yolo");
        Ort::SessionOptions sessionOption;
        if (iParams.CudaEnable) {
            cudaEnable = iParams.CudaEnable;
            OrtCUDAProviderOptions cudaOption;
            cudaOption.device_id = 0;
            sessionOption.AppendExecutionProvider_CUDA(cudaOption);
        }
        sessionOption.SetGraphOptimizationLevel(GraphOptimizationLevel::ORT_ENABLE_ALL);
        sessionOption.SetIntraOpNumThreads(iParams.IntraOpNumThreads);
        sessionOption.SetLogSeverityLevel(iParams.LogSeverityLevel);

#ifdef _WIN32
        int ModelPathSize = MultiByteToWideChar(CP_UTF8, 0, iParams.ModelPath.c_str(), static_cast<int>(iParams.ModelPath.length()), nullptr, 0);
        wchar_t* wide_cstr = new wchar_t[ModelPathSize + 1];
        MultiByteToWideChar(CP_UTF8, 0, iParams.ModelPath.c_str(), static_cast<int>(iParams.ModelPath.length()), wide_cstr, ModelPathSize);
        wide_cstr[ModelPathSize] = L'\0';
        const wchar_t* modelPath = wide_cstr;
#else
        const char *modelPath = iParams.ModelPath.c_str();
#endif // _WIN32

        session = new Ort::Session(env, modelPath, sessionOption);
        Ort::AllocatorWithDefaultOptions allocator;
        size_t inputNodesNum = session->GetInputCount();
        for (size_t i = 0; i < inputNodesNum; i++) {
            Ort::AllocatedStringPtr input_node_name = session->GetInputNameAllocated(i, allocator);
            char *temp_buf = new char[50];
            strcpy(temp_buf, input_node_name.get());
            inputNodeNames.push_back(temp_buf);
        }
        size_t OutputNodesNum = session->GetOutputCount();
        for (size_t i = 0; i < OutputNodesNum; i++) {
            Ort::AllocatedStringPtr output_node_name = session->GetOutputNameAllocated(i, allocator);
            char *temp_buf = new char[10];
            strcpy(temp_buf, output_node_name.get());
            outputNodeNames.push_back(temp_buf);
        }
        options = Ort::RunOptions{nullptr};
        WarmUpSession();
        return RET_OK;
    }
    catch (const std::exception &e) {
//        const char *str1 = "[DCSP_ONNX]:";
//        const char *str2 = e.what();
//        std::string result = std::string(str1) + std::string(str2);
//        char *merged = new char[result.length() + 1];
//        std::strcpy(merged, result.c_str());
//        std::cout << merged << std::endl;
//        delete[] merged;
//        return "[DCSP_ONNX]:Create session failed.";
        return 0;
    }

}


char *DCSP_CORE::RunSession(cv::Mat &iImg, std::vector<DCSP_RESULT> &oResult) {
#ifdef benchmark
    clock_t starttime_1 = clock();
#endif // benchmark

    char *Ret = RET_OK;
    cv::Mat processedImg;
    PostProcess(iImg, imgSize, processedImg);
    if (modelType < 4) {
        float *blob = new float[processedImg.total() * 3];
        BlobFromImage(processedImg, blob);
        std::vector<int64_t> inputNodeDims = {1, 3, imgSize.at(0), imgSize.at(1)};
        TensorProcess(starttime_1, iImg, blob, inputNodeDims, oResult);
    } else {
#ifdef USE_CUDA
        half* blob = new half[processedImg.total() * 3];
        BlobFromImage(processedImg, blob);
        std::vector<int64_t> inputNodeDims = { 1,3,imgSize.at(0),imgSize.at(1) };
        TensorProcess(starttime_1, iImg, blob, inputNodeDims, oResult);
#endif
    }

    return Ret;
}


template<typename N>
char *DCSP_CORE::TensorProcess(clock_t &starttime_1, cv::Mat &iImg, N &blob, std::vector<int64_t> &inputNodeDims,
                               std::vector<DCSP_RESULT> &oResult) {
    Ort::Value inputTensor = Ort::Value::CreateTensor<typename std::remove_pointer<N>::type>(
            Ort::MemoryInfo::CreateCpu(OrtDeviceAllocator, OrtMemTypeCPU), blob, 3 * imgSize.at(0) * imgSize.at(1),
            inputNodeDims.data(), inputNodeDims.size());
#ifdef benchmark
    clock_t starttime_2 = clock();
#endif // benchmark
    auto outputTensor = session->Run(options, inputNodeNames.data(), &inputTensor, 1, outputNodeNames.data(),
                                     outputNodeNames.size());
#ifdef benchmark
    clock_t starttime_3 = clock();
#endif // benchmark

    Ort::TypeInfo typeInfo = outputTensor.front().GetTypeInfo();
    auto tensor_info = typeInfo.GetTensorTypeAndShapeInfo();
    std::vector<int64_t> outputNodeDims = tensor_info.GetShape();
    auto output = outputTensor.front().GetTensorMutableData<typename std::remove_pointer<N>::type>();
    delete blob;
    switch (modelType) {
        case 1://V8_ORIGIN_FP32
        case 4://V8_ORIGIN_FP16
        {
            int strideNum = outputNodeDims[2];
            int signalResultNum = outputNodeDims[1];
            std::vector<int> class_ids;
            std::vector<float> confidences;
            std::vector<cv::Rect> boxes;

            cv::Mat rawData;
            if (modelType == 1) {
                // FP32
                rawData = cv::Mat(signalResultNum, strideNum, CV_32F, output);
            } else {
                // FP16
                rawData = cv::Mat(signalResultNum, strideNum, CV_16F, output);
                rawData.convertTo(rawData, CV_32F);
            }
            rawData = rawData.t();
            float *data = (float *) rawData.data;

            float x_factor = iImg.cols / 640.0;  //根据导出模型尺寸进行调整
            float y_factor = iImg.rows / 640.0;
            for (int i = 0; i < strideNum; ++i) {
                float *classesScores = data + 4;
                cv::Mat scores(1, this->classes.size(), CV_32FC1, classesScores);
                cv::Point class_id;
                double maxClassScore;
                cv::minMaxLoc(scores, 0, &maxClassScore, 0, &class_id);
                if (maxClassScore > rectConfidenceThreshold) {
                    confidences.push_back(maxClassScore);
                    class_ids.push_back(class_id.x);

                    float x = data[0];
                    float y = data[1];
                    float w = data[2];
                    float h = data[3];

                    int left = int((x - 0.5 * w) * x_factor);
                    int top = int((y - 0.5 * h) * y_factor);

                    int width = int(w * x_factor);
                    int height = int(h * y_factor);

                    boxes.emplace_back(left, top, width, height);
                }
                data += signalResultNum;
            }

            std::vector<int> nmsResult;
            cv::dnn::NMSBoxes(boxes, confidences, rectConfidenceThreshold, iouThreshold, nmsResult);

            for (int i = 0; i < nmsResult.size(); ++i) {
                int idx = nmsResult[i];
                DCSP_RESULT result;
                result.classId = class_ids[idx];
                result.confidence = confidences[idx];
                result.box = boxes[idx];
                oResult.push_back(result);
            }


#ifdef benchmark
            clock_t starttime_4 = clock();
            double pre_process_time = (double) (starttime_2 - starttime_1) / CLOCKS_PER_SEC * 1000;
            double process_time = (double) (starttime_3 - starttime_2) / CLOCKS_PER_SEC * 1000;
            double post_process_time = (double) (starttime_4 - starttime_3) / CLOCKS_PER_SEC * 1000;
            if (cudaEnable) {
                std::cout << "[DCSP_ONNX(CUDA)]: " << pre_process_time << "ms pre-process, " << process_time
                          << "ms inference, " << post_process_time << "ms post-process." << std::endl;
            } else {
                std::cout << "[DCSP_ONNX(CPU)]: " << pre_process_time << "ms pre-process, " << process_time
                          << "ms inference, " << post_process_time << "ms post-process." << std::endl;
            }
#endif // benchmark

            break;
        }
    }
    return RET_OK;
}


char *DCSP_CORE::WarmUpSession() {
    clock_t starttime_1 = clock();
    cv::Mat iImg = cv::Mat(cv::Size(imgSize.at(0), imgSize.at(1)), CV_8UC3);
    cv::Mat processedImg;
    PostProcess(iImg, imgSize, processedImg);
    if (modelType < 4) {
        float *blob = new float[iImg.total() * 3];
        BlobFromImage(processedImg, blob);
        std::vector<int64_t> YOLO_input_node_dims = {1, 3, imgSize.at(0), imgSize.at(1)};
        Ort::Value input_tensor = Ort::Value::CreateTensor<float>(
                Ort::MemoryInfo::CreateCpu(OrtDeviceAllocator, OrtMemTypeCPU), blob, 3 * imgSize.at(0) * imgSize.at(1),
                YOLO_input_node_dims.data(), YOLO_input_node_dims.size());
        auto output_tensors = session->Run(options, inputNodeNames.data(), &input_tensor, 1, outputNodeNames.data(),
                                           outputNodeNames.size());
        delete[] blob;
        clock_t starttime_4 = clock();
        double post_process_time = (double) (starttime_4 - starttime_1) / CLOCKS_PER_SEC * 1000;
        if (cudaEnable) {
            std::cout << "[DCSP_ONNX(CUDA)]: " << "Cuda warm-up cost " << post_process_time << " ms. " << std::endl;
        }
    } else {
#ifdef USE_CUDA
        half* blob = new half[iImg.total() * 3];
        BlobFromImage(processedImg, blob);
        std::vector<int64_t> YOLO_input_node_dims = { 1,3,imgSize.at(0),imgSize.at(1) };
        Ort::Value input_tensor = Ort::Value::CreateTensor<half>(Ort::MemoryInfo::CreateCpu(OrtDeviceAllocator, OrtMemTypeCPU), blob, 3 * imgSize.at(0) * imgSize.at(1), YOLO_input_node_dims.data(), YOLO_input_node_dims.size());
        auto output_tensors = session->Run(options, inputNodeNames.data(), &input_tensor, 1, outputNodeNames.data(), outputNodeNames.size());
        delete[] blob;
        clock_t starttime_4 = clock();
        double post_process_time = (double)(starttime_4 - starttime_1) / CLOCKS_PER_SEC * 1000;
        if (cudaEnable)
        {
            std::cout << "[DCSP_ONNX(CUDA)]: " << "Cuda warm-up cost " << post_process_time << " ms. " << std::endl;
        }
#endif
    }
    return RET_OK;
}

```

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QFileDialog>
#include <QMessageBox>
#include <QDebug>

#include <iostream>
#include <iomanip>
#include "inference.h"
#include <filesystem>
#include <fstream>
#include "inference.h"
#include <regex>

#include <opencv2/opencv.hpp>
using namespace cv;
using namespace std;

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_load_model_clicked();

    void on_load_classes_clicked();

    void on_open_btn_clicked();

    void on_detect_btn_clicked();

private:
    //void file_iterator(DCSP_CORE*& p);
    int read_coco_yaml(DCSP_CORE*& p);

    QImage MatToQImage(const cv::Mat& mat);				// MAT类型 转 QImage类型
    void display_MatInQT(QLabel* label, cv::Mat mat);	// MAT对象 QT显示

    void file_iterator(DCSP_CORE*& p, const std::string& img_path);


private:
    Ui::MainWindow *ui;

    cv::Mat image;
    std::string onnxFileNames;
    std::string imagePaths;

    std::vector<std::string> labels_txt_file{};
};
#endif // MAINWINDOW_H
```

```cmake
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

#CONFIG += c++11
CONFIG += c++17

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
    inference.cpp \
    main.cpp \
    mainwindow.cpp

HEADERS += \
    inference.h \
    mainwindow.h

FORMS += \
    mainwindow.ui

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target


# opencv-4.8.1_cuda 外部库
#win32:CONFIG(release, debug|release): LIBS += -LE:/opencv-4.8.1_cuda/lib/ -lopencv_world481
#else:win32:CONFIG(debug, debug|release): LIBS += -LE:/opencv-4.8.1_cuda/lib/ -lopencv_world481d
#else:unix: LIBS += -LE:/opencv-4.8.1_cuda/lib/ -lopencv_world481

#INCLUDEPATH += E:/opencv-4.8.1_cuda/include
#DEPENDPATH += E:/opencv-4.8.1_cuda/include



#win32:CONFIG(release, debug|release): LIBS += -LE:/onnxtuntime-1.15.1/onnxruntime-win-x64-1.15.1/lib/ -lonnxruntime
#else:win32:CONFIG(debug, debug|release): LIBS += -LE:/onnxtuntime-1.15.1/onnxruntime-win-x64-1.15.1/lib/ -lonnxruntimed
#else:unix: LIBS += -LE:/onnxtuntime-1.15.1/onnxruntime-win-x64-1.15.1/lib/ -lonnxruntime

#INCLUDEPATH += E:/onnxtuntime-1.15.1/onnxruntime-win-x64-1.15.1/include
#DEPENDPATH += E:/onnxtuntime-1.15.1/onnxruntime-win-x64-1.15.1/include



#win32:CONFIG(release, debug|release): LIBS += -LE:/onnxtuntime-1.15.1/onnxruntime-win-x64-gpu-1.15.1/lib/ -lonnxruntime
#else:win32:CONFIG(debug, debug|release): LIBS += -LE:/onnxtuntime-1.15.1/onnxruntime-win-x64-gpu-1.15.1/lib/ -lonnxruntimed
#else:unix: LIBS += -LE:/onnxtuntime-1.15.1/onnxruntime-win-x64-gpu-1.15.1/lib/ -lonnxruntime

#INCLUDEPATH += E:/onnxtuntime-1.15.1/onnxruntime-win-x64-gpu-1.15.1/include
#DEPENDPATH += E:/onnxtuntime-1.15.1/onnxruntime-win-x64-gpu-1.15.1/include

win32:CONFIG(release, debug|release): LIBS += -L$$PWD/lib/ -lonnxruntime
else:win32:CONFIG(debug, debug|release): LIBS += -L$$PWD/lib/ -lonnxruntimed
else:unix: LIBS += -L$$PWD/lib/ -lonnxruntime

INCLUDEPATH += $$PWD/include/onnxruntime
DEPENDPATH += $$PWD/include/onnxruntime


#win32:CONFIG(release, debug|release): LIBS += -L$$PWD/lib/ -lonnxruntime
#else:win32:CONFIG(debug, debug|release): LIBS += -L$$PWD/lib/ -lonnxruntimed
#else:unix: LIBS += -L$$PWD/lib/ -lonnxruntime

#INCLUDEPATH += $$PWD/include
#DEPENDPATH += $$PWD/include



win32:CONFIG(release, debug|release): LIBS += -L$$PWD/lib/ -lopencv_world481
else:win32:CONFIG(debug, debug|release): LIBS += -L$$PWD/lib/ -lopencv_world481d
else:unix: LIBS += -L$$PWD/lib/ -lopencv_world481

INCLUDEPATH += $$PWD/include/opencv
DEPENDPATH += $$PWD/include/opencv
```



**运行结果：**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725275740103-863d7743-8aa9-4fa2-accb-f9f7f7c7cd4b.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725275787663-d4be8f6c-53a7-4008-b8a6-7c9151703014.png)

## 






