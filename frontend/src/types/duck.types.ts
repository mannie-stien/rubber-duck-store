//the duck attributes
export type DuckColor = 'Red' | 'Green' | 'Yellow' | 'Black'; 
export type DuckSize = 'XLarge' | 'Large' | 'Medium' | 'Small' | 'XSmall';

export interface Duck {
  id: number;
  color: DuckColor;
  size: DuckSize;
  price: number;
  quantity: number;
  deleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Creating  duck payload
export type CreateDuckDto = {
  color: DuckColor;
  size: DuckSize;
  price: number;
  quantity: number;
};

// Update payload 
export type UpdateDuckDto = {
  price?: number;
  quantity?: number;
};
