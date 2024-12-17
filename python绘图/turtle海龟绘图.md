# 一、基础绘图
## 00 turtle库的用法
```python
# 通过import turtle语句引入turtle库，就可以使用它提供的一些函数和方法了。

# turtle库中最基本的函数包括：
#
# turtle.forward(distance)：向当前方向移动distance个像素的距离
# turtle.backward(distance)：向相反方向移动distance个像素的距离
# turtle.right(angle)：向右旋转angle度
# turtle.left(angle)：向左旋转angle度
# turtle.penup()：抬起画笔
# turtle.pendown()：放下画笔
# turtle.color(color)：设置画笔颜色
# turtle.pensize(size)：设置画笔大小
# turtle.speed(speed)：设置画笔速度

# 使用turtle库绘制图形时，需要注意的是：
#
# 1、绘图的起点在屏幕中心点，即坐标（0,0）处；
# 2、turtle.forward()和turtle.backward()函数移动的距离单位是像素；
# 3、turtle.right()和turtle.left()函数旋转的角度单位是度数；
# 4、urtle.color()函数可以接收颜色名称或RGB值作为参数，例如“red”、“#FF0000”；
# 5、turtle.speed()函数可以设置画笔速度，速度越快越接近实时；
# 6、当需要绘制完多个图形后，可以使用turtle.done()函数停止turtle工作。

```

## 01 正方形
```python
import turtle

for i in range(4):
    turtle.forward(100)
    turtle.right(90)

turtle.done()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725185465498-74b70d6f-2fd6-4829-9dee-322b46d946cb.png)

## 02 五角星
```python
import turtle

turtle.left(72)

for i in range(5):
    turtle.forward(100)
    turtle.right(144)
    turtle.forward(100)
    turtle.left(72)

turtle.done()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725185492935-4c316f91-e569-4616-ab54-21ba8347d2bf.png)

## 03 彩虹
```python
import turtle

colors = ["red", "orange", "yellow", "green", "blue", "purple"]

turtle.pensize(10)

for i in range(6):
    turtle.pencolor(colors[i])
    turtle.circle(50)
    turtle.right(60)

turtle.done()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725185528354-9f27e6a5-71eb-4b14-a1e5-8758d3328c4e.png)

## 04 螺旋线
```python
import turtle

turtle.pensize(2)

for i in range(100):
    turtle.forward(i * 2)
    turtle.right(90)

turtle.done()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725185578347-0e8c4daa-d39e-4b1f-8336-caf26a9c6a7d.png)

## 05 爱心
```python
#画爱心
from turtle import *
def curvemove():
    for i in range(200):
        right(1)
        forward(1)
color('red','pink')
begin_fill()
left(140)
forward(111.65)
curvemove()
left(120)
curvemove()
forward(111.65)
end_fill()
done()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725185838294-de23742c-356e-4da7-ae5b-779df51d3795.png)



# 二、进阶绘图
## 00 一箭穿心
```python
#绘制一箭穿心
from turtle import *

def go_to(x, y):
    up()
    goto(x, y)
    down()

def big_Circle(size):  # 函数用于绘制心的大圆
    speed(10)
    for i in range(150):
        forward(size)
        right(0.3)

def small_Circle(size):  # 函数用于绘制心的小圆
    speed(10)
    for i in range(210):
        forward(size)
        right(0.786)

def line(size):
    speed(10)
    forward(51 * size)

def heart(x, y, size):
    go_to(x, y)
    left(150)
    begin_fill()
    line(size)
    big_Circle(size)
    small_Circle(size)
    left(120)
    small_Circle(size)
    big_Circle(size)
    line(size)
    end_fill()

def arrow():
    pensize(10)
    setheading(0)
    go_to(-400, 0)
    left(15)
    forward(150)
    go_to(339, 178)
    forward(150)

def arrowHead():
    pensize(1)
    speed(10)
    color('red', 'red')
    begin_fill()
    left(120)
    forward(20)
    right(150)
    forward(35)
    right(120)
    forward(35)
    right(150)
    forward(20)
    end_fill()


def main():
    pensize(2)
    color('red', 'pink')
    # getscreen().tracer(30, 0) #取消注释后，快速显示图案
    heart(200, 0, 1)  # 画出第一颗心，前面两个参数控制心的位置，函数最后一个参数可控制心的大小
    setheading(0)  # 使画笔的方向朝向x轴正方向
    heart(-80, -100, 1.5)  # 画出第二颗心
    arrow()  # 画出穿过两颗心的直线
    arrowHead()  # 画出箭的箭头
    go_to(400, -300)
    done()

if __name__ == '__main__':
    main()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725186307956-2a3eeb9e-31d2-4fa2-97c8-bd257b3d2a75.png)

## 01 皮卡丘
```python
import turtle as t

def nose():
    t.penup()
    t.seth(90)
    t.fd(100)
    t.pendown()
    t.begin_fill()
    t.fillcolor("black")
    t.seth(45)
    t.fd(25)
    t.seth(135)
    t.circle(25,90)
    t.seth(315)
    t.fd(25)
    t.end_fill()

def eyes(seth,fd,c):
    t.penup()
    t.seth(seth)
    t.fd(fd)
    t.pendown()
    t.begin_fill()
    t.fillcolor('black')
    t.circle(50)
    t.end_fill()
    t.penup()
    t.circle(50,c)
    t.pendown()
    t.begin_fill()
    t.fillcolor('white')
    t.circle(20)
    t.end_fill()

def face(seth,fd):
    t.penup()
    t.seth(seth)
    t.fd(fd)
    t.pendown()
    t.begin_fill()
    t.fillcolor('red')
    t.circle(70)
    t.end_fill()

def lip():
    t.penup()
    t.seth(135)
    t.fd(250)
    t.pendown()
    t.seth(-300)
    t.circle(30,-65)
    t.begin_fill()
    t.fillcolor('Firebrick')
    t.seth(165)
    t.fd(140)
    t.seth(195)
    t.fd(140)
    t.seth(-360)
    t.circle(30,-65)
    t.penup()
    t.seth(-60)
    t.circle(30,65)
    t.pendown()
    t.seth(-70)
    t.fd(240)
    t.circle(55,140)
    t.seth(70)
    t.fd(240)
    t.end_fill()
    t.seth(-110)
    t.fd(80)
    t.begin_fill()
    t.fillcolor('Firebrick')
    t.seth(120)
    t.circle(120,123)
    t.seth(-70)
    t.fd(165)
    t.circle(55,140)
    t.seth(72)
    t.fd(165)
    t.end_fill()

def setting():
    t.pensize(4)
    t.hideturtle()
    t.setup(1000,600)
    t.speed(10)
    t.screensize(bg='yellow')

def main():
    setting()
    nose()
    eyes(160,250,60)
    eyes(-9.5,530,230)
    face(195,600)
    face(-11,720)
    lip()
    t.done()

if __name__ == '__main__':
    main()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725186530057-c1d2a8c4-446b-429f-b915-16a0bca2b2c7.png)

## 02 圣诞树
```python
from turtle import *
import random
import time

n = 100.0

speed("fastest")
screensize(bg='seashell')
left(90)
forward(3*n)
color("orange", "yellow")
begin_fill()
left(126)

for i in range(5):
    forward(n/5)
    right(144)
    forward(n/5)
    left(72)
end_fill()
right(126)

color("dark green")
backward(n*4.8)
def tree(d, s):
    if d <= 0: return
    forward(s)
    tree(d-1, s*.8)
    right(120)
    tree(d-3, s*.5)
    right(120)
    tree(d-3, s*.5)
    right(120)
    backward(s)
tree(15, n)
backward(n/2)

for i in range(200):
    a = 200 - 400 * random.random()
    b = 10 - 20 * random.random()
    up()
    forward(b)
    left(90)
    forward(a)
    down()
    if random.randint(0, 1) == 0:
        color('tomato')
    else:
        color('wheat')
    circle(2)
    up()
    backward(a)
    right(90)
    backward(b)

time.sleep(60)
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725186750871-c2119fa3-95c3-4d1c-ada6-ae2f2ccb1ff7.png)

## 03 樱花树
```python
#!/usr/bin/env python
# coding=utf-8
# 画一棵樱花

import turtle
import random
from turtle import *
from time import sleep


# 画樱花的躯干(60,t)
def tree(branchLen, t):
    sleep(0.0005)
    if branchLen > 3:
        if 8 <= branchLen <= 12:
            if random.randint(0, 2) == 0:
                t.color('snow')  # 白
            else:
                t.color('lightcoral')  # 淡珊瑚色
            t.pensize(branchLen / 3)
        elif branchLen < 8:
            if random.randint(0, 1) == 0:
                t.color('snow')
            else:
                t.color('lightcoral')  # 淡珊瑚色
            t.pensize(branchLen / 2)
        else:
            t.color('sienna')  # 赭(zhě)色
            t.pensize(branchLen / 10)  # 6
        t.forward(branchLen)
        a = 1.5 * random.random()
        t.right(20 * a)
        b = 1.5 * random.random()
        tree(branchLen - 10 * b, t)
        t.left(40 * a)
        tree(branchLen - 10 * b, t)
        t.right(20 * a)
        t.up()
        t.backward(branchLen)
        t.down()


# 掉落的花瓣
def petal(m, t):
    for i in range(m):
        a = 200 - 400 * random.random()
        b = 10 - 20 * random.random()
        t.up()
        t.forward(b)
        t.left(90)
        t.forward(a)
        t.down()
        t.color('lightcoral')  # 淡珊瑚色
        t.circle(1)
        t.up()
        t.backward(a)
        t.right(90)
        t.backward(b)


def main():
    # 绘图区域
    t = turtle.Turtle()
    # 画布大小
    w = turtle.Screen()
    t.hideturtle()  # 隐藏画笔
    getscreen().tracer(5, 0)
    w.screensize(bg='wheat')  # wheat小麦
    t.left(90)
    t.up()
    t.backward(150)
    t.down()
    t.color('sienna')

    # 画樱花的躯干
    tree(60, t)
    # 掉落的花瓣
    petal(200, t)
    w.exitonclick()

main()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725186040072-481037a3-c094-4899-85b4-c25c01370c7a.png)

## 04 叮当猫
```python
# 画叮当猫
from turtle import *
# 无轨迹跳跃
def my_goto(x, y):
    penup()     #移动时不绘图
    goto(x, y)  #画笔直接移到绝对坐标系[中心点(0,0)]的某一点
    pendown()   #移动时绘图

# 眼睛
def eyes():
    fillcolor("#ffffff")
    begin_fill()

    tracer(False)
    a = 2.5
    for i in range(120):
        if 0 <= i < 30 or 60 <= i < 90:
            a -= 0.05
            lt(3)
            fd(a)
        else:
            a += 0.05
            lt(3)
            fd(a)
    tracer(True)
    end_fill()


# 胡须
def beard():
    my_goto(-32, 135)
    seth(165)      #将当前方向设置为绝对坐标下的角度
    fd(60)   #走直线，距离为d

    my_goto(-32, 125)
    seth(180)
    fd(60)

    my_goto(-32, 115)
    seth(193)
    fd(60)

    my_goto(37, 135)
    seth(15)
    fd(60)

    my_goto(37, 125)
    seth(0)
    fd(60)

    my_goto(37, 115)
    seth(-13)
    fd(60)

# 嘴巴
def mouth():
    my_goto(5, 148)
    seth(270)
    fd(100)
    seth(0)
    circle(120, 50)
    seth(230)
    circle(-120, 100)  #(半径,弧形角度) 圆心在当前位置/海龟朝向的右侧，顺时针  [正正左逆，负负右顺]

# 围巾
def scarf():
    fillcolor('#e70010')
    begin_fill()
    seth(0)
    fd(200)
    circle(-5, 90)
    fd(10)
    circle(-5, 90)
    fd(207)
    circle(-5, 90)
    fd(10)
    circle(-5, 90)
    end_fill()

# 鼻子
def nose():
    my_goto(-10, 158)
    seth(315)
    fillcolor('#e70010')
    begin_fill()
    circle(20)
    end_fill()

# 黑眼睛
def black_eyes():
    seth(0)
    my_goto(-20, 195)
    fillcolor('#000000')
    begin_fill()
    circle(13)
    end_fill()

    pensize(6)
    my_goto(20, 205)
    seth(75)
    circle(-10, 150)
    pensize(3)

    my_goto(-17, 200)
    seth(0)
    fillcolor('#ffffff')
    begin_fill()
    circle(5)
    end_fill()
    my_goto(0, 0)



# 脸
def face():
    fd(183)
    lt(45)
    fillcolor('#ffffff')
    begin_fill()
    circle(120,100)
    seth(180)
    #print(pose())
    fd(121)
    pendown()
    seth(215)
    circle(120,100)
    end_fill()
    my_goto(63.56,218.24)
    seth(90)
    eyes()
    seth(180)
    penup()
    fd(60)
    pendown()
    seth(90)
    eyes()
    penup()
    seth(180)
    fd(64)

#头型
def head():
    penup()
    circle(150,40)
    pendown()
    fillcolor('#00a0de')
    begin_fill()
    circle(150,280)
    end_fill()

# 画哆啦A梦
def Doraemon():
    #头部
    head()

    #围脖
    scarf()

    #脸
    face()

    #红鼻子
    nose()

    #嘴巴
    mouth()

    #胡须
    beard()

    #身体
    my_goto(0,0)
    seth(0)
    penup()
    circle(150,50)
    pendown()
    seth(30)
    fd(40)
    seth(70)
    circle(-30,270)


    fillcolor('#00a0de')
    begin_fill()

    seth(230)
    fd(80)
    seth(90)
    circle(1000,1)
    seth(-89)
    circle(-1000,10)

    #print(pos())

    seth(180)
    fd(70)
    seth(90)
    circle(30,180)
    seth(180)
    fd(70)

    #print(pos())
    seth(100)
    circle(-1000,9)

    seth(-86)
    circle(1000,2)
    seth(230)
    fd(40)

    #print(pos())


    circle(-30,230)
    seth(45)
    fd(81)
    seth(0)
    fd(203)
    circle(5,90)
    fd(10)
    circle(5,90)
    fd(7)
    seth(40)
    circle(150,10)
    seth(30)
    fd(40)
    end_fill()

    #左手
    seth(70)
    fillcolor('#ffffff')
    begin_fill()
    circle(-30)
    end_fill()

    #脚
    my_goto(103.74,-182.59)
    seth(0)
    fillcolor('#ffffff')
    begin_fill()
    fd(15)
    circle(-15,180)
    fd(90)
    circle(-15,180)
    fd(10)
    end_fill()

    my_goto(-92.26,-182.59)
    seth(180)
    fillcolor('#ffffff')
    begin_fill()
    fd(15)
    circle(15, 180)
    fd(90)
    circle(15, 180)
    fd(10)
    end_fill()

    #右手
    my_goto(-133.97,-91.81)
    seth(50)
    fillcolor('#ffffff')
    begin_fill()
    circle(30)
    end_fill()

    #口袋
    my_goto(-103.42,15.09)
    seth(0)
    fd(38)
    seth(230)
    begin_fill()
    circle(90,260)
    end_fill()

    my_goto(5,-40)
    seth(0)
    fd(70)
    seth(-90)
    circle(-70,180)
    seth(0)
    fd(70)

    #铃铛
    my_goto(-103.42,15.09)
    fd(90)
    seth(70)
    fillcolor('#ffd200')
    #print(pos())
    begin_fill()
    circle(-20)
    end_fill()
    seth(170)
    fillcolor('#ffd200')
    begin_fill()
    circle(-2,180)
    seth(10)
    circle(-100,22)
    circle(-2,180)
    seth(180-10)
    circle(100,22)
    end_fill()
    goto(-13.42,15.09)
    seth(250)
    circle(20,110)
    seth(90)
    fd(15)
    dot(10)
    my_goto(0,-150)

    #画眼睛
    black_eyes()

if __name__=='__main__':
    screensize(800,600,"#f0f0f0")
    pensize(3)  #画笔宽度
    speed(9)    #画笔速度
    Doraemon()
    my_goto(100,-300)
    write('by 邻家小胡',font=("Bradley Hand ITC",30,"bold"))
    mainloop()

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725186198053-36952939-a375-41d2-a72d-c8dcbf414828.png)

## 05 小猪佩奇
```python
from turtle import*

speed(10)
def nose(x,y):#鼻子
    penup()#提起笔
    goto(x,y)#定位
    pendown()#落笔，开始画
    setheading(-30)#将乌龟的方向设置为to_angle/为数字（0-东、90-北、180-西、270-南）
    begin_fill()#准备开始填充图形
    a=0.4
    for i in range(120):
        if 0<=i<30 or 60<=i<90:
            a=a+0.08
            left(3) #向左转3度
            forward(a) #向前走a的步长
        else:
            a=a-0.08
            left(3)
            forward(a)
    end_fill()#填充完成
    penup()
    setheading(90)
    forward(25)
    setheading(0)
    forward(10)
    pendown()
    pencolor(255,155,192)#画笔颜色
    setheading(10)
    begin_fill()
    circle(5)
    color(160,82,45)#返回或设置pencolor和fillcolor
    end_fill()
    penup()
    setheading(0)
    forward(20)
    pendown()
    pencolor(255,155,192)
    setheading(10)
    begin_fill()
    circle(5)
    color(160,82,45)
    end_fill()
def head(x,y):#头
    color((255,155,192),"pink")
    penup()
    goto(x,y)
    setheading(0)
    pendown()
    begin_fill()
    setheading(180)
    circle(300,-30)
    circle(100,-60)
    circle(80,-100)
    circle(150,-20)
    circle(60,-95)
    setheading(161)
    circle(-300,15)
    penup()
    goto(-100,100)
    pendown()
    setheading(-30)
    a=0.4
    for i in range(60):
        if 0<=i<30 or 60<=i<90:
            a=a+0.08
            lt(3) #向左转3度
            fd(a) #向前走a的步长
        else:
            a=a-0.08
            lt(3)
            fd(a)
    end_fill()
def ears(x,y): #耳朵
    color((255,155,192),"pink")
    penup()
    goto(x,y)
    pendown()
    begin_fill()
    setheading(100)
    circle(-50,50)
    circle(-10,120)
    circle(-50,54)
    end_fill()
    penup()
    setheading(90)
    forward(-12)
    setheading(0)
    forward(30)
    pendown()
    begin_fill()
    setheading(100)
    circle(-50,50)
    circle(-10,120)
    circle(-50,56)
    end_fill()
def eyes(x,y):#眼睛
    color((255,155,192),"white")
    penup()
    setheading(90)
    forward(-20)
    setheading(0)
    forward(-95)
    pendown()
    begin_fill()
    circle(15)
    end_fill()
    color("black")
    penup()
    setheading(90)
    forward(12)
    setheading(0)
    forward(-3)
    pendown()
    begin_fill()
    circle(3)
    end_fill()
    color((255,155,192),"white")
    penup()
    seth(90)
    forward(-25)
    seth(0)
    forward(40)
    pendown()
    begin_fill()
    circle(15)
    end_fill()
    color("black")
    penup()
    setheading(90)
    forward(12)
    setheading(0)
    forward(-3)
    pendown()
    begin_fill()
    circle(3)
    end_fill()
def cheek(x,y):#腮
    color((255,155,192))
    penup()
    goto(x,y)
    pendown()
    setheading(0)
    begin_fill()
    circle(30)
    end_fill()
def mouth(x,y): #嘴
    color(239,69,19)
    penup()
    goto(x,y)
    pendown()
    setheading(-80)
    circle(30,40)
    circle(40,80)
def body(x,y):#身体
    color("red",(255,99,71))
    penup()
    goto(x,y)
    pendown()
    begin_fill()
    setheading(-130)
    circle(100,10)
    circle(300,30)
    setheading(0)
    forward(230)
    setheading(90)
    circle(300,30)
    circle(100,3)
    color((255,155,192),(255,100,100))
    setheading(-135)
    circle(-80,63)
    circle(-150,24)
    end_fill()
def hands(x,y):#手
    color((255,155,192))
    penup()
    goto(x,y)
    pendown()
    setheading(-160)
    circle(300,15)
    penup()
    setheading(90)
    forward(15)
    setheading(0)
    forward(0)
    pendown()
    setheading(-10)
    circle(-20,90)
    penup()
    setheading(90)
    forward(30)
    setheading(0)
    forward(237)
    pendown()
    setheading(-20)
    circle(-300,15)
    penup()
    setheading(90)
    forward(20)
    setheading(0)
    forward(0)
    pendown()
    setheading(-170)
    circle(20,90)
def foot(x,y):#脚
    pensize(10)
    color((240,128,128))
    penup()
    goto(x,y)
    pendown()
    setheading(-90)
    forward(40)
    setheading(-180)
    color("black")
    pensize(15)
    fd(20)
    pensize(10)
    color((240,128,128))
    penup()
    setheading(90)
    forward(40)
    setheading(0)
    forward(90)
    pendown()
    setheading(-90)
    forward(40)
    setheading(-180)
    color("black")
    pensize(15)
    fd(20)
def tail(x,y):#尾巴
    pensize(4)
    color((255,155,192))
    penup()
    goto(x,y)
    pendown()
    seth(0)
    circle(70,20)
    circle(10,330)
    circle(70,30)
def setting():          #参数设置
    speed(99)
    pensize(4)
    hideturtle()        #使乌龟无形（隐藏）
    colormode(255)      #将其设置为1.0或255.随后 颜色三元组的r，g，b值必须在0 .. cmode范围内
    color((255,155,192),"pink")
    setup(840,500)
def main():
    setting()           #画布、画笔设置
    nose(-100,100)      #鼻子
    head(-69,167)       #头
    ears(0,160)         #耳朵
    eyes(0,140)         #眼睛
    cheek(80,10)        #腮
    mouth(-20,30)       #嘴
    body(-32,-8)        #身体
    hands(-56,-45)      #手
    foot(2,-177)        #脚
    tail(148,-155)      #尾巴
    done()

if __name__ == '__main__':
 main()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725186411231-ca2ea2fe-791c-48de-87ae-66fe4278a559.png)

## 06 冰墩墩
```python
import turtle

turtle.setup(800, 600)
turtle.speed(0)  # 速度
# 左手
turtle.penup()
turtle.goto(177, 112)
turtle.pencolor("lightgray")
turtle.pensize(3)
turtle.fillcolor("white")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(80)
turtle.circle(-45, 200)
turtle.circle(-300, 23)
turtle.end_fill()

# 左手内
turtle.penup()
turtle.goto(182, 95)
turtle.pencolor("black")
turtle.pensize(1)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.setheading(95)
turtle.pendown()
turtle.circle(-37, 160)
turtle.circle(-20, 50)
turtle.circle(-200, 30)
turtle.end_fill()

# 轮廓头顶
turtle.penup()
turtle.goto(-73, 230)
turtle.pencolor("lightgray")
turtle.pensize(3)
turtle.fillcolor("white")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(20)
turtle.circle(-250, 35)

# 左耳
turtle.setheading(50)
turtle.circle(-42, 180)

# 左侧
turtle.setheading(-50)
turtle.circle(-190, 30)
turtle.circle(-320, 45)

# 左腿
turtle.circle(120, 30)
turtle.circle(200, 12)
turtle.circle(-18, 85)
turtle.circle(-180, 23)
turtle.circle(-20, 110)
turtle.circle(15, 115)
turtle.circle(100, 12)

# 右腿
turtle.circle(15, 120)
turtle.circle(-15, 110)
turtle.circle(-150, 30)
turtle.circle(-15, 70)
turtle.circle(-150, 10)
turtle.circle(200, 35)
turtle.circle(-150, 20)

# 右手
turtle.setheading(-120)
turtle.circle(50, 30)
turtle.circle(-35, 200)
turtle.circle(-300, 23)

# 右侧
turtle.setheading(86)
turtle.circle(-300, 26)

# 右耳
turtle.setheading(122)
turtle.circle(-53, 160)
turtle.end_fill()

# 右耳内侧
turtle.penup()
turtle.goto(-130, 180)
turtle.pencolor("black")
turtle.pensize(1)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(120)
turtle.circle(-28, 160)
turtle.setheading(210)
turtle.circle(150, 20)
turtle.end_fill()

# 右耳内侧
turtle.penup()
turtle.goto(-130, 180)
turtle.pencolor("black")
turtle.pensize(1)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(120)
turtle.circle(-28, 160)
turtle.setheading(210)
turtle.circle(150, 20)
turtle.end_fill()

# 左耳内侧
turtle.penup()
turtle.goto(90, 230)
turtle.setheading(40)
turtle.begin_fill()
turtle.pendown()
turtle.circle(-30, 170)
turtle.setheading(125)
turtle.circle(150, 23)
turtle.end_fill()

# 右手内侧
turtle.penup()
turtle.goto(-180, -55)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.setheading(-120)
turtle.setheading(-120)
turtle.pendown()
turtle.circle(50, 30)
turtle.circle(-27, 200)
turtle.circle(-300, 20)
turtle.setheading(-90)
turtle.circle(300, 14)
turtle.end_fill()

# 左腿内侧
turtle.penup()
turtle.goto(108, -168)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(-115)
turtle.circle(110, 15)
turtle.circle(200, 10)
turtle.circle(-18, 80)
turtle.circle(-180, 13)
turtle.circle(-20, 90)
turtle.circle(15, 60)
turtle.setheading(42)
turtle.circle(-200, 29)
turtle.end_fill()

# 右腿内侧
turtle.penup()
turtle.goto(-38, -210)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(-155)
turtle.circle(15, 100)
turtle.circle(-10, 110)
turtle.circle(-100, 30)
turtle.circle(-15, 65)
turtle.circle(-100, 10)
turtle.circle(200, 15)
turtle.setheading(-14)
turtle.circle(-200, 27)
turtle.end_fill()

# 右眼眼圈
turtle.penup()
turtle.goto(-64, 120)
turtle.begin_fill()
turtle.pendown()
turtle.setheading(40)
turtle.circle(-35, 152)
turtle.circle(-100, 50)
turtle.circle(-35, 130)
turtle.circle(-100, 50)
turtle.end_fill()

# 眼珠
turtle.penup()
turtle.goto(-47, 55)
turtle.fillcolor("white")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(0)
turtle.circle(25, 360)
turtle.end_fill()
turtle.penup()
turtle.goto(-45, 62)
turtle.pencolor("darkslategray")
turtle.fillcolor("darkslategray")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(0)
turtle.circle(19, 360)
turtle.circle(19, 360)
turtle.end_fill()
turtle.penup()
turtle.goto(-45, 68)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(0)
turtle.circle(10, 360)
turtle.end_fill()
turtle.penup()
turtle.goto(-47, 86)
turtle.pencolor("white")
turtle.fillcolor("white")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(0)
turtle.circle(5, 360)
turtle.circle(5, 360)
turtle.end_fill()

# 左眼眼圈
turtle.penup()
turtle.goto(51, 82)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(120)
turtle.circle(-32, 152)
turtle.circle(-100, 55)
turtle.circle(-25, 120)
turtle.circle(-120, 45)
turtle.end_fill()

# 眼珠
turtle.penup()
turtle.goto(79, 60)
turtle.goto(79, 60)
turtle.fillcolor("white")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(0)
turtle.circle(24, 360)
turtle.end_fill()
turtle.penup()
turtle.goto(79, 64)
turtle.pencolor("darkslategray")
turtle.fillcolor("darkslategray")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(0)
turtle.circle(19, 360)
turtle.end_fill()
turtle.penup()
turtle.goto(79, 70)
turtle.goto(79, 70)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(0)
turtle.circle(10, 360)
turtle.end_fill()
turtle.penup()
turtle.goto(79, 88)
turtle.pencolor("white")
turtle.fillcolor("white")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(0)
turtle.circle(5, 360)
turtle.end_fill()

# 鼻子
turtle.penup()
turtle.goto(37, 80)
turtle.fillcolor("black")
turtle.begin_fill()
turtle.pendown()
turtle.circle(-8, 130)
turtle.circle(-22, 100)
turtle.circle(-8, 130)
turtle.end_fill()

# 嘴
turtle.penup()
turtle.goto(-15, 48)
turtle.setheading(-36)
turtle.begin_fill()
turtle.pendown()
turtle.circle(60, 70)
turtle.setheading(-132)
turtle.circle(-45, 100)
turtle.end_fill()

# 彩虹图
turtle.penup()
turtle.goto(-135, 120)
turtle.pensize(5)
turtle.pencolor("cyan")
turtle.pendown()
turtle.setheading(60)
turtle.circle(-165, 150)
turtle.circle(-130, 78)
turtle.circle(-250, 30)
turtle.circle(-138, 105)
turtle.penup()
turtle.goto(-131, 116)
turtle.pencolor("slateblue")
turtle.pendown()
turtle.setheading(60)
turtle.setheading(60)
turtle.circle(-160, 144)
turtle.circle(-120, 78)
turtle.circle(-242, 30)
turtle.circle(-135, 105)
turtle.penup()
turtle.goto(-127, 112)
turtle.pencolor("orangered")
turtle.pendown()
turtle.setheading(60)
turtle.circle(-155, 136)
turtle.circle(-116, 86)
turtle.circle(-220, 30)
turtle.circle(-134, 103)
turtle.penup()
turtle.goto(-123, 108)
turtle.pencolor("gold")
turtle.pendown()
turtle.setheading(60)
turtle.circle(-150, 136)
turtle.circle(-104, 86)
turtle.circle(-220, 30)
turtle.circle(-126, 102)
turtle.penup()
turtle.goto(-120, 104)
turtle.pencolor("greenyellow")
turtle.pendown()
turtle.setheading(60)
turtle.circle(-145, 136)
turtle.circle(-90, 83)
turtle.circle(-220, 30)
turtle.circle(-120, 100)
turtle.penup()

# 爱心
turtle.penup()
turtle.goto(220, 115)
turtle.pencolor("brown")
turtle.pensize(1)
turtle.fillcolor("brown")
turtle.begin_fill()
turtle.pendown()
turtle.setheading(36)
turtle.circle(-8, 180)
turtle.circle(-60, 24)
turtle.setheading(110)
turtle.circle(-60, 24)
turtle.circle(-8, 180)
turtle.end_fill()

# 五环
turtle.penup()
turtle.goto(-20, -170)
turtle.pendown()
turtle.pencolor("blue")
turtle.pensize(2)
turtle.circle(7)
turtle.penup()
turtle.goto(-5, -170)
turtle.pendown()
turtle.pencolor("black")
turtle.pensize(2)
turtle.circle(7)
turtle.penup()
turtle.goto(10, -170)
turtle.pendown()
turtle.pencolor("brown")
turtle.pensize(2)
turtle.circle(7)
turtle.penup()
turtle.goto(-17, -175)
turtle.pendown()
turtle.pencolor("lightgoldenrod")
turtle.pensize(2)
turtle.circle(7)
turtle.penup()
turtle.goto(1, -175)
turtle.pendown()
turtle.pencolor("green")
turtle.pensize(2)
turtle.circle(7)
turtle.penup()
turtle.pencolor("black")
turtle.goto(-35, -160)
turtle.write("BEIJING2022", font=('Arial', 10, 'bold italic'))
turtle.hideturtle()
turtle.done()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725185729048-fdb6f654-ab83-491f-b87f-bf15195ef6d1.png)

## 07 万圣节礼物--恶魔南瓜头
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2023/10/24 17:03
# @Author  : LingJiaXiaoHu
# @File    : 万圣节礼物-恶魔南瓜头.py.py
# @Software: win11 pytorch(GPU版本） python3.9.16

import turtle as tu
import random as ra
import math

tu.screensize(1.0, 1.0)
tu.title("万圣节")
tu.bgcolor('darkorange')
t = tu.Pen()
t.ht()
colors = ['black']


class Bat():  # 每个蝙蝠（蝙蝠类）
    def __init__(self):
        self.k = ra.uniform(0.1, 0.3)  # 蝙蝠的半径
        self.r = 1  # 南瓜的半径
        self.x = ra.randint(-1000, 1000)  # 蝙蝠的横坐标
        self.y = ra.randint(-500, 500)  # 蝙蝠的纵坐标
        self.f = ra.uniform(-3.14, 3.14)  # 蝙蝠左右移动呈正弦函数
        self.speed = ra.randint(5, 10)  # 蝙蝠移动速度
        self.color = ra.choice(colors)  # 蝙蝠的颜色
        self.outline = 1  # 蝙蝠的外框大小（可不要）

    def move(self):  # 蝙蝠移动函数
        if self.y <= 500:  # 当蝙蝠还在画布中时
            self.y += self.speed  # 设置上下移动速度
            self.x += self.speed * math.sin(self.f)  # 设置左右移动速度
            self.f += 0.1  # 可以理解成标志，改变左右移动的方向
        else:  # 当蝙蝠漂出了画布时，重新生成一个蝙蝠
            self.k = ra.uniform(0.1, 0.3)
            self.r = 1  # 南瓜的半径
            self.x = ra.randint(-1000, 1000)
            self.y = -500
            self.f = ra.uniform(-3.14, 3.14)
            self.speed = ra.randint(5, 10)
            self.color = ra.choice(colors)
            self.outline = 1

    def bat(self):  # 画蝙蝠函数，就是用turtle画蝙蝠
        t.penup()
        t.goto(self.x, self.y)
        t.pendown()
        t.pencolor(self.color)
        t.pensize(1)
        t.begin_fill()
        t.fillcolor(self.color)
        t.forward(self.k * 10)
        t.setheading(75)
        t.forward(self.k * 35)
        t.setheading(-75)
        t.forward(self.k * 55)
        t.setheading(0)
        t.circle(self.k * 40, 90)
        t.right(90)
        t.forward(self.k * 100)
        t.left(180)
        t.circle(self.k * 100, 90)
        t.setheading(180)
        t.circle(self.k * 70, 90)
        t.left(180)
        t.circle(self.k * 70, 90)
        t.right(90)
        t.circle(self.k * 100, 90)
        t.right(180)
        t.forward(self.k * 100)
        t.right(90)
        t.circle(self.k * 40, 90)
        t.setheading(75)
        t.forward(self.k * 55)
        t.setheading(-75)
        t.forward(self.k * 35)
        t.setheading(0)
        t.forward(self.k * 10)
        t.end_fill()

    def pumpkin(self):
        # 画南瓜
        t.color('#CF5E1A', '#CF5E1A')
        t.penup()
        t.goto(250 * self.r, 30 * self.r)
        t.pendown()
        t.seth(90)
        t.begin_fill()
        for j in range(25):
            t.fd(j * self.r)
            t.left(3.6)
        for j in range(25, 0, -1):
            t.fd(j * self.r)
            t.left(3.6)
        t.seth(-90)
        t.circle(254 * self.r, 180)
        t.end_fill()
        # 眼睛
        eyes_items = [(-60, 230, 0), (60, -50, 1)]
        for items in eyes_items:
            position, angle, direction = items
            t.pensize(6)
            t.penup()
            t.goto(position * self.r, 0)
            t.pendown()
            t.color('#4C180D', '#4C180D')
            t.begin_fill()
            t.seth(angle)
            for j in range(55):
                t.fd(3 * self.r)
                if direction:
                    t.left(3)  # 左转3度
                else:
                    t.right(3)  # 右转3度
            t.goto(position * self.r, 0)
            t.end_fill()
        # 鼻子
        t.penup()
        t.goto(0, 0)
        t.seth(180)
        t.pendown()
        t.begin_fill()
        t.circle(50 * self.r, steps=3)
        t.end_fill()
        # 嘴巴
        t.color('#F9D503', '#F9D503')
        t.pensize(6)
        t.penup()
        t.goto(-150 * self.r, -100 * self.r)
        t.pendown()
        t.begin_fill()
        t.seth(-30)
        t.fd(100 * self.r)
        t.left(90)
        t.fd(30 * self.r)
        t.right(90)
        t.fd(60 * self.r)
        t.left(60)
        t.fd(60 * self.r)
        t.right(90)
        t.fd(30 * self.r)
        t.left(90)
        t.fd(100 * self.r)
        t.end_fill()
        # 南瓜枝
        t.penup()
        t.goto(0, 180 * self.r)
        t.pendown()
        t.color('#2E3C01')
        t.seth(100)
        t.pensize(25)
        t.circle(60 * self.r, 100)


Bats = []  # 用列表保存所有蝙蝠
for i in range(100):
    Bats.append(Bat())
while True:  # 开始漂浮
    tu.tracer(0)
    t.clear()
    Bats[0].pumpkin()
    for i in range(50):  # 在画布中设置50个漂浮的蝙蝠
        Bats[i].move()
        Bats[i].bat()
    tu.update()
tu.mainloop()
```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725185348185-3507132f-1f27-4e26-9ca7-e5cfb58a4d4e.png)



## 08 浪漫星空
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2023/9/28 11:35
# @Author  : LingJiaXiaoHu
# @File    : 浪漫星空.py
# @Software: win11 pytorch(GPU版本） python3.9.16

import math
import turtle as tu
import random as ra

tu.setup(1.0, 1.0)
tu.screensize(1.0, 1.0)  # 设置画布大小
tu.bgcolor('black')  # 设置画布颜色
t = tu.Pen()
t.ht()  # 隐藏画笔
colors2 = ['yellow', 'gold', 'orange']  # 星星的颜色列表
colors3 = ['skyblue', 'white', 'cyan', 'aqua']  # 流星的颜色列表


class Star():  # 流星类
    def __init__(self):
        self.x1 = -850
        self.y1 = 300
        self.x2 = ra.randint(-1500, 1000)  # 星星的横坐标
        self.y2 = ra.randint(-500, 500)  # 星星的纵坐标
        self.r2 = ra.randint(1, 5)
        self.x3 = ra.randint(-1500, 1000)  # 流星的横坐标
        self.y3 = ra.randint(-500, 500)  # 流星的纵坐标
        self.r3 = ra.randint(50, 100)  # 流星的半径
        self.t = ra.randint(1, 3)
        self.speed2 = ra.randint(1, 3)  # 星星流星移动速度
        self.speed3 = ra.randint(10, 15)  # 流星的移动速度
        self.color2 = ra.choice(colors2)  # 星星的颜色
        self.color3 = ra.choice(colors3)  # 流星的颜色

    def moon(self):  # 画月亮
        t.penup()
        t.goto(self.x1, self.y1)
        t.pendown()
        t.pencolor("yellow")
        t.begin_fill()
        t.fillcolor("gold")
        t.circle(66)
        t.end_fill()

    def star1(self):  # 画星星的函数
        t.pensize(1)  # 设置画笔大小
        t.penup()  # 提笔
        t.goto(self.x2, self.y2)  # 设置星星在画布中的初始坐标
        t.pendown()  # 落笔
        t.speed(0)  # 画星星的速度，范围为0~10（0最快）
        t.color(self.color2)  # 设置星星的外框颜色
        t.begin_fill()  # 开始填色
        t.fillcolor(self.color2)  # 星星的内部颜色
        for i in range(5):  # 循环画星星
            t.forward(self.r2)
            t.right(144)
            t.forward(self.r2)
            t.left(72)
        t.end_fill()  # 结束填充颜色

    def star2(self):  # 画流星函数
        t.pensize(1)  # 流星的大小
        t.penup()  # 提笔
        t.goto(self.x3, self.y3)  # 随机位置
        t.pendown()  # 落笔
        t.color(self.color3)
        t.begin_fill()
        t.fillcolor(self.color3)
        t.setheading(-30)
        t.right(self.t)
        t.forward(self.r3)
        t.left(self.t)
        t.circle(self.r3 * math.sin(math.radians(self.t)), 180)
        t.left(self.t)
        t.forward(self.r3)
        t.end_fill()

    def move(self):  # 移动函数
        if self.x1 <= 850:  # 当月亮还在画布中时
            self.x1 += 1  # 设置左右移动速度
        else:
            self.x1 = -850

        if self.x2 <= 1000:  # 当星星还在画布中时
            self.x2 += 2 * self.speed2  # 设置左右移动速度
        else:
            self.r2 = ra.randint(1, 5)
            self.x2 = ra.randint(-1500, -1000)
            self.speed2 = ra.randint(1, 3)
            self.color2 = ra.choice(colors2)

        if self.y3 >= -500:  # 当流星还在画布中时
            self.y3 -= self.speed3  # 设置上下移动速度
            self.x3 += 2 * self.speed3  # 设置左右移动速度
        else:
            self.r3 = ra.randint(50, 100)
            self.t = ra.randint(1, 3)
            self.x3 = ra.randint(-1500, -750)
            self.y3 = ra.randint(-500, 1000)
            self.speed3 = ra.randint(10, 15)
            self.color3 = ra.choice(colors3)

"""
        if self.x3 <= 1000:            #当流星还在画布中时
            self.x3 += 2 * self.speed3   #设置左右移动速度
        else:
            self.r3 = ra.randint(50,100)
            self.x3 = ra.randint(-1500,-1000)
            self.t = ra.randint(1, 3)
            self.speed3 = ra.randint(1,3)
            self.color3 = ra.choice(colors)
"""

Stars = []  # 用列表保存所有流星
for i in range(100):
    Stars.append(Star())
while True:  # 开始绘制
    tu.tracer(0)
    t.clear()
    Stars[0].moon()
    for i in range(99):  # 设置99个星星
        Stars[i].move()
        Stars[i].star1()
    for i in range(19):  # 设置19个流星
        Stars[i].star2()
    tu.update()

tu.mainloop()

```

![](https://cdn.nlark.com/yuque/0/2024/png/39216292/1725185424136-b7f9cd6c-a5a4-44f4-b87b-44a22e16cfda.png)



