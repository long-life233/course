module.exports = {
    title: '教程',
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'vue3', link: '/' },
            { text: 'blender', link: '/blender/' }
        ]
    },
    description: 'thunderpowers-course',// 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],// 浏览器标签的icon，/表示在public目录下去找
    ]
}