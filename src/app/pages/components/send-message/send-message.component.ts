import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { CommonService } from '../../CommonService';
import { SendMessageResolverService } from './send-message-resolver.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  imgSrc: string = '/assets/images/image_placeholder.png';
  isSubmitted: boolean = false;
  getImageUrl: string;
  selectedImage: any = null;
  messageDisabled: boolean = false;
  messageDetails = [];
  isTableShow: boolean = false;
  messageText: string;
  codeText: string;
  constructor(private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private service: CommonService,
    private activatedRoute: ActivatedRoute,
    private resolverService:SendMessageResolverService) { }

  ngOnInit(): void {
    this.frameMessageForm.disable();
  }
  frameMessageForm = this.formBuilder.group({
    frameMessage: [null, [Validators.required]],
    frameCode: [null, [Validators.required]]
  });
  get frameMessageControl() {
    return this.frameMessageForm.controls;
  }
  uploadImageForm = this.formBuilder.group({
    imageUrl: [null, [Validators.required]],
  });
  get uploadImageControl() {
    return this.uploadImageForm.controls;
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/images/image_placeholder.png';
      this.selectedImage = null;
    }
  }
  onSubmit() {
    this.isSubmitted = true;
    var filePath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.getImageUrl = url;
          this.resetForm();
          this.frameMessageForm.enable();
          this.messageDisabled = true;
        })
      })
    ).subscribe();
  }
  resetForm() {
    this.uploadImageForm.reset();
    this.uploadImageForm.setValue({
      imageUrl: ''
    });
    this.imgSrc = '/assets/images/image_placeholder.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
  sendMessage() {
    const messageText = `Your ${this.frameMessageForm.get('frameMessage').value}; code is:${this.frameMessageForm.get('frameCode').value}`;
    const params = {
      message: messageText,
      image: this.getImageUrl
    }
    this.service.addMessage(params);
    this.resolverService.resolve();
  }

  getMessageDetails() {
    this.isTableShow = true;
    this.service.getMessageList().snapshotChanges().forEach(element => {
      element.forEach(element => {
        let message_det = element.payload.toJSON();
        this.messageDetails.push(message_det);
      });
    });
  }
  useDetails(val) {
    const messageContent = this.messageDetails[val].message;
    this.frameMessageForm.controls.frameMessage.setValue(messageContent.split('Your ').pop().split(';')[0])
    this.frameMessageForm.controls.frameCode.setValue(messageContent.split('code is:')[1])
  }
}

