const Converter = require('timestamp-conv');
const weather = require('weather-api-data');
const { MessageMedia } = require('../index')

module.exports = {
    name: "ping2",
    description: "Ping!",
    async execute(client, msg, args) {
        var state = 'desativado'
        if(state === "desativado") return msg.reply(`O comando foi desativado! Contate o proprietário do bot para obter mais informações!`)
        const contact = await msg.getContact();
        const Date = new Converter.date(msg.timestamp);
        const data = await weather.loction('brasilia');
        let tipo;
        switch (data.current.condition.text) {
            case "Sunny":
                tipo = "ensolarado";
            break;
            case "Clear":
                tipo = "limpo";
            break;
            case "Partly cloudy":
                tipo = "parcialmente nublado";
            break;
            case "Cloudy":
                tipo = "nublado";
            break;
            case "Overcast":
                tipo = "nublado(Encoberto)";
            break;
            case "Mist":
                tipo = "com neblina";
            break;
            case "Moderate or heavy rain with thunder":
                tipo = "com chuva moderada ou forte com trovão";
            break;
            case "Patchy rain nearby":
                tipo = "com possibilidade de chuva irregular";
            break;
            case "Patchy rain possible":
                tipo = "com possibilidade de chuva irregular";
            break;
            case "Thundery outbreaks in nearby":
                tipo = "com possibilidade de trovoada";
            break;
            case "Blizzard":
                tipo = "em nevasca";
            break;
            case "Fog":
                tipo = "com nevoeiro";
            break;
            case "Patchy light drizzle":
                tipo = "com chuvisco irregular";
            break;
            case "Light drizzle":
                tipo = "chuviscando";
            break;
            case "Patchy light rain":
                tipo = "com chuva fraca irregular";
            break;
            case "Light rain":
                tipo = "com chuva fraca";
            break;
            case "Moderate rain at times":
                tipo = "com períodos de chuva moderada";
            break;
            case "Moderate rain":
                tipo = "com chuva moderada";
            break;
            case "Light rain shower":
                tipo = "com aguaceiro leve";
            break;
            case "Thundery outbreaks possible":
                tipo = "com possíveis focos de tempestade"
            break;
        };

        const clear = MessageMedia.fromFilePath("./attachments/113 (1).png")//
        const sunny = MessageMedia.fromFilePath("./attachments/113.png")//
        const pc = MessageMedia.fromFilePath("./attachments/116 (1).png")//
        const Dpc = MessageMedia.fromFilePath("./attachments/116.png")//
        const cloudy = MessageMedia.fromFilePath("./attachments/119 (1).png")//
        const Dcloudy = MessageMedia.fromFilePath("./attachments/119.png")//
        const overcast = MessageMedia.fromFilePath("./attachments/122 (1).png")//
        const Dovercast = MessageMedia.fromFilePath("./attachments/122.png")//
        const mist = MessageMedia.fromFilePath("./attachments/143 (1).png")//
        const Dmist = MessageMedia.fromFilePath("./attachments/143.png")//
        const prn = MessageMedia.fromFilePath("./attachments/176 (1).png")//
        const Dprn = MessageMedia.fromFilePath("./attachments/176.png")//
        const toin = MessageMedia.fromFilePath("./attachments/200 (1).png")//
        const Dtoin = MessageMedia.fromFilePath("./attachments/200.png")//
        const bliz = MessageMedia.fromFilePath("./attachments/230 (1).png")//
        const Dbliz = MessageMedia.fromFilePath("./attachments/230.png")//
        const fog = MessageMedia.fromFilePath("./attachments/248 (1).png")//
        const Dfog = MessageMedia.fromFilePath("./attachments/248.png")//
        const pld = MessageMedia.fromFilePath("./attachments/263 (1).png")//
        const Dpld = MessageMedia.fromFilePath("./attachments/263.png")//
        const ld = MessageMedia.fromFilePath("./attachments/266 (1).png")//
        const Dld = MessageMedia.fromFilePath("./attachments/266.png")//
        const plr = MessageMedia.fromFilePath("./attachments/293 (1).png")//
        const Dplr = MessageMedia.fromFilePath("./attachments/293.png")//
        const lr = MessageMedia.fromFilePath("./attachments/296 (1).png")//
        const Dlr = MessageMedia.fromFilePath("./attachments/296.png")//
        const mrat = MessageMedia.fromFilePath("./attachments/299 (1).png")//
        const Dmrat = MessageMedia.fromFilePath("./attachments/299.png")//
        const mr = MessageMedia.fromFilePath("./attachments/302 (1).png")//
        const Dmr = MessageMedia.fromFilePath("./attachments/302.png")//
        const Dmhr = MessageMedia.fromFilePath("./attachments/389.png")//
        const mhr = MessageMedia.fromFilePath("./attachments/389(1).png")//

        /*let icone;
        switch(data.current.condition.code) {
            case "1000":
                if(data.current.is_day == 1) {
                    icone = sunny;
                } else {
                    icone = clear;
                }
            break;
            case "1003":
                if(data.current.is_day == 1) {
                    icone = Dpc;
                } else {
                    icone = pc;
                }
            break;
            case "1006":
                if(data.current.is_day == 1) {
                    icone = Dcloudy;
                } else {
                    icone = cloudy;
                }
            break;
            case "1009":
                if(data.current.is_day == 1) {
                    icone = Dovercast;
                } else {
                    icone = overcast;
                }
            break;
            case "1030":
                if(data.current.is_day == 1) {
                    icone = Dmist;
                } else {
                    icone = mist;
                }
            break;
            case "1063":
                if(data.current.is_day == 1) {
                    icone = prn;
                } else {
                    icone = Dprn;
                }
            break;
            case "1087":
                if(data.current.is_day == 1) {
                    icone = toin;
                } else {
                    icone = Dtoin;
                }
            break;
            case "1117":
                if(data.current.is_day == 1) {
                    icone = bliz;
                } else {
                    icone = Dbliz;
                }
            break;
            case "1135":
                if(data.current.is_day == 1) {
                    icone = fog;
                } else {
                    icone = Dfog;
                }
            break;
            case "1150":
                if(data.current.is_day == 1) {
                    icone = pld;
                } else {
                    icone = Dpld;
                }
            break;
            case "1153":
                if(data.current.is_day == 1) {
                    icone = ld;
                } else {
                    icone = Dld;
                }
            break;
            case "1180":
                if(data.current.is_day == 1) {
                    icone = plr;
                } else {
                    icone = Dplr;
                }
            break;
            case "1183":
                if(data.current.is_day == 1) {
                    icone = lr;
                } else {
                    icone = Dlr;
                };
            break;
            case "1186":
                if(data.current.is_day == 1) {
                    icone = mrat;
                } else {
                    icone = Dmrat;
                }
            break;
            case "1189":
                if(data.current.is_day == 1) {
                    icone = mr;
                } else {
                    icone = Dmr;
                }
            break;
        }*/

        const icons = {
            "//cdn.weatherapi.com/weather/64x64/day/113.png":sunny,
            "//cdn.weatherapi.com/weather/64x64/night/113.png":clear,
            "//cdn.weatherapi.com/weather/64x64/day/116.png":Dpc,
            "//cdn.weatherapi.com/weather/64x64/night/116.png":pc,
            "//cdn.weatherapi.com/weather/64x64/day/119.png":Dcloudy,
            "//cdn.weatherapi.com/weather/64x64/night/119.png":cloudy,
            "//cdn.weatherapi.com/weather/64x64/day/122.png":Dovercast,
            "//cdn.weatherapi.com/weather/64x64/night/122.png":overcast,
            "//cdn.weatherapi.com/weather/64x64/day/143.png":Dmist,
            "//cdn.weatherapi.com/weather/64x64/night/143.png":mist,
            "//cdn.weatherapi.com/weather/64x64/day/176.png":Dprn,
            "//cdn.weatherapi.com/weather/64x64/night/176.png":prn,
            "//cdn.weatherapi.com/weather/64x64/day/200.png":Dtoin,
            "//cdn.weatherapi.com/weather/64x64/night/200.png":toin,
            "//cdn.weatherapi.com/weather/64x64/day/230.png":Dbliz,
            "//cdn.weatherapi.com/weather/64x64/night/230.png":bliz,
            "//cdn.weatherapi.com/weather/64x64/day/248.png":Dfog,
            "//cdn.weatherapi.com/weather/64x64/night/248.png":fog,
            "//cdn.weatherapi.com/weather/64x64/day/263.png":Dpld,
            "//cdn.weatherapi.com/weather/64x64/night/263.png":pld,
            "//cdn.weatherapi.com/weather/64x64/day/266.png":Dld,
            "//cdn.weatherapi.com/weather/64x64/night/266.png":ld,
            "//cdn.weatherapi.com/weather/64x64/day/293.png":Dplr,
            "//cdn.weatherapi.com/weather/64x64/night/293.png":plr,
            "//cdn.weatherapi.com/weather/64x64/day/296.png":Dlr,
            "//cdn.weatherapi.com/weather/64x64/night/296.png":lr,
            "//cdn.weatherapi.com/weather/64x64/day/299.png":Dmrat,
            "//cdn.weatherapi.com/weather/64x64/night/299.png":mrat,
            "//cdn.weatherapi.com/weather/64x64/day/302.png":Dmr,
            "//cdn.weatherapi.com/weather/64x64/night/302.png":mr,
            "//cdn.weatherapi.com/weather/64x64/night/389.png":mhr,
            "//cdn.weatherapi.com/weather/64x64/day/302.png":Dmhr,
        }
        const icone = icons[data.current.condition.icon];

        const nums = {
            "1":"1 (Baixo)",
            "2":"2 (Baixo)",
            "3":"3 (Moderado)",
            "4":"4 (Moderado)",
            "5":"5 (Moderado)",
            "6":"6 (Alto)",
            "7":"7 (Alto)",
            "8":"8 (Muito Alto)",
            "9":"9 (Muito Alto)",
            "10":"10 (Muito Alto)",
            "11":"11 (EXTREMO)",
            "12":"12 (EXTREMO)",
            "13":"13 (EXTREMO)",
            "14":"14 (EXTREMO)",
            "15":"15 (EXTREMO)",
            "16":"16 (EXTREMO)"
        }
        const iuv = nums[data.current.uv];

        const chat = await msg.getChat()
        const a = `Agora são ${Date.getHour()}:${Date.getMinute()} do dia ${Date.getDay()}/${Date.getMonth()}/${Date.getYear()}\nEstá fazendo ${data.current.temp_c}° em Brasília\n`
        const b = `Agora são ${Date.getHour()}:${Date.getMinute()} do dia ${Date.getDay()}/${Date.getMonth()}/${Date.getYear()}\nEstá fazendo ${data.current.temp_c}° com sensação térmica de ${data.current.feelslike_c}° em Brasília\n`
        const c = `O clima está ${tipo || data.current.condition.text}, ventos de ${data.current.wind_kph}km/h(${data.current.wind_degree}°${data.current.wind_dir}) e umidade de ${data.current.humidity}%\n`
        const d = `O clima está ${tipo || data.current.condition.text}, umidade de ${data.current.humidity}%\n`
        const e = `Porcentagem de nuvens: ${data.current.cloud}%, visibilidade de ${data.current.vis_km}km, rajadas de vento de ${data.current.gust_kph}km/h, pressão atmosférica de ${data.current.pressure_mb}mb e índice UV: ${iuv}\n`
        const f = `Índide de precipitação: ${data.current.precip_in}% com chance de ${data.current.precip_mm}mm`
        msg.reply("pong?");
        console.log(data)
        chat.sendMessage(`Olá @${contact.number}`, {mentions: [contact]})
        ///////////////////////////////////////////////////////////
        if (data.current.temp_c === data.current.feelslike_c && data.current.wind_kph > 0) {
            if(data.current.precip_mm > 0) {
                chat.sendMessage(icone, {caption: a+c+e+f})
            } else {
                chat.sendMessage(icone, {caption: a+c+e})
            }
        } else if (data.current.temp_c === data.current.feelslike_c && data.current.wind_kph == 0) {
            if(data.current.precip_mm > 0) {
                chat.sendMessage(icone, {caption: a+d+e+f})
            } else {
                chat.sendMessage(icone, {caption: a+d+e})
            }
        } else if (data.current.temp_c !== data.current.feelslike_c && data.current.wind_kph > 0) {
            if(data.current.precip_mm > 0) {
                chat.sendMessage(icone, {caption: b+c+e+f})
            } else {
                chat.sendMessage(icone, {caption: b+c+e})
            }
        } else if(data.current.temp_c !== data.current.feelslike_c && data.current.wind_kph == 0) {
            if(data.current.precip_mm > 0) {
                chat.sendMessage(icone, {caption: b+d+e+f})
            } else {
                chat.sendMessage(icone, {caption: b+d+e})
            }
        }
    }
}