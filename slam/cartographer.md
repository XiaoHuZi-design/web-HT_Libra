# 资料

数据包保存方法：[ROS入门：保存和回放数据（bag文件的使用） - 北极星！ - 博客园](https://www.cnblogs.com/zhjblogs/p/16512501.html)

镜像下载：https://releases.ubuntu.com/18.04/

[阿里巴巴开源镜像站-OPSX镜像站-阿里云开发者社区](https://developer.aliyun.com/mirror/?spm=a2c6h.265751.1364563.38.728e2621iHKW48)

鱼香Ros一键安装:

```bash
wget http://fishros.com/install -O fishros && . fishros
```

**链接：**https://pan.baidu.com/s/1q9f5aNTfrbpFpwGCwD6E4A

**提取码：**slam

vmware虚拟机双向复制粘贴：

```bash
sudo apt-get install open-vm-tools
sudo apt-get install open-vm-tools-desktop
sudo reboot
```



# 安装cartographer

系统环境 ubantu18.04

*提前安装好ros*

第一步，首先下载安装包，解压放到合适位置，

![image-20241223201724205](assets\cartography安装包.png)

第二步，右键打开终端运行下列命令安装依赖，

```bash
ht_llibra@ht-llibra:~/cartographer_install$ ll
总用量 28
drwxrwxr-x  6 ht_llibra ht_llibra 4096 6月  13  2021 ./
drwxr-xr-x 16 ht_llibra ht_llibra 4096 12月 23 20:06 ../
drwxrwxr-x  6 ht_llibra ht_llibra 4096 6月  13  2021 abseil-cpp/
-rwxrwxr-x  1 ht_llibra ht_llibra 1395 6月  13  2021 auto-carto-build.sh*
drwxrwxr-x 11 ht_llibra ht_llibra 4096 4月  21  2021 cartographer/
drwxrwxr-x 11 ht_llibra ht_llibra 4096 6月  13  2021 ceres-solver/
drwxrwxr-x 22 ht_llibra ht_llibra 4096 6月   7  2021 protobuf/
ht_llibra@ht-llibra:~/cartographer_install$ chmod +x auto-carto-build.sh
ht_llibra@ht-llibra:~/cartographer_install$ ./auto-carto-build.sh

```

```bash
ht_llibra@ht-llibra:~/cartographer_install$ ./auto-carto-build.sh
[sudo] ht_llibra 的密码： 
正在读取软件包列表... 完成
正在分析软件包的依赖关系树       
正在读取状态信息... 完成       
lsb-release 已经是最新版 (9.20170808ubuntu1)。
lsb-release 已设置为手动安装。
google-mock 已经是最新版 (1.8.0-6)。
google-mock 已设置为手动安装。
libboost-all-dev 已经是最新版 (1.65.1.0ubuntu1)。
libboost-all-dev 已设置为手动安装。
libeigen3-dev 已经是最新版 (3.3.4-4)。
libeigen3-dev 已设置为手动安装。
cmake 已经是最新版 (3.10.2-1ubuntu2.18.04.2)。
cmake 已设置为手动安装。
g++ 已经是最新版 (4:7.4.0-1ubuntu2.3)。
g++ 已设置为手动安装。
libcairo2-dev 已经是最新版 (1.15.10-2ubuntu0.1)。
libcairo2-dev 已设置为手动安装。
libcurl4-openssl-dev 已经是最新版 (7.58.0-2ubuntu3.24)。
libcurl4-openssl-dev 已设置为手动安装。
python-rosdep 已经是最新版 (0.23.1-1)。
将会同时安装下列软件：
  bzr clang-6.0 git-man lib32gcc1 lib32stdc++6 libamd2 libatlas3-base libbtf1
  libc6-i386 libcamd2 libccolamd2 libcholmod3 libclang-common-6.0-dev
  libclang1-6.0 libcxsparse3 liberror-perl libffi-dev libgflags2.2
  libgoogle-glog0v5 libgraphblas1 libklu1 libldl2 liblua5.2-0 libmetis5
  libncurses5 libncursesw5 libobjc-7-dev libobjc4 libomp-dev libomp5 librbio2
  libreadline-dev libserf-1-1 libspqr2 libsvn1 libtinfo-dev libtinfo5
  libtool-bin libumfpack5 llvm-6.0 llvm-6.0-dev llvm-6.0-runtime mercurial
  mercurial-common python-alabaster python-babel python-babel-localedata
  python-bzrlib python-certifi python-configobj python-crypto python-httplib2
  python-imagesize python-jinja2 python-keyring python-keyrings.alt
  python-launchpadlib python-lazr.restfulclient python-lazr.uri
  python-markupsafe python-oauth python-requests python-secretstorage
  python-simplejson python-typing python-urllib3 python-vcstools
  python-wadllib sphinx-common subversion
建议安装：
  bzr-doc bzrtools python-bzrlib.tests gnustep gnustep-devel clang-6.0-doc
  git-daemon-run | git-daemon-sysvinit git-doc git-el git-email git-gui gitk
  gitweb git-cvs git-mediawiki git-svn libatlas-doc liblapack-doc libomp-doc
  readline-doc llvm-6.0-doc kdiff3 | kdiff3-qt | kompare | meld | tkcvs
  | mgdiff qct python-mysqldb python-bzrlib-dbg python-kerberos python-pycurl
  python-configobj-doc python-crypto-doc python-jinja2-doc libkf5wallet-bin
  gir1.2-gnomekeyring-1.0 python-fs python-gdata python-keyczar
  python-testresources python-socks python-secretstorage-doc
  python-sphinx-rtd-theme libjs-mathjax dvipng texlive-latex-recommended
  texlive-latex-extra texlive-fonts-recommended texlive-generic-extra latexmk
  sphinx-doc python-ntlm doc-base db5.3-util libapache2-mod-svn
  subversion-tools
下列【新】软件包将被安装：
  bzr clang clang-6.0 git git-man lib32gcc1 lib32stdc++6 libamd2
  libatlas-base-dev libatlas3-base libbtf1 libc6-i386 libcamd2 libccolamd2
  libcholmod3 libclang-common-6.0-dev libclang1-6.0 libcxsparse3 liberror-perl
  libffi-dev libgflags-dev libgflags2.2 libgoogle-glog-dev libgoogle-glog0v5
  libgraphblas1 libklu1 libldl2 liblua5.2-0 liblua5.2-dev libmetis5
  libobjc-7-dev libobjc4 libomp-dev libomp5 librbio2 libreadline-dev
  libserf-1-1 libspqr2 libsuitesparse-dev libsvn1 libtinfo-dev libtool-bin
  libumfpack5 llvm-6.0 llvm-6.0-dev llvm-6.0-runtime mercurial
  mercurial-common ninja-build python-alabaster python-babel
  python-babel-localedata python-bzrlib python-certifi python-configobj
  python-crypto python-httplib2 python-imagesize python-jinja2 python-keyring
  python-keyrings.alt python-launchpadlib python-lazr.restfulclient
  python-lazr.uri python-markupsafe python-oauth python-requests
  python-secretstorage python-simplejson python-sphinx python-typing
  python-urllib3 python-vcstools python-wadllib python-wstool sphinx-common
  stow subversion
下列软件包将被升级：
  libncurses5 libncursesw5 libtinfo5
升级了 3 个软件包，新安装了 78 个软件包，要卸载 0 个软件包，有 266 个软件包未被升级。
需要下载 79.1 MB/79.4 MB 的归档。
解压缩后会消耗 470 MB 的额外空间。
您希望继续执行吗？ [Y/n] 

```

![image-20241224141153933](assets\error.png)

**没有报红，不出意外顺利安装！** 这里出意外了... ...

![image-20241223212023449](assets\image-20241223212023449.png)

下面看一下auto-carto-build.sh安装脚本，

```sh
#!/bin/bash

# Install the required libraries that are available as debs.
# sudo apt-get update
sudo apt-get install \
    clang \
    cmake \
    g++ \
    git \
    google-mock \
    libboost-all-dev \
    libcairo2-dev \
    libcurl4-openssl-dev \
    libeigen3-dev \
    libgflags-dev \
    libgoogle-glog-dev \
    liblua5.2-dev \
    libsuitesparse-dev \
    lsb-release \
    ninja-build \
    stow \
    python-wstool \
    python-rosdep \
	python-sphinx \
	libatlas-base-dev



# Build and install abseil-cpp
set -o errexit
set -o verbose

cd abseil-cpp
git checkout d902eb869bcfacc1bad14933ed9af4bed006d481
mkdir build
cd build
cmake -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
  -DCMAKE_INSTALL_PREFIX=/usr/local/stow/absl \
  ..
ninja
sudo ninja install
cd /usr/local/stow
sudo stow absl


# Build and install Ceres.
cd -
cd ../../ceres-solver
mkdir build
cd build
cmake .. -G Ninja -DCXX11=ON
ninja
#CTEST_OUTPUT_ON_FAILURE=1 ninja test
sudo ninja install


# Build and install proto3.
cd ../../protobuf
mkdir build
cd build
cmake -G Ninja \
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
  -DCMAKE_BUILD_TYPE=Release \
  -Dprotobuf_BUILD_TESTS=OFF \
  ../cmake
ninja
sudo ninja install


# Build and install Cartographer.
cd ../../cartographer
mkdir build
cd build
cmake .. -G Ninja
ninja
#CTEST_OUTPUT_ON_FAILURE=1 ninja test
sudo ninja install

```



**下载cartography注释后的源码**

https://github.com/xiangli0608/cartographer_detailed_comments_ws

```bash
ht_llibra@ht-llibra:~$ mkdir carto_ws
ht_llibra@ht-llibra:~$ cd carto_ws/
ht_llibra@ht-llibra:~/carto_ws$ git clone https://github.com/xiangli0608/cartographer_detailed_comments_ws.git
正克隆到 'cartographer_detailed_comments_ws'...
remote: Enumerating objects: 3041, done.
remote: Counting objects: 100% (1360/1360), done.
remote: Compressing objects: 100% (250/250), done.
remote: Total 3041 (delta 1218), reused 1110 (delta 1110), pack-reused 1681 (from 1)
接收对象中: 100% (3041/3041), 15.31 MiB | 2.48 MiB/s, 完成.
处理 delta 中: 100% (2120/2120), 完成.
ht_llibra@ht-llibra:~/carto_ws$ 

```

```bash
ht_llibra@ht-llibra:~/carto_ws$ ls
cartographer_detailed_comments_ws
ht_llibra@ht-llibra:~/carto_ws$ cd cartographer_detailed_comments_ws/
ht_llibra@ht-llibra:~/carto_ws/cartographer_detailed_comments_ws$ ls
catkin_make.sh     finish_slam_3d.sh  rm_build.sh
finish_slam_2d.sh  README.md          src
ht_llibra@ht-llibra:~/carto_ws/cartographer_detailed_comments_ws$ ll
总用量 48
drwxrwxr-x 5 ht_llibra ht_llibra 4096 12月 24 10:14 ./
drwxrwxr-x 3 ht_llibra ht_llibra 4096 12月 24 10:14 ../
-rwxrwxr-x 1 ht_llibra ht_llibra  174 12月 24 10:14 catkin_make.sh*
-rw-rw-r-- 1 ht_llibra ht_llibra   98 12月 24 10:14 .catkin_workspace
-rwxrwxr-x 1 ht_llibra ht_llibra  567 12月 24 10:14 finish_slam_2d.sh*
-rwxrwxr-x 1 ht_llibra ht_llibra  406 12月 24 10:14 finish_slam_3d.sh*
drwxrwxr-x 8 ht_llibra ht_llibra 4096 12月 24 10:14 .git/
-rw-rw-r-- 1 ht_llibra ht_llibra   85 12月 24 10:14 .gitignore
-rw-rw-r-- 1 ht_llibra ht_llibra 3832 12月 24 10:14 README.md
-rwxrwxr-x 1 ht_llibra ht_llibra   67 12月 24 10:14 rm_build.sh*
drwxrwxr-x 4 ht_llibra ht_llibra 4096 12月 24 10:14 src/
drwxrwxr-x 2 ht_llibra ht_llibra 4096 12月 24 10:14 .vscode/
ht_llibra@ht-llibra:~/carto_ws/cartographer_detailed_comments_ws$ 

```

**下面编译**

```bash
ht_llibra@ht-llibra:~/carto_ws/cartographer_detailed_comments_ws$ ./catkin_make.sh
```

**报错！**

```
CMake Error at CMakeLists.txt:39 (find_package):
  By not providing "FindCeres.cmake" in CMAKE_MODULE_PATH this project has
  asked CMake to find a package configuration file provided by "Ceres", but
  CMake did not find one.

  Could not find a package configuration file provided by "Ceres" with any of
  the following names:

    CeresConfig.cmake
    ceres-config.cmake

  Add the installation prefix of "Ceres" to CMAKE_PREFIX_PATH or set
  "Ceres_DIR" to a directory containing one of the above files.  If "Ceres"
  provides a separate development package or SDK, be sure it has been
  installed.


-- Configuring incomplete, errors occurred!
See also "/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/build_isolated/cartographer/install/CMakeFiles/CMakeOutput.log".
See also "/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/build_isolated/cartographer/install/CMakeFiles/CMakeError.log".
<== Failed to process package 'cartographer': 
  Command '['cmake', '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/src/cartographer', '-DCMAKE_INSTALL_PREFIX=/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated', '-G', 'Ninja']' returned non-zero exit status 1

Reproduce this error by running:
==> cd /home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/build_isolated/cartographer && cmake /home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/src/cartographer -DCMAKE_INSTALL_PREFIX=/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated -G Ninja

Command failed, exiting.
./catkin_make.sh: 行 8: install_isolated/setup.bash: 没有那个文件或目录
ht_llibra@ht-llibra:~/carto_ws/cartographer_detailed_comments_ws$ 

```

可能是前面依赖项没安装好... ...

没解决好，可能是虚拟机的问题！

------------------------------------------------------------------------------------------------------

**其他方法可用**

下图为之前在另一个虚拟机ubantu20.04，用的另一种教程编译的，可以用

![image-20241224112258022](assets\image-20241224112258022.png)

![image-20241224112454630](assets\image-20241224112454630.png)



另外鱼香ROS也可以一键安装cartography，ubantu20.04双系统尝试可用

------------------------------------------------------------------------------------------------------

鱼香一键也报错，不知道啥原因...

```bash
Run CMD Task:[catkin_make_isolated --install --use-ninja]
[-][0.00s] CMD Result:code:127                                              

Run CMD Task:[sudo chmod -R 777 cartographer_ws]
[-][0.00s] CMD Result:success                                               

欢迎加入机器人学习交流QQ群：438144612(入群口令：一键安装)
鱼香小铺正式开业，最低499可入手一台能建图会导航的移动机器人，淘宝搜店：鱼香ROS 或打开链接查看：https://item.taobao.com/item.htm?id=696573635888
如在使用过程中遇到问题，请打开：https://fishros.org.cn/forum 进行反馈

检测到本次运行出现失败命令,直接退出按Ctrl+C,按任意键上传日志并退出
^Cbash: /home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/setup.bash: 没有那个文件或目录

```



工作空间检查依赖

```bash
rosdepc init
rosdepc update
rosdepc install --from-paths src -y --ignore-src
```

---



**找到原因了**，

我整个电脑只有10个内核，虚拟机我设置了8个，然后编译默认用满，所以虚拟机直接崩了。

需要改小点，改成4线程就可以

![image-20241224145312074](assets\修改内核线程.png)

![image-20241224145654757](assets\image-20241224145654757.png)

从源头解决问题，咱用的虚拟机，重新设置一下，

![image-20241224151320970](assets\虚拟机线程设置.png)

---

**编译源码的方式使用carto**

首先在carto_ws下新建工作空间

![image-20241224150332973](assets\image-20241224150332973.png)

然后把cartographer_detailed_comments_ws里的cartographer_ros文件夹复制到src目录，

![image-20241224150450684](assets\image-20241224150450684.png)

在工作空间编译一下，

```bash
catkin_make
```

![image-20241224151838035](assets\image-20241224151838035.png)

编译成功。

---

# 运行cartographer

设置全局环境变量，避免每次都source，

```bash
source ~/carto_ws/cartographer_detailed_comments_ws/install_isolated/setup.bash
```

下载数据集

![image-20241224152143988](assets\数据集.png)

将三个数据集解压放于下图位置，

![image-20241224153010196](assets\image-20241224153010196.png)



### **二维建图**

```bash
source install_isolated/setup.bash
rospack profile //执行这个是为了避免找不到launch
roslaunch cartographer_ros lx_rs16_2d_outdoor.launch
```

![image-20241224153425255](assets\rospack_profile.png)

![image-20241224154635215](assets\数据包1.png)

这里两个红色报错是正常的，不影响，和每个人的电脑配置有关，

![image-20241224185001913](assets\image-20241224185001913.png)

整个地图由这些子图叠加而成。

lx_rs16_2d_outdoor.launch代码：

```xml
注意xml网页显示，需要把 尖括号 改成 &lt;和&gt;
```

```xml
&lt;launch&gt;
  &lt;!-- bag的地址与名称 --&gt;
  &lt;arg name="bag_filename" default="$(env HOME)/bagfiles/rslidar-outdoor-gps-notf.bag"/&gt;

  &lt;!-- 使用bag的时间戳 --&gt;
  &lt;param name="/use_sim_time" value="true" /&gt;

  &lt;!-- 启动cartographer --&gt;
  &lt;node name="cartographer_node" pkg="cartographer_ros"
      type="cartographer_node" args="
          -configuration_directory $(find cartographer_ros)/configuration_files
          -configuration_basename lx_rs16_2d_outdoor.lua"
      output="screen"&gt;
    &lt;remap from="points2" to="rslidar_points" /&gt;
    &lt;remap from="scan" to="front_scan" /&gt;
    &lt;remap from="odom" to="odom_scout" /&gt;
    &lt;remap from="imu" to="imu" /&gt;
  &lt;/node&gt;

  &lt;!-- 生成ros格式的地图 --&gt;
  &lt;node name="cartographer_occupancy_grid_node" pkg="cartographer_ros"
      type="cartographer_occupancy_grid_node" args="-resolution 0.05" /&gt;

  &lt;!-- 启动rviz --&gt;
  &lt;node name="rviz" pkg="rviz" type="rviz" required="true"
      args="-d $(find cartographer_ros)/configuration_files/lx_2d.rviz" /&gt;

  &lt;!-- 启动rosbag --&gt;
  &lt;node name="playbag" pkg="rosbag" type="play"
      args="--clock $(arg bag_filename)" /&gt;
&lt;/launch&gt;
```



**安装vscode开发环境**

```
ht_llibra@ht-llibra:~/下载$ sudo dpkg -i code_1.96.2-1734607745_amd64.deb
[sudo] ht_llibra 的密码： 
正在选中未选择的软件包 code。
(正在读取数据库 ... 系统当前共安装有 255918 个文件和目录。)
正准备解包 code_1.96.2-1734607745_amd64.deb  ...
正在解包 code (1.96.2-1734607745) ...
dpkg: 依赖关系问题使得 code 的配置工作不能继续：
 code 依赖于 libc6 (>= 2.28)；然而：
系统中 libc6:amd64 的版本为 2.27-3ubuntu1.6。
 code 依赖于 libxkbfile1 (>= 1:1.1.0)；然而：
系统中 libxkbfile1:amd64 的版本为 1:1.0.9-2。

dpkg: 处理软件包 code (--install)时出错：
 依赖关系问题 - 仍未被配置
正在处理用于 gnome-menus (3.13.3-11ubuntu1.1) 的触发器 ...
正在处理用于 desktop-file-utils (0.23-1ubuntu3.18.04.2) 的触发器 ...
正在处理用于 mime-support (3.60ubuntu1) 的触发器 ...
正在处理用于 shared-mime-info (1.9-2) 的触发器 ...
在处理时有错误发生：
 code
ht_llibra@ht-llibra:~/下载$ 
```

大概版本太高了。

```bash
ht_llibra@ht-llibra:~/下载$ sudo dpkg -i code_1.75.1-1675893397_amd64.deb
[sudo] ht_llibra 的密码： 
dpkg: 警告: 即将把 code 从 1.86.2-1707854558 降级到 1.75.1-1675893397
(正在读取数据库 ... 系统当前共安装有 257363 个文件和目录。)
正准备解包 code_1.75.1-1675893397_amd64.deb  ...
正在将 code (1.75.1-1675893397) 解包到 (1.86.2-1707854558) 上 ...
正在设置 code (1.75.1-1675893397) ...
gpg: WARNING: unsafe ownership on homedir '/home/ht_llibra/.gnupg'
正在处理用于 gnome-menus (3.13.3-11ubuntu1.1) 的触发器 ...
正在处理用于 desktop-file-utils (0.23-1ubuntu3.18.04.2) 的触发器 ...
正在处理用于 mime-support (3.60ubuntu1) 的触发器 ...
正在处理用于 shared-mime-info (1.9-2) 的触发器 ...
ht_llibra@ht-llibra:~/下载$ 
```

![image-20241224172411993](assets\image-20241224172411993.png)

安装成功。



**建好地图后保存**，

先安装一下地图服务，

```
sudo apt-get install ros-melodic-map-server
```

再执行命令，

```
rosrun map_server map_saver
```

默认保存在当前目录。

![image-20241224174056993](assets\image-20241224174056993.png)

![image-20241224173938281](assets\数据包1地图.png)

![image-20241224174146899](assets\image-20241224174146899.png)

另一种方法，执行finish_slam_2d.sh脚本，

![image-20241224174355480](assets\image-20241224174355480.png)

```sh
#!/bin/bash

source install_isolated/setup.bash

map_dir="${HOME}/carto_ws/map"  # 文件保存路径
map_name="2d-1"   

# 检查文件夹是否存在, 如果不存在就创建文件夹
if [ ! -d "$map_dir" ];then
  echo "文件夹不存在, 正在创建文件夹"
  mkdir -p $map_dir
fi


# finish slam
rosservice call /finish_trajectory 0

# make pbstream     生成2d-1.pbstream
rosservice call /write_state "{filename: '$map_dir/$map_name.pbstream'}"

# pbstream to map   生成2d-1.pgm和2d-1.yaml
rosrun cartographer_ros cartographer_pbstream_to_ros_map \
-pbstream_filename=$map_dir/$map_name.pbstream \
-map_filestem=$map_dir/$map_name
```

![image-20241224175102107](assets\image-20241224175102107.png)

![image-20241224175155202](assets\image-20241224175155202.png)

![image-20241224184414614](assets\image-20241224184414614.png)



### **纯定位模式**

```bash
 roslaunch cartographer_ros lx_rs16_2d_outdoor_localization.launch 
```

![image-20241224190410622](assets\纯定位模式.png)

这时候已经有了第一次建图的一个轨迹和地图

lx_rs16_2d_outdoor_localization.launch文件：

```xml
&lt;launch&gt;
  &lt;!-- bag的地址与名称 --&gt;
  &lt;arg name="bag_filename" default="$(env HOME)/bagfiles/rslidar-outdoor-gps-notf.bag"/&gt;
  &lt;!-- pbstream的地址与名称 --&gt;
  &lt;arg name="load_state_filename" default="$(env HOME)/carto_ws/map/2d-1.pbstream"/&gt;

  &lt;!-- 使用bag的时间戳 --&gt;
  &lt;param name="/use_sim_time" value="true" /&gt;

  &lt;!-- 启动cartographer --&gt;
  &lt;node name="cartographer_node" pkg="cartographer_ros"
      type="cartographer_node" args="
          -configuration_directory $(find cartographer_ros)/configuration_files
          -configuration_basename lx_rs16_2d_outdoor_localization.lua
          -load_state_filename $(arg load_state_filename)"
      output="screen"&gt;
    &lt;remap from="points2" to="rslidar_points" /&gt;
    &lt;remap from="scan" to="front_scan" /&gt;
    &lt;remap from="odom" to="odom_scout" /&gt;
    &lt;remap from="imu" to="imu" /&gt;
  &lt;/node&gt;

  &lt;!-- 启动map_server --&gt;
  &lt;!-- 
  &lt;node name="map_server" pkg="map_server" type="map_server"
      args="$(env HOME)/carto_ws/map/2d-1.yaml" /&gt; 
  --&gt;

  &lt;!-- 启动rviz --&gt;
  &lt;node name="rviz" pkg="rviz" type="rviz" required="true"
      args="-d $(find cartographer_ros)/configuration_files/demo_2d.rviz" /&gt;

  &lt;!-- 启动rosbag --&gt;
  &lt;node name="playbag" pkg="rosbag" type="play"
      args="--clock $(arg bag_filename)" /&gt;
&lt;/launch&gt;
```

在进行纯定位时，没有启动这样一个代码，就是没有生成map这个topic的地图，

![image-20241224191856343](assets\子图.png)

区别：![image-20241224192527591](assets\2d建图和纯定位.png)

由于纯定位模式，默认配置是只保存三个子图啊，所以在这儿就最多只有三个子图，

![image-20241224194152116](assets\纯定位默认子图.png)

（不知道为啥我跑的在3个四个反复跳）

![image-20241224195233333](assets\纯定位子图配置.png)

然后我们看一下，通过rose topic list来可以获取到所有的topic的名字。

```bash
ht_llibra@ht-llibra:~$ rostopic list
/clicked_point
/clock
/constraint_list
/imu
/initialpose
/landmark_poses_list
/move_base_simple/goal
/rosout
/rosout_agg
/rslidar_points
/scan_matched_points2
/submap_list
/tf
/tf_static
/trajectory_node_list
```

可以发现没有map这个话题。

**为什么纯定位模式，没有去起这么一个节点呢？**

*由于一个历史原因，之前起了这个节点之后，很多人说在进行纯定位定位的时候，这个地图总是在变化的，这一变化则在进行导航时肯定会有问题，所以怎么不让地图发送变化呢？*

就是不起这个cartographer_occupancy_grid_node节点。

那如果想导航那该怎么办呢？把map_server这段**注释打开**，

```xml
&lt;!-- 启动map_server --&gt;
&lt;!-- 
  &lt;node name="map_server" pkg="map_server" type="map_server"
      args="$(env HOME)/carto_ws/map/2d-1.yaml" /&gt; 
--&gt;
```

由于改了launch文件，这里需要编译一下，

```bash
ht_llibra@ht-llibra:~$ cd carto_ws/cartographer_detailed_comments_ws/
ht_llibra@ht-llibra:~/carto_ws/cartographer_detailed_comments_ws$ ./catkin_make.sh 
```

这时候再执行纯定位的launch，然后rostopic list发现就有/map话题了，

![image-20241224200024055](assets\image-20241224200024055.png)

看一下/map这个topic是谁发的，

```bash
ht_llibra@ht-llibra:~$ rostopic info /map
Type: nav_msgs/OccupancyGrid

Publishers: 
 * /map_server (http://ht-llibra:42401/)

Subscribers: None

```

可以看到是map_server发的，

这有什么区别呢? 接下来咱把Submaps给关掉，添加一个显示地图的插件，添加一下/map这个topic，

![image-20241224200645328](assets\image-20241224200645328.png)

Alpha改为1会更白一些，可以发现这回地图是没有变化的，

![image-20241224201015872](assets\纯定位map话题.png)

这个时候我们把Map取消，定义Submaps，会发现Submaps还是变化的（我的是没变化的，但看的视频在变换...）。



### **三维建图**

```bash
roslaunch cartographer_ros lx_rs16_3d.launch
```

不知道为啥报错！大概是内存越界或缓冲区溢出或者rviz版本问题...虚拟机还是不太行!

```bash
 ht_llibra@ht-llibra:~$ roslaunch cartographer_ros lx_rs16_3d.launch
... logging to /home/ht_llibra/.ros/log/8723e8b8-c1f1-11ef-aa04-000c29a9653a/roslaunch-ht-llibra-21351.log
Checking log directory for disk usage. This may take a while.
Press Ctrl-C to interrupt
Done checking log file disk usage. Usage is <1GB.

started roslaunch server http://ht-llibra:32869/

SUMMARY
========

PARAMETERS
 * /rosdistro: melodic
 * /rosversion: 1.14.13
 * /use_sim_time: True

NODES
  /
    cartographer_node (cartographer_ros/cartographer_node)
    playbag (rosbag/play)
    rviz (rviz/rviz)

auto-starting new master
process[master]: started with pid [21361]
ROS_MASTER_URI=http://localhost:11311

setting /run_id to 8723e8b8-c1f1-11ef-aa04-000c29a9653a
process[rosout-1]: started with pid [21372]
started core service [/rosout]
process[cartographer_node-2]: started with pid [21375]
process[rviz-3]: started with pid [21376]
process[playbag-4]: started with pid [21377]
[ INFO] [1735042857.615601133]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer_ros/configuration_files/lx_rs16_3d.lua' for 'lx_rs16_3d.lua'.
[ INFO] [1735042857.617167102]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/map_builder.lua' for 'map_builder.lua'.
[ INFO] [1735042857.617224705]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/map_builder.lua' for 'map_builder.lua'.
[ INFO] [1735042857.617282517]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/pose_graph.lua' for 'pose_graph.lua'.
[ INFO] [1735042857.617360503]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/pose_graph.lua' for 'pose_graph.lua'.
[ INFO] [1735042857.617586498]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/trajectory_builder.lua' for 'trajectory_builder.lua'.
[ INFO] [1735042857.617619361]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/trajectory_builder.lua' for 'trajectory_builder.lua'.
[ INFO] [1735042857.617722587]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/trajectory_builder_2d.lua' for 'trajectory_builder_2d.lua'.
[ INFO] [1735042857.617752077]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/trajectory_builder_2d.lua' for 'trajectory_builder_2d.lua'.
[ INFO] [1735042857.617928403]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/trajectory_builder_3d.lua' for 'trajectory_builder_3d.lua'.
[ INFO] [1735042857.617960107]: I1224 20:20:57.000000 21375 configuration_file_resolver.cc:53] Found '/home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer/configuration_files/trajectory_builder_3d.lua' for 'trajectory_builder_3d.lua'.
[ INFO] [1735042857.629688818]: I1224 20:20:57.000000 21375 map_builder_bridge.cc:156] Added trajectory with ID '0'.
[ INFO] [1735042857.951415750, 1606808649.538669897]: I1224 20:20:57.000000 21375 ordered_multi_queue.cc:265] All sensor data for trajectory 0 is available starting at '637424054495384530'.
[ INFO] [1735042857.973989186, 1606808649.559946144]: I1224 20:20:57.000000 21375 pose_graph_3d.cc:136] Inserted submap (0, 0).
*** stack smashing detected ***: <unknown> terminated
================================================================================REQUIRED process [rviz-3] has died!
process has died [pid 21376, exit code -6, cmd /opt/ros/melodic/lib/rviz/rviz -d /home/ht_llibra/carto_ws/cartographer_detailed_comments_ws/install_isolated/share/cartographer_ros/configuration_files/lx_3d.rviz __name:=rviz __log:=/home/ht_llibra/.ros/log/8723e8b8-c1f1-11ef-aa04-000c29a9653a/rviz-3.log].
log file: /home/ht_llibra/.ros/log/8723e8b8-c1f1-11ef-aa04-000c29a9653a/rviz-3*.log
Initiating shutdown!
================================================================================
[playbag-4] killing on exit
[rviz-3] killing on exit
[cartographer_node-2] killing on exit
F1224 20:21:01.074517 21395 problem_impl.cc:635] Parameter block not found: 0x7f34f4000e00. You must add the parameter block to the problem before you can set a lower bound on one of its components.
*** Check failure stack trace: ***
    @     0x7f35331680cd  google::LogMessage::Fail()
    @     0x7f3533169f33  google::LogMessage::SendToLog()
    @     0x7f3533167c28  google::LogMessage::Flush()
    @     0x7f353316a999  google::LogMessageFatal::~LogMessageFatal()
    @     0x7f35334cc1bc  ceres::internal::ProblemImpl::SetParameterLowerBound()
    @     0x5620575a79d6  (unknown)
    @     0x56205755b5a0  (unknown)
    @     0x56205755c008  (unknown)
    @     0x56205757f0d4  (unknown)
    @     0x5620575f05e1  (unknown)
    @     0x562057514f7c  (unknown)
    @     0x7f3530af66df  (unknown)
    @     0x7f35323756db  start_thread
    @     0x7f35301b361f  clone
[rosout-1] killing on exit
[master] killing on exit
shutting down processing monitor...
... shutting down processing monitor complete
done

```



**！！！！！！！！！！！！！！！！！！！！！！！**

可显示实时三维点云地图（报错打不开暂时没实现），

![image-20241224203153138](assets\截图.png)



保存3D地图，执行工作空间里的finish_slam_3s.sh，

![image-20241224203717459](assets\image-20241224203717459.png)



### 2d栅格地图和3d点云地图

![image-20241224204631363](assets\image-20241224204631363.png)

**2D栅格地图**

```bash
roslaunch cartographer_ros assets_writer_2d.launch
```

![image-20241224204735173](assets\image-20241224204735173.png)

目的是根据与pbstream文件和之前的bag文件来再生成一个map.pgm的地图图片，会在map文件夹

![image-20241224205020351](assets\image-20241224205020351.png)

![image-20241224205334692](assets\image-20241224205334692.png)

可以看到最终生成的地图如上，由于是多线16线点云，还有打到地面上的点也一并生成了地图，所以这样这种方式生成的地图不可用。



**3d点云地图**

```bash
roslaunch cartographer_ros assets_writer_3d.launch
```

由于前面3d建图rviz打开失败没有成功生成3d-1.pbstream文件，所以这里也用不了。

正常处理完后会生成b3-1.pcd，

可视化3D点云地图，

```bash
sudo apt-get install pcl-tools
```

```
pcl_viewer b3-1.pcd
```

![image-20241224220041096](assets\临时1.png)

按一下4，会自动按照不同的高度来进行着色，

![image-20241224220146126](assets\临时2.png)



下面看看2d和3d的lua文件分别是怎么设置的，

![image-20241224210658311](assets\2d3dlua.png)



### landmark使用示例

**执行一下landmarks_demo_uncalibrated.bag**

```bash
roslaunch cartographer_ros landmark_mir_100.launch
```

![image-20241225133029784](assets\landmarks1.png)

![image-20241225133218600](assets\landmarks1放大版.png)

在views栏（没有就点击panels-->views）可以转换一下视角，可以看到一些小球，就是landmarks的一个可视化，

![image-20241225133511764](assets\landmarks_view.png)



可以看到随着机器人的不断运动，小球的位置也是在发生变化的，新增的小球约束也发生了变化。



# 如何配置Launch与Lua文件

### 第一步 了解 bag 文件

播放 bag 文件需要在 **bag** **的文件夹内**启动五个终端

*• **第一个**终端执行 roscore*

*• **第二个**终端执行 rosbag info rslidar-outdoor-gps.bag了解 bag 中 topic 的名称与类型*

*• **第三个**执行 rosbag play rslidar-outdoor-gps.bag*

*• **第四个**终端执行 rqt，了解 bag 中的 tf 树*

*注意, rqt 的所有显示插件都在菜单栏的 plugins 内, 再点击 visualization, 再点击 tf* 

*tree, 即可显示视频中的 tf 树的可视化界面.*

*• **第五个**终端执行 rviz*

*可视化雷达数据与 tf 数据.*

*rviz 左侧最顶上的 Fixed frame 除了下拉菜单可以选择之外, 还是**可以手动输入的**,* 

*现在手动输入成 odom ,*

*rviz 左侧下方的 Add 按钮, 可以添加显示的插件, 自己选择添加 pointcloud2,* 

*laserscan 等格式的数据, 之后把插件订阅的 topic 选择一下, 如果不会就自己摸索一下,* 

*很简单的.*

![image-20241225140455767](assets\image-20241225140455767.png)

![image-20241225140556264](assets\image-20241225140556264.png)

按空格停止播放，再按空格继续播放，停止后按s单步播放

![image-20241225140959223](assets\image-20241225140959223.png)

![image-20241225141206589](assets\image-20241225141206589.png)

![image-20241225141900311](assets\image-20241225141900311.png)





![image-20241225142235154](assets\image-20241225142235154.png)

![image-20241225142448489](assets\image-20241225142448489.png)

可以看到odom和机器人的一个相对位置是在发生变化的，即odom指向footprint的一个tf是发生变化的，它就叫TF（transform），机器人上几个相对不变的就是静态TF。

![image-20241225144008928](assets\6线点云数据.png)

![image-20241225144458743](D:\新桌面\笔记\BLOG-HT\slam\assets\image-20241225144458743.png)



### 第二步 配置 launch 文件

launch 文件中需要如下几个设置

• bag 文件的地址与 bag 文件的名字

• lua 文件的名字

• topic 需要 remap 成 bag 文件中发布的 topic



新建一个test.launch文件，把之前的lx_rs16_2d_outdoor.launch复制一下，

```xml
&lt;!--
  Copyright 2016 The Cartographer Authors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0 

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
--&gt;

&lt;launch&gt;
  &lt;!-- bag的地址与名称 --&gt;
  &lt;arg name="bag_filename" default="$(env HOME)/bagfiles/rslidar-outdoor-gps-notf.bag"/&gt;

  &lt;!-- 使用bag的时间戳 --&gt;
  &lt;param name="/use_sim_time" value="true" /&gt;

  &lt;!-- 启动cartographer --&gt;
  &lt;node name="cartographer_node" pkg="cartographer_ros"
      type="cartographer_node" args="
          -configuration_directory $(find cartographer_ros)/configuration_files
          -configuration_basename lx_rs16_2d_outdoor.lua"
      output="screen"&gt;
    &lt;remap from="points2" to="rslidar_points" /&gt;
    &lt;remap from="scan" to="front_scan" /&gt;
    &lt;remap from="odom" to="odom_scout" /&gt;
    &lt;remap from="imu" to="imu" /&gt;
  &lt;/node&gt;

  &lt;!-- 生成ros格式的地图 --&gt;
  &lt;node name="cartographer_occupancy_grid_node" pkg="cartographer_ros"
      type="cartographer_occupancy_grid_node" args="-resolution 0.05" /&gt;

  &lt;!-- 启动rviz --&gt;
  &lt;node name="rviz" pkg="rviz" type="rviz" required="true"
      args="-d $(find cartographer_ros)/configuration_files/lx_2d.rviz" /&gt;

  &lt;!-- 启动rosbag --&gt;
  &lt;node name="playbag" pkg="rosbag" type="play"
      args="--clock $(arg bag_filename)" /&gt;
&lt;/launch&gt;

```

然后我们针对刚才做可视化的这样一个bag来做一下适配，

![image-20241225152821406](assets\image-20241225152821406.png)

改一下这两个地方。



### 第三步 配置 lua 文件

![image-20241225153020997](assets\lua配置.png)

新建一个test.lua文件，从backpack.lua文件复制

```lua
-- Copyright 2016 The Cartographer Authors
--
-- Licensed under the Apache License, Version 2.0 (the "License");
-- you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--      http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.

include "map_builder.lua"
include "trajectory_builder.lua"

options = {
  map_builder = MAP_BUILDER,
  trajectory_builder = TRAJECTORY_BUILDER,
  map_frame = "map",
  tracking_frame = "base_link",
  published_frame = "base_link",
  odom_frame = "odom",
  provide_odom_frame = true,
  publish_frame_projected_to_2d = false,
  use_pose_extrapolator = true,
  use_odometry = false,
  use_nav_sat = false,
  use_landmarks = false,
  num_laser_scans = 0,
  num_multi_echo_laser_scans = 1,
  num_subdivisions_per_laser_scan = 10,
  num_point_clouds = 0,
  lookup_transform_timeout_sec = 0.2,
  submap_publish_period_sec = 0.3,
  pose_publish_period_sec = 5e-3,
  trajectory_publish_period_sec = 30e-3,
  rangefinder_sampling_ratio = 1.,
  odometry_sampling_ratio = 1.,
  fixed_frame_pose_sampling_ratio = 1.,
  imu_sampling_ratio = 1.,
  landmarks_sampling_ratio = 1.,
}

MAP_BUILDER.use_trajectory_builder_2d = true
TRAJECTORY_BUILDER_2D.num_accumulated_range_data = 10

return options

```

TF树最上面的一个是published_frame

![image-20241225154435845](assets\image-20241225154435845.png)

![image-20241225155106356](assets\image-20241225155106356.png)

​		多线点云会打到地面，如果你想这时候去建二维地图，但是你要使用这个全部的点云数据区建图呢，这个打到地面上的一圈一圈的点也会被建到地图里，这时候你就会发现地图上全是一圈一圈的印，那这个地图就没法使用，所以在你订阅多线点云数据的时候，这个值也要设置为大于0，那这里就出现一个矛盾：当你既有单线又有多线的时候，这个min_z就需要有一定的考量了，你是要地面，还是要单线，你要是想把地面过滤掉，你单线也会同时过滤掉。这里我们先把min_z设置为-0.1。

​		重新编译一下，

```bash
 roslaunch cartographer_ros test.launch 
```

​		可以发现终端一直有报错，但不影响建图，可能是既订阅了单线又订阅了多线的原因。

由于设置的min_z为-0.1，可以发现点云没有打在地上的或者说很少，因为这个雷达是装在高处的，这个z坐标是相对于雷达自身的，所以它这个点就会很少出现在这个雷达下面，

![image-20241225164007763](assets\image-20241225164007763.png)

![image-20241225164457396](assets\image-20241225164457396.png)



只用多线不用单线，min_z改为0.2，也就是0.2以下的都不要

```lua
  num_laser_scans = 0,
  num_point_clouds = 1,
```

重新编译一下，再次运行，可以发现这次终端不报错，说明原因就是之前说的同时订阅了单线和多线的原因。

![image-20241225165520408](assets\image-20241225165520408.png)

![image-20241225170020778](assets\image-20241225170020778.png)

这个显示出来的点就是过滤掉的点，就是过滤之后的点会比之前高了。









# 命令功能汇总

```bash
##  运行相关命令

其中的bag文件可以在我的公众号: 从零开始搭SLAM  里找到，在底部菜单栏的数据集链接里

### 2d建图指令
`roslaunch cartographer_ros lx_rs16_2d_outdoor.launch`

### 保存2d轨迹,并生成ros格式的地图
`./finish_slam_2d.sh`

### 纯定位模式
`roslaunch cartographer_ros lx_rs16_2d_outdoor_localization.launch`

### 3d建图指令
`roslaunch cartographer_ros lx_rs16_3d.launch`

### 保存3d轨迹
`./finish_slam_3d.sh`

### 使用asset生成ros格式的2d栅格地图
`roslaunch cartographer_ros assets_writer_2d.launch`

### 使用asset生成3d点云地图
`roslaunch cartographer_ros assets_writer_3d.launch`

### landmark使用示例
`roslaunch cartographer_ros landmark_mir_100.launch`


##  实时显示三维点云地图与保存地图的功能简述
显示三维点云地图需要是在建3d轨迹的情况下才可以显示, 点云地图默认发布在 `/point_cloud_map` 话题中.

默认关闭了保存pcd格式点云的功能, 如需要这个功能, 需要将node.cc文件的第1029行的 `constexpr bool save_pcd = false;` 改成true.

编译之后在建图结束后通过调用 `/write_state` 服务, 会在生成pbstream文件的同时也对pcd文件进行保存, 保存目录与pbstream文件同一个文件夹.
```

