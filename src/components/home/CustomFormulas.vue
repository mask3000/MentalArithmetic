<template>
  <div>
    <p class="p-under">乘号、除号可以用
      <ElTag size="small">*</ElTag> 和 <ElTag size="small">/</ElTag> 代替。不需要写等号。
    </p>
    <ElFormItem v-for="item, index in formData.customFormulaList" :prop="`customFormulaList.${index}.formula`"
      :rules="requiredRule">
      <div class="flex items-center">
        <ElInput ref="refCustomFormulaInputs" v-model="item.formula" placeholder="例: 20*10"
          @keydown.enter.prevent="add(index)" />
        <el-icon v-show="formData.customFormulaList.length == (index + 1)" @click="add(index)">
          <CirclePlusFilled />
        </el-icon>
        <el-icon v-show="formData.customFormulaList.length > 1" @click="remove(index)">
          <RemoveFilled />
        </el-icon>
      </div>
    </ElFormItem>

    <ElFormItem>
      <el-button type="success" @click="append">添加题目</el-button>
      <el-button v-if="paperList.length" type="danger" @click="clear">清空题目</el-button>
    </ElFormItem>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';

const props = defineProps({
  formulasFormData: {
    type: Object
  },
  papers: {
    type: Array
  },
  refForm: {
    type: Object
  }
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

const requiredRule = [
  { required: true, message: '此项为必填项' }
]

const paperList = computed({
  get() {
    return props.papers
  },
  set(val) {
    emit('update:papers', val)
  }
})

const refCustomFormulaInputs = ref(null)
const add = (index) => {
  props.refForm?.validate((valid) => {
    if (!valid) return

    formData.value.customFormulaList.push({ formula: '' })
    nextTick(() => {
      refCustomFormulaInputs.value[index + 1].focus()
    })
  })
  return
}

const remove = (index) => {
  formData.value.customFormulaList.splice(index, 1)
}

const append = () => {
  const customFormulaList = formData.value.customFormulaList.reduce((prev, cur) => {
    if (cur.formula) {
      let formula = cur.formula.replace('*', 'x').replace('/', '÷').trim() + '='
      formula = formula.replace(/\s+/g, '');
      prev.push({ formula })
    }
    return prev
  }, [])

  paperList.value.push({ customFormulaList, numberOfFormulas: customFormulaList.length })
}

const clear = () => {
  paperList.value = []
}
</script>

<style lang="scss" scoped>
i {
  @apply text-xl ml-1;
}
</style>