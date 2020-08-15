; (function () {
    let myMap;

    const init = () => {
        myMap = new ymaps.Map("map", {
            center: [52.084031, 23.704438],
            zoom: 13,
            controls: []
        });


        const coords = [
            [52.088659, 23.704220],
            [52.086585, 23.685896],
            [52.090572, 23.696276],
            [52.076615, 23.723049,]
        ];


        const myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: 'img/marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-35, -52]
        });

        coords.forEach(coord => {
            myCollection.add(new ymaps.Placemark(coord));
        });

        myMap.geoObjects.add(myCollection);

        myMap.behaviors.disable('scrollZoom');
    }

    ymaps.ready(init);
})()
