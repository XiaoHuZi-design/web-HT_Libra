```python
import socket

print("[系统提示] AI追女神客户端开启！")
# 创建 socket 对象
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 获取本地主机名  65535个端口  0-1000是特殊端口不能选
port = 9999

# 连接服务，指定主机和端口
client_socket.connect(('10.160.88.120', port))      #192.168.0.250是我机器的IP地址，你需要改成自己的    10.160.88.120
print("[系统提示] 已连接到女神！")
while True:
    # 发送数据
    ret = input("我: ")
    try:

        client_socket.send(ret.encode())

        # 接收数据
        response = client_socket.recv(1024)
        print('女神:'+ response.decode())

        # 关闭连接

    except:
        print('系统提示: 女神断开了与你的连接')
        client_socket.close()

```

```python
import socket

# 创建 socket 对象
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 获取本地主机名
print("服务器开启！")
port = 9999
# 绑定端口号
server_socket.bind(('', port))

# 设置最大连接数，超过后排队
server_socket.listen(5)

while True:
    # 建立客户端连接
    client_socket, addr = server_socket.accept()

    print('收到来自{}的链接'.format(addr))

    # 接收客户端数据
    while True:
        data = client_socket.recv(1024).decode()
        print('收到屌丝发来的数据:  ', data)
        """
            你可以在这里加入逻辑判断
        """
        if '干嘛' in data:
            # 发送数据到客户端
            client_socket.send('我去洗澡了哈.'.encode())
        elif '红包' in data:
            # 发送数据到客户端
            client_socket.send('[对方已接收] 谢谢！'.encode())
        elif '做我女朋友' in data:
            client_socket.send('[对方断开了聊天]'.encode())
            client_socket.close()
            break
        else:
            client_socket.send('???'.encode())


```

![](https://cdn.nlark.com/yuque/0/2024/jpeg/39216292/1725188508935-cecbe988-2f83-4090-bfca-80b421191e0c.jpeg)

