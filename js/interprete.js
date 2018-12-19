var codigo;
var lineas;
var consoleSim = document.getElementById("console-log");
var consoleExit = document.getElementById("code-exit");
var errores = [];

function prepararCodigo() {
    codigo = document.getElementById("code-behind").value;
    lineas = codigo.split("\n");
}

function validarSigno(instruccion) {
    var signo = instruccion.substr(0, 1);
    if ( signo == "+" || signo == "-") {
        return true;
    }
    else {
        return false;
    }
}

function registrarError(index, mensaje) {
    const error = {
        line: index + 1,
        error: mensaje 
    };
    errores.push(error);
}

function validarCodigoInstruccion(codigoInstruccion) {
    var codigos = [00,10,11,20,21,30,31,32,33,40,41,42,43];
    var busqueda = codigos.includes(parseInt(codigoInstruccion, 10));
    return busqueda;
}

function validarInstruccion(instruccion, index) {
    var tieneSigno = validarSigno(instruccion);
    if (instruccion.length == 5 && tieneSigno == true) {
        registrarError(index, "instruccion incompleta, dimension de palabra no apta.");
        return false;
    } 
    else if (instruccion.length == 5 && tieneSigno == false) {
        if (validarCodigoInstruccion(instruccion.substr(0,2))) {
            return true;
        }
        else {
            registrarError(index, "Codigo de Instruccion no valido");
            return false;
        }
    }
    else if (instruccion.length == 6 && tieneSigno == false) {
        registrarError(index, "instruccion incompleta, se detecto falta de signo, palabra excede dimension aceptada.");
        return false;
    }
    else if (instruccion.length == 6 && tieneSigno == true) {
        if (validarCodigoInstruccion(instruccion.substr(1,2))) {
            return true;
        }
        else {
            registrarError(index, "Codigo de Instruccion no valido");
            return false;
        }
    }

}


function validarLineas() {
    lineas.forEach((linea, index) => {
        if (linea.length < 5 || linea.length > 6) {
            registrarError(index, "instruccion no valida." );
        }
        else {
            validarInstruccion(linea, index);
        }
    });
}

function imprimirUbicacion(ubicacion) {
    ubicacion = ubicacion.toString();
    if (ubicacion.length == 1) {
        return "00" + ubicacion;
    }
    else if (ubicacion.length == 2) {
        return "0" + ubicacion;
    }
    else {
        return ubicacion;
    }
}

function ejecutarInstruccion(linea, instruccion, ubicacion) {
    switch (instruccion) {
        case 10: {
            //Lee
            memoria[ubicacion] = prompt("Ingrese valor:");
            consoleExit.value += "Instruccion " + linea + " lee " + memoria[ubicacion] + " en la ubicacion " + imprimirUbicacion(ubicacion) + ".\n";
            break;
        }
        case 11: {
            //Escribe
            consoleSim.value += "\n" + memoria[ubicacion];
            consoleExit.value += "Instruccion " + linea + " escribe el valor " + memoria[ubicacion] + " ubicado en " + imprimirUbicacion(ubicacion) + " en consola.\n";
            break;
        } 
        case 20: {
            //Carga
            acumulador = memoria[ubicacion];
            consoleExit.value += "Instruccion " + linea + " carga " + memoria[ubicacion] + " ubicado en " + imprimirUbicacion(ubicacion) + " dentro del acumulador.\n";
            break;
        }
        case 21: {
            //Almacena
            memoria[ubicacion] = acumulador;
            consoleExit.value += "Instruccion " + linea + " almacena " + acumulador + " en la ubicacion " + imprimirUbicacion(ubicacion) + ".\n";
            break;
        }
        case 30: { 
            //Suma
            acumulador = Number(acumulador) + Number(memoria[ubicacion]);
            consoleExit.value += "Instruccion " + linea + " suma " + memoria[ubicacion] + " ubicado en " + imprimirUbicacion(ubicacion) + " al acumulador y almacena en el acumulador.\n";
            break;
        }
        case 31: {
            //Resta
            acumulador = (Number(acumulador) - Number(memoria[ubicacion]));
            consoleExit.value += "Instruccion " + linea + " resta " + memoria[ubicacion] + " ubicado en " + imprimirUbicacion(ubicacion) + " al acumulador y almacena en el acumulador.\n";
            break;
        }
        case 32: {
            //Divide
            acumulador = Number(memoria[ubicacion]) / Number(acumulador);
            consoleExit.value += "Instruccion " + linea + " divide " + memoria[ubicacion] + " ubicado en " + imprimirUbicacion(ubicacion) + " entre el acumulador y almacena en el acumulador.\n";
            break;
        }
        case 33: {
            //Multiplica
            acumulador = Number(acumulador) * Number(memoria[ubicacion]);
            consoleExit.value += "Instruccion " + linea + " multiplica " + memoria[ubicacion] + " ubicado en " + imprimirUbicacion(ubicacion) + " por el acumulador y almacena en el acumulador.\n";
            break;
        }
        case 40: {
            //Bifurca
            pointer = ubicacion;
            consoleExit.value += "Instruccion " + linea + " bifurca hacia " + imprimirUbicacion(ubicacion) + ".\n";
            break;
        }
        case 41: {
            //Bifurcacion negativa
            if (acumulador < 0) {
                pointer = ubicacion;
                consoleExit.value += "Instruccion " + linea + " bifurca hacia " + imprimirUbicacion(ubicacion) + " por que el acumulador es negativo.\n";
            }
            else {
                consoleExit.value += "Instruccion " + linea + " bifurca hacia " + imprimirUbicacion(ubicacion) + " pero no se realizo la bifurcacion.\n";
            }
            break;
        }
        case 42: {
            //Bifurca 0
            if (acumulador == 0) {
                pointer = ubicacion;
                consoleExit.value += "Instruccion " + linea + " bifurca hacia " + imprimirUbicacion(ubicacion) + " por que el acumulador es 0.\n";
            }
            else {
                consoleExit.value += "Instruccion " + linea + " bifurca hacia " + imprimirUbicacion(ubicacion) + " pero no se realizo la bifurcacion.\n";
            }
            break;
        } 
        case 43: {
            //Alto
            pointer = 1000;
            consoleExit.value += "Instruccion " + linea + " finaliza la ejecucion.\n";
            break;
        }
        case 00: {
            //Limpia
            memoria[ubicacion] = '';
            consoleExit.value += "Instruccion " + linea + " limpia la ubicacion " + imprimirUbicacion(ubicacion) + ".\n";
            break;
        }
    }
}

function compilar() {
    var i = 0;
    lineas.forEach((linea, index) => {
        if (linea.length == 5) {
            linea = "+" + linea;
        }
        memoria[i] = linea;
        i++;
    });
    for (pointer; pointer < 1000; pointer++) {
        var instruccion = parseInt(lineas[pointer].substr(1,2), 10);
        var ubicacion = parseInt(lineas[pointer].substr(3,3), 10);
        ejecutarInstruccion(lineas[pointer], instruccion, ubicacion);
    }
}

function debugCode() {
    errores = [];
    prepararCodigo();
    validarLineas();
    consoleSim.value = "";
    if (errores.length == 0) {
        consoleSim.value = "Depuracion Exitosa!!! \nErrores: 0\nAlertas: 0";
    } 
    else {
        errores.forEach((error) => {
            consoleSim.value += "Linea " + error.line + ": " + error.error + "\n";
        });
    }    
}

function compilerCode() {
    debugCode();
    if (errores.length == 0) {
        compilar();
    }
    else {
        alert("No se puede compilar el codigo LMCC por que contiene errores, verifique la consola para corregirlos.");
    }
    pointer = 0;
    acumulador = 0;
    memoria = [1000];
}