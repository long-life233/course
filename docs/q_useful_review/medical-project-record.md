# 彦渊医疗项目

## npm i 下载依赖
可能会出现关于node-sass、python27、gyp等错误，这时需要根据node-sass版本切换node版本。

还遇到了在scrpt脚本里写分号`;`的问题。像这种`"postinstall": "patch-package;run-p install:*",`与`"postinstall": "patch-package && run-p install:*",`，前者在windows上npm i会报错。后者就行，`;`和`&&`的作用分别是什么？在mac和windows使用上有区别吗？

## 小程序技巧
```shell
查看当前页面路径：在小程序开发工具的左下角可以查看。
    还可以查看页面参数、场景值。

项目 ->  通用设置 -> 内存限制 填大。

响应式数据可以在AppData里查看，不用再去console重新编译了，耗费时间。

添加编译模式，不用再点好几个页面才到要调试的页面了。
```

## bug
1
```shell
跳转到注册页面，发请求判断是否登录，然后判断是否注册。留在注册页还是重定向到登录页。

如果重定向到登录页，会发现是先显示从首页跳转到注册页的首页，然后跳转显示登录页。
原因可能是注册页得视图已经关闭了，二js还没关闭。

搜索去往登录页的方式：'PAGES.REGISTER','/pages/register/main'

去往register页面的方式有navigateTo、reLaunch、[redirectTo]
```
2
```shell
   病人信息页面 patient/info/index
        |
        ↓
   点击授权详情
        |
        ↓
   授权详情页面 patient/info/auth/detail/index
        授权详情页面有个授权时间，可以根据此判断，五分钟内不能再授权申请
        |
        ↓
   重新申请授权
        |
        ↓
   申请授权页面(表单) patient/info/auth/index
```
3
```shell
预约医生的地图图标点击进入地图
```

## 路由跳转规则
路由URL必须使用constants.ts文件里的常量, 禁止手写。

跳转路由必须使用封装的路由跳转方法: navigateTo、openPage

## src\composition\logic.ts文件
里面写有一些发请求逻辑功能的函数
## src\composition\http.ts文件
有个useHttp函数，传入要执行的函数，返回需要使用到的data、loading、error。

可以选择是否手动执行api，默认是自动。
```ts
export function useHttp<T extends any>(
    api: (params?: any) => Promise<BaseResponseBody<T>>,
    options?: UseHttpOptions<T>
): UseHttpResult<T> {
    const state = reactive<HttpState<T>>({
        data: (options?.initialValue ?? []) as any,
        loading: !options?.manual,
        error: null,
    });
    
    async function reload(params?: any) {
        state.error = null;
        state.loading = true;
        try {
            const { code, data, msg } = await api(params);
            if (isSuccess(code)) {
                // @ts-ignore
                state.data = data;
            } else {
                state.error = { code, data, msg };
            }
        } catch (e) {
            //
        } finally {
            state.loading = false;
        }
    }

    !options?.manual && reload();

    return {
        ...toRefs(state),
        // @ts-ignore
        state,
        reload,
    };
}
```
## src/http/misc.ts文件

里面有个函数`callWithFeedback`, 在请求到请求成功之间会toast提示

有回馈的调用一个函数
```js
// msg: fn函数执行成功后的提示。
export const callWithFeedback = async (fn: () => Promise<void>, msg?: string) => {
    await wx.showToast({
        title: "",
        icon: "loading",
    });
    try {
        await fn();
        await wx.hideToast();
        if (msg) {
            await wx.showToast({
                title: msg,
                icon: "success",
            });
        }
    } catch (e: any) {
        await wx.hideToast();
        await wx.showModal({
            content: stringOf(e.message ?? e.msg ?? e),
            showCancel: false,
            ...ModelStyle,
        });
    }
};
```

## 验收

