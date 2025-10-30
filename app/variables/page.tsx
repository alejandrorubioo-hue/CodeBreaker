  let nombre: string = "Alejandro";
  let edad: number = 34;
  let activo: boolean = true;
  let cualquiera: any = "texto o número";
  let desconocido: unknown = 123; // requiere comprobación antes de usar

export default function Variables() {
  return (
    <ul className="space-y-1">
        <li>Nombre: {nombre}</li>
        <li>Edad: {edad}</li>
        <li>Activo: {activo ? "Sí" : "No"}</li>
        <li>Cualquiera: {cualquiera}</li>
        <li>Desconocido: {desconocido}</li>
    </ul>
  );
}