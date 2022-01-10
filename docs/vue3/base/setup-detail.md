# setup细节
1. 在beforeCreate钩子之前执行；此时组件对象还没有创建

2. 不能使用this

3. 返回一个对象，模板可以直接使用对象里的第一层属性/方法

4. 不能是async函数；因为这会导致返回的对象是promise，使模板看不到对象中的属性数据

5. setup参数
    `setup(props,context) / setup(props,{attrs,slots,emit})`
    
    - props:组件选项中声明接收的props
    - attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
    - slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
    - emit: 用来分发自定义事件的函数, 相当于 this.$emit
    