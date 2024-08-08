export interface Shape {
    type: 'square' | 'rectangle' | 'circle';
    x: number;
    y: number;
    size?: number; // Only for squares
    width?: number; // Only for rectangles
    height?: number; // Only for rectangles
    radius?: number; // Only for circles
    color: string;
  }
  
  export interface GardenLayout {
    shapes: Shape[];
  }