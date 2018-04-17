function produceArray(numberOne, length) {
    var array = new Array(length);
    array.fill(0);
    var pos  = [];
    for (var i = 0; i< numberOne;) {
      var p = (length - 0) * Math.random() + 0 >> 0;
      if (pos.indexOf(p) < 0) {
        pos.push(p);
        i++;
      }
    }
    for (var i = 0; i < pos.length; i++) {
      array[pos[i]] = 1;
    }
    return array;
  }
  
  function produceTdArray(lines, numberOne) {
    var result = [];
    var map = [];
    var array = produceArray(numberOne, lines * lines);
    for (var i = 0; i < lines; i++) {
      result[i] = [];
      map[i] = [];
      for (var j = 0; j < lines; j++) {
        result[i].push(array[i * lines + j]);
        map[i].push({
          status: '\u{1f345}'
        });
      }
    }
    var counts = [];
    for (var i = 0; i < lines; i++) {
      counts[i] = [];
      for (var j = 0; j < lines; j++) {
        var number = 0;
        if (result[i] && result[i][j - 1]) {
          number++;
        }
        if (result[i] && result[i][j + 1]) {
          number++;
        }
        if (result[i - 1] && result[i - 1][j - 1]) {
          number++;
        }
        if (result[i - 1] && result[i - 1][j]) {
          number++;
        }
        if (result[i - 1] && result[i - 1][j + 1]) {
          number++;
        }
        if (result[i + 1] && result[i + 1][j - 1]) {
          number++;
        }
        if (result[i + 1] && result[i + 1][j]) {
          number++;
        }
        if (result[i + 1] && result[i + 1][j + 1]) {
          number++;
        }
        counts[i].push({
          number: number,
          visited: false
        });
      }
    }
    
    return {
      origin: result,
      counts: counts,
      map: map
    };
  }
  
  var data = produceTdArray(10, 10);
  
  /*
        <div class="list" v-for="(item, idx) in data.origin">
              <span class="item" v-for="(it, idy) in item">{{it}}</span>
          </div>
          <hr>
      <div class="list" v-for="(item, idx) in data.counts">
          <span class="item" v-for="(it, idy) in item">{{it.number}}</span>
      </div>
          <hr>
  */
  
  
  var a = new Vue({
    el: '#app',
    template: 
    `<div class="container">
      <div class="list" v-for="(item, idx) in data.map">
          <span class="item" v-for="(it, idy) in item" @click="clickItem(idx, idy)" @contextmenu="menu(idx, idy, $event)">{{it.status}}</span>
      </div>
    </div>`,
    data() {
      return {
              data: data
      };
    },
    methods: {
      clickItem(x, y) {
        this.$nextTick(() => {
          var status = this.data.origin[x][y] === 1 ? '\u{1f4a3}' : this.data.counts[x][y].number || this.dealBlank(x, y);
          if (!Array.isArray(status)) {
            this.data.map[x][y].status = status;
          } else {
            for (var i = 0; i < status.length; i++) {
              var temp = status[i];
              this.data.map[temp.x][temp.y].status = temp.number;
            }
          } 
        });
      },
      menu(x, y, e) {
        e.preventDefault();
        this.$nextTick(()=> {
          this.data.map[x][y].status = '\u{26f3}';
        })
      },
      dealBlank(x, y) {
        var result = [];
        this.data.counts[x][y].visited = true;
        result.push({
          x,
          y,
          number: this.data.counts[x][y].number
        });
              if (this.data.counts[x - 1] && this.data.counts[x - 1][y] && !this.data.counts[x - 1][y].visited) {
          result.push({
            x: x - 1,
            y,
            number: this.data.counts[x - 1][y].number
          });
          if (this.data.counts[x - 1][y].number === 0) {
            result = result.concat(this.dealBlank(x - 1, y));
          }
        }
        if (this.data.counts[x + 1] && this.data.counts[x + 1][y] && !this.data.counts[x + 1][y].visited) {
          result.push({
            x: x + 1,
            y,
            number: this.data.counts[x + 1][y].number
          });
          if (this.data.counts[x + 1][y].number === 0) {
            result = result.concat(this.dealBlank(x + 1, y));
          }
        }
        if (this.data.counts[x][y - 1] && !this.data.counts[x][y - 1].visited) {
          result.push({
            x,
            y: y - 1,
            number: this.data.counts[x][y - 1].number
          });
          if (this.data.counts[x][y - 1].number === 0) {
            result = result.concat(this.dealBlank(x, y - 1));
          }
        }
        if (this.data.counts[x][y + 1] && !this.data.counts[x][y + 1].visited) {
          result.push({
            x,
            y: y + 1,
            number: this.data.counts[x][y + 1].number
          });
          if (this.data.counts[x][y + 1].number === 0) {
            result = result.concat(this.dealBlank(x, y + 1));
          }
        }
        return result;
      }
    }
  });