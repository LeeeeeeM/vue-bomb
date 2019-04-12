<template>
  <div class="panel">
    <div class="container">
      <div class="list" v-for="(item, idx) in data.map" :key="idx">
        <span class="item" :key="idy" v-for="(it, idy) in item" @click="clickItem(idx, idy)" @contextmenu="menu(idx, idy, $event)">{{it.status}}</span>
      </div>
    </div>
    <div class="setting">
      <div>
        <div class="set-item">
          <span>设置行数</span><input type="number" @input="changeLines($event)" v-model="lines" placeholder="最大20行，最小5行">
        </div>
        <div class="set-item">
          <span>设置地雷数</span><input type="number" @input="changeBombs($event)" v-model="bombs">
        </div>
        <button @click="reset">绘制游戏地图</button>
        <button @click="reset">重置游戏</button>
      </div>
    </div>
  </div>
</template>

<script>
import { produceTdArray } from './util/index'

export default {
  data() {
    return {
      data: produceTdArray(10, 10),
      lines: 10,
      bombs: 10
    }
  },
  methods: {
    reset() {
      this.data = produceTdArray(this.lines, this.bombs)
    },
    changeLines(e) {
      const result = e.target.value
      const lines = Number(result)
      let newLines
      if (lines !== lines) {
        // NaN
        newLines = 0
      } else {
        newLines = lines
      }
      this.lines = Math.max(Math.min(newLines, 20), 5).toString()
    },
    changeBombs(e) {
      const result = e.target.value
      const bombs = Number(result)
      let newBombs
      if (bombs !== bombs) {
        // NaN
        newBombs = 0
      } else {
        newBombs = bombs
      }
      this.bombs = Math.max(Math.min(newBombs, this.lines ** 2), 1)
    },
    dealSelect(x, y) {
      let status = this.data.origin[x][y] === 1 ? '\u{1f4a3}' : this.data.counts[x][y].number || this.dealBlank(x, y)
      if (!Array.isArray(status)) {
        this.data.map[x][y].status = status
      } else {
        for (let i = 0; i < status.length; i++) {
          let temp = status[i]
          this.data.map[temp.x][temp.y].status = temp.number
        }
      }
      if (this.data.origin[x][y] === 1) {
        setTimeout(() => {
          alert(`真不幸，踩雷了`)
        })
      }
    },
    clickItem(x, y) {
      this.$nextTick(() => {
        this.dealSelect(x, y)
      })
    },
    menu(x, y, e) {
      e.preventDefault()
      this.data.map[x][y].status = '\u{26f3}'
    },
    dealBlank(x, y) {
      let result = []
      this.data.counts[x][y].visited = true
      result.push({
        x,
        y,
        number: this.data.counts[x][y].number
      })
      if (this.data.counts[x - 1] && this.data.counts[x - 1][y] && !this.data.counts[x - 1][y].visited) {
        result.push({
          x: x - 1,
          y,
          number: this.data.counts[x - 1][y].number
        })
        if (this.data.counts[x - 1][y].number === 0) {
          result = result.concat(this.dealBlank(x - 1, y))
        }
      }
      if (this.data.counts[x + 1] && this.data.counts[x + 1][y] && !this.data.counts[x + 1][y].visited) {
        result.push({
          x: x + 1,
          y,
          number: this.data.counts[x + 1][y].number
        })
        if (this.data.counts[x + 1][y].number === 0) {
          result = result.concat(this.dealBlank(x + 1, y))
        }
      }
      if (this.data.counts[x][y - 1] && !this.data.counts[x][y - 1].visited) {
        result.push({
          x,
          y: y - 1,
          number: this.data.counts[x][y - 1].number
        })
        if (this.data.counts[x][y - 1].number === 0) {
          result = result.concat(this.dealBlank(x, y - 1))
        }
      }
      if (this.data.counts[x][y + 1] && !this.data.counts[x][y + 1].visited) {
        result.push({
          x,
          y: y + 1,
          number: this.data.counts[x][y + 1].number
        })
        if (this.data.counts[x][y + 1].number === 0) {
          result = result.concat(this.dealBlank(x, y + 1))
        }
      }
      return result
    }
  }
}
</script>
<style >
@import './common/index.css';
</style>
