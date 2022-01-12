module.exports = {
    title: '启迪',
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'vue3', link: '/vue3/' },
            { text: 'talk', link: '/thinking/' }
        ],
        sidebarDepth: 2,
        lastUpdated: '最后更新于', // string | boolean
        
        sidebar: {
            '/vue3/': [
                {
                    title: "基础部分",
                    collapsable: false,
                    children: [
                        '',
                        'base/compare-vue2-and-vue3',
                        'base/use-v-model-in-diy-component',
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
                    title: "练习",
                    collapsable: false,
                    children: [
                        'project/todoList-exercise'
                    ]
                }
            ],
            '/thinking/':[
                {
                    title:"练习写作",
                    collapsable:false,
                    children:[
                        '',
                        'article/2022.1.11-write',
                        'article/2022.1.11-vue3-todoList-summary',
                        'article/2022.1.11-community-project-summary',
                        'article/2021.1.11-the-little-red-writing-book-exercise',
                        'article/2022.1.12-big-error-in-sourceTree',
                        'article/2022.1.12-my-and-other'
                    ]
                }
               
            ]
        }
    },
    description: "lusang's blog",// 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],// 浏览器标签的icon，/表示在public目录下去找
    ]
}
