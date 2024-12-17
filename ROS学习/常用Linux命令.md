# <font style="color:rgb(51, 51, 51);">安装</font>**<font style="color:rgb(51, 51, 51);">Terminator</font>**
<font style="color:rgb(51, 51, 51);">在 ROS 中，需要频繁的使用到终端，且可能需要同时开启多个窗口，推荐一款较为好用的终端:</font>**<font style="color:rgb(51, 51, 51);">Terminator。</font>**<font style="color:rgb(51, 51, 51);">效果如下:</font>

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725017301851-4ff2df6a-0186-47c1-a9f3-18abbf979531.png)



```bash
sudo apt install terminator
```

```bash
Alt+Up                          //移动到上面的终端
Alt+Down                        //移动到下面的终端
Alt+Left                        //移动到左边的终端
Alt+Right                       //移动到右边的终端
Ctrl+Shift+O                    //水平分割终端
Ctrl+Shift+E                    //垂直分割终端
```

# 安装VScode与新建工作空间
<font style="color:rgb(51, 51, 51);">vscode 下载:</font>[<font style="color:rgb(51, 51, 51);">https://code.visualstudio.com/docs?start=true</font>](https://code.visualstudio.com/docs?start=true)

<font style="color:rgb(51, 51, 51);">历史版本下载链接: </font>[<font style="color:rgb(51, 51, 51);">https://code.visualstudio.com/updates</font>](https://code.visualstudio.com/updates)

```bash
安装：sudo dpkg -i xxxx.deb
卸载：sudo dpkg --purge  code
```

```bash
mkdir -p xxx_ws/src(必须得有 src)
cd xxx_ws
catkin_make

cd xxx_ws
code .
```

```bash
快捷键 ctrl + shift + B 调用编译，选择:catkin_make:build

可以点击配置设置为默认，修改.vscode/tasks.json 文件
{
// 有关 tasks.json 格式的文档，请参见
    // https://go.microsoft.com/fwlink/?LinkId=733558
    "version": "2.0.0",
    "tasks": [
        {
            "label": "catkin_make:debug", //代表提示的描述性信息
            "type": "shell",  //可以选择shell或者process,如果是shell代码是在shell里面运行一个命令，如果是process代表作为一个进程来运行
            "command": "catkin_make",//这个是我们需要运行的命令
            "args": [],//如果需要在命令后面加一些后缀，可以写在这里，比如-DCATKIN_WHITELIST_PACKAGES=“pac1;pac2”
            "group": {"kind":"build","isDefault":true},
            "presentation": {
                "reveal": "always"//可选always或者silence，代表是否输出信息
            },
            "problemMatcher": "$msCompile"
        }
    ]
}

选定 src 右击 ---> create catkin package

设置包名 添加依赖
hellovs
roscpp rospy std_msgs

在功能包的 src 下新建 cpp 文件
hellovs_c.cpp

修改配置 CMakeLists.txt   136 行  149行
add_executable(hellovs_c src/hellovs_c.cpp)

target_link_libraries(hellovs_c
  ${catkin_LIBRARIES}
)

 ctrl + shift + B 编译成功：
-- Build files have been written to: /home/ht/vsdemo_ws/build
####
#### Running command: "make -j1 -l1" in "/home/ht/vsdemo_ws/build"
####
Scanning dependencies of target hellovs_c
[ 50%] Building CXX object hellovs/CMakeFiles/hellovs_c.dir/src/hellovs_c.cpp.o
[100%] Linking CXX executable /home/ht/vsdemo_ws/devel/lib/hellovs/hellovs_c
[100%] Built target hellovs_c

开始执行：
roscore
ht@ht-VirtualBox:~/vsdemo_ws$ source ./devel/setup.bash
ht@ht-VirtualBox:~/vsdemo_ws$ rosrun hellovs hellovs_c
[ INFO] [1712558640.803236785]: Hello VSCode!!!哈哈哈哈哈哈哈哈哈哈
ht@ht-VirtualBox:~/vsdemo_ws$ 
```

# 常用小工具命令
```bash
安装：sudo apt-get install git

git clone https://github.com/tianbot/tianracer.git -b dev
git branch命令查看当前分支，确保当前分支为dev分支
git switch dev 切换到当前分支

如果对某些文件中的代码做过修改，更新代码拉取前应先保存修改并储藏，避免修改丢失
git add .  &&  git stash
git status 查看当前工作区状态
git fetch && git pull  命令更新本地代码
git checkout raicom 切换分支
git stash pop 恢复本地修改
```

[ubuntu篇---文件压缩与解压_ubuntu压缩文件-CSDN博客](https://blog.csdn.net/m0_46825740/article/details/121416355)

```bash
# test.rar是压缩的文件名  test是要压缩的文件
rar a test.rar test
# 解压rar
rar x test.rar

压缩当前目录的内容 zip -r xxx.zip ./*
解压 unzip filename.zip

tar zxvf a.tgz -C 指定目录
# 比如将/app/a.tgz解压到  /app/b 目录
tar zxvf /app/a.tgz -C /app/b
# 比如将b 目录压缩到  a.tgz
tar czvf a.tgz b

```

```bash
鱼香一键安装 wget http://fishros.com/install -O fishros && . fishros

使用命令sudo apt-get clean清理apt缓存

官方安装ros命令
更新apt: sudo apt update
sudo apt install ros-noetic-desktop-full
配置环境变量，方便在任意 终端中使用 ROS。
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
卸载：sudo apt remove ros-noetic-*

初始化rosdep：
sudo rosdep init
rosdep update

安装gmapping建图：
sudo apt install ros-<ROS版本>-gmapping

卸载与安装rivz:
sudo apt-get purge rviz
sudo apt install ros-noetic-rviz

安装moveit:
sudo apt-get install ros-noetic-moveit
sudo apt-get install ros-noetic-moveit*
rosrun moveit_setup_assistant moveit_setup_assistant 

安装运动学插件：
sudo apt-get install ros-noetic-trac-ik-kinematics-plugin
安装摄像头驱动：
sudo apt-get install ros-noetic-usb-cam
安装摄像头标定功能包：sudo apt-get install ros-noetic-camera-calibration
安装opencv：
sudo apt-get install ros-noetic-vision-opencv libopencv-dev python-opencv
```

```bash
查看ip地址：ifconfig    windows乱码cmd是ipconfig

(base) teng@teng-virtual-machine:~/下载$ df -h
文件系统        大小  已用  可用 已用% 挂载点
tmpfs           388M  2.0M  386M    1% /run
/dev/sda3        39G   37G  411M   99% /
tmpfs           1.9G     0  1.9G    0% /dev/shm
tmpfs           5.0M  4.0K  5.0M    1% /run/lock
/dev/sda2       512M  6.1M  506M    2% /boot/efi
tmpfs           388M  1.7M  386M    1% /run/user/1000
/dev/sr0        4.7G  4.7G     0  100% /media/teng/Ubuntu 22.04.4 LTS amd64
(base) teng@teng-virtual-machine:~/下载$ 
```

```bash
tar -xvf pycharm-community-2024.1.3.tar.gz

# 然后把解压缩文件复制到家目录
mv pycharm-community-2024.1.3 ~
cd ~/pycharm-community-2024.1.3/bin
eng-virtual-machine:~/pycharm-community-2024.1.3/bin$ ls
brokenPlugins.db  jetbrains_client64.vmoptions  pycharm.png
format.sh         jetbrains_client.sh           pycharm.sh
fsnotifier        libdbm.so                     pycharm.svg
idea.properties   ltedit.sh                     repair
inspect.sh        pycharm64.vmoptions           restarter
(base) teng@teng-virtual-machine:~/pycharm-community-2024.1.3/bin$ sh ./pycharm.
```

```bash
ROS 内置了一些小程序，可以通过运行这些小程序以检测 ROS 环境是否可以正常运行

首先启动三个终端(ctrl + alt + T)

命令行1键入:roscore
命令行2键入:rosrun turtlesim turtlesim_node(此时会弹出图形化界面)
命令行3键入:rosrun turtlesim turtle_teleop_key(在3中可以通过上下左右控制2中乌龟的运动)

最终结果如下所示:   注意：光标必须聚焦在键盘控制窗口，否则无法控制乌龟运动。
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725020705973-e41f9353-6c35-4b7b-bf05-231ef2b1fd24.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725101254234-21012a3d-0f02-4533-a228-8d73223cc0db.png)

```bash
cd catkin_ws/src
catkin_create_pkg ssr_pkg rospy std_msgs
```

```bash
刷新环境变量：
source ./devel/setup.bash

为了在任意终端都可以使用某变量可以直接配置到.bashrc文件，例如：
echo "source ~/tianbot_ws/devel/setup.bash" --extend >> ~/.bashrc
否则需要每次开启终端中使用source ~/tianbot_ws/devel/setup.bash命令 来配置环境变量   

例如：echo 'export OPENAI_API_KEY=<put_your_api_key_here>' >> ~/.bashrc
可以使用文本编辑器编辑 .bashrc 文件。
	例如，使用 nano 编辑器：nano ~/.bashrc
	使用 gedit（图形界面编辑器）：gedit ~/.bashrc
gedit ~/.bashrc
export BAIDU_API_KEY='iAAoyHOHTRqaE2aAe5EkKXyG'
```

```bash
rostopic list 可以列出话题名称  rosparam list 参数列表
例如查看里程计消息：
rostopic echo /odom 
例如打印雷达消息：
ht@ht-VirtualBox:~/vsdemo02_ws$ rostopic echo /scan >> laser.text
```

```bash
python 编译前 添加可执行权限
右键scripts在集成终端打开
ht@ht-VirtualBox:~/vsdemo_ws/src/hellovs/scripts$ chmod +x *.py
ht@ht-VirtualBox:~/vsdemo_ws/src/hellovs/scripts$ ll
```

```bash
devel/lib/python3/dist-packages目录右键 在集成终端中打开    pwd 打印路径
ht@ht-VirtualBox:~/vsdemo01_ws/devel/lib/python3/dist-packages$ pwd
/home/ht/vsdemo01_ws/devel/lib/python3/dist-packages
```

```bash
滑杆ui控制运动： rosrun rqt_robot_steering rqt_robot_steering 

键盘控制节点 :
rosrun teleop_twist_keyboard teleop_twist_keyboard.py
```

```bash
执行tf树 理清父子关系
rosrun rqt_tf_tree rqt_tf_tree
或者rqt_graph
```

```bash
启动参数调节器(动态调节参数) rosrun rqt_reconfigure rqt_reconfigure
或者 rqt
```

```bash
查看插件是否已安装： rospack plugins --attrib=plugin nav_core
```

```bash
在 ROS 中，提供了一些工具来方便 URDF 文件的编写，比如:

1、check_urdf命令可以检查复杂的 urdf 文件是否存在语法问题
ht@ht-VirtualBox:~/vsdemo02_ws/src/urdf01_rviz/urdf/urdf$ check_urdf demo05_test.urdf 
robot name is: mycar
---------- Successfully Parsed XML ---------------
root Link: base_footprint has 1 child(ren)
    child(1):  base_link
        child(1):  back_wheel
        child(2):  font_wheel
        child(3):  left_wheel
        child(4):  right_wheel
ht@ht-VirtualBox:~/vsdemo02_ws/src/urdf01_rviz/urdf/urdf$ 

2、urdf_to_graphiz命令可以查看 urdf 模型结构，显示不同 link 的层级关系
ht@ht-VirtualBox:~/vsdemo02_ws/src/urdf01_rviz/urdf/urdf$ urdf_to_graphiz demo05_test.urdf
Created file mycar.gv
Created file mycar.pdf
ht@ht-VirtualBox:~/vsdemo02_ws/src/urdf01_rviz/urdf/urdf$ 
查看生成的pdf文件 ht@ht-VirtualBox:~/vsdemo02_ws/src/urdf01_rviz/urdf/urdf$ evince mycar.pdf

当然，要使用工具之前，首先需要安装，安装命令:sudo apt install liburdfdom-tools

xacro格式文件转换urdf格式文件：
ht@ht-VirtualBox:~/vsdemo02_ws/src/urdf01_rviz/urdf/xacro$ rosrun xacro xacro demo01_helloworld.urdf.xacro > demo01_helloworld.urdf
ht@ht-VirtualBox:~/vsdemo02_ws/src/urdf01_rviz/urdf/xacro$    生成urdf文件
```

