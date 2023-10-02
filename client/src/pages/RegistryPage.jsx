import { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
//import { useAuth } from "../context/authContext";
import {useRequests} from "../context/requestsContext"

function RegistryPage() {
  const { rutas, routesData } = useRequests();
  const [loading, setLoading] = useState(true); // Estado para controlar si los datos se están cargando o no

  useEffect(() => {
    // Realizar la solicitud de rutas solo una vez cuando el componente se monta
    rutas();
  }, []); // El arreglo de dependencias está vacío para asegurarse de que se ejecute solo una vez

  useEffect(() => {
    // Cuando se actualizan los datos de rutas (routesData),
    // cambiamos el estado de loading a false una vez que se reciben los datos
    if (routesData) {
      setLoading(false);
    }
  }, [routesData]);


  const columns = useMemo(
    () => [
      { Header: 'Fecha', accessor: 'fecha' },
      { Header: 'Ubicación', accessor: 'ubicacion' },
      { Header: 'En Ruta', accessor: 'en_ruta' },
      { Header: 'Estado', accessor: 'estado' },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (routesData) {
      return routesData.rutas.map((ruta) => ({
        fecha: ruta.fecha,
        ubicacion: ruta.ubicacion,
        en_ruta: ruta.ruta,
        estado:ruta.estado,
      }));
    }
    return [];
  }, [routesData]);

  const tableInstance = useTable({ columns, data: tableData });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div
      style={{
        padding: '1rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Registro de Rutas
      </h1>

      {/* Sección con los datos de cliente, pedido, contenedor, etc. */}
      {routesData && (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: 'bold' }}>Cliente: {routesData.rutas[0].cliente}</p>
          <p style={{ fontWeight: 'bold' }}>Pedido: {routesData.rutas[0].pedido}</p>
          <p style={{ fontWeight: 'bold' }}>Contenedor: {routesData.rutas[0].Contenedor}</p>
          <p style={{ fontWeight: 'bold' }}>Referencia: {routesData.rutas[0].referencia}</p>
          <p style={{ fontWeight: 'bold' }}>Candado: {routesData.rutas[0].candado}</p>
          <p style={{ fontWeight: 'bold' }}>Trayecto: {routesData.rutas[0].trayecto}</p>
          <p style={{ fontWeight: 'bold' }}>Destino: {routesData.rutas[0].destino}</p>
        </div>
      )}
      <table
        {...getTableProps()}
        style={{
          borderCollapse: 'collapse',
          width: '100%',
        }}
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`header-group-${index}`} // Agrega la propiedad "key" con un valor único
              style={{
                backgroundColor: '#f2f2f2',
              }}
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps()}
                  key={`header-${columnIndex}`} // Agrega la propiedad "key" con un valor único
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    textAlign: 'left',
                    color: 'black', // Añade el estilo color: 'black'
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id} // Agrega la propiedad "key" con un valor único
                style={{
                  backgroundColor: row.index % 2 === 0 ? '#f2f2f2' : 'white',
                }}
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    {...cell.getCellProps()}
                    key={`cell-${cellIndex}`} // Agrega la propiedad "key" con un valor único
                    style={{
                      border: '1px solid #ddd',
                      padding: '8px',
                      textAlign: 'left',
                      color: 'black', // Añade el estilo color: 'black'
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RegistryPage;
