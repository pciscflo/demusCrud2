import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Author } from 'src/app/model/authors';
import * as moment from 'moment';// add a mano
import { AuthorService } from 'src/app/service/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
  form : FormGroup = new FormGroup({});
  author : Author = new Author();
  mensaje : string = "";
  maxFecha: Date = moment().add(1, 'days').toDate();

  constructor(private authorService : AuthorService, private router: Router){

  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
          id : new FormControl(),
          nameAuthor : new FormControl(),
          emailAuthor: new FormControl(),
          birthDateAuthor : new FormControl()
      }
    );

  }

  aceptar(): void {
     this.author.id = this.form.value['id'];
     this.author.nameAuthor = this.form.value['nameAuthor'];
     this.author.emailAuthor = this.form.value['emailAuthor'];
     this.author.birthDateAuthor = this.form.value['birthDateAuthor'];
     if(this.form.value['nameAuthor'].length >0 &&
        this.form.value['emailAuthor'].length >0){
          //registrarlo en la base de  datos
          this.authorService.insert(this.author).subscribe(data =>
            this.router.navigate(['authors']).then(() => {
              window.location.reload();
            })
            )
        } else{
          this.mensaje = "Ingrese su email o name";
        }
  }

}
