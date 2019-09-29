import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/model/item.model';
import { SharedService } from 'src/app/services/shared.service';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {

  @ViewChild('form',null)
  form: NgForm

  item = new Item(null,'',null,'',null);
  shared :SharedService;
  message:{};
  classCss:{};
  constructor(
    private itemService : ItemService,
    private route: ActivatedRoute
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id : number = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id:number) {
    this.itemService.findById(id).subscribe((responseApi: Item) =>{
      this.item.id = responseApi.id;
      this.item.image = responseApi.image;
      this.item.name = responseApi.name;
      this.item.qtd_Stock = responseApi.qtd_Stock;
      this.item.value = responseApi.value;
    }, err =>{

    })
  }

  register(){
    this.message = {};
    this.itemService.createOrUpdate(this.item).subscribe((responseApi: Item) =>{
      this.item = new Item(null,'',null,'',null);
      let itemRet : Item = responseApi;
      this.form.resetForm();
      this.showMessage({
        type:'success',
        text:`Registered ${itemRet.name} successfully`
      });
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type:string, text: string}):void{
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(()=>{
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string):void{
    this.classCss = {
      'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }
}
