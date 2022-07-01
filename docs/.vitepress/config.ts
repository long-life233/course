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
            { text: 'Vue', activeMatch: `^/(vue)/`, link: '/vue/fly-card-component' },
            { text: 'JavaScript', activeMatch: `^/(js)/`, link: '/js/canvas-particle-effect' },
            { text: 'Sundry', activeMatch: `^/(sundry)/`, link: '/sundry/tailwind-css-record' },
        ],
        algolia: {
            indexName: 'cli_vuejs',
            apiKey: 'f6df220f7d246aff64a56300b7f19f21'
        },
        sidebar: {
            '/vue/': [
                {
                    text: "Vue",
                    items: [
                        {
                            text: 'fly-card-component',
                            link: '/vue/fly-card-component'
                        },
                        {
                            text: 'uniapp-project-record',
                            link: '/vue/uniapp-project-record'
                        },
                        {
                            text: 'uniapp-pull-refresh',
                            link: '/vue/uniapp-pull-refresh'
                        },
                        {
                            text: 'uniapp-vertical-nav-class',
                            link: '/vue/uniapp-vertical-nav-class'
                        },
                        {
                            text: 'uniCloud-course',
                            link: '/vue/uniCloud-course'
                        },
                        {
                            text: 'vue-problem-record',
                            link: '/vue/vue-problem-record'
                        },
                        {
                            text: 'vue-resource',
                            link: '/vue/vue-resource'
                        },
                        {
                            text: 'vue-responsive-data-implementation',
                            link: '/vue/vue-responsive-data-implementation'
                        },
                        {
                            text: 'vue-tips',
                            link: '/vue/vue-tips'
                        },
                        {
                            text: 'vue3-init-process',
                            link: '/vue/vue3-init-process'
                        }
                    ]
                }
            ],
            '/js': [
                {
                    text: 'JavaScript',
                    items: [
                        {
                            text: 'canvas-particle-effect',
                            link: '/js/canvas-particle-effect'
                        },
                        {
                            text: 'easy-chat-room',
                            link: '/js/easy-chat-room'
                        },
                        {
                            text: 'greedy-snake',
                            link: '/js/greedy-snake'
                        },
                        {
                            text: 'hand-common-code',
                            link: '/js/hand-common-code'
                        },
                        {
                            text: 'hand-write-promise',
                            link: '/js/hand-write-promise'
                        },
                        {
                            text: 'my-html-css-js',
                            link: '/js/my-html-css-js'
                        }
                    ]
                }
            ],
            'sundry': [
                {
                    text: 'Sundry',
                    items: [
                        {
                            text: 'hello-uniCloud',
                            link: '/sundry/hello-uniCloud'
                        },
                        {
                            text: 'interview-problem',
                            link: '/sundry/interview-problem'
                        },
                        {
                            text: 'live-play',
                            link: '/sundry/live-play'
                        },
                        {
                            text: 'nuxt-mini-program',
                            link: '/sundry/nuxt-mini-program'
                        },
                        {
                            text: 'python',
                            link: '/sundry/python'
                        },
                        {
                            text: 'quasar-record',
                            link: '/sundry/quasar-record'
                        },
                        {
                            text: 'read-interview',
                            link: '/sundry/read-interview'
                        },
                        {
                            text: 'regular-expression',
                            link: '/sundry/regular-expression'
                        },
                        {
                            text: 'remember',
                            link: '/sundry/remember'
                        },
                        {
                            text: 'resume',
                            link: '/sundry/resume'
                        },
                        {
                            text: "tailwind-css-record",
                            link: '/sundry/tailwind-css-record'
                        }
                    ]
                }
            ]
        }
    }
})

