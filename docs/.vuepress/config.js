module.exports = {
    title: '教程',
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'vue3', link: '/vue3/1.创建vue3项目.md' },
            { text: 'blender', link: '/blender/Blender教程.md' }
        ],
        sidebar: {
            '/vue3/':[
                '1.创建vue3项目.md',
                '2.defineComponent函数.md',
                '3.setup.md',
                '4.ref.md',
                '5.reactive.md',
                '6.比较vue2和vue3的响应式.md',
                '7.setup细节.md',
                '8.计算属性与监视函数.md',
                '9.生命周期.md',
                '10.自定义hook.md',
                '11.toRefs.md',
                '12.shallowReactive和shallowRef.md',
                '13.readonly 与 shallowReadonly.md',
                '14.新组件.md',
                '15.toRaw,markRaw,toRef,customRef,provide_inject.md',
                '16.响应式数据的判断.md',
                '17.todoList练习.md',
            ],
            '/blender/':[
                'Blender教程.md'
            ]
        }
    },
    description: 'thunderpowers-course',// 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],// 浏览器标签的icon，/表示在public目录下去找
    ]
}