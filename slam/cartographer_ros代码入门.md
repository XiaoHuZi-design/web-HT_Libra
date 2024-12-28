![image-20241227114515784](assets\01\整体目录.png)

# 2-1 vscode的配置与使用

略。

```markdown
## 推荐编译环境
- ubuntu 16.04/18.04 版本
- ROS Kinetic/Melodic 版本
- vscode

vscode中推荐的插件有: 
- C/C++
- C++ Intellisense
- Doxygen Documentation Generator
- Msg Language Support
- XML Tools
- Todo Tree: 注释的高亮显示
```



# 2-2  Cartographer_ros的功能与框架分析

cartographer_ros 是 cartographer 算法库针对 ROS 开发的接口库.

**主要的作用**是

• 通过 ros 的订阅机制接收传感器数据, 并将传感器数据做坐标变换以及数据类型的转换, 转换完成之后送到 cartographer 算法库中进行具体的 SLAM 的计算

• 根据前端与后端计算的结果, 发布轨迹, tf, 栅格地图, 约束信息, 以及 landmark

• 提供了外部控制的接口, 如开始结束轨迹, 保存数据, 获取数据等



![image-20241227114053103](assets\01\代码框架梳理.png)

![image-20241227114234077](assets\01\node类思维导图.png)



# 2-3 CMakeLists.txt文件讲解

略。  听不懂思密达！



# 2-4 gflag与glog简介



**Todo Tree** **使用说明**

• **?**: 目前我不理解的地方的标注

• **note**: 重点库, 重点概念, 重点功能的语句的标注

• **c++11**: c++11 新标准与 c++不常用语法的标注

• **Step**: 代码步骤说明



**gflag** **简介**

gflags 是 google 开源的命令行标记处理库

命令行标记,顾名思义就是当运行一个可执行文件时, 由用户为其指定的标记, 形如：

fgrep -l -f ./test ccc jjj

-l 与-f 是**命令行标记**, 而 ccc 与 jjj 是命令行参数, 因为这两者不是以-开头的.



一般的一个可执行文件, 允许用户为其传入命令行标记以及参数.

如上述例子, -l 是一个不带参数的标记, -f 是一个带了参数./test 的标记, 而 gflags可以解析这些标记以及参数并将其存储在某些数据结构中.

gflags 主要支持的参数类型包括 bool, int32, int64, uint64, double, string 等

定义参数通过 DEFINE_type 宏实现, 该宏的三个参数含义分别为命令行参数名, 参数默认值, 以及参数的帮助信息

当参数被定义后, 通过 **FLAGS_name** 就可访问到对应的参数

*引用于* *https://zhuanlan.zhihu.com/p/108477489*



**glog** **简介**

Google glog 是一个应用级别的日志系统库.它提供基于 C++风格的流和各种辅助宏的日志 API.支持以下功能：

• 参数设置, 以命令行参数的方式设置标志参数来控制日志记录行为

• 严重性分级, 根据日志严重性分级记录日志 - INFO WARNING ERROR FATAL

• 可有条件地记录日志信息 - LOG_IF LOG_EVERY_N LOG_IF_EVERY_N LOG_FIRST_N

• 条件中止程序。丰富的条件判定宏, 可预设程序终止条件 - CHECK 宏

• 异常信号处理。程序异常情况, 可自定义异常处理过程

• 支持 debug 功能

• 自定义日志信息

• 线程安全日志记录方式

• 系统级日志记录

• google perror 风格日志信息

• 精简日志字符串信息

最终的结果不仅会在屏幕终端显示出来, 同时会将 log 日志写入到/tmp/...log....这个文

件中

glog 比较语句的源码

```c++
 #define CHECK_EQ(val1, val2) CHECK_OP(_EQ, ==, val1, val2)
 #define CHECK_NE(val1, val2) CHECK_OP(_NE, !=, val1, val2)
 #define CHECK_LE(val1, val2) CHECK_OP(_LE, <=, val1, val2)
 #define CHECK_LT(val1, val2) CHECK_OP(_LT, < , val1, val2)
 #define CHECK_GE(val1, val2) CHECK_OP(_GE, >=, val1, val2)
 #define CHECK_GT(val1, val2) CHECK_OP(_GT, > , val1, val2)
```



**node_main.cc**

```c++
/*
 * Copyright 2016 The Cartographer Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "absl/memory/memory.h"
#include "cartographer/mapping/map_builder.h"
#include "cartographer_ros/node.h"
#include "cartographer_ros/node_options.h"
#include "cartographer_ros/ros_log_sink.h"
#include "gflags/gflags.h"
#include "tf2_ros/transform_listener.h"

/**
 * note: gflags是一套命令行参数解析工具
 * DEFINE_bool在gflags.h中定义
 * gflags主要支持的参数类型包括bool, int32, int64, uint64, double, string等
 * 定义参数通过DEFINE_type宏实现, 该宏的三个参数含义分别为命令行参数名, 参数默认值, 以及参数的帮助信息
 * 当参数被定义后, 通过FLAGS_name就可访问到对应的参数
 */
// collect_metrics ：激活运行时度量的集合.如果激活, 可以通过ROS服务访问度量
DEFINE_bool(collect_metrics, false,
            "Activates the collection of runtime metrics. If activated, the "
            "metrics can be accessed via a ROS service.");
DEFINE_string(configuration_directory, "",
              "First directory in which configuration files are searched, "
              "second is always the Cartographer installation to allow "
              "including files from there.");
DEFINE_string(configuration_basename, "",
              "Basename, i.e. not containing any directory prefix, of the "
              "configuration file.");
DEFINE_string(load_state_filename, "",
              "If non-empty, filename of a .pbstream file to load, containing "
              "a saved SLAM state.");
DEFINE_bool(load_frozen_state, true,
            "Load the saved state as frozen (non-optimized) trajectories.");
DEFINE_bool(
    start_trajectory_with_default_topics, true,
    "Enable to immediately start the first trajectory with default topics.");
DEFINE_string(
    save_state_filename, "",
    "If non-empty, serialize state and write it to disk before shutting down.");

namespace cartographer_ros {
namespace {

void Run() {
  constexpr double kTfBufferCacheTimeInSeconds = 10.;
  tf2_ros::Buffer tf_buffer{::ros::Duration(kTfBufferCacheTimeInSeconds)};
  // 开启监听tf的独立线程
  tf2_ros::TransformListener tf(tf_buffer);

  NodeOptions node_options;
  TrajectoryOptions trajectory_options;

  // c++11: std::tie()函数可以将变量连接到一个给定的tuple上,生成一个元素类型全是引用的tuple

  // 根据Lua配置文件中的内容, 为node_options, trajectory_options 赋值
  std::tie(node_options, trajectory_options) =
      LoadOptions(FLAGS_configuration_directory, FLAGS_configuration_basename);

  // MapBuilder类是完整的SLAM算法类
  // 包含前端(TrajectoryBuilders,scan to submap) 与 后端(用于查找回环的PoseGraph) 
  auto map_builder =
      cartographer::mapping::CreateMapBuilder(node_options.map_builder_options);
  
  // c++11: std::move 是将对象的状态或者所有权从一个对象转移到另一个对象, 
  // 只是转移, 没有内存的搬迁或者内存拷贝所以可以提高利用效率,改善性能..
  // 右值引用是用来支持转移语义的.转移语义可以将资源 ( 堆, 系统对象等 ) 从一个对象转移到另一个对象, 
  // 这样能够减少不必要的临时对象的创建、拷贝以及销毁, 能够大幅度提高 C++ 应用程序的性能.
  // 临时对象的维护 ( 创建和销毁 ) 对性能有严重影响.

  // Node类的初始化, 将ROS的topic传入SLAM, 也就是MapBuilder
  Node node(node_options, std::move(map_builder), &tf_buffer,
            FLAGS_collect_metrics);

  // 如果加载了pbstream文件, 就执行这个函数
  if (!FLAGS_load_state_filename.empty()) {
    node.LoadState(FLAGS_load_state_filename, FLAGS_load_frozen_state);
  }

  // 使用默认topic 开始轨迹
  if (FLAGS_start_trajectory_with_default_topics) {
    node.StartTrajectoryWithDefaultTopics(trajectory_options);
  }

  ::ros::spin();

  // 结束所有处于活动状态的轨迹
  node.FinishAllTrajectories();

  // 当所有的轨迹结束时, 再执行一次全局优化
  node.RunFinalOptimization();

  // 如果save_state_filename非空, 就保存pbstream文件
  if (!FLAGS_save_state_filename.empty()) {
    node.SerializeState(FLAGS_save_state_filename,
                        true /* include_unfinished_submaps */);
  }
}

}  // namespace
}  // namespace cartographer_ros

int main(int argc, char** argv) {

  // note: 初始化glog库
  google::InitGoogleLogging(argv[0]);
  
  // 使用gflags进行参数的初始化. 其中第三个参数为remove_flag
  // 如果为true, gflags会移除parse过的参数, 否则gflags就会保留这些参数, 但可能会对参数顺序进行调整.
  google::ParseCommandLineFlags(&argc, &argv, true);

  /**
   * @brief glog里提供的CHECK系列的宏, 检测某个表达式是否为真
   * 检测expression如果不为真, 则打印后面的description和栈上的信息
   * 然后退出程序, 出错后的处理过程和FATAL比较像.
   */
  CHECK(!FLAGS_configuration_directory.empty())
      << "-configuration_directory is missing.";
  CHECK(!FLAGS_configuration_basename.empty())
      << "-configuration_basename is missing.";

  // ros节点的初始化
  ::ros::init(argc, argv, "cartographer_node");

  // 一般不需要在自己的代码中显式调用
  // 但是若想在创建任何NodeHandle实例之前启动ROS相关的线程, 网络等, 可以显式调用该函数.
  ::ros::start();

  // 使用ROS_INFO进行glog消息的输出
  cartographer_ros::ScopedRosLogSink ros_log_sink;

  // 开始运行cartographer_ros
  cartographer_ros::Run();

  // 结束ROS相关的线程, 网络等
  ::ros::shutdown();
}
```



**ros_log_sink.cc**

```c++
/*
 * Copyright 2016 The Cartographer Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "cartographer_ros/ros_log_sink.h"

#include <chrono>
#include <cstring>
#include <string>
#include <thread>

#include "glog/log_severity.h"
#include "ros/console.h"

namespace cartographer_ros {

namespace {

/**
 * @brief 根据给定的文件全路径名, 获取文件名
 * 
 * @param[in] filepath 
 * @return const char* 返回文件名
 */
const char* GetBasename(const char* filepath) {
  // 找到 '/' 最后一次在filepath中出现的位置
  const char* base = std::strrchr(filepath, '/');
  // 找到'/',就将'/'之后的字符串返回；找不到'/', 就将整个filepath返回
  return base ? (base + 1) : filepath;
}

}  // namespace


/**
 * @brief 在构造函数中调用AddLogSink(), 将ScopedRosLogSink类注册到glog中
 */
ScopedRosLogSink::ScopedRosLogSink() : will_die_(false) { AddLogSink(this); }
ScopedRosLogSink::~ScopedRosLogSink() { RemoveLogSink(this); }

/**
 * @brief 重载了send()方法, 使用ROS_INFO进行glog消息的输出
 * 
 * @param[in] severity 消息级别
 * @param[in] filename 全路径文件名
 * @param[in] base_filename 文件名
 * @param[in] line 消息所在的文件行数
 * @param[in] tm_time 消息的时间
 * @param[in] message 消息数据本体
 * @param[in] message_len 消息长度
 */
void ScopedRosLogSink::send(const ::google::LogSeverity severity,
                            const char* const filename,
                            const char* const base_filename, 
                            const int line,
                            const struct std::tm* const tm_time,
                            const char* const message,
                            const size_t message_len) {
  const std::string message_string = ::google::LogSink::ToString(
      severity, GetBasename(filename), line, tm_time, message, message_len);
  switch (severity) {
    case ::google::GLOG_INFO:
      ROS_INFO_STREAM(message_string);
      break;

    case ::google::GLOG_WARNING:
      ROS_WARN_STREAM(message_string);
      break;

    case ::google::GLOG_ERROR:
      ROS_ERROR_STREAM(message_string);
      break;

    case ::google::GLOG_FATAL:
      ROS_FATAL_STREAM(message_string);
      will_die_ = true;
      break;
  }
}

// WaitTillSent()会在每次send后调用, 用于一些异步写的场景
void ScopedRosLogSink::WaitTillSent() {
  if (will_die_) {
    // Give ROS some time to actually publish our message.
    std::this_thread::sleep_for(std::chrono::milliseconds(1000));
  }
}

}  // namespace cartographer_ros

```

**ros_log_sink.h**

```c++
/*
 * Copyright 2016 The Cartographer Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef CARTOGRAPHER_ROS_CARTOGRAPHER_ROS_ROS_LOG_SINK_H
#define CARTOGRAPHER_ROS_CARTOGRAPHER_ROS_ROS_LOG_SINK_H

#include <ctime>

#include "glog/logging.h"

namespace cartographer_ros {

// Makes Google logging use ROS logging for output while an instance of this
// class exists.
/**
 * @brief 自定义的输出日志的方式: 使用ROS_INFO进行glog消息的输出
 */
class ScopedRosLogSink : public ::google::LogSink {
 public:
  ScopedRosLogSink();
  ~ScopedRosLogSink() override;

  void send(::google::LogSeverity severity, const char* filename,
            const char* base_filename, int line, const struct std::tm* tm_time,
            const char* message, size_t message_len) override;

  void WaitTillSent() override;

 private:
  bool will_die_;
};

}  // namespace cartographer_ros

#endif  // CARTOGRAPHER_ROS_CARTOGRAPHER_ROS_ROS_LOG_SINK_H

```



# 2-5 node_main函数讲解

听不懂思密达！



注意如果第一次下载，目录下是没有这个文件的，没有这个文件vscode就不能按F12键跳转函数

![image-20241227132442085](assets\01\image-20241227132442085.png)

第一次编译需要先使用yes这个

![image-20241227132639499](assets\01\image-20241227132639499.png)



# 2-6 加载配置文件

文件太多了，听晕了... ...