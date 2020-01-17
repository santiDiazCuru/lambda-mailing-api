# Lambdas hechas con node y typescript para el servicio de mailing de P5

## ¿Cómo funciona?

AWS no soporta typescript así que antes de hacer el deploy hay que transpilar todo a javascript. Los comandos más abajo mencionados lo hacen automáticamente. Primero, el flow de las funciones:

Hay un handler (una lambda) para cada ruta. Cuando el evento http llama a la función ocurren los siguientes pasos.

- Se llama al controlador para validar que el request contenga la info necesaria para llevar a cabo la acción. Si está todo bien se llama al modelo. En caso contrario se devuelve un mensaje de error con el código http correspondiente.

- El modelo se encarga de armar el html del email con la informacion proveniente del request y luego llama a mailgunRepository.

- Para mandar el mail, repository tiene una función que se llama asyncSendMail, que transforma la funcion que envía mails de mailgun-js en asíncrona con un bloque try catch. Por supuesto, esto devuelve un error si algo falla o un mensaje de éxito si el mail se envía correctamente.

El recorrido es simple pero hay un par de cosas a tener en cuenta.

Dentro de la carpeta dist se encuentra el código transpilado que viene de la carpeta src. Dist además tiene una carpeta que no se debe borrar ya que no viene de la transpilación que es la que contiene a los templates para los emails.

## RUTAS:

#### /landing

##### - /consulta

    Es un POST que debe tener los campos email, consulta y nombre, todos en string
    Se usa para las consultas básicas que llegan de la landing.

##### - /preinscripcion

    Es un POST que debe tener los campos email, consulta, nombre y curso, todos en string
    Además, curso solo puede ser "intro" o "bootcamp". De no ser así la ruta devuelve un 400
    Se usa para las preinscripciones al curso que indica el body del request.
