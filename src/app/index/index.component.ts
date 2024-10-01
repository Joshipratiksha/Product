import { Component } from '@angular/core';
import { PdfService } from '../pdf-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  showForm = false;
  product = {
    userName: '',
    hsnCode: '',
    costPrice: 0,
    quantity: 0,
    image: ''
  };
  products: any[] = [];

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    // Push the product details to the products array
    this.products.push({ ...this.product });
    
    // Reset the form
    this.product = {
      userName: '',
      hsnCode: '',
      costPrice: 0,
      quantity: 0,
      image: ''
    };
    
    // Hide the form
    this.showForm = false;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.product.image = e.target?.result as string; // Base64 string for image
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  }
}