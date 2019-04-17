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
  modifyData = new Array()
  obj = {
    revenue: '',
    timestamp: '',
    id: '',
    store: '',
    item: []
  }


  constructor(private service: ApiService) {
    this.getDataApi()
  }



  getDataApi = async () => {
    this.arrayData = await this.service.getData().then(data => data);
    await this.organizeCompra(this.arrayData.events)
    // await this.organizeCompraProduto(this.arrayData.events)
  }


  async organizeCompra(data) {
    data.filter((element, i) => {
      if (element.event === 'comprou') {
        this.obj.revenue = element.revenue;
        this.obj.timestamp = element.timestamp;
        element.custom_data.filter(data => {
          if (data.key === 'transaction_id') {
            this.obj.id = data.value;
          }
          if (data.key === 'store_name') {
            this.obj.store = data.value;
          }
        });
        this.modifyData.push(this.obj)
      }
    });
    console.log(': AppComponent -> organizeCompra -> this.modifyData', this.modifyData)
  }

  // async organizeCompraProduto(data) {
  //   let aux = data.filter((element, i) => {
  //     if (element.event === 'comprou-produto') {
  //       this.modifyData.forEach(data => {
  //         element.custom_data.filter(el => {
  //           if (el.value == data.id) {
  //             data.item.push(element.custom_data)
  //             console.log('ddfs', data)
  //             return data
  //           }
  //         });
  //       })
  //     }
  //   });
  //   console.log(': organizeCompraProduto -> aux', aux)
  // }
}
