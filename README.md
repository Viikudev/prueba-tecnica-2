## LINK DE LA DEMO (DESPLIEGUE EN VERCEL)

https://prueba-tecnica-2-bice.vercel.app/

## INSTALACION

- Entrar al directorio en el que se desea guardar el proyecto y ejecutar el siguiente comando en la terminal
```bash
git clone https://github.com/Viikudev/prueba-tecnica-2.git
```

Nota: Instalar Node en caso de no estar instalado https://nodejs.org/en

- Ingresar a la carpeta del proyecto copiado y ejecutar el comando:
```bash
npm run dev
```

- Ingresar a la url que devuelve la terminal para visualizar la aplicacion en el navegador. Usualmente es http://localhost:3000

- Para realizar los test se debe ejecutar el siguiente comando en la consola:
```bash
npm test
```

## DECISIONES TECNICAS DESTACABLES

- Contexto global utilizando Context API
Para compartir los datos alojados en el localStorage con los distintos componentes sin provocar lo que se conoce como "Prop Drilling", se creo un
contexto el cual contiene los datos de los productos almacenados, luego se envuelve la aplicacion con un provider para mantener el contexto tanto en
el formulario como en la lista de productos.

- Uso de Shadcn
Shadcn es una libreria de componentes que agiliza es desarrollo debido a que posee componentes sumamente utiles para gran variedad de aplicaciones,
para este caso lo mas importante fue utilizar el componente de Form, el cual se utiliza junto con una libreria muy utilizada llamada React Hook Forms,
gracias a esto se pueden crear formularios robustos que ademas se actualizan en tiempo real para informarle al usuario si esta introduciendo datos correctamente

- Hook personalizado "useProducts"
Dentro del contexto se creo un hook para trabajar con los productos de una manera mas legible, este hook nos permite modificar el estado de los productos ya sea,
agregando un nuevo producto (addProducto), eliminando un producto de la lista (deleteProduct) o simplemente obteniendo la lista de productos para realizar cualquier
otra accion necesaria

## POSIBLES MEJORAS

- Agregar loader
Agregar una pantalla que le indique al usuario que se estan obteniendo los datos para mostrarlos en pantalla, esto ayuda a la retencion del usuario y que no piense
que la aplicacion se ha quedado estancada. Un loader muy recomendable para galerias es el Esqueleto, que proporciona un template de como se veria la aplicacion con
los datos cargados

