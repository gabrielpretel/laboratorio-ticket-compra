const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
];

export type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

export interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

export interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precioSinIva: number;
  tipoIva: TipoIva;
  precioConIva: number;
}

interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia: number;
}

interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}

// const calculaTicket = (lineasTicket: LineaTicket[]) => {
//   // 1.Calculamos la cantidad de un producto
//   lineasTicket.reduce((acc: number, linea: LineaTicket) => {});
// };

// calculamos todas las líneas del ticket

export const calculaLineaTicket = (
  lineas: LineaTicket[]
): ResultadoLineaTicket[] => {
  const resultadoLineasTicket = lineas.map((linea) => {
    const cantidad = linea.cantidad;
    const { nombre, precio, tipoIva } = linea.producto;
    const precioSinIva = precio * cantidad;
    const precioConIva = calcularPrecioConIva(precioSinIva, tipoIva);

    return {
      nombre: nombre,
      cantidad: cantidad,
      precioSinIva: precioSinIva,
      tipoIva: tipoIva,
      precioConIva: precioConIva,
    };
  });
  return resultadoLineasTicket;
};

export const calcularPrecioConIva = (precio: number, iva: TipoIva): number => {
  switch (iva) {
    case "general":
      return precio * 0.21 + precio;
    case "reducido":
      return precio * 0.1 + precio;
    case "superreducidoA":
      return precio * 0.05 + precio;
    case "superreducidoB":
      return precio * 0.04 + precio;
    case "superreducidoC":
      return precio;
    case "sinIva":
      return precio;
  }
};

console.log(calculaLineaTicket(productos));

const calculaTotalIva = (lineas: ResultadoLineaTicket[]): TotalPorTipoIva[] => {
  return lineas.reduce((acumulador, linea) => {
    // Encuentra el índice del tipo de IVA actual en el acumulador
    const indice = acumulador.findIndex(
      (item) => item.tipoIva === linea.tipoIva
    );
    if (indice === -1) {
      // Si no existe, lo añade al acumulador
      acumulador.push({
        tipoIva: linea.tipoIva,
        cuantia: linea.precioConIva,
      });
    } else {
      // Si ya existe, suma la cuantía
      acumulador[indice].cuantia += linea.precioConIva;
    }
    return acumulador;
  }, [] as TotalPorTipoIva[]);
};

console.log(calculaTotalIva(calculaLineaTicket(productos)));
