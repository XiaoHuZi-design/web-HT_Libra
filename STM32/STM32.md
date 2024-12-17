# 标准库编程
【STM32入门教程-2023版 细致讲解 中文字幕-哔哩哔哩】 [https://b23.tv/XzYYNyK](https://b23.tv/XzYYNyK)

【【单片机】野火STM32F103标准外设库(SPL)开发教学视频【全集】-哔哩哔哩】 [https://b23.tv/Zw5oOrp](https://b23.tv/Zw5oOrp)



## LED点灯


## OLED显示屏
【[模块教程] 第1期 0.96寸OLED显示屏】 [https://www.bilibili.com/video/BV1EN41177Pc/?share_source=copy_web&vd_source=15777ee1ddccdb98cdd99268c52b0741](https://www.bilibili.com/video/BV1EN41177Pc/?share_source=copy_web&vd_source=15777ee1ddccdb98cdd99268c52b0741)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733210856517-e64114e4-ab75-4441-8cef-f1cd6da6b9e4.png)

以4引脚I2C为例：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733148390290-68251615-a38f-4e96-b2b1-c5a958c1e56e.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733149157258-9db6bb95-f016-4961-8556-88c5145fb763.png) 点3个箱子图标，新建一个组HardWare（随意）![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733149218596-55e29a37-05ef-4723-a61a-9643679ed8af.png)

首先复制OLED驱动，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733148167413-11274f3a-0def-45fa-90e7-0f329d124bcb.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733149018278-4b7f8a76-1389-4f7b-a400-35a1671b0f08.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733149037245-97beabf7-32c6-435f-8e6a-1dc855a7b17e.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733147234169-13dd6b54-a091-419e-aa62-f645f7468118.png) 让中文适配utf-8格式

```plain
#include "stm32f10x.h"   // Device header
#include "OLED.h"

//编码格式：UTF-8

int main(void)
{
	OLED_Init();
	
	OLED_ShowString(0, 0, "Hello World!", OLED_8X16);
	OLED_ShowChinese(0, 20, "你好，世界。");
	
	OLED_Update();  //不调用Update不会显示
	
	while (1)
	{
		
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1733149343747-4fd27307-9696-4bbf-a548-f74382ebc8b7.jpeg)

取模：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733150162721-1143d8f5-b3a6-42ba-a2c0-a6d9f5423793.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733150362422-891e8a28-c5c1-448f-97a5-007615403366.png)

注意上述参数一致，

生成字模后将汉字作为索引，整理成下面格式：

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733150471481-20911b73-dbed-4a3d-8520-066924c01642.png)



显示图片

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733150936146-939a9666-956a-444d-9b6a-f85bffeaf393.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733150974187-027924df-98a3-44af-8fd4-65cf006fdf72.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733151009795-39d67266-d72c-4ec9-bdc0-06835f8dff8d.png)

打开取模助手图像模式，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733151066473-6405f7bf-e817-4edc-87b3-7082e037f935.png) 新建一个15x15的点阵，画个电池，左键点右键消，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733151127260-e2391125-dc1b-4b88-b94b-d8d68d19e6da.png)     ![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733151311498-2c286027-78e8-418f-8e3e-0f1edf4fab94.png)

生成字模，调整一下格式套个数组，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733151528387-b47eb0ae-b2a1-44a8-b78f-9729ce0e2d4d.png)

头文件声明，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733151624732-16516310-c833-4f81-90a0-e46ba1cca360.png)



## PWM
PWM驱动呼吸灯

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733213909735-81f5447c-d5fa-4b5a-81a5-d1c63d3e3a2c.png)

<font style="color:#DF2A3F;">接一个led到PA0.高电平点亮            LED 的阳极（较长的引脚）</font>

复制前面的OLED工程重命名，方便有需要在oled输出pwm信息,

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733214318595-0d44e51b-5307-4c9c-a73f-70371ddfaec8.png)

同理添加对应.h文件。

编写头文件固定部分，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733214439657-660012c0-e67f-49de-a377-766402a06ab1.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733214542541-d27e3e8d-e0e2-427c-98f3-368db760b286.png)

-------------------------------------------------------------------------------------------------------------------

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733217049652-186d07db-ef6d-4c54-bce0-92de2ce6c4ac.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733217156192-f66cb536-7ffe-4c6f-813e-90a47e513a79.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733217170356-a467675d-3fb9-4821-9fd5-89eb425254a5.png)

```plain
#include "stm32f10x.h"

void PWM_Init(void)   //6-1从定时器中断复制  注释掉不需要的
{
	/*开启时钟*/
	RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE);			//开启TIM2的时钟
	
	//新加  从led.c复制修改
	/*开启时钟*/
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);		//开启GPIOA的时钟
	/*GPIO初始化*/
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;  //改用复用推挽输出 引脚的控制权才能交给片上外设，PWM波形才能通过引脚输出
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);						//将PA1和PA2引脚初始化为推挽输出

	
	/*配置时钟源*/
	TIM_InternalClockConfig(TIM2);		//选择TIM2为内部时钟，若不调用此函数，TIM默认也为内部时钟
	
	/*时基单元初始化*/         // 例如 产生一个频率为1KHz，占空比为50%，分辨率为1%的PWM波形
	TIM_TimeBaseInitTypeDef TIM_TimeBaseInitStructure;				//定义结构体变量
	TIM_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1;		//时钟分频，选择不分频，此参数用于配置滤波器时钟，不影响时基单元功能
	TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up;	//计数器模式，选择向上计数
	TIM_TimeBaseInitStructure.TIM_Period = 100 - 1;				//计数周期，即ARR的值
	TIM_TimeBaseInitStructure.TIM_Prescaler = 720 - 1;				//预分频器，即PSC的值
	TIM_TimeBaseInitStructure.TIM_RepetitionCounter = 0;			//重复计数器，高级定时器才会用到
	TIM_TimeBaseInit(TIM2, &TIM_TimeBaseInitStructure);				//将结构体变量交给TIM_TimeBaseInit，配置TIM2的时基单元	
	
//	/*中断输出配置*/
//	TIM_ClearFlag(TIM2, TIM_FLAG_Update);						//清除定时器更新标志位
//																//TIM_TimeBaseInit函数末尾，手动产生了更新事件
//																//若不清除此标志位，则开启中断后，会立刻进入一次中断
//																//如果不介意此问题，则不清除此标志位也可
//	
//	TIM_ITConfig(TIM2, TIM_IT_Update, ENABLE);					//开启TIM2的更新中断
//	
//	/*NVIC中断分组*/
//	NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);				//配置NVIC为分组2
//																//即抢占优先级范围：0~3，响应优先级范围：0~3																//此分组配置在整个工程中仅需调用一次																//若有多个中断，可以把此代码放在main函数内，while循环之																//若调用多次配置分组的代码，则后执行的配置会覆盖先执行的配置
//	
//	/*NVIC配置*/
//	NVIC_InitTypeDef NVIC_InitStructure;						//定义结构体变量
//	NVIC_InitStructure.NVIC_IRQChannel = TIM2_IRQn;				//选择配置NVIC的TIM2线
//	NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;				//指定NVIC线路使能
//	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 2;	//指定NVIC线路的抢占优先级为2
//	NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;			//指定NVIC线路的响应优先级为1
//	NVIC_Init(&NVIC_InitStructure);								//将结构体变量交给NVIC_Init，配置NVIC外设
	
	//新加
	TIM_OCInitTypeDef TIM_OCInitStructure;
	TIM_OCStructInit(&TIM_OCInitStructure);
	TIM_OCInitStructure.TIM_OCMode = TIM_OCMode_PWM1;
	TIM_OCInitStructure.TIM_OCPolarity = TIM_OCPolarity_High;
	TIM_OCInitStructure.TIM_OutputState = TIM_OutputState_Enable;
	TIM_OCInitStructure.TIM_Pulse = 50; //CCR
	TIM_OC1Init(TIM2, &TIM_OCInitStructure);

	/*TIM使能*/
	TIM_Cmd(TIM2, ENABLE);			//使能TIM2，定时器开始运行
}
```

头文件声明一下，



```plain
/**
  * 函    数：PWM设置CCR
  * 参    数：Compare 要写入的CCR的值，范围：0~100
  * 返 回 值：无
  * 注意事项：CCR和ARR共同决定占空比，此函数仅设置CCR的值，并不直接是占空比
  *           占空比Duty = CCR / (ARR + 1)
  */
//写个函数封装一下TIM_SetCompare1
void PWM_SetCompare1(uint16_t Compare)
{
	TIM_SetCompare1(TIM2, Compare);		//设置CCR1的值
}

```

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "PWM.h"

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	PWM_Init();
	
	while (1)
	{
		for(int i=0; i <= 100; i++)  //CCR占空比0--》100
		{
			PWM_SetCompare1(i);
			Delay_ms(10);
		}
		for(int i=0; i <= 100; i++)
		{
			PWM_SetCompare1(100 - i); //CCR占空比100--》0
			Delay_ms(10);
		}
	}
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733220045439-ae6430d7-5a9f-48e5-bd69-887e08fa4b49.png)

发现原位置等灭，将led灯接PA15发现会出现呼吸灯。



## PWM控制舵机
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733219752907-ba74f67b-6152-4787-99ed-6845e271a6ea.png)

复制呼吸灯工程，重命名，

改输出口![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733225298256-5f88a4a5-ffef-438c-9e45-c6a90bc39d62.png)

现在用的PA1口的通道2，改通道OC1Init为OC2Init![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733225362534-58bd2412-5282-4d39-92ed-7dcadb031582.png)

这样结构体的参数就会配置到通道2了（如果两个通道都想用的话，直接写两行代码都初始化，这样就能同时用两个通道输出两个PWM了）。

SetCompare1改为SetCompare2

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733225645824-9c9e927d-638b-45e3-a4cd-9c184a04fc1a.png)

主函数也改一下，这样就能使用通道2了

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733225879479-2b0c2249-fb2d-45c2-8fe6-4556117a8bf2.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733225894955-d4fbec95-81c2-4ebd-bccc-522b247cbb62.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733225926492-54842a72-aaa2-4b0f-aa76-56df655128b0.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733225951139-dccbd8f9-1a0e-4bd7-9070-cb37f7afa708.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733226066447-5137551f-c2d1-42ff-9801-2779eef7e656.png)



```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "PWM.h"

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	PWM_Init();
	
	PWM_SetCompare2(1500); //500-->0° 1500-->90°  2500-->180°
	
	while (1)
	{

	}
}
```



数字不直观，新建一个舵机模块映射封装一下，servo.c和servo.h![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733226711461-87543718-7646-4eef-8893-4e7b1fc3a009.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733227075267-591d38e3-b2de-4fe6-80cd-38587340d58f.png)

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
//#include "PWM.h"
#include "servo.h"
#include "key.h"

uint8_t KeyNum;      //按键键码
float Angle;         //角度变量

int main(void)
{
	/*模块初始化*/
	OLED_Init();   //OLED初始化
	Key_Init();    //按键初始化
	
//	PWM_Init();
//	PWM_SetCompare2(1500); //500-->0° 1500-->90°  2500-->180°
	
	Servo_Init();  //舵机初始化
	Servo_SetAngle(90);
	
	OLED_ShowString(1, 1, "Angle:"); //OLED显示角度名
	
	while (1)
	{
		KeyNum = Key_GetNum();
		if (KeyNum == 1)
		{
			Angle += 30;
			if (Angle >180)
			{
				Angle = 0;
			}
			Servo_SetAngle(Angle);
			OLED_ShowNum(1, 7, Angle, 3); //OLED显示角度
		}
	}
}
```

可以发现没按一次按键舵机转30°并且屏幕显示角度值。



## 旋转编码器计次
新建文件![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733231677733-cae5058f-e1c8-4053-8cdb-c618c9dee571.png)

```plain
#include "stm32f10x.h"                  // Device header

void Encoder_Init(void)   // 14 改 0,1
{
	/*开启时钟*/
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);		//开启GPIOB的时钟
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO, ENABLE);		//开启AFIO的时钟，外部中断必须开启AFIO的时钟
	
	/*GPIO初始化*/
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0 | GPIO_Pin_1;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOB, &GPIO_InitStructure);						//将PB0或PB1引脚初始化为上拉输入
	
	/*AFIO选择中断引脚*/
	GPIO_EXTILineConfig(GPIO_PortSourceGPIOB, GPIO_PinSource0);//将外部中断的线映射到GPIOB，即选择PB0或PB1为外部中断引脚
	GPIO_EXTILineConfig(GPIO_PortSourceGPIOB, GPIO_PinSource1); 
	
	/*EXTI初始化*/
	EXTI_InitTypeDef EXTI_InitStructure;						//定义结构体变量
	EXTI_InitStructure.EXTI_Line = EXTI_Line0 | EXTI_Line1;		//选择配置外部中断的线
	EXTI_InitStructure.EXTI_LineCmd = ENABLE;					//指定外部中断线使能
	EXTI_InitStructure.EXTI_Mode = EXTI_Mode_Interrupt;			//指定外部中断线为中断模式
	EXTI_InitStructure.EXTI_Trigger = EXTI_Trigger_Falling;		//指定外部中断线为下降沿触发
	EXTI_Init(&EXTI_InitStructure);								//将结构体变量交给EXTI_Init，配置EXTI外设
	
	/*NVIC中断分组*/
	NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);				//配置NVIC为分组2
																//即抢占优先级范围：0~3，响应优先级范围：0~3
																//此分组配置在整个工程中仅需调用一次
																//若有多个中断，可以把此代码放在main函数内，while循环之前
																//若调用多次配置分组的代码，则后执行的配置会覆盖先执行的配置
	
	/*NVIC配置*/
	NVIC_InitTypeDef NVIC_InitStructure;						//定义结构体变量
	NVIC_InitStructure.NVIC_IRQChannel = EXTI0_IRQn;		//选择配置NVIC的EXTI0线
	NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;				//指定NVIC线路使能
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 1;	//指定NVIC线路的抢占优先级为1
	NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;			//指定NVIC线路的响应优先级为1
	NVIC_Init(&NVIC_InitStructure);								//将结构体变量交给NVIC_Init，配置NVIC外设
	
	NVIC_InitStructure.NVIC_IRQChannel = EXTI1_IRQn;		//选择配置NVIC的EXTI1线
	NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;				
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 2;	//指定NVIC线路的抢占优先级为2
	NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;			
	NVIC_Init(&NVIC_InitStructure);								
}


void EXTI0_IRQHandler(void)
{
	if(EXTI_GetITStatus(EXTI_Line0) == SET)  //判断标志位EXTI_Line0
	{
		EXTI_ClearITPendingBit(EXTI_Line0);  //清除标志位EXTI_Line0
	}
}

void EXTI1_IRQHandler(void)
{
	if(EXTI_GetITStatus(EXTI_Line1) == SET) 
	{
		EXTI_ClearITPendingBit(EXTI_Line1);
	}
}

```

然后就可以写实现功能的代码了，

```plain
// 我们需要返回Encoder_Count,然后把Encoder_Count清零，但又因为返回Encoder_Count后函数结束了
// 所以先定义一个临时变量Temp，把Encoder_Count赋值给Temp，再把Encoder_Count清零
int16_t Encoder_Get(void)   //确保返回数值是连续的
{
	int16_t Temp;
	Temp = Encoder_Count;
	Encoder_Count = 0;
	return Temp;
}

void EXTI0_IRQHandler(void)   //反转 逆时针
{
	if(EXTI_GetITStatus(EXTI_Line0) == SET)  //判断标志位EXTI_Line0
	{
		if(GPIO_ReadInputDataBit(GPIOB, GPIO_Pin_1) == 0)
		{
			Encoder_Count --; 
		}
		EXTI_ClearITPendingBit(EXTI_Line0);  //清除标志位EXTI_Line0
	}
}

void EXTI1_IRQHandler(void) //正转 顺时针
{
	if(EXTI_GetITStatus(EXTI_Line1) == SET) 
	{
		if(GPIO_ReadInputDataBit(GPIOB, GPIO_Pin_0) == 0)
		{
			Encoder_Count ++; 
		}
		EXTI_ClearITPendingBit(EXTI_Line1);
	}
}

```

然后把函数都声明一下，然后编写主函数，

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Encoder.h"

int16_t Num;

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Encoder_Init();
	
	OLED_ShowString(1, 1, "Num:");
	
	while (1)
	{
		Num += Encoder_Get();  //旋转编码器产生的正负脉冲数
		OLED_ShowSignedNum(1, 5, Num, 5);
	}
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733234523490-02b2a180-f47c-4b3d-a793-c727488ab003.png)



## 输入捕获模式测频率
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733296179425-2d572f53-a75e-47f4-a4df-6e9f2b38ff8e.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733296230034-40386aa2-f8c0-462b-a9fa-5fc0f4656857.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733296204257-5d98a18b-2dd3-4a12-9381-b79f9b24365a.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733296098653-2a486e5c-7f67-445c-a970-fdd16434bf81.png)

第一步，RCC开启时钟，把GPIO和TIM的时钟打开，

第二步，GPIO初始化，把GPIO配置成输入模式，一般选择上拉输入或者浮空输入，

第三步，配置时基单元，让CNT计数器在内部时钟的驱动下自增运行，

第四步，配置输入捕获单元，包括滤波器、极性、直连通道还是交叉通道、分频器这些参数，用一个结构体就能统一进行配置了，

第五步，选择从模式的触发源，触发源选择为TI1FP1，这里调用一个库函数，给一个参数就行了，

第六步，选择触发之后的执行操作，执行Reset操作，这里也是调用一个库函数就行了，

最后，当这些电路都配置好之后，调用TIM_Cmd函数，开启定时器，

这样所有的电路就能配合起来，按照我们的要求进行工作了，当我们需要读取最新一个周期的频率时，直接读取CCR寄存器，然后按照fc / N，计算一下就行了。



```plain
	/*开启时钟*/  //还需要TIM2输出PWM，换个TIM3  也还是APB1的外设
	RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM3, ENABLE);			//开启TIM3的时钟
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);		//开启GPIOA的时钟	

	/*GPIO初始化*/    //计划用PA6的通道1
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU; //上拉输入
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);						
	
	/*配置时钟源*/
	TIM_InternalClockConfig(TIM3);		//选择TIM3为内部时钟
	
	/*时基单元初始化*/        
	TIM_TimeBaseInitTypeDef TIM_TimeBaseInitStructure;				//定义结构体变量
	TIM_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1;		//时钟分频，选择不分频，此参数用于配置滤波器时钟，不影响时基单元功能
	TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up;	//计数器模式，选择向上计数
	TIM_TimeBaseInitStructure.TIM_Period = 65536 - 1;				//计数周期，即ARR的值  设置大一些防止计数溢出 这里给最大值65536
	TIM_TimeBaseInitStructure.TIM_Prescaler = 72 - 1;				//预分频器，即PSC的值   1MHz
	TIM_TimeBaseInitStructure.TIM_RepetitionCounter = 0;			//重复计数器，高级定时器才会用到
	TIM_TimeBaseInit(TIM3, &TIM_TimeBaseInitStructure);				//将结构体变量交给TIM_TimeBaseInit，配置TIM2的时基单元	

```

===================================================================

_**TIM_ICFilter，滤波器**_

滤波器计次并不会改变信号的原有频率，一般滤波器的采样频率会远高于信号频率，所以它只会滤除高频噪声，使信号更平滑，1KHz滤波之后仍然是1KHz,信号频率不会变化，而分频器就是对信号本身进行计次了，会改变频率，比如1KHz, 2分频之后就是500Hz，4分频就是250Hz。

_**TIM_ICPrescaler，触发信号分频器**_

不分频就是每次触发都有效，2分频就是每隔一次有效一次![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733304047727-c64297b8-dbd9-432c-931e-54e7701e1f65.png)

选择DIV1，不分频。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733304275785-80fa41b9-6340-4678-bbd2-ed02ab1a828f.png)直连通道和交叉通道的输入

```plain
	//初始化输入捕获单元
	TIM_ICInitTypeDef TIM_ICInitStructure;
	TIM_ICInitStructure.TIM_Channel = TIM_Channel_1;  //TMI3的通道1
	TIM_ICInitStructure.TIM_ICFilter = 0XF;  // 滤波器计次 0x0 and 0xF 
	TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //上升沿触发
	TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1 ;  // 触发信号分频器  DIV1不分配
	TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_DirectTI; //选择触发信号从哪个引脚输入  直连通道
	TIM_ICInit(TIM3, &TIM_ICInitStructure); //结构体的地址放ICInit里面
```



===================================================================

_**配置主从模式**_，

第5步，配置TRGI的触发源为TI1FP1.

触发源选择，要用这个TIM_SelectInputTrigger，有8种选择，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733304760007-3d51645b-0e75-4a35-9956-e6cf9ce50031.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733304781325-c01b0d2f-c9c7-4718-b2b6-9e3dcd69052b.png)我们选择TIM_TS_TI1FP1，

第6步配置从模式为Reset,

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733305007884-095f4a5d-7cf3-4f86-9e35-38b665e52576.png)

使用TIM_SelectSlaveMode，选择从模式，有4种选择，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733305167028-5ba1ffc0-2843-4e4d-9c1d-398aeb696823.png)

```plain
	//配置主从模式  第2个参数选择哪个触发源
	TIM_SelectInputTrigger(TIM3, TIM_TS_TI1FP1);
	TIM_SelectSlaveMode(TIM3, TIM_SlaveMode_Reset);
	
	//参数给TIM3,启动定时器
	TIM_Cmd(TIM3,ENABLE);
```

这样整个电路就配置完了。

当我们启动定时器之后，CNT就会在内部时钟的驱动下不断自增，即使信号没有过来它也会不断的自增，不过这也没关系，有信号来的时候，它就会在从模式的作用下自动清零，并不会影响测量。

===================================================================

初始化之后，整个电路就能全自动测量了，当我们想要查看频率时，需要读取CCR，进行计算，所以再写一个函数

```plain
//获取频率
uint32_t IC_GetFreq(void)
{	//返回的是最新一个周期的频率值，单位Hz
	return 1000000 / TIM_GetCapture1(TIM3);
}
```

```plain
#include "PWM.h"
#include "IC.h"

int main(void)
{
	/*模块初始化*/
	OLED_Init();  //OLED初始化
	PWM_Init();
	IC_Init();  //初始化电路
	
	OLED_ShowString(1, 1, "Freq:00000Hz");
	
	PWM_SetPrescaler(720 - 1);  //Freq = 72M/[(PSC+1)100]
	PWM_SetCompare1(50);        //Duty = CCR/100      CCR+1=100
	// PA0口就能输出一个频率为1KHz,占空比为50%的待测信号了
		
	while (1)
	{
		OLED_ShowNum(1, 6, IC_GetFreq(), 5);
	}
}
```



## PWMI模式测频率占空比
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733316469378-c3d0b27b-4797-4345-8ebe-af8b18507c2b.png)

首先RCC开启时钟，GPIO初始化，配置时基单元不需要更改，

配置输入捕获单元需要进行一下升级，

把通道初始化部分复制一份作为通道2，

通道1是直连输入，上升沿触发，

通道2，直连输入改为交叉输入，上升沿触发改下降沿触发，

```plain
	//初始化输入捕获单元
	TIM_ICInitTypeDef TIM_ICInitStructure;
	TIM_ICInitStructure.TIM_Channel = TIM_Channel_1;  //TMI3的通道1
	TIM_ICInitStructure.TIM_ICFilter = 0XF;  // 滤波器计次 0x0 and 0xF 
	TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //上升沿触发
	TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1 ;  // 触发信号分频器  DIV1不分配
	TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_DirectTI; //选择触发信号从哪个引脚输入  直连通道
	TIM_ICInit(TIM3, &TIM_ICInitStructure); //结构体的地址放ICInit里面
	
	TIM_ICInitStructure.TIM_Channel = TIM_Channel_2;  //TMI3的通道2
	TIM_ICInitStructure.TIM_ICFilter = 0XF;  // 滤波器计次 0x0 and 0xF 
	TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Falling; // 下降沿触发
	TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1 ;  // 触发信号分频器  DIV1不分配
	TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_IndirectTI; // 直连通道 改为 交叉通道
	TIM_ICInit(TIM3, &TIM_ICInitStructure); //结构体的地址放ICInit里面
```

```plain
	// 初始化输入捕获单元
	TIM_ICInitTypeDef TIM_ICInitStructure;
	TIM_ICInitStructure.TIM_Channel = TIM_Channel_1;  //TMI3的通道1
	TIM_ICInitStructure.TIM_ICFilter = 0XF;  // 滤波器计次 0x0 and 0xF 
	TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //上升沿触发
	TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1 ;  // 触发信号分频器  DIV1不分配
	TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_DirectTI; //选择触发信号从哪个引脚输入  直连通道
	TIM_ICInit(TIM3, &TIM_ICInitStructure); //结构体的地址放ICInit里面
  
  // TIM_PWMIConfig自动把另一个通道设置为相反的配置
	TIM_PWMIConfig(TIM3, &TIM_ICInitStructure);  //方法2 和上述效果一样
```

接下来其他的不用改，再写一个获取占空比的函数，

高电平的计数值存在CCR2里，整个周期的计数值存在CCR1里，我们用CCR2 / CCR1就能得到占空比了，

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "PWM.h"
#include "IC.h"

int main(void)
{
	/*模块初始化*/
	OLED_Init();  //OLED初始化
	PWM_Init();
	IC_Init();  //初始化电路
	
	OLED_ShowString(1, 1, "Freq:00000Hz");
	OLED_ShowString(2, 1, "Duty:00%");
	
	PWM_SetPrescaler(720 - 1);  //Freq = 72M/[(PSC+1)100]
	PWM_SetCompare1(50);        //Duty = CCR/100      CCR+1=100
	// PA0口就能输出一个频率为1KHz,占空比为50%的待测信号了
		
	while (1)
	{
		OLED_ShowNum(1, 6, IC_GetFreq(), 5);
		OLED_ShowNum(2, 6, IC_GetDuty(), 2);
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733318351109-c9275e38-8c12-4d57-9d61-b53c75fc963e.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733318418384-e95a8ed5-e15e-4117-b21c-d811c81f8421.png)

改PSC+1为7200，则频率为100Hz；改CCR为80Hz，则占空比为80%。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733318616259-05454e0a-1715-4b5d-a67b-2d569d0b2928.png)                                                _**<font style="color:#DF2A3F;">自己测量自己</font>**_



## 编码器接口测速
编码器接口测速一般应用在电机控制的项目上，使用PWM驱动电机，再使用编码器测量电机的速度，然后再用PID算法进行闭环控制。

一般电机旋转速度比较高，会使用无接触式的霍尔传感器或者光栅进行测速，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733319223390-af4ca955-95dd-42e1-bb0b-1346a46f733a.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733319243310-e60d1391-6b79-459c-85c6-6a20e021efcc.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733319315200-b81401da-b1f8-4f76-874a-c195de1f57ec.png)

实验现象：这是一个编码器，它有两个输出，一个A相，一个B相，然后接入到STM32，定时器的编码器接口，编码器接口自动控制定时器时基单元中的CNT计数器，进行自增或自减。

比如初始化之后，CNT初始值为0，然后编码器右转，CNT就++，右转产生一个脉冲，CNT就加一次，比如右转产生10个脉冲后，停下来，那么这个过程CNT就由0自增到10，停下来。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733319774247-8902f169-4e6b-4b4d-8855-1a2b95b0f3a1.png)

比如我编码器再左转产生5个脉冲，那CNT就在原来10的基础上自减5，停下来，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733319886680-40b220f7-c8a2-422f-abc6-5606252bc24b.png)

它同时控制着CNT的计数时钟和计数方向，这样的话CNT的值就表示了编码器的位置。

如果我们每隔一段时间取一次CNT的值，再把CNT清零，是不是每次取出的值就表示了编码器的速度，

借用上一小节，测频法和测周法的知识点，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733320151698-75c6c9de-cf80-488c-a415-b5a339c95e15.png)

CNT计次，然后每隔一段时间取一次计次，这就是测频法的思路，只不过这个编码器接口计次更高级，它能根据旋转方向，不仅能自增计次，还能自减计次，是一个带方向的测速，

以上就是编码器接口的工作流程了。



_**在 6-1 定时器中断 代码基础上写，复制重命名 6-8 编码器接口测速，**_

先把定时中断部分注释掉，编译一下

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733922686535-61a707ca-0019-4fc2-85f3-dd5cb7dc70dd.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733922870773-957eec5b-e79d-4157-bc50-8bac77e13cad.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733922987808-1c59e17e-c726-4da6-9c20-0a5ffc297fd4.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923004549-9b4f4e4d-1d2a-44f8-bd69-3505d90f7d30.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923030004-13a621aa-0175-4fa3-a045-a6089d990ad4.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923057791-63f14c9b-6c90-4a2a-96ab-ca4106af4501.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923077214-23297d43-35a5-472b-8051-2da0af09d99a.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923097316-57a87187-faee-41e9-9172-79b940b7b865.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923113604-8b7f15f6-ee7f-4d9c-a580-b2ffe7b1318a.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923128412-6cfca27f-98f7-4e9a-a819-d696f7bf456c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923146250-f07c4344-733d-4915-b918-a6873e52cc3a.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923166582-84c9b348-38cc-4e12-984c-df85fd67d978.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923182674-81e210d8-0e98-4c72-8de3-c71a56438c54.png)

电路初始化完成之后，CNT就会随着编码器旋转而自增自减，如果想要测量编码器的位置，那直接读出CNT的值就行了，如果想要测量编码器的速度和方向，那就需要每隔一段固定的闸门时间，取出一次CNT，然后把CNT清零，这样就是测频法测量速度了。

下面我们来看一下库函数，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733923683653-4ef19b9c-99fe-48a4-84ee-8c416d1e965c.png)

_**定时器编码器接口配置**_，第一个参数选择定时器。第二个参数选择编码器模式，然后后面两个参数，分别选择通道1和通道2的电平极性。

```plain
void TIM_EncoderInterfaceConfig(TIM_TypeDef* TIMx, uint16_t TIM_EncoderMode,
                                uint16_t TIM_IC1Polarity, uint16_t TIM_IC2Polarity);
```

```plain
#include "stm32f10x.h"                  // Device header

// 编码器接口的初始化
void Encoder_Init(void)
{
	 //开始编写
}
```

首先，前面几部和之前的输入捕获代码基本一样，直接复制，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733924222051-7c905d14-7202-4f5d-a155-ecfd490c793b.png)

```plain
	/*开启时钟*/  //还需要TIM2输出PWM，换个TIM3  也还是APB1的外设
	RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM3, ENABLE);			//开启TIM3的时钟
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);		//开启GPIOA的时钟	

	/*GPIO初始化*/    //计划用PA6的通道1
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU; //上拉输入
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);						
	
	/*配置时钟源*/
	TIM_InternalClockConfig(TIM3);		//选择TIM3为内部时钟
	
	/*时基单元初始化*/        
	TIM_TimeBaseInitTypeDef TIM_TimeBaseInitStructure;				//定义结构体变量
	TIM_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1;		//时钟分频，选择不分频，此参数用于配置滤波器时钟，不影响时基单元功能
	TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up;	//计数器模式，选择向上计数
	TIM_TimeBaseInitStructure.TIM_Period = 65536 - 1;				//计数周期，即ARR的值  设置大一些防止计数溢出 这里给最大值65536
	TIM_TimeBaseInitStructure.TIM_Prescaler = 72 - 1;				//预分频器，即PSC的值   1MHz
	TIM_TimeBaseInitStructure.TIM_RepetitionCounter = 0;			//重复计数器，高级定时器才会用到
	TIM_TimeBaseInit(TIM3, &TIM_TimeBaseInitStructure);				//将结构体变量交给TIM_TimeBaseInit，配置TIM2的时基单元	

	//初始化输入捕获单元
	TIM_ICInitTypeDef TIM_ICInitStructure;
	TIM_ICInitStructure.TIM_Channel = TIM_Channel_1;  //TMI3的通道1
	TIM_ICInitStructure.TIM_ICFilter = 0XF;  // 滤波器计次 0x0 and 0xF 
	TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //上升沿触发
	TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1 ;  // 触发信号分频器  DIV1不分配
	TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_DirectTI; //选择触发信号从哪个引脚输入  直连通道
	TIM_ICInit(TIM3, &TIM_ICInitStructure); //结构体的地址放ICInit里面

```

```plain
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6 | GPIO_Pin_7;
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733924417500-ff208b5b-d36f-4d20-a40b-9aeae8b841ab.png)

_定时器内部时钟配置不需要，因为编码器会托管时钟，编码器接口就是一个带方向控制的外部时钟，所以内部时钟就没有用了_。

```plain
TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up;	//计数器模式，选择向上计数
```

_计数器模式这个参数也是暂时没有用的，因为计数方向也是被编码器接口托管的_

__

```plain
TIM_TimeBaseInitStructure.TIM_Prescaler = 1 - 1;
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733924783257-4aaea025-c5e2-4135-8669-03c12fa9b61d.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733925125422-23de5d4e-260d-4cff-a0d1-3c7337bfa3d3.png)

```plain
TIM_ICStructInit(&TIM_ICInitStructure); //结构体初始化
```

加个结构体初始化，

转到定义看一下，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733925168586-0ea2f92d-2b9c-4c9e-bfa2-5f51df154be5.png)

这些就是默认给的初始值，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733925239587-b5dd75d6-304d-4432-b262-c74365e3293d.png)

通道1复制一下  给通道2

```plain
	//初始化输入捕获单元
	TIM_ICInitTypeDef TIM_ICInitStructure;
	TIM_ICStructInit(&TIM_ICInitStructure); //结构体初始化 给结构体赋初始值
	TIM_ICInitStructure.TIM_Channel = TIM_Channel_1;  //TMI3的通道1
	TIM_ICInitStructure.TIM_ICFilter = 0XF;  // 滤波器计次 0x0 and 0xF 
	TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //上升沿触发
	TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1 ;  // 触发信号分频器  DIV1不分配
	TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_DirectTI; //选择触发信号从哪个引脚输入  直连通道
	TIM_ICInit(TIM3, &TIM_ICInitStructure); //结构体的地址放ICInit里面

	TIM_ICInitStructure.TIM_Channel = TIM_Channel_2;  //TMI3的通道2
	TIM_ICInitStructure.TIM_ICFilter = 0XF;  // 滤波器计次 0x0 and 0xF 
	TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising; //上升沿触发
	TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1 ;  // 触发信号分频器  DIV1不分配
	TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_DirectTI; //选择触发信号从哪个引脚输入  直连通道
	TIM_ICInit(TIM3, &TIM_ICInitStructure); //结构体的地址放ICInit里面
```



下一步，_**配置编码器接口**_，这里只需要调用一个函数就行了，到tim.h复制TIM_EncoderInterfaceConfig函数

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733925708602-c26b37c3-e2ad-463c-b7c2-19eb15adca74.png)

3个模式一般使用TI1和TI2都计数，选择第三个模式，

后两个参数就是IC1和IC2的极性了，参数列表一样都是Falling和Rising,

选择rising就是这个通道不反向，选择Falling就是这个通道反向，目前先选择rising，

```plain
  //配置编码器接口
	TIM_EncoderInterfaceConfig(TIM3, TIM_EncoderMode_TI12, TIM_ICPolarity_Rising, TIM_ICPolarity_Rising);
	
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733926158930-aa37982f-6ed2-47d1-bbe1-d5b9a2689c75.png)

会发现前面配置的和编码器接口函数参数一样，其实属于重复配置，后面配置的会覆盖前面的，因此可以把前面删掉，只用后面这个函数来配置极性。**<font style="color:#DF2A3F;">不过要主要这个Encoder函数必须位于ICInit函数下面</font>**。

最后调用一个 TIM_Cmd 开启定时器

```plain
	//配置编码器接口
	TIM_EncoderInterfaceConfig(TIM3, TIM_EncoderMode_TI12, TIM_ICPolarity_Rising, TIM_ICPolarity_Rising);
	
	TIM_Cmd(TIM3, ENABLE);
```

这样初始化配置就结束了。

调用Encoder_Init函数，编码器旋转就能控制CNT自增自减了

```plain
//再写个get函数 暂时先直接返回CNT的值看看
uint16_t Encoder_Get(void)
{
	return TIM_GetCounter(TIM3);
}
```

将两个函数头文件声明一下，编译看看有没有问题，再编写main函数

```plain
#include "Encoder.h"

Encoder_Init();

OLED_ShowString(1, 1, "CNT:");			//1行1列显示字符串

OLED_ShowNum(1, 5, Encoder_Get(), 5);		//十进制，正数 不断刷新显示CNT的值
```

右转编码器一下从0增加变到4，左转一下则从0变到65532，

如果想让0减变到-1，_就直接把uint16_t类型强制转换成int16_t就行了_，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733927576026-94811c95-3a6a-417b-b328-5d3cfa665944.png)

```plain
int16_t Encoder_Get(void)
{
	return TIM_GetCounter(TIM3);
}
```

另外主循环里改

```plain
OLED_ShowSignedNum(1, 5, Encoder_Get(), 5); //十进制，带符号数
```

这样就能实现0减变-1  ，0加变+1

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733928282667-02111c86-5520-4a0e-8183-316bc0df870c.png)

目前是向右增，向左转减，如果想换下极性，

_<font style="color:#DF2A3F;">一、可以直接把两根线互调一下,</font>_

_<font style="color:#DF2A3F;">二、还可以把第一个rising改为Falling。</font>_

_<font style="color:#DF2A3F;"></font>_

```plain
int16_t Encoder_Get(void)
{
	int16_t Temp;  //读取CNT，然后把CNT清零  先读取后清零，需要Temp缓存一下
	Temp = TIM_GetCounter(TIM3);
	TIM_SetCounter(TIM3, 0);
	return Temp;
}
```

在主循环里，每隔一段时间get一次，

```plain
    OLED_ShowSignedNum(1, 5, Encoder_Get(), 5); //十进制，带符号数
		Delay_ms(1000); //每隔一段时间get一次， 这里人手转所以给了1s,如果电机就给小点
```

到这 旋钮模拟的测速就实现了，可以看到用手快速旋转，值就大。

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733929478947-15e29c94-f833-48d5-97b3-39f874e7a719.png)

如果你主程序没有其他东西的话，可以这样做，但是如果有其它东西的话，最好不要在主循环加入过长的Delay，这样会阻塞主循环的执行，比较好的方法就是用定时中断了，

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Timer.h"
#include "Encoder.h"

int16_t Speed;			//定义在定时器中断里自增的变量

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Timer_Init();		//定时中断初始化
	Encoder_Init();
	
	/*显示静态字符串*/
	OLED_ShowString(1, 1, "Speed:");			//1行1列显示字符串
	
	while (1)
	{
//		OLED_ShowNum(1, 5, Encoder_Get(), 5);	//十进制，正数  不断刷新显示CNT的值
		OLED_ShowSignedNum(1, 7, Speed, 5); //十进制，带符号数
//		Delay_ms(1000); //每隔一段时间get一次， 这里人手转所以给了1s,如果电机就给小点
	}
}

/**
  * 函    数：TIM2中断函数
  * 参    数：无
  * 返 回 值：无
  * 注意事项：此函数为中断函数，无需调用，中断触发后自动执行
  *           函数名为预留的指定名称，可以从启动文件复制
  *           请确保函数名正确，不能有任何差异，否则中断函数将不能进入
  */
void TIM2_IRQHandler(void)
{
	if (TIM_GetITStatus(TIM2, TIM_IT_Update) == SET)		//判断是否是TIM2的更新事件触发的中断
	{
		Speed = Encoder_Get();		//每隔1s读取一下速度，存在Speed变量里
		TIM_ClearITPendingBit(TIM2, TIM_IT_Update);			//清除TIM2更新事件的中断标志位
															//中断标志位必须清除
															//否则中断将连续不断地触发，导致主程序卡死
	}
}
```

然后主循环就可以快速刷新Speed，Delay可以删掉，这样就不会阻塞主循环运行了，



## AD转换
### 单通道AD转换
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733971731464-eaf23dd3-795c-432b-bc00-8c5e964af5ed.png)

_<font style="color:#DF2A3F;">电位器模块 没买 暂时看不了效果</font>_

复制 4-1 OLED显示屏工程，重命名 7-1 AD单通道

老规矩，新建AD模块，一个.c一个.h，

然后在AD.c里建一个初始化函数AD_Init()，初始化步骤参考ADC基本结构，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972399995-a41ea4ad-9407-4a6a-ba33-8b7b156e6abe.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972450831-c78615c7-26f2-485f-a8dd-42bf32d4e514.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972504709-f4d40362-e959-4495-80b9-df1101755c46.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972525799-c5dc2567-ca8e-4913-965a-f935cc3ff9f4.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972547602-d1cb2696-c6be-417b-b2a1-72ac1780c81b.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972565796-a6ed4391-cc90-477a-b2c0-d288986d5546.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972592665-a38a73ce-7813-4856-bc6d-c87ff9448929.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972607493-51a6c683-b0b4-41e4-889e-95bb2a2ee0c5.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972623371-46080499-7c91-4964-968d-f12e2c6c278a.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972648543-e43f5e87-c509-4fb3-b7dc-e4b79f6fe670.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972667902-9496d3b1-0256-460c-ba21-a7860adacba6.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972681593-3df3b058-4e35-475d-8c07-d7de4b50afdb.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972698327-2d4a6e5c-62f5-4e1e-9675-fb8b626e7ad0.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972713341-9befb027-a630-46f8-bc27-af78fcc1f71a.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972726637-485cd910-20b3-41dd-8e95-a8d556a7d65c.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972739076-ae825545-f5fb-4154-96e6-122cb695cbb1.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972765910-971cad02-7bcb-4c2d-9251-8647f4e963ad.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972794125-7824911f-119a-4005-81c0-667a44623c2e.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972810828-8fb4c5e5-7231-4f14-b50b-04c32ed0e935.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972839857-38c21181-ad91-492b-a76e-9cd9bfb9b47c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972852447-aab1fbac-163b-4083-b45e-15d1be46d431.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972864883-ba8de741-1b11-4d04-bb0d-bfe48034d204.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972875715-234df5d9-2dea-410c-9e9a-1856b6ae2699.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733972888923-6e272b5c-5b5d-44f8-bcae-76cef2da5a00.png)



回到工程，首先我们来看一下ADCCLK的配置函数，

这个在rcc里面，打开rcc.h，第680行

```plain
void RCC_ADCCLKConfig(uint32_t RCC_PCLK2);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973149545-ca1d2f2a-4950-4a5b-b9c1-c93cdef74fe6.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973161974-2cf4ec45-59ec-43dc-92a8-2ed51a96474d.png)

然后我们找一下adc的库函数，打开，拖到第428行后，

前面3个

```plain
void ADC_DeInit(ADC_TypeDef* ADCx);
void ADC_Init(ADC_TypeDef* ADCx, ADC_InitTypeDef* ADC_InitStruct);
void ADC_StructInit(ADC_InitTypeDef* ADC_InitStruct);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973298146-708cd9d6-837c-415c-a1f5-a705f54889ce.png)

```plain
void ADC_Cmd(ADC_TypeDef* ADCx, FunctionalState NewState);
void ADC_DMACmd(ADC_TypeDef* ADCx, FunctionalState NewState);
void ADC_ITConfig(ADC_TypeDef* ADCx, uint16_t ADC_IT, FunctionalState NewState);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973343873-7f29405f-a5f3-4ea0-8303-97b0cf3ee344.png)也就是上面开关控制，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973387498-70eed789-665e-4d09-b115-c1e36aae7862.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973401592-34220789-0426-4aba-9169-b57af11e26ae.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973424115-e119ea14-b521-4f07-a38d-b66f79b77dbc.png) 对应图上![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973456984-5a04ac22-0c4e-4b8c-9125-a87b885f8e7c.png)



接下来4个函数

```plain
void ADC_ResetCalibration(ADC_TypeDef* ADCx);
FlagStatus ADC_GetResetCalibrationStatus(ADC_TypeDef* ADCx);
void ADC_StartCalibration(ADC_TypeDef* ADCx);
FlagStatus ADC_GetCalibrationStatus(ADC_TypeDef* ADCx);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973501684-906313b6-7296-4f03-a6a9-5cf1827420d8.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973605731-3860b843-52b8-4502-b9ed-752c2f513198.png)

```plain
void ADC_SoftwareStartConvCmd(ADC_TypeDef* ADCx, FunctionalState NewState);
FlagStatus ADC_GetSoftwareStartConvStatus(ADC_TypeDef* ADCx);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973638541-20ea19fb-35fc-4f62-8252-eb06be7effbe.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973659130-221db45b-30f1-48b4-a134-229a6d466739.png)，也就是图上的2触发控制，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973814300-65ee0180-a964-42d6-b026-e8f7541f4b43.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973743551-d1a8dd9d-acf0-404f-92de-0393b50b0e0e.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973830134-5b19f28a-7a0a-4c1e-8941-cb9df9089303.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973848292-1bb26df9-8eba-4fa2-8ca2-1c03273c9c76.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973874145-f5c044c3-684a-459c-afc2-ae4ced9563c4.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973889818-8ff72f5f-c2df-4dbe-bcab-27a06c10f9ea.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973921672-1dafa199-caeb-47bb-9620-203d5818227d.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973933745-d4d33636-29df-42b7-b245-37408fec3519.png)

```plain
FlagStatus ADC_GetFlagStatus(ADC_TypeDef* ADCx, uint8_t ADC_FLAG);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973982371-4b0ab058-4c87-4c1b-aaeb-7093cf5be92a.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733973996342-460334a3-b80d-4f24-9fb4-68acf0103a46.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974005968-b147a4a6-b52b-4b38-a01f-ccf2c52b2cd9.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974019367-09749d01-7eea-43bf-b6af-21d78d190bdf.png)

所以简单来说，ADC_GetSoftwareStartConvStatus这个函数其实没啥用，一般不用



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974108207-e1959738-f814-4e51-a180-f53bea3100e2.png)

```plain
void ADC_DiscModeChannelCountConfig(ADC_TypeDef* ADCx, uint8_t Number);
void ADC_DiscModeCmd(ADC_TypeDef* ADCx, FunctionalState NewState);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974151809-cd3e4b0e-bf80-4968-aab3-7b67a2c33720.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974162594-fdd1d0f6-c0d5-4e61-b3a0-890b8cc3e58f.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974184633-1fa5f3c1-aa90-4095-9ac5-d0693d5b0208.png)

```plain
void ADC_RegularChannelConfig(ADC_TypeDef* ADCx, uint8_t ADC_Channel, uint8_t Rank, uint8_t ADC_SampleTime);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974222714-2fd31e4f-f632-412b-b869-68cfd3c1cb15.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974250054-4e24a8a8-18e5-45b1-a38f-3ff8b3a2dbce.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974276359-39a2be0c-5820-49e6-8a7f-65cab9caabd5.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974297844-b15f0e13-8f5d-4702-9826-c755d8636b54.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974308893-6cf837ce-f964-4f40-bfcd-c153d63c194b.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974319596-cbacbd68-9a21-465d-b274-c496e4ea202c.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974335474-d61d768c-884a-497a-974b-a67c0dd35f2a.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974357108-f88a8e98-b985-4a85-a12d-51f602dfe154.png)

```plain
void ADC_ExternalTrigConvCmd(ADC_TypeDef* ADCx, FunctionalState NewState);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974397769-9179b84d-5882-4a07-a723-92d44849d3ea.png)

```plain
uint16_t ADC_GetConversionValue(ADC_TypeDef* ADCx);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974427278-d633d857-9e5a-4c83-86b8-b3bc766db4fd.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974445442-971be6d6-f5fc-4eca-ae3a-42085a4af717.png)

```plain
uint32_t ADC_GetDualModeConversionValue(void);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974551292-d09761da-f83f-4459-b63f-b852603b4f2f.png)



```plain
void ADC_AutoInjectedConvCmd(ADC_TypeDef* ADCx, FunctionalState NewState);
void ADC_InjectedDiscModeCmd(ADC_TypeDef* ADCx, FunctionalState NewState);
void ADC_ExternalTrigInjectedConvConfig(ADC_TypeDef* ADCx, uint32_t ADC_ExternalTrigInjecConv);
void ADC_ExternalTrigInjectedConvCmd(ADC_TypeDef* ADCx, FunctionalState NewState);
void ADC_SoftwareStartInjectedConvCmd(ADC_TypeDef* ADCx, FunctionalState NewState);
FlagStatus ADC_GetSoftwareStartInjectedConvCmdStatus(ADC_TypeDef* ADCx);
void ADC_InjectedChannelConfig(ADC_TypeDef* ADCx, uint8_t ADC_Channel, uint8_t Rank, uint8_t ADC_SampleTime);
void ADC_InjectedSequencerLengthConfig(ADC_TypeDef* ADCx, uint8_t Length);
void ADC_SetInjectedOffset(ADC_TypeDef* ADCx, uint8_t ADC_InjectedChannel, uint16_t Offset);
uint16_t ADC_GetInjectedConversionValue(ADC_TypeDef* ADCx, uint8_t ADC_InjectedChannel);
```

```plain
void ADC_AnalogWatchdogCmd(ADC_TypeDef* ADCx, uint32_t ADC_AnalogWatchdog);
void ADC_AnalogWatchdogThresholdsConfig(ADC_TypeDef* ADCx, uint16_t HighThreshold, uint16_t LowThreshold);
void ADC_AnalogWatchdogSingleChannelConfig(ADC_TypeDef* ADCx, uint8_t ADC_Channel);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974666068-84d46794-96d8-4aba-8540-bf1b3de3d1ad.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974675576-1cf8eb90-d0ef-4bc9-813c-ceac7706d20c.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974685367-10a77da2-4b57-4b09-91a0-ef2b367e4567.png)

```plain
void ADC_TempSensorVrefintCmd(FunctionalState NewState);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974698748-1b39628c-09b8-43fe-a05d-f8ad4ce6669e.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974740659-255e57d2-7bff-45ce-b0f5-ea16ea858d13.png)

```plain
FlagStatus ADC_GetFlagStatus(ADC_TypeDef* ADCx, uint8_t ADC_FLAG);
void ADC_ClearFlag(ADC_TypeDef* ADCx, uint8_t ADC_FLAG);
ITStatus ADC_GetITStatus(ADC_TypeDef* ADCx, uint16_t ADC_IT);
void ADC_ClearITPendingBit(ADC_TypeDef* ADCx, uint16_t ADC_IT);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974764010-43c88262-24ff-46d9-b93a-4035eede22e0.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733974790009-b86efa1e-aff0-43a1-90b3-c6ba1456ef3f.png)





回到AD.c文件，开始配置初始化，

```plain
	//第一步，开启时钟     开启ADC1的时钟，ADC都是APB2上的设备，所以这里用APB2开启时钟函数
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1, ENABLE);
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);   //然后还要使用PA0口,开启一下GPIOA的时钟
```

接着不要忘了，还有一个ADCCLK需要配置，到rcc.h里面复制一下RCC_ADCCLKConfig，

看一下参数定义，跳转一下查看，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975416802-11287e3a-596b-4f33-9e4d-3c3adbb76df5.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975454798-0b7dedf9-f916-4ef2-a1c2-fb157c077701.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975468960-3e1eb8d3-fd8c-4ef0-be36-f035df4ea0c4.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975485778-7eabebbd-bc91-49d0-b006-57fa3739072e.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975502610-d0ecaffb-b88a-4316-be79-45d929c4c2c9.png)

```plain
	//第二步，配置ADCCLK
	RCC_ADCCLKConfig(RCC_PCLK2_Div6);   //ADCCLK = 72MHz / 6 = 12MHz
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975531257-2a0918f1-28f9-44fb-9e7b-142509e28e92.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975566509-3389f505-8599-45ce-844f-58c1e1fedae7.png)



接下来，我们进行下一步配置GPIO，可以打开led.c复制一下初始化代码，



首先，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975865786-e221b523-e221-4f29-94b3-8974ef4c4bce.png)，在AIN模式下，GPIO口是无效的，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975934333-78fd69cb-a680-404a-91c0-82ab92c161e0.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733975965283-ea0a7247-6fd5-441a-99ec-80f847005504.png)

```plain
	//第三步，配置GPIO
	/*GPIO初始化*/
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AIN;  //模拟输入模式
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);	
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733976037910-1087f262-5219-4a96-9963-ab369870b1b7.png)



接下来，进想下一步，选择规则组的输入通道，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733985334112-0c7525a7-ddba-4526-8dab-d95831308c13.png)

需要用到ADC_RegularChannelConfig函数，在adc.h第442行复制一下，

参数第一个ADCx给ADC1，第二个参数是指定通道，跳转函数定义查看一下，

```plain
/**
  * @brief  Configures for the selected ADC regular channel its corresponding
  *         rank in the sequencer and its sample time.
  * @param  ADCx: where x can be 1, 2 or 3 to select the ADC peripheral.
  * @param  ADC_Channel: the ADC channel to configure. 
  *   This parameter can be one of the following values:
  *     @arg ADC_Channel_0: ADC Channel0 selected
  *     @arg ADC_Channel_1: ADC Channel1 selected
  *     @arg ADC_Channel_2: ADC Channel2 selected
  *     @arg ADC_Channel_3: ADC Channel3 selected
  *     @arg ADC_Channel_4: ADC Channel4 selected
  *     @arg ADC_Channel_5: ADC Channel5 selected
  *     @arg ADC_Channel_6: ADC Channel6 selected
  *     @arg ADC_Channel_7: ADC Channel7 selected
  *     @arg ADC_Channel_8: ADC Channel8 selected
  *     @arg ADC_Channel_9: ADC Channel9 selected
  *     @arg ADC_Channel_10: ADC Channel10 selected
  *     @arg ADC_Channel_11: ADC Channel11 selected
  *     @arg ADC_Channel_12: ADC Channel12 selected
  *     @arg ADC_Channel_13: ADC Channel13 selected
  *     @arg ADC_Channel_14: ADC Channel14 selected
  *     @arg ADC_Channel_15: ADC Channel15 selected
  *     @arg ADC_Channel_16: ADC Channel16 selected
  *     @arg ADC_Channel_17: ADC Channel17 selected
  * @param  Rank: The rank in the regular group sequencer. This parameter must be between 1 to 16.
  * @param  ADC_SampleTime: The sample time value to be set for the selected channel. 
  *   This parameter can be one of the following values:
  *     @arg ADC_SampleTime_1Cycles5: Sample time equal to 1.5 cycles
  *     @arg ADC_SampleTime_7Cycles5: Sample time equal to 7.5 cycles
  *     @arg ADC_SampleTime_13Cycles5: Sample time equal to 13.5 cycles
  *     @arg ADC_SampleTime_28Cycles5: Sample time equal to 28.5 cycles	
  *     @arg ADC_SampleTime_41Cycles5: Sample time equal to 41.5 cycles	
  *     @arg ADC_SampleTime_55Cycles5: Sample time equal to 55.5 cycles	
  *     @arg ADC_SampleTime_71Cycles5: Sample time equal to 71.5 cycles	
  *     @arg ADC_SampleTime_239Cycles5: Sample time equal to 239.5 cycles	
  * @retval None
  */
void ADC_RegularChannelConfig(ADC_TypeDef* ADCx, uint8_t ADC_Channel, uint8_t Rank, uint8_t ADC_SampleTime)
```

我们选择通道0，

第三个参数，Rank，解释是规则组序列器里的次序，这个参数必须在1~16之间，对应的就是规则组里的16个序列，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733984915588-98e0416b-9945-46e2-95ac-231c1daff58e.png)

所以这里，指定的通道就放在第一个序列1的位置，

还有一个参数，指定通道的采样时间，需要更快的转换就选择小的参数，需要更稳定的转换就选择大的参数，

这里我们没啥要求，就随便选个ADC_SampleTime_55Cycles5，这时的采样时间就是55.5个ADCCLK的周期，

这样输入通道就选择好了。

```plain
	//第四步，选择规则组的输入通道
	ADC_RegularChannelConfig(ADC1, ADC_Channel_0, 1, ADC_SampleTime_55Cycles5);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733985271520-5216e053-f198-4d6d-a4a6-b3bfb8b01783.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733985286268-8c7fd884-81b0-4713-9df8-d5f4dacdcae2.png)，

在图上表示的话，就是在序列1的位置，写入通道0，如果还想再序列2的位置写入其他通道，就复制一下，把1改为2，然后指定你想要的通道，比如通道2、通道8、通道10，等等。

其他序列如法炮制，目前我们只需要一个通道0。

接下来，进行下一步，用结构体初始化ADC.

第一个ADC_Mode，ADC的工作模式![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733986482034-b974d851-9e04-4ce3-8f16-635da3904e33.png)

搜索一下参数取值范围，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733986605986-3e2a7c77-27fb-431c-a825-3b021cbae4ee.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733986661256-cb239890-3082-42b4-be14-56ce50865dbf.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733986683639-bccff5ef-b07d-4158-942a-fe950e2a73bb.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733986706239-ba071078-1046-41e9-a7d9-9df0f9b9bc8c.png)

接着是数据对齐，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733986833963-0e6c1029-b942-4439-920f-c28c174e463a.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733986909606-cde34481-6a7e-4aef-b6c9-a920937cf653.png)

第一个右对齐，第二个左对齐，这里我们选择右对齐，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733986994423-6bbf1c72-70b9-48e7-83c2-abcac6f4dfaa.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733987048290-4bf033e3-5387-4f61-9304-1c89e0ac2ac4.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733987190004-f2d614a1-d796-496f-aec9-959099a85328.png)

接着下面三个，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733987365124-fd10002c-ec8b-420a-9e20-96b7d6880cf0.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733987384956-8e9f33a2-891b-469b-a102-c8c0014825ad.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733987400681-a85b4b73-5ae9-476a-a1d9-1c920c5d1399.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733987546505-78f53479-d288-4662-8582-b8c075b90ebb.png)

```plain
	//第五步，结构体初始化ADC
	ADC_InitTypeDef ADC_InitStructure;  //定义一下结构体类型名
	//把结构体成员都引出来
	ADC_InitStructure.ADC_Mode = ADC_Mode_Independent;  //独立模式
	ADC_InitStructure.ADC_DataAlign = ADC_DataAlign_Right;  //右对齐
	ADC_InitStructure.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None; //不使用外部触发，使用软件触发
	ADC_InitStructure.ADC_ContinuousConvMode = DISABLE;   //单次转换
	ADC_InitStructure.ADC_ScanConvMode = DISABLE;         //非扫描
	ADC_InitStructure.ADC_NbrOfChannel = 1; //通道数目目前只有一个通道
	ADC_Init(ADC1, &ADC_InitStructure);  //最后把结构体地址放初始化函数里
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733987921211-10b17e94-f851-4b18-b721-e4b10ab71b8b.png)

```plain
	//... 中断和模拟看门狗（暂时不用）
	
	//第六步，开启ADC的电源
	ADC_Cmd(ADC1,ENABLE);
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733987999670-b540a002-508c-4530-a8e5-cf0b4203d30b.png)

```plain
	//第七步，校准
	ADC_ResetCalibration(ADC1);  //复位校准
	while (ADC_GetResetCalibrationStatus(ADC1) == SET);   //返回复位校准的状态 如果要等待复位完成需要加个while循环
	ADC_StartCalibration(ADC1);  //启动校准 之后内部电路就会自动进行校准，过程不用我们管了
	while (ADC_GetCalibrationStatus(ADC1) == SET);   //等待校准完成
```

这样整个ADC的初始化就完成了，ADC就处于准备就绪的状态了。



```plain
//获取ADC单通道的值
uint16_t AD_GetValue(void)
{
	ADC_SoftwareStartConvCmd(ADC1,ENABLE);
	while (ADC_GetFlagStatus(ADC1, ADC_FLAG_EOC) == RESET);
	return ADC_GetConversionValue(ADC1);
}

```

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "AD.h"

uint16_t ADValue;

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	AD_Init();
	
	OLED_ShowString(1, 1, "ADValue:");
	
	while (1)
	{
		ADValue = AD_GetValue();
		OLED_ShowNum(1, 9, ADValue, 4);	
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733989591858-5babd495-d117-440f-854f-0c13d81f6ffc.png)

往右拧数值增大。



### 多通道AD转换
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733990400555-52b4fb63-fc12-4af6-9acb-0fae24291db6.png)



复制单通道代码，重命名工程，

将规则组输入通道移到下面，并将通道作为参数可调，

```plain
uint16_t AD_GetValue(uint8_t ADC_Channel)
{
	ADC_RegularChannelConfig(ADC1, ADC_Channel, 1, ADC_SampleTime_55Cycles5);
	
	ADC_SoftwareStartConvCmd(ADC1,ENABLE);
	while (ADC_GetFlagStatus(ADC1, ADC_FLAG_EOC) == RESET);
	return ADC_GetConversionValue(ADC1);
}

```

```plain
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0 | GPIO_Pin_1 |GPIO_Pin_2 | GPIO_Pin_3;
```

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "AD.h"

uint16_t AD0, AD1, AD2, AD3;

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	AD_Init();
	
	OLED_ShowString(1, 1, "AD0:");
	OLED_ShowString(2, 1, "AD1:");
	OLED_ShowString(3, 1, "AD2:");
	OLED_ShowString(4, 1, "AD3:");
	
	while (1)
	{
		AD0 = AD_GetValue(ADC_Channel_0);
		AD1 = AD_GetValue(ADC_Channel_1);
		AD2 = AD_GetValue(ADC_Channel_2);
		AD3 = AD_GetValue(ADC_Channel_3);
		
		OLED_ShowNum(1, 5, AD0, 4);	
		OLED_ShowNum(2, 5, AD1, 4);	
		OLED_ShowNum(3, 5, AD2, 4);	
		OLED_ShowNum(4, 5, AD3, 4);	

		Delay_ms(100);
	}
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733991349646-e338b40d-2f96-42b6-b61a-d04f8f71a42e.png)



## DMA




## USART串口协议
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733991635295-e3d7ff68-5e60-41ba-8df1-c726a824c47c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733993233519-a6b96143-6c73-4fd1-9612-3916f8c86335.png)

### 串口发送
先老规矩，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733994828074-70507f36-c71b-4e74-8eb3-8894347f734f.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733994877034-3468e3b7-49f6-47e8-8161-88643da03872.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733994894265-3c33afba-cc23-45ce-bb45-e5b9c7e5142d.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733994911793-1ad44d56-b8db-4403-a834-00dc551befda.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733994926206-4d3b5f21-ec79-4367-a707-744c2ccb78ff.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733994939247-b663eb75-5ba0-49d2-b909-7575bde54b67.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733994964222-44cf4d67-bd50-4d78-b288-aa01a45dfdf0.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733994975170-7167b893-50a8-43ba-b8e8-7a6f877a2fe1.png)开关控制

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733995001848-8abaa28e-888e-4642-bf48-3af6310cd1ed.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733995014553-37ba4016-3cd9-47ca-8261-f0338999b9df.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733995051464-f24d16ee-1a71-464a-a005-43d82c1dfbb4.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733995062763-504a5830-a517-4d92-850c-85de2f036cf0.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733995073582-d03d3121-fb98-4237-91ad-f59f36fe7b3c.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733995085558-06000778-4623-42a6-ad6d-3714897990b5.png)

打开usart.h库函数，第365行后，

```plain
/** @defgroup USART_Exported_Functions
  * @{
  */

void USART_DeInit(USART_TypeDef* USARTx);
void USART_Init(USART_TypeDef* USARTx, USART_InitTypeDef* USART_InitStruct);
void USART_StructInit(USART_InitTypeDef* USART_InitStruct);
void USART_ClockInit(USART_TypeDef* USARTx, USART_ClockInitTypeDef* USART_ClockInitStruct);
void USART_ClockStructInit(USART_ClockInitTypeDef* USART_ClockInitStruct);
void USART_Cmd(USART_TypeDef* USARTx, FunctionalState NewState);
void USART_ITConfig(USART_TypeDef* USARTx, uint16_t USART_IT, FunctionalState NewState);
void USART_DMACmd(USART_TypeDef* USARTx, uint16_t USART_DMAReq, FunctionalState NewState);
void USART_SetAddress(USART_TypeDef* USARTx, uint8_t USART_Address);
void USART_WakeUpConfig(USART_TypeDef* USARTx, uint16_t USART_WakeUp);
void USART_ReceiverWakeUpCmd(USART_TypeDef* USARTx, FunctionalState NewState);
void USART_LINBreakDetectLengthConfig(USART_TypeDef* USARTx, uint16_t USART_LINBreakDetectLength);
void USART_LINCmd(USART_TypeDef* USARTx, FunctionalState NewState);
void USART_SendData(USART_TypeDef* USARTx, uint16_t Data);
uint16_t USART_ReceiveData(USART_TypeDef* USARTx);
void USART_SendBreak(USART_TypeDef* USARTx);
void USART_SetGuardTime(USART_TypeDef* USARTx, uint8_t USART_GuardTime);
void USART_SetPrescaler(USART_TypeDef* USARTx, uint8_t USART_Prescaler);
void USART_SmartCardCmd(USART_TypeDef* USARTx, FunctionalState NewState);
void USART_SmartCardNACKCmd(USART_TypeDef* USARTx, FunctionalState NewState);
void USART_HalfDuplexCmd(USART_TypeDef* USARTx, FunctionalState NewState);
void USART_OverSampling8Cmd(USART_TypeDef* USARTx, FunctionalState NewState);
void USART_OneBitMethodCmd(USART_TypeDef* USARTx, FunctionalState NewState);
void USART_IrDAConfig(USART_TypeDef* USARTx, uint16_t USART_IrDAMode);
void USART_IrDACmd(USART_TypeDef* USARTx, FunctionalState NewState);
FlagStatus USART_GetFlagStatus(USART_TypeDef* USARTx, uint16_t USART_FLAG);
void USART_ClearFlag(USART_TypeDef* USARTx, uint16_t USART_FLAG);
ITStatus USART_GetITStatus(USART_TypeDef* USARTx, uint16_t USART_IT);
void USART_ClearITPendingBit(USART_TypeDef* USARTx, uint16_t USART_IT);
```



```plain
#include "stm32f10x.h"                  // Device header

void Serial_Init()
{
	//第一步，开启时钟
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1, ENABLE);   //开启USART1的时钟
															//这里USART1是APB2的外设，其他的都是APB1的外设，注意一下
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);   //开启GPIOA的时钟
	
	//第二步，GPIO初始化   从led.c复制一下修改
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;  //复用推挽输出
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_9;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);	//把PA9配置为复用推挽输出，供USART1的TX使用
	
	//第三步，结构体初始化
	USART_InitTypeDef USART_InitStructure;
	USART_InitStructure.USART_BaudRate = 9600;  //9600波特率
	USART_InitStructure.USART_HardwareFlowControl = USART_HardwareFlowControl_None; //无流控
	USART_InitStructure.USART_Mode = USART_Mode_Tx; //只发送模式
	USART_InitStructure.USART_Parity = USART_Parity_No;  //无校验
	USART_InitStructure.USART_StopBits = USART_StopBits_1;  //1位停止位
	USART_InitStructure.USART_WordLength = USART_WordLength_8b; //8位字长
	USART_Init(USART1, &USART_InitStructure);
	
	//第四步，开启电源
	USART_Cmd(USART1, ENABLE);
	
}

//定义一个发送字节的函数
void Serial_SendByte(uint8_t Byte)
{
	USART_SendData(USART1, Byte);
	while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET);
}
```

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Serial.h"

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Serial_Init();

	Serial_SendByte(0x41);
	
	while (1)
	{
		
	}
}

```

编译下载代码，打开电脑上的串口助手，配置对应参数，按复位键会发送，对应串口会接收，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733997661712-d98dc7e3-2085-43c3-889a-ac156ff7440c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733997638059-652fca59-62c5-47da-9b65-8d88b2fb936c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733997874157-a253072c-9ecd-4754-be5b-167a562fbacf.png)

Serial_SendByte('A');  //现象一样



```plain
//定义一个发送字节的函数
void Serial_SendByte(uint8_t Byte)
{
	USART_SendData(USART1, Byte);
	while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET);
}


//定义一个发送数组的函数
void Serial_SendArray(uint8_t *Array, uint16_t Length)
{
	uint16_t i;
	for(i = 0; i < Length; i++)
	{
		Serial_SendByte(Array[i]);  //依次取出数组Array的每一项,然后发送
	}
}


//定义一个发送字符串的函数
void Serial_SendString(char *String)
{
	uint8_t i;
	for(i = 0; String[i] != '\0'; i++)
	{
		Serial_SendByte(String[i]);  //将String字符串一个一个取出来，然后发送
	}
}

//次方函数
uint32_t Serial_Pow(uint32_t X, uint32_t Y)
{
	uint32_t Result = 1;
	while (Y --)
	{
		Result *= X;
	}	
	return Result;
}

//显示字符串形式的数字
/*
在函数里面，我们需要把Number的个位、十位、百位等等以十进制拆分开，
然后转换成字符数字对应的数据，依次发送出去   百位： /100%10   十位： /10%10   个位 %10
    在前面先定义一个次方函数Serial_Pow()
*/
void Serial_SendNumber(uint32_t Number, uint8_t Length)
{
	uint8_t i;
	for (i=0; i<Length; i++)
	{
		Serial_SendByte(Number / Serial_Pow(10, Length - i - 1) % 10 + 0x30);  //字符'0'对应0x30
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734012470604-940b705d-3535-4c19-bfc6-25a4cd405da3.png)



**使用printf函数进行输出**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734012375929-4f463aa1-bb5d-4dc5-9312-c150381f95cc.png)

#include <stdio.h>

然后重写fputc函数，然后在里面把fputc重定向到串口

```plain
//重写fputc函数  把fputc重定向到串口
/*
这个fputc是printf函数的底层，printf函数在打印的时候，就是不断调用fputc函数一个个打印的，
我们把fputc函数重定向到了串口，那printf自然就输出到串口了
*/
int fputc(int ch, FILE *f)
{
	Serial_SendByte(ch);
	return ch;
}
```

printf("Num=%d\r\n", 666);

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734013229071-0c42c54c-f718-4eec-a3f3-f97060efec7d.png)

这种方法，_<font style="color:#DF2A3F;">printf只能有一个，重定向到串口1，串口2再用就没有了</font>_，

_**如果多个串口都想用printf怎么办你？**_

这时可以使用sprintf，sprintf可以把格式化字符输出到一个字符串里，

```plain
	//先定义一个字符串
	char String[100];
	sprintf(String, "Num=%d\r\n", 666); //指定打印位置
	Serial_SendString(String);  //把字符串通过串口发送出去
```

现象和刚才printf一样。

_**每次打印需要三行太麻烦，所以可以封装一下**_，

```plain
//封装sprintf
void Serial_Printf(char *format, ...)    // ...可变参数
{
	char String[100];
	va_list arg;
	va_start(arg, format);
	vsprintf(String, format, arg);
	va_end(arg);
	Serial_SendString(String);
}
```

Serial_Printf("Num=%d\r\n", 666);

现象和刚才printf一样。



**printf汉字输出**![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734014547324-1ef6290b-b4ba-45d4-a0f7-3c905de80ee6.png)Serial_Printf("你好，世界！");

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734014672948-9dcda2d3-d968-4357-8341-8c4428b4aa29.png)

注意编码格式匹配。

### 串口接收
```plain
void Serial_Init(void)
{
	//第一步，开启时钟
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1, ENABLE);   //开启USART1的时钟
															//这里USART1是APB2的外设，其他的都是APB1的外设，注意一下
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);   //开启GPIOA的时钟
	
	//第二步，GPIO初始化   从led.c复制一下修改
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;  //复用推挽输出
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_9;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);	//把PA9配置为复用推挽输出，供USART1的TX使用
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;  //上拉输入模式
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_10;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);	//把PA10配置为上拉输入，供USART1的RX使用
	
	//第三步，结构体初始化
	USART_InitTypeDef USART_InitStructure;
	USART_InitStructure.USART_BaudRate = 9600;  //9600波特率
	USART_InitStructure.USART_HardwareFlowControl = USART_HardwareFlowControl_None; //无流控
	USART_InitStructure.USART_Mode = USART_Mode_Tx | USART_Mode_Rx; // 同时开启发送模式和接收模式
	USART_InitStructure.USART_Parity = USART_Parity_No;  //无校验
	USART_InitStructure.USART_StopBits = USART_StopBits_1;  //1位停止位
	USART_InitStructure.USART_WordLength = USART_WordLength_8b; //8位字长
	USART_Init(USART1, &USART_InitStructure);
	
	//第四步，开启电源
	USART_Cmd(USART1, ENABLE);
	
}
```

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Serial.h"

uint8_t RxData;

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Serial_Init();

//	Serial_Printf("你好，世界！");
	
	while (1)
	{
		if (USART_GetFlagStatus(USART1, USART_FLAG_RXNE) == SET)
		{
			RxData = USART_ReceiveData(USART1);
			OLED_ShowHexNum(1, 1, RxData, 2);
		}
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734053152030-a88f8fe3-4355-4a7b-a470-8a353d754f0f.png)

Hex模式下，发送41,屏幕上显示41.

--------------------------------------------------------------------------------------------------

中断函数的名字查看启动文件，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734055800527-e6e37799-5ed6-4db4-ac70-e498fa3e54a9.png)

```plain
/**中断接收和变量的封装**/

uint8_t Serial_GetRxFlag(void) //实现读后自动清除功能
{
	if(Serial_RxFlag == 1)
	{
		Serial_RxFlag = 0;
		return 1;
	}
	return 0;
}

uint8_t Serial_GetRxData(void)
{
	return Serial_RxData;
}

void USART1_IRQHandler(void)
{
	if (USART_GetITStatus(USART1, USART_IT_RXNE) ==SET)
	{
		Serial_RxData = USART_ReceiveData(USART1);   //在中断里把数据进行了一次转存
		Serial_RxFlag = 1;
		USART_ClearITPendingBit(USART1, USART_IT_RXNE);
	}
}

```

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Serial.h"

uint8_t RxData;

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Serial_Init();

//	Serial_Printf("你好，世界！");
	
	OLED_ShowString(1, 1, "RxData:");
	
	while (1)
	{
//		if (USART_GetFlagStatus(USART1, USART_FLAG_RXNE) == SET)
//		{
//			RxData = USART_ReceiveData(USART1);
//			OLED_ShowHexNum(1, 1, RxData, 2);
//		}
		
		if (Serial_GetRxFlag() == 1)
		{
			RxData = Serial_GetRxData();
			Serial_SendByte(RxData);
			OLED_ShowHexNum(1, 8, RxData, 2);
		}
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734058084279-2637eead-0098-4b02-8c12-54bf3fc2307d.png)



_**目前只支持一个字节的接收，现在很多模块都需要回传大量数据，这时就需要用数据包的形式进行传输，接收部分也需要按照数据包的格式来接收，这样才能接收多字节数据包。**_

## 串口收发数据包
### HEX数据包
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734059394966-594688e8-600e-4966-98f7-3071ffab81c8.png)

为了定义数据包，我们先定义两个缓存区的数组，

```plain
uint8_t Serial_TxPacket[4];  //为了定义数据包，我们先定义两个缓存区的数组，
uint8_t Serial_RxPacket[4];
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734059575773-495d8fd7-6d5f-4eda-9485-aa0700d07f62.png)

接下来写个函数，实现调用一下这个函数，TxPacket数组的4个数据，就会自动加上包头包尾发送出去，

```plain
//实现调用一下这个函数，TxPacket数组的4个数据，就会自动加上包头包尾发送出去
void Serial_SendPacket(void)
{
	Serial_SendByte(0xFF);   //发送包头
	Serial_SendArray(Serial_TxPacket, 4);  //依次把4个载荷数据发送出去
	Serial_SendByte(0xFE);   //发送包尾
}
```

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Serial.h"

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Serial_Init();

	//先填充发送缓存区数组
	Serial_TxPacket[0] = 0x01;
	Serial_TxPacket[1] = 0x02;
	Serial_TxPacket[2] = 0x03;
	Serial_TxPacket[3] = 0x04;
	
	//取出数组的内容 加上包头包尾统一发送出去
	Serial_SendPacket();
	
	while (1)
	{

	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734060663730-09b2e32c-eb8f-4521-a6d4-a74cd738d341.png)

按下复位，打开串口，继续按复位键，HEX模式下接收，现象如图。

**接下来，来写一下接收区数据包的代码，**

接收数据包的缓存区和标志位已经定义好了，

```plain
uint8_t Serial_RxPacket[4];
uint8_t Serial_RxFlag;
```

然后再接收中断函数里，我们就需要用状态机来执行接收逻辑了，接收数据包，然后把载荷数据存在RxPacket数组里，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734061151684-785c5c92-6a85-4280-b7f6-361601f80f9b.png)

定义一个静态变量RxState来模拟不同接收状态根据RxState的不同，需要进入不同的处理程序，

extern uint8_t Serial_RxPacket[];

```plain
void USART1_IRQHandler(void)
{
	static uint8_t RxState = 0; //定义一个静态变量来模拟不同接收状态
	static uint8_t pRxPacket = 0;  //指示接收到哪一个了
	if (USART_GetITStatus(USART1, USART_IT_RXNE) ==SET)
	{
		uint8_t RxData = USART_ReceiveData(USART1);  //获取RxData
		
		if (RxState == 0)  //等待包头
		{
			if (RxData == 0xFF)  //如果收到包头就转移到下一个状态
			{
				RxState = 1;
				pRxPacket = 0;  //提前为下一个状态接收清0，方便下一次接收
			}
		}
		else if (RxState == 1)  //接收数据
		{
			Serial_RxPacket[pRxPacket] = RxData;  //将接收到的数据转存到接收缓存数组
			pRxPacket ++;  //每进一次状态，数据就转存缓存数组，同时存的位置++
			if (pRxPacket >= 4)
			{
				RxState = 2;   //数据接收完了就转移到下一个状态
			}
		}
		else if (RxState == 2)  //等待包尾
		{
			if (RxData == 0xFE)
			{	//如果收到包尾，就把状态置0回到初始状态，同时代表数据包接收到了，可以置一个标志位
				RxState = 0;
				Serial_RxFlag = 1;
			}
		}
		
		
		USART_ClearITPendingBit(USART1, USART_IT_RXNE);
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734063146231-9b91da7e-a21c-4188-8794-eaf5c0317ce2.png)

屏幕上显示 11  22  33  44

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734063201386-737b3b90-8107-4741-89c7-8fcce6b11fc3.png)屏幕上显示 FE FF 99 FE



**有个问题？     Serial_RxPacket数组**

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734063275707-df0286c2-7388-4721-a10e-3489c610471b.png)

在中断函数里，我们会一次写入它，在主函数里，我们又会一次读出它，这肯造成数据包之间混在一起，

比如读出的过程太慢了，前面两个数据刚读出来，等了一会才继续读取，那这时后面的数据可能会刷新为下一个数据包的数据，也就是你读出的数据可能一部分属于上一个数据包，另一部分属于下一个数据包。

**解决方法**：在接收部分加入判断。![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734063655950-744a2d3a-9637-4ef8-a32b-90151c6a210b.png)



像这种HEX数据包，多是用于传输各种传感器的每个独立数据，比如陀螺仪的X，Y，Z轴数据，温湿度数据等。它们相邻数据包之间的数据，具有连续性，这样即使相邻数据包混在一起了，也没关系。

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Serial.h"
#include "Key.h"

uint8_t KeyNum;

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Serial_Init();
	Key_Init();
	
	OLED_ShowString(1, 1, "TxPacket");
	OLED_ShowString(3, 1, "TxPacket");

	//先填充发送缓存区数组
	Serial_TxPacket[0] = 0x01;
	Serial_TxPacket[1] = 0x02;
	Serial_TxPacket[2] = 0x03;
	Serial_TxPacket[3] = 0x04;	
	
	while (1)
	{
		KeyNum = Key_GetNum();
		if (KeyNum == 1)    //按一下按键PB1，变换一下数据，发送到串口助手上
		{
			Serial_TxPacket[0] ++;
			Serial_TxPacket[1] ++;
			Serial_TxPacket[2] ++;
			Serial_TxPacket[3] ++;	 //变换一下测试数据
			
			Serial_SendPacket();  //取出数组的内容 加上包头包尾统一发送出去
			
			OLED_ShowHexNum(2, 1, Serial_TxPacket[0], 2);
			OLED_ShowHexNum(2, 4, Serial_TxPacket[1], 2);
			OLED_ShowHexNum(2, 7, Serial_TxPacket[2], 2);
			OLED_ShowHexNum(2, 10, Serial_TxPacket[3], 2);  //OLED显示 显示内容为TxPacket
		}
		
		if(Serial_GetRxFlag() == 1)  //如果数据传输完成
		{
			OLED_ShowHexNum(4, 1, Serial_RxPacket[0], 2);
			OLED_ShowHexNum(4, 4, Serial_RxPacket[1], 2);
			OLED_ShowHexNum(4, 7, Serial_RxPacket[2], 2);
			OLED_ShowHexNum(4, 10, Serial_RxPacket[3], 2);
		}
	}
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734067276366-5d2d1afa-71b6-4b02-9091-42f59837d5f5.png)



### 文本数据包
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734059420576-a286ee9a-271c-4e8f-8514-4920a990e9fa.png)



```plain
char Serial_TxPacket[100];  //为了定义数据包，我们先定义两个缓存区的数组，
char Serial_RxPacket[100];
uint8_t Serial_RxFlag;

void USART1_IRQHandler(void)
{
	static uint8_t RxState = 0; //定义一个静态变量来模拟不同接收状态
	static uint8_t pRxPacket = 0;  //指示接收到哪一个了
	if (USART_GetITStatus(USART1, USART_IT_RXNE) ==SET)
	{
		uint8_t RxData = USART_ReceiveData(USART1);  //获取RxData
		
		if (RxState == 0)  //等待包头
		{
			if (RxData == '@')  //如果收到包头就转移到下一个状态
			{
				RxState = 1;
				pRxPacket = 0;  //提前为下一个状态接收清0，方便下一次接收
			}
		}
		else if (RxState == 1)  //接收数据
		{
			if (RxData == '\r')
			{
				RxState = 2;
			}
			else
			{
				Serial_RxPacket[pRxPacket] = RxData;  //将接收到的数据转存到接收缓存数组
				pRxPacket ++;  //每进一次状态，数据就转存缓存数组，同时存的位置++
			}
		}
		else if (RxState == 2)  //等待包尾
		{
			if (RxData == '\n')
			{	
				RxState = 0;
				Serial_RxPacket[pRxPacket] = '\0'; //在下一位加上字符串结束符，不然不知道字符串结束
				Serial_RxFlag = 1;
			}
		}
		
		
		USART_ClearITPendingBit(USART1, USART_IT_RXNE);
	}
}
```

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Serial.h"


int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Serial_Init();
	
	OLED_ShowString(1, 1, "TxPacket");
	OLED_ShowString(3, 1, "RxPacket");
	
	while (1)
	{
		if (Serial_GetRxFlag() == 1)
		{
			OLED_ShowString(4, 1, "                "); //16个空格
			OLED_ShowString(4, 1, Serial_RxPacket);
		}
	}
}

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734068842814-62e4e776-2be7-445d-ae28-a071c8123ae6.png)

注意末尾换行。

下面完善一下代码，把led加进来，

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Serial.h"
#include "led.h"
#include <string.h>  //这个库里面有很多字符串处理函数

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Serial_Init();
	LED_Init();
	
	OLED_ShowString(1, 1, "TxPacket");
	OLED_ShowString(3, 1, "RxPacket");
	
	while (1)
	{
		if (Serial_GetRxFlag() == 1)
		{
			OLED_ShowString(4, 1, "                "); //16个空格
			OLED_ShowString(4, 1, Serial_RxPacket);
			
			//判断两个字符串是否相等
			if (strcmp(Serial_RxPacket, "LED_ON") == 0)
			{
				LED1_ON();
				Serial_SendString("LED_ON_OK\r\n");
				OLED_ShowString(2, 1, "                "); //16个空格
				OLED_ShowString(2, 1, "LED_ON_OK");
			}
			else if (strcmp(Serial_RxPacket, "LED_OFF") == 0)
			{
				LED1_OFF();
				Serial_SendString("LED_OFF_OK\r\n");
				OLED_ShowString(2, 1, "                "); //16个空格
				OLED_ShowString(2, 1, "LED_OFF_OK");
			}
			else
			{
				Serial_SendString("ERROR_COMMAND\r\n");
				OLED_ShowString(2, 1, "                "); //16个空格
				OLED_ShowString(2, 1, "ERROR_COMMAND");
			}
		}
	}
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734070987244-0b80f73e-a312-4430-b4d4-401ce4ee314a.png)

------------------------------------------------------------------------------------------------------------------

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734069797591-8344560b-3f0a-40a9-8b3d-e3a680155cf7.png)

在这里，文本数据包，每个数据包都是独立的，不存在连续，如果错位了，那问题比较大，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734071281481-11cbfa3e-70ff-49a3-99b6-855fc7687266.png)

```plain
extern uint8_t Serial_RxFlag;

//uint8_t Serial_GetRxFlag(void) //实现读后自动清除功能
//{
//	if(Serial_RxFlag == 1)
//	{
//		Serial_RxFlag = 0;
//		return 1;
//	}
//	return 0;
//}

void USART1_IRQHandler(void)
{
	static uint8_t RxState = 0; //定义一个静态变量来模拟不同接收状态
	static uint8_t pRxPacket = 0;  //指示接收到哪一个了
	if (USART_GetITStatus(USART1, USART_IT_RXNE) ==SET)
	{
		uint8_t RxData = USART_ReceiveData(USART1);  //获取RxData
		
		if (RxState == 0)  //等待包头
		{
			if (RxData == '@' && Serial_RxFlag == 0)  //如果收到包头就转移到下一个状态
			{		// 才执行接收，否则就是你发太快了，我还没执行完了
				RxState = 1;
				pRxPacket = 0;  //提前为下一个状态接收清0，方便下一次接收
			}
		}
		else if (RxState == 1)  //接收数据
		{
			if (RxData == '\r')
			{
				RxState = 2;
			}
			else
			{
				Serial_RxPacket[pRxPacket] = RxData;  //将接收到的数据转存到接收缓存数组
				pRxPacket ++;  //每进一次状态，数据就转存缓存数组，同时存的位置++
			}
		}
		else if (RxState == 2)  //等待包尾
		{
			if (RxData == '\n')
			{	
				RxState = 0;
				Serial_RxPacket[pRxPacket] = '\0'; //在下一位加上字符串结束符，不然不知道字符串结束
				Serial_RxFlag = 1;
			}
		}
		
		USART_ClearITPendingBit(USART1, USART_IT_RXNE);
	}
}
```

```plain
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "Serial.h"
#include "led.h"
#include <string.h>  //这个库里面有很多字符串处理函数

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	Serial_Init();
	LED_Init();
	
	OLED_ShowString(1, 1, "TxPacket");
	OLED_ShowString(3, 1, "RxPacket");
	
	while (1)
	{
		if (Serial_RxFlag == 1)
		{
			OLED_ShowString(4, 1, "                "); //16个空格
			OLED_ShowString(4, 1, Serial_RxPacket);
			
			//判断两个字符串是否相等
			if (strcmp(Serial_RxPacket, "LED_ON") == 0)
			{
				LED1_ON();
				Serial_SendString("LED_ON_OK\r\n");
				OLED_ShowString(2, 1, "                "); //16个空格
				OLED_ShowString(2, 1, "LED_ON_OK");
			}
			else if (strcmp(Serial_RxPacket, "LED_OFF") == 0)
			{
				LED1_OFF();
				Serial_SendString("LED_OFF_OK\r\n");
				OLED_ShowString(2, 1, "                "); //16个空格
				OLED_ShowString(2, 1, "LED_OFF_OK");
			}
			else
			{
				Serial_SendString("ERROR_COMMAND\r\n");
				OLED_ShowString(2, 1, "                "); //16个空格
				OLED_ShowString(2, 1, "ERROR_COMMAND");
			}
			
			Serial_RxFlag = 0;
		}
	}
}
```

在中断这里，只有Serial_RxFlag为0了，才会继续接受下一个数据包，这样写数据和读数据就会严格分开了的，不会同时进行，就可以避免数据包错位的现象了，不过这样的话，发送数据包的频率不能太快了，否则会丢弃部分包。![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734072533628-46d2f600-fd71-49f4-b698-e46811262ce9.png)

和前面效果是一样的。



## I2C通信
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734415336734-f0d04838-646b-41ac-9602-40b991a8ee38.png)

我们基本的任务是，通过通信线，实现单片机读写外挂模块寄存器的功能，其中至少要实现，在指定位置写寄存器和在指定的位置读寄存器，这两个功能。



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734426164522-0c053fdb-1b1f-49b8-a67a-bfd607c4cb20.png)

**开漏输出**，去掉强上拉的开关管，

输出低电平时，下管导通，是强下拉；输出高电平时，下管断开，但是没有上管了，此时引脚处于浮空状态。

为了避免高电平造成的引脚浮空，这时就需要在总线的外面，SCL和SDA各外置一个上拉电阻，这时通过一个电阻拉到高电平的，所以这是一个弱上拉。

用弹簧和杆子的模型来解释就是，SCL和SDA就是一根杆子，为了防止有人向上推杆子，有人向下拉杆子，造成冲突，我们就规定，所有人不准向上推杆子，只能选择向下拉或者放手，然后我们再外置一根弹簧向上拉，你要输出低电平就往下拽，所以弹簧被拉伸，杆子处于低电平状态，你要输出高电平就放手，杆子在弹簧的拉力下回弹到高电平，这就是一个弱上拉的高电平，但是完全不影响数据传输.

**这样做有什么好处呢?**

第一，完全杜绝了电源短路现象，保证电路的安全，所有人无论怎么拉杆子或者放手，杆子都不会处于一个被同时强拉和强推的状态，即使有多个人同时向下拉杆子也不会有问题，

第二，避免了引脚模式的频繁切换，开漏加弱上拉的模式，同时兼具了输入和输出的功能，你要想输出就去拉杆子或者放手，操作杆子变化就行了，你要想输入就直接放手，观察杆子高低就行了，因为开漏模式下，输出高电平就相当于断开引脚，所以在输入之前可以直接输出高电平，不需要再切换成输入模式了，

第三，就是这个模式会有一个“线与”的现象，就是只要有任意一个或多个设备输出了低电平，总线就处于低电平，只有所有的设备都输出高电平，总线才处于高电平，

I2C可以利用这个电路特性，执行多主机模式下的时钟同步和总线仲裁，![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734432267548-865e7b0a-c621-46ed-a74b-600f487c1c88.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734432294610-a8198a80-6396-4bad-af50-118747589106.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734432313140-2eec061f-3c1c-46cf-bbe7-11599f7a7888.png)

**以上就是I2C的硬件电路设计**。



**接下来我们就学习软件I2C，也就是时序的设计了**，

首先来学习一下I2C规定的一些时序基本单元，

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1734432463641-11296e10-fed3-4e2f-86d2-43fdcad6cdec.png)

看左下角图，在I2C总线处于空闲状态时，SCL和SDA都处于高电平状态，也就是没有任何一个设备去碰SCL和SDA，SCL和SDA由外挂的上拉电阻拉高至高电平，总线处于平静的高电平状态，当主机需要进行数据收发时，首先就要打破总线的宁静，产生一个起始条件，这个起始条件就是SCL处于高电平不去动他，然后把SDA拽下来，产生一个下降沿，当从机捕获到SCL高电平，SDA下降沿信号时，就会进行自身的复位















# HAL库编程
【【STM32入门教程】应该是全B站最好的STM32教程了-哔哩哔哩】 [https://b23.tv/5FdD13R](https://b23.tv/5FdD13R)

【STM32系列视频(CubeMX+MDK5+HAL库+库函数一站式学习)-哔哩哔哩】 [https://b23.tv/XFmFvOo](https://b23.tv/XFmFvOo)

【P1.点亮LED【HAL库复现江协全部STM32例子合集】-哔哩哔哩】 [https://b23.tv/FTq7ydP](https://b23.tv/FTq7ydP)



## LED点灯


## OLED显示屏
[【强烈推荐】基于stm32的OLED各种显示实现（含动态图）_stm32oled以十六进制显示-CSDN博客](https://blog.csdn.net/black_sneak/article/details/125418537)

### 介绍
_**<font style="color:rgb(79, 79, 79);">OLED简介</font>**_

<font style="color:rgb(77, 77, 77);">OLED，即</font>**<font style="color:rgb(254, 44, 36);">有机发光二极管</font>**<font style="color:rgb(77, 77, 77);">（Organic Light-Emitting Diode），又称为有机电激光显示（</font>**<font style="color:rgb(77, 77, 77);">Organic Electroluminesence Display</font>**<font style="color:rgb(77, 77, 77);">， OELD）。OLED 由于同时</font>**<font style="color:rgb(13, 0, 22);">具备自发光</font>**<font style="color:rgb(13, 0, 22);">，</font>**<font style="color:rgb(13, 0, 22);">不需背光源</font>**<font style="color:rgb(13, 0, 22);">、</font>**<font style="color:rgb(13, 0, 22);">对比度高</font>**<font style="color:rgb(13, 0, 22);">、</font>**<font style="color:rgb(13, 0, 22);">厚度薄</font>**<font style="color:rgb(13, 0, 22);">、</font>**<font style="color:rgb(13, 0, 22);">视角广</font>**<font style="color:rgb(13, 0, 22);">、</font>**<font style="color:rgb(13, 0, 22);">反应速度快</font>**<font style="color:rgb(13, 0, 22);">、</font>**<font style="color:rgb(13, 0, 22);">可用于挠曲性面板</font>**<font style="color:rgb(13, 0, 22);">、</font>**<font style="color:rgb(13, 0, 22);">使用温度范围广</font>**<font style="color:rgb(13, 0, 22);">、</font>**<font style="color:rgb(13, 0, 22);">构造及制程较简单</font>**<font style="color:rgb(77, 77, 77);">等优异之特性，被认为是下一代的平面显示器新兴应用技术。</font>

<font style="color:rgb(77, 77, 77);"></font>**<font style="color:rgb(254, 44, 36);">LCD</font>****<font style="color:rgb(254, 44, 36);"> </font>**<font style="color:rgb(77, 77, 77);">都</font>**<font style="color:rgb(254, 44, 36);">需要背光</font>**<font style="color:rgb(77, 77, 77);">，而</font><font style="color:rgb(77, 77, 77);"> </font>**<font style="color:rgb(254, 44, 36);">OLED 不需要</font>**<font style="color:rgb(77, 77, 77);">，因为它是自发光的。这样同样的显示，OLED 效果要来得好一些。以目前的技术，</font>**<font style="color:rgb(77, 77, 77);">OLED 的尺寸还难以大型化</font>**<font style="color:rgb(77, 77, 77);">，但是分辨率确可以做到很高。市场上常见</font>**<font style="color:rgb(77, 77, 77);">OLED模块</font>**<font style="color:rgb(77, 77, 77);">有以下</font>**<font style="color:rgb(77, 77, 77);">特点</font>**<font style="color:rgb(77, 77, 77);">：</font>

<font style="color:rgb(77, 77, 77);">(1)模块有</font>**<font style="color:rgb(77, 77, 77);">单色和双色两种</font>**<font style="color:rgb(77, 77, 77);">可选，单色为</font>**<font style="color:rgb(77, 77, 77);">纯蓝色</font>**<font style="color:rgb(77, 77, 77);">，而双色则为</font>**<font style="color:rgb(77, 77, 77);">黄蓝双色</font>**<font style="color:rgb(77, 77, 77);">。  
</font><font style="color:rgb(77, 77, 77);">(2)尺寸小，显示尺寸为 0.96 寸，而模块的尺寸仅为 27mm*26mm 大小。  
</font><font style="color:rgb(77, 77, 77);">(3)高分辨率，该模块的</font>**<font style="color:rgb(254, 44, 36);">分辨率为 128*64</font>**<font style="color:rgb(77, 77, 77);">。   
</font><font style="color:rgb(77, 77, 77);">(4)多种接口方式，该模块提供了总共 5 种接口包括：6800、8080 两种并行接口方式、</font>**<font style="color:rgb(254, 44, 36);">3线或 4 线的穿行 SPI 接口方式</font>**<font style="color:rgb(77, 77, 77);">，、</font>**<font style="color:rgb(254, 44, 36);">IIC 接口方式</font>**<font style="color:rgb(77, 77, 77);">（只需要 2 根线就可以控制 OLED 了！）。  
</font><font style="color:rgb(77, 77, 77);">(5)</font>**<font style="color:rgb(77, 77, 77);">不需要高压</font>**<font style="color:rgb(77, 77, 77);">，直接接</font>**<font style="color:rgb(254, 44, 36);"> </font>****<font style="color:rgb(254, 44, 36);">3.3V</font>****<font style="color:rgb(254, 44, 36);"> </font>**<font style="color:rgb(77, 77, 77);">就可以工作了。</font>

<font style="color:rgb(77, 77, 77);"></font>**<font style="color:rgb(77, 77, 77);">特别注意</font>**<font style="color:rgb(77, 77, 77);">，市面上有部分的OLED屏幕不可以直接接5.0v电压，否则</font>**<font style="color:rgb(254, 44, 36);">可能烧坏！</font>**

**<font style="color:rgb(77, 77, 77);">总结：</font>**<font style="color:rgb(77, 77, 77);">目前市面上</font>**<font style="color:rgb(77, 77, 77);">常用</font>**<font style="color:rgb(77, 77, 77);">的</font>**<font style="color:rgb(77, 77, 77);">0.96寸OLED</font>**<font style="color:rgb(77, 77, 77);">屏幕通讯方式主要有</font>**<font style="color:rgb(254, 44, 36);">SPI</font>**<font style="color:rgb(77, 77, 77);">和</font>**<font style="color:rgb(254, 44, 36);">I2C</font>**<font style="color:rgb(13, 0, 22);">两种！SPI为</font>**<font style="color:rgb(13, 0, 22);">4线制</font>**<font style="color:rgb(13, 0, 22);">较多，而I2C为</font>**<font style="color:rgb(13, 0, 22);">2线制</font>**<font style="color:rgb(13, 0, 22);">。2种通讯协议</font>**<font style="color:rgb(13, 0, 22);">较为浅显的区别</font>**<font style="color:rgb(13, 0, 22);">：总所周知，</font>**<font style="color:rgb(13, 0, 22);">SPI的通讯速度</font>**<font style="color:rgb(13, 0, 22);">明显</font>**<font style="color:rgb(254, 44, 36);">快于</font>**<font style="color:rgb(13, 0, 22);">I2C的通讯速度，所以通常使用SPI通讯协议的OLED屏幕可以实现</font>**<font style="color:rgb(13, 0, 22);">更高的帧数显示</font>**<font style="color:rgb(13, 0, 22);">，画面更为</font>**<font style="color:rgb(13, 0, 22);">流畅丝滑</font>**<font style="color:rgb(13, 0, 22);">。</font>

<font style="color:rgb(13, 0, 22);">当然，OLED屏幕显示的帧数高低不仅取决于通讯协议的不同，</font>**<font style="color:rgb(254, 44, 36);">DMA （直接存储器访问）</font>**<font style="color:rgb(13, 0, 22);">的使用也可以</font>**<font style="color:rgb(13, 0, 22);">大幅提升OLED显示帧数</font>**<font style="color:rgb(13, 0, 22);">。</font>

<font style="color:rgb(13, 0, 22);"></font>

_**<font style="color:rgb(13, 0, 22);">I2C通讯</font>**_

<font style="color:rgb(13, 0, 22);">本次实验所采用的0.96寸OLED屏幕为I2C通讯方式，故在此稍微给读者介绍一下I2C通讯原理。</font>

<font style="color:rgb(13, 0, 22);"></font>**<font style="color:rgb(13, 0, 22);">IIC(Inter－Integrated Circuit)</font>**<font style="color:rgb(13, 0, 22);">总线是一种由</font><font style="color:rgb(13, 0, 22);"> </font>**<font style="color:rgb(13, 0, 22);">PHILIPS 公司</font>**<font style="color:rgb(13, 0, 22);">开发的两线式串行总线，用于连接微控制器及其外围设备。它是由</font>**<font style="color:rgb(13, 0, 22);">数据线 SDA</font>****<font style="color:rgb(13, 0, 22);"> </font>**<font style="color:rgb(13, 0, 22);">和</font>**<font style="color:rgb(13, 0, 22);">时钟 SCL</font>****<font style="color:rgb(13, 0, 22);"> </font>**<font style="color:rgb(13, 0, 22);">构成的串行总线，可发送和接收数据。在 CPU 与被控 IC 之间、IC 与 IC 之间进行双向传送，</font>**<font style="color:rgb(13, 0, 22);">高速 IIC 总线一般可达 400kbps 以上</font>**<font style="color:rgb(13, 0, 22);">。  
</font><font style="color:rgb(13, 0, 22);">I2C 总线在传送数据过程中共有</font>**<font style="color:rgb(254, 44, 36);">三种类型信号</font>**<font style="color:rgb(13, 0, 22);">， 它们分别是：</font>**<font style="color:rgb(13, 0, 22);">开始信号</font>**<font style="color:rgb(13, 0, 22);">、</font>**<font style="color:rgb(13, 0, 22);">结束信号</font>**<font style="color:rgb(13, 0, 22);">和</font>**<font style="color:rgb(13, 0, 22);">应答信号</font>**<font style="color:rgb(13, 0, 22);">。  
</font>**<font style="color:rgb(13, 0, 22);">开始信号</font>**<font style="color:rgb(13, 0, 22);">：SCL 为高电平时，SDA 由高电平向低电平跳变，开始传送数据。  
</font>**<font style="color:rgb(13, 0, 22);">结束信号</font>**<font style="color:rgb(13, 0, 22);">：SCL 为高电平时，SDA 由低电平向高电平跳变，结束传送数据。  
</font>**<font style="color:rgb(13, 0, 22);">应答信号</font>**<font style="color:rgb(13, 0, 22);">：接收数据的 IC 在接收到 8bit 数据后，向发送数据的 IC 发出特定的低电平脉冲，  
</font><font style="color:rgb(13, 0, 22);">表示已收到数据。CPU 向受控单元发出一个信号后，等待受控单元发出一个应答信号，CPU 接收到应答信号后，根据实际情况作出是否继续传递信号的判断。</font>**<font style="color:rgb(13, 0, 22);">若未收到应答信号，由判断为受控单元出现故障</font>**<font style="color:rgb(13, 0, 22);">。</font>

<font style="color:rgb(13, 0, 22);">这些信号中，</font>**<font style="color:rgb(254, 44, 36);">起始信号是必需的</font>**<font style="color:rgb(13, 0, 22);">，结束信号和应答信号，都可以不要。</font>

<font style="color:rgb(13, 0, 22);">目前大部分 MCU 都带有 IIC 总线接口，STM32 也不例外。但是这里我们不使用 </font>**<font style="color:rgb(13, 0, 22);">STM32的硬件 IIC </font>**<font style="color:rgb(13, 0, 22);">，而是通过</font>**<font style="color:rgb(254, 44, 36);">软件模拟</font>**<font style="color:rgb(13, 0, 22);">。STM32 的硬件 IIC 非常复杂，</font>**<font style="color:rgb(255, 153, 0);">更重要的是不稳定</font>**<font style="color:rgb(13, 0, 22);">，故不推荐使用。所以我们这里就通过模拟来实现了。</font>

### 实现
![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733066294509-7bc2f492-fad8-4ee8-86c8-317418166302.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733066327215-cd2a845c-d4eb-4c34-bbf6-1de6cce4739b.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733066373307-8d9d9c3c-76b1-4b8c-9cb1-98e3736f5824.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733066410434-609fe928-61f1-4f14-ab13-5af7d7ca61da.png)



![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733066478204-d4976346-c0f7-4b79-b906-7bf7a0e4d901.png)

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733066544073-4b67c226-47d8-4f0a-978f-a7f693c23a11.png)

生成代码之后打开工程：  注意有6个文件

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733066622815-3ce07f51-dbf5-4b96-ba5a-f017697728be.png)![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1733066942787-b05bd9ad-0116-4a1d-aa48-c1968ac782fb.png)

... ...

