import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UsersProvider {

  constructor(public http: HttpClient,
              public db: AngularFireDatabase,
              public autentication: AngularFireAuth,
              public toastController: ToastController) {
  }

  inserir(dado){
    this.db.object('/teste').update({'dado': dado});
  }

  inserirDadosUser(user){
    try {
      this.db.object('/usuarios/' + user.id).update(user);
    } catch (error) {
      this.presentToast('Erro ao salvar os dados.')
    }
  }

  login(email, senha){
    return this.autentication.auth.signInWithEmailAndPassword(email, senha)

  }

  async cadastro(user){
    await this.autentication.auth.createUserWithEmailAndPassword(user.email, user.senha).then(userAuth => {
      delete user.senha;
      user.id = userAuth.uid;

      this.inserirDadosUser(user)
      this.presentToast('Cadastro criado com sucesso.')
    }).catch(error =>{
      this.presentToast('Erro ao criar o cadastro. Verifique email e senha.')
    })
  }

  recuperarSenha(email){
    return this.autentication.auth.sendPasswordResetEmail(email);
  }

  async presentToast( mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2200
    });
    toast.present();
  }

}
