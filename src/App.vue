<script setup lang="ts">
interface Histroy {
  count: number
  completedOrder: number
}

interface Result {
  count: number
  currentOrder: number
  completedOrder: number
}

let historyInfo = $ref('')

const files = $ref([])

const history: Histroy[] = localStorage.getItem('history')
  ? JSON.parse(localStorage.getItem('history')!)
  : []

const result: Histroy[] = localStorage.getItem('result')
  ? JSON.parse(localStorage.getItem('result')!)
  : { count: 0, completedOrder: 0, currentOrder: 1 }

let count = $ref(result.count)
let completedOrder = $ref(result.completedOrder)
let currentOrder = $ref(result.currentOrder)

window.addEventListener('keydown', (event) => {
  const key = Number(event.key)

  if (key >= 0 && key <= 9) {
    history.push({ count, completedOrder })

    completedOrder++
    currentOrder++
    count += key

    localStorage.setItem('history', JSON.stringify(history))
    localStorage.setItem('result', JSON.stringify({ count, currentOrder, completedOrder }))
  }

  if (event.key === 'Backspace') {
    redo()
  }
})

const clear = () => {
  localStorage.clear()
  count = 0
  currentOrder = 1
  completedOrder = 0
  history.length = 0
  historyInfo = ''
}

const redo = () => {
  if (history.length === 0) {
    return
  }

  const last = history.pop()!

  count = last.count
  completedOrder = last.completedOrder
  currentOrder = completedOrder + 1
  localStorage.setItem('history', JSON.stringify(history))
  localStorage.setItem('result', JSON.stringify({ count, currentOrder, completedOrder }))
}

const showHistory = () => {
  if (historyInfo) {
    historyInfo = ''
    return
  }

  const history = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')!) : []

  history.push({ count, completedOrder })

  historyInfo = JSON.stringify(history)

  historyInfo = historyInfo.replaceAll('completedOrder', '已完成题目').replaceAll('count', '已获得总分')
}
</script>

<template>
  <div class="app-container">
    <var-space>
      <var-button type="primary">已完成: {{ completedOrder }} 题</var-button>
      <var-button type="primary">正在处理: {{ currentOrder }} 题</var-button>
      <var-button type="primary">已获得: {{ count }} 分</var-button>
      <var-button type="warning" @click="redo">撤销</var-button>

      <var-button type="info" @click="showHistory">批改记录</var-button>
      <var-button type="danger" @click="clear">重置</var-button>
    </var-space>

    <div mt-4 style="font-size: 14px;">键盘 1 -> 9 打分, BackSpace 撤销一次操作</div>

    <div mt-2>
      <code>{{ historyInfo }}</code>
    </div>

    <var-uploader mt-4 hide-list v-model="files" />

    <var-space class="image-list" direction="column">
      <img v-for="f in files" class="image" :src="f.url">
    </var-space>
  </div>
</template>

<style lang="less">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  transition: background-color .25s;
  color: var(--color-text);
  background-color: var(--color-body);
}

.app-container {
  padding: 20px;
  min-height: 100vh;
}

.image-list {
  margin-top: 20px;
}

.image {
  width: 660px;
}
</style>
