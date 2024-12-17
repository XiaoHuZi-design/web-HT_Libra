[环境搭建 | Tianbot](https://docs.tianbot.com/competition/f1tenth_online/env-config.html)

[https://docs.tianbot.com/competition/f1tenth_online/env-config.html](https://docs.tianbot.com/competition/f1tenth_online/env-config.html)

[Tianracer 仿真实例 | Tianbot](https://docs.tianbot.com/simulation/wheel_robot/ackermann/tianracer.html)

[https://docs.tianbot.com/simulation/wheel_robot/ackermann/tianracer.html](https://docs.tianbot.com/simulation/wheel_robot/ackermann/tianracer.html)

## 一、搭建环境
### 1.比赛环境要求：
+ <font style="color:rgb(60, 60, 67);">安装 Ubuntu 20.04</font>
+ <font style="color:rgb(60, 60, 67);">安装 ROS Noetic</font>
+ <font style="color:rgb(60, 60, 67);">安装 Gazebo 11</font>
+ <font style="color:rgb(60, 60, 67);">安装 tianracer 功能包</font>
+ <font style="color:rgb(60, 60, 67);">安装 OBS Studio</font>

**2.安装双系统更流畅：**

[Ubuntu20.04安装详细图文教程（双系统）_ubuntu20.04安装教程-CSDN博客](https://blog.csdn.net/hwh295/article/details/113409389)

[Win10 + Ubuntu20.04 双系统+双硬盘安装_ubuntu20.04设置双显示器-CSDN博客](https://blog.csdn.net/weixin_48180029/article/details/115705299)

### 2.安装比赛环境
```bash
mkdir -p ~/tianbot_ws/src && cd ~/tianbot_ws/src
git clone https://github.com/tianbot/tianracer.git -b dev
```

```bash
cd ~/tianbot_ws/ && catkin_make
```

```bash
//设置工作空间环境变量
source ~/tianbot_ws/devel/setup.bash
//运行安装依赖脚本
roscd tianracer_gazebo/scripts/ && ./env_config.sh
```

```bash
echo "source ~/tianbot_ws/devel/setup.bash" --extend >> ~/.bashrc

避免每次开启终端中使用source ~/tianbot_ws/devel/setup.bash命令 来配置环境变量
```

```bash
//新开启一个终端，运行如下代码，启动 Gazebo 仿真系统，并运行tianracer导航Demo
roslaunch tianracer_gazebo demo_tianracer_teb_nav.launch

//新开启一个终端，运行如下代码，启动Tianbot评分系统
rosrun tianracer_gazebo judge_system_node.py
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725611314855-532ffec3-38fe-4a25-9c15-63108b828c26.png)

部分报错可尝试：

```bash
sudo apt install ros-noetic-ackermann-msgs ros-noetic-move-base \
                ros-noetic-map-server  ros-noetic-amcl \
                ros-noetic-ros-control ros-noetic-ros-controllers \
                ros-noetic-teb-local-planner
```

### 3.更新代码
```bash
如何更新代码？

下述代码均需要在你的tianracer/目录下进行

如果对某些文件中的代码做过修改
则应先保存修改并储藏，避免修改丢失
git add .  &&  git stash

然后 git status 显示为包含

"nothing to commit ，working tree clean"

然后使用git fetch && git pull -r命令更新本地代码

使用git checkout raicom切换分支

最后一步 git stash pop，弹出先前的修改

```

```bash
ht@ht-VirtualBox:~$ roscd tianracer/..
ht@ht-VirtualBox:~/tianbot_ws/src/tianracer$ git add .  &&  git stash
保存工作目录和索引状态 WIP on dev: a20554b Merge pull request #45 from sujit-168/dev
ht@ht-VirtualBox:~/tianbot_ws/src/tianracer$ git stash list
stash@{0}: WIP on dev: a20554b Merge pull request #45 from sujit-168/dev
ht@ht-VirtualBox:~/tianbot_ws/src/tianracer$ git status
位于分支 dev
您的分支与上游分支 'origin/dev' 一致。

无文件要提交，干净的工作区
ht@ht-VirtualBox:~/tianbot_ws/src/tianracer$ git fetch && git pull
remote: Enumerating objects: 62, done.
remote: Counting objects: 100% (62/62), done.
remote: Compressing objects: 100% (29/29), done.
remote: Total 62 (delta 33), reused 59 (delta 33), pack-reused 0
展开对象中: 100% (62/62), 110.64 KiB | 529.00 KiB/s, 完成.
来自 https://github.com/tianbot/tianracer
   a20554b..98a0e90  dev             -> origin/dev
 * [新分支]          integrated_odom -> origin/integrated_odom
   992eda6..4c8264f  master          -> origin/master
 * [新分支]          raicom          -> origin/raicom
更新 a20554b..98a0e90
Fast-forward
 .../env-hooks/99.default_tianracer.sh.em           |   2 +
 .../includes/rs_camera_with_imu_stereo.launch.xml  | 150 +++++++++++++++++++++
 tianracer_bringup/launch/rgbd_camera.launch        |   5 +-
 tianracer_bringup/launch/tianracer_bringup2.launch |  19 ---
 tianracer_core/launch/tianracer_core_2.launch      |  44 ------
 5 files changed, 156 insertions(+), 64 deletions(-)
 create mode 100644 tianracer_bringup/launch/includes/rs_camera_with_imu_stereo.launch.xml
 delete mode 100644 tianracer_bringup/launch/tianracer_bringup2.launch
 delete mode 100644 tianracer_core/launch/tianracer_core_2.launch
ht@ht-VirtualBox:~/tianbot_ws/src/tianracer$ 

```

### 4.比赛常用命令
```bash
echo "source ~/tianbot_ws/devel/setup.bash" --extend >> ~/.bashrc
否则需要每次开启终端中使用source ~/tianbot_ws/devel/setup.bash命令 来配置环境变量   
rostopic echo /tf      rostopic list   rosrun rqt_robot_steering rqt_robot_steering
																					
rosrun teleop_twist_keyboard teleop_twist_keyboard.py /cmd_vel:=/tianracer/cmd_vel

roslaunch tianracer_gazebo demo_slam_teb_1.launch				
roslaunch tianracer_gazebo tianracer_bringup.launch     
roslaunch tianracer_gazebo tianracer_bringup.launch world:=racetrack_1

roslaunch tianracer_slam tianracer_gmapping.launch        
或者 roslaunch tianracer_slam gazebo_cartographer_2d.launch   
或者 rosrun teleop_twist_keyboard teleop_twist_keyboard.py /cmd_vel:=/tianracer/cmd_vel

roslaunch tianracer_slam gazebo_map_save.launch           
roslaunch tianracer_slam gazebo_map_save.launch map_file:=my_map
生成目标点文件，roslaunch tianracer_gazebo click_waypoint.launch filename:=test_indoor_points
roslaunch tianracer_gazebo click_waypoint.launch filename:=racetrack_1_points

roslaunch tianracer_gazebo demo_tianracer_teb_nav.launch world:=test_indoor
系统环境变量 export TIANRACER_WORLD=test_indoor
rosrun tianracer_gazebo judge_system_node.py

roslaunch tianracer_gazebo demo_tianracer_teb_nav.launch world:=raicom
系统环境变量 export TIANRACER_WORLD=raicom
rosrun tianracer_gazebo judge_system_node.py

```

```bash
安装teb_local_planner(替换成自己的ros版本)

sudo apt-get install ros-melodic-teb-local-planner
sudo apt-get install ros-melodic-teb-local-planner-tutorials

此处是以二进制安装 ，也可以直接去下载源码安装下面介绍

观察单个轨迹的仿真（观察参数对于路径规划上的影响），启动节点和rviz：

rosparam set /test_optim_node/enable_homotopy_class_planning True
roslaunch teb_local_planner test_optim_node.launch

启动参数调节器(动态调节参数)

rosrun rqt_reconfigure rqt_reconfigure  或者rqt


查看插件是否已安装： rospack plugins --attrib=plugin nav_core
ht@ht-VirtualBox:~/tianbot_ws$ rospack plugins --attrib=plugin costmap_converter
costmap_converter /opt/ros/noetic/share/costmap_converter/plugins.xml

```

## 二、建图
```bash
sudo apt install ros-<ROS版本>-gmapping
```

```bash
cartographer安装官网（依赖没有配置容易出错）
https://google-cartographer-ros.readthedocs.io/en/latest/compilation.html

在cartographer_ws下运行，运行前需要source一下  source install_isolated/setup.bash
echo "source ~/cartographer_ws/install_isolated/setup.bash" --extend >> ~/.bashrc

```

```bash
可以使用鱼香一键安装cartographer:
wget http://fishros.com/install -O fishros && . fishros

Run CMD Task:[sudo apt-get remove ros-noetic-abseil-cpp -y]
[-]Result:code:100                           

Run CMD Task:[bash src/cartographer/scripts/install_abseil.sh]
[-]Result:code:128                           

Run CMD Task:[catkin_make_isolated --install --use-ninja]
[-]Result:code:127                           

Run CMD Task:[sudo chmod -R 777 cartographer_ws]
[-]Result:success    
```



** 地图过大，gmapping建图过程中由于回环检测问题总是建歪了，故选用cartographer建图方法，**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725689541572-afd51224-80fd-4b20-b574-41d5068c39b8.png)

**cartographer方法不知道为啥也会歪，但比gmapping好一点，可以使用gimp微修一下，**

```bash
sudo apt install gimp
```

**比赛地图：**

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725690810833-e097645e-83f9-4304-afb7-6d52e4fd65e3.jpeg)

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725689575403-95bd97be-5acb-4d80-9dc2-9c20f4b764e9.jpeg)

**用的 cartographer 建的图与小车起点处航向相差90°， 需要用 那个 p 图软件 gimp， 以起点为中心（估一下）旋转 90° 然后平移小车到起始点  ，**

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725689625224-dee3557a-0ef9-4800-9f9a-864ce6294e4e.jpeg)

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725690421733-83334409-b61a-4b9e-a9da-a0d5ab474803.jpeg)

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725689637206-860f89a4-e022-47bc-beae-9ddb101ce6dc.jpeg)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725690620618-b5445cf6-4b5e-4446-bdc6-1b93434ac643.png)

**修改起始点origin位置进行平移，得到最终图，建的还是不好但可以使用。**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725690578444-f199fdac-7684-4c53-8eab-a443a8cc184d.png)



## 三、调参
[Teb调参.docx](https://www.yuque.com/attachments/yuque/0/2024/docx/39216292/1725613575137-468e2cfb-5b69-4300-84f0-846f0fd8347b.docx)

**比赛地图的行径方向及检查点分布：**

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725613483996-056129fc-db77-4da5-8044-2fbb73841ad5.jpeg)

```bash
TebLocalPlannerROS:
  odom_topic: odom

  map_frame: odom


  # Trajectoty 这部分主要是用于调整轨迹

  teb_autosize: True #优化期间允许改变轨迹的时域长度
  # dt_ref: 0.3 #期望的轨迹时间分辨率
  dt_ref: 0.3
  # dt_hysteresis: 0.03 #根据当前时间分辨率自动调整大小的滞后现象，通常约为。建议使用dt ref的10%
  dt_hysteresis: 0.03

  #覆盖全局规划器提供的局部子目标的方向;规划局部路径时会覆盖掉全局路径点的方位角,
  #对于车辆的2D规划,可以设置为False,可实现对全局路径的更好跟踪。
  # global_plan_overwrite_orientation: True
  global_plan_overwrite_orientation: True

  #指定考虑优化的全局计划子集的最大长度,如果为0或负数：禁用；长度也受本地Costmap大小的限制
  # max_global_plan_lookahead_dist: 3.0
  max_global_plan_lookahead_dist: 2.0

  feasibility_check_no_poses: 2 #检测位姿可到达的时间间隔，default：4

  #如果为true，则在目标落后于起点的情况下，可以使用向后运动来初始化基础轨迹
  #(仅在机器人配备了后部传感器的情况下才建议这样做）
  allow_init_with_backwards_motion: False

  global_plan_viapoint_sep: -1

  #参数在TebLocalPlannerROS::pruneGlobalPlan()函数中被使用
  #该参数决定了从机器人当前位置的后面一定距离开始裁剪
  #就是把机器人走过的全局路线给裁剪掉，因为已经过去了没有比较再参与计算后面的局部规划
  global_plan_prune_distance: 1

  exact_arc_length: False
  publish_feedback: False

  # Robot
  # max_vel_x: 1.8
  # max_vel_x: 2.1
  max_vel_x: 5.0
  max_vel_x_backwards: 1
  # max_vel_theta: 3.6
  # max_vel_theta: 3.8
  # max_vel_theta: 10.0
  max_vel_theta: 5.0
  # acc_lim_x: 1.8
  # acc_lim_x: 2.1
  acc_lim_x: 5.0
  # acc_lim_theta: 3.6
  # acc_lim_theta: 3.8
  acc_lim_theta: 5.0

  #仅适用于全向轮
  # max_vel_y (double, default: 0.0)
  # acc_lim_y (double, default: 0.5)

  # ********************** Carlike robot parameters ********************
  # min_turning_radius: 0.5 # 最小转弯半径 注意车辆运动学中心是后轮中点
  # min_turning_radius: 0.6
  min_turning_radius: 0.5
  wheelbase: 0.26 # 即前后轮距离

  #设置为true时，ROS话题（rostopic） cmd_vel/angular/z 内的数据是舵机角度，
  cmd_angle_instead_rotvel: True
  # ********************************************************************

  # footprint_model: # types: "point", "circular", "two_circles", "line", "polygon" 多边形勿重复第一个顶点，会自动闭合
  #   type: "line"
  #   # radius: 0.2 # for type "circular"
  #   line_start: [-0.13, 0.0] # for type "line"
  #   line_end: [0.13, 0.0] # for type "line"
  # front_offset: 0.2 # for type "two_circles"
  # front_radius: 0.2 # for type "two_circles"
  # rear_offset: 0.2 # for type "two_circles"
  # rear_radius: 0.2 # for type "two_circles"
  # vertices: [ [0.25, -0.05], [0.18, -0.05], [0.18, -0.18], [-0.19, -0.18], [-0.25, 0], [-0.19, 0.18], [0.18, 0.18], [0.18, 0.05], [0.25, 0.05] ] # for type "polygon"

  # GoalTolerance
  footprint_model:
    type: "polygon"
    vertices: [[0.18, 0.10], [0.18, -0.10], [-0.18, -0.10], [-0.18, 0.10]]

  # xy_goal_tolerance: 0.1
  # yaw_goal_tolerance: 0.1
  xy_goal_tolerance: 1
  yaw_goal_tolerance: 1
  #自由目标速度。设为False时，车辆到达终点时的目标速度为0。
  #TEB是时间最优规划器。缺少目标速度约束将导致车辆“全速冲线”
  # free_goal_vel: True
  free_goal_vel: False

  # complete_global_plan: True
  # Obstacles

  min_obstacle_dist: 0.2 # 与障碍的最小期望距离,
  include_costmap_obstacles: True #应否考虑到局部costmap的障碍设置为True后才能规避实时探测到的、建图时不存在的障碍物。
  costmap_obstacles_behind_robot_dist: 2.0 #考虑后面n米内的障碍物2.0
  obstacle_poses_affected: 30 #为了保持距离，每个障碍物位置都与轨道上最近的位置相连。

  ## Costmap converter plugin   增加
  #costmap_converter_plugin: "costmap_converter::CostmapToPolygonsDBSMCCH"
  # costmap_converter_plugin: "costmap_converter::CostmapToLinesDBSRANSAC"
  #costmap_converter_plugin: "costmap_converter::CostmapToLinesDBSMCCH"
  #costmap_converter_plugin: "costmap_converter::CostmapToPolygonsDBSConcaveHull"
  #costmap_converter_plugin: "" # deactivate plugin

  costmap_converter_spin_thread: True
  costmap_converter_rate: 5

  # Optimization

  no_inner_iterations: 3
  no_outer_iterations: 2
  optimization_activate: True
  optimization_verbose: False
  penalty_epsilon: 0.1
  # weight_max_vel_x: 2
  # weight_max_vel_x: 4
  # weight_max_vel_x: 2
  weight_max_vel_x: 2.5
  weight_max_vel_y: 0.1
  # weight_max_vel_theta: 2
  # weight_max_vel_theta: 8
  # weight_max_vel_theta: 2
  weight_max_vel_theta: 2.5
  # weight_acc_lim_x: 2
  # weight_acc_lim_x: 1.9
  weight_acc_lim_x: 2.5
  weight_acc_lim_y: 0.1
  # weight_acc_lim_theta: 2 #1
  weight_acc_lim_theta: 2.5
  weight_kinematics_nh: 100
  weight_kinematics_forward_drive: 100 #1
  weight_kinematics_turning_radius: 100 #1
  # weight_optimaltime: 0.5
  # weight_optimaltime: 3
  weight_optimaltime: 4
  weight_shortest_path: 0
  # weight_obstacle: 10 #50
  weight_obstacle: 15
  weight_inflation: 1
  weight_dynamic_obstacle: 1 # not in use yet
  # alternative_time_cost: False # not in use yet
  selection_alternative_time_cost: True
  switching_blocking_period: 0.1

  # Homotopy Class Planner

  enable_homotopy_class_planning: False
  enable_multithreading: False
  simple_exploration: False
  max_number_classes: 4
  roadmap_graph_no_samples: 15
  roadmap_graph_area_width: 5
  h_signature_prescaler: 0.5
  h_signature_threshold: 0.1
  obstacle_keypoint_offset: 0.1
  obstacle_heading_threshold: 0.45
  visualize_hc_graph: False

  # # Recovery  默认注释

  # shrink_horizon_backup: True
  # shrink_horizon_min_duration: 10
  # oscillation_recovery: True
  # oscillation_v_eps: 0.1
  # oscillation_omega_eps: 0.1
  # oscillation_recovery_min_duration: 10
  # oscillation_filter_duration: 10

  # 多线规划
  # enable_homotopy_class_planning: True # 激活多线规划
  # enable_multithreading: True          # 多线程计算
  # max_number_classes: 2                # 规划的路径线数上限
  # selection_cost_hysteresis: 1.0       # 路径轨迹入选的评价上限
  # selection_obst_cost_scale: 1.0       # 障碍物评价在入选标准中的缩放倍率
  # selection_alternative_time_cost: False # 时间成本是否要进行平方计算
  # roadmap_graph_no_samples: 15         # 为创建 roadmap graph 而生成的样本数
  # roadmap_graph_area_width: 5          # 关键点采样的宽度，单位为米。
```

```bash
local_costmap:
  global_frame: odom
  #global_frame: map
  robot_base_frame: base_footprint
  transform_tolerance: 0.5

  # update_frequency: 10.0
  # publish_frequency: 10.0 
  update_frequency: 15.0
  publish_frequency: 10.0
  rolling_window: true
  width: 15
  height: 15
  resolution: 0.05

  plugins:
    - {name: obstacle_layer,  type: "costmap_2d::ObstacleLayer"}
    - {name: inflation_layer, type: "costmap_2d::InflationLayer"}


  inflation_layer:
    enabled:              true
    # cost_scaling_factor:  10.0  # exponential rate at which the obstacle cost drops off (default: 10)
    # inflation_radius:     0.08  # max. distance from an obstacle at which costs are incurred for planning paths.
    cost_scaling_factor:  15.0  # exponential rate at which the obstacle cost drops off (default: 10)
    inflation_radius:     0.2  # max. distance from an obstacle at which costs are incurred for planning paths.
```

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725691848385-970f4c15-4949-42ae-af05-b55422a04d4d.jpeg)

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725689660541-4ae68d54-aee3-4b50-bdef-7bd1986f840e.jpeg)



## 四、比赛结果
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725691019278-2ddb2665-c732-402f-8ef5-f781c97614ba.png)

[队伍名字：Tang-Sun.txt](https://www.yuque.com/attachments/yuque/0/2024/txt/39216292/1725613243270-2db9748e-a427-4ca7-b55d-406362ed7827.txt)[2024睿抗-ROS机器人虚拟仿真挑战赛技术报告.docx](https://www.yuque.com/attachments/yuque/0/2024/docx/39216292/1725613254332-cfac13ba-1a12-43ba-bc7f-e0f7305d977e.docx)

[tianbot_ws.rar](https://www.yuque.com/attachments/yuque/0/2024/rar/39216292/1725613290667-99e82e14-a2b9-430e-bf2f-4db8ceb1144b.rar)[77.162.mp4](https://www.yuque.com/attachments/yuque/0/2024/mp4/39216292/1725613308783-bf923175-997e-4294-bfd9-81dfebb63e67.mp4)[二等奖证书.jpeg](https://www.yuque.com/attachments/yuque/0/2024/jpeg/39216292/1725692152935-80a04473-852d-4845-a1b4-226f39d5099c.jpeg)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725692105353-efe4cde4-6def-47a0-806f-9f775c7d4bf6.png)

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725692114388-e2954a13-36cf-48c9-b7ee-d488d560f0eb.jpeg)

