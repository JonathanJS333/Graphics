export class CanvasLocal {
    private graphics: CanvasRenderingContext2D;
    private rWidth: number;
    private rHeight: number;
    private maxX: number;
    private maxY: number;
    private pixelSize: number;
    private centerX: number;
    private centerY: number;

    constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.graphics = g;
        this.rWidth = 12;
        this.rHeight = 8;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        // Ajustamos los centros para que la gráfica horizontal tenga espacio a la izquierda
        this.centerX = this.maxX / 10; 
        this.centerY = this.maxY / 10; 
    }

    iX(x: number): number { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y: number): number { return Math.round(this.centerY + y / this.pixelSize); }

    drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.stroke();
    }

    drawBarraHorizontal3d(x: number, y: number, ancho: number, alto: number, color: string) {
        this.graphics.fillStyle = color;
        this.graphics.strokeStyle = 'black';

        this.graphics.fillRect(this.iX(0), this.iY(y), this.iX(ancho) - this.iX(0), this.iY(alto) - this.iY(0));
        this.graphics.strokeRect(this.iX(0), this.iY(y), this.iX(ancho) - this.iX(0), this.iY(alto) - this.iY(0));

        this.graphics.beginPath();
        this.graphics.moveTo(this.iX(0), this.iY(y));
        this.graphics.lineTo(this.iX(0.5), this.iY(y - 0.3));
        this.graphics.lineTo(this.iX(ancho + 0.5), this.iY(y - 0.3));
        this.graphics.lineTo(this.iX(ancho), this.iY(y));
        this.graphics.closePath();
        this.graphics.fill();
        this.graphics.stroke();

        this.graphics.beginPath();
        this.graphics.moveTo(this.iX(ancho), this.iY(y));
        this.graphics.lineTo(this.iX(ancho + 0.5), this.iY(y - 0.3));
        this.graphics.lineTo(this.iX(ancho + 0.5), this.iY(y + alto - 0.3));
        this.graphics.lineTo(this.iX(ancho), this.iY(y + alto));
        this.graphics.closePath();
        this.graphics.fill();
        this.graphics.stroke();
    }

    maxH(h: number[]): number {
        let max = Math.max(...h);
        let pot = 10;
        while (pot < max) pot *= 10;
        pot /= 10;
        return Math.ceil(max / pot) * pot;
    }

paint(h: number[]) {
    let maxEsc = this.maxH(h);
    let colors = ['magenta', 'red', 'green', 'yellow', 'blue', 'orange', 'cyan'];
    this.graphics.clearRect(0, 0, this.maxX + 1, this.maxY + 1);


    this.graphics.strokeStyle = 'black';

    this.graphics.lineWidth = 2;
    this.drawLine(this.iX(0), this.iY(0), this.iX(8), this.iY(0));
    this.drawLine(this.iX(0),  this.iY(0), this.iX(0), this.iY(h.length * 1.2));

    let espaciado = 1.2;
    h.forEach((valor, index) => {
        let anchoBarra = (valor * 8) / maxEsc;
        let color = colors[index % colors.length];
        
        this.drawBarraHorizontal3d(0, index * espaciado + 0.5, anchoBarra, 0.8, color);
        
        this.graphics.fillStyle = "black";
        this.graphics.strokeText(valor.toString(), this.iX(anchoBarra + 0.7), this.iY(index * espaciado + 1));
    });
}
}