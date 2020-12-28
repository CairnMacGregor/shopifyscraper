<template>
<section>
<div v-if= "!ScrapeData" class = "main_page">
  <h1>Welcome to ShopifyScraper</h1>
  <p class = "info">How to use:</p>
    <ul class = "how_to">
      <li>
        Find a store powered by shopify
      </li>
      <li>
        Copy the URL and paste into the search bar
      </li>
      <li>
        Either download all products info, or simply select the ones you wish to download
      </li>
    </ul>

   <form class = "form-inline"  v-on:submit.prevent="onSubmit">
         <div class="form-group mb-2">
             <input class="form-control form-control-md" 
                type="text"
                v-model="url" 
                id="url"
                placeholder="Enter URL here">
        </div>
         <div class="form-group mb-2">
                <input type="submit" value ="Submit" class = "btn btn-primary">
            </div>
      </form>


    </div>
  <div class = "Button_container">
     <div class = "downloadbtn" v-if="ScrapeData" >
         
          <button  v-on:click="NewSearch()" class = "btn btn-primary" >  Search for a new store</button>
      
      </div>
      <div class = "downloadbtn" v-if="ScrapeData" >
          <vue-json-to-csv
              :json-data="CSVData"
              :csv-title= "`${this.url}` + 'product' + '_' +'data' + '_' + 'CSV'"
          >
          <button class = "btn btn-primary" >Download all Data as CSV</button>
          </vue-json-to-csv>
      </div>

      <div class = "downloadbtn" v-if="CheckedCards.length > 0" >
          <vue-json-to-csv
              :json-data="CSVDataSelected"
              :csv-title= "'Selected_Products_From_' + `${this.url}`"
          >
          <button  class = "btn btn-primary" > Download selected as CSV</button>
          </vue-json-to-csv>
      </div>
  </div>

      <div class="ProductContainer" v-if="ScrapeData">
      <div v-for="(value, index) in ScrapeData.data.products"  
        v-bind:key="index">
        
            <div  class = "card">
              <input
               class = "checkmark"
              type= "checkbox" 
              v-model="CheckedCards" 
              :value= value
              v-on:change = DownloadSelected()
              >
              <p class = "Input-label">Add {{value.title}}To Download</p>
              <p>{{ index + 1}}</p>
              <img class = "card-img-top" :src="value.images[0].src" alt="">
              <div class="card-body">
               
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><p class = "card-text">{{value.title}}</p> </li>
                  <li v-if="value.variants[0].sku" class="list-group-item bg-success"><p class = "card-text" >SKU = {{value.variants[0].sku}}</p></li>
                  <li v-else class="list-group-item bg-danger"><p class = "card-text" >SKU = Product does not have an SKU 😔</p></li>
                  <li class="list-group-item"><span v-html = "value.body_html" ></span></li>
                </ul>
              </div>
            </div>
      </div>
      </div>

</section>
</template>


<script>
import axios from 'axios'
import VueJsonToCsv from 'vue-json-to-csv'


export default {
  data(){
    return{
      url: "",
      ScrapeData: "",
      JsonData: [],
      CSVData: [],
      CSVDataSelected:[],
      CheckedCards:[]
    }
  },
  components:{
    VueJsonToCsv
    },

methods:{
 async onSubmit(){
   this.ScrapeData = "",
   this.JsonData = [] 
   const res = await axios.get(`${this.url}` + "/products.json")
   this.ScrapeData = res,
   this.JsonData = res 

   for(var i = 0; i < this.JsonData.data.products.length; i++){
       this.CSVData.push({title: this.JsonData.data.products[i].title, id:this.JsonData.data.products[i].id});
     }
   }, 

    DownloadSelected(){
      this.CSVDataSelected = [] 

      for(var i = 0; i < this.CheckedCards.length; i++){
       this.CSVDataSelected.push({title: this.CheckedCards[i].title, id:this.CheckedCards[i].id});
     }
   }, 

   NewSearch(){
      this.ScrapeData = "",
      this.JsonData = [],
      this.CSVData = [],
      this.CSVDataSelected = [],
      this.CheckedCards = []
      this.url = ""
   }, 


   },

created(){
},
}
</script>

<style>
.main_page ul{
  list-style: none;
}

.info{
  font-size: 2rem;
}

.how_to{
  color:darkblue;
}

form{
  display: flex;
  justify-content: center;
  background: grey;
  padding: 5rem;
}

.downloadbtn{
  padding:0 1rem;
  margin: 2rem 0;
}

.Button_container{
   display: flex;
   justify-content:center;
   background: white;
  }

  
.ProductContainer{
  padding-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 10px;
    background: grey;
 }

input{
  width: 100%;
}
  .Input-label{
    font-size: 1rem;
  }

 </style>