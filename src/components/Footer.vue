<template>
  <footer class="py-6 px-7 flex justify-center flex-wrap items-baseline">
    <template v-for="bind in bands">
      <p class="h-7">
        <a v-if="bind.link" :href="bind.link" target="_blank">
          <img :alt="bind.imageAlt" :src="bind.imageSrc" class="mr-2"/>
        </a>
        <img v-else :alt="bind.imageAlt" :src="bind.imageSrc" class="mr-2"/>
      </p>
    </template>

    <!--el-tooltip
        class="box-item"
        content="打赏"
        placement="top"
    >
    <el-button type="success" :icon="Coffee" size="large" circle @click="centerDialogVisible = true" class="coffee-me fixed right-5 inset-y-1/4 text-lg"/>
    </el-tooltip-->

    <el-dialog v-model="centerDialogVisible" title="打赏" width="30%" center>
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="center-text">微信支付</p>
          <div class="grid-content ep-bg-purple"/>
          <img src="@/assets/wx.png" alt="微信"></el-col>
        <el-col :span="12">
          <p class="center-text">支付宝支付</p>
          <div class="grid-content ep-bg-purple"/>
          <img src="@/assets/zfb.png" alt="支付宝"></el-col>
      </el-row>
      <div>
      </div>
    </el-dialog>

  </footer>
</template>

<script setup>
import {ref} from 'vue';
import {
  Coffee,
} from '@element-plus/icons-vue'

const centerDialogVisible = ref(false)

const bands = ref([
  {imageAlt: "license-Apache--2.0", imageSrc: "https://img.shields.io/badge/license-Apache--2.0-green"},
  {
    imageAlt: "",
    imageSrc: "https://img.shields.io/badge/Gitee--PrimarySchoolMathematics-red?logo=gitee",
    link: 'https://github.com/mask3000/MentalArithmetic'
  },
])
</script>

<style lang="scss" scoped>
footer {
  background: #f0f2f5;
}
.coffee-me{
  font-size: 18px;
}
.center-text {
  text-align: center;
}
</style>