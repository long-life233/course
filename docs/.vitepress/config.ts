import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '@vue/theme/config'
import type { Config } from '@vue/theme'
import { UserConfig } from 'vitepress'


export default defineConfigWithTheme<Config>({
    extends: baseConfig as () => UserConfig<Config>,
    title: '记录',
    lang: 'zh-CN',
    description: 'blog',
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
    ],
    // lastUpdated:true,
    
    themeConfig: {
        // sidebarDepth:2,
        nav: [
            { text: 'vue', activeMatch:`^/(vue)/`,link: '/vue/' },
            { text: 'html-css-js',activeMatch:`^/(html-css-js)/`, link: '/html-css-js/' },
            { text: 'java',activeMatch:`^/(java)/`, link: '/java/' },
            { text: 'uniapp',activeMatch:`^/(uniapp)/`, link: '/uniapp/' },
            { text: 'interview',activeMatch:`^/(interview)/`, link: '/interview/' },
            { text: 'sundry',activeMatch:`^/(sundry)/`, link: '/sundry/' },
            // { text: 'other', link: '/other/' }
        ],
        algolia: {
            indexName: 'cli_vuejs',
            apiKey: 'f6df220f7d246aff64a56300b7f19f21'
          },
        sidebar: {
            '/vue/': [
                {
                    text: "vue",
                    items: [
                        {
                            text: '资源',
                            link: '/vue/'
                        },
                        {
                            text: 'base',
                            link: '/vue/article/vue3'
                        },
                        {
                            text: 'vue随笔',
                            link: '/vue/article/vue2-3-essay'
                        },
                        {
                            text:"vue3大概初始化流程",
                            link:"/vue/article/vue3-init-process"
                        }
                    ]
                }
            ],
            '/html-css-js/': [
                {
                    text: "html-css-js",
                    items: [
                        {
                            text: "介绍",
                            link: '/html-css-js/',
                        },
                        {
                            text: "被低估的html",
                            link: '/html-css-js/article/2022.1.13-good-html',
                        },
                        {
                            text: "零基础入门前端",
                            link: '/html-css-js/article/2022.1.16-0-base-front-end',
                        },
                        {
                            text: "CSS布局",
                            link: '/html-css-js/article/2022.1.17-css-layout',
                        },
                        {
                            text: "样式相关",
                            link: '/html-css-js/article/2022.1.30-about-ui',
                        },
                        {
                            text: "我的html，css，和js",
                            link: '/html-css-js/article/my-html-css-js',
                        }
                    ]
                },

            ],
            '/java/': [
                {
                    text: "复习",
                    items: [
                        {
                            text: "介绍",
                            link: "/java/"
                        },
                        {
                            text: "第一天",
                            link: "/java/article/2022.2.4-one-day"
                        },
                        {
                            text: "第二天",
                            link: "/java/article/2022.2.4-two-day"
                        },
                        {
                            text: "面向对象编程（上）",
                            link: "/java/article/2022.2.4-face-object-pro-1"
                        },
                        {
                            text: "面向对象编程（中）",
                            link: "/java/article/2022.2.4-face-object-pro-2"
                        },
                        {
                            text: "面向对象编程（下）",
                            link: "/java/article/2022.2.4-face-object-pro-3"
                        },
                        {
                            text: "异常处理",
                            link: "/java/article/2022.2.4-resolve-exception"
                        }
                    ]
                }
            ],
            '/interview/': [
                {
                    text: "前端", items: [
                        { text: "介绍", link: '/interview/' },
                        { text: "前端面试常见问题", link: '/interview/faq' }
                    ]
                },

            ],
            '/other/': [
                {
                    text: "2021",
                    items: [
                        {
                            text: "dd",
                            link: "/other/2021/vedio_gongzhonghao_xiaohua_comment"
                        }
                    ]
                },
                {
                    text: "2022",
                    items: [
                        {
                            text: "介绍",
                            link: '/other/'
                        },

                        {
                            text: "自闭",
                            link: '/other/article/2022.1.7-self-closing'
                        },
                        {
                            text: "红色写字书练习",
                            link: '/other/article/2022.1.11-the-little-red-writing-book-exercise'
                        },
                        {
                            text: "练习写作",
                            link: '/other/article/2022.1.11-write'
                        },
                        {
                            text: "我和别人",
                            link: '/other/article/2022.1.12-my-and-other'
                        },
                        {
                            text: "假如她比我强",
                            link: '/other/article/2022.1.14-if-she-is-better-than-me'
                        },
                        {
                            text: "但她不喜欢你",
                            link: '/other/article/2022.1.15-but-she-not-love-you'
                        },
                        {
                            text: "如何流利的说话",
                            link: '/other/article/2022.1.20-how-speak-fluently'
                        },
                        {
                            text: "难受的爱",
                            link: '/other/article/2022.1.20-love-you-feel-sad'
                        },
                        {
                            text: "脱口秀",
                            link: '/other/article/2022.1.20-talk-show-wow'
                        },
                        {
                            text: "生理冲动",
                            link: '/other/article/2022.1.22-morning-body-impluse'
                        },
                        {
                            text: "我的talk-show",
                            link: '/other/article/2022.1.22-my-talk-show'
                        },
                        {
                            text: "离开她",
                            link: '/other/article/2022.1.26-i-decide-leave-she'
                        },
                        {
                            text: "又是伤心的一天",
                            link: '/other/article/2022.1.30-a-sad-day-again'
                        },
                        {
                            text: "如何不自卑",
                            link: '/other/article/2022.1.30-how-not-self-pity'
                        },
                        {
                            text: "把简单的事做复杂",
                            link: '/other/article/2022.2.3-make-easy-to-complex'
                        }
                    ]
                },

            ],
           
            '/uniapp/': [
                {
                    text: 'uniapp', items: [
                        { text: '介绍', link: '/uniapp/' },
                        {
                            text: 'uniapp仿糗事百科项目总结',
                            link: '/uniapp/article/2022.1.11-community-project-summary'
                        },
                        {
                            text: "uni-app结合云函数开发小程序博客",
                            link: '/uniapp/article/2022.1.29-UNI-App combined with cloud function development applet blog'
                        }
                    ]
                },

            ],
            '/sundry/': [
                {
                    text: "杂项",
                    items: [
                        {
                            text: '介绍',
                            link: '/sundry/'
                        },
                        {
                            text: "手写常见代码",
                            link: "/sundry/article/hand-common-code"
                        },
                        {
                            text: "webSocket实现简单的聊天室",
                            link: "/sundry/article/easy-chat-room"
                        },
                        {
                            text:"canvas实现粒子效果",
                            link:"/sundry/article/canvas-particle-effect"
                        },
                        {
                            text:"项目记录",
                            link:"/sundry/article/your-project-record"
                        },
                        {
                            text:"正则表达式",
                            link:"/sundry/article/regular-expression"
                        }
                    ]
                },

            ]
        }
    }
})

