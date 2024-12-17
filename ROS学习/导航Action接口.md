## <font style="color:rgb(24, 25, 28);">1.导航Action编程接口</font>
<font style="color:rgb(24, 25, 28);">ROS 的导航系统 Navigation 的编程接口（Action）</font>

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729564433651-12a6e506-dc3d-41db-8333-22540ea50b47.png)

不能每次都设置导航的目标点，所以需要编写程序代码来实现自主导航的功能，这就需要使用Navigation的导航接口(有好几个），ROS官方推荐Action接口。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729564368250-14568046-11e6-430e-a967-01b572b46819.png)

Action是ROS里的一种通讯方式，和Topic话题通讯有点不一样，在Topic通讯中，消息包传输是单向的，只能从发布者节点发送到订阅者节点，<font style="color:#74B602;">而在Action通讯中，消息包的传输是双向的</font>，Action将通讯双方分为了Server节点和Client节点，比如ROS的导航实现中，Navigation系统中的move_base就相当于一个Server，咱们需要编写一个Client节点向move_base这个Server发送导航请求，这个请求包含了导航目标点的坐标值和期望的姿态，move_base接收到导航请求后，就开始正常的完成导航。

和Topic通讯不同，Action通讯是可以持续不断的返回信息的，比如move_base就会向咱们编写的Client节点实时反馈导航的进程。在导航结束的时候可以给Client节点返回导航完成的消息，如果导航失败了也会返回相应的失败消息。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729565260186-e48d8b7b-1886-47b3-8fd3-abecf555551e.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729565361995-21130c4b-d1f3-449b-86a7-18a188ee6b72.png)

这种一次请求就能获得连续返回信息的方式，就是Action通讯和Topic话题通讯最大的区别。



## 2.坐标导航的 C++ 编程实现
分为四步：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729565701369-34385486-1297-42aa-9b33-27eba140dea9.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729566831861-f053c5d5-b0c7-4bac-bbdb-b88c416c710d.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729566805053-e9007c60-868a-4072-83e3-d69e97174503.png)

可以在ROS_Index中搜索消息包的格式定义

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729566900841-6866f78a-ccee-45e4-9c66-d2afa97858d0.png)

使用simple_action_client这种简单的客户端来和move_base进行Action通讯，这样可以减少很多繁琐的操作，快速的实现导航功能的调用，这个Action客户端的声明语法和话题发布者订阅者类似，先是一个对象类型，后面接一对尖括号，括号里是通讯使用的消息包类型，在代码里使用了typedef将这么长的一段定义代码取个别名，叫做MoveBaseClient，后面咱们生成Action客户端对象时就可以直接使用这个别名取代前面这一长串代码。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729575717758-525cbcdd-fc29-4fd7-825f-c7b69617e576.png)

这里的ac是ActionClient首字母的缩写，在这个对象的构造函数里，第一个参数是要连接的Action Server的名字，这里写move_base，第二个参数设置为True，让这个ac与move_base通讯的过程中自动堵塞等待结果，省的咱们还得另外写代码去调用spin（）函数。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729575869506-3a6d89d7-76bc-44c8-8193-705cce90795f.png)

接下来，在调用move_base的导航服务之前，需要确认move_base的导航服务已经开启了，这里调用ac的waitForServer（）函数来查询导航服务的状态，在参数里又调用了ros的Duration（）函数，它的参数表示等待服务开启的时间（单位s）,

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729576456714-e2241240-fc7f-425d-a52d-f2aabb229a07.png)

这句代码的意思是，先等待5秒钟，move_base的导航服务启动了，则立刻停止等待，返回True，跳出while循环，开始后面的操作。如果5秒后，move_base的导航服务仍未启动，则返回False，while循环会进入下一个5秒等待，如此循环，直到导航服务启动为止，再执行后面内容。

确认move_base的导航服务启动后，咱们就可以给move_base发送导航请求了，主要就是把导航点的坐标值和目标姿态发送给move_base。

先定义一个导航消息包，类型为move_base_msgs的MoveBaseGoal，消息包名称为goal，然后给这个消息包赋值，先是导航目标点的坐标值，坐标系为map，打上时间戳stamp，然后是坐标数值，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729577152369-f8c742a0-0f0f-46e7-953a-2318085285b9.png)

（主要map为地图坐标系，以机器人出发位置为原点，机器人的初始坐标轴为地图坐标轴）

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729577437863-2014391a-11a6-47cf-9429-7e137e7fcfb8.png)

即 ，x轴负方向3米，y轴正方形2米，z默认为0贴着地面。 导航目标点就是            这里。

然后目标姿态是一个四元数，这里只给w赋值1，另外三个数x,y,z都没有赋值，默认也是0，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729577706077-0735f1f3-b652-4a34-8a93-a449214d137d.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729577748731-eba1e40d-06e1-4fe6-9ba8-23668b40fd72.png)

这四个数的值表示导航目标的朝向和地图的x轴保持一致。（<font style="color:#DF2A3F;">具体看四元数和欧拉角的转换</font>）



消息包赋值完毕之后，调用Action客户端对象的SendGoal（）函数将消息包发送给move_base，然后就可以等待导航的结果了，这个WaitForResult（）函数会阻塞卡住，直到move_base返回导航结果，才继续往后执行，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729578092321-c18ae68c-2833-4c79-980e-69343cc0f5cf.png)

有了结果以后再调用Action客户对象的getState（）函数查询move_base返回的状态，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729578286963-8e33fc9d-6134-432e-8172-024eda3d7454.png)

如果是SUCCEEDED，说明move_base的导航顺利到达了目的地，咱们就要ROS_INFO输出结果Mission complete，如果返回状态不是SUCCEEDED，说明move_base导航失败了。

```cpp
#include <ros/ros.h>
#include <move_base_msgs/MoveBaseAction.h>
#include <actionlib/client/simple_action_client.h>

typedef actionlib::SimpleActionClient<move_base_msgs::MoveBaseAction> MoveBaseClient;

int main(int argc, char** argv)
{
    ros::init(argc, argv, "nav_client");

    MoveBaseClient ac("move_base", true);

    while (!ac.waitForServer(ros::Duration(5.0)))
        {
            ROS_INFO("Waiting for the move_base action server to come up");
        }

    move_base_msgs::MoveBaseGoal goal;

    goal.target_pose.header.frame_id = "map";
    goal.target_pose.header.stamp = ros::Time::now();

    goal.target_pose.pose.position.x = -3.0;
    goal.target_pose.pose.position.y = 2.0;
    goal.target_pose.pose.orientation.w = 1.0;

    ROS_INFO("Sending Goal");
    ac.sendGoal(goal);

    ac.waitForResult();

    if(ac.getState() == actionlib::SimpleClientGoalState::SUCCEEDED)
        ROS_INFO("Mission complete!");
    else
        ROS_INFO("Mission failed ...");

    return 0;
}
```



可参考wpr_simulation下案例 ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729579190957-da578e84-b39f-4262-8a4f-9e11507bd04f.png)

代码写完了，下一步为节点设置编译规则，并运行

```plain
添加执行文件
add_executable(nav_client src/nav_client.cpp)
target_link_libraries(nav_client
  ${catkin_LIBRARIES}
)

编译
catkin_make

1.启动仿真环境
roslaunch wpr_simulation wpb_stage_robocup.launch
2.启动导航系统
roslaunch nav_pkg nav.launch
3.启动上面编写的nav_client节点
rosrun nav_pkg nav_client
```



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729580836855-768f3f8a-d9ad-47c9-aeea-7fc36b06ca9b.png)

向move_base发送消息包的提示... 

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729580867695-c5672a8c-fd88-4ecb-b8a3-3140d4841ca1.png)

完成导航。



<font style="color:#DF2A3F;">有兴趣可以把导航位置坐标系换成别的，比如base_link，base_footprint，调整一下坐标数值，多运行几次，看看和map坐标系有什么差别</font>。在某些应用中，使用base_link坐标系会比使用map坐标系更方便一些。

## 3.坐标导航的 Python 编程实现
分为三步：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729664901891-613e9c1f-476e-404d-8d16-8a12399c6223.png)



```python
#!/usr/bin/env python3
# 指定运行环境编码为utf-8,能够正常显示中文字符
# coding=utf-8

import rospy
import actionlib
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal

if __name__ == "__main__":
    rospy.init_node("nav_client")

    ac = actionlib.SimpleActionClient('move_base',MoveBaseAction)
    ac.wait_for_server()

    goal = MoveBaseGoal()
    goal.target_pose.header.frame_id = "map"
    goal.target_pose.pose.position.x = -3.0
    goal.target_pose.pose.position.y = 2.0
    goal.target_pose.pose.position.z = 0.0
    goal.target_pose.pose.orientation.x = 0.0
    goal.target_pose.pose.orientation.y = 0.0
    goal.target_pose.pose.orientation.z = 0.0
    goal.target_pose.pose.orientation.w = 1.0
    ac.send_goal(goal)

    rospy.loginfo("开始导航...")
    ac.wait_for_result()

    if ac.get_state() == actionlib.GoalStatus.SUCCEEDED:
        rospy.loginfo("导航成功！")
    else:
        rospy.loginfo("导航失败...")

    # 添加可执行权限
```

```plain
ht@ht-VirtualBox:~/catkin_ws/src/nav_pkg/scripts$ chmod +x *.py
ht@ht-VirtualBox:~/catkin_ws/src/nav_pkg/scripts$ ls
nav_client.py
ht@ht-VirtualBox:~/catkin_ws/src/nav_pkg/scripts$ rospack find move_base_msgs
/opt/ros/noetic/share/move_base_msgs
ht@ht-VirtualBox:~/catkin_ws/src/nav_pkg/scripts$ 

```

catkin_make编译一下（ctrl + shift +B）

```plain
1.启动仿真环境
roslaunch wpr_simulation wpb_stage_robocup.launch
2.启动导航系统
roslaunch nav_pkg nav.launch
3.启动上面编写的nav_client节点
rosrun nav_pkg nav_client.py
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729684500699-de4aad40-31c9-4e2f-bb81-0a097db682d9.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1729684540180-0a23e08c-3503-4b69-8f5a-fe4b1c6ffbf3.png)

