<template>
  <div class="page-container">
    <ElRow :gutter="20">
      <ElCol :xs="24" :sm="16" :md="16" :lg="12" :xl="8">
        <ElForm ref="refForm" :model="formData" label-position="top">
          <ElFormItem label="生成模式">
            <el-radio-group v-model="formData.generateMode">
              <el-radio-button label="1">自动生成</el-radio-button>
              <el-radio-button label="2">手动添加</el-radio-button>
            </el-radio-group>
          </ElFormItem>

          <template v-if="formData.generateMode == '1'">
            <AutoGenerateFormulas v-model:formulas-form-data="formData" v-model:papers="paperList" :ref-form="refForm" />
          </template>

          <template v-if="formData.generateMode == '2'">
            <CustomFormulas v-model:formulas-form-data="formData" v-model:papers="paperList" :ref-form="refForm" />
          </template>

          <template v-if="paperDescriptionList && paperDescriptionList.length">
            <ElFormItem label="当前试卷内容：">
              <div v-for="p in paperDescriptionList">
                <ElTag style="margin-right: 8px;">{{ p }}</ElTag>
              </div>
            </ElFormItem>
          </template>
        </ElForm>

        <el-button v-if="paperList.length" type="success" :loading="buttonLoading"
          @click="generate">预览</el-button>

      </ElCol>
    </ElRow>
  </div>
</template>

<script setup>
import { ref, onMounted, unref, toRaw, getCurrentInstance, computed } from 'vue';
import { useRouter } from "vue-router";
import { CustomFormulas, AutoGenerateFormulas, ConfigurationList } from "@/components/home";
import ConfigStorage from "@/utils/configStorage";
import { fileNameGeneratedRuleEnum, httpContentTypeExtensionsMappingEnum } from '@/utils/enum';
import { download } from "@/utils/download";
import { generatePaper } from '@/apis/paper';
import { useAppStore } from '@/stores/app';
import { createFormulasGenerator } from '@/utils/paperGenerator';

const { proxy } = getCurrentInstance()

const refForm = ref(null)

const formData = ref({
  step: '1', // 几步运算
  numberOfFormulas: 30, // 口算题数量
  whereIsResult: '0', // 题型设置
  enableBrackets: false, // 启用括号
  carry: '1',
  abdication: '1',
  remainder: '2',
  solution: '0', // 解题方式
  numberOfPapers: 2, // 试卷数量
  numberOfPagerColumns: 4, // 试卷列数
  paperTitle: '练习题', // 试卷标题
  paperSubTitle: '姓名：__________ 时间：________ ', // 试卷副标题
  // 试题格式
  // min 算数项最小值 max 算数项最大值 operators 与上一步算数项使用的运算符号
  // 第一个算数项由于没有上一步故设置为null
  formulaList: [
    { min: 1, max: 9, operators: null },
    { min: 1, max: 9, operators: [1] },
  ],
  resultMinValue: 1, // 试题运行结果最小值
  resultMaxValue: 9, // 试题运行结果最大值
  generateMode: '1',
  customFormulaList: [
    { formula: '' }
  ],
  fileNameGeneratedRule: fileNameGeneratedRuleEnum.baseOnTitleAndIndex.key
})



onMounted(async () => {
  document.title = '练习题'
})

const paperList = ref([])
const paperDescriptionList = computed(() => {
  return paperList.value.map(p => {
    return p.customFormulaList && p.customFormulaList.length ? `自定义口算题${p.numberOfFormulas}道` : `${p.step}步计算题口算题${p.numberOfFormulas}道`
  })
})

const buttonLoading = ref(false)
const appStore = useAppStore()
const router = useRouter()
const generate = () => {
  // 生成试卷数量不能过多
  const numberOfFormulas = paperList.value.reduce((prev, cur) => {
    prev += parseInt(cur.numberOfFormulas)
    return prev
  }, 0)

  if (numberOfFormulas * formData.value.numberOfPapers > 1000) {
    proxy.$message.error('题目总数不能超过1000题!')
    return
  }

  const papers = createFormulasGenerator(toRaw(unref(formData)), toRaw(unref(paperList)))
  appStore.navigateToPrint(router, formData.value.fileNameGeneratedRule == fileNameGeneratedRuleEnum.baseOnTitleAndIndex.key ? formData.value.paperTitle : "", papers)
  paperList.value = []
}
</script>

<style lang="scss" scoped></style>