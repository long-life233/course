module.exports = {
    title: '教程',
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'vue3', link: '/vue3/' }
        ],
        // displayAllHeaders: true, // 默认值：false
        sidebarDepth:2,
        lastUpdated: '最后更新于', // string | boolean
        sidebar: {
            '/vue3/': [
                {
                    title: "基础部分",
                    collapsable: true,
                    children: [
                        '',
                        'base/compare-vue2-and-vue3',
                        'base/computed-watch',
                        'base/create-vue3-project',
                        'base/defineComponent',
                        'base/hook',
                        'base/life-cycle',
                        'base/new-compoent',
                        'base/reactive',
                        'base/readonly-shallowReadonly',
                        'base/ref',
                        'base/responsvie',
                        'base/setup-detail',
                        'base/setup',
                        'base/shallowReactive-shallowRef',
                        'base/toRaw-markRaw-toRef-customRef-provide-inject',
                        'base/toRefs'

                    ]
                },
                {
                    title:"练习",
                    collapsable:true,
                    children:[
                        'project/todoList-exercise'
                    ]
                }
            ],
            
        }
    },
    description: 'thunderpowers-course',// 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],// 浏览器标签的icon，/表示在public目录下去找
    ]
}