import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private storage: firebase.storage.Storage;

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBLctU6o7IbP5438jndvN4TkXI9FKboQ6Q',
      authDomain: 'mendeia.firebaseapp.com',
      projectId: 'mendeia',
      storageBucket: 'mendeia.appspot.com',
      messagingSenderId: '350197284641',
      appId: '1:350197284641:web:808d030258804240d14860',
      measurementId: 'G-2JF71J1RZ0',
    };
    firebase.initializeApp(firebaseConfig);
    this.storage = firebase.storage();
  }

  uploadImage(file: File): Promise<string> {
    const storageRef = this.storage.ref();
    const imageRef = storageRef.child('imagens/' + file.name);
    return imageRef
      .put(file)
      .then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        console.log('Imagem enviada com sucesso!');
        return snapshot.ref.getDownloadURL();
      })
      .catch((error) => {
        console.error('Erro ao enviar a imagem:', error);
        throw error;
      });
  }
}
