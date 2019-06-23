// 
//  IMAGECOLLIDER.JS v0.1
//

const ImageCollider_defaultSize   = 256; // N x N canvas size
const ImageCollider_alphaTreshold = 16; // 0..255 combined alpha

class ImageCollider {

	constructor() {
		this.canvas = document.createElement('canvas');
		this.canvas.width = ImageCollider_defaultSize;
		this.canvas.height = ImageCollider_defaultSize;
		this.context = this.canvas.getContext("2d");	
	}

	draw(image, x, y, w, h, op) {
	    this.context.globalCompositeOperation = op;
	    this.context.drawImage(image, x, y, w, h, 0, 0, w, h);
	}

	overlappingRect(rectA, rectB) {
		let leftX = Math.max(rectA.x, rectB.x);
		let rightX = Math.min(rectA.x + rectA.w, rectB.x + rectB.w);
		let topY = Math.max(rectA.y, rectB.y);
		let bottomY = Math.min(rectA.y + rectA.h, rectB.y + rectB.h);
		let rect = { x: leftX, y: topY, w: rightX-leftX, h: bottomY-topY };
		return rect.x<0 || rect.y<0 || rect.w<=0 || rect.h<=0 ? null : rect;
	}

	collidePixels(imageA, xA, yA, imageB, xB, yB, rect) {
		this.context.clearRect(0,0, rect.w, rect.h);
	    this.draw(imageA, Math.max(xB-xA,0), Math.max(yB-yA,0), rect.w, rect.h, "xor");
	    this.draw(imageB, Math.max(xA-xB,0), Math.max(yA-yB,0), rect.w, rect.h, "destination-in");
	    let imageData = this.context.getImageData(0, 0, rect.w, rect.h);
	    for (let i=3; i<imageData.data.length; i+=4) {
	    	if (imageData.data[i] > ImageCollider_alphaTreshold) return true;
	    }
		return false;
	}

	collide(imageA, xA, yA, imageB, xB, yB) {
		let rectA = { x: xA, y: yA, w: imageA.width, h: imageA.height };
		let rectB = { x: xB, y: yB, w: imageB.width, h: imageB.height };
		let overlap = this.overlappingRect(rectA, rectB);
		return overlap ? this.collidePixels(imageA, xA, yA, imageB, xB, yB, overlap) : false;
	}
}
