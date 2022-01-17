module.exports = {
    title: '启迪',
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'vue3', link: '/vue3/' },
            { text: 'talk', link: '/thinking/' }
        ],
        sidebarDepth: 3,
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
                        'article/2022.1.12-my-and-other',
                        'article/2022.1.13-good-html',
                        'article/2022.1.14-if-she-is-better-than-me',
                        'article/2022.1.16-0-base-front-end',
                        'article/2022.1.17-css-layout',
                        'article/2022.1.17-js-advanced'
                    ]
                }
               
            ]
        }
    },
    description: "lusang's blog",// 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],// 浏览器标签的icon，/表示在public目录下去找
    ],
    plugins: [
        ['demo-code', {
            jsLibs: [ // 引入的js库
                // umd
                'https://unpkg.com/tua-storage/dist/TuaStorage.umd.js',
            ],
            cssLibs: [ // 引入的css库
                'https://unpkg.com/animate.css@3.7.0/animate.min.css',
            ],
            showText: '显示完整代码',
            hideText: '收起代码',
            styleStr: 'text-decoration: underline;',
            minHeight: 200,
            onlineBtns: {
                codepen: true,
                jsfiddle: true,
                codesandbox: true,
            },
            jsfiddle: {
                framework: 'library/pure', // default
                // framework: 'vue/2.6.11',
            },
            codesandbox: {
                deps: { 'lodash': 'latest' },
                json: '',
                query: '',
                embed: '',
            },
            demoCodeMark: 'demo' // ::: 标记
        }]
    ],
}
