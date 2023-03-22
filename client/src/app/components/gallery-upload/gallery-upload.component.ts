import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { map, Observable, startWith, zip } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.css'],
})
export class GalleryUploadComponent {
  previews: { filename: string; data: File | string }[] = [];
  pictureData = this.fb.array<FormGroup>([]);

  applyToAllForm = this.fb.group({
    size: ['4R', Validators.required],
    copies: [1, Validators.required],
  });
  formatOptions: string[] = ['4R', '6R', '8R', '100R'];
  filteredFormatOptions?: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private cloudinary: CloudinaryService,
    private router: Router
  ) {}

  ngOnInit() {
    const inCart: {
      imageName: string;
      copies: number;
      size: string;
      remoteURL: string;
    }[] = JSON.parse(localStorage.getItem('userGalleryPictures') || '[]');
    inCart.forEach((el) => {
      this.previews.push({ filename: el.imageName, data: el.remoteURL });
      this.pictureData.push(
        this.fb.group({
          imageName: [el.imageName],
          copies: [el.copies, Validators.required],
          size: [el.size, Validators.required],
          remoteURL: [el.remoteURL],
        })
      );
    });
    this.filteredFormatOptions = this.applyToAllForm.controls?.[
      'size'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.formatOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  showPreview(event: Event) {
    const selectedFiles = (event.target as HTMLInputElement).files;
    // returns a file list
    if (selectedFiles && selectedFiles[0]) {
      const numberOfFiles = selectedFiles.length;
      for (let i = 0; i < numberOfFiles; ++i) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          let data = e.target.result;
          // base 64 url returned
          if (this.previews.some((el) => el.filename === selectedFiles[i].name))
            return;
          this.previews.push({ filename: selectedFiles[i].name, data });
          this.pictureData.push(
            this.fb.group({
              imageName: [selectedFiles[i].name],
              size: ['4R', Validators.required],
              copies: [1, Validators.required],
              remoteURL: [''],
            })
          );
        };
        reader.readAsDataURL(selectedFiles[i]);
      }
    }
  }

  handleSubmit() {
    const allSubscriptions: Observable<any>[] = [];
    for (let i = 0; i < this.previews.length; ++i) {
      allSubscriptions.push(
        this.cloudinary.cloudUpload(
          this.previews[i].data as File,
          this.previews[i].filename
        )
      );
    }
    const zipped = zip(...allSubscriptions);
    zipped.subscribe({
      next: (val) => {
        val.forEach((el: any, idx) => {
          this.pictureData.at(idx).patchValue({ remoteURL: el.secure_url });
        });
      },
      complete: () => {
        localStorage.setItem(
          'userGalleryPictures',
          JSON.stringify(this.pictureData.value)
        );
        this.router.navigate(['cart']);
      },
    });
  }

  removeImage(index: number) {
    this.previews = this.previews.filter(
      (el) => el.filename !== this.pictureData.at(index).value.imageName
    );
    this.pictureData.removeAt(index);
    if (!this.pictureData.length)
      localStorage.removeItem('userGalleryPictures');
  }
  applyToAll() {
    for (let i = 0; i < this.pictureData.length; i++) {
      this.pictureData.at(i).patchValue(this.applyToAllForm.value);
    }
  }
}
