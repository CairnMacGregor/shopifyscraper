<template>
<section>

   <form class = "form-inline" v-on:submit.prevent="onSubmit">
         <div class="form-group mb-2">
             <label for="">Enter the URL </label>
             <input class="form-control form-control-md" 
                type="text"
                v-model="url" 
                id="url">
        </div>
         <div class="form-group mb-2">
                <input type="submit" value ="Submit" class = "btn btn-primary">
            </div>
          
      </form>
 
      <div class = "downloadbtn" v-if="ScrapeData">
        <button class = "btn btn-primary form-group mb-2 ml-2" v-on:click="JsonToCsv"></button>
          <button class = "btn btn-primary form-group mb-2 ml-2" v-on:click="download">
        
            {{JsonData.data.products[0].title}}
          <vue-json-to-csv v-if="ScrapeData"

          
          :json-data = [{title:[JsonData.data.products[0].title],id:[JsonData.data.products[0].id]}]
          :csv-title =" 'Shopify Scrape Data' + `${this.url}` ">
          </vue-json-to-csv></button>
          {{json-data}}
      </div>

 

      <div class="ProductContainer" v-if="ScrapeData">
      <div v-for="(value, index) in ScrapeData.data.products"  
        v-bind:key="index">
            <div v-if="value.variants[0].sku" class = "card">
              <img class = "card-img-top" :src="value.images[0].src" alt="">
              <div class="card-body">
               
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><p class = "card-text">{{value.title}}</p> </li>
                  <li class="list-group-item bg-success"><p class = "card-text">SKU = {{value.variants[0].sku}}</p>  </li>
                  <li class="list-group-item"><span v-html = "value.body_html" ></span></li>
                </ul>
              </div>
            </div>
            <div v-else class = "card">
              <img class = "card-img-top" :src="value.images[0].src" alt="">
              <div class="card-body">
                <ul class="list-group list-group-flush ">
                  <li class="list-group-item"><p class = "card-text">{{value.title}}</p> </li>
                  <li class="list-group-item card text-light bg-danger"><p class = "card-text">SKU = Product does not have an SKU 😔</p>  </li>
                  <li class="list-group-item"><p  class = "card-text">{{value.body_html}}</p></li>
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
      ScrapeData: "",
      JsonData: []
    }
  },
  components:{
    VueJsonToCsv
  },

methods:{
 async onSubmit(){
   const res = await axios.get(`${this.url}` + "/products.json")
   this.ScrapeData = res,
   this.JsonData = res  
   },

   JsonToCsv(){
    //  console.log(this.JsonData.data.products)
     for(var i = 0; i < this.JsonData.data.products.length; i++){
       console.log(this.JsonData.data.products)
      //  console.log({title: this.JsonData.data.products.title, id:this.JsonData.data.products.id})
     }
   }
  
},
created(){
},
}
</script>

<style>
form
{
  display: flex;
  justify-content: center;
  background: grey;
  padding: 5rem;
}

.downloadbtn{
  background: grey;
}

.ProductContainer{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 10px;
    background: grey;
 }
</style>