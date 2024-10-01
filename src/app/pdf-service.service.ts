// pdf.service.ts
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {}

  async generatePdf(product: any, image: string) {
    const pdf = new jsPDF();

    // Set the title
    pdf.setFontSize(20);
    pdf.text('Product Report', 10, 10);

    // Add the product information
    pdf.setFontSize(12);
    pdf.text(`User Name: ${product.userName}`, 10, 20);
    pdf.text(`HSN Code: ${product.hsnCode}`, 10, 30);
    pdf.text(`Cost Price: ${product.costPrice}`, 10, 40);
    pdf.text(`Quantity: ${product.quantity}`, 10, 50);

    // Add the image if it's available
    if (image) {
      const imgData = await this.getImageData(image);
      pdf.addImage(imgData, 'JPEG', 10, 60, 50, 50);
    }

    // Save the PDF
    pdf.save('product-report.pdf');
  }

  private getImageData(image: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL('image/jpeg');
        resolve(imgData);
      };
    });
  }
}
