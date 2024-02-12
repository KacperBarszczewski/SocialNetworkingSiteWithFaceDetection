import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  imageSrc: string | ArrayBuffer | null = '';

  constructor(private fb: FormBuilder) {}

  form = this.fb.nonNullable.group({
    image: [''],
    opis: ['', [Validators.required]],
  });

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.form.patchValue({ image: base64Image });
        
        this.imageSrc=base64Image;
      };
      reader.readAsDataURL(file);
    }
  }
}
