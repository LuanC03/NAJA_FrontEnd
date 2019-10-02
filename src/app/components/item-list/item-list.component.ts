import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ItemService } from 'src/app/services/item.service';
import { DialogService } from 'src/app/dialog.service';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/model/responseApi.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  category = '';
  shared : SharedService;
  message:{};
  classCss:{};
  listItem: [];  

  constructor(
    private dialogService: DialogService,
    private itemService: ItemService,
    private router: Router
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.itemService.findAll().subscribe((response:Response) => {
      this.listItem = response['data']['content'];
    }, err =>{
        this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  categorySelector(): void{
    this.itemService.findByCategory(this.category).subscribe((responseApi:ResponseApi) =>{
      
    }, err => {
      this.showMessage({
        type:'error',
        text:err['error']['errors'][0]
      })
    })
  }

  edit(id:number){
    this.router.navigate(['/item-new', id]);
  }

  detail(id:number){
    this.router.navigate(['/ticket-detail', id]);
  }

  delete(id:number){
    this.dialogService.confirm(' Do you want to delete this item ?')
    .then((candelete:boolean) =>{
      if(candelete){
        this.message = {};
        this.itemService.delete(id).subscribe((responseApi:Response) => {
          this.showMessage({
            type: 'sucess',
            text: 'Item deleted'
          });
          this.findAll();
        }, err => {
          this. showMessage({
            type:'error',
            text: err['error']['errors'][0]
          });
        });
      }
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
