import {
  LineaTicket,
  calculaLineaTicket,
  ResultadoLineaTicket,
  calcularPrecioConIva,
  TipoIva,
  TicketFinal,
  calculaTotalTicket,
} from "./main";

describe("calculaLineaTicket", () => {
  it("Deberia devolver una linea del ticket", () => {
    // Arrange
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
    ];

    const resultadoEsperado: ResultadoLineaTicket[] = [
      {
        nombre: "Legumbres",
        cantidad: 2,
        precioSinIva: 4,
        precioConIva: 4.84,
        tipoIva: "general",
      },
      {
        nombre: "Perfume",
        cantidad: 3,
        precioSinIva: 60,
        precioConIva: 72.6,
        tipoIva: "general",
      },
    ];

    // Act
    const resultado = calculaLineaTicket(productos);

    //Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it("Deberia devolver una linea del ticket", () => {
    // Arrange
    const productos: LineaTicket[] = [
      {
        producto: {
          nombre: "Leche",
          precio: 1,
          tipoIva: "superreducidoC",
        },
        cantidad: 4,
      },
      {
        producto: {
          nombre: "Lasaña",
          precio: 5,
          tipoIva: "superreducidoA",
        },
        cantidad: 3,
      },
    ];

    const resultadoEsperado: ResultadoLineaTicket[] = [
      {
        nombre: "Leche",
        cantidad: 4,
        precioSinIva: 4,
        precioConIva: 4,
        tipoIva: "superreducidoC",
      },
      {
        nombre: "Lasaña",
        cantidad: 3,
        precioSinIva: 15,
        precioConIva: 15.75,
        tipoIva: "superreducidoA",
      },
    ];

    // Act
    const resultado = calculaLineaTicket(productos);

    //Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});

describe("calcularPrecioConIva", () => {
  it("Debería devolver el precio total del producto con IVA general", () => {
    // Arrange
    const precio = 4;
    const tipoIva: TipoIva = "general";
    const resultadoEsperado: number = 4.84;

    // Act
    const resultado = calcularPrecioConIva(precio, tipoIva);

    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("Debería devolver el precio total del producto con IVA reducido", () => {
    // Arrange
    const precio = 7;
    const tipoIva: TipoIva = "reducido";
    const resultadoEsperado: number = 7.7;

    // Act
    const resultado = calcularPrecioConIva(precio, tipoIva);

    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("Debería devolver el precio total del producto con IVA superreducido A", () => {
    // Arrange
    const precio = 15;
    const tipoIva: TipoIva = "superreducidoA";
    const resultadoEsperado: number = 15.75;

    // Act
    const resultado = calcularPrecioConIva(precio, tipoIva);

    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("Debería devolver el precio total del producto con IVA superreducido B", () => {
    // Arrange
    const precio = 17;
    const tipoIva: TipoIva = "superreducidoB";
    const resultadoEsperado: number = 17.68;

    // Act
    const resultado = calcularPrecioConIva(precio, tipoIva);

    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("Debería devolver el precio total del producto con IVA superreducido C", () => {
    // Arrange
    const precio = 1.5;
    const tipoIva: TipoIva = "superreducidoC";
    const resultadoEsperado: number = 1.5;

    // Act
    const resultado = calcularPrecioConIva(precio, tipoIva);

    //Assert
    expect(resultado).toBe(resultadoEsperado);
  });
});

describe("calculaTotalTicket", () => {
  it("Debería calcular correctamente los totales y el desglose de IVA para el ticket", () => {
    // Arrange
    const lineasDeTicket: LineaTicket[] = [
      {
        producto: {
          nombre: "Libro de TypeScript",
          precio: 30,
          tipoIva: "general",
        },
        cantidad: 2,
      },
      {
        producto: {
          nombre: "Cuaderno",
          precio: 3,
          tipoIva: "reducido",
        },
        cantidad: 3,
      },
    ];

    const resultadoLineasTicket: ResultadoLineaTicket[] =
      calculaLineaTicket(lineasDeTicket);

    const resultadoEsperado: TicketFinal = {
      lineas: resultadoLineasTicket,
      total: {
        totalSinIva: 69, // 30 * 2 + 3 * 3
        totalConIva: 82.5, // (30 * 2 * 1.21) + (3 * 3 * 1.1)
        totalIva: 13.5, // totalConIva - totalSinIva
      },
      desgloseIva: [
        { tipoIva: "general", cuantia: 72.6 }, // 30 * 2 * 1.21
        { tipoIva: "reducido", cuantia: 9.9 }, // 3 * 3 * 1.1
      ],
    };

    // Act
    const resultado = calculaTotalTicket(resultadoLineasTicket);

    // Assert
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
});
