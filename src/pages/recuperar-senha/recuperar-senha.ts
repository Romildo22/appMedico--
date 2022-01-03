import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  email = ''

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userServer: UsersProvider,
              public toastController: ToastController,
              public loadingCtrl: LoadingController) {
  }

  recuperarSenha(){
    if(this.email == '')
    {
      this.presentToast('O campo email precisa ser preenchido.')
    }
    else{
      const loader = this.loadingCtrl.create({
        content: "Aguarde..."
      })
      loader.present();

      this.userServer.recuperarSenha(this.email)

      loader.dismiss
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarSenhaPage');
  }

  async presentToast( mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2200
    });
    toast.present();
  }

}
