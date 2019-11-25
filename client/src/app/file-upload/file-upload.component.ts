import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AttachmentApi } from '../shared/sdk/services/index';
import { Attachment, Referral } from '../shared/sdk';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.sass']
})
export class FileUploadComponent {
  @Input() referral: Referral;
  @Input() purpose: string;
  @Output() fileChange = new EventEmitter<any>();

  constructor(
    private attachmentApi: AttachmentApi,
    private snackbar: MatSnackBar
  ) {}

  fileAdded(event: any) {
    event.addedFiles.forEach((file: File) => {
      const data = new FormData();

      data.append('file', file);
      data.append('referral', this.referral.id + '');

      switch (this.purpose) {
        case 'signature':
          this.uploadSignedDocument(data);

          break;

        default:
          this.uploadAttachment(data);
      }
    });

    event.rejectedFiles.forEach((file: File) => {
      this.snackbar.open(`L'ajout du fichier ${file.name} a échoué`, null, {duration: 2000});
    });
  }

  fileRemoved(file: Attachment) {
    this.attachmentApi.deleteById(file.id).subscribe(() => {
      switch (this.purpose) {
        case 'signature':
          this.referral.signedDocument = null;

          break;
        default:
          this.referral.attachments = this.referral.attachments.filter(attachment => file.id !== attachment.id);
      }

      this.fileChange.emit(this.referral);
    });
  }

  private uploadAttachment(data: FormData) {
    this.attachmentApi.upload(data, () => {}).subscribe(
      (attachment: Attachment) => {
        this.referral.attachments.push(attachment);

        this.fileChange.emit(this.referral);
      },
      error => {
        this.snackbar.open(`Une erreur s'est produite pendant l'ajout du fichier`, null, {duration: 2000});
      }
    );
  }

  private uploadSignedDocument(data: FormData) {
    this.attachmentApi.uploadSignedDocument(data, () => {}).subscribe(
      (attachment: Attachment) => {
        this.referral.signedDocument = attachment;

        this.fileChange.emit(this.referral);
      },
      error => {
        this.snackbar.open(`Une erreur s'est produite pendant l'ajout du fichier`, null, {duration: 2000});
      }
    );
  }
}
