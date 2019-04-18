import { ApiService } from './api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'dito-desafio';

  arrayData
  storeData = []
  productData = []
  newArray = []

  auxObj = {
    name: '',
    price: ''
  }

  constructor(private service: ApiService) {
    this.getDataApi()
  }



  getDataApi = async () => {
    this.arrayData = await this.service.getData().then(data => data);
    await this.organizeLocal(this.arrayData.events)
    await this.organizeItem(this.arrayData.events)
    await this.organizeCompraProduto(this.storeData, this.productData)
  }


  async organizeLocal(data) {
    this.storeData = data.filter((element, i) => {
      if (element.event == 'comprou') {
        return element
      }
    });
  }


  async organizeItem(data) {
    this.productData = data.filter(element => element.event == 'comprou-produto')
  }

  async organizeCompraProduto(store, item) {

    let obj = [];
    this.newArray = store.filter(s => {

      s.items = []
      let storeId = this.getIdData('transaction_id', s)

      let store = this.getIdData('store_name', s);
      s.store = store[0].value

      item.forEach((i) => {

        let itemId = this.getIdData('transaction_id', i);

        if (itemId[0].value == storeId[0].value) {
          i.custom_data.forEach(element => {
            if (element.key == 'product_name') {
              i.product_name = element.value
            }
            if (element.key == 'product_price') {
              i.product_price = element.value
            }
          });
          s.items.push(i)
        }

      });
      this.newArray.push(s);
      return this.newArray;
    });
  }


  getIdData(item, data) {
    return data.custom_data.filter(data => data.key == item);
  }
}
