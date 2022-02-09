<template>
  <div></div>
</template>

<style scoped>
div{
    width: 100px; 
    height: 100px;
    border: 2px solid #000;
    /* 
    背景大小、
    背景是否重复、
    背景原点（左上角）位置(content-box,border-box,padding-box)、
    背景渐变、
    */
    background-size: 400% 100%;
    background-repeat: no-repeat;
    background-origin: padding-box;		
    background-image:linear-gradient(90deg, #ff0000 25%, #41d16a 37%, #ff0000 63%);;
    animation: 1.4s infinite ease skelttion; 
}

@keyframes skelttion {
    0% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}

@media (max-width: 960px) {

}

@media (max-width: 768px) {
  
}

@media (max-width: 576px) {
  
}

@media (max-width: 370px) {

}
</style>
