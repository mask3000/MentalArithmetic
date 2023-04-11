
#  Primary School Mathematics 小学数学口算题

![输入图片说明](https://img.shields.io/badge/Python-3.8.8-green?logo=python)
![输入图片说明](https://img.shields.io/badge/fastAPI-0.85.1-green)
![输入图片说明](https://img.shields.io/badge/Vue-3.2.41-blue)
![输入图片说明](https://img.shields.io/badge/license-Apache--2.0-green)
![输入图片说明](https://img.shields.io/badge/Github--PrimarySchoolMathematics-green?logo=github)

孩子上小学一年级了，加减乘除的口算就要开始练习了，估计老师肯定会让家长出题，所以提前准备一下，利用Python开发了一套自动生成小学生口算题的小应用。
为了让辛苦的程序员老爹解放抄题的双手，本程序让你拥有更多的时间去写代码而不用去手写几道口算题而劳神伤脑。所以有或没有娃子的程序员老爹们一起来继续优化个开源小程序的？有什么点子，发现什么BUG，欢迎提出issue。

仅以此软件，献给那些热爱`Python`的程序员老爹们！

## 功能更新

2023-04-11 感谢@kkplusplus重新构建了前端，并新增docker部署启动方式。

2023-03-23 新增解题方式选项,提供口算解题和竖式解题.口算解题为原有逻辑,选择竖式解题生成的数学题目之间会留有空白来给学生列竖式，感谢 @tsukasa521！

![](imgs/a11.png)

![](imgs/a22.png)

2022-12-02 把前端页面打包集成到了fastapi,可以不用在启动前端的环境来使用本程序了.

2022-11-13 更换了前端框架为vue3,后续将更新一些新功能.比如一键生成预制的常见类型的口算题,口算题小游戏等.

2022-11-05 由于之前代码所用的框架是比较久远的版本,很多新人需要折腾很长时间才能运行起来,鉴于此种情况,全面更换了前后端的框架,使程序的运行环境搭建更为方便了.重构期间修复了一些bug和逻辑.

## 核心功能：

1.可以设置各算数项和结果的取值范围及多步算数符号的选择，可以生成求结果、求算数项、带括号的算式，最多支持3步算式题,除法可以生成带有余数的口算题.

2.可以简单设置文档标题，小标题。设置生成的口算题文档个数

## 本地运行

### 如何部署docker

项目默认提供了docker的部署方式

构建镜像
```shell
docker build -t primary-school-mathematics .
```

启动服务
```shell
docker run -d --name=PrimarySchoolMathematics -p 1101:1101 primary-school-mathematics
```

### 运行后端

1. 本程序开发调试的python环境为`3.8.13`,建议新建一个全新的虚拟环境来测试。
    下载程序进入`/webbackend`，安装程序相关依赖，在程序根目录下运行终端：
    ```shell
    cd webbackend
    pip install -r requirements.txt
    ```

    如果pip更新依赖缓慢,请使用下边的代码试试:
    ```shell
    pip install -r requirements.txt -i http://pypi.douban.com/simple
    ```
2. `/webbackend`目录终端下运行`python main.py`,或使用`vscode`、`pycharm`打开`/webbackend/main.py`,运行当前文件即可.
3. 打开浏览器在地址栏中输入`http://127.0.0.1:1101/test`,看到下图就是启动成功了.

### 运行前端 
1.  进入`./vue3_webfrontend` 终端输入: `cd vue3_webfrontend`,如果你使用的是vscode,可以使用分屏新建终端,这样前后端的服务器启动可以一目了然.
![](imgs/02.png)
2. 终端输入:`npm install`或`yarn`更新下载前端的依赖,如果速度太慢,建议临时使用镜像服务器下载依赖:`npm install --registry https://registry.npm.taobao.org`.
3. 终端输入:`npm run dev`或`yarn dev`启动前端服务器.正常的话打开网址`http://127.0.0.1:1102`你会看到下图:
![](imgs/03.png)

前后端都启动之后就可以正常使用了!

**最近发现有些朋友下载代码后不能使用请看这里**

1. 本程序运行调试的python环境为`3.8.X`,建议新建一个全新的虚拟环境来测试。
2. 首次运行时,前后端报错的话,大概率都是依赖没有安装,建议查看错误提示安装相关依赖。
3. 如果依然无法运行，可以发起issues提供详细的报错信息，或是联系我一起分析。



## 使用教程

### 程序的使用

1. 例:生成10以内加法口算题60道,设置好算数项的取值范围和运算符号,设置好口算题数目之后点添加口算题,最后点击生成口算题即可!

![](imgs/06.png)

2. 口算题卷子保存在`./docx`目录下,用软件打开后连接打印机就可以打印了.
页面上也有提供下载的连接,方便远程下载.
![](imgs/07.png)

3. 一些复杂的口算题都是先从添加口算题开始,比如我要打印60道100以内的加减法混合口算题,结果不大于70.
这个时候我们可以选择第一步运算符号的加法和减法,设置好其他参数,然后添加口算题,最后点生成口算题.
4. 具体的使用可以多试试,其实很简单啦!

### 程序成生的口算题截图：

![](imgs/214154_bb529734_125848.png)
![](imgs/214206_a3081f2e_125848.png)
![](imgs/214230_b9c6e3ef_125848.png)
![](imgs/214240_e946434d_125848.png)

## 一些想法
重构程序界面的时候发现自己的能力有限，所以界面ui的处理很让人头疼，希望有时间有能力的前端后端全栈的牛逼大佬来贡献一沓代码，共同完善这个小程序，为更多宝贝的程序员老爹老妈省下更多的时间！后端主要是一些简单的算法，后续还想添加的功能有：小数的口算题，整十百千的口算，分数口算题（这个完全没有思路）。

最后感谢曾经贡献过代码的同学，再次谢谢你们！

## 捐赠

开发和维护 PrimarySchoolMathematics 花费了我很多业余时间，如果你觉得项目帮助到您，请认真考虑请作者喝一杯咖啡好吗？😋

![](imgs/wx.png)![](imgs/zfb.png)



