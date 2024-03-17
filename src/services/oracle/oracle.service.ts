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

    return new Promise<string>((resolve, reject) => {
      const uploadTask = imageRef.put(file);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          reject(new Error('Erro ao enviar a imagem: ' + error.message));
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
}
