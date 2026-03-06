import { CanvasLocal } from './canvasLocal.js';
const canvas = document.getElementById('circlechart');
const graphics = canvas.getContext('2d');
const miCanvas = new CanvasLocal(graphics, canvas);
miCanvas.paint();
