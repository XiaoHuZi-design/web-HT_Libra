# 通讯录管理系统



## 1、系统需求

通讯录是一个可以记录亲人、好友信息的工具。

本教程主要利用C++来实现一个通讯录管理系统

系统中需要实现的功能如下：

* 添加联系人：向通讯录中添加新人，信息包括（姓名、性别、年龄、联系电话、家庭住址）最多记录1000人
* 显示联系人：显示通讯录中所有联系人信息
* 删除联系人：按照姓名进行删除指定联系人
* 查找联系人：按照姓名查看指定联系人信息
* 修改联系人：按照姓名重新修改指定联系人
* 清空联系人：清空通讯录中所有信息
* 退出通讯录：退出当前使用的通讯录









## 2、创建项目

创建项目步骤如下：

* 创建新项目
* 添加文件

### 2.1 创建项目

打开vs2017后，点击创建新项目，创建新的C++项目

![1544151401138](assets/1544151401138.png)



填写项目名称，选择项目路径

![1544151579620](assets/1544151579620.png)

### 2.2添加文件

![1544161551746](assets/1544161551746.png)



![1544161648175](assets/1544161648175.png)

添加成功后，效果如图：

![1544162344057](assets/1544162344057.png)



至此，项目已创建完毕







## 3、菜单功能

**功能描述：** 用户选择功能的界面

菜单界面效果如下图：



![1544149559893](assets/1544149559893.png)

**步骤：**

* 封装函数显示该界面  如 `void showMenu()`
* 在main函数中调用封装好的函数



**代码：**

```C++
#include<iostream>
using namespace std;

//菜单界面
void showMenu()
{
	cout << "***************************" << endl;
	cout << "*****  1、添加联系人  *****" << endl;
	cout << "*****  2、显示联系人  *****" << endl;
	cout << "*****  3、删除联系人  *****" << endl;
	cout << "*****  4、查找联系人  *****" << endl;
	cout << "*****  5、修改联系人  *****" << endl;
	cout << "*****  6、清空联系人  *****" << endl;
	cout << "*****  0、退出通讯录  *****" << endl;
	cout << "***************************" << endl;
}

int main() {

	showMenu();

	system("pause");

	return 0;
}
```









## 4、退出功能

功能描述：退出通讯录系统



思路：根据用户不同的选择，进入不同的功能，可以选择switch分支结构，将整个架构进行搭建



当用户选择0时候，执行退出，选择其他先不做操作，也不会退出程序



**代码：**

```C++
int main() {

	int select = 0;

	while (true)
	{
		showMenu();

		cin >> select;
		
		switch (select)
		{
		case 1:  //添加联系人
			break;
		case 2:  //显示联系人
			break;
		case 3:  //删除联系人
			break;
		case 4:  //查找联系人
			break;
		case 5:  //修改联系人
			break;
		case 6:  //清空联系人
			break;
		case 0:  //退出通讯录
			cout << "欢迎下次使用" << endl;
			system("pause");
			return 0;
			break;
		default:
			break;
		}
	}

	system("pause");

	return 0;
}
```



效果图：

![1544163868043](assets/1544163868043.png)











## 5、添加联系人

功能描述：

实现添加联系人功能，联系人上限为1000人，联系人信息包括（姓名、性别、年龄、联系电话、家庭住址）



添加联系人实现步骤：

* 设计联系人结构体
* 设计通讯录结构体
* main函数中创建通讯录
* 封装添加联系人函数
* 测试添加联系人功能



### 5.1 设计联系人结构体

联系人信息包括：姓名、性别、年龄、联系电话、家庭住址

设计如下：

```C++
#include <string>  //string头文件
//联系人结构体
struct Person
{
	string m_Name; //姓名
	int m_Sex; //性别：1男 2女
	int m_Age; //年龄
	string m_Phone; //电话
	string m_Addr; //住址
};
```



### 5.2 设计通讯录结构体

设计时候可以在通讯录结构体中，维护一个容量为1000的存放联系人的数组，并记录当前通讯录中联系人数量

设计如下

```C++
#define MAX 1000 //最大人数

//通讯录结构体
struct Addressbooks
{
	struct Person personArray[MAX]; //通讯录中保存的联系人数组
	int m_Size; //通讯录中人员个数
};
```



### 5.3 main函数中创建通讯录



添加联系人函数封装好后，在main函数中创建一个通讯录变量，这个就是我们需要一直维护的通讯录



```c++
mian函数起始位置添加：

	//创建通讯录
	Addressbooks abs;
	//初始化通讯录中人数
	abs.m_Size = 0;
```





### 5.4 封装添加联系人函数



思路：添加联系人前先判断通讯录是否已满，如果满了就不再添加，未满情况将新联系人信息逐个加入到通讯录



添加联系人代码：



```C++
//1、添加联系人信息
void addPerson(Addressbooks *abs)
{
	//判断电话本是否满了
	if (abs->m_Size == MAX)
	{
		cout << "通讯录已满，无法添加" << endl;
		return;
	}
	else
	{
		//姓名
		string name;
		cout << "请输入姓名：" << endl;
		cin >> name;
		abs->personArray[abs->m_Size].m_Name = name;

		cout << "请输入性别：" << endl;
		cout << "1 -- 男" << endl;
		cout << "2 -- 女" << endl;

		//性别
		int sex = 0;
		while (true)
		{
			cin >> sex;
			if (sex == 1 || sex == 2)
			{
				abs->personArray[abs->m_Size].m_Sex = sex;
				break;
			}
			cout << "输入有误，请重新输入";
		}

		//年龄
		cout << "请输入年龄：" << endl;
		int age = 0;
		cin >> age;
		abs->personArray[abs->m_Size].m_Age = age;

		//联系电话
		cout << "请输入联系电话：" << endl;
		string phone = "";
		cin >> phone;
		abs->personArray[abs->m_Size].m_Phone = phone;

		//家庭住址
		cout << "请输入家庭住址：" << endl;
		string address;
		cin >> address;
		abs->personArray[abs->m_Size].m_Addr = address;

		//更新通讯录人数
		abs->m_Size++;

		cout << "添加成功" << endl;
		system("pause");
		system("cls");
	}
}
```







### 5.5 测试添加联系人功能

选择界面中，如果玩家选择了1，代表添加联系人，我们可以测试下该功能



在switch case 语句中，case1里添加：

```C++
case 1:  //添加联系人
	addPerson(&abs);
	break;
```



测试效果如图：

![1544165554002](assets/1544165554002.png)









## 6、显示联系人

功能描述：显示通讯录中已有的联系人信息



显示联系人实现步骤：

* 封装显示联系人函数
* 测试显示联系人功能

### 6.1 封装显示联系人函数



思路：判断如果当前通讯录中没有人员，就提示记录为空，人数大于0，显示通讯录中信息



显示联系人代码：

```C++
//2、显示所有联系人信息
void showPerson(Addressbooks * abs)
{
	if (abs->m_Size == 0)
	{
		cout << "当前记录为空" << endl;
	}
	else
	{
		for (int i = 0; i < abs->m_Size; i++)
		{
			cout << "姓名：" << abs->personArray[i].m_Name << "\t";
			cout << "性别：" << (abs->personArray[i].m_Sex == 1 ? "男" : "女") << "\t";
			cout << "年龄：" << abs->personArray[i].m_Age << "\t";
			cout << "电话：" << abs->personArray[i].m_Phone << "\t";
			cout << "住址：" << abs->personArray[i].m_Addr << endl;
		}
	}
	
	system("pause");
	system("cls");

}
```





### 6.2 测试显示联系人功能



在switch case语句中，case 2 里添加

```C++
case 2:  //显示联系人
	showPerson(&abs);
	break;
```



测试效果如图：

![1544166401582](assets/1544166401582.png)









## 7、删除联系人

功能描述：按照姓名进行删除指定联系人



删除联系人实现步骤：

* 封装检测联系人是否存在
* 封装删除联系人函数
* 测试删除联系人功能





### 7.1  封装检测联系人是否存在

设计思路：



删除联系人前，我们需要先判断用户输入的联系人是否存在，如果存在删除，不存在提示用户没有要删除的联系人

因此我们可以把检测联系人是否存在封装成一个函数中，如果存在，返回联系人在通讯录中的位置，不存在返回-1



检测联系人是否存在代码：

```C++
//判断是否存在查询的人员，存在返回在数组中索引位置，不存在返回-1
int isExist(Addressbooks * abs, string name)
{
	for (int i = 0; i < abs->m_Size; i++)
	{
		if (abs->personArray[i].m_Name == name)
		{
			return i;
		}
	}
	return -1;
}

```



### 7.2 封装删除联系人函数



根据用户输入的联系人判断该通讯录中是否有此人

查找到进行删除，并提示删除成功

查不到提示查无此人。



```C++
//3、删除指定联系人信息
void deletePerson(Addressbooks * abs)
{
	cout << "请输入您要删除的联系人" << endl;
	string name;
	cin >> name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		for (int i = ret; i < abs->m_Size; i++)
		{
			abs->personArray[i] = abs->personArray[i + 1];
		}
         abs->m_Size--;
		cout << "删除成功" << endl;
	}
	else
	{
		cout << "查无此人" << endl;
	}

	system("pause");
	system("cls");
}
```



### 7.3 测试删除联系人功能

在switch case 语句中，case3里添加：

```C++
case 3:  //删除联系人
	deletePerson(&abs);
	break;
```

测试效果如图：

存在情况：

![1544167951559](assets/1544167951559.png)

不存在情况：

![1544168010831](assets/1544168010831.png)









## 8、查找联系人

功能描述：按照姓名查看指定联系人信息

查找联系人实现步骤

* 封装查找联系人函数
* 测试查找指定联系人

### 8.1 封装查找联系人函数

实现思路：判断用户指定的联系人是否存在，如果存在显示信息，不存在则提示查无此人。

查找联系人代码：

```C++
//4、查找指定联系人信息
void findPerson(Addressbooks * abs)
{
	cout << "请输入您要查找的联系人" << endl;
	string name;
	cin >> name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		cout << "姓名：" << abs->personArray[ret].m_Name << "\t";
		cout << "性别：" << abs->personArray[ret].m_Sex << "\t";
		cout << "年龄：" << abs->personArray[ret].m_Age << "\t";
		cout << "电话：" << abs->personArray[ret].m_Phone << "\t";
		cout << "住址：" << abs->personArray[ret].m_Addr << endl;
	}
	else
	{
		cout << "查无此人" << endl;
	}

	system("pause");
	system("cls");

}
```



### 8.2 测试查找指定联系人

在switch case 语句中，case4里添加：

```C++
case 4:  //查找联系人
	findPerson(&abs);
	break;
```



测试效果如图

存在情况：

![1544170057646](assets/1544170057646.png)



不存在情况：

![1544170254021](assets/1544170254021.png)









## 9、修改联系人

功能描述：按照姓名重新修改指定联系人

修改联系人实现步骤

* 封装修改联系人函数
* 测试修改联系人功能



### 9.1 封装修改联系人函数

实现思路：查找用户输入的联系人，如果查找成功进行修改操作，查找失败提示查无此人



修改联系人代码：

```C++
//5、修改指定联系人信息
void modifyPerson(Addressbooks * abs)
{
	cout << "请输入您要修改的联系人" << endl;
	string name;
	cin >> name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		//姓名
		string name;
		cout << "请输入姓名：" << endl;
		cin >> name;
		abs->personArray[ret].m_Name = name;

		cout << "请输入性别：" << endl;
		cout << "1 -- 男" << endl;
		cout << "2 -- 女" << endl;

		//性别
		int sex = 0;
		while (true)
		{
			cin >> sex;
			if (sex == 1 || sex == 2)
			{
				abs->personArray[ret].m_Sex = sex;
				break;
			}
			cout << "输入有误，请重新输入";
		}

		//年龄
		cout << "请输入年龄：" << endl;
		int age = 0;
		cin >> age;
		abs->personArray[ret].m_Age = age;

		//联系电话
		cout << "请输入联系电话：" << endl;
		string phone = "";
		cin >> phone;
		abs->personArray[ret].m_Phone = phone;

		//家庭住址
		cout << "请输入家庭住址：" << endl;
		string address;
		cin >> address;
		abs->personArray[ret].m_Addr = address;

		cout << "修改成功" << endl;
	}
	else
	{
		cout << "查无此人" << endl;
	}

	system("pause");
	system("cls");

}
```





### 9.2 测试修改联系人功能

在switch case 语句中，case 5里添加：

```C++
case 5:  //修改联系人
	modifyPerson(&abs);
	break;
```



测试效果如图：

查不到指定联系人情况：

![1544172265676](assets/1544172265676.png)

查找到联系人，并修改成功：

![1544172164141](assets/1544172164141.png)

再次查看通讯录，确认修改完毕

![1544172228627](assets/1544172228627.png)









## 10、清空联系人

功能描述：清空通讯录中所有信息

清空联系人实现步骤

* 封装清空联系人函数
* 测试清空联系人

### 10.1 封装清空联系人函数

实现思路： 将通讯录所有联系人信息清除掉，只要将通讯录记录的联系人数量置为0，做逻辑清空即可。

清空联系人代码：

```C++
//6、清空所有联系人
void cleanPerson(Addressbooks * abs)
{
	abs->m_Size = 0;
	cout << "通讯录已清空" << endl;
	system("pause");
	system("cls");
}
```



### 10.2  测试清空联系人

在switch case 语句中，case 6 里添加：

```C++
case 6:  //清空联系人
	cleanPerson(&abs);
	break;
```



测试效果如图：

清空通讯录

![1544172909693](assets/1544172909693.png)

再次查看信息，显示记录为空

![1544172943653](assets/1544172943653.png)



**至此，通讯录管理系统完成！**



# 机房预约系统

## 1、机房预约系统需求

### 1.1 系统简介

* 学校现有几个规格不同的机房，由于使用时经常出现"撞车"现象,现开发一套机房预约系统，解决这一问题。

![1548682783885](assets/1548682783885.png)

### 1.2 身份简介

分别有三种身份使用该程序

* **学生代表**：申请使用机房
* **教师**：审核学生的预约申请
* **管理员**：给学生、教师创建账号

### 1.3 机房简介

机房总共有3间

* 1号机房   --- 最大容量20人
* 2号机房   --- 最多容量50人
* 3号机房   --- 最多容量100人

### 1.4 申请简介

* 申请的订单每周由管理员负责清空。
* 学生可以预约未来一周内的机房使用，预约的日期为周一至周五，预约时需要选择预约时段（上午、下午）
* 教师来审核预约，依据实际情况审核预约通过或者不通过

### 1.5 系统具体需求

* 首先进入登录界面，可选登录身份有：
  * 学生代表
  * 老师
  * 管理员
  * 退出
* 每个身份都需要进行验证后，进入子菜单
  * 学生需要输入 ：学号、姓名、登录密码
  * 老师需要输入：职工号、姓名、登录密码
  * 管理员需要输入：管理员姓名、登录密码
* 学生具体功能
  * 申请预约    ---   预约机房
  * 查看自身的预约    ---  查看自己的预约状态
  * 查看所有预约   ---   查看全部预约信息以及预约状态
  * 取消预约    ---   取消自身的预约，预约成功或审核中的预约均可取消
  * 注销登录    ---   退出登录
* 教师具体功能
  * 查看所有预约   ---   查看全部预约信息以及预约状态
  * 审核预约    ---   对学生的预约进行审核
  * 注销登录    ---   退出登录
* 管理员具体功能
  * 添加账号    ---   添加学生或教师的账号，需要检测学生编号或教师职工号是否重复
  * 查看账号    ---   可以选择查看学生或教师的全部信息
  * 查看机房    ---   查看所有机房的信息
  * 清空预约    ---   清空所有预约记录
  * 注销登录    ---   退出登录



![1548682206670](assets/1548682206670.png)



## 2、创建项目

创建项目步骤如下：

- 创建新项目
- 添加文件

### 2.1 创建项目

- 打开vs2017后，点击创建新项目，创建新的C++项目

如图：

![1548682413343](assets/1548682413343.png)

* 填写项目名称以及选取项目路径，点击确定生成项目

![1548682522544](assets/1548682522544.png)

### 2.2 添加文件

- 右键源文件，进行添加文件操作

![1548682597721](assets/1548682597721.png)

* 填写文件名称，点击添加

![1548682679989](assets/1548682679989.png)

* 生成文件成功，效果如下图

![1548682733912](assets/1548682733912.png)



## 3、创建主菜单

**功能描述：**

* 设计主菜单，与用户进行交互

### 3.1 菜单实现

* 在主函数main中添加菜单提示，代码如下：

```C++
int main() {

	cout << "======================  欢迎来到传智播客机房预约系统  =====================" 
         << endl;
	cout << endl << "请输入您的身份" << endl;
	cout << "\t\t -------------------------------\n";
	cout << "\t\t|                               |\n";
	cout << "\t\t|          1.学生代表           |\n";
	cout << "\t\t|                               |\n";
	cout << "\t\t|          2.老    师           |\n";
	cout << "\t\t|                               |\n";
	cout << "\t\t|          3.管 理 员           |\n";
	cout << "\t\t|                               |\n";
	cout << "\t\t|          0.退    出           |\n";
	cout << "\t\t|                               |\n";
	cout << "\t\t -------------------------------\n";
	cout << "输入您的选择: ";

	system("pause");

	return 0;
}
```



运行效果如图：

![1548557945611](assets/1548557945611.png)



### 3.2 搭建接口

* 接受用户的选择，搭建接口
* 在main中添加代码

```C++
int main() {

	int select = 0;

	while (true)
	{

		cout << "======================  欢迎来到传智播客机房预约系统  =====================" << endl;
		cout << endl << "请输入您的身份" << endl;
		cout << "\t\t -------------------------------\n";
		cout << "\t\t|                               |\n";
		cout << "\t\t|          1.学生代表           |\n";
		cout << "\t\t|                               |\n";
		cout << "\t\t|          2.老    师           |\n";
		cout << "\t\t|                               |\n";
		cout << "\t\t|          3.管 理 员           |\n";
		cout << "\t\t|                               |\n";
		cout << "\t\t|          0.退    出           |\n";
		cout << "\t\t|                               |\n";
		cout << "\t\t -------------------------------\n";
		cout << "输入您的选择: ";

		cin >> select; //接受用户选择

		switch (select)
		{
		case 1:  //学生身份
			break;
		case 2:  //老师身份
			break;
		case 3:  //管理员身份
			break;
		case 0:  //退出系统
			break;
		default:
             cout << "输入有误，请重新选择！" << endl;
		    system("pause");
			system("cls");
			break;
		}

	}
	system("pause");
	return 0;
}
```

测试，输入0、1、2、3会重新回到界面，输入其他提示输入有误，清屏后重新选择

效果如图：

![1548558694230](assets/1548558694230.png)

至此，界面搭建完毕





## 4、 退出功能实现

### 4.1 退出功能实现

在main函数分支 0 选项中，添加退出程序的代码：

```C++
	cout << "欢迎下一次使用"<<endl;
	system("pause");
	return 0;
```



![1548558992754](assets/1548558992754.png)



### 4.2 测试退出功能

运行程序，效果如图：

![1548559026436](assets/1548559026436.png)

至此，退出程序功能实现





## 5、 创建身份类

### 5.1 身份的基类

* 在整个系统中，有三种身份，分别为：学生代表、老师以及管理员
* 三种身份有其共性也有其特性，因此我们可以将三种身份抽象出一个身份基类**identity**
* 在头文件下创建Identity.h文件



Identity.h中添加如下代码：

```C++
#pragma once
#include<iostream>
using namespace std;

//身份抽象类
class Identity
{
public:

	//操作菜单
	virtual void operMenu() = 0;

	string m_Name; //用户名
	string m_Pwd;  //密码
};
```

效果如图：

![1548573329273](assets/1548573329273.png)







### 5.2 学生类

#### 5.2.1 功能分析

* 学生类主要功能是可以通过类中成员函数，实现预约实验室操作

* 学生类中主要功能有：

  * 显示学生操作的菜单界面
  * 申请预约
  * 查看自身预约
  * 查看所有预约
  * 取消预约

  

#### 5.2.2 类的创建

* 在头文件以及源文件下创建 student.h 和 student.cpp文件



student.h中添加如下代码：

```C++
#pragma once
#include<iostream>
using namespace std;
#include "identity.h"

//学生类
class Student :public Identity
{
public:
	//默认构造
	Student();

	//有参构造(学号、姓名、密码)
	Student(int id, string name, string pwd);

	//菜单界面
	virtual void operMenu(); 

	//申请预约
	void applyOrder(); 

	//查看我的预约
	void showMyOrder(); 

	//查看所有预约
	void showAllOrder(); 

	//取消预约
	void cancelOrder();
	
	//学生学号
	int m_Id;

};
```



student.cpp中添加如下代码：

```C++
#include "student.h"

//默认构造
Student::Student()
{
}

//有参构造(学号、姓名、密码)
Student::Student(int id, string name, string pwd)
{
}

//菜单界面
void Student::operMenu()
{
}

//申请预约
void Student::applyOrder()
{

}

//查看我的预约
void Student::showMyOrder()
{

}

//查看所有预约
void Student::showAllOrder()
{

}

//取消预约
void Student::cancelOrder()
{

}

```





### 5.3 老师类

#### 5.3.1 功能分析

- 教师类主要功能是查看学生的预约，并进行审核

- 教师类中主要功能有：

  - 显示教师操作的菜单界面

  - 查看所有预约

  - 审核预约

    

#### 5.3.2 类的创建

- 在头文件以及源文件下创建 teacher.h 和 teacher.cpp文件

teacher.h中添加如下代码：

```C++
#pragma once
#define _CRT_SECURE_NO_WARNINGS
#include<iostream>
using namespace std;
#include "identity.h"

class Teacher :public Identity
{
public:

	//默认构造
	Teacher();

	//有参构造 (职工编号，姓名，密码)
	Teacher(int empId, string name, string pwd);

	//菜单界面
	virtual void operMenu();

	//查看所有预约
	void showAllOrder(); 

	//审核预约
	void validOrder(); 

	int m_EmpId; //教师编号

};
```



* teacher.cpp中添加如下代码:

```C++
#include"teacher.h"

//默认构造
Teacher::Teacher()
{
}

//有参构造 (职工编号，姓名，密码)
Teacher::Teacher(int empId, string name, string pwd)
{
}

//菜单界面
void Teacher::operMenu()
{
}

//查看所有预约
void Teacher::showAllOrder()
{
}

//审核预约
void Teacher::validOrder()
{
}
```









### 5.4 管理员类

#### 5.4.1 功能分析

- 管理员类主要功能是对学生和老师账户进行管理，查看机房信息以及清空预约记录

- 管理员类中主要功能有：

  - 显示管理员操作的菜单界面

  - 添加账号

  - 查看账号

  - 查看机房信息

  - 清空预约记录

    

#### 5.4.2 类的创建

- 在头文件以及源文件下创建 manager.h 和 manager.cpp文件

manager.h中添加如下代码：

```C++
#pragma once
#include<iostream>
using namespace std;
#include "identity.h"

class Manager :public Identity
{
public:

	//默认构造
	Manager();

	//有参构造  管理员姓名，密码
	Manager(string name, string pwd);

	//选择菜单
	virtual void operMenu();

	//添加账号  
	void addPerson();

	//查看账号
	void showPerson();

	//查看机房信息
	void showComputer();

	//清空预约记录
	void cleanFile();

};
```



* manager.cpp中添加如下代码:

```C++
#include "manager.h"

//默认构造
Manager::Manager()
{
}

//有参构造
Manager::Manager(string name, string pwd)
{
}

//选择菜单
void Manager::operMenu()
{
}

//添加账号  
void Manager::addPerson()
{
}

//查看账号
void Manager::showPerson()
{
}

//查看机房信息
void Manager::showComputer()
{
}

//清空预约记录
void Manager::cleanFile()
{
}
```

至此，所有身份类创建完毕，效果如图：

![1548574390768](assets/1548574390768.png)









## 6、  登录模块

### 6.1 全局文件添加

功能描述：

* 不同的身份可能会用到不同的文件操作，我们可以将所有的文件名定义到一个全局的文件中
* 在头文件中添加 **globalFile.h** 文件
* 并添加如下代码：

```C++
#pragma once 

//管理员文件
#define ADMIN_FILE     "admin.txt"
//学生文件
#define STUDENT_FILE   "student.txt"
//教师文件
#define TEACHER_FILE   "teacher.txt"
//机房信息文件
#define COMPUTER_FILE  "computerRoom.txt"
//订单文件
#define ORDER_FILE     "order.txt"
```



并且在同级目录下，创建这几个文件

![1548575650130](assets/1548575650130.png)



### 6.2  登录函数封装

功能描述：

* 根据用户的选择，进入不同的身份登录

在预约系统的.cpp文件中添加全局函数 `void LoginIn(string fileName, int type)`

参数：

* fileName  --- 操作的文件名
* type      ---  登录的身份  （1代表学生、2代表老师、3代表管理员）



LoginIn中添加如下代码：

```C++
#include "globalFile.h"
#include "identity.h"
#include <fstream>
#include <string>


//登录功能
void LoginIn(string fileName, int type)
{

	Identity * person = NULL;

	ifstream ifs;
	ifs.open(fileName, ios::in);

	//文件不存在情况
	if (!ifs.is_open())
	{
		cout << "文件不存在" << endl;
		ifs.close();
		return;
	}

	int id = 0;
	string name;
	string pwd;

	if (type == 1)	//学生登录
	{
		cout << "请输入你的学号" << endl;
		cin >> id;
	}
	else if (type == 2) //教师登录
	{
		cout << "请输入你的职工号" << endl;
		cin >> id;
	}

	cout << "请输入用户名：" << endl;
	cin >> name;

	cout << "请输入密码： " << endl;
	cin >> pwd;


	if (type == 1)
	{
		//学生登录验证
	}
	else if (type == 2)
	{
		//教师登录验证
	}
	else if(type == 3)
	{
		//管理员登录验证
	}
	
	cout << "验证登录失败!" << endl;

	system("pause");
	system("cls");
	return;
}
```

* 在main函数的不同分支中，填入不同的登录接口

![1548575945985](assets/1548575945985.png)







### 6.3 学生登录实现

在student.txt文件中添加两条学生信息，用于测试

添加信息:   

```c++
1 张三 123
2 李四 123456
```

其中：

* 第一列  代表  **学号**
* 第二列  代表  **学生姓名**
* 第三列  代表  **密码**

效果图：

![1548583693555](assets/1548583693555.png)

在Login函数的学生分支中加入如下代码，验证学生身份

```C++
		//学生登录验证
		int fId;
		string fName;
		string fPwd;
		while (ifs >> fId && ifs >> fName && ifs >> fPwd)
		{
			if (id == fId && name == fName && pwd == fPwd)
			{
				cout << "学生验证登录成功!" << endl;
				system("pause");
				system("cls");
				person = new Student(id, name, pwd);
				
				return;
			}
		}
```

添加代码效果图

![1548583915819](assets/1548583915819.png)

测试：

![1548583950828](assets/1548583950828.png)







### 6.4 教师登录实现

在teacher.txt文件中添加一条老师信息，用于测试

添加信息:   

```c++
1 老王 123
```

其中：

- 第一列  代表  **教师职工编号**
- 第二列  代表  **教师姓名**
- 第三列  代表  **密码**

效果图：

![1548584030522](assets/1548584030522.png)

在Login函数的教师分支中加入如下代码，验证教师身份

```c++
		//教师登录验证
		int fId;
		string fName;
		string fPwd;
		while (ifs >> fId && ifs >> fName && ifs >> fPwd)
		{
			if (id == fId && name == fName && pwd == fPwd)
			{
				cout << "教师验证登录成功!" << endl;
				system("pause");
				system("cls");
				person = new Teacher(id, name, pwd);
				return;
			}
		}
```

添加代码效果图

![1548584158339](assets/1548584158339.png)

测试：

![1548584177003](assets/1548584177003.png)







### 6.5 管理员登录实现

在admin.txt文件中添加一条管理员信息，由于我们只有一条管理员，因此本案例中没有添加管理员的功能

添加信息:   

```C++
admin 123
```

其中：`admin`代表管理员用户名，`123`代表管理员密码

效果图：

![1548577855190](assets/1548577855190.png)

在Login函数的管理员分支中加入如下代码，验证管理员身份

```C++
//管理员登录验证
		string fName;
		string fPwd;
		while (ifs >> fName && ifs >> fPwd)
		{
			if (name == fName && pwd == fPwd)
			{
				cout << "验证登录成功!" << endl;
				//登录成功后，按任意键进入管理员界面
				system("pause");
				system("cls");
				//创建管理员对象
				person = new Manager(name,pwd);
				return;
			}
		}
```

添加效果如图：

![1548588322712](assets/1548588322712.png)

测试效果如图：

![1548583245072](assets/1548583245072.png)



至此，所有身份的登录功能全部实现！







## 7、 管理员模块

### 7.1  管理员登录和注销

#### 7.1.1 构造函数

* 在Manager类的构造函数中，初始化管理员信息，代码如下：

```C++
//有参构造
Manager::Manager(string name, string pwd)
{
	this->m_Name = name;
	this->m_Pwd = pwd;
}
```





#### 7.1.2  管理员子菜单

* 在机房预约系统.cpp中，当用户登录的是管理员，添加管理员菜单接口
* 将不同的分支提供出来
  * 添加账号
  * 查看账号
  * 查看机房
  * 清空预约
  * 注销登录
* 实现注销功能

添加全局函数 `void managerMenu(Identity * &manager)`，代码如下：

```C++
//管理员菜单
void managerMenu(Identity * &manager)
{
	while (true)
	{
		//管理员菜单
		manager->operMenu();

		Manager* man = (Manager*)manager;
		int select = 0;

		cin >> select;
        
		if (select == 1)  //添加账号
		{
			cout << "添加账号" << endl;
			man->addPerson();
		}
		else if (select == 2) //查看账号
		{
			cout << "查看账号" << endl;
			man->showPerson(); 
		}
		else if (select == 3) //查看机房
		{
			cout << "查看机房" << endl;
			man->showComputer();
		}
		else if (select == 4) //清空预约
		{
			cout << "清空预约" << endl;
			man->cleanFile();
		}
		else
		{
			delete manager;
			cout << "注销成功" << endl;
			system("pause");
			system("cls");
			return;
		}
	}
}
```



#### 7.1.3 菜单功能实现

- 在实现成员函数`void Manager::operMenu()` 代码如下：

```c++
//选择菜单
void Manager::operMenu()
{
	cout << "欢迎管理员："<<this->m_Name << "登录！" << endl;
	cout << "\t\t ---------------------------------\n";
	cout << "\t\t|                                |\n";
	cout << "\t\t|          1.添加账号            |\n";
	cout << "\t\t|                                |\n";
	cout << "\t\t|          2.查看账号            |\n";
	cout << "\t\t|                                |\n";
	cout << "\t\t|          3.查看机房            |\n";
	cout << "\t\t|                                |\n";
	cout << "\t\t|          4.清空预约            |\n";
	cout << "\t\t|                                |\n";
	cout << "\t\t|          0.注销登录            |\n";
	cout << "\t\t|                                |\n";
	cout << "\t\t ---------------------------------\n";
	cout << "请选择您的操作： " << endl;
}
```



#### 7.1.4 接口对接

* 管理员成功登录后，调用管理员子菜单界面
* 在管理员登录验证分支中，添加代码：

```C++
				//进入管理员子菜单
				managerMenu(person);
```

添加效果如：

![1548589297779](assets/1548589297779.png)

测试对接，效果如图：

![1548589344206](assets/1548589344206.png)

登录成功

![1548589328710](assets/1548589328710.png)

注销登录：

![1548589416576](assets/1548589416576.png)

至此，管理员身份可以成功登录以及注销



### 7.2 添加账号 

功能描述：

* 给学生或教师添加新的账号

功能要求：

* 添加时学生学号不能重复、教师职工号不能重复



#### 7.2.1 添加功能实现

在Manager的**addPerson**成员函数中，实现添加新账号功能，代码如下：

```C++
//添加账号  
void Manager::addPerson()
{

	cout << "请输入添加账号的类型" << endl;
	cout << "1、添加学生" << endl;
	cout << "2、添加老师" << endl;

	string fileName;
	string tip;
	ofstream ofs;

	int select = 0;
	cin >> select;

	if (select == 1)
	{
		fileName = STUDENT_FILE;
		tip = "请输入学号： ";
	}
	else
	{
		fileName = TEACHER_FILE;
		tip = "请输入职工编号：";
	}

	ofs.open(fileName, ios::out | ios::app);
	int id;
	string name;
	string pwd;
	cout <<tip << endl;
	cin >> id;

	cout << "请输入姓名： " << endl;
	cin >> name;

	cout << "请输入密码： " << endl;
	cin >> pwd;

	ofs << id << " " << name << " " << pwd << " " << endl;
	cout << "添加成功" << endl;

	system("pause");
	system("cls");

	ofs.close();
}
```



测试添加学生：

![1548641024216](assets/1548641024216.png)

成功在学生文件中添加了一条信息

![1548641141027](assets/1548641141027.png)

测试添加教师：

![1548641195834](assets/1548641195834.png)

成功在教师文件中添加了一条信息

![1548641237513](assets/1548641237513.png)



#### 7.2.2 去重操作

功能描述：添加新账号时，如果是重复的学生编号，或是重复的教师职工编号，提示有误

##### 7.2.2.1 读取信息

* 要去除重复的账号，首先要先将学生和教师的账号信息获取到程序中，方可检测
* 在manager.h中，添加两个容器，用于存放学生和教师的信息
* 添加一个新的成员函数  `void initVector()` 初始化容器

```C++
	//初始化容器
	void initVector();

	//学生容器
	vector<Student> vStu;

	//教师容器
	vector<Teacher> vTea;
```

添加位置如图：

![1548644354561](assets/1548644354561.png)

在Manager的有参构造函数中，获取目前的学生和教师信息

代码如下：

```C++
void Manager::initVector()
{
	//读取学生文件中信息
	ifstream ifs;
	ifs.open(STUDENT_FILE, ios::in);
	if (!ifs.is_open())
	{
		cout << "文件读取失败" << endl;
		return;
	}
    
	vStu.clear();
     vTea.clear();
    
	Student s;
	while (ifs >> s.m_Id && ifs >> s.m_Name &&  ifs >> s.m_Pwd)
	{
		vStu.push_back(s);
	}
	cout << "当前学生数量为： " << vStu.size() << endl;
	ifs.close(); //学生初始化

	//读取老师文件信息
	ifs.open(TEACHER_FILE, ios::in);

	Teacher t;
	while (ifs >> t.m_EmpId && ifs >> t.m_Name &&  ifs >> t.m_Pwd)
	{
		vTea.push_back(t);
	}
	cout << "当前教师数量为： " << vTea.size() << endl;

	ifs.close();
}
```



在有参构造函数中，调用初始化容器函数

```C++
//有参构造
Manager::Manager(string name, string pwd)
{
	this->m_Name = name;
	this->m_Pwd = pwd;
    
	//初始化容器
	this->initVector();
}
```





测试，运行代码可以看到测试代码获取当前学生和教师数量

![1548642488049](assets/1548642488049.png)



##### 7.2.2.2 去重函数封装

在manager.h文件中添加成员函数` bool checkRepeat(int id, int type);`

```C++
	//检测重复 参数:(传入id，传入类型) 返回值：(true 代表有重复，false代表没有重复)
	bool checkRepeat(int id, int type);
```



在manager.cpp文件中实现成员函数  ` bool checkRepeat(int id, int type);`

```C++
bool Manager::checkRepeat(int id, int type)
{
	if (type == 1)
	{
		for (vector<Student>::iterator it = vStu.begin(); it != vStu.end(); it++)
		{
			if (id == it->m_Id)
			{
				return true;
			}
		}
	}
	else
	{
		for (vector<Teacher>::iterator it = vTea.begin(); it != vTea.end(); it++)
		{
			if (id == it->m_EmpId)
			{
				return true;
			}
		}
	}
	return false;
}
```



##### 7.2.2.3 添加去重操作

在添加学生编号或者教师职工号时，检测是否有重复，代码如下：

```C++
	string errorTip; //重复错误提示

	if (select == 1)
	{
		fileName = STUDENT_FILE;
		tip = "请输入学号： ";
		errorTip = "学号重复，请重新输入";
	}
	else
	{
		fileName = TEACHER_FILE;
		tip = "请输入职工编号：";
		errorTip = "职工号重复，请重新输入";
	}
	ofs.open(fileName, ios::out | ios::app);
	int id;
	string name;
	string pwd;
	cout <<tip << endl;

	while (true)
	{
		cin >> id;

		bool ret = this->checkRepeat(id, 1);

		if (ret) //有重复
		{
			cout << errorTip << endl;
		}
		else
		{
			break;
		}
	}
```

代码位置如图：

![1548643909979](assets/1548643909979.png)



检测效果：



![1548644151974](assets/1548644151974.png)



##### 7.2.2.4 bug解决

bug描述：

* 虽然可以检测重复的账号，但是刚添加的账号由于没有更新到容器中，因此不会做检测
* 导致刚加入的账号的学生号或者职工编号，再次添加时依然可以重复

解决方案：

* 在每次添加新账号时，重新初始化容器

在添加完毕后，加入代码：

```C++
	//初始化容器
	this->initVector();
```

位置如图：

![1548644779578](assets/1548644779578.png)

再次测试，刚加入的账号不会重复添加了！





### 7.3  显示账号

功能描述：显示学生信息或教师信息



#### 7.3.1 显示功能实现

在Manager的**showPerson**成员函数中，实现显示账号功能，代码如下：

```C++
void printStudent(Student & s)
{
	cout << "学号： " << s.m_Id << " 姓名： " << s.m_Name << " 密码：" << s.m_Pwd << endl;
}
void printTeacher(Teacher & t)
{
	cout << "职工号： " << t.m_EmpId << " 姓名： " << t.m_Name << " 密码：" << t.m_Pwd << endl;
}

void Manager::showPerson()
{
	cout << "请选择查看内容：" << endl;
	cout << "1、查看所有学生" << endl;
	cout << "2、查看所有老师" << endl;

	int select = 0;

	cin >> select;
    
	if (select == 1)
	{
		cout << "所有学生信息如下： " << endl;
		for_each(vStu.begin(), vStu.end(), printStudent);
	}
	else
	{
		cout << "所有老师信息如下： " << endl;
		for_each(vTea.begin(), vTea.end(), printTeacher);
	}
	system("pause");
	system("cls");
}
```



#### 7.3.2 测试

测试查看学生效果

![1548646791248](assets/1548646791248.png)



测试查看教师效果

![1548646833665](assets/1548646833665.png)

至此，显示账号功能实现完毕





### 7.4 查看机房

#### 7.4.1 添加机房信息

案例需求中，机房一共有三个，其中1号机房容量20台机器，2号50台，3号100台

我们可以将信息录入到computerRoom.txt中

![1548647538570](assets/1548647538570.png)



#### 7.4.2 机房类创建

在头文件下，创建新的文件 computerRoom.h

并添加如下代码：

```C++
#pragma once
#include<iostream>
using namespace std;
//机房类
class ComputerRoom
{
public:

	int m_ComId; //机房id号

	int m_MaxNum; //机房最大容量
};
```





#### 7.4.3 初始化机房信息

在Manager管理员类下，添加机房的容器,用于保存机房信息

```C++
	//机房容器
	vector<ComputerRoom> vCom;
```

在Manager有参构造函数中，追加如下代码，初始化机房信息

```C++
	//获取机房信息
	ifstream ifs;

	ifs.open(COMPUTER_FILE, ios::in);

	ComputerRoom c;
	while (ifs >> c.m_ComId && ifs >> c.m_MaxNum)
	{
		vCom.push_back(c);
	}
	cout << "当前机房数量为： " << vCom.size() << endl;

	ifs.close();
```

位置如图：

![1548647976462](assets/1548647976462.png)

因为机房信息目前版本不会有所改动，如果后期有修改功能，最好封装到一个函数中，方便维护



#### 7.4.4 显示机房信息

在Manager类的showComputer成员函数中添加如下代码：

```C++
//查看机房信息
void Manager::showComputer()
{
	cout << "机房信息如下： " << endl;
	for (vector<ComputerRoom>::iterator it = vCom.begin(); it != vCom.end(); it++)
	{
		cout << "机房编号： " << it->m_ComId << " 机房最大容量： " << it->m_MaxNum << endl;
	}
	system("pause");
	system("cls");
}
```

测试显示机房信息功能：

![1548648276929](assets/1548648276929.png)





### 7.5 清空预约

功能描述：

清空生成的`order.txt`预约文件

#### 7.5.1 清空功能实现

在Manager的cleanFile成员函数中添加如下代码：

```C++
//清空预约记录
void Manager::cleanFile()
{
	ofstream ofs(ORDER_FILE, ios::trunc);
	ofs.close();

	cout << "清空成功！" << endl;
	system("pause");
	system("cls");
}
```

测试清空，可以随意写入一些信息在order.txt中，然后调用cleanFile清空文件接口，查看是否清空干净







## 8、 学生模块

### 8.1 学生登录和注销

#### 8.1.1 构造函数

- 在Student类的构造函数中，初始化学生信息，代码如下：

```c++
//有参构造(学号、姓名、密码)
Student::Student(int id, string name, string pwd)
{
	//初始化属性
	this->m_Id = id;
	this->m_Name = name;
	this->m_Pwd = pwd;
}
```



#### 8.1.2  管理员子菜单

- 在机房预约系统.cpp中，当用户登录的是学生，添加学生菜单接口
- 将不同的分支提供出来
  - 申请预约
  - 查看我的预约
  - 查看所有预约
  - 取消预约
  - 注销登录
- 实现注销功能

添加全局函数 `void studentMenu(Identity * &manager)` 代码如下：

```C++
//学生菜单
void studentMenu(Identity * &student)
{
	while (true)
	{
		//学生菜单
		student->operMenu();

		Student* stu = (Student*)student;
		int select = 0;

		cin >> select;

		if (select == 1) //申请预约
		{
			stu->applyOrder();
		}
		else if (select == 2) //查看自身预约
		{
			stu->showMyOrder();
		}
		else if (select == 3) //查看所有预约
		{
			stu->showAllOrder();
		}
		else if (select == 4) //取消预约
		{
			stu->cancelOrder();
		}
		else
		{
			delete student;
			cout << "注销成功" << endl;
			system("pause");
			system("cls");
			return;
		}
	}
}
```



#### 8.1.3 菜单功能实现

- 在实现成员函数`void Student::operMenu()` 代码如下：

```c++
//菜单界面
void Student::operMenu()
{
	cout << "欢迎学生代表：" << this->m_Name << "登录！" << endl;
	cout << "\t\t ----------------------------------\n";
	cout << "\t\t|                                 |\n";
	cout << "\t\t|          1.申请预约              |\n";
	cout << "\t\t|                                 |\n";
	cout << "\t\t|          2.查看我的预约          |\n";
	cout << "\t\t|                                 |\n";
	cout << "\t\t|          3.查看所有预约          |\n";
	cout << "\t\t|                                 |\n";
	cout << "\t\t|          4.取消预约              |\n";
	cout << "\t\t|                                 |\n";
	cout << "\t\t|          0.注销登录              |\n";
	cout << "\t\t|                                 |\n";
	cout << "\t\t ----------------------------------\n";
	cout << "请选择您的操作： " << endl;
}
```



#### 8.1.4 接口对接

- 学生成功登录后，调用学生的子菜单界面
- 在学生登录分支中，添加代码：

```c++
				//进入学生子菜单
				studentMenu(person);
```

添加效果如图：

![1548659552298](assets/1548659552298.png)

测试对接，效果如图：

登录验证通过：

![1548659590221](assets/1548659590221.png)

学生子菜单：

![1548659670651](assets/1548659670651.png)

注销登录：

![1548659682402](assets/1548659682402.png)



### 8.2 申请预约

#### 8.2.1 获取机房信息

* 在申请预约时，学生可以看到机房的信息，因此我们需要让学生获取到机房的信息

在student.h中添加新的成员函数如下：

```C++
	//机房容器
	vector<ComputerRoom> vCom;
```

在学生的有参构造函数中追加如下代码：

```C++
	//获取机房信息
	ifstream ifs;
	ifs.open(COMPUTER_FILE, ios::in);

	ComputerRoom c;
	while (ifs >> c.m_ComId && ifs >> c.m_MaxNum)
	{
		vCom.push_back(c);
	}

	ifs.close();
```

追加位置如图：

![1548661562158](assets/1548661562158.png)

至此，vCom容器中保存了所有机房的信息



#### 8.2.2 预约功能实现

在student.cpp中实现成员函数 `void Student::applyOrder()`

```C++
//申请预约
void Student::applyOrder()
{
	cout << "机房开放时间为周一至周五！" << endl;
	cout << "请输入申请预约的时间：" << endl;
	cout << "1、周一" << endl;
	cout << "2、周二" << endl;
	cout << "3、周三" << endl;
	cout << "4、周四" << endl;
	cout << "5、周五" << endl;
	int date = 0;
	int interval = 0;
	int room = 0;

	while (true)
	{
		cin >> date;
		if (date >= 1 && date <= 5)
		{
			break;
		}
		cout << "输入有误，请重新输入" << endl;
	}


	cout << "请输入申请预约的时间段：" << endl;
	cout << "1、上午" << endl;
	cout << "2、下午" << endl;

	while (true)
	{
		cin >> interval;
		if (interval >= 1 && interval <= 2)
		{
			break;
		}
		cout << "输入有误，请重新输入" << endl;
	}

	cout << "请选择机房：" << endl;
	cout << "1号机房容量：" << vCom[0].m_MaxNum << endl;
	cout << "2号机房容量：" << vCom[1].m_MaxNum << endl;
	cout << "3号机房容量：" << vCom[2].m_MaxNum << endl;

	while (true)
	{
		cin >> room;
		if (room >= 1 && room <= 3)
		{
			break;
		}
		cout << "输入有误，请重新输入" << endl;
	}

	cout << "预约成功！审核中" << endl;

	ofstream ofs(ORDER_FILE, ios::app);
	ofs << "date:" << date << " ";
	ofs << "interval:" << interval << " ";
	ofs << "stuId:" << this->m_Id << " ";
	ofs << "stuName:" << this->m_Name << " ";
	ofs << "roomId:" << room << " ";
	ofs << "status:" << 1 << endl;

	ofs.close();

	system("pause");
	system("cls");
}
```



运行程序，测试代码:

![1548728936052](assets/1548728936052.png)

在order.txt文件中生成如下内容：

![1548662281801](assets/1548662281801.png)





### 8.3 显示预约

#### 8.3.1 创建预约类

功能描述：显示预约记录时，需要从文件中获取到所有记录，用来显示，创建预约的类来管理记录以及更新

在头文件以及源文件下分别创建**orderFile.h** 和 **orderFile.cpp**文件

orderFile.h中添加如下代码：

```C++
#pragma once
#include<iostream>
using namespace std;
#include <map>
#include "globalFile.h"

class OrderFile
{
public:

	//构造函数
	OrderFile();

	//更新预约记录
	void updateOrder();

	//记录的容器  key --- 记录的条数  value --- 具体记录的键值对信息
	map<int, map<string, string>> m_orderData;

	//预约记录条数
	int m_Size;
};
```



**构造函数**中获取所有信息，并存放在容器中，添加如下代码：

```C++
OrderFile::OrderFile()
{
	ifstream ifs;
	ifs.open(ORDER_FILE, ios::in);

	string date;      //日期
	string interval;  //时间段
	string stuId;     //学生编号
	string stuName;   //学生姓名
	string roomId;    //机房编号
	string status;    //预约状态


	this->m_Size = 0; //预约记录个数

	while (ifs >> date && ifs >> interval && ifs >> stuId && ifs >> stuName && ifs >> roomId &&  ifs >> status)
	{
		//测试代码
		/*
		cout << date << endl;
		cout << interval << endl;
		cout << stuId << endl;
		cout << stuName << endl;
		cout << roomId << endl;
		cout << status << endl;
		*/

		string key;
		string value;
		map<string, string> m;

		int pos = date.find(":");
		if (pos != -1)
		{
			key = date.substr(0, pos);
			value = date.substr(pos + 1, date.size() - pos -1);
			m.insert(make_pair(key, value));
		}

		pos = interval.find(":");
		if (pos != -1)
		{
			key = interval.substr(0, pos);
			value = interval.substr(pos + 1, interval.size() - pos -1 );
			m.insert(make_pair(key, value));
		}

		pos = stuId.find(":");
		if (pos != -1)
		{
			key = stuId.substr(0, pos);
			value = stuId.substr(pos + 1, stuId.size() - pos -1 );
			m.insert(make_pair(key, value));
		}

		pos = stuName.find(":");
		if (pos != -1)
		{
			key = stuName.substr(0, pos);
			value = stuName.substr(pos + 1, stuName.size() - pos -1);
			m.insert(make_pair(key, value));
		}

		pos = roomId.find(":");
		if (pos != -1)
		{
			key = roomId.substr(0, pos);
			value = roomId.substr(pos + 1, roomId.size() - pos -1 );
			m.insert(make_pair(key, value));
		}

		pos = status.find(":");
		if (pos != -1)
		{
			key = status.substr(0, pos);
			value = status.substr(pos + 1, status.size() - pos -1);
			m.insert(make_pair(key, value));
		}


		this->m_orderData.insert(make_pair(this->m_Size, m));
		this->m_Size++;
	}

	//测试代码
	//for (map<int, map<string, string>>::iterator it = m_orderData.begin(); it != m_orderData.end();it++)
	//{
	//	cout << "key = " << it->first << " value = " << endl;
	//	for (map<string, string>::iterator mit = it->second.begin(); mit != it->second.end(); mit++)
	//	{
	//		cout << mit->first << " " << mit->second << " ";
	//	}
	//	cout << endl;
	//}
    
    ifs.close();
}

```



更新预约记录的成员函数updateOrder代码如下：

```C++
void OrderFile::updateOrder()
{
	if (this->m_Size == 0)
	{
		return;
	}

	ofstream ofs(ORDER_FILE, ios::out | ios::trunc);
	for (int i = 0; i < m_Size;i++)
	{
		ofs << "date:" << this->m_orderData[i]["date"] << " ";
		ofs << "interval:" << this->m_orderData[i]["interval"] << " ";
		ofs << "stuId:" << this->m_orderData[i]["stuId"] << " ";
		ofs << "stuName:" << this->m_orderData[i]["stuName"] << " ";
		ofs << "roomId:" << this->m_orderData[i]["roomId"] << " ";
		ofs << "status:" << this->m_orderData[i]["status"] << endl;
	}
    ofs.close();
}
```



#### 8.3.2 显示自身预约

首先我们先添加几条预约记录，可以用程序添加或者直接修改order.txt文件

order.txt文件内容如下： 比如我们有三名同学分别产生了3条预约记录

![1548667534747](assets/1548667534747.png)

在Student类的`void Student::showMyOrder()`成员函数中，添加如下代码

```C++
//查看我的预约
void Student::showMyOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout << "无预约记录" << endl;
		system("pause");
		system("cls");
		return;
	}
	for (int i = 0; i < of.m_Size; i++)
	{
		if (atoi(of.m_orderData[i]["stuId"].c_str()) == this->m_Id)
		{
			cout << "预约日期： 周" << of.m_orderData[i]["date"];
			cout << " 时段：" << (of.m_orderData[i]["interval"] == "1" ? "上午" : "下午");
			cout << " 机房：" << of.m_orderData[i]["roomId"];
			string status = " 状态： ";  // 0 取消的预约   1 审核中   2 已预约 -1 预约失败
			if (of.m_orderData[i]["status"] == "1")
			{
				status += "审核中";
			}
			else if (of.m_orderData[i]["status"] == "2")
			{
				status += "预约成功";
			}
			else if (of.m_orderData[i]["status"] == "-1")
			{
				status += "审核未通过，预约失败";
			}
			else
			{
				status += "预约已取消";
			}
			cout << status << endl;

		}
	}

	system("pause");
	system("cls");
}
```

测试效果如图：

![1548667252474](assets/1548667252474.png)



#### 8.3.3 显示所有预约

在Student类的`void Student::showAllOrder()`成员函数中，添加如下代码

```C++
//查看所有预约
void Student::showAllOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout << "无预约记录" << endl;
		system("pause");
		system("cls");
		return;
	}

	for (int i = 0; i < of.m_Size; i++)
	{
		cout << i + 1 << "、 ";

		cout << "预约日期： 周" << of.m_orderData[i]["date"];
		cout << " 时段：" << (of.m_orderData[i]["interval"] == "1" ? "上午" : "下午");
		cout << " 学号：" << of.m_orderData[i]["stuId"];
		cout << " 姓名：" << of.m_orderData[i]["stuName"];
		cout << " 机房：" << of.m_orderData[i]["roomId"];
		string status = " 状态： ";  // 0 取消的预约   1 审核中   2 已预约 -1 预约失败
		if (of.m_orderData[i]["status"] == "1")
		{
			status += "审核中";
		}
		else if (of.m_orderData[i]["status"] == "2")
		{
			status += "预约成功";
		}
		else if (of.m_orderData[i]["status"] == "-1")
		{
			status += "审核未通过，预约失败";
		}
		else
		{
			status += "预约已取消";
		}
		cout << status << endl;
	}

	system("pause");
	system("cls");
}
```

测试效果如图：

![1548667591734](assets/1548667591734.png)



### 8.4 取消预约

在Student类的`void Student::cancelOrder()`成员函数中，添加如下代码

```C++
//取消预约
void Student::cancelOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout << "无预约记录" << endl;
		system("pause");
		system("cls");
		return;
	}
	cout << "审核中或预约成功的记录可以取消，请输入取消的记录" << endl;

	vector<int>v;
	int index = 1;
	for (int i = 0; i < of.m_Size; i++)
	{
		if (atoi(of.m_orderData[i]["stuId"].c_str()) == this->m_Id)
		{
			if (of.m_orderData[i]["status"] == "1" || of.m_orderData[i]["status"] == "2")
			{
				v.push_back(i);
				cout <<  index ++  << "、 ";
				cout << "预约日期： 周" << of.m_orderData[i]["date"];
				cout << " 时段：" << (of.m_orderData[i]["interval"] == "1" ? "上午" : "下午");
				cout << " 机房：" << of.m_orderData[i]["roomId"];
				string status = " 状态： ";  // 0 取消的预约   1 审核中   2 已预约  -1 预约失败
				if (of.m_orderData[i]["status"] == "1")
				{
					status += "审核中";
				}
				else if (of.m_orderData[i]["status"] == "2")
				{
					status += "预约成功";
				}
				cout << status << endl;

			}
		}
	}

	cout << "请输入取消的记录,0代表返回" << endl;
	int select = 0;
	while (true)
	{
		cin >> select;
		if (select >= 0 && select <= v.size())
		{
			if (select == 0)
			{
				break;
			}
			else
			{
				//	cout << "记录所在位置： " << v[select - 1] << endl;
				of.m_orderData[v[select - 1]]["status"] = "0";
				of.updateOrder();
				cout << "已取消预约" << endl;
				break;
			}

		}
		cout << "输入有误，请重新输入" << endl;
	}

	system("pause");
	system("cls");
}

```

测试取消预约：

![1548669551036](assets/1548669551036.png)

再次查看个人预约记录：

![1548669728023](assets/1548669728023.png)

查看所有预约

![1548669753496](assets/1548669753496.png)

查看order.txt预约文件

![1548669798037](assets/1548669798037.png)

至此，学生模块功能全部实现





## 9、 教师模块

### 9.1 教师登录和注销

#### 9.1.1 构造函数

- 在Teacher类的构造函数中，初始化教师信息，代码如下：

```c++
//有参构造 (职工编号，姓名，密码)
Teacher::Teacher(int empId, string name, string pwd)
{
	//初始化属性
	this->m_EmpId = empId;
	this->m_Name = name;
	this->m_Pwd = pwd;
}
```

#### 9.1.2  教师子菜单

- 在机房预约系统.cpp中，当用户登录的是教师，添加教师菜单接口
- 将不同的分支提供出来
  - 查看所有预约
  - 审核预约
  - 注销登录
- 实现注销功能

添加全局函数 `void TeacherMenu(Person * &manager)` 代码如下：

```c++
//教师菜单
void TeacherMenu(Identity * &teacher)
{
	while (true)
	{
		//教师菜单
		teacher->operMenu();

		Teacher* tea = (Teacher*)teacher;
		int select = 0;

		cin >> select;

		if (select == 1)
		{
			//查看所有预约
			tea->showAllOrder();
		}
		else if (select == 2)
		{
			//审核预约
			tea->validOrder();
		}
		else
		{
			delete teacher;
			cout << "注销成功" << endl;
			system("pause");
			system("cls");
			return;
		}

	}
}
```



#### 9.1.3 菜单功能实现

- 在实现成员函数`void Teacher::operMenu()` 代码如下：

```c++
//教师菜单界面
void Teacher::operMenu()
{
	cout << "欢迎教师：" << this->m_Name << "登录！" << endl;
	cout << "\t\t ----------------------------------\n";
	cout << "\t\t|                                  |\n";
	cout << "\t\t|          1.查看所有预约          |\n";
	cout << "\t\t|                                  |\n";
	cout << "\t\t|          2.审核预约              |\n";
	cout << "\t\t|                                  |\n";
	cout << "\t\t|          0.注销登录              |\n";
	cout << "\t\t|                                  |\n";
	cout << "\t\t ----------------------------------\n";
	cout << "请选择您的操作： " << endl;
}
```



#### 9.1.4 接口对接

- 教师成功登录后，调用教师的子菜单界面
- 在教师登录分支中，添加代码：

```c++
				//进入教师子菜单
				TeacherMenu(person);
```

添加效果如图：

![1548670866708](assets/1548670866708.png)

测试对接，效果如图：

登录验证通过：

![1548670949885](assets/1548670949885.png)

教师子菜单：

![1548670958602](assets/1548670958602.png)

注销登录：

![1548670966988](assets/1548670966988.png)









### 9.2 查看所有预约

#### 9.2.1 所有预约功能实现

该功能与学生身份的查看所有预约功能相似，用于显示所有预约记录

在Teacher.cpp中实现成员函数 `void Teacher::showAllOrder()`

```C++
void Teacher::showAllOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout << "无预约记录" << endl;
		system("pause");
		system("cls");
		return;
	}
	for (int i = 0; i < of.m_Size; i++)
	{
		cout << i + 1 << "、 ";

		cout << "预约日期： 周" << of.m_orderData[i]["date"];
		cout << " 时段：" << (of.m_orderData[i]["interval"] == "1" ? "上午" : "下午");
		cout << " 学号：" << of.m_orderData[i]["stuId"];
		cout << " 姓名：" << of.m_orderData[i]["stuName"];
		cout << " 机房：" << of.m_orderData[i]["roomId"];
		string status = " 状态： ";  // 0 取消的预约   1 审核中   2 已预约 -1 预约失败
		if (of.m_orderData[i]["status"] == "1")
		{
			status += "审核中";
		}
		else if (of.m_orderData[i]["status"] == "2")
		{
			status += "预约成功";
		}
		else if (of.m_orderData[i]["status"] == "-1")
		{
			status += "审核未通过，预约失败";
		}
		else
		{
			status += "预约已取消";
		}
		cout << status << endl;
	}

	system("pause");
	system("cls");
}
```



#### 9.2.2 测试功能

运行测试教师身份的查看所有预约功能

测试效果如图：

![1548676922678](assets/1548676922678.png)





### 9.3 审核预约

#### 9.3.1 审核功能实现

功能描述：教师审核学生的预约，依据实际情况审核预约

在Teacher.cpp中实现成员函数 `void Teacher::validOrder()`

代码如下：

```C++
//审核预约
void Teacher::validOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout << "无预约记录" << endl;
		system("pause");
		system("cls");
		return;
	}
	cout << "待审核的预约记录如下：" << endl;

	vector<int>v;
	int index = 0;
	for (int i = 0; i < of.m_Size; i++)
	{
		if (of.m_orderData[i]["status"] == "1")
		{
			v.push_back(i);
			cout << ++index << "、 ";
			cout << "预约日期： 周" << of.m_orderData[i]["date"];
			cout << " 时段：" << (of.m_orderData[i]["interval"] == "1" ? "上午" : "下午");
			cout << " 机房：" << of.m_orderData[i]["roomId"];
			string status = " 状态： ";  // 0取消的预约   1 审核中   2 已预约  -1 预约失败
			if (of.m_orderData[i]["status"] == "1")
			{
				status += "审核中";
			}
			cout << status << endl;
		}
	}
	cout << "请输入审核的预约记录,0代表返回" << endl;
	int select = 0;
	int ret = 0;
	while (true)
	{
		cin >> select;
		if (select >= 0 && select <= v.size())
		{
			if (select == 0)
			{
				break;
			}
			else
			{
				cout << "请输入审核结果" << endl;
				cout << "1、通过" << endl;
				cout << "2、不通过" << endl;
				cin >> ret;

				if (ret == 1)
				{
					of.m_orderData[v[select - 1]]["status"] = "2";
				}
				else
				{
					of.m_orderData[v[select - 1]]["status"] = "-1";
				}
				of.updateOrder();
				cout << "审核完毕！" << endl;
				break;
			}
		}
		cout << "输入有误，请重新输入" << endl;
	}

	system("pause");
	system("cls");
}
```

#### 9.3.2 测试审核预约

测试 - 审核通过

![1548677286679](assets/1548677286679.png)

审核通过情况

![1548677383681](assets/1548677383681.png)

测试-审核未通过

![1548677402705](assets/1548677402705.png)

审核未通过情况：

![1548677632792](assets/1548677632792.png)

学生身份下查看记录：

![1548677798815](assets/1548677798815.png)

审核预约成功！



至此本案例制作完毕！  `^_^`



# 职工管理系统

## 1、管理系统需求

职工管理系统可以用来管理公司内所有员工的信息

本教程主要利用C++来实现一个基于多态的职工管理系统



公司中职工分为三类：普通员工、经理、老板，显示信息时，需要显示职工编号、职工姓名、职工岗位、以及职责

普通员工职责：完成经理交给的任务

经理职责：完成老板交给的任务，并下发任务给员工

老板职责：管理公司所有事务



管理系统中需要实现的功能如下：

* 退出管理程序：退出当前管理系统

- 增加职工信息：实现批量添加职工功能，将信息录入到文件中，职工信息为：职工编号、姓名、部门编号
- 显示职工信息：显示公司内部所有职工的信息
- 删除离职职工：按照编号删除指定的职工
- 修改职工信息：按照编号修改职工个人信息
- 查找职工信息：按照职工的编号或者职工的姓名进行查找相关的人员信息
- 按照编号排序：按照职工编号，进行排序，排序规则由用户指定
- 清空所有文档：清空文件中记录的所有职工信息 （清空前需要再次确认，防止误删）



系统界面效果图如下：

![1546511409198](assets/1546511409198.png)

需根据用户不同的选择，完成不同的功能！









## 2、创建项目

创建项目步骤如下：

- 创建新项目
- 添加文件



### 2.1 创建项目

打开vs2017后，点击创建新项目，创建新的C++项目

![1544151201465](assets/1544151201465.png)



填写项目名称以及项目路径，点击确定

![1546349209805](assets/1546349209805.png)



### 2.2 添加文件

右键源文件，进行添加文件操作

![1546349360960](assets/1546349360960.png)



![1546349421496](assets/1546349421496.png)



![1546349488752](assets/1546349488752.png)



至此，项目已创建完毕







## 3、创建管理类

​	管理类负责的内容如下：

* 与用户的沟通菜单界面
* 对职工增删改查的操作
* 与文件的读写交互



### 3.1创建文件 

在头文件和源文件的文件夹下分别创建workerManager.h 和 workerManager.cpp文件

![1546349904944](assets/1546349904944.png)

### 3.2 头文件实现

在workerManager.h中设计管理类

代码如下：

```C++
#pragma once
#include<iostream>
using namespace std;


class WorkerManager
{
public:

	//构造函数
	WorkerManager();

	//析构函数
	~WorkerManager();

};
```

### 3.3 源文件实现

在workerManager.cpp中将构造和析构函数空实现补全

```C++
#include "workerManager.h"

WorkerManager::WorkerManager()
{
}

WorkerManager::~WorkerManager()
{
}

```



至此职工管理类以创建完毕









## 4、菜单功能

功能描述：与用户的沟通界面

### 4.1 添加成员函数

在管理类workerManager.h中添加成员函数  `void Show_Menu();`

![1546351543942](assets/1546351543942.png)

 



### 4.2 菜单功能实现

在管理类workerManager.cpp中实现  Show_Menu()函数

```C++
void WorkerManager::Show_Menu()
{
	cout << "********************************************" << endl;
	cout << "*********  欢迎使用职工管理系统！ **********" << endl;
	cout << "*************  0.退出管理程序  *************" << endl;
	cout << "*************  1.增加职工信息  *************" << endl;
	cout << "*************  2.显示职工信息  *************" << endl;
	cout << "*************  3.删除离职职工  *************" << endl;
	cout << "*************  4.修改职工信息  *************" << endl;
	cout << "*************  5.查找职工信息  *************" << endl;
	cout << "*************  6.按照编号排序  *************" << endl;
	cout << "*************  7.清空所有文档  *************" << endl;
	cout << "********************************************" << endl;
	cout << endl;
}
```



### 4.3 测试菜单功能

在职工管理系统.cpp中测试菜单功能

代码：

```C++
#include<iostream>
using namespace std;
#include "workerManager.h"

int main() {

	WorkerManager wm;

	wm.Show_Menu();

	system("pause");

	return 0;
}
```

运行效果如图：

![1546352771191](assets/1546352771191.png)











## 5、退出功能

### 5.1  提供功能接口

在main函数中提供分支选择，提供每个功能接口

代码：

```C++
int main() {

	WorkerManager wm;
	int choice = 0;
	while (true)
	{
		//展示菜单
		wm.Show_Menu();
		cout << "请输入您的选择:" << endl;
		cin >> choice;

		switch (choice)
		{
		case 0: //退出系统
			break;
		case 1: //添加职工
			break;
		case 2: //显示职工
			break;
		case 3: //删除职工
			break;
		case 4: //修改职工
			break;
		case 5: //查找职工
			break;
		case 6: //排序职工
			break;
		case 7: //清空文件
			break;
		default:
			system("cls");
			break;
		}
	}

	system("pause");
	return 0;
}
```



### 5.2 实现退出功能

在workerManager.h中提供退出系统的成员函数 `	void exitSystem();`

在workerManager.cpp中提供具体的功能实现

```C++
void WorkerManager::exitSystem()
{
	cout << "欢迎下次使用" << endl;
	system("pause");
	exit(0);
}
```



### 5.3测试功能

在main函数分支 0  选项中，调用退出程序的接口

![1546353199424](assets/1546353199424.png)



运行测试效果如图：

![1546353155490](assets/1546353155490.png)











## 6、创建职工类

### 6.1 创建职工抽象类

职工的分类为：普通员工、经理、老板

将三种职工抽象到一个类（worker）中,利用多态管理不同职工种类

职工的属性为：职工编号、职工姓名、职工所在部门编号

职工的行为为：岗位职责信息描述，获取岗位名称



头文件文件夹下  创建文件worker.h  文件并且添加如下代码：

```C++
#pragma once
#include<iostream>
#include<string>
using namespace std;

//职工抽象基类
class Worker
{
public:

	//显示个人信息
	virtual void showInfo() = 0;
	//获取岗位名称
	virtual string getDeptName() = 0;

	int m_Id; //职工编号
	string m_Name; //职工姓名
	int m_DeptId; //职工所在部门名称编号
};
```



### 6.2 创建普通员工类

普通员工类**继承**职工抽象类，并重写父类中纯虚函数

在头文件和源文件的文件夹下分别创建employee.h 和 employee.cpp文件



employee.h中代码如下：

```C++
#pragma once 
#include<iostream>
using namespace std;
#include "worker.h"

//员工类
class Employee :public Worker
{
public:

	//构造函数
	Employee(int id, string name, int dId);

	//显示个人信息
	virtual void showInfo();

	//获取职工岗位名称
	virtual string getDeptName();
};
```

employee.cpp中代码如下：

```C++
#include "employee.h"

Employee::Employee(int id, string name, int dId)
{
	this->m_Id = id;
	this->m_Name = name;
	this->m_DeptId = dId;
}

void Employee::showInfo()
{
	cout << "职工编号： " << this->m_Id
		<< " \t职工姓名： " << this->m_Name
		<< " \t岗位：" << this->getDeptName()
		<< " \t岗位职责：完成经理交给的任务" << endl;
}


string Employee::getDeptName()
{
	return string("员工");
}


```





### 6.3 创建经理类

经理类**继承**职工抽象类，并重写父类中纯虚函数，和普通员工类似

在头文件和源文件的文件夹下分别创建manager.h 和 manager.cpp文件



manager.h中代码如下：

```c++
#pragma once
#include<iostream>
using namespace std;
#include "worker.h"

//经理类
class Manager :public Worker
{
public:

	Manager(int id, string name, int dId);

	//显示个人信息
	virtual void showInfo();

	//获取职工岗位名称
	virtual string getDeptName();
};
```

manager.cpp中代码如下：

```c++
#include "manager.h"

Manager::Manager(int id, string name, int dId)
{
	this->m_Id = id;
	this->m_Name = name;
	this->m_DeptId = dId;

}

void Manager::showInfo()
{
	cout << "职工编号： " << this->m_Id
		<< " \t职工姓名： " << this->m_Name
		<< " \t岗位：" << this->getDeptName()
		<< " \t岗位职责：完成老板交给的任务,并下发任务给员工" << endl;
}

string Manager::getDeptName()
{
	return string("经理");
}


```



### 6.4 创建老板类

老板类**继承**职工抽象类，并重写父类中纯虚函数，和普通员工类似

在头文件和源文件的文件夹下分别创建boss.h 和 boss.cpp文件



boss.h中代码如下：

```c++
#pragma once
#include<iostream>
using namespace std;
#include "worker.h"

//老板类
class Boss :public Worker
{
public:

	Boss(int id, string name, int dId);

	//显示个人信息
	virtual void showInfo();

	//获取职工岗位名称
	virtual string getDeptName();
};
```

boss.cpp中代码如下：

```c++
#include "boss.h"

Boss::Boss(int id, string name, int dId)
{
	this->m_Id = id;
	this->m_Name = name;
	this->m_DeptId = dId;

}

void Boss::showInfo()
{
	cout << "职工编号： " << this->m_Id
		<< " \t职工姓名： " << this->m_Name
		<< " \t岗位：" << this->getDeptName()
		<< " \t岗位职责：管理公司所有事务" << endl;
}

string Boss::getDeptName()
{
	return string("总裁");
}

```





### 6.5 测试多态

在职工管理系统.cpp中添加测试函数，并且运行能够产生多态



测试代码如下：

```C++
#include "worker.h"
#include "employee.h"
#include "manager.h"
#include "boss.h"


void test()
{
	Worker * worker = NULL;
	worker = new Employee(1, "张三", 1);
	worker->showInfo();
	delete worker;
	
	worker = new Manager(2, "李四", 2);
	worker->showInfo();
	delete worker;

	worker = new Boss(3, "王五", 3);
	worker->showInfo();
	delete worker;
}

```



运行效果如图：

![1546398236081](assets/1546398236081.png)

测试成功后，测试代码可以注释保留，或者选择删除













## 7、添加职工

功能描述：批量添加职工，并且保存到文件中

### 7.1 功能分析

分析：

用户在批量创建时，可能会创建不同种类的职工

如果想将所有不同种类的员工都放入到一个数组中，可以将所有员工的指针维护到一个数组里

如果想在程序中维护这个不定长度的数组，可以将数组创建到堆区，并利用Worker **的指针维护

![1546399491099](assets/1546399491099.png)

### 7.2 功能实现

在WokerManager.h头文件中添加成员属性 代码：

```C++
	//记录文件中的人数个数
	int m_EmpNum;

	//员工数组的指针
	Worker ** m_EmpArray;
```



在WorkerManager构造函数中初始化属性

```C++
WorkerManager::WorkerManager()
{
	//初始化人数
	this->m_EmpNum = 0;

	//初始化数组指针
	this->m_EmpArray = NULL;
}
```



在workerManager.h中添加成员函数

```C++
	//增加职工
	void Add_Emp();
```



workerManager.cpp中实现该函数

```C++
//增加职工
void WorkerManager::Add_Emp()
{
	cout << "请输入增加职工数量： " << endl;

	int addNum = 0;
	cin >> addNum;

	if (addNum > 0)
	{
		//计算新空间大小
		int newSize = this->m_EmpNum + addNum;

		//开辟新空间
		Worker ** newSpace = new Worker*[newSize];

		//将原空间下内容存放到新空间下
		if (this->m_EmpArray != NULL)
		{
			for (int i = 0; i < this->m_EmpNum; i++)
			{
				newSpace[i] = this->m_EmpArray[i];
			}
		}

		//输入新数据
		for (int i = 0; i < addNum; i++)
		{
			int id;
			string name;
			int dSelect;

			cout << "请输入第 " << i + 1 << " 个新职工编号：" << endl;
			cin >> id;


			cout << "请输入第 " << i + 1 << " 个新职工姓名：" << endl;
			cin >> name;


			cout << "请选择该职工的岗位：" << endl;
			cout << "1、普通职工" << endl;
			cout << "2、经理" << endl;
			cout << "3、老板" << endl;
			cin >> dSelect;


			Worker * worker = NULL;
			switch (dSelect)
			{
			case 1: //普通员工
				worker = new Employee(id, name, 1);
				break;
			case 2: //经理
				worker = new Manager(id, name, 2);
				break;
			case 3:  //老板
				worker = new Boss(id, name, 3);
				break;
			default:
				break;
			}


			newSpace[this->m_EmpNum + i] = worker;
		}

		//释放原有空间
		delete[] this->m_EmpArray;

		//更改新空间的指向
		this->m_EmpArray = newSpace;

		//更新新的个数
		this->m_EmpNum = newSize;

		//提示信息
		cout << "成功添加" << addNum << "名新职工！" << endl;
	}
	else
	{
		cout << "输入有误" << endl;
	}

	system("pause");
	system("cls");
}
```



在WorkerManager.cpp的析构函数中，释放堆区数据

```C++
WorkerManager::~WorkerManager()
{
	if (this->m_EmpArray != NULL)
	{
		delete[] this->m_EmpArray;
	}
}

```





### 7.3 测试添加

在main函数分支 1  选项中，调用添加职工接口

![1546401705277](assets/1546401705277.png)

效果如图：

![1546401763461](assets/1546401763461.png)

至此，添加职工到程序中功能实现完毕













## 8、文件交互 - 写文件

功能描述：对文件进行读写

​	在上一个添加功能中，我们只是将所有的数据添加到了内存中，一旦程序结束就无法保存了

​	因此文件管理类中需要一个与文件进行交互的功能，对于文件进行读写操作



### 8.1 设定文件路径

首先我们将文件路径，在workerManager.h中添加宏常量,并且包含头文件 fstream

```C++
#include <fstream>
#define  FILENAME "empFile.txt"
```



### 8.2 成员函数声明

在workerManager.h中类里添加成员函数 `void save()`

```C++
//保存文件
void save();
```



### 8.3 保存文件功能实现

```C++
void WorkerManager::save()
{
	ofstream ofs;
	ofs.open(FILENAME, ios::out);


	for (int i = 0; i < this->m_EmpNum; i++)
	{
		ofs << this->m_EmpArray[i]->m_Id << " " 
			<< this->m_EmpArray[i]->m_Name << " " 
			<< this->m_EmpArray[i]->m_DeptId << endl;
	}

	ofs.close();
}
```



### 8.4 保存文件功能测试

在添加职工功能中添加成功后添加保存文件函数



![1546432469465](assets/1546432469465.png)



再次运行代码，添加职工

![1546401763461](assets/1546401763461.png)



同级目录下多出文件，并且保存了添加的信息

![1546432343078](assets/1546432343078.png)



## 9、文件交互 - 读文件

功能描述：将文件中的内容读取到程序中

虽然我们实现了添加职工后保存到文件的操作，但是每次开始运行程序，并没有将文件中数据读取到程序中

而我们的程序功能中还有清空文件的需求

因此构造函数初始化数据的情况分为三种



1. 第一次使用，文件未创建
2. 文件存在，但是数据被用户清空
3. 文件存在，并且保存职工的所有数据



### 9.1 文件未创建

在workerManager.h中添加新的成员属性 m_FileIsEmpty标志文件是否为空

```C++
	//标志文件是否为空
	bool m_FileIsEmpty;
```



修改WorkerManager.cpp中构造函数代码

```C++
WorkerManager::WorkerManager()
{
	ifstream ifs;
	ifs.open(FILENAME, ios::in);

	//文件不存在情况
	if (!ifs.is_open())
	{
		cout << "文件不存在" << endl; //测试输出
		this->m_EmpNum = 0;  //初始化人数
		this->m_FileIsEmpty = true; //初始化文件为空标志
		this->m_EmpArray = NULL; //初始化数组
		ifs.close(); //关闭文件
		return;
	}
}
```



删除文件后，测试文件不存在时初始化数据功能



### 9.2 文件存在且数据为空

在workerManager.cpp中的构造函数追加代码：

```C++
	//文件存在，并且没有记录
	char ch;
	ifs >> ch;
	if (ifs.eof())
	{
		cout << "文件为空!" << endl;
		this->m_EmpNum = 0;
		this->m_FileIsEmpty = true;
		this->m_EmpArray = NULL;
		ifs.close();
		return;
	}
```

追加代码位置如图：

![1546435197575](assets/1546435197575.png)

将文件创建后清空文件内容，并测试该情况下初始化功能



我们发现文件不存在或者为空清空 m_FileIsEmpty 判断文件是否为空的标志都为真，那何时为假？

成功添加职工后，应该更改文件不为空的标志

在`void WorkerManager::Add_Emp() `成员函数中添加：

```C++
		//更新职工不为空标志
		this->m_FileIsEmpty = false;
```

![1546656256176](assets/1546656256176.png)







### 9.3 文件存在且保存职工数据

#### 9.3.1 获取记录的职工人数

在workerManager.h中添加成员函数 ` int get_EmpNum();`

```C++
	//统计人数
	int get_EmpNum();
```

workerManager.cpp中实现

```C++
int WorkerManager::get_EmpNum()
{
	ifstream ifs;
	ifs.open(FILENAME, ios::in);

	int id;
	string name;
	int dId;

	int num = 0;

	while (ifs >> id && ifs >> name && ifs >> dId)
	{
        //记录人数
		num++;
	}
	ifs.close();

	return num;
}
```

在workerManager.cpp构造函数中继续追加代码：

```C++
	int num =  this->get_EmpNum();
	cout << "职工个数为：" << num << endl;  //测试代码
	this->m_EmpNum = num;  //更新成员属性 
```



手动添加一些职工数据，测试获取职工数量函数

![1546436429055](assets/1546436429055.png)

![1546436385793](assets/1546436385793.png)



#### 9.3.2 初始化数组

根据职工的数据以及职工数据，初始化workerManager中的Worker ** m_EmpArray 指针



在WorkerManager.h中添加成员函数  `void init_Emp();`

```C++
	//初始化员工
	void init_Emp();
```



在WorkerManager.cpp中实现

```C++
void WorkerManager::init_Emp()
{
	ifstream ifs;
	ifs.open(FILENAME, ios::in);

	int id;
	string name;
	int dId;
	
	int index = 0;
	while (ifs >> id && ifs >> name && ifs >> dId)
	{
		Worker * worker = NULL;
		//根据不同的部门Id创建不同对象
		if (dId == 1)  // 1普通员工
		{
			worker = new Employee(id, name, dId);
		}
		else if (dId == 2) //2经理
		{
			worker = new Manager(id, name, dId);
		}
		else //总裁
		{
			worker = new Boss(id, name, dId);
		}
		//存放在数组中
		this->m_EmpArray[index] = worker;
		index++;
	}
}
```



在workerManager.cpp构造函数中追加代码

```C++
	//根据职工数创建数组
	this->m_EmpArray = new Worker *[this->m_EmpNum];
	//初始化职工
	init_Emp();

	//测试代码
	for (int i = 0; i < m_EmpNum; i++)
	{
		cout << "职工号： " << this->m_EmpArray[i]->m_Id
			<< " 职工姓名： " << this->m_EmpArray[i]->m_Name
			<< " 部门编号： " << this->m_EmpArray[i]->m_DeptId << endl;
	}
```



运行程序，测试从文件中获取的数据

![1546436938152](assets/1546436938152.png)

至此初始化数据功能完毕，测试代码可以注释或删除掉！









## 10、显示职工

功能描述：显示当前所有职工信息

#### 10.1 显示职工函数声明

在workerManager.h中添加成员函数  `void Show_Emp();`

```C++
	//显示职工
	void Show_Emp();
```



#### 10.2 显示职工函数实现

在workerManager.cpp中实现成员函数 `void Show_Emp();`

```C++
//显示职工
void WorkerManager::Show_Emp()
{
	if (this->m_FileIsEmpty)
	{
		cout << "文件不存在或记录为空！" << endl;
	}
	else
	{
		for (int i = 0; i < m_EmpNum; i++)
		{
			//利用多态调用接口
			this->m_EmpArray[i]->showInfo();
		}
	}

	system("pause");
	system("cls");
}
```



#### 10.3 测试显示职工

在main函数分支 2  选项中，调用显示职工接口

![1546497336465](assets/1546497336465.png)



测试时分别测试 文件为空和文件不为空两种情况

测试效果：

测试1-文件不存在或者为空情况

![1546497082135](assets/1546497082135.png)

测试2 - 文件存在且有记录情况

![1546496947671](assets/1546496947671.png)



测试完毕，至此，显示所有职工信息功能实现











## 11、删除职工

功能描述：按照职工的编号进行删除职工操作



#### 11.1 删除职工函数声明

在workerManager.h中添加成员函数  `void Del_Emp();`

```C++
	//删除职工
	void Del_Emp();
```



#### 11.2 职工是否存在函数声明

很多功能都需要用到根据职工是否存在来进行操作如：删除职工、修改职工、查找职工

因此添加该公告函数，以便后续调用

在workerManager.h中添加成员函数  `int IsExist(int id);`

```C++
	//按照职工编号判断职工是否存在,若存在返回职工在数组中位置，不存在返回-1
	int IsExist(int id);
```



#### 11.3 职工是否存在函数实现

在workerManager.cpp中实现成员函数 `int IsExist(int id);`

```C++
int WorkerManager::IsExist(int id)
{
	int index = -1;

	for (int i = 0; i < this->m_EmpNum; i++)
	{
		if (this->m_EmpArray[i]->m_Id == id)
		{
			index = i;

			break;
		}
	}

	return index;
}
```





#### 11.4 删除职工函数实现

在workerManager.cpp中实现成员函数 ` void Del_Emp();`

```C++
//删除职工
void WorkerManager::Del_Emp()
{
	if (this->m_FileIsEmpty)
	{
		cout << "文件不存在或记录为空！" << endl;
	}
	else
	{
		//按职工编号删除
		cout << "请输入想要删除的职工号：" << endl;
		int id = 0;
		cin >> id;

		int index = this->IsExist(id);

		if (index != -1)  //说明index上位置数据需要删除
		{
			for (int i = index; i < this->m_EmpNum - 1; i++)
			{
				this->m_EmpArray[i] = this->m_EmpArray[i + 1];
			}
			this->m_EmpNum--;

			this->save(); //删除后数据同步到文件中
			cout << "删除成功！" << endl;
		}
		else
		{
			cout << "删除失败，未找到该职工" << endl;
		}
	}
	
	system("pause");
	system("cls");
}
```



#### 11.5 测试删除职工

在main函数分支 3  选项中，调用删除职工接口

![1546502698622](assets/1546502698622.png)

测试1 - 删除不存在职工情况

![1546500324196](assets/1546500324196.png)

测试2 - 删除存在的职工情况

删除成功提示图：

![1546500350526](assets/1546500350526.png)

再次显示所有职工信息，确保已经删除

![1546500361889](assets/1546500361889.png)

查看文件中信息，再次核实员工已被完全删除

![1546500383570](assets/1546500383570.png)

至此，删除职工功能实现完毕！









## 12、修改职工

功能描述：能够按照职工的编号对职工信息进行修改并保存

#### 12.1 修改职工函数声明

在workerManager.h中添加成员函数  `void Mod_Emp();`

```C++
	//修改职工
	void Mod_Emp();
```



#### 12.2 修改职工函数实现

在workerManager.cpp中实现成员函数 ` void Mod_Emp();`

```C++
//修改职工
void WorkerManager::Mod_Emp()
{
	if (this->m_FileIsEmpty)
	{
		cout << "文件不存在或记录为空！" << endl;
	}
	else
	{
		cout << "请输入修改职工的编号：" << endl;
		int id;
		cin >> id;

		int ret = this->IsExist(id);
		if (ret != -1)
		{ 
			//查找到编号的职工

			delete this->m_EmpArray[ret];
			
			int newId = 0;
			string newName = "";
			int dSelect = 0;

			cout << "查到： " << id << "号职工，请输入新职工号： " << endl;
			cin >> newId;

			cout << "请输入新姓名： " << endl;
			cin >> newName;

			cout << "请输入岗位： " << endl;
			cout << "1、普通职工" << endl;
			cout << "2、经理" << endl;
			cout << "3、老板" << endl;
			cin >> dSelect;

			Worker * worker = NULL;
			switch (dSelect)
			{
			case1:
				worker = new Employee(newId, newName, dSelect);
				break;
			case2:
				worker = new Manager(newId, newName, dSelect);
				break;
			case 3:
				worker = new Boss(newId, newName, dSelect);
				break;
			default:
				break;
			}

			//更改数据 到数组中
			this->m_EmpArray[ret]= worker;
			
			cout << "修改成功！" << endl;

			//保存到文件中
			this->save();
		}
		else
		{
			cout << "修改失败，查无此人" << endl;
		}
	}

	//按任意键 清屏
	system("pause");
	system("cls");
}

```





#### 12.3 测试修改职工

在main函数分支 4  选项中，调用修改职工接口

![1546502651922](assets/1546502651922.png)



测试1 - 修改不存在职工情况

![1546502759643](assets/1546502759643.png)

测试2 - 修改存在职工情况，例如将职工 "李四" 改为 "赵四"

![1546502830350](assets/1546502830350.png)

修改后再次查看所有职工信息，并确认修改成功

![1546502865443](assets/1546502865443.png)

再次确认文件中信息也同步更新

![1546502898653](assets/1546502898653.png)

至此，修改职工功能已实现！











## 13、查找职工

功能描述：提供两种查找职工方式，一种按照职工编号，一种按照职工姓名

#### 13.1 查找职工函数声明

在workerManager.h中添加成员函数  `void Find_Emp();`

```c++
	//查找职工
	void Find_Emp();
```



#### 13.2 查找职工函数实现

在workerManager.cpp中实现成员函数 ` void Find_Emp();`

```C++
//查找职工
void WorkerManager::Find_Emp()
{
	if (this->m_FileIsEmpty)
	{
		cout << "文件不存在或记录为空！" << endl;
	}
	else
	{
		cout << "请输入查找的方式：" << endl;
		cout << "1、按职工编号查找" << endl;
		cout << "2、按姓名查找" << endl;

		int select = 0;
		cin >> select;


		if (select == 1) //按职工号查找
		{
			int id;
			cout << "请输入查找的职工编号：" << endl;
			cin >> id;

			int ret = IsExist(id);
			if (ret != -1)
			{
				cout << "查找成功！该职工信息如下：" << endl;
				this->m_EmpArray[ret]->showInfo();
			}
			else
			{
				cout << "查找失败，查无此人" << endl;
			}
		}
		else if(select == 2) //按姓名查找
		{
			string name;
			cout << "请输入查找的姓名：" << endl;
			cin >> name;

			bool flag = false;  //查找到的标志
			for (int i = 0; i < m_EmpNum; i++)
			{
				if (m_EmpArray[i]->m_Name == name)
				{
					cout << "查找成功,职工编号为："
                           << m_EmpArray[i]->m_Id
                           << " 号的信息如下：" << endl;
					
					flag = true;

					this->m_EmpArray[i]->showInfo();
				}
			}
			if (flag == false)
			{
				//查无此人
				cout << "查找失败，查无此人" << endl;
			}
		}
		else
		{
			cout << "输入选项有误" << endl;
		}
	}


	system("pause");
	system("cls");
}
```





#### 13.3 测试查找职工

在main函数分支 5  选项中，调用查找职工接口

![1546504714318](assets/1546504714318.png)

测试1 - 按照职工编号查找 - 查找不存在职工

![1546504767229](assets/1546504767229.png)

测试2 - 按照职工编号查找 -  查找存在职工

![1546505046521](assets/1546505046521.png)

测试3 - 按照职工姓名查找 - 查找不存在职工

![1546505115610](assets/1546505115610.png)



测试4 - 按照职工姓名查找 - 查找存在职工（如果出现重名，也一并显示，在文件中可以添加重名职工）

例如 添加两个王五的职工，然后按照姓名查找王五

![1546507850441](assets/1546507850441.png)

![1546507760284](assets/1546507760284.png)

至此，查找职工功能实现完毕！







## 14、排序

功能描述：按照职工编号进行排序，排序的顺序由用户指定

#### 14.1 排序函数声明

在workerManager.h中添加成员函数  `void Sort_Emp();`

```C++
	//排序职工
	void Sort_Emp();
```



#### 14.2 排序函数实现

在workerManager.cpp中实现成员函数 ` void Sort_Emp();`

```C++
//排序职工
void WorkerManager::Sort_Emp()
{
	if (this->m_FileIsEmpty)
	{
		cout << "文件不存在或记录为空！" << endl;
		system("pause");
		system("cls");
	}
	else
	{
		cout << "请选择排序方式： " << endl;
		cout << "1、按职工号进行升序" << endl;
		cout << "2、按职工号进行降序" << endl;

		int select = 0;
		cin >> select;


		for (int i = 0; i < m_EmpNum; i++)
		{
			int minOrMax = i;
			for (int j = i + 1; j < m_EmpNum; j++)
			{
				if (select == 1) //升序
				{
					if (m_EmpArray[minOrMax]->m_Id > m_EmpArray[j]->m_Id)
					{
						minOrMax = j;
					}
				}
				else  //降序
				{
					if (m_EmpArray[minOrMax]->m_Id < m_EmpArray[j]->m_Id)
					{
						minOrMax = j;
					}
				}
			}

			if (i != minOrMax)
			{
				Worker * temp = m_EmpArray[i];
				m_EmpArray[i] = m_EmpArray[minOrMax];
				m_EmpArray[minOrMax] = temp;
			}

		}

		cout << "排序成功,排序后结果为：" << endl;
		this->save();
		this->Show_Emp();
	}

}
```





#### 14.3 测试排序功能

在main函数分支 6  选项中，调用排序职工接口

![1546510145181](assets/1546510145181.png)

测试：

首先我们添加一些职工，序号是无序的，例如：

![1546658169987](assets/1546658169987.png)



测试 - 升序排序

![1546658190479](assets/1546658190479.png)

文件同步更新

![1546658273581](assets/1546658273581.png)





测试 - 降序排序

![1546658288936](assets/1546658288936.png)

文件同步更新

![1546658313704](assets/1546658313704.png)

至此，职工按照编号排序的功能实现完毕！











## 15、清空文件

功能描述：将文件中记录数据清空



#### 15.1 清空函数声明

在workerManager.h中添加成员函数  `void Clean_File();`

```C++
	//清空文件
	void Clean_File();
```





#### 15.2 清空函数实现

在workerManager.cpp中实现员函数 ` void Clean_File();`

```C++
//清空文件
void WorkerManager::Clean_File()
{
	cout << "确认清空？" << endl;
	cout << "1、确认" << endl;
	cout << "2、返回" << endl;

	int select = 0;
	cin >> select;

	if (select == 1)
	{
		//打开模式 ios::trunc 如果存在删除文件并重新创建
		ofstream ofs(FILENAME, ios::trunc);
		ofs.close();

		if (this->m_EmpArray != NULL)
		{
            for (int i = 0; i < this->m_EmpNum; i++)
			{
				if (this->m_EmpArray[i] != NULL)
				{
					delete this->m_EmpArray[i];
				}
			}
			this->m_EmpNum = 0;
			delete[] this->m_EmpArray;
			this->m_EmpArray = NULL;
			this->m_FileIsEmpty = true;
		}
		cout << "清空成功！" << endl;
	}

	system("pause");
	system("cls");
}
```





#### 15.3 测试清空文件

在main函数分支 7  选项中，调用清空文件接口

![1546511085541](assets/1546511085541.png)

测试：确认清空文件

![1546510976745](assets/1546510976745.png)

再次查看文件中数据，记录已为空

![1546510994196](assets/1546510994196.png)

打开文件，里面数据已确保清空，该功能需要慎用！

![1546511018517](assets/1546511018517.png)



随着清空文件功能实现，本案例制作完毕  ^ _ ^  



# 演讲比赛流程管理系统

## 1、 演讲比赛程序需求

![1548154762048](assets/1548154762048.png)



### 1.1 比赛规则

* 学校举行一场演讲比赛，共有**12个人**参加。**比赛共两轮**，第一轮为淘汰赛，第二轮为决赛。
* 比赛方式：**分组比赛，每组6个人**；选手每次要随机分组，进行比赛
* 每名选手都有对应的**编号**，如 10001 ~ 10012 
* 第一轮分为两个小组，每组6个人。 整体按照选手编号进行**抽签**后顺序演讲。
* 当小组演讲完后，淘汰组内排名最后的三个选手，**前三名晋级**，进入下一轮的比赛。
* 第二轮为决赛，**前三名胜出**
* 每轮比赛过后需要**显示晋级选手的信息**

### 1.2 程序功能

* 开始演讲比赛：完成整届比赛的流程，每个比赛阶段需要给用户一个提示，用户按任意键后继续下一个阶段
* 查看往届记录：查看之前比赛前三名结果，每次比赛都会记录到文件中，文件用.csv后缀名保存
* 清空比赛记录：将文件中数据清空
* 退出比赛程序：可以退出当前程序

### 1.3 程序效果图：

![1548155966702](assets/1548155966702.png)



## 2、 项目创建

创建项目步骤如下：

- 创建新项目
- 添加文件



### 2.1 创建项目

* 打开vs2017后，点击创建新项目，创建新的C++项目

如图：

![1548121881969](assets/1548121881969.png)



* 填写项目名称以及选取项目路径，点击确定生成项目

![1548122271773](assets/1548122271773.png)



### 2.2 添加文件

* 右键源文件，进行添加文件操作

![1548122420253](assets/1548122420253.png)

* 填写文件名称，点击添加

![1548122510869](assets/1548122510869.png)

* 生成文件成功，效果如下图

![1548122619712](assets/1548122619712.png)



* 至此，项目已创建完毕





## 3、 创建管理类

**功能描述：**

- 提供菜单界面与用户交互
- 对演讲比赛流程进行控制
- 与文件的读写交互




### 3.1创建文件

* 在头文件和源文件的文件夹下分别创建speechManager.h 和 speechManager.cpp文件

![1548123402593](assets/1548123402593.png)



### 3.2 头文件实现

在speechManager.h中设计管理类

代码如下：

```c++
#pragma once
#include<iostream>
using namespace std;

//演讲管理类
class SpeechManager
{
public:

	//构造函数
	SpeechManager();


	//析构函数
	~SpeechManager();
};
```

### 3.3 源文件实现

在speechManager.cpp中将构造和析构函数空实现补全

```c++
#include "speechManager.h"

SpeechManager::SpeechManager()
{
}

SpeechManager::~SpeechManager()
{
}
```

* 至此演讲管理类以创建完毕



## 4、 菜单功能

功能描述：与用户的沟通界面

### 4.1 添加成员函数

在管理类speechManager.h中添加成员函数  `void show_Menu();`

![1548123942072](assets/1548123942072.png)

 



### 4.2 菜单功能实现

* 在管理类speechManager.cpp中实现 show_Menu()函数

```c++
void SpeechManager::show_Menu()
{
	cout << "********************************************" << endl;
	cout << "*************  欢迎参加演讲比赛 ************" << endl;
	cout << "*************  1.开始演讲比赛  *************" << endl;
	cout << "*************  2.查看往届记录  *************" << endl;
	cout << "*************  3.清空比赛记录  *************" << endl;
	cout << "*************  0.退出比赛程序  *************" << endl;
	cout << "********************************************" << endl;
	cout << endl;
}
```



### 4.3 测试菜单功能

* 在演讲比赛流程管理系统.cpp中测试菜单功能

代码：

```c++
#include<iostream>
using namespace std;
#include "speechManager.h"

int main() {

	SpeechManager sm;

	sm.show_Menu();

	system("pause");

	return 0;
}
```

* 运行效果如图：

![1548124599641](assets/1548124599641.png)

* 菜单界面搭建完毕



## 5、 退出功能

### 5.1  提供功能接口

* 在main函数中提供分支选择，提供每个功能接口

代码：

```c++
int main() {

	SpeechManager sm;

	int choice = 0; //用来存储用户的选项

	while (true)
	{
		sm.show_Menu();

		cout << "请输入您的选择： " << endl;
		cin >> choice; // 接受用户的选项

		switch (choice)
		{
		case 1:  //开始比赛
			break;
		case 2:  //查看记录
			break;
		case 3:  //清空记录
			break;
		case 0:  //退出系统
			break;
		default:
			system("cls"); //清屏
			break;
		}
	}

	system("pause");

	return 0;
}
```



### 5.2 实现退出功能

在speechManager.h中提供退出系统的成员函数 `	void exitSystem();`

在speechManager.cpp中提供具体的功能实现

```c++
void SpeechManager::exitSystem()
{
	cout << "欢迎下次使用" << endl;
	system("pause");
	exit(0);
}
```



### 5.3测试功能

在main函数分支 0  选项中，调用退出程序的接口

![1548124853576](assets/1548124853576.png)



运行测试效果如图：

![1548124888578](assets/1548124888578.png)



## 6、演讲比赛功能

### 6.1 功能分析

比赛流程分析：

抽签 → 开始演讲比赛 → 显示第一轮比赛结果 → 

抽签 → 开始演讲比赛 → 显示前三名结果 → 保存分数



### 6.2 创建选手类

* 选手类中的属性包含：选手姓名、分数
* 头文件中创建 speaker.h文件，并添加代码：

```C++
#pragma once
#include<iostream>
using namespace std;

class Speaker
{
public:
	string m_Name;  //姓名
	double m_Score[2]; //分数  最多有两轮得分
};
```



### 6.3 比赛

#### 6.3.1 成员属性添加

* 在speechManager.h中添加属性

```C++
	//比赛选手 容器  12人
	vector<int>v1;

	//第一轮晋级容器  6人
	vector<int>v2;

	//胜利前三名容器  3人
	vector<int>vVictory;

	//存放编号 以及对应的 具体选手 容器
	map<int, Speaker> m_Speaker;
```





#### 6.3.2 初始化属性

- 在speechManager.h中提供开始比赛的的成员函数 `void initSpeech();`

```c++
	//初始化属性
	void initSpeech();
```



- 在speechManager.cpp中实现`void initSpeech();`

```c++
void SpeechManager::initSpeech()
{
	//容器保证为空
	this->v1.clear();  
	this->v2.clear();
	this->vVictory.clear();
	this->m_Speaker.clear();
	//初始化比赛轮数
	this->m_Index = 1;
}
```



- SpeechManager构造函数中调用`void initSpeech();`

```c++
SpeechManager::SpeechManager()
{
	//初始化属性
	this->initSpeech();
}
```





#### 6.3.3 创建选手

* 在speechManager.h中提供开始比赛的的成员函数 `void createSpeaker();`

```C++
	//初始化创建12名选手
	void createSpeaker();
```



* 在speechManager.cpp中实现`void createSpeaker();`

```C++
void SpeechManager::createSpeaker()
{
	string nameSeed = "ABCDEFGHIJKL";
	for (int i = 0; i < nameSeed.size(); i++)
	{
		string name = "选手";
		name += nameSeed[i];

		Speaker sp;
		sp.m_Name = name;
		for (int i = 0; i < 2; i++)
		{
			sp.m_Score[i] = 0;
		}

		//12名选手编号
		this->v1.push_back(i + 10001);

		//选手编号 以及对应的选手 存放到map容器中
		this->m_Speaker.insert(make_pair(i + 10001, sp));
	}
}
```



* SpeechManager类的 构造函数中调用`void createSpeaker();`

```C++
SpeechManager::SpeechManager()
{
    //初始化属性
	this->initSpeech();
    
	//创建选手
	this->createSpeaker();
}
```



* 测试 在main函数中，可以在创建完管理对象后，使用下列代码测试12名选手初始状态

```C++
for (map<int, Speaker>::iterator it = sm.m_Speaker.begin(); it != sm.m_Speaker.end(); it++)
{
	cout  << "选手编号：" << it->first 
          << " 姓名： " << it->second.m_Name 
          << " 成绩： " << it->second.m_Score[0] << endl;
}
```

![1548141605742](assets/1548141605742.png)

* 测试效果如图：

![1548141560164](assets/1548141560164.png)

* 测试完毕后，可以将测试代码删除或注释。





#### 6.3.4 开始比赛成员函数添加

* 在speechManager.h中提供开始比赛的的成员函数 `void startSpeech();`
* 该函数功能是主要控制比赛的流程

```C++
	//开始比赛 - 比赛流程控制
	void startSpeech();
```



* 在speechManager.cpp中将startSpeech的空实现先写入
* 我们可以先将整个比赛的流程 写到函数中

```C++
//开始比赛
void SpeechManager::startSpeech()
{
	//第一轮比赛
	//1、抽签
	
	//2、比赛

	//3、显示晋级结果

	//第二轮比赛

	//1、抽签

	//2、比赛

	//3、显示最终结果

	//4、保存分数
}

```



#### 6.3.5 抽签

**功能描述：**

* 正式比赛前，所有选手的比赛顺序需要打乱，我们只需要将存放选手编号的容器  打乱次序即可



* 在speechManager.h中提供抽签的的成员函数 `void speechDraw();`

```C++
	//抽签
	void speechDraw();
```



- 在speechManager.cpp中实现成员函数 `void speechDraw();`

```C++
void SpeechManager::speechDraw()
{
	cout << "第 << " << this->m_Index << " >> 轮比赛选手正在抽签"<<endl;
	cout << "---------------------" << endl;
	cout << "抽签后演讲顺序如下：" << endl;
	if (this->m_Index == 1)
	{
		random_shuffle(v1.begin(), v1.end());
		for (vector<int>::iterator it = v1.begin(); it != v1.end(); it++)
		{
			cout << *it << " ";
		}
		cout << endl;
	}
	else
	{
		random_shuffle(v2.begin(), v2.end());
		for (vector<int>::iterator it = v2.begin(); it != v2.end(); it++)
		{
			cout << *it << " ";
		}
		cout << endl;
	}
	cout << "---------------------" << endl;
	system("pause");
	cout << endl;
}
```



* 在startSpeech比赛流程控制的函数中，调用抽签函数

![1548143871202](assets/1548143871202.png)

* 在main函数中，分支1选项中，调用开始比赛的接口

![1548143543475](assets/1548143543475.png)



* 测试

![1548143610682](assets/1548143610682.png)



#### 6.3.6 开始比赛

* 在speechManager.h中提供比赛的的成员函数 `void speechContest();`

```C++
	//比赛
	void speechContest();
```



* 在speechManager.cpp中实现成员函数 `void speechContest();`

```C++
void SpeechManager::speechContest()
{
	cout << "------------- 第"<< this->m_Index << "轮正式比赛开始：------------- " << endl;

	multimap<double, int, greater<int>> groupScore; //临时容器，保存key分数 value 选手编号

	int num = 0; //记录人员数，6个为1组

	vector <int>v_Src;   //比赛的人员容器
	if (this->m_Index == 1)
	{
		v_Src = v1;
	}
	else
	{
		v_Src = v2;
	}

	//遍历所有参赛选手
	for (vector<int>::iterator it = v_Src.begin(); it != v_Src.end(); it++)
	{
		num++;

		//评委打分
		deque<double>d;
		for (int i = 0; i < 10; i++)
		{
			double score = (rand() % 401 + 600) / 10.f;  // 600 ~ 1000
			//cout << score << " ";
			d.push_back(score);
		}

		sort(d.begin(), d.end(), greater<double>());				//排序
		d.pop_front();												//去掉最高分
		d.pop_back();												//去掉最低分

		double sum = accumulate(d.begin(), d.end(), 0.0f);				//获取总分
		double avg = sum / (double)d.size();									//获取平均分

		//每个人平均分
		//cout << "编号： " << *it  << " 选手： " << this->m_Speaker[*it].m_Name << " 获取平均分为： " << avg << endl;  //打印分数
		this->m_Speaker[*it].m_Score[this->m_Index - 1] = avg;

		//6个人一组，用临时容器保存
		groupScore.insert(make_pair(avg, *it));
		if (num % 6 == 0)
		{

			cout << "第" << num / 6 << "小组比赛名次：" << endl;
			for (multimap<double, int, greater<int>>::iterator it = groupScore.begin(); it != groupScore.end(); it++)
			{
				cout << "编号: " << it->second << " 姓名： " << this->m_Speaker[it->second].m_Name << " 成绩： " << this->m_Speaker[it->second].m_Score[this->m_Index - 1] << endl;
			}

			int count = 0;
			//取前三名
			for (multimap<double, int, greater<int>>::iterator it = groupScore.begin(); it != groupScore.end() && count < 3; it++, count++)
			{
				if (this->m_Index == 1)
				{
					v2.push_back((*it).second);
				}
				else
				{
					vVictory.push_back((*it).second);
				}
			}

			groupScore.clear();

			cout << endl;

		}
	}
	cout << "------------- 第" << this->m_Index << "轮比赛完毕  ------------- " << endl;
	system("pause");
}
```



* 在startSpeech比赛流程控制的函数中，调用比赛函数

![1548144491984](assets/1548144491984.png)



* 再次运行代码，测试比赛

![1548144765146](assets/1548144765146.png)



#### 6.3.7 显示比赛分数

* 在speechManager.h中提供比赛的的成员函数 `void showScore();`

```C++
	//显示比赛结果
	void showScore();
```



* 在speechManager.cpp中实现成员函数 `void  showScore();`

```C++
void SpeechManager::showScore()
{
	cout << "---------第" << this->m_Index << "轮晋级选手信息如下：-----------" << endl;
	vector<int>v;
	if (this->m_Index == 1)
	{
		v = v2;
	}
	else
	{
		v = vVictory;
	}

	for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << "选手编号：" << *it << " 姓名： " << m_Speaker[*it].m_Name << " 得分： " << m_Speaker[*it].m_Score[this->m_Index - 1] << endl;
	}
	cout << endl;

	system("pause");
	system("cls");
	this->show_Menu(); 
}
```

* 在startSpeech比赛流程控制的函数中，调用显示比赛分数函数

![1548146903960](assets/1548146903960.png)

* 运行代码，测试效果

![1548146961550](assets/1548146961550.png)



#### 6.3.8 第二轮比赛

第二轮比赛流程同第一轮，只是比赛的轮是+1，其余流程不变

* 在startSpeech比赛流程控制的函数中，加入第二轮的流程

![1548148593215](assets/1548148593215.png)



测试，将整个比赛流程都跑通

![1548148536395](assets/1548148536395.png)



### 6.4 保存分数

**功能描述：**

* 将每次演讲比赛的得分记录到文件中

**功能实现：**

* 在speechManager.h中添加保存记录的成员函数 `void saveRecord();`

```C++
	//保存记录
	void saveRecord();
```



* 在speechManager.cpp中实现成员函数 `void saveRecord();`

```C++
void SpeechManager::saveRecord()
{
	ofstream ofs;
	ofs.open("speech.csv", ios::out | ios::app); // 用输出的方式打开文件  -- 写文件

	//将每个人数据写入到文件中
	for (vector<int>::iterator it = vVictory.begin(); it != vVictory.end(); it++)
	{
		ofs << *it << ","
			<< m_Speaker[*it].m_Score[1] << ",";
	}
	ofs << endl;
    
	//关闭文件
	ofs.close();
    
	cout << "记录已经保存" << endl;
}
```



* 在startSpeech比赛流程控制的函数中，最后调用保存记录分数函数

![1548149937860](assets/1548149937860.png)



* 测试，整个比赛完毕后记录保存情况

![1548149912863](assets/1548149912863.png)



利用记事本打开文件 speech.csv，里面保存了前三名选手的编号以及得分

![1548150047975](assets/1548150047975.png)



至此，整个演讲比赛功能制作完毕！



## 7、 查看记录

### 7.1 读取记录分数



* 在speechManager.h中添加保存记录的成员函数 `void loadRecord();`
* 添加判断文件是否为空的标志  `bool fileIsEmpty;`
* 添加往届记录的容器`map<int, vector<string>> m_Record;`   

其中m_Record 中的key代表第几届，value记录具体的信息

```C++
	//读取记录
	void loadRecord();

	//文件为空的标志
	bool fileIsEmpty;

	//往届记录
	map<int, vector<string>> m_Record;
```



* 在speechManager.cpp中实现成员函数 `void loadRecord();`

```C++
void SpeechManager::loadRecord()
{
	ifstream ifs("speech.csv", ios::in); //输入流对象 读取文件

	if (!ifs.is_open())
	{
		this->fileIsEmpty = true;
		cout << "文件不存在！" << endl;
		ifs.close();
		return;
	}

	char ch;
	ifs >> ch;
	if (ifs.eof())
	{
		cout << "文件为空!" << endl;
		this->fileIsEmpty = true;
		ifs.close();
		return;
	}

	//文件不为空
	this->fileIsEmpty = false;

	ifs.putback(ch); //读取的单个字符放回去

	string data;
	int index = 0;
	while (ifs >> data)
	{
		//cout << data << endl;
		vector<string>v;

		int pos = -1;
		int start = 0;

		while (true)
		{
			pos = data.find(",", start); //从0开始查找 ','
			if (pos == -1)
			{
				break; //找不到break返回
			}
			string tmp = data.substr(start, pos - start); //找到了,进行分割 参数1 起始位置，参数2 截取长度
			v.push_back(tmp);
			start = pos + 1;
		}

		this->m_Record.insert(make_pair(index, v));
		index++;
	}

	ifs.close();
}
```



* 在SpeechManager构造函数中调用获取往届记录函数

![1548151977242](assets/1548151977242.png)



### 7.2 查看记录功能

* 在speechManager.h中添加保存记录的成员函数 `void showRecord();`

```C++
	//显示往届得分
	void showRecord();
```



* 在speechManager.cpp中实现成员函数 `void showRecord();`

```C++
void SpeechManager::showRecord()
{
	for (int i = 0; i < this->m_Record.size(); i++)
	{
		cout << "第" << i + 1 << "届 " <<
			"冠军编号：" << this->m_Record[i][0] << " 得分：" << this->m_Record[i][1] << " "
			"亚军编号：" << this->m_Record[i][2] << " 得分：" << this->m_Record[i][3] << " "
			"季军编号：" << this->m_Record[i][4] << " 得分：" << this->m_Record[i][5] << endl;
	}
    system("pause");
	system("cls");
}
```



### 7.3 测试功能

在main函数分支 2  选项中，调用查看记录的接口

![1548152359604](assets/1548152359604.png)

显示效果如图：（本次测试添加了4条记录）

![1548152394715](assets/1548152394715.png)



### 7.4 bug解决

目前程序中有几处bug未解决：

1. 查看往届记录，若文件不存在或为空，并未提示

解决方式：在showRecord函数中，开始判断文件状态并加以判断

![1548152803116](assets/1548152803116.png)



2. 若记录为空或不存在，比完赛后依然提示记录为空

解决方式：saveRecord中更新文件为空的标志

![1548153005042](assets/1548153005042.png)

3. 比完赛后查不到本届比赛的记录，没有实时更新

解决方式：比赛完毕后，所有数据重置

![1548153319587](assets/1548153319587.png)



4. 在初始化时，没有初始化记录容器

解决方式：initSpeech中添加 初始化记录容器

![1548154340974](assets/1548154340974.png)

5. 每次记录都是一样的

解决方式：在main函数一开始 添加随机数种子

```C++
srand((unsigned int)time(NULL));
```



所有bug解决后 测试：

![1548153571603](assets/1548153571603.png)



## 8、 清空记录

### 8.1 清空记录功能实现

* 在speechManager.h中添加保存记录的成员函数 `void clearRecord();`

```C++
	//清空记录
	void clearRecord();
```



* 在speechManager.cpp中实现成员函数 `void clearRecord();`

```C++
void SpeechManager::clearRecord()
{
	cout << "确认清空？" << endl;
	cout << "1、确认" << endl;
	cout << "2、返回" << endl;

	int select = 0;
	cin >> select;

	if (select == 1)
	{
		//打开模式 ios::trunc 如果存在删除文件并重新创建
		ofstream ofs("speech.csv", ios::trunc);
		ofs.close();

		//初始化属性
		this->initSpeech();

		//创建选手
		this->createSpeaker();

		//获取往届记录
		this->loadRecord();
		

		cout << "清空成功！" << endl;
	}

	system("pause");
	system("cls");
}
```

### 8.2 测试清空

在main函数分支 3  选项中，调用清空比赛记录的接口

![1548154674242](assets/1548154674242.png)

运行程序，测试清空记录：

![1548154004738](assets/1548154004738.png)

speech.csv中记录也为空

![1548154508831](assets/1548154508831.png)



* 至此本案例结束！ `^_^`