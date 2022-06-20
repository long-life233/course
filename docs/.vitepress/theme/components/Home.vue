<script setup>
// import {useParticle} from '../hooks/useParticle.js'
// useParticle()
</script>
<template>
  <section id="hero">
    <h1 class="tagline">
      <span class="accent">记录</span>
      <br />东西
    </h1>

    <div class="actions">

      <a class="get-started" href="/vue/vue3-init-process  ">
        Get Started
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
          <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
        </svg>
      </a>
      <p class="description">打开微信扫一扫</p>
      <div style="display: flex;align-items:center;">
        <img style="margin-right:18px;" src="/public/qrcode.jpg" alt="" />
        <p class="description" style="color:#333 ;">模仿蔚来小程序</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
  section {
    padding: 42px 32px;
    position: fixed;
    width: 100vw;
  }

  #hero {
    padding: 96px 32px;
    text-align: center;
  }

  .tagline {
    font-size: 76px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    max-width: 960px;
    margin: 0px auto;
  }

  html:not(.dark) .accent,
  .dark .tagline {
    background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    max-width: 960px;
    line-height: 1.5;
    color: var(--vt-c-text-2);
    transition: color 0.5s;
    font-size: 22px;
    margin: 24px auto 40px;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .actions a {
    font-size: 16px;
    /* display: inline-block; */
    background-color: var(--vt-c-bg-mute);
    padding: 8px 18px;
    font-weight: 500;
    border-radius: 8px;
    transition: background-color 0.5s, color 0.5s;
  }

  .actions .get-started {
    /* position: absolute; */
    z-index: 999999;
    font-weight: 600;
    background-color: var(--vt-c-green);
    color: #fff;
    /* margin-right: 18px; */
  }

  .actions .icon {
    display: inline;
    position: relative;
    top: -1px;
    margin-left: 2px;
    fill: currentColor;
    transition: transform 0.2s;
  }

  .dark .actions .get-started {
    color: var(--vt-c-indigo);
  }

  .actions .get-started:hover {
    background-color: var(--vt-c-green-dark);
    transition-duration: 0.2s;
  }

  .actions .get-started:hover .icon {
    transform: translateX(2px);
  }

  .dark .actions .get-started:hover {
    background-color: var(--vt-c-green-light);
  }

  .actions .setup {
    color: var(--vt-c-text-code);
  }

  .actions .setup:hover {
    background-color: var(--vt-c-gray-light-4);
    transition-duration: 0.2s;
  }

  .dark .actions .setup:hover {
    background-color: var(--vt-c-gray-dark-3);
  }

  @media (max-width: 960px) {
    .tagline {
      font-size: 64px;
      letter-spacing: -0.5px;
    }

    .description {
      font-size: 18px;
      margin-bottom: 48px;
    }
  }

  @media (max-width: 768px) {
    .tagline {
      font-size: 48px;
      letter-spacing: -0.5px;
    }
  }

  @media (max-width: 576px) {
    #hero {
      padding: 64px 32px;
    }

    .description {
      font-size: 16px;
      margin: 18px 0 30px;
    }
  }

  @media (max-width: 370px) {
    .tagline {
      font-size: 36px;
    }
  }
</style>