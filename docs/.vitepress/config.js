module.exports = {
    title: '记录',
    lang: 'zh-CN',
    description: 'blog',
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
    ],
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
            '/html-css-js/':[
                {
                    text:"介绍",
                    link:'/html-css-js/',
                    collapsable: true
                },
                {
                    text:"被低估的html",
                    link:'/html-css-js/article/2022.1.13-good-html',
                    collapsable: true
                },
                {
                    text:"零基础入门前端",
                    link:'/html-css-js/article/2022.1.16-0-base-front-end',
                    collapsable: true
                },
                {
                    text:"CSS布局",
                    link:'/html-css-js/article/2022.1.17-css-layout',
                    collapsable: true
                },
                // {
                //     text:"JS进阶",
                //     link:'/html-css-js/article/2022.1.17-js-advanced',
                //     collapsable: true
                // },
            ],
            '/java/':[
                {
                    text:"介绍",
                    link:"/java/"
                },
                {
                    text:"第一天",
                    link:"/java/article/1-day"
                },
                {
                    text:"第二天",
                    link:"/java/article/2-day"
                },
                {
                    text:"面向对象编程（上）",
                    link:"/java/article/3-day"
                },
                {
                    text:"面向对象编程（中）",
                    link:"/java/article/4-day"
                },
                {
                    text:"面向对象编程（下）",
                    link:"/java/article/5-day"
                }
            ],
            '/other/':[
                {
                    text:"介绍",
                    link:'/other/'
                },
                {
                    text:"自闭",
                    link:'/other/article/2022.1.7-self-closing'
                },
                {
                    text:"红色写字书练习",
                    link:'/other/article/2022.1.11-the-little-red-writing-book-exercise'
                },
                {
                    text:"练习写作",
                    link:'/other/article/2022.1.11-write'
                },
                {
                    text:"我和别人",
                    link:'/other/article/2022.1.12-my-and-other'
                },
                {
                    text:"假如她比我强",
                    link:'/other/article/2022.1.14-if-she-is-better-than-me'
                },
                {
                    text:"但她不喜欢你",
                    link:'/other/article/2022.1.15-but-she-not-love-you'
                },
                {
                    text:"如何流利的说话",
                    link:'/other/article/2022.1.20-how-speak-fluently'
                },
                {
                    text:"难受的爱",
                    link:'/other/article/2022.1.20-love-you-feel-sad'
                },
                {
                    text:"脱口秀",
                    link:'/other/article/2022.1.20-talk-show-wow'
                },
                {
                    text:"生理冲动",
                    link:'/other/article/2022.1.22-morning-body-impluse'
                },
                {
                    text:"我的talk-show",
                    link:'/other/article/2022.1.22-my-talk-show'
                },
                {
                    text:"离开她",
                    link:'/other/article/2022.1.26-i-decide-leave-she'
                }
            ],
            '/vue/':[
                {
                    text:'介绍',
                    link:'/vue/'
                },
               {
                   text:'vue3',
                   link:'/vue/article/vue3'
               }
            ],
            '/uniapp/':[
                {text:'介绍',link:'/uniapp/'},
                {
                    text:'uniapp仿糗事百科项目总结',
                    link:'/uniapp/article/2022.1.11-community-project-summary'
                }
            ],
            '/sundry/':[
                {
                    text:'介绍',
                    link:'/sundry/'
                },
                {
                    text:'丢弃，sourceTree的重大失误',
                    link:"/sundry/article/2022.1.12-big-error-in-sourceTree"
                },
                {
                    text:"读计算机书籍的意义",
                    link:"/sundry/article/2022.1.24-read-book-meaning"
                }
            ]
        }
    }
}
