/**
 * Servicio para la gestion de los eventos favoritos.
 */
services.service('FavoriteService', ['$localstorage', function ($localstorage) {

    /**
     * La lista de favoritos se implementa en base a $localstorage.
     * Hay un clave-valor para cada evento, que está puesto a 1 si está como favorito, 0 si no.
     * La clave es de forma 'fav'[id]
     * Además, para obtener rápidamente una lista de los favoritos, hay un par clave-valor
     * con clave 'favList', que es un array numérico cuyo valor es un número de evento.
     *
     */

    var self = this;

    //Añade como favorito un evento
    this.add = function (id) {
        //Se añade al almacen clave-valor
        $localstorage.set('fav' + id, 1);

        //Se añade a la lista
        var list = $localstorage.getObject('favList').list;
        list.push(id);
        $localstorage.setObject('favList', {
            list: list
        });

    };

    //Elimina el favorito de un evento
    this.remove = function (id) {
        //Se elimina del almacén clave-valor
        $localstorage.set('fav' + id, 0);

        //Se quita de la lista
        var list = $localstorage.getObject('favList').list;

        var indice = list.indexOf(id);
        if (indice > -1) {
            list.splice(indice, 1);
            $localstorage.setObject('favList', {
                list: list
            });
        }

    };


    //Devuelve si es favorito o no un cierto evento
    this.get = function (id) {

        var res = $localstorage.get('fav' + id, 0);
        if (res == 0 || res == "0") {
            return false;
        }
        else {
            return true;
        }

    };

    //Devuelve un array con los ids de los favoritos
    this.getList = function () {
        var obj = $localstorage.getObject('favList');
        return obj.list;
    }

}]);