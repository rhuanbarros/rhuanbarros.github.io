jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers 2
    
    var markers = [
        ['Restaurante de Café colonial', -29.361614,-50.856995],
        ['Prática de Rafting', -29.415831,-50.769464],
        ['Caniôn Itaimbézinho', -29.166287,-50.096313],
        ['Cultura Gaúcha: Expointer', -29.854272, -51.180743],
        ['Vinícolas', -29.182822, -51.582536]
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Restaurante Café Colonial Bela Vista</h3>' +
        '<p>Um dos mais tradicionais cafés colnial do Estado. Fundado em 1973, o Bela Vista é o primeiro café colonial do Brasil. As vistas desse lugar único e a influência dos colonizadores alemães e italianos inspiraram Dona Lira Caliari, a primeira doceira do Bela Vista, a criar diversas receitas que tem o gosto de uma tradição, passada de geração em geração.</p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Prática de Rafting: Parque das Laranjeiras</h3>' +
        '<p>O Parque das Laranjeiras localiza-se no município de Três Coroas, em um ponto de Mata Atlântica preservada.Cortando essa mata, o Rio Paranhana apresenta corredeiras de nível II e III, ideais para a prática de esportes de aventura como canoagem, rafting e duck.O relevo acidentado do local também possibilita a prática de outras atividades, destacando-se rapel, tirolesa, trekking, mountain bike down hill e cross country.O Parque das Laranjeiras é considerado um dos maiores centros de aventura do sul do país, já tendo sediado campeonatos mundiais e nacionais de canoagem e moutain bike.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Caniôn Itaimbézinho</h3>' +
        '<p>Está localizado entre Cambará do Sul e Praia Grande, no Parque Nacional dos Aparados da Serra, a 18 Km da sede do município. Sua profundidade máxima é de 720m. As paredes de cor amarelada e avermelhada são cobertas, de ponto em ponto, por vegetação baixa. Ao redor do cânion os pinheiros nativos completam a paisagem.</p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Cultura Gaúcha: Expointer</h3>' +
        '<p>O chimarrão é a bebida oficial, a erva-mate é a árvore símbolo do Rio Grande do Sul, e a eles está reservado um espaço nobre na 37ª Expointer - o chimarródromo, implantado pela Fundação Instituto Gaúcho da Tradição e Folclore. No local, o público encontra água, erva, cuia e orientações variadas a respeito da história da bebida, além de sala de reuniões e refeitório onde são preparadas receitas de comidas campeiras, como o carreteiro de charque.</p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Vinícola Miolo</h3>' +
        '<p>A Vinícola Miolo recebeu durante o ano passado cerca de 200 mil turistas em sua sede no Vale dos Vinhedos. O número de visitas foi 10% superior às registradas em 2014. Somente em dezembro, 25 mil pessoas foram recebidas no local e aproveitaram para degustar os produtos da vinícola. A estrutura de enoturismo em Bento Gonçalves conta com sala de degustação, visitação às caves e aos parreirais, além de cursos de degustação.</p>' +        '</div>']
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(8);
        google.maps.event.removeListener(boundsListener);
    });
    
}

google.maps.event.addDomListener(window, 'load', initialize);