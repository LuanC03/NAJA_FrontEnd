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

  @ViewChild('form', {static:false})
  form: NgForm

  item = new Item(null,'',null,'',null,'');
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
    }

  findByCategory(category:string) {
    this.itemService.findByCategory(category).subscribe((item: Item) =>{
      this.item = item;
    }, err =>{
      this.showMessage({
        type:'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register():void{
    this.message = {};
    this.itemService.createOrUpdate(this.item).subscribe((item: Item) =>{     
      let itemRet : Item = item;
      this.item = new Item(null,'',null,null,null,'');
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

  onFileChange(event):void{
    if(event.target.files[0].size > 2000000){
      this.showMessage ({
        type:'error',
        text: 'Maximum image size is 2 MB'
      })
    }else{
      this.item.image = '';      
      var reader = new FileReader();
      reader.onloadend = (e:Event) => {
        const csv: string | ArrayBuffer = reader.result;
        if (typeof csv === 'string') {
          this.item.image = csv;
        }else {
          this.item.image = csv.toString();
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }
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

  getFromGroupClass(isInvalid: boolean, isDirty):{}{
    return{
      'form-group': true,
      'has-error' : isInvalid && isDirty,
      'has-sucess' : !isInvalid && isDirty
    }
  }

  getFromGroupClass2(isInvalid: number, isDirty):{}{
    return{
      'form-group': true,
      'has-error' : isInvalid <=  0 && isDirty,
      'has-sucess' : isInvalid > 0 && isDirty
    }
  }
}
