import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any;
  email = '';
  senha  = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userServer: UsersProvider,
              public toastController: ToastController,
              public loadingCtrl: LoadingController,
              private storage: Storage) {
  }

  login(){
    this.email
    this.senha
    if(this.email == '')
    {
      this.presentToast('O campo email precisa ser preenchido.')
    }
    else if(this.senha == '')
    {
      this.presentToast('O campo senha precisa ser preenchido')
    }
    else{

      const loader = this.loadingCtrl.create({
        content: "Aguarde..."
      })
      loader.present();

      this.userServer.login(this.email, this.senha)
      .then(user => {
        loader.dismiss();

        this.storage.setItem('usuario', user.uid);
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        loader.dismiss();
        console.log("erro: ", error)
      })
    }
  }

  cadastro(){
    this.navCtrl.push('CadastroPage')
  }

  esqueciSenha(){
    this.navCtrl.push('RecuperarSenhaPage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async presentToast( mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2200
    });
    toast.present();
  }

}
