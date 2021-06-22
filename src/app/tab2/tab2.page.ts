import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar:string = '';
  peliculas: Pelicula[] = [];
  buscando = false;
  ideas: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'Matrix'];

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  buscar( event ) {
    // console.log(event)
    const valor:string = event.detail.value;

    if(valor.length === 0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.moviesService.buscarPeliculas(valor)
      .subscribe( resp => {
        // console.log(resp)
        // console.log(resp['results'])
        this.peliculas = resp['results']
        this.buscando = false;
      })
  }

  async detalle(id:string){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
