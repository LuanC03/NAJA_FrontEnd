import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/item.model';
import { NAJA_API } from './naja.api';
import { Deal } from '../model/deal.model';

@Injectable()
export class ItemService {
  constructor(private http: HttpClient) { }

  createOrUpdate(item:Item){
    if(item.id != null){
      return this.http.put(`${NAJA_API}/item`, item);
    }else{
      item.id = null;
      return this.http.post(`${NAJA_API}/item/create`,item);
    }
  }

  findAll(){
    return this.http.get(`${NAJA_API}/item/`);
  }

  findByCategory(category:string){
    return this.http.get(`${NAJA_API}/item/category/${category}`);
  }

  findById(id:number){
    return this.http.get(`${NAJA_API}/item/id/${id}`);
  }

  decreaseQtdItem({ id, qtd }: { id: number; qtd: number; }){
    const deal = new Deal(id, qtd);    
    return this.http.put(`${NAJA_API}/item/decreaseQtdItem`,deal);
  }

  increaseQtdItem({ id, qtd }: { id: number; qtd: number; }){
    const deal = new Deal(id, qtd);    
    return this.http.put(`${NAJA_API}/item/increaseQtdItem`,deal);
  }

  delete(id:number){
    return this.http.delete(`${NAJA_API}/item/id/${id}`);
  }

}
