<template>
  <div class="home">
    <header><h4 class="main-content"><span>{{ name }}</span></h4> </header>   

    <div class="tools main-content">
      <div class="main-content time">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-calendar"></use>
        </svg>
        <group>
          <datetime v-model="value" @on-change="change" ></datetime>
        </group>
      </div>
      <div class="main-content branch">  
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-anzhuangweizhi"></use>
        </svg>
        <group>
          <popup-picker ref="picker3"  :display-format="format" @on-change="addChange(addSelected)" placeholder="光大银行总辖" :data="addList" :columns="2" ></popup-picker>
        </group>
      </div>      
    </div>

    <div class="content">
      <ul class="ulData">
        <li v-for='(item,index) in quota_group_data' :key='index' @click="goPath(item.index)">
          <table border="0"  cellspacing="0" >
            <tr><th colspan="5" >{{item.index}}{{item.unit}}</th></tr>
            <tr><td>{{item.table_titles[4].name}}</td><td>{{item.table_titles[0].name}}</td><td>{{item.table_titles[1].name}}</td><td>{{item.table_titles[2].name}}</td><td>{{item.table_titles[3].name}}</td></tr>
            <tr><td>{{item.list_datas.DAY_BAL}}</td><td>{{item.list_datas.COMP_LAST_DAY_BAL}}</td><td>{{item.list_datas.COMP_LAST_MON_BAL}}</td><td>{{item.list_datas.COMP_LAST_YEAR_BAL}}</td><td>{{item.list_datas.COMP_YEAR_AMP_BAL}}</td></tr>
          </table>
        </li>
      </ul>
    </div>
   
  </div>
</template>

<script>
import { Datetime, Group,Selector,PopupPicker,Cell} from "vux";

export default {
  name: 'home',
  components: {
    Datetime,
    Group,
    Selector,
    PopupPicker,
    Cell,
  },
  data() {
    return {
      name: "首页",
      value: "",
      listData:['guang','dfjdskjfskd'],
      //indexUrl:"http://www.easy-mock.com/mock/59e56da8f757730a12fcdf23/page/Home",
      indexUrl:'../../static/json/home.json',
      bankUrl:'../../static/json/bank.json',
      quota_group_data: [],
      parent_branch_name:[],
      Mechanism_tree:[],
    
      addSelect: '光大银行总辖',
      addSelected: [],
      addList:[],

      format: function (value, name) {
        var arr = name.split(" ")[1]
        // return `${name}:${name}`
        return `${arr}`
      },

      goModule:'',


    };
  },
  created() {
    this.showToday();
    this.getBank();
  },
  mounted() {
    this.getData();   
  },

  methods: {
    goPath(val){
      switch(val)
        {
        case "对公不良贷款余额":
          this.goModule = '../../static/json/dgbudkye.json'
          break;
        case "对公存款":
          this.goModule = '../../static/json/dgck.json'
          break;
        case "对公贷款":
          this.goModule = '../../static/json/dgdk.json'
          break;
        case "对公贷款(人民币)":
          this.goModule = '../../static/json/dgdkrmb.json'
          break; 
        case "对公贷款(外币)":
          this.goModule = '../../static/json/dgdkwb.json'
          break; 
        case "对公核心存款(利率口径)":
          this.goModule = '../../static/json/dghxckllkj.json'
          break; 
        case "对公主动负债":
          this.goModule = '../../static/json/dgzdfz.json'
          break;        
        case "贴现":
          this.goModule = '../../static/json/tx.json'
          break;        
        default:
          this.goModule = '../../static/json/dgck.json'
        }

      this.$store.state.moduleTitle = this.goModule;
      console.log(this.goModule)
    // "对公核心存款（利率口径）":

      this.$router.push({path:'/Coredeposits'})
    },
    change(value) {
      console.log("change", value);
    },
    addChange(aa){
      console.log(aa);      
    },
    showToday(value) {
      let now = new Date();
      let cmonth = now.getMonth() + 1;
      let day = now.getDate();
      if (cmonth < 10) cmonth = "0" + cmonth;
      if (day < 10) day = "0" + day;
      this.value = now.getFullYear() + "-" + cmonth + "-" + day;
    },
    getData: function() {
      this.$http.get(this.indexUrl).then(
        response => {
          this.quota_group_data = response.data.data[0].quota_group_data;
        },
        errot => {
          console.log(error);
        }
      );
    },
    getBank: function() {
      this.$http.get(this.bankUrl).then(
        response => {
          //console.log(response.data.data.Mechanism_tree);
          let addList = response.data.data.Mechanism_tree;
          let obj1 = {
            name:'光大银行总辖',
            value:'0000',
            parent:0
          }
          let obj2 = {
            name:'光大银行总辖',
            value:'0001',
            parent:'0000'
          }
          this.addList.push(obj1);
          this.addList.push(obj2);
          // this.valueDef.push(obj2.name);
          for(let i = 0;i<addList.length;i++ ){
            let obj = {
              name:addList[i].parent_branch_name,
              value:addList[i].parent_branch_id,
              parent:0
            }
            this.addList.push(obj);
            if(addList[i].Blanch.length == 0){              
              let obj = {
                name:addList[i].parent_branch_name,
                value:addList[i].parent_branch_id+' ',
                parent:addList[i].parent_branch_id
              }
              this.addList.push(obj)

            }else{
              for(let j=0;j<addList[i].Blanch.length;j++ ){           
                let obj = {
                  name:addList[i].Blanch[j].blanch_name,
                  value:addList[i].Blanch[j].blanch_id,
                  parent:addList[i].parent_branch_id
                }
                 this.addList.push(obj)             
              }              
            }           
          }
          //console.log(this.addList)
        },
        errot => {
          console.log(error);
        }
      );
    },


  }
};
</script>

 <style>
@import url("home.css");
</style>



