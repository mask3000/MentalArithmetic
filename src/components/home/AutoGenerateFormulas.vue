<template>
  <div>
    <ElFormItem label="最大运算步骤">
      <el-radio-group v-model="formData.step" @change="changeStep">
        <el-radio-button v-for="o in stepOptions" :label="o.key" :disabled="o.disabled">{{ o.label }}</el-radio-button>
      </el-radio-group>
    </ElFormItem>

    <template v-for="item, index in formData.formulaList">
      <ElFormItem v-if="item.operators" :label="`第${index}步运算可能的符号（可多选）`" :prop="`formulaList.${index}.operators`"
        :rules="requiredRule">
        <el-checkbox-group v-model="item.operators">
          <el-checkbox v-for="o in operatorOptions" :label="o.key">{{ o.label }}</el-checkbox>
        </el-checkbox-group>
      </ElFormItem>

      <ElFormItem :label="`第${index + 1}项取值范围`">
        <ElRow :gutter="8">
          <ElCol :span="8">
            <ElFormItem :prop="`formulaList.${index}.min`" :rules="requiredNumberRule">
              <ElInput v-model.number="item.min">
                <template #prepend>最小</template>
              </ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem :prop="`formulaList.${index}.max`" :rules="requiredNumberRule">
              <ElInput v-model.number="item.max">
                <template #prepend>最大</template>
              </ElInput>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElFormItem>
    </template>

    <ElFormItem label="运算结果范围">
      <ElRow :gutter="8">
        <ElCol :span="8">
          <ElFormItem prop="resultMinValue"
            :rules="[{ required: true, message: '请填写运算结果最小值' }, { type: 'number', message: '请填写数字' }]">
            <ElInput v-model.number="formData.resultMinValue">
              <template #prepend>最小值</template>
            </ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem prop="resultMaxValue"
            :rules="[{ required: true, message: '请填写运算结果最大值' }, { type: 'number', message: '请填写数字' }]">
            <ElInput v-model.number="formData.resultMaxValue">
              <template #prepend>最大值</template>
            </ElInput>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElFormItem>

    <ElFormItem label="题目数量" prop="numberOfFormulas"
      :rules="[{ required: true, message: '请填写口算题数量' }, { type: 'number', message: '请填写数字' }]">
      <ElRow :gutter="20">
        <ElCol :span="14">
          <ElInput v-model.number="formData.numberOfFormulas">
            <template #prepend>数量</template>
          </ElInput>
        </ElCol>
      </ElRow>
    </ElFormItem>

    <ElFormItem label="其它">
      <ElButton @click="openOptionsDrawer">高级设置</ElButton>
      <ElButton @click="openOptionsLoad">本地配置</ElButton>
    </ElFormItem>

    <ElForm v-if="optionsLoadVisible"  :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
      <el-button @click="addConfiguration">保存当前配置</el-button>
      
      <ConfigurationList v-model:visible="optionsLoadVisible" 
          v-model:active-index="activeConfigurationId" :configurations="configurations"
          @removed="refreshConfiguration" @selected="selectedConfiguration" @reset="refreshConfiguration" />
    </ElForm>

    <ElFormItem>
      <ElButton type="success" @click="append">添加题目</ElButton>
      <ElButton type="danger" @click="clear">清空题目</ElButton>

    </ElFormItem>

    <OptionsDrawer v-model:visible="optionsDrawerVisible" v-model:formulasFormData="formData" />
  </div>
</template>

<script setup>
import { onMounted, computed, ref, unref, toRaw, getCurrentInstance } from 'vue';
import { v4 as uuidv4 } from "uuid";
import { cloneDeep } from "lodash";
import ConfigStorage from '@/utils/configStorage';
import { OptionsDrawer, ConfigurationList  } from "@/components/home";

const { proxy } = getCurrentInstance()



const props = defineProps({
  formulasFormData: {
    type: Object
  },
  papers: {
    type: Array
  },
  refForm: {
    type: Object
  },
  configurations: Array
})

const emit = defineEmits(['update:formulasFormData', 'update:papers'])

const formData = computed({
  get() {
    return props.formulasFormData
  },
  set(val) {
    emit('update:formulasFormData', val)
  }
})

const paperList = computed({
  get() {
    return props.papers
  },
  set(val) {
    emit('update:papers', val)
  }
})

const operatorOptions = [
  { key: 1, label: '+(加法)' },
  { key: 2, label: '-(减法)' },
  { key: 3, label: '×(乘法)' },
  { key: 4, label: '÷(除法)' }
]

const requiredRule = [
  { required: true, message: '此项为必填项' }
]
const requiredNumberRule = [
  { required: true, message: '此项为必填项' }, { type: 'number', message: '此项必须为数字' }
]


const stepOptions = computed(() => {
  // 多步运算时不能有余数
  const disabled = formData.value.remainder == '3'
  return [
    { key: '1', label: "一步", disabled: false },
    { key: '2', label: "两步", disabled },
    { key: '3', label: "三步", disabled }
  ]
})
const changeStep = (val) => {
  // 选择了新的几步运算后, 计算新值与旧值的差
  const difference = parseInt(val) - formData.value.formulaList.length + 1

  // 如果差是正数说明需要增加新的算数项,如果差是负数说明需要减去旧的算数项
  if (difference > 0) {
    for (let i = 1; i <= difference; i++) {
      formData.value.formulaList.push({ min: 1, max: 9, operators: [1] })
    }
  } else if (difference < 0) {
    formData.value.formulaList.splice(difference, Math.abs(difference))
  }
}

const optionsDrawerVisible = ref(false)
const openOptionsDrawer = () => {
  optionsDrawerVisible.value = true
}

const configurations = ref([])

const optionsLoadVisible = ref(false)
const openOptionsLoad = () => {
  optionsLoadVisible.value = !optionsLoadVisible.value
}

onMounted(async () => {
  refreshConfiguration()
  const { data: config } = configurations.value[0] // todo

  formData.value.step = config.step
  formData.value.numberOfFormulas = config.numberOfFormulas
  formData.value.whereIsResult = config.whereIsResult
  formData.value.enableBrackets = config.enableBrackets
  formData.value.carry = config.carry
  formData.value.abdication = config.abdication
  formData.value.remainder = config.remainder
  formData.value.solution = config.solution
  formData.value.numberOfPapers = config.numberOfPapers
  formData.value.numberOfPagerColumns = config.numberOfPagerColumns
  formData.value.paperTitle = config.paperTitle
  formData.value.paperSubTitle = config.paperSubTitle
  formData.value.formulaList = config.formulaList
  formData.value.resultMinValue = config.resultMinValue
  formData.value.resultMaxValue = config.resultMaxValue
  formData.value.fileNameGeneratedRule = config.fileNameGeneratedRule
})

const activeConfigurationId = ref('1')
const refreshConfiguration = () => {
  configurations.value = new ConfigStorage().loadAll()
}

const selectedConfiguration = (configuration) => {
  console.log(configuration);

  const { data: config } = configuration
  formData.value.step = config.step
  formData.value.numberOfFormulas = config.numberOfFormulas
  formData.value.whereIsResult = config.whereIsResult
  formData.value.enableBrackets = config.enableBrackets
  formData.value.carry = config.carry
  formData.value.abdication = config.abdication
  formData.value.remainder = config.remainder
  formData.value.solution = config.solution
  formData.value.numberOfPapers = config.numberOfPapers
  formData.value.numberOfPagerColumns = config.numberOfPagerColumns
  formData.value.paperTitle = config.paperTitle
  formData.value.paperSubTitle = config.paperSubTitle
  formData.value.formulaList = config.formulaList
  formData.value.resultMinValue = config.resultMinValue
  formData.value.resultMaxValue = config.resultMaxValue
  formData.value.fileNameGeneratedRule = config.fileNameGeneratedRule
}

const append = () => {
  props.refForm?.validate((valid) => {
    if (!valid) return

    const { step, numberOfFormulas, whereIsResult, formulaList, resultMinValue, resultMaxValue } = cloneDeep(toRaw(formData.value))
    paperList.value.push({
      step, numberOfFormulas, whereIsResult, formulaList, resultMinValue, resultMaxValue
    })
  })
}

const clear = () => {
  paperList.value = []
}

const addConfiguration = () => {
  props.refForm?.validate((valid) => {
    if (!valid) return

    proxy.$messageBox.prompt('请给配置起个名字', '提示', {
      inputPattern: /^\S{1,10}$/,
      inputPlaceholder: '不能多于10个字符',
      inputErrorMessage: '配置名字不能为空且不能多于10个字符'
    }).then(({ value }) => {
      if (props.configurations?.length >= 10) {
        proxy.$message.error('最多只能保存10份配置！')
        return
      }

      const newId = uuidv4()
      new ConfigStorage().save(newId, value, toRaw(unref(formData)))
      proxy.$message.success('保存成功!')
      //emit('add-configuration', newId)
      activeConfigurationId.value = newId
      refreshConfiguration()
    })
  })
}
</script>

<style lang="scss" scoped></style>