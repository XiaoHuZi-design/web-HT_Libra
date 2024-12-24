

数据包保存方法：[ROS入门：保存和回放数据（bag文件的使用） - 北极星！ - 博客园](https://www.cnblogs.com/zhjblogs/p/16512501.html)

镜像下载：https://releases.ubuntu.com/18.04/

[阿里巴巴开源镜像站-OPSX镜像站-阿里云开发者社区](https://developer.aliyun.com/mirror/?spm=a2c6h.265751.1364563.38.728e2621iHKW48)

鱼香Ros一键安装:

```bash
wget http://fishros.com/install -O fishros && . fishros
```



# 安装cartography

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

**不出意外顺利安装！**

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



