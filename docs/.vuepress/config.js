module.exports = {
    title: '启迪',
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'html-css-js', link: '/html-css-js/' },
            { text:'java',link:'/java/' },
            { text: 'vue', link: '/vue/' },
            { text: 'uniapp', link: '/uniapp/' },
            { text: 'sundry', link: '/sundry/' },
            { text: 'other', link: '/other/' }
        ],
        sidebarDepth: 3,
        lastUpdated: '最后更新于', // string | boolean

        sidebar: {
            '/html-css-js/': [
                '',
                'article/2022.1.13-good-html',
                'article/2022.1.16-0-base-front-end',
                'article/2022.1.17-css-layout',
                'article/2022.1.17-js-advanced'
            ],
            '/vue/': [
                {
                    title: "基础部分",
                    collapsable: false,
                    children: [
                        '',
                        'article/compare-vue2-and-vue3',
                        'article/use-v-model-in-diy-component',
                        'article/computed-watch',
                        'article/create-vue3-project',
                        'article/defineComponent',
                        'article/hook',
                        'article/life-cycle',
                        'article/new-compoent',
                        'article/reactive',
                        'article/readonly-shallowReadonly',
                        'article/ref',
                        'article/responsvie',
                        'article/setup-detail',
                        'article/setup',
                        'article/shallowReactive-shallowRef',
                        'article/toRaw-markRaw-toRef-customRef-provide-inject',
                        'article/toRefs',
                        'article/2022.1.11-vue3-todoList-summary'

                    ]
                },
                {
                    title: "练习部分",
                    collapsable: false,
                    children: [
                        'article/todoList-exercise'
                    ]
                }
            ],
            '/java/':[
                {
                    title:"基础",
                    collapsable:false,
                    children:[
                        '',
                        'article/1-day',
                        'article/2-day',
                        'article/3-day',
                        'article/4-day',
                        'article/5-day'
                    ]
                }
            ],
            '/uniapp/': [
                '',
                'article/2022.1.11-community-project-summary'
            ],
            '/sundry/': [
                '',
                'article/2022.1.12-big-error-in-sourceTree',
                'article/2022.1.24-read-book-meaning'
            ],
            '/other/': [
                '',
                'article/2022.1.7-self-closing',
                'article/2022.1.11-write',
                'article/2022.1.11-the-little-red-writing-book-exercise',
                'article/2022.1.12-my-and-other',
                'article/2022.1.14-if-she-is-better-than-me',
                'article/2022.1.15-but-she-not-love-you',
                'article/2022.1.20-how-speak-fluently',
                'article/2022.1.20-love-you-feel-sad',
                'article/2022.1.20-talk-show-wow'
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
