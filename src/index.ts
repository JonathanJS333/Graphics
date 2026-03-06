import { CanvasLocal } from './canvasLocal.js';

const canvas = document.getElementById('circlechart') as HTMLCanvasElement;
const graphics = canvas.getContext('2d') as CanvasRenderingContext2D;

const miCanvas:CanvasLocal = new CanvasLocal(graphics, canvas);

miCanvas.paint();