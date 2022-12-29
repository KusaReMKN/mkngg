'use strict';

class MKNG {
	// マップデータを Object オブジェクトで取得する
	static fetchMapData = async src => await (await fetch(src)).json();
	// 画像を読み込んで HTMLImageElement で取得する
	static readImage = async src => new Promise(r => {
		const img = new Image();
		img.addEventListener('load', () => r(img));
		img.src = src;
	});
	// HTMLImageElement からマップチップ配列を生成する
	static imageToMapChip = img => {
		const cv = document.createElement('canvas');
		const ctx = cv.getContext('2d');
		[ cv.width, cv.height ] = [ img.width, img.height ];
		if (cv.width !== 16) {
			console.warn('[MKNG.imageToMapChip]: width is not 16 pixel.');
			console.warn(img);
		}
		ctx.drawImage(img, 0, 0);
		const result = new Array();
		for (let i = 0; i < cv.height; i += 16)
			result.push(ctx.getImageData(0, i, 16, 16));
		return result;
	};
	// 開発用
	static dev = class MKNG_DEV {
		// <input type="file"> から DataURL を生成
		static fileToDataURL = async file => new Promise(r => {
			const reader = new FileReader();
			reader.addEventListener('load', () => r(reader.result));
			reader.readAsDataURL(file);
		});
		// ImageData から HTMLImageElement を生成する
		static imageDataToImage = async imgdata => new Promise(r => {
			const cv = document.createElement('canvas');
			const ctx = cv.getContext('2d');
			[ cv.width, cv.height ] = [ imgdata.width, imgdata.height ];
			ctx.putImageData(imgdata, 0, 0);
			const img = new Image();
			img.addEventListener('load', r(img));
			img.src = cv.toDataURL();
		});
	};
};
