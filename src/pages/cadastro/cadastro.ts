import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  nome = ''
  email = ''
  senha = ''

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userServer: UsersProvider,
              public auth: AngularFireAuth,
              public toastController: ToastController,
              public loadingCtrl: LoadingController) {
  }

  async cadastrar(){

    if( this.nome == '' )
    {
      this.presentToast('O campo nome precisa ser preenchido')
    }
    else
    {
      let user = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
      }
  
      const loader = this.loadingCtrl.create({
        content: "Aguarde..."
      })
      loader.present();

      try {
        this.userServer.cadastro(user);
        loader.dismiss();
        this.navCtrl.pop()
      } catch (error) {
        loader.dismiss();
        this.presentToast('Ocorreu um erro ao realizar o cadastro.')
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  async presentToast( mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2200
    });
    toast.present();
  }

}
