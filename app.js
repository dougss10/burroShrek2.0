var request = require('request');
var cheerio = require("cheerio");
var colors  = require('colors');
var fs      = require('fs');

var options = {
        url: 'http://www2.correios.com.br/sistemas/rastreamento/resultado.cfm',
        method: 'POST',
        form: { acao: 'track', objetos: process.argv[2], btnPesq:'Buscar'},
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': 'http://www2.correios.com.br/sistemas/rastreamento/resultado.cfm',
            'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4',
            'Cookie': 'ssvbr0327_www2sro=sac2841SRO; sitecorreioscookie-%3FEXTERNO%3Fpool_site_institucional_80=AIBOKIMA; CFID=4745359; CFTOKEN=e15a60fb222170e1-61546DD6-0FC6-75A5-77E00C26D8B1B316; JSESSIONID=FF57F8B1FF3C24853498AE97C7E5FB90.cfusion02; ssvbr0327_www2=sac2845; _ga=GA1.3.685913360.1517839947; _gid=GA1.3.1260337311.1518004730; CFGLOBALS=urltoken%3DCFID%23%3D4745359%26CFTOKEN%23%3De15a60fb222170e1%2D61546DD6%2D0FC6%2D75A5%2D77E00C26D8B1B316%26jsessionid%23%3DFF57F8B1FF3C24853498AE97C7E5FB90%2Ecfusion02%23lastvisit%3D%7Bts%20%272018%2D02%2D07%2011%3A03%3A20%27%7D%23hitcount%3D22%23timecreated%3D%7Bts%20%272018%2D02%2D07%2009%3A58%3A53%27%7D%23cftoken%3De15a60fb222170e1%2D61546DD6%2D0FC6%2D75A5%2D77E00C26D8B1B316%23cfid%3D4745359%23; CFGLOBALS=urltoken%3DCFID%23%3D4745359%26CFTOKEN%23%3De15a60fb222170e1%2D61546DD6%2D0FC6%2D75A5%2D77E00C26D8B1B316%26jsessionid%23%3DFF57F8B1FF3C24853498AE97C7E5FB90%2Ecfusion02%23lastvisit%3D%7Bts%20%272018%2D02%2D07%2011%3A03%3A20%27%7D%23hitcount%3D22%23timecreated%3D%7Bts%20%272018%2D02%2D07%2009%3A58%3A53%27%7D%23cftoken%3De15a60fb222170e1%2D61546DD6%2D0FC6%2D75A5%2D77E00C26D8B1B316%23cfid%3D4745359%23'
        }
    };

var tempo = process.argv[3];
if (tempo === undefined || tempo === null) {
  tempo = 1
}
console.log("burroShrek2 iniciado, executando a cada " + tempo + " minuto(s)!");
tempo = tempo * 60 * 1000;

setInterval(function(){
    request(options, function (error, response, body) {
        $ = cheerio.load(body);
        var table = $('table').html();

        var status = (table.indexOf('Objeto entregue') != -1) ? 'Chegou!!! \\o/' : 'Ainda não, calmae. :P';
          console.log(status == 'Chegou!!! \\o/' ? status.green : status.red);

          fs.appendFile('log.txt', status+' '+ new Date().toString() + '\n', (err) => {
            if (err) {
                console.log('Erro ao salvar arquivo!');
                throw err;
            }
          });
    })
}, tempo);
