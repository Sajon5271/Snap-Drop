import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css'],
})
export class GalleryCardComponent {
  @Input() preview!: File | string;
  @Input() imageForm!: FormGroup;
  @Input() formatOptions: string[] = ['4R', '6R', '8R', '10R'];
  @Input() disableOptions: boolean = false;
  @Input() optionsTitle = 'Format';

  @Output() deleteImage: EventEmitter<void> = new EventEmitter();

  filteredFormatOptions?: Observable<string[]>;

  constructor() {}
  ngOnInit() {
    if (this.disableOptions) this.imageForm.get('size')?.disable();
    this.filteredFormatOptions = this.imageForm.controls?.[
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

  removeImage() {
    this.deleteImage.emit();
  }
}
