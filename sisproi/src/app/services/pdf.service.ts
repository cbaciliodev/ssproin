import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private _device: DeviceDetectorService) { }

  pdfViewer(docDefine: any) {
    let filename = `${Date.now()}.pdf`;

    if (this._device.isMobile() || this._device.isTablet()) {
      pdfMake.createPdf(docDefine).download(filename);
      return;
    }

    if (this._device.browser == 'IE' || this._device.browser == 'MS-Edge') {
      pdfMake.createPdf(docDefine).download(filename);
      return;
    }

    var win = window.open('', '_blank');
    pdfMake.createPdf(docDefine).open({}, win);
  }

}
