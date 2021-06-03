import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { INTERVAL, TOASTR_DURATION, MIN_TOASTR_DURATION } from '../../constants';
import { HelperService } from '../../service/helpers/helper.service';
import { SendMessageResolverService } from './resolver/send-message-resolver.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit, OnDestroy {
  imgSrc: string = '/assets/images/image_placeholder.png';
  isSubmitted: boolean = false;
  getImageUrl: string;
  selectedImage: any = null;
  messageDisabled: boolean = false;
  messageDetails = [];
  isTableShow: boolean = false;
  messageText: string;
  codeText: string;
  userData: any;
  subscription: Subscription;
  twilioBalance: number;
  itemRef: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: HelperService,
    public db: AngularFireDatabase,
    private toastr: ToastrService,
    private resolverService: SendMessageResolverService,
    private storage: AngularFireStorage
  ) {
    this.itemRef = this.db.list('message_detail');
  }

  ngOnInit(): void {
    this.subscription = this.service.userDetails.subscribe(userData => this.userData = userData);
    console.log(this.userData);

    setInterval(() => this.getTwilioBalance(), INTERVAL);
    this.frameMessageForm.disable();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getTwilioBalance() {
    this.service.checkTwilioBalance().then(
      response => {
        this.twilioBalance = response.data.balance;
        if (this.twilioBalance < 3) {
          this.toastr.error('Your balance is very low.Please recharge your plan!', 'Error', {
            timeOut: TOASTR_DURATION,
          });
          this.frameMessageForm.disable();
          this.messageDisabled = false;
        }
      },
      error => {
        this.toastr.error(error, 'Error', {
          timeOut: TOASTR_DURATION,
        });
      }
    );
  }
  getMessageDetails() {
    this.isTableShow = true;
    this.itemRef.snapshotChanges().forEach(element => {
      element.forEach(element => {
        let message_det = element.payload.toJSON();
        this.messageDetails.push(message_det);
      });
    });
  }
  frameMessageForm = this.formBuilder.group({
    frameMessage: [null, [Validators.required]],
    frameCode: [null, [Validators.required]]
  });
  get frameMessageControl() {
    return this.frameMessageForm.controls;
  }
  useDetails(val) {
    const messageContent = this.messageDetails[val].message;
    this.frameMessageForm.controls.frameMessage.setValue(messageContent.split('Your ').pop().split(';')[0])
    this.frameMessageForm.controls.frameCode.setValue(messageContent.split('code is:')[1])
    this.frameMessageForm.enable();
    this.messageDisabled = true;
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
    this.itemRef.push(params).then(() => {
      this.toastr.success('Your message has been saved successfully.You can reuse the same message in future!', 'Success', {
        timeOut: MIN_TOASTR_DURATION,
      });
      this.frameMessageForm.reset();
      this.frameMessageForm.disable();
      this.messageDisabled = false;
    })
    this.resolverService.resolve(this.userData.length).then((res) => {
      this.toastr.success('Mail has been sent successfully', 'Success', {
        timeOut: MIN_TOASTR_DURATION
      })

    })
    for (let i = 0; i < this.userData.length; i++) {
      this.resolverService.resolveSendMessage(this.userData[i], i, params);
    }
  }
}
