import React from 'react';

export default function Consulta({ rows, onVolver }) {
  console.log("Filas recibidas:", rows);

  return (
    <>
      {rows && (
        <div className="container table-responsive" style={{ marginTop: 80 }}>
          <h2 className="text-center">Reservas</h2>
          <table className="table table-bordered border-black border-opacity-50 table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" className="text-center">DNI</th>
                <th scope="col" className="text-center">Fecha Ingreso</th>
                <th scope="col" className="text-center">Fecha Salida</th>
                <th scope="col" className="text-center">Tipo Estadía</th>
                <th scope="col" className="text-center">Huéspedes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((reserva) => (
                <tr key={reserva.id}>
                  <td className="text-center">{reserva.Dni}</td>
                  <td className="text-center">{reserva.FechaIngreso}</td>
                  <td className="text-center">{reserva.FechaSalida}</td>
                  <td className="text-center">{reserva.TipoEstadia}</td>
                  <td className="text-center">{reserva.Huespedes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button className="btn btn-primary mb-3" onClick={onVolver}>
        Volver
      </button>
    </>
  );
}
