import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
declare var $: any;
import { CanvasWhiteboardComponent, CanvasWhiteboardOptions, CanvasWhiteboardUpdate, CanvasWhiteboardShapeService,
  CircleShape, RectangleShape  } from 'ng2-canvas-whiteboard';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public canvasOptions: CanvasWhiteboardOptions;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onImageLoaded = new EventEmitter<any>();
  imageUrl: string;
  public imagePath;
  imgURL: any;
  finalImgURL: any;
  public message: string;
  canvasboardFlag = false;
  priviewFlag = false;
  // constructor() { }
  constructor( private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService) {
    _canvasWhiteboardShapeService.unregisterShapes([CircleShape, RectangleShape]);
  }
  ngOnInit() {

    this.canvasOptions = {
      drawButtonEnabled: true,
      drawButtonClass: 'drawButtonClass',
      drawButtonText: 'Draw',
      clearButtonEnabled: true,
      clearButtonClass: 'clearButtonClass',
      clearButtonText: 'Clear',
      undoButtonText: 'Undo',
      undoButtonEnabled: false,
      redoButtonText: 'Redo',
      redoButtonEnabled: false,
      colorPickerEnabled: false,
      saveDataButtonEnabled: true,
      saveDataButtonText: 'Save',
      lineWidth: 2,
      strokeColor: 'rgb(0,0,0)',
      shouldDownloadDrawing: true,
      scaleFactor: 1,
      showShapeSelector: true,
      shapeSelectorEnabled: true,
      // drawingEnabled: true
    };


    let textover_api;

    // How easy is this??
    $('#target').TextOver({}, function() {
      textover_api = this;
    });

    $('#show').click(function () {
      let html = '';
      $.each(textover_api.getData(), function() {
        html += 'Text &raquo; ' + this.text + ' Left &raquo; ' + this.left + ' Top &raquo; ' + this.top + '<br />';
      });
      console.log(html);
      $('#data').html(html).show();
    });

  }


  preview(files) {
    if (files.length === 0) { return; }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.canvasboardFlag = true;
    // if (this.isCanvasOpened) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 1);
    // }


  }
  onCanvasDraw(updates: CanvasWhiteboardUpdate[]) {
    console.log(`Draw was called`, updates);
  }
  onCanvasClear(e) {
    console.log(`Clear was called`);
  }
  onCanvasUndo(e) {
    console.log(`Undo was called`);
  }
  onCanvasRedo(e) {
    console.log('redo was called');
  }
  onCanvasSave(saveEvent: CanvasWhiteboardUpdate[]) {
    console.log('Save was called', saveEvent);
    this.finalImgURL = saveEvent;
    this.canvasboardFlag = false;
    this.priviewFlag = true;
  }
  downloadImage() {
    console.log(this.finalImgURL);
    const byteCharacters = this.finalImgURL;
      const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    // console.log(atob(''));


    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], {'type': 'image/png'});

    if (navigator.msSaveBlob) {
      const filename = 'fichier';
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob);

      link.setAttribute('visibility', 'hidden');
      link.download = 'fichier';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  // loadImg(e) {
  //   console.log($('.imagemaps-wrapper'), e);
  //   $('.imagemaps-wrapper').imageMaps({
  //     addBtn: '.btn-add-map',
  //     rectWidth: 100,
  //     rectHeight: 100,
  //     areaHref: '.area-href',
  //     areaTarget: '.area-target',
  //     btnDelete: '.btn-delete',
  //     output: '.imagemaps-output',
  //     stopCallBack: (active, coords) => {
  //       console.log(active);
  //       console.log(coords);
  //     }
  //   });
  //   $('.btn-get-map').on('click', function () {
  //     let oParent = $(this).parent().parent().parent();
  //     let result = oParent.find('.imagemaps-wrapper').clone();
  //     result.children('div').remove();
  //     // console.log(result.html());
  //     alert(result.html());
  //   });
  // }
}

