import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GardenLayout, Shape } from './../models/GardenLayout'; // Adjust the path as needed

@Component({
  selector: 'app-garden-canvas',
  templateUrl: './garden-canvas.component.html',
  styleUrls: ['./garden-canvas.component.css']
})
export class GardenCanvasComponent implements OnInit, AfterViewInit {
  @Output() layoutChange = new EventEmitter<GardenLayout>(); // Add this output
  private canvas: HTMLCanvasElement | undefined;
  private ctx: CanvasRenderingContext2D | null | undefined;
  private shapes: Shape[] = [];
  private selectedShape: string | null = null;
  shapeColor: string = '#00FF00';
  shapeSize: number = 50;
  private isShapesRotated: boolean = false; // Track rotation state

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('gardenCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  selectShape(shape: string): void {
    this.selectedShape = shape;
    switch (shape) {
      case 'smallGreenSquare':
        this.shapeColor = '#00FF00';
        this.shapeSize = 50;
        break;
      case 'largeBlueRectangle':
        this.shapeColor = '#0000FF';
        this.shapeSize = 150;
        break;
      case 'largeBlueCircle':
        this.shapeColor = '#0000FF';
        this.shapeSize = 150;
        break;
      case 'smallBrownCircle':
        this.shapeColor = '#A52A2A';
        this.shapeSize = 50;
        break;
      case 'smallGrayRectangle':
        this.shapeColor = '#808080';
        this.shapeSize = 100;
        break;
    }
  }

  rotateShapes(): void {
    this.isShapesRotated = !this.isShapesRotated;
    this.redrawShapes();
  }

  redrawShapes(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
      this.shapes.forEach(shape => this.drawShape(shape));
    }
  }

  onCanvasMouseMove(event: MouseEvent): void {
    if (this.selectedShape && this.ctx) {
      const rect = this.canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
      this.shapes.forEach(shape => this.drawShape(shape));

      this.ctx.fillStyle = this.shapeColor;
      if (this.selectedShape === 'smallGreenSquare') {
        this.ctx.fillRect(x - this.shapeSize / 2, y - this.shapeSize / 2, this.shapeSize, this.shapeSize);
      } else if (this.selectedShape === 'largeBlueRectangle') {
        if (this.isShapesRotated) {
          this.ctx.fillRect(x - this.shapeSize / 2, y - this.shapeSize, this.shapeSize, this.shapeSize * 2);
        } else {
          this.ctx.fillRect(x - this.shapeSize, y - this.shapeSize / 2, this.shapeSize * 2, this.shapeSize);
        }
      } else if (this.selectedShape === 'largeBlueCircle') {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.shapeSize / 2, 0, 2 * Math.PI);
        this.ctx.fill();
      } else if (this.selectedShape === 'smallBrownCircle') {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.shapeSize / 2, 0, 2 * Math.PI);
        this.ctx.fill();
      } else if (this.selectedShape === 'smallGrayRectangle') {
        if (this.isShapesRotated) {
          this.ctx.fillRect(x - this.shapeSize / 5, y - this.shapeSize / 2, this.shapeSize / 2.5, this.shapeSize);
        } else {
          this.ctx.fillRect(x - this.shapeSize / 2, y - this.shapeSize / 5, this.shapeSize, this.shapeSize / 2.5);
        }
      }
    }
  }


  onCanvasClick(event: MouseEvent): void {
    if (this.selectedShape && this.ctx) {
      const rect = this.canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      let shape: Shape;
      switch (this.selectedShape) {
        case 'smallGreenSquare':
          shape = { type: 'square', x: x - this.shapeSize / 2, y: y - this.shapeSize / 2, size: this.shapeSize, color: this.shapeColor };
          break;
        case 'largeBlueRectangle':
          shape = { type: 'rectangle', x: x - this.shapeSize, y: y - this.shapeSize / 2, width: this.shapeSize * 2, height: this.shapeSize, color: this.shapeColor };
          break;
        case 'largeBlueCircle':
          shape = { type: 'circle', x, y, radius: this.shapeSize / 2, color: this.shapeColor };
          break;
        case 'smallBrownCircle':
          shape = { type: 'circle', x, y, radius: this.shapeSize / 2, color: this.shapeColor };
          break;
        case 'smallGrayRectangle':
          if (this.isShapesRotated) {
            shape = { type: 'rectangle', x: x - this.shapeSize / 5, y: y - this.shapeSize / 2, width: this.shapeSize / 2.5, height: this.shapeSize, color: this.shapeColor };
          } else {
            shape = { type: 'rectangle', x: x - this.shapeSize / 2, y: y - this.shapeSize / 5, width: this.shapeSize, height: this.shapeSize / 2.5, color: this.shapeColor };
          }
          break;
        default:
          return;
      }

      this.addShape(shape);
      this.layoutChange.emit({ shapes: this.shapes }); // Emit the layout change
    }
  }

  addShape(shape: Shape): void {
    if (!this.isOverlapping(shape)) {
      this.shapes.push(shape);
      this.drawShape(shape);
    }
  }

  isOverlapping(newShape: Shape): boolean {
    for (const shape of this.shapes) {
      if (this.checkOverlap(shape, newShape)) {
        return true;
      }
    }
    return false;
  }

  checkOverlap(shape1: Shape, shape2: Shape): boolean {
    if (shape1.type === 'circle' && shape2.type === 'circle') {
      return this.checkCircleCircleOverlap(shape1, shape2);
    } else if (shape1.type === 'rectangle' && shape2.type === 'rectangle') {
      return this.checkRectangleRectangleOverlap(shape1, shape2);
    } else if (shape1.type === 'square' && shape2.type === 'square') {
      return this.checkSquareSquareOverlap(shape1, shape2);
    } else if (shape1.type === 'circle' && shape2.type === 'rectangle') {
      return this.checkCircleRectangleOverlap(shape1, shape2);
    } else if (shape1.type === 'rectangle' && shape2.type === 'circle') {
      return this.checkCircleRectangleOverlap(shape2, shape1);
    } else if (shape1.type === 'circle' && shape2.type === 'square') {
      return this.checkCircleSquareOverlap(shape1, shape2);
    } else if (shape1.type === 'square' && shape2.type === 'circle') {
      return this.checkCircleSquareOverlap(shape2, shape1);
    } else if (shape1.type === 'rectangle' && shape2.type === 'square') {
      return this.checkRectangleSquareOverlap(shape1, shape2);
    } else if (shape1.type === 'square' && shape2.type === 'rectangle') {
      return this.checkRectangleSquareOverlap(shape2, shape1);
    }
    return false;
  }  checkCircleCircleOverlap(circle1: Shape, circle2: Shape): boolean {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius! + circle2.radius!;
  }

  checkRectangleRectangleOverlap(rect1: Shape, rect2: Shape): boolean {
    return !(rect2.x > rect1.x + rect1.width! ||
             rect2.x + rect2.width! < rect1.x ||
             rect2.y > rect1.y + rect1.height! ||
             rect2.y + rect2.height! < rect1.y);
  }

  checkSquareSquareOverlap(square1: Shape, square2: Shape): boolean {
    return !(square2.x > square1.x + square1.size! ||
             square2.x + square2.size! < square1.x ||
             square2.y > square1.y + square1.size! ||
             square2.y + square2.size! < square1.y);
  }

  checkCircleRectangleOverlap(circle: Shape, rect: Shape): boolean {
    const distX = Math.abs(circle.x - rect.x - rect.width! / 2);
    const distY = Math.abs(circle.y - rect.y - rect.height! / 2);

    if (distX > (rect.width! / 2 + circle.radius!)) { return false; }
    if (distY > (rect.height! / 2 + circle.radius!)) { return false; }

    if (distX <= (rect.width! / 2)) { return true; }
    if (distY <= (rect.height! / 2)) { return true; }

    const dx = distX - rect.width! / 2;
    const dy = distY - rect.height! / 2;
    return (dx * dx + dy * dy <= (circle.radius! * circle.radius!));
  }

  checkCircleSquareOverlap(circle: Shape, square: Shape): boolean {
    const distX = Math.abs(circle.x - square.x - square.size! / 2);
    const distY = Math.abs(circle.y - square.y - square.size! / 2);

    if (distX > (square.size! / 2 + circle.radius!)) { return false; }
    if (distY > (square.size! / 2 + circle.radius!)) { return false; }

    if (distX <= (square.size! / 2)) { return true; }
    if (distY <= (square.size! / 2)) { return true; }

    const dx = distX - square.size! / 2;
    const dy = distY - square.size! / 2;
    return (dx * dx + dy * dy <= (circle.radius! * circle.radius!));
  }

  checkRectangleSquareOverlap(rect: Shape, square: Shape): boolean {
    return !(square.x > rect.x + rect.width! ||
             square.x + square.size! < rect.x ||
             square.y > rect.y + rect.height! ||
             square.y + square.size! < rect.y);
  }

  drawShape(shape: Shape): void {
    if (this.ctx) {
      this.ctx.fillStyle = shape.color;
      if (shape.type === 'square') {
        this.ctx.fillRect(shape.x, shape.y, shape.size!, shape.size!);
      } else if (shape.type === 'rectangle') {
        this.ctx.fillRect(shape.x, shape.y, shape.width!, shape.height!);
      } else if (shape.type === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(shape.x, shape.y, shape.radius!, 0, 2 * Math.PI);
        this.ctx.fill();
      }
    }
  }

  loadGardenLayout(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const layout: GardenLayout = JSON.parse(e.target?.result as string);
        this.drawLayout(layout);
      };
      reader.readAsText(input.files[0]);
    }
  }

  drawLayout(layout: GardenLayout): void {
    if (this.ctx) {
      // Clear the canvas
      this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
      this.shapes = [];

      // Draw shapes based on the layout
      layout.shapes.forEach((shape: Shape) => {
        this.addShape(shape);
      });
    }
  }

  
}