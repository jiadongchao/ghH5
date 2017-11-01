
<template>
  <div class="coredeposits">
    <!-- <header><h4 class="main-content"><span>{{msg}}</span></h4> </header> -->
    <x-header :left-options="{backText: ''}">{{msg}}</x-header>  
    <div class="content">
      <div class="contenTitle">{{index}}</div>
      <div class="liDataNav" v-if="show">
        <span>{{table_titles[5].name}}</span>
        <span>{{table_titles[0].name}}</span>
        <span>{{table_titles[1].name}}</span>
        <span>{{table_titles[2].name}}</span>
        <span>{{table_titles[3].name}}</span>
        <span>{{table_titles[4].name}}</span>
      </div>
      <ul class="ulData">
          <li class="itemText flex" v-for='(item,index) in list_datas' :key='index'>            
              <span>{{item.ORG_NAME}}</span>
              <span>{{item.COMP_LAST_DAY_BAL}}</span>
              <span>{{item.COMP_LAST_MON_BAL}}</span>
              <span>{{item.COMP_LAST_YEAR_BAL}}</span>
              <span>{{item.COMP_YEAR_AMP_BAL}}</span>
              <span>{{item.DAY_BAL}}</span>
          </li>
      </ul>
    </div>      
  </div>
   
</template>

<script>
import { XHeader} from 'vux'
export default {
  data () {
    return {
      msg: '指标机构分解',
      title:"对公核心存款（利率口径）",
      show:false,

      // DetailUrl:'../../static/json/dghxckllkj.json',
      index:"",
      indexTitle:"",
      list_datas:[],
      table_titles:[],

      moduleTitle:this.$store.state.moduleTitle,
    }
  },
   components: {
    XHeader,
  },
  mounted(){    
    this.getDetail();
    
  },
  methods:{
    getDetail: function() {
      this.$http.get(this.moduleTitle).then(
        response => {        
              

        this.index = response.data.data.index;
        this.list_datas = response.data.data.list_datas;
        this.table_titles = response.data.data.table_titles;
        this.show = true;
        console.log(this.table_titles[0].name)
          //console.log(response.data.data.table_titles);  
        },
        error => {
          console.log(error);
        }
      );
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.vux-header{border-bottom: 0.02rem solid #b8b8b8;  margin-bottom: 0.1rem;background: #f8f8f8}
.vux-header .vux-header-title{color: #000 ;font-weight: 600 ;font-size:0.3rem;}
.vux-header .left-arrow:before{border: 1px solid #000;}

.content{
  padding: 0 0.1rem;
}  
.addUl{height: 2rem ;overflow: auto; background: #fff;width: 2rem; position: absolute;top: 1.8rem;}

.liDate{font-size:0.18rem}

.contenTitle{padding-left: 0.3rem; margin-bottom: 0.1rem;font-size: 0.26rem;  color: #faf8fb;background-image: linear-gradient(45deg, #713c9e, #fff); height: 0.5rem;line-height: 0.5rem;}
.itemText{font-size: 0.22rem; justify-content:space-around ; height: 0.66rem;line-height: 0.66rem;}
.itemText:nth-child(even){background: #f1f1f1}
.itemText span,.liDataNav span{display: inline-block;width: 0.9rem;text-align: center}


</style>

