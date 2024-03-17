import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/storage';
import { firebaseConfig } from '../../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private storage: firebase.storage.Storage;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.storage = firebase.storage();
  }

  uploadFileFirebase(file: File): Promise<string> {
    const storageRef = this.storage.ref();
    const imageRef = storageRef.child(`files/${file.name}`);
    return imageRef
      .put(file)
      .then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .catch((error) => {
        throw new Error('Erro ao enviar a imagem: ' + error.message);
      });
  }
}
